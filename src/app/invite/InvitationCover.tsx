"use client";

import { useEffect, useState } from "react";

import WeddingCountdown from "@/components/wedding/WeddingCountdown";
import { weddingData } from "@/data/wedding";

import WeddingHero from "@/components/wedding/WeddingHero";
import CoupleIntroduction from "@/components/wedding/CoupleIntroduction";

type InvitationCoverProps = {
    guestName: string;
};

export default function InvitationCover({
                                            guestName,
                                        }: InvitationCoverProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "" : "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    function openInvitation() {
        setIsOpen(true);
    }

    return (
        <>
            <section
                aria-hidden={isOpen}
                className={`fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-[#f5efe7] px-4 py-6 transition-all duration-1000 ease-in-out ${
                    isOpen
                        ? "pointer-events-none -translate-y-full opacity-0"
                        : "translate-y-0 opacity-100"
                }`}
            >
                {/* Decorative background circles */}
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

                {/* Decorative border */}
                <div className="absolute inset-4 rounded-[2rem] border border-[#b69b72]/40 sm:inset-8" />
                <div className="absolute inset-7 rounded-[1.6rem] border border-[#b69b72]/20 sm:inset-11" />

                <div className="relative z-10 w-full max-w-3xl text-center">
                    <p className="invitation-fade-up text-xs font-medium uppercase tracking-[0.35em] text-[#8c7454] sm:text-sm">
                        Together with their families
                    </p>

                    <div className="invitation-fade-up invitation-delay-1 mt-8">
                        <p className="font-serif text-5xl italic text-[#3f493d] sm:text-7xl">
                            Nimal
                        </p>

                        <p className="my-2 font-serif text-3xl italic text-[#a08158]">
                            &
                        </p>

                        <p className="font-serif text-5xl italic text-[#3f493d] sm:text-7xl">
                            Amaya
                        </p>
                    </div>

                    <p className="invitation-fade-up invitation-delay-2 mx-auto mt-8 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
                        Request the pleasure of your company at the celebration of their
                        marriage
                    </p>

                    <div className="invitation-fade-up invitation-delay-3 mt-8">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7454]">
                            Especially invited
                        </p>

                        <p className="mx-auto mt-3 max-w-2xl font-serif text-2xl text-[#3f493d] sm:text-4xl">
                            {guestName}
                        </p>
                    </div>

                    <div className="invitation-fade-up invitation-delay-4 mt-8">
                        <p className="text-sm uppercase tracking-[0.3em] text-[#8c7454]">
                            Saturday
                        </p>

                        <div className="mt-3 flex items-center justify-center gap-4 text-[#3f493d]">
                            <span className="h-px w-12 bg-[#b69b72]/60" />

                            <p className="font-serif text-xl sm:text-2xl">
                                20 December 2026
                            </p>

                            <span className="h-px w-12 bg-[#b69b72]/60" />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={openInvitation}
                        className="invitation-fade-up invitation-delay-5 mt-10 rounded-full border border-[#8c7454] bg-[#3f493d] px-9 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#566052] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8c7454]/30"
                    >
                        Open invitation
                    </button>

                    <p className="invitation-fade-up invitation-delay-5 mt-5 text-xs tracking-wide text-stone-500">
                        Tap to view the wedding details
                    </p>
                </div>
            </section>

            <WeddingIntroduction isOpen={isOpen} guestName={guestName} />
        </>
    );
}

type WeddingIntroductionProps = {
    isOpen: boolean;
    guestName: string;
};

function WeddingIntroduction({
                                 isOpen,
                                 guestName,
                             }: WeddingIntroductionProps) {
    return (
        <main
            aria-hidden={!isOpen}
            className={`bg-[#faf7f2] transition-opacity delay-300 duration-1000 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            <WeddingHero guestName={guestName} />
            <CoupleIntroduction />
        </main>
    );
}