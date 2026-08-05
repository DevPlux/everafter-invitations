"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginCouple, type LoginState } from "./actions";

const initialState: LoginState = {
    error: null,
};

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(
        loginCouple,
        initialState,
    );

    return (
        <div className="relative w-full max-w-md">
            {/* Decorative glow */}
            <div className="absolute -left-16 -top-16 size-44 rounded-full bg-[#c9ada3]/25 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 size-44 rounded-full bg-[#87988d]/25 blur-3xl" />

            <form
                action={formAction}
                className="relative overflow-hidden rounded-[2rem] border border-[#b99b72]/25 bg-[#faf7f2]/95 p-6 shadow-[0_30px_90px_rgba(39,52,46,0.16)] backdrop-blur-sm sm:p-8"
            >
                {/* Inner decorative border */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-[#b99b72]/15"
                />

                <div className="relative">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-[#b99b72]/30 bg-[#f0ebe3] text-[#b99b72] shadow-sm">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="size-5"
                                aria-hidden="true"
                            >
                                <rect
                                    x="5"
                                    y="10"
                                    width="14"
                                    height="10"
                                    rx="2"
                                />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                <path d="M12 14v2" />
                            </svg>
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#43584d]">
                            Private access
                        </p>

                        <h1 className="mt-3 font-serif text-3xl text-[#43584d] sm:text-4xl">
                            Couple Portal
                        </h1>

                        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-[#43584d]/30" />
                            <span className="size-1.5 rotate-45 bg-[#43584d]/60" />
                            <span className="h-px w-8 bg-[#43584d]/30" />
                        </div>

                        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#43584d]/65">
                            Enter your private password to create and share
                            personalized wedding invitations.
                        </p>
                    </div>

                    {/* Password field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#43584d]/75"
                        >
                            Access password
                        </label>

                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#43584d]/50">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="size-5"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                    />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                </svg>
                            </span>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                disabled={pending}
                                placeholder="Enter your private password"
                                className="w-full rounded-2xl border border-[#43584d]/15 bg-white/80 py-3.5 pl-12 pr-4 text-[#43584d] shadow-sm outline-none transition duration-300 placeholder:text-[#43584d]/35 hover:border-[#43584d]/40 focus:border-[#43584d] focus:bg-white focus:ring-4 focus:ring-[#43584d]/10 disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {/* Error message */}
                    {state.error && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50/80 px-4 py-3 text-sm text-red-700"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="mt-0.5 size-5 shrink-0"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 8v5" />
                                <path d="M12 16.5h.01" />
                            </svg>

                            <span>{state.error}</span>
                        </div>
                    )}

                    {/* Login button */}
                    <button
                        type="submit"
                        disabled={pending}
                        className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#43584d] bg-[#43584d] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_15px_35px_rgba(67,88,77,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#56685e] hover:shadow-[0_20px_40px_rgba(67,88,77,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#43584d]/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                    >
                        {pending ? (
                            <>
                                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Checking access...
                            </>
                        ) : (
                            <>
                                Continue securely
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

                    {/* Return link */}
                    <div className="mt-5 border-t border-[#43584d]/10 pt-5 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#43584d]/55 transition hover:text-[#43584d]"
                        >
                            <span aria-hidden="true">←</span>
                            Return to wedding page
                        </Link>
                    </div>
                </div>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-[#43584d]/55 italic">
                This portal is reserved for the couple.
                <br />
                Invitation links are generated securely.
            </p>
        </div>
    );
}