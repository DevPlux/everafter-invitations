import { timingSafeEqual } from "node:crypto";

export function verifyCouplePassword(password: string): boolean {
    const expectedPassword = process.env.COUPLE_ACCESS_PASSWORD;

    if (!expectedPassword) {
        throw new Error("COUPLE_ACCESS_PASSWORD is not configured.");
    }

    const receivedBuffer = Buffer.from(password);
    const expectedBuffer = Buffer.from(expectedPassword);

    if (receivedBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return timingSafeEqual(receivedBuffer, expectedBuffer);
}