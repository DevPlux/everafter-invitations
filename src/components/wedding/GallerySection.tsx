"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryTones = [
    "from-[#c9ada3] to-[#eee0d6]",
    "from-[#718579] to-[#dbe2da]",
    "from-[#b99b72] to-[#eadfce]",
    "from-[#aeb8aa] to-[#e7ddd0]",
    "from-[#d7bab1] to-[#f4e8df]",
    "from-[#6e7f73] to-[#c9d4cc]",
];

const galleryLabels = [
    "Where it began",
    "Beautiful memories",
    "Forever together",
    "Love and laughter",
    "Our journey",
    "A timeless love",
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function GallerySection() {
    return (
        <section
            id="gallery"
            className="relative overflow-hidden  px-5 py-24 sm:px-6 sm:py-32"
        >
            {/* Static section background */}
            <Image
                src="/images/wedding_envelope.svg"
                alt=""
                fill
                sizes="100vw"
                className="pointer-events-none object-cover object-center"
            />

            {/* Background overlay for text visibility */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#f4efe8]/10"
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
                        Moments we treasure
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
                        Our gallery
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
                        <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#a08158]/70" />

                        <span className="size-2 rotate-45 border border-[#a08158]/70" />

                        <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#a08158]/70" />
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
                        className="mx-auto max-w-2xl text-base leading-8 text-[#555d58] sm:text-lg"
                    >
                        A collection of joyful moments, shared adventures, and
                        beautiful memories from our journey together.
                    </motion.p>
                </motion.header>

                {/* Gallery grid */}
                <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:grid-rows-2">
                    {galleryTones.map((tone, index) => {
                        const isTall = index === 0 || index === 5;

                        return (
                            <motion.article
                                key={`${tone}-${index}`}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    scale: 0.96,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.09,
                                    ease: smoothEase,
                                }}
                                whileHover={{
                                    y: -7,
                                    scale: 1.015,
                                }}
                                className={`group relative min-h-52 overflow-hidden rounded-[1.5rem] border border-white/50 bg-gradient-to-br shadow-[0_18px_45px_rgba(52,67,59,0.12)] sm:rounded-[2rem] ${tone} ${
                                    isTall
                                        ? "md:row-span-2 md:min-h-[29rem]"
                                        : "md:min-h-[14rem]"
                                }`}
                            >
                                {/* Inner border */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-3 z-20 rounded-[1.1rem] border border-white/30 sm:rounded-[1.5rem]"
                                />

                                {/* Placeholder number */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                        aria-hidden="true"
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.2 + index * 0.09,
                                            duration: 0.7,
                                            ease: smoothEase,
                                        }}
                                        className="font-serif text-6xl text-white/65 drop-shadow-sm transition-transform duration-500 group-hover:scale-110 sm:text-7xl"
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </motion.span>
                                </div>

                                {/* Card shading */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-gradient-to-t from-[#27342e]/75 via-transparent to-white/10"
                                />

                                {/* Gallery caption */}
                                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#f0d8b5]">
                                        Our moment
                                    </p>

                                    <p className="mt-2 font-serif text-xl text-white drop-shadow-sm sm:text-2xl">
                                        {galleryLabels[index]}
                                    </p>
                                </div>

                                {/* Hover glow */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/10"
                                />
                            </motion.article>
                        );
                    })}
                </div>

                {/* Bottom message */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.25,
                        duration: 0.8,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-14 max-w-xl text-center"
                >
                    <p className="font-serif text-2xl italic text-[#59645e] sm:text-3xl">
                        Every picture tells a part of our story.
                    </p>

                    <div
                        aria-hidden="true"
                        className="mx-auto mt-7 flex max-w-xs items-center gap-4"
                    >
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a08158]/50" />

                        <span className="font-serif text-xl italic text-[#a08158]">
                            &amp;
                        </span>

                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a08158]/50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}