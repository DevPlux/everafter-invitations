import { redirect } from "next/navigation";
import { logoutCouple } from "../actions";
import { verifyCoupleSession } from "@/lib/auth/session";
import InvitationGenerator from "./InvitationGenerator";

export default async function GenerateInvitationPage() {
    const authenticated = await verifyCoupleSession();

    if (!authenticated) {
        redirect("/couple");
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-rose-50 px-4 py-12">
            <section className="mx-auto max-w-3xl rounded-3xl border border-stone-100 bg-white p-6 shadow-xl sm:p-10">
                <div className="flex flex-col gap-5 border-b border-stone-100 pb-7 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-500">
                            Couple Portal
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold text-stone-800">
                            Invitation Generator
                        </h1>

                        <p className="mt-3 max-w-xl leading-7 text-stone-500">
                            Enter a recipient’s name to create a verified personalized
                            invitation link.
                        </p>
                    </div>

                    <form action={logoutCouple}>
                        <button
                            type="submit"
                            className="rounded-xl border border-stone-300 px-5 py-2.5 font-medium text-stone-700 transition hover:bg-stone-100"
                        >
                            Sign out
                        </button>
                    </form>
                </div>

                <InvitationGenerator />
            </section>
        </main>
    );
}