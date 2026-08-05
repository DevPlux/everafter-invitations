"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import WeddingCountdown from "./WeddingCountdown";
import { weddingData } from "@/data/wedding";

type WeddingHeroProps = {
    guestName: string;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function WeddingHero({ guestName }: WeddingHeroProps) {
    const { couple, wedding, venue, message } = weddingData;

    return (
        <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#f7f1e8] px-4 py-20">
            {/* Smooth background image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.5,
                    ease: smoothEase,
                }}
                className="absolute inset-0"
            >
                <Image
                    src="/images/wedding_envelope.svg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Soft overlay for text readability */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 0.2,
                    duration: 1.2,
                    ease: smoothEase,
                }}
                className="absolute inset-0 bg-[#f7f1e8]/5"
            />

            {/* Background decorations */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: -60, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                    delay: 0.3,
                    duration: 1.3,
                    ease: smoothEase,
                }}
                className="absolute -left-36 top-8 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, x: 60, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                    delay: 0.4,
                    duration: 1.3,
                    ease: smoothEase,
                }}
                className="absolute -right-36 bottom-8 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"
            />

            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.25,
                    duration: 1.2,
                    ease: smoothEase,
                }}
                className="absolute inset-4 rounded-[2rem] border border-[#b69b72]/25 sm:inset-8"
            />

            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.4,
                    duration: 1.2,
                    ease: smoothEase,
                }}
                className="absolute inset-7 rounded-[1.5rem] border border-[#b69b72]/15 sm:inset-12"
            />

            {/* Hero content */}
            <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.35,
                        duration: 0.8,
                        ease: smoothEase,
                    }}
                    className="text-xs font-medium uppercase tracking-[0.35em] text-[#8c7454] sm:text-sm"
                >
                    Welcome to our wedding
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: smoothEase,
                    }}
                    className="mt-7 font-serif text-lg italic text-stone-600 sm:text-xl"
                >
                    Dear {guestName},
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        delay: 0.65,
                        duration: 1,
                        ease: smoothEase,
                    }}
                    className="mt-7 font-serif text-5xl leading-tight text-[#3f493d] sm:text-7xl lg:text-8xl"
                >
                    {couple.partnerOne.firstName}

                    <span className="mx-3 inline-block italic text-[#a08158] sm:mx-5">
                        &amp;
                    </span>

                    {couple.partnerTwo.firstName}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.85,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8"
                >
                    {message.introduction}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-9 flex max-w-2xl items-center justify-center gap-4"
                >
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 1.1,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="h-px flex-1 origin-right bg-[#b69b72]/50"
                    />

                    <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7454]">
                            {wedding.day}
                        </p>

                        <p className="mt-2 font-serif text-xl text-[#3f493d] sm:text-2xl">
                            {wedding.displayDate}
                        </p>

                        <p className="mt-1 text-sm text-stone-500">
                            {wedding.time}
                        </p>
                    </div>

                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 1.1,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="h-px flex-1 origin-left bg-[#b69b72]/50"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.15,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                >
                    <WeddingCountdown weddingDate={wedding.dateTime} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.3,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mt-10"
                >
                    <p className="font-serif text-xl text-[#3f493d]">
                        {venue.name}
                    </p>

                    <p className="mt-2 text-sm text-stone-500">
                        {venue.address}
                    </p>
                </motion.div>

                <motion.a
                    href="#couple"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.45,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full border border-[#8c7454] bg-[#3f493d] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-colors duration-300 hover:bg-[#566052] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8c7454]/30"
                >
                    Discover our story
                </motion.a>

                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{
                        delay: 1.6,
                        duration: 0.9,
                        ease: smoothEase,
                    }}
                    className="mx-auto mt-8 h-14 w-px origin-top bg-gradient-to-b from-[#a08158] to-transparent"
                />
            </div>
        </section>
    );
}