"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function StoryTimeline() {
    return (
        <section
            id="story"
            className="relative overflow-hidden bg-[#f7f3ec] px-6 py-24 sm:py-32"
        >
            {/* Static background image */}
            <Image
                src="/images/wedding_story.svg"
                alt=""
                fill
                sizes="100vw"
                className="pointer-events-none object-cover object-center"
            />

            {/* Overlay for strong text visibility */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#f7f3ec]/48"
            />

            {/* Decorative background colors */}
            <div
                aria-hidden="true"
                className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl"
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
                        A journey of two hearts
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
                        Our story
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.28,
                            duration: 0.85,
                            ease: smoothEase,
                        }}
                        className="mx-auto max-w-2xl text-base leading-8 text-[#4f5652] sm:text-lg"
                    >
                        {weddingData.story.introduction}
                    </motion.p>
                </motion.header>

                {/* Timeline */}
                <div className="relative mt-16 sm:mt-20">
                    <motion.div
                        aria-hidden="true"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        transition={{
                            duration: 1.5,
                            ease: smoothEase,
                        }}
                        className="absolute bottom-0 left-5 top-0 w-px origin-top bg-[#a67c49]/45 md:left-1/2"
                    />

                    <div className="space-y-12 md:space-y-0">
                        {weddingData.story.milestones.map(
                            (milestone, index) => {
                                const isLeft = index % 2 === 0;

                                return (
                                    <motion.article
                                        key={`${milestone.year}-${milestone.title}`}
                                        initial={{
                                            opacity: 0,
                                            x: isLeft ? -45 : 45,
                                            y: 25,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.25,
                                        }}
                                        transition={{
                                            duration: 0.9,
                                            delay: index * 0.08,
                                            ease: smoothEase,
                                        }}
                                        className={`relative pl-16 md:grid md:grid-cols-2 md:pl-0 ${
                                            index > 0 ? "md:-mt-4" : ""
                                        }`}
                                    >
                                        {/* Timeline point */}
                                        <motion.div
                                            aria-hidden="true"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.4,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: 0.25,
                                                duration: 0.6,
                                                ease: smoothEase,
                                            }}
                                            className="absolute left-[0.82rem] top-7 z-20 size-4 rounded-full border-4 border-[#f7f3ec] bg-[#a67c49] shadow-[0_0_0_1px_rgba(166,124,73,0.65)] md:left-1/2 md:-translate-x-1/2"
                                        />

                                        <div
                                            className={
                                                isLeft
                                                    ? "md:col-start-1 md:pr-14 md:text-right"
                                                    : "md:col-start-2 md:pl-14"
                                            }
                                        >
                                            <motion.div
                                                whileHover={{
                                                    y: -6,
                                                    scale: 1.01,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: smoothEase,
                                                }}
                                                className="rounded-[2rem] border border-[#8b765c]/20 bg-[#fffdf9]/95 p-7 shadow-[0_18px_55px_rgba(39,52,46,0.12)] backdrop-blur-sm sm:p-9"
                                            >
                                                <p className="font-serif text-4xl font-medium text-[#9a6f3d]">
                                                    {milestone.year}
                                                </p>

                                                <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#776751]">
                                                    {milestone.eyebrow}
                                                </p>

                                                <h3 className="mt-2 font-serif text-3xl text-[#34433b]">
                                                    {milestone.title}
                                                </h3>

                                                <p className="mt-4 text-base leading-7 text-[#555b57]">
                                                    {milestone.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.article>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}