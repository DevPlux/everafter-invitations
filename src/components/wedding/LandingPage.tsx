"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import CoupleIntroduction  from "./CoupleIntroduction";
import { EventSchedule } from "./EventSchedule";
import { StoryTimeline } from "./StoryTimeline";
import WeddingCountdown  from "./WeddingCountdown";
import { weddingData } from "@/data/wedding";

import Link from "next/link";
import VenueSection from "@/components/wedding/VenueSection";
import GallerySection from "@/components/wedding/GallerySection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import ContactSection from "@/components/wedding/ContactSection";
import ClosingMessageSection from "@/components/wedding/ClosingMessageSection";
import WeddingFooter from "@/components/wedding/WeddingFooter";

export function LandingPage({ guestName }: { guestName?: string }) {
    const { couple, wedding, venue, message, dressCode, contacts } = weddingData;

    return (
        <main>
            <section
                id="home"
                className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#24322c] px-6 py-24 text-center"
            >
                {/* Animated responsive background */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
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
                        src="/images/wedding_hero.svg"
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 768px) 100vw, 0px"
                        className="hidden object-cover object-center md:block"
                    />
                </motion.div>

                {/* Visibility overlays */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-green-950/40"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#17231d]/60 via-transparent to-[#17231d]/85"
                />

                {/* Decorative glows */}
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-[#efd7ce]/15 blur-3xl"
                />

                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1.5 }}
                    className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-[#bdcbbb]/15 blur-3xl"
                />

                {/* Animated border */}
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute inset-5 rounded-[2rem] border border-white/30 sm:inset-10"
                />

                {/* Hero content */}
                <div className="relative z-10 mx-auto max-w-5xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xs font-bold uppercase tracking-[0.35em] text-[#f2d3a4] drop-shadow-md sm:text-sm"
                    >
                        We are getting married
                    </motion.p>

                    {guestName && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.8 }}
                            className="mt-7 font-serif text-2xl italic text-white drop-shadow-md sm:text-3xl"
                        >
                            Dear {guestName},
                        </motion.p>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 35, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: 0.45,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-5 font-serif text-6xl leading-[0.95] text-white drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)] sm:text-8xl lg:text-9xl"
                    >
                        {couple.partnerOne.firstName}

                        <span className="mx-3 inline-block text-[#f0cc94] sm:mx-5">
                &amp;
            </span>

                        {couple.partnerTwo.firstName}
                    </motion.h1>

                    {/* Decorative divider */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="mx-auto mt-8 flex origin-center items-center justify-center gap-3"
                    >
                        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#f0cc94]" />
                        <span className="size-2 rotate-45 border border-[#f0cc94]" />
                        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#f0cc94]" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mx-auto mt-7 px-12 max-w-2xl text-base font-medium leading-8 text-white drop-shadow-md sm:text-lg"
                    >
                        {message.introduction}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, duration: 0.8 }}
                        className="mt-8 font-serif text-3xl text-white drop-shadow-md sm:text-4xl"
                    >
                        {wedding.displayDate}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.8 }}
                        className="mx-auto mt-3 max-w-2xl text-xs font-bold uppercase leading-6 tracking-[0.2em] text-[#f5e2c6] drop-shadow-md sm:tracking-[0.25em]"
                    >
                        {wedding.time}

                        <span className="mx-3 text-white/70">•</span>

                        {venue.address}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.8 }}
                    >
                        <WeddingCountdown weddingDate={wedding.dateTime} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <motion.a
                            href="#couple"
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#f0cc94] bg-[#f0cc94] px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#28372f] shadow-lg transition-colors hover:bg-[#f8dfb8]"
                        >
                            Meet the couple
                        </motion.a>

                        <motion.div
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/couple"
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/80 bg-black/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white hover:text-[#28372f]"
                            >
                                Manage Invitations
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <CoupleIntroduction />
            <StoryTimeline />
            <EventSchedule />

            <VenueSection />
            <GallerySection />
            <DressCodeSection />
            <ContactSection />
            <ClosingMessageSection />
            <WeddingFooter />
        </main>
    );
}