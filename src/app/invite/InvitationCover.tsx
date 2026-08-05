"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import WeddingHero from "@/components/wedding/WeddingHero";
import CoupleIntroduction from "@/components/wedding/CoupleIntroduction";
import {StoryTimeline} from "@/components/wedding/StoryTimeline";
import {EventSchedule} from "@/components/wedding/EventSchedule";
import VenueSection from "@/components/wedding/VenueSection";
import GallerySection from "@/components/wedding/GallerySection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import ContactSection from "@/components/wedding/ContactSection";
import ClosingMessageSection from "@/components/wedding/ClosingMessageSection";
import WeddingFooter from "@/components/wedding/WeddingFooter";

import { FloatingPetals } from "@/components/wedding/FloatingPetals";

import { weddingData } from "@/data/wedding";

type InvitationCoverProps = {
    guestName: string;
};

export default function InvitationCover({
                                            guestName,
                                        }: InvitationCoverProps) {
    const storageKey = `wedding-invitation-opened:${guestName}`;

    const [isOpen, setIsOpen] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const wasOpened = localStorage.getItem(storageKey) === "true";

        if (wasOpened) {
            setIsOpen(true);
            setShowContent(true);
        }

        setIsReady(true);
    }, [storageKey]);

    useEffect(() => {
        if (!isReady) return;

        document.body.style.overflow =
            isOpen || showContent ? "" : "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, showContent, isReady]);

    useEffect(() => {
        if (!isOpening) return;

        const timer = window.setTimeout(() => {
            localStorage.setItem(storageKey, "true");
            setIsOpen(true);
        }, 2400);

        return () => window.clearTimeout(timer);
    }, [isOpening, storageKey]);

    function openInvitation() {
        if (isOpening) return;

        setIsOpening(true);
    }

    if (!isReady) {
        return (
            <div className="fixed inset-0 bg-[#f5f1e8]" />
        );
    }

    return (
        <>
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    if (isOpen) {
                        setShowContent(true);
                    }
                }}
            >
                {!isOpen && (
                    <motion.section
                        key="invitation-envelope"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.04,
                            filter: "blur(8px)",
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-[#f5f1e8]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0"
                        >

                            {/* Mobile image — visible below 768px */}
                            <Image
                                src="/images/wedding_envelope_mobile.svg"
                                alt=""
                                fill
                                priority
                                sizes="(max-width: 767px) 100vw, 0px"
                                className="object-cover object-center md:hidden"
                            />

                            {/* Desktop image — visible from 768px upward */}
                            <Image
                                src="/images/wedding_envelope.svg"
                                alt=""
                                fill
                                priority
                                sizes="(min-width: 768px) 100vw, 0px"
                                className="hidden object-cover object-center md:block"
                            />

                        </motion.div>

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,73,61,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(182,155,114,0.18),transparent_40%)]" />

                        <motion.div
                            aria-hidden="true"
                            animate={{
                                x: [0, 14, 0],
                                y: [0, -10, 0],
                                scale: [1, 1.08, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -left-24 -top-24 size-72 rounded-full bg-[#7f9279]/20 blur-3xl"
                        />

                        <motion.div
                            aria-hidden="true"
                            animate={{
                                x: [0, -14, 0],
                                y: [0, 10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[#d2b779]/25 blur-3xl"
                        />

                        {/* Elegant outer borders */}
                        <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-[#a98a52]/35 sm:inset-8" />

                        <div className="pointer-events-none absolute inset-7 rounded-[1.6rem] border border-[#53634f]/15 sm:inset-11" />

                        {/* Centered invitation content */}
                        <div className="relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 py-6">
                            {/* Compact guest heading */}
                            <motion.div
                                initial={{ opacity: 0, y: -16 }}
                                animate={
                                    isOpening
                                        ? { opacity: 0, y: -20 }
                                        : { opacity: 1, y: 0 }
                                }
                                transition={{ duration: 0.6 }}
                                className="mt-10 flex flex-col items-center text-center sm:mb-4"
                            >
                                {/* Gold ornament */}
                                <div
                                    aria-hidden="true"
                                    className="mb-3 flex items-center justify-center gap-3"
                                >
                                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#b69b72]" />
                                    <span className="size-1.5 rotate-45 border border-[#9e7e48] bg-[#d8c08c]" />
                                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#b69b72]" />
                                </div>

                                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[#92774f] sm:text-[14px]">
                                    A special invitation for
                                </p>

                                <h1 className="mt-1.5 max-w-2xl font-serif text-2xl leading-tight text-[#3f493d] sm:text-[40px]">
                                    {guestName}
                                </h1>
                            </motion.div>

                            {/* Envelope */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                                animate={
                                    isOpening
                                        ? {
                                            opacity: 1,
                                            y: 60,
                                            scale: 1.02,
                                        }
                                        : {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }
                                }
                                transition={{
                                    opacity: { duration: 0.7 },
                                    y: {
                                        duration: isOpening ? 0.7 : 0.9,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                    scale: { duration: 0.7 },
                                }}
                                className="relative h-[290px] w-full max-w-[520px] sm:h-[405px] sm:max-w-[620px] sm:-mt-10"
                                style={{ perspective: "1400px" }}
                            >
                                {/* Envelope shadow */}
                                <motion.div
                                    animate={
                                        isOpening
                                            ? {
                                                opacity: 0.14,
                                                scaleX: 1.15,
                                                y: 30,
                                            }
                                            : {
                                                opacity: 0.25,
                                                scaleX: 1,
                                                y: 0,
                                            }
                                    }
                                    transition={{ duration: 1 }}
                                    className="absolute bottom-0 left-[8%] h-14 w-[84%] rounded-full bg-[#344134]/35 blur-2xl"
                                />

                                {/* Envelope back */}
                                <div className="absolute bottom-0 left-0 h-[72%] w-full overflow-hidden rounded-b-[1.5rem] rounded-t-lg border border-[#a98a52]/40 bg-[#dfccb1] shadow-[0_28px_65px_rgba(54,65,50,0.25)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#eadcc8] via-[#ddc8aa] to-[#c7a978]" />

                                    {/* Subtle green tint */}
                                    <div className="absolute inset-0 bg-[#53634f]/[0.04]" />

                                    <div className="absolute inset-3 rounded-xl border border-white/25" />
                                </div>

                                {/* Invitation card */}
                                <motion.div
                                    initial={{ y: 80 }}
                                    animate={
                                        isOpening
                                            ? {
                                                y: -225,
                                                scale: 1.03,
                                                rotate: 0,
                                            }
                                            : {
                                                y: 80,
                                                scale: 0.93,
                                                rotate: -0.4,
                                            }
                                    }
                                    transition={{
                                        delay: isOpening ? 0.65 : 0.2,
                                        duration: 1.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="absolute bottom-[7%] left-[6%] z-20 flex h-[88%] w-[88%] flex-col items-center justify-center overflow-hidden rounded-xl border border-[#a98a52]/35 bg-[#fffdf8] px-5 py-6 text-center shadow-[0_22px_55px_rgba(51,61,48,0.22)] sm:px-10"
                                >
                                    <div className="pointer-events-none absolute inset-3 rounded-lg border border-[#b69b72]/25" />

                                    <div className="pointer-events-none absolute -left-12 -top-12 size-36 rounded-full bg-[#7f9279]/10 blur-3xl" />

                                    <div className="pointer-events-none absolute -bottom-12 -right-12 size-36 rounded-full bg-[#d8bd80]/20 blur-3xl" />

                                    <div className="relative">
                                        <p className="text-[0.52rem] font-semibold uppercase tracking-[0.28em] text-[#92774f] sm:text-[0.65rem]">
                                            Together with their families
                                        </p>

                                        <div className="mt-3 flex items-center justify-center gap-3">
                                            <span className="h-px w-7 bg-[#b69b72]/60" />
                                            <span className="size-1.5 rotate-45 bg-[#71806b]" />
                                            <span className="h-px w-7 bg-[#b69b72]/60" />
                                        </div>

                                        <div className="mt-3">
                                            <p className="font-serif text-3xl italic leading-none text-[#3f493d] sm:text-5xl">
                                                {weddingData.couple.partnerOne.firstName}
                                            </p>

                                            <p className="my-1 font-serif text-xl italic text-[#a08158] sm:text-2xl">
                                                &
                                            </p>

                                            <p className="font-serif text-3xl italic leading-none text-[#3f493d] sm:text-5xl">
                                                {weddingData.couple.partnerTwo.firstName}
                                            </p>
                                        </div>

                                        <p className="mx-auto mt-4 sm:px-0 px-6 max-w-sm text-[0.68rem] leading-5 text-stone-600 sm:text-xs">
                                            {weddingData.message.introduction}
                                        </p>

                                        <p className="mt-3 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-[#92774f] sm:text-[0.65rem]">
                                            {weddingData.wedding.displayDate}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Opening flap */}
                                <motion.div
                                    initial={{ rotateX: 0 }}
                                    animate={{
                                        rotateX: isOpening ? -180 : 0,
                                    }}
                                    transition={{
                                        delay: isOpening ? 0.15 : 0,
                                        duration: 0.85,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className={`absolute left-0 top-[28%] h-[45%] w-full origin-top ${
                                        isOpening ? "z-10" : "z-40"
                                    }`}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-b from-[#eadbc5] to-[#c9aa7d] drop-shadow-md"
                                        style={{
                                            clipPath:
                                                "polygon(0 0, 100% 0, 50% 100%)",
                                            backfaceVisibility: "hidden",
                                        }}
                                    />

                                    <div
                                        className="absolute inset-0 bg-[#b99868]"
                                        style={{
                                            clipPath:
                                                "polygon(0 0, 100% 0, 50% 100%)",
                                            transform: "rotateY(180deg)",
                                            backfaceVisibility: "hidden",
                                        }}
                                    />
                                </motion.div>

                                {/* Left fold */}
                                <div
                                    className="absolute bottom-0 left-0 z-30 h-[72%] w-full rounded-b-[1.5rem] bg-gradient-to-br from-[#e4d1b6] to-[#c8a878]"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 52% 68%, 0 100%)",
                                    }}
                                />

                                {/* Right fold */}
                                <div
                                    className="absolute bottom-0 right-0 z-30 h-[72%] w-full rounded-b-[1.5rem] bg-gradient-to-bl from-[#dfc7a5] to-[#bd9968]"
                                    style={{
                                        clipPath:
                                            "polygon(100% 0, 48% 68%, 100% 100%)",
                                    }}
                                />

                                {/* Bottom fold */}
                                <div
                                    className="absolute bottom-0 left-0 z-30 h-[52%] w-full rounded-b-[1.5rem] bg-gradient-to-t from-[#bd9968] to-[#dfcaac]"
                                    style={{
                                        clipPath:
                                            "polygon(0 100%, 50% 0, 100% 100%)",
                                    }}
                                />

                                {/* Wax seal */}
                                <motion.button
                                    type="button"
                                    onClick={openInvitation}
                                    disabled={isOpening}
                                    aria-label="Open wedding invitation"
                                    animate={
                                        isOpening
                                            ? {
                                                scale: [1, 0.8, 1.25],
                                                opacity: [1, 1, 0],
                                                rotate: [0, -8, 8],
                                            }
                                            : {
                                                scale: [1, 1.05, 1],
                                            }
                                    }
                                    transition={
                                        isOpening
                                            ? { duration: 0.55 }
                                            : {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }
                                    }
                                    className="absolute bottom-[17%] left-1/2 z-50 flex size-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#354332]/25 bg-gradient-to-br from-[#65735e] via-[#4c5c48] to-[#32402f] text-[#f4e4b3] shadow-[0_10px_28px_rgba(48,62,46,0.42)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b69b72]/35 disabled:cursor-wait sm:size-20"
                                >
                                    <span className="absolute inset-1.5 rounded-full border border-[#e2ca8d]/40" />

                                    <span className="relative font-serif text-lg italic sm:text-xl">
                           {weddingData.couple.partnerOne.firstName.charAt(0)}
                                        &amp;
                                        {weddingData.couple.partnerTwo.firstName.charAt(0)}
                        </span>
                                </motion.button>
                            </motion.div>

                            {/* Button directly below envelope */}
                            <motion.button
                                type="button"
                                onClick={openInvitation}
                                disabled={isOpening}
                                animate={
                                    isOpening
                                        ? {
                                            opacity: 0,
                                            y: 18,
                                        }
                                        : {
                                            opacity: 1,
                                            y: [0, -3, 0],
                                        }
                                }
                                transition={
                                    isOpening
                                        ? { duration: 0.3 }
                                        : {
                                            y: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            },
                                        }
                                }
                                className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#b69b72]/70 bg-[#3f493d] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#fffaf0] shadow-[0_12px_28px_rgba(47,60,45,0.25)] transition-colors hover:bg-[#52614e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b69b72]/30 disabled:cursor-wait sm:px-10 sm:py-3.5 sm:text-sm"
                            >
                                {isOpening ? "Opening..." : "Open invitation"}

                                {!isOpening && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="size-4 text-[#dec68e]"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                )}
                            </motion.button>

                            <motion.p
                                animate={{ opacity: isOpening ? 0 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 text-center text-[0.68rem] tracking-wide text-[#596454]/65 sm:text-xs"
                            >
                                Tap the seal or button to reveal the wedding details
                            </motion.p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {showContent && (
                <WeddingIntroduction guestName={guestName} />
            )}
        </>
    );
}

type WeddingIntroductionProps = {
    guestName: string;
};

function WeddingIntroduction({
                                 guestName,
                             }: WeddingIntroductionProps) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[#faf7f2]"
        >
            {/* Petals begin after the invitation opens */}
            <div className="relative overflow-hidden">
                <WeddingHero guestName={guestName} />
                <FloatingPetals />
            </div>

            <CoupleIntroduction />
            <StoryTimeline />
            <EventSchedule />
            <VenueSection />
            <GallerySection />
            <DressCodeSection />
            <ContactSection />
            <ClosingMessageSection />
            <WeddingFooter />
        </motion.main>
    );
}