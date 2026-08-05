"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function EventSchedule() {
    return (
        <section className="relative overflow-hidden bg-[#e3e8e3] px-6 py-24 sm:py-32">
            {/* Static background image */}
            <Image
                src="/images/wedding_envelope.svg"
                alt=""
                fill
                sizes="100vw"
                className="pointer-events-none object-cover object-center"
            />

            {/* Overlay for better text readability */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#e3e8e3]/50"
            />

            {/* Decorative background elements */}
            <div
                aria-hidden="true"
                className="absolute -right-32 -top-32 size-80 rounded-full border border-[#9a6f3d]/65"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-40 -left-32 size-96 rounded-full border border-[#34433b]/65"
            />

            <div
                aria-hidden="true"
                className="absolute left-1/4 top-20 size-72 rounded-full bg-amber-100/30 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-20 right-1/4 size-72 rounded-full bg-emerald-100/25 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section heading */}
                <motion.header
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            ease: smoothEase,
                        }}
                        className="text-xs font-bold uppercase tracking-[0.35em] text-[#8c6840]"
                    >
                        The celebration
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.12,
                            duration: 0.85,
                            ease: smoothEase,
                        }}
                        className="mt-5 font-serif text-5xl text-[#34433b] sm:text-7xl"
                    >
                        Order of the day
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
                        className="mx-auto my-6 h-px w-24 origin-center bg-[#a67c49]/70"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.28,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="text-sm font-semibold uppercase tracking-[0.2em] text-[#59645e]"
                    >
                        {weddingData.wedding.day}
                        <span className="mx-3 text-[#9a6f3d]">·</span>
                        {weddingData.wedding.displayDate}
                    </motion.p>
                </motion.header>

                {/* Schedule cards */}
                <div className="mt-14 grid gap-5 md:grid-cols-2">
                    {weddingData.schedule.map((event, index) => (
                        <motion.article
                            key={`${event.time}-${event.title}`}
                            initial={{
                                opacity: 0,
                                y: 35,
                                x: index % 2 === 0 ? -20 : 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.85,
                                delay: index * 0.1,
                                ease: smoothEase,
                            }}
                            whileHover={{
                                y: -6,
                                scale: 1.01,
                            }}
                            className="group rounded-[2rem] border border-[#657169]/20 bg-[#fffdf9]/95 p-8 shadow-[0_18px_55px_rgba(39,52,46,0.12)] backdrop-blur-sm transition-colors duration-300 hover:bg-[#fffaf2] sm:p-10"
                        >
                            <div className="flex gap-5 sm:gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.15 + index * 0.1,
                                        duration: 0.6,
                                        ease: smoothEase,
                                    }}
                                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#a67c49]/35 bg-[#f4eadc] font-serif text-lg font-medium text-[#946b3c] sm:size-12"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </motion.div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#946b3c]">
                                        {event.time}
                                    </p>

                                    <h3 className="mt-3 font-serif text-3xl text-[#34433b]">
                                        {event.title}
                                    </h3>

                                    <p className="mt-3 text-base leading-7 text-[#555d58]">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Venue information */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 0.15,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-[#657169]/20 bg-[#fffdf9]/90 px-7 py-9 text-center shadow-[0_18px_55px_rgba(39,52,46,0.1)] backdrop-blur-sm sm:px-10"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#946b3c]">
                        Wedding venue
                    </p>

                    <p className="mt-4 font-serif text-3xl text-[#34433b] sm:text-4xl">
                        {weddingData.venue.name}
                    </p>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#59605c] sm:text-base">
                        {weddingData.venue.address}
                    </p>

                    <motion.a
                        href={weddingData.venue.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{
                            y: -4,
                            scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-[#34433b] bg-[#34433b] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-colors duration-300 hover:bg-[#4d5d54] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#34433b]/25"
                    >
                        View location
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}