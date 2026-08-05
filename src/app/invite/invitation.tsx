"use client";

import { useEffect, useState } from "react";
import { EventSchedule } from "@/components/wedding/EventSchedule";
import { StoryTimeline } from "@/components/wedding/StoryTimeline";
import WeddingCountdown from "@/components/wedding/WeddingCountdown";
import { weddingData } from "@/data/wedding";

export function Invitation({ guestName }: { guestName: string }) {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        document.body.style.overflow = opened ? "" : "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [opened]);

    const { couple, wedding, venue } = weddingData;

    return (
        <main>
            {!opened && (
                <section className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#e8e2d7] px-5 py-8">
                    <div className="absolute -left-24 -top-24 size-72 rounded-full border border-gold/20" />
                    <div className="absolute -bottom-32 -right-24 size-96 rounded-full border border-sage/15" />
                    <div className="relative w-full max-w-xl border border-gold/35 bg-paper px-7 py-14 text-center shadow-[0_30px_100px_rgba(39,52,46,0.18)] sm:px-14 sm:py-20">
                        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
                            Together with their families
                        </p>
                        <h1 className="mt-8 font-serif text-6xl leading-[0.85] text-sage sm:text-8xl">
                            {couple.partnerOne.firstName} <span className="block py-2 text-4xl text-gold">&</span> {couple.partnerTwo.firstName}
                        </h1>
                        <p className="mx-auto mt-8 max-w-sm font-serif text-2xl leading-8 text-sage">
                            request the pleasure of the company of
                        </p>
                        <p className="mx-auto mt-4 max-w-md border-y border-gold/25 py-4 font-serif text-3xl font-semibold text-sage">
                            {guestName}
                        </p>
                        <button
                            onClick={() => setOpened(true)}
                            className="mt-9 rounded-full bg-sage px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-sage/90"
                        >
                            Open invitation
                        </button>
                    </div>
                </section>
            )}

            <section className="grid min-h-screen place-items-center bg-[#dde4de] px-6 py-20 text-center">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">
                        We are getting married
                    </p>
                    <h2 className="mt-5 font-serif text-7xl text-sage sm:text-9xl">
                        {couple.partnerOne.firstName} & {couple.partnerTwo.firstName}
                    </h2>
                    <p className="mt-6 font-serif text-3xl text-sage/80">{wedding.displayDate}</p>
                    <p className="mt-4 text-sm uppercase tracking-[0.25em] text-sage/60">
                        {venue.address}
                    </p>
                    <WeddingCountdown weddingDate={wedding.dateTime} />
                    <a href="#story" className="mt-9 inline-flex rounded-full border border-sage/40 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sage transition hover:bg-sage hover:text-white">
                        Discover our story
                    </a>
                </div>
            </section>

            <StoryTimeline />

            <EventSchedule />

            <section className="bg-paper px-6 py-24 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                    The celebration
                </p>
                <h2 className="mt-4 font-serif text-5xl text-sage">Wedding details</h2>
                <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
                    <article className="rounded-[2rem] border border-sage/10 bg-[#f7f3ec] p-9">
                        <p className="font-serif text-3xl text-sage">Ceremony</p>
                        <p className="mt-4 text-sm leading-7 text-sage/70">
                            Saturday, 12 December 2026<br />4:00 in the afternoon<br />The
                            Garden Pavilion
                        </p>
                    </article>
                    <article className="rounded-[2rem] border border-sage/10 bg-[#f7f3ec] p-9">
                        <p className="font-serif text-3xl text-sage">Reception</p>
                        <p className="mt-4 text-sm leading-7 text-sage/70">
                            Dinner and dancing to follow<br />The Grand Ballroom<br />Colombo,
                            Sri Lanka
                        </p>
                    </article>
                </div>
            </section>

            <section className="bg-sage px-6 py-24 text-center text-white">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">
                    A note from us
                </p>
                <blockquote className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
                    “We cannot wait to celebrate this beautiful beginning with you.”
                </blockquote>
                <p className="mt-8 text-sm text-white/65">With love, {couple.partnerOne.firstName} & {couple.partnerTwo.firstName}</p>
            </section>
        </main>
    );
}