import { createHmac, timingSafeEqual } from "node:crypto";

export type InvitationPayload = {
    guestName: string;
};

function getSigningSecret(): string {
    const secret = process.env.INVITATION_SIGNING_SECRET;

    if (!secret) {
        throw new Error("INVITATION_SIGNING_SECRET is not configured.");
    }

    return secret;
}

function createSignature(payload: string): string {
    return createHmac("sha256", getSigningSecret())
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

export function createInvitationToken(
    invitation: InvitationPayload,
): string {
    const payload = Buffer.from(JSON.stringify(invitation)).toString(
        "base64url",
    );

    const signature = createSignature(payload);

    return `${payload}.${signature}`;
}

export function verifyInvitationToken(
    token: string,
): InvitationPayload | null {
    const [payload, receivedSignature, extraPart] = token.split(".");

    if (!payload || !receivedSignature || extraPart) {
        return null;
    }

    const expectedSignature = createSignature(payload);

    if (!signaturesMatch(receivedSignature, expectedSignature)) {
        return null;
    }

    try {
        const invitation = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8"),
        ) as InvitationPayload;

        if (
            typeof invitation.guestName !== "string" ||
            invitation.guestName.trim() === ""
        ) {
            return null;
        }

        return {
            guestName: invitation.guestName.trim(),
        };
    } catch {
        return null;
    }
}