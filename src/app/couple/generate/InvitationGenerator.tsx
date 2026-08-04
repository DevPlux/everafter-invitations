"use client";

import { useActionState, useEffect, useState } from "react";
import {
    generateInvitation,
    type GenerateInvitationState,
} from "../actions";

const initialState: GenerateInvitationState = {
    error: null,
    invitationPath: null,
    guestName: null,
};

export default function InvitationGenerator() {
    const [state, formAction, pending] = useActionState(
        generateInvitation,
        initialState,
    );

    const [invitationUrl, setInvitationUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!state.invitationPath) {
            setInvitationUrl("");
            return;
        }

        setInvitationUrl(
            new URL(state.invitationPath, window.location.origin).toString(),
        );

        setCopied(false);
    }, [state.invitationPath]);

    async function copyInvitationLink() {
        if (!invitationUrl) {
            return;
        }

        await navigator.clipboard.writeText(invitationUrl);
        setCopied(true);
    }

    const whatsappUrl =
        invitationUrl && state.guestName
            ? `https://wa.me/?text=${encodeURIComponent(
                `Dear ${state.guestName}, you are warmly invited to celebrate our wedding with us.\n\nOpen your personalized invitation:\n${invitationUrl}`,
            )}`
            : "";

    return (
        <div className="mt-8">
            <form action={formAction} className="space-y-5">
                <div>
                    <label
                        htmlFor="guestName"
                        className="mb-2 block text-sm font-medium text-stone-700"
                    >
                        Guest or family name
                    </label>

                    <input
                        id="guestName"
                        name="guestName"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        disabled={pending}
                        placeholder="Mr. & Mrs. Perera and Family"
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 disabled:opacity-60"
                    />

                    <p className="mt-2 text-sm text-stone-500">
                        Enter the name exactly as it should appear on the invitation.
                    </p>
                </div>

                {state.error && (
                    <p
                        role="alert"
                        className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {state.error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-xl bg-rose-600 px-5 py-3 font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {pending ? "Generating..." : "Generate secure invitation"}
                </button>
            </form>

            {invitationUrl && (
                <section className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-5">
                    <p className="text-sm font-medium text-rose-700">
                        Invitation generated for
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-stone-800">
                        {state.guestName}
                    </h2>

                    <input
                        value={invitationUrl}
                        readOnly
                        aria-label="Generated invitation URL"
                        className="mt-4 w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-stone-700"
                    />

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <button
                            type="button"
                            onClick={copyInvitationLink}
                            className="rounded-xl bg-stone-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-900"
                        >
                            {copied ? "Copied!" : "Copy link"}
                        </button>

                        <a
                            href={invitationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                        >
                            Preview
                        </a>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-green-700"
                        >
                            Share on WhatsApp
                        </a>
                    </div>
                </section>
            )}
        </div>
    );
}