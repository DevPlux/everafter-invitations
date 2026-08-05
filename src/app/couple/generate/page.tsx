import { redirect } from "next/navigation";

import { logoutCouple } from "../actions";
import { verifyCoupleSession } from "@/lib/auth/session";
import InvitationGenerator from "./InvitationGenerator";
import Image from "next/image";

export default async function GenerateInvitationPage() {
    const authenticated = await verifyCoupleSession();

    if (!authenticated) {
        redirect("/couple");
    }

    return (
        <main className="relative flex bg-gradient-to-br from-stone-50 via-white to-rose-50 px-4 py-4 lg:flex lg:h-dvh lg:items-center lg:overflow-hidden lg:px-6 overflow-x-hidden">

            {/* Mobile image — visible below 768px */}
            <Image
                src="/images/wedding_hero_mobile.svg"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 100vw, 0px"
                className="object-cover object-center md:hidden"
            />

            {/* Desktop image — visible from 768px upward */}
            <Image
                src="/images/wedding_bg.svg"
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 100vw, 0px"
                className="hidden object-cover object-center md:block"
            />

            {/* Single controlled overlay */}
            <section className="mx-auto w-full max-w-7xl rounded-[2rem] border border-stone-100 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:p-7 lg:max-h-[calc(100dvh-2rem)] lg:p-8">

                {/* Page header */}
                <header className="flex flex-col gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#43584d]">
                            Couple Portal
                        </p>

                        <h1 className="mt-1 font-serif text-3xl font-semibold text-stone-800 lg:text-4xl">
                            Invitation Generator
                        </h1>

                        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-stone-500">
                            Create verified personalized invitation links for your
                            guests and share them instantly.
                        </p>
                    </div>

                    <form action={logoutCouple}>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-stone-700 transition hover:border-[#43584d] hover:bg-[#43584d] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#43584d]/20"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="size-4"
                                aria-hidden="true"
                            >
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
                            </svg>

                            Sign out
                        </button>
                    </form>
                </header>

                {/* Left generator + right invitation result */}
                <InvitationGenerator />
            </section>
        </main>
    );
}