"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { weddingData } from "@/data/wedding";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function CoupleIntroduction() {
    const { couple, story } = weddingData;

    return (
        <section
            id="couple"
            className="relative scroll-mt-8 overflow-hidden bg-[#fffdf9] px-4 py-24 sm:py-32"
        >
            {/* Static background image */}
            <Image
                src="/images/wedding_envelope.svg"
                alt=""
                fill
                sizes="100vw"
                className="pointer-events-none object-cover object-center"
            />

            {/* Background overlay for readability */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#fffdf9]/70"
            />

            {/* Decorative background colors */}
            <div
                aria-hidden="true"
                className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section header */}
                <motion.header
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                        once: true,
                        amount: 0.35,
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
                        className="text-xs font-medium uppercase tracking-[0.35em] text-[#9b7b52]"
                    >
                        Bride &amp; Groom
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
                        className="mt-5 font-serif text-4xl text-[#3f493d] sm:text-6xl"
                    >
                        Together is a beautiful place to be
                    </motion.h2>

                    <motion.div
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.25,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="mx-auto my-7 h-px w-24 bg-[#b69b72]/60"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.3,
                            duration: 0.85,
                            ease: smoothEase,
                        }}
                        className="text-base leading-8 text-stone-600 sm:text-lg"
                    >
                        {story.introduction}
                    </motion.p>
                </motion.header>

                {/* Couple cards */}
                <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -45, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: smoothEase,
                        }}
                    >
                        <PartnerCard
                            initials={couple.partnerOne.firstName.slice(0, 1)}
                            firstName={couple.partnerOne.firstName}
                            fullName={couple.partnerOne.fullName}
                            role="The Groom"
                            description={story.partnerOneDescription}
                        />
                    </motion.div>

                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{
                            once: true,
                            amount: 0.5,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                            ease: smoothEase,
                        }}
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#b69b72]/40 bg-[#f7f1e8]/90 font-serif text-3xl italic text-[#a08158] shadow-sm backdrop-blur-sm md:h-24 md:w-24"
                    >
                        &amp;
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 45, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            delay: 0.12,
                            duration: 0.9,
                            ease: smoothEase,
                        }}
                    >
                        <PartnerCard
                            initials={couple.partnerTwo.firstName.slice(0, 1)}
                            firstName={couple.partnerTwo.firstName}
                            fullName={couple.partnerTwo.fullName}
                            role="The Bride"
                            description={story.partnerTwoDescription}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

type PartnerCardProps = {
    initials: string;
    firstName: string;
    fullName: string;
    role: string;
    description: string;
};

function PartnerCard({
                         initials,
                         firstName,
                         fullName,
                         role,
                         description,
                     }: PartnerCardProps) {
    return (
        <article className="group text-center">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-b-[2rem] rounded-t-[10rem] border border-[#d9c8ad]/50 bg-gradient-to-br from-[#eee2d3] via-[#f8f2e9] to-[#ddd0bd] shadow-xl">
                <div className="absolute inset-4 rounded-b-[1.4rem] rounded-t-[9rem] border border-white/70" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-8xl text-[#8c7454]/45 transition duration-500 group-hover:scale-105">
                        {initials}
                    </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3f493d]/55 to-transparent px-6 pb-7 pt-20">
                    <p className="font-serif text-3xl text-white">
                        {firstName}
                    </p>
                </div>
            </div>

            <p className="mt-7 text-xs font-medium uppercase tracking-[0.3em] text-[#9b7b52]">
                {role}
            </p>

            <h3 className="mt-3 font-serif text-3xl text-[#3f493d]">
                {fullName}
            </h3>

            <p className="mx-auto mt-4 max-w-sm leading-7 text-stone-600">
                {description}
            </p>
        </article>
    );
}