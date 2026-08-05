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

    useEffect(() => {
        if (!copied) return;

        const timeout = window.setTimeout(() => {
            setCopied(false);
        }, 2500);

        return () => window.clearTimeout(timeout);
    }, [copied]);

    async function copyInvitationLink() {
        if (!invitationUrl) return;

        try {
            await navigator.clipboard.writeText(invitationUrl);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    const whatsappUrl =
        invitationUrl && state.guestName
            ? `https://wa.me/?text=${encodeURIComponent(
                `Dear ${state.guestName}, you are warmly invited to celebrate our wedding with us.\n\nOpen your personalized invitation:\n${invitationUrl}`,
            )}`
            : "";

    return (
        <div className="relative mt-4 w-full min-w-0 sm:mt-6">
            {/* Background glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -top-12 size-36 rounded-full bg-[#c9ada3]/25 blur-3xl sm:-left-20 sm:-top-20 sm:size-56"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -right-10 size-36 rounded-full bg-[#87988d]/25 blur-3xl sm:-bottom-20 sm:-right-20 sm:size-56"
            />

            {/* Main card */}
            <div className="relative min-w-0 overflow-hidden rounded-2xl border border-[#b99b72]/25 bg-[#faf7f2]/95 p-4 shadow-[0_30px_90px_rgba(39,52,46,0.16)] backdrop-blur-sm sm:rounded-[2rem] sm:p-7">
                {/* Inner border */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-[0.9rem] border border-[#b99b72]/15 sm:inset-3 sm:rounded-[1.6rem]"
                />

                <div className="relative">
                    {/* Header */}
                    <header className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-6 sm:gap-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#b99b72]/30 bg-[#f0ebe3] text-[#b99b72] shadow-sm sm:size-12">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    className="size-5"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                                    <path d="m2 17 10 5 10-5" />
                                    <path d="m2 12 10 5 10-5" />
                                </svg>
                            </div>

                            <div className="min-w-0">
                                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#43584d] sm:text-[0.65rem] sm:tracking-[0.35em]">
                                    Create invitation
                                </p>

                                <h2 className="font-serif text-2xl leading-tight text-[#43584d] sm:text-4xl">
                                    Guest Invitation
                                </h2>
                            </div>
                        </div>

                        <div
                            aria-hidden="true"
                            className="hidden items-center gap-3 sm:flex"
                        >
                            <span className="h-px w-7 bg-[#43584d]/30" />
                            <span className="size-1.5 rotate-45 bg-[#43584d]/60" />
                            <span className="h-px w-7 bg-[#43584d]/30" />
                        </div>
                    </header>

                    {/* Side-by-side layout */}
                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* LEFT: Generator */}
                        <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#b99b72]/20 bg-white/45 p-4 sm:min-h-[260px] sm:p-6">
                            <div>
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#43584d]/65 sm:text-xs sm:tracking-[0.22em]">
                                    Generate link
                                </p>

                                <h3 className="mt-1 font-serif text-xl text-[#43584d] sm:text-2xl">
                                    Enter the guest name
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#43584d]/60">
                                    Generate a secure, shareable invitation link
                                    for each guest or family.
                                </p>
                            </div>

                            <form
                                action={formAction}
                                className="mt-5 flex flex-1 flex-col"
                            >
                                <div className="relative">
                                    <label
                                        htmlFor="guestName"
                                        className="sr-only"
                                    >
                                        Guest or family name
                                    </label>

                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#43584d]/50">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            className="size-5"
                                            aria-hidden="true"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>

                                    <input
                                        id="guestName"
                                        name="guestName"
                                        type="text"
                                        required
                                        minLength={2}
                                        maxLength={100}
                                        disabled={pending}
                                        autoComplete="off"
                                        placeholder="Mr. & Mrs. Perera and Family"
                                        className="w-full min-w-0 rounded-2xl border border-[#43584d]/15 bg-white/85 py-3.5 pl-11 pr-3 text-sm text-[#43584d] shadow-sm outline-none transition duration-300 placeholder:text-[#43584d]/35 hover:border-[#43584d]/40 focus:border-[#43584d] focus:bg-white focus:ring-4 focus:ring-[#43584d]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:pl-12 sm:pr-4 sm:text-base"
                                    />
                                </div>

                                <p className="mt-2 text-xs leading-5 text-[#43584d]/70 italic mb-1">
                                    Enter the name exactly as it should appear on
                                    the invitation.
                                </p>

                                {state.error && (
                                    <div
                                        role="alert"
                                        aria-live="polite"
                                        className="mt-3 flex items-start gap-2 rounded-xl border border-red-200/70 bg-red-50/80 px-3 py-2.5 text-sm text-red-700"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="mt-0.5 size-4 shrink-0"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 8v5" />
                                            <path d="M12 16.5h.01" />
                                        </svg>

                                        <span>{state.error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="group mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#43584d] bg-[#43584d] px-4 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white shadow-[0_15px_35px_rgba(67,88,77,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#56685e] hover:shadow-[0_20px_40px_rgba(67,88,77,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#43584d]/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:gap-3 sm:px-6 sm:text-xs sm:tracking-[0.18em]"
                                >
                                    {pending ? (
                                        <>
                                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            Generate invitation

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="size-4 transition-transform group-hover:translate-x-1"
                                                aria-hidden="true"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </section>

                        {/* RIGHT: Generated invitation */}
                        <section
                            aria-live="polite"
                            className="relative flex min-h-[240px] min-w-0 flex-col overflow-hidden rounded-2xl border border-[#b99b72]/20 bg-[#f0ebe3]/65 p-4 sm:min-h-[260px] sm:p-6"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-[#c9ada3]/20 blur-3xl"
                            />

                            {invitationUrl ? (
                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#43584d]/65">
                                                Invitation for
                                            </p>

                                            <h3 className="mt-1 break-words font-serif text-2xl leading-tight text-[#43584d] sm:text-3xl">
                                                {state.guestName}
                                            </h3>
                                        </div>

                                        <div
                                            aria-hidden="true"
                                            className="mt-3 hidden items-center gap-2 sm:flex"
                                        >
                                            <span className="h-px w-6 bg-[#43584d]/30" />
                                            <span className="size-1.5 rotate-45 bg-[#43584d]/60" />
                                            <span className="h-px w-6 bg-[#43584d]/30" />
                                        </div>
                                    </div>

                                    {/* Generated URL */}
                                    <div className="mt-5">
                                        <label
                                            htmlFor="invitationUrl"
                                            className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#43584d]/55"
                                        >
                                            Secure invitation link
                                        </label>

                                        <div className="flex min-w-0 flex-col gap-2 sm:relative sm:block">
                                            <input
                                                id="invitationUrl"
                                                value={invitationUrl}
                                                readOnly
                                                onFocus={(event) =>
                                                    event.currentTarget.select()
                                                }
                                                aria-label="Generated invitation URL"
                                                className="w-full min-w-0 rounded-xl border border-[#43584d]/15 bg-white/85 px-3 py-3 text-xs text-[#43584d] shadow-sm outline-none transition hover:border-[#43584d]/40 focus:border-[#43584d] focus:ring-4 focus:ring-[#43584d]/10 sm:pl-4 sm:pr-24 sm:text-sm"
                                            />

                                            <button
                                                type="button"
                                                onClick={copyInvitationLink}
                                                className="min-h-11 w-full rounded-lg bg-[#43584d] px-4 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#56685e] sm:absolute sm:inset-y-1 sm:right-1 sm:min-h-0 sm:w-auto"
                                            >
                                                {copied ? "Copied!" : "Copy"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Result actions */}
                                    <div className="mt-auto grid grid-cols-1 gap-3 pt-5 min-[390px]:grid-cols-2">
                                        <a
                                            href={invitationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#43584d]/30 bg-white/75 px-3 py-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#43584d] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#43584d]/20 sm:px-4 sm:text-xs sm:tracking-[0.14em]"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="size-4"
                                                aria-hidden="true"
                                            >
                                                <path d="M14 3h7v7" />
                                                <path d="M10 14 21 3" />
                                                <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                                            </svg>

                                            Preview
                                        </a>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white shadow-[0_8px_25px_rgba(37,211,102,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20b85f] hover:shadow-[0_14px_30px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 sm:px-4 sm:text-xs sm:tracking-[0.14em]"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                className="size-4"
                                                aria-hidden="true"
                                            >
                                                <path d="M20 11.5a8.4 8.4 0 0 1-9 8.4 8.8 8.8 0 0 1-3.7-1.1L3 20l1.2-4.1A8.5 8.5 0 1 1 20 11.5Z" />
                                                <path d="M8.5 8.2c.3-.7.6-.7.9-.7h.4c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.7.8c-.2.2-.2.4-.1.6a7 7 0 0 0 3.2 2.8c.3.1.5.1.7-.1l.9-1.1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .3-.2 1.4-.9 2" />
                                            </svg>

                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                /* Placeholder before generating */
                                <div className="relative flex h-full flex-col items-center justify-center text-center">
                                    <div className="flex size-16 items-center justify-center rounded-full border border-[#b99b72]/30 bg-[#faf7f2] text-[#b99b72] shadow-sm">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className="size-7"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="14"
                                                rx="2"
                                            />
                                            <path d="m3 7 9 6 9-6" />
                                        </svg>
                                    </div>

                                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-[#43584d]/55">
                                        Invitation preview
                                    </p>

                                    <h3 className="mt-1 px-2 font-serif text-xl text-[#43584d] sm:text-2xl">
                                        Your invitation will appear here
                                    </h3>

                                    <p className="mt-2 max-w-sm px-2 text-sm font-medium leading-6 text-[#43584d]/70 sm:px-5">
                                        Enter a guest or family name and generate
                                        their personalized invitation.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-[#43584d]/45">
                Each guest receives a unique, private link. You can generate as
                many as you need.
            </p>
        </div>
    );
}