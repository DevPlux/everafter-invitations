import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "couple_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

type SessionPayload = {
    authenticated: true;
    expiresAt: number;
};

function getSessionSecret(): string {
    const secret = process.env.SESSION_SECRET;

    if (!secret) {
        throw new Error("SESSION_SECRET is not configured.");
    }

    return secret;
}

function encodePayload(payload: SessionPayload): string {
    return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value: string): SessionPayload | null {
    try {
        return JSON.parse(
            Buffer.from(value, "base64url").toString("utf8"),
        ) as SessionPayload;
    } catch {
        return null;
    }
}

function createSignature(payload: string): string {
    return createHmac("sha256", getSessionSecret())
        .update(payload)
        .digest("base64url");
}

function signaturesMatch(received: string, expected: string): boolean {
    const receivedBuffer = Buffer.from(received);
    const expectedBuffer = Buffer.from(expected);

    if (receivedBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function createCoupleSession(): Promise<void> {
    const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;

    const payload = encodePayload({
        authenticated: true,
        expiresAt,
    });

    const signature = createSignature(payload);
    const sessionToken = `${payload}.${signature}`;

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DURATION_SECONDS,
    });
}

export async function verifyCoupleSession(): Promise<boolean> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
        return false;
    }

    const [payload, receivedSignature] = sessionToken.split(".");

    if (!payload || !receivedSignature) {
        return false;
    }

    const expectedSignature = createSignature(payload);

    if (!signaturesMatch(receivedSignature, expectedSignature)) {
        return false;
    }

    const session = decodePayload(payload);

    if (
        !session ||
        session.authenticated !== true ||
        session.expiresAt <= Date.now()
    ) {
        return false;
    }

    return true;
}

export async function deleteCoupleSession(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
    });
}