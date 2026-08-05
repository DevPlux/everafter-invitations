"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
    const { contacts } = weddingData;

    return (
        <section
            id="contact"
            className="relative overflow-hidden px-6 py-24 text-center sm:py-32"
        >
            {/* Background image */}
            <Image
                src="/images/wedding_envelope.svg"
                alt=""
                fill
                sizes="100vw"
                className="pointer-events-none object-cover object-center"
            />

            {/* Overlay for text visibility */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#24352d]/75"
            />

            {/* Soft background shading */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30"
            />

            <div className="relative z-10 mx-auto max-w-5xl">
                {/* Heading content */}
                <motion.header
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto max-w-2xl"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            ease: smoothEase,
                        }}
                        className="text-xs font-bold uppercase tracking-[0.35em] text-[#efd4a9]"
                    >
                        Need a little help?
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
                        className="mt-5 font-serif text-5xl text-white drop-shadow-md sm:text-7xl"
                    >
                        Contact us
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
                        className="mx-auto my-7 flex origin-center items-center justify-center gap-3"
                    >
                        <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#efd4a9]" />
                        <span className="size-2 rotate-45 border border-[#efd4a9]" />
                        <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#efd4a9]" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.28,
                            duration: 0.85,
                            ease: smoothEase,
                        }}
                        className="mx-auto max-w-xl text-base leading-8 text-white/90 sm:text-lg"
                    >
                        For questions about the wedding day, travel, or the
                        venue, please feel free to contact either of us.
                    </motion.p>
                </motion.header>

                {/* Contact cards */}
                <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:grid-cols-2">
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={contact.phone}
                            href={`tel:${contact.phone}`}
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
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.25 + index * 0.12,
                                ease: smoothEase,
                            }}
                            whileHover={{
                                y: -7,
                                scale: 1.02,
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden rounded-[2rem] border border-white/25 bg-[#fffdf9]/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-3 rounded-[1.5rem] border border-[#947047]/15"
                            />

                            <div className="relative z-10">
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8c6238]">
                                    {contact.role}
                                </p>

                                <p className="mt-3 font-serif text-3xl text-[#34433b] sm:text-4xl">
                                    {contact.name}
                                </p>

                                <p className="mt-4 text-sm font-semibold tracking-wide text-[#515b55]">
                                    {contact.displayPhone}
                                </p>

                                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7a5a38]">
                                    Call now

                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        →
                                    </span>
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.6,
                        duration: 0.8,
                    }}
                    className="mt-12 font-serif text-xl italic text-white/85 sm:text-2xl"
                >
                    We can&apos;t wait to celebrate with you.
                </motion.p>
            </div>
        </section>
    );
}