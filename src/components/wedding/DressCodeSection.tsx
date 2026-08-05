"use client";

import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function DressCodeSection() {
    const { dressCode } = weddingData;

    return (
        <section
            id="dress-code"
            className="relative overflow-hidden bg-[#f8f4ed] px-6 py-24 text-center sm:py-32"
        >
            {/* Top-left corner decoration */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: -30, y: -30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 1.2,
                    ease: smoothEase,
                }}
                className="pointer-events-none absolute left-0 top-0 size-84 opacity-60"
            >
                <div className="absolute -left-20 top-20 h-px w-72 -rotate-45 bg-gradient-to-r from-transparent via-[#9a7447]/50 to-transparent" />

                <div className="absolute left-8 top-10 h-28 w-14 -rotate-[35deg] rounded-[100%_0_100%_0] border border-[#63756a]/30" />

                <div className="absolute left-20 top-24 h-24 w-12 rotate-12 rounded-[100%_0_100%_0] border border-[#9a7447]/30" />

                <div className="absolute left-2 top-32 h-20 w-10 -rotate-[65deg] rounded-[100%_0_100%_0] border border-[#63756a]/25" />
            </motion.div>

            {/* Bottom-right corner decoration */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 1.2,
                    ease: smoothEase,
                }}
                className="pointer-events-none absolute bottom-0 right-0 size-84 rotate-180 opacity-60"
            >
                <div className="absolute -left-20 top-20 h-px w-72 -rotate-45 bg-gradient-to-r from-transparent via-[#9a7447]/50 to-transparent" />

                <div className="absolute left-8 top-10 h-28 w-14 -rotate-[35deg] rounded-[100%_0_100%_0] border border-[#63756a]/30" />

                <div className="absolute left-20 top-24 h-24 w-12 rotate-12 rounded-[100%_0_100%_0] border border-[#9a7447]/30" />

                <div className="absolute left-2 top-32 h-20 w-10 -rotate-[65deg] rounded-[100%_0_100%_0] border border-[#63756a]/25" />
            </motion.div>

            <div className="relative z-10 mx-auto max-w-3xl">
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
                    What to wear
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.1,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mt-5 font-serif text-5xl text-[#34433b] sm:text-7xl"
                >
                    {dressCode.title}
                </motion.h2>

                <motion.div
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: smoothEase,
                    }}
                    className="mx-auto my-7 flex origin-center items-center justify-center gap-3"
                >
                    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#9a7447]/70" />
                    <span className="size-2 rotate-45 border border-[#9a7447]/70" />
                    <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#9a7447]/70" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.25,
                        duration: 0.85,
                        ease: smoothEase,
                    }}
                    className="mx-auto max-w-2xl text-base leading-8 text-[#515954] sm:text-lg"
                >
                    {dressCode.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.35,
                        duration: 0.85,
                        ease: smoothEase,
                    }}
                    className="mt-11 flex flex-wrap justify-center gap-4"
                >
                    {dressCode.colours.map((colour, index) => (
                        <motion.span
                            key={colour}
                            title={colour}
                            aria-label={`Suggested colour: ${colour}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.4 + index * 0.1,
                                duration: 0.55,
                                ease: smoothEase,
                            }}
                            whileHover={{
                                y: -6,
                                scale: 1.12,
                            }}
                            className="size-12 cursor-default rounded-full border-4 border-white shadow-[0_8px_20px_rgba(52,67,59,0.2)] sm:size-14"
                            style={{ backgroundColor: colour }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}