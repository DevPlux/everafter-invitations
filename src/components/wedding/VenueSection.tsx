"use client";

import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function VenueSection() {
    const { venue } = weddingData;

    return (
        <section
            id="venue"
            className="relative overflow-hidden bg-[#f8f4ed] px-5 py-24 sm:px-6 sm:py-32"
        >
            {/* Elegant corner decorations */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-72 w-72 opacity-60"
            >
                <div className="absolute -left-20 top-20 h-px w-72 rotate-[-42deg] bg-gradient-to-r from-transparent via-[#a08158]/50 to-transparent" />

                <div className="absolute left-9 top-16 h-24 w-12 rotate-[-38deg] rounded-[100%_0_100%_0] border border-[#768478]/30" />

                <div className="absolute left-24 top-24 h-28 w-14 rotate-[18deg] rounded-[100%_0_100%_0] border border-[#a08158]/25" />

                <div className="absolute left-2 top-36 h-20 w-10 rotate-[-65deg] rounded-[100%_0_100%_0] border border-[#768478]/25" />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rotate-180 opacity-60"
            >
                <div className="absolute -left-20 top-20 h-px w-72 rotate-[-42deg] bg-gradient-to-r from-transparent via-[#a08158]/50 to-transparent" />

                <div className="absolute left-9 top-16 h-24 w-12 rotate-[-38deg] rounded-[100%_0_100%_0] border border-[#768478]/30" />

                <div className="absolute left-24 top-24 h-28 w-14 rotate-[18deg] rounded-[100%_0_100%_0] border border-[#a08158]/25" />

                <div className="absolute left-2 top-36 h-20 w-10 rotate-[-65deg] rounded-[100%_0_100%_0] border border-[#768478]/25" />
            </div>

            {/* Fine background circles */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 top-20 size-72 rounded-full border border-[#a08158]/40"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 top-32 size-48 rounded-full border border-[#a08158]/50"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full border border-[#43584d]/50"
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section heading */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            ease: smoothEase,
                        }}
                        className="text-xs font-bold uppercase tracking-[0.35em] text-[#946b3c]"
                    >
                        Where we say “I do”
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.12,
                            duration: 0.85,
                            ease: smoothEase,
                        }}
                        className="mt-5 font-serif text-5xl text-[#34433b] sm:text-7xl"
                    >
                        The venue
                    </motion.h2>

                    <motion.div
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.22,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="mx-auto mt-7 flex items-center justify-center gap-3"
                    >
                        <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#a08158]/70" />

                        <span className="size-2 rotate-45 border border-[#a08158]/70" />

                        <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#a08158]/70" />
                    </motion.div>
                </motion.header>

                {/* Venue card */}
                <motion.div
                    initial={{ opacity: 0, y: 45, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 1,
                        ease: smoothEase,
                    }}
                    className="relative grid overflow-hidden rounded-[2rem] border border-[#657169]/15 bg-[#43584d] text-white shadow-[0_30px_90px_rgba(39,52,46,0.18)] md:grid-cols-2 md:rounded-[2.5rem]"
                >
                    {/* Inner decorative frame */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-3 z-20 rounded-[1.5rem] border border-white/10 md:rounded-[2rem]"
                    />

                    {/* Location panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.9,
                            ease: smoothEase,
                        }}
                        className="relative min-h-80 overflow-hidden bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#87988d,#43584d)] p-8 sm:min-h-[28rem] sm:p-14"
                    >
                        <div
                            aria-hidden="true"
                            className="absolute -left-24 -top-24 size-72 rounded-full border border-white/40"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute -left-12 -top-12 size-72 rounded-full border border-white/30"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute bottom-14 right-14 size-20 rotate-45 border border-[#d5bc93]/25"
                        />

                        <div className="relative flex h-full min-h-64 items-end rounded-[1.6rem] border border-white/20 p-7 sm:p-9">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ead8bb]">
                                    Destination
                                </p>

                                <p className="mt-5 font-serif text-5xl leading-tight text-white sm:text-6xl">
                                    Colombo
                                    <br />
                                    <span className="italic text-[#ead8bb]">
                                        Sri Lanka
                                    </span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Venue information */}
                    <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.9,
                            ease: smoothEase,
                        }}
                        className="relative flex flex-col justify-center p-9 sm:p-14"
                    >
                        <div
                            aria-hidden="true"
                            className="absolute right-10 top-10 size-16 rotate-45 border border-[#d5bc93]/55"
                        />

                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d8be96]">
                            The venue
                        </p>

                        <h3 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
                            {venue.name}
                        </h3>

                        <p className="mt-5 text-base leading-7 text-white/80">
                            {venue.address}
                        </p>

                        <div className="my-7 h-px w-full bg-gradient-to-r from-[#d8be96]/45 to-transparent" />

                        <p className="text-base leading-8 text-white/80">
                            An elegant garden ceremony followed by dinner,
                            heartfelt speeches, and dancing in the grand
                            ballroom.
                        </p>

                        <motion.a
                            href={venue.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{
                                y: -4,
                                scale: 1.02,
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-9 inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-white/20 bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#43584d] shadow-lg transition-colors duration-300 hover:bg-[#f3eadc] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
                        >
                            Open in Google Maps
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Bottom ornament */}
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.35,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-14 flex max-w-xs items-center gap-4"
                >
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a08158]/50" />

                    <span className="font-serif text-xl italic text-[#a08158]">
                        &amp;
                    </span>

                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a08158]/50" />
                </motion.div>
            </div>
        </section>
    );
}