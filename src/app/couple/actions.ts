"use server";

import { redirect } from "next/navigation";
import { verifyCouplePassword } from "@/lib/auth/password";
import {
    createCoupleSession,
    deleteCoupleSession,
} from "@/lib/auth/session";
import { createInvitationToken } from "@/lib/invitations/signing";
import { verifyCoupleSession } from "@/lib/auth/session";

export type LoginState = {
    error: string | null;
};

export async function loginCouple(
    _previousState: LoginState,
    formData: FormData,
): Promise<LoginState> {
    const password = formData.get("password");

    if (typeof password !== "string" || password.trim() === "") {
        return {
            error: "Please enter the couple access password.",
        };
    }

    if (!verifyCouplePassword(password)) {
        return {
            error: "The password you entered is incorrect.",
        };
    }

    await createCoupleSession();
    redirect("/couple/generate");
}

export type GenerateInvitationState = {
    error: string | null;
    invitationPath: string | null;
    guestName: string | null;
};

export async function generateInvitation(
    _previousState: GenerateInvitationState,
    formData: FormData,
): Promise<GenerateInvitationState> {
    const authenticated = await verifyCoupleSession();

    if (!authenticated) {
        return {
            error: "Your session has expired. Please sign in again.",
            invitationPath: null,
            guestName: null,
        };
    }

    const guestNameValue = formData.get("guestName");

    if (typeof guestNameValue !== "string") {
        return {
            error: "Please enter the recipient’s name.",
            invitationPath: null,
            guestName: null,
        };
    }

    const guestName = guestNameValue.replace(/\s+/g, " ").trim();

    if (guestName.length < 2) {
        return {
            error: "The recipient’s name must contain at least 2 characters.",
            invitationPath: null,
            guestName: null,
        };
    }

    if (guestName.length > 100) {
        return {
            error: "The recipient’s name cannot exceed 100 characters.",
            invitationPath: null,
            guestName: null,
        };
    }

    const token = createInvitationToken({ guestName });

    return {
        error: null,
        invitationPath: `/invite?t=${encodeURIComponent(token)}`,
        guestName,
    };
}

export async function logoutCouple(): Promise<void> {
    await deleteCoupleSession();
    redirect("/couple");
}