"use client";

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
        <form
            action={formAction}
            className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl"
        >
            <div className="mb-8 text-center">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-rose-500">
                    Private access
                </p>

                <h1 className="text-3xl font-semibold text-stone-800">
                    Couple Portal
                </h1>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                    Enter your private password to generate personalized wedding
                    invitation links.
                </p>
            </div>

            <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-stone-700"
            >
                Access password
            </label>

            <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={pending}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Enter your private password"
            />

            {state.error && (
                <p
                    role="alert"
                    className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="mt-6 w-full rounded-xl bg-rose-600 px-4 py-3 font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {pending ? "Checking..." : "Continue securely"}
            </button>
        </form>
    );
}