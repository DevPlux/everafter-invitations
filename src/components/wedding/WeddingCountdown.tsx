"use client";

import { useEffect, useState } from "react";

type WeddingCountdownProps = {
    weddingDate: string;
};

type TimeRemaining = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isComplete: boolean;
};

function calculateTimeRemaining(weddingDate: string): TimeRemaining {
    const difference = new Date(weddingDate).getTime() - Date.now();

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isComplete: true,
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isComplete: false,
    };
}

export default function WeddingCountdown({
                                             weddingDate,
                                         }: WeddingCountdownProps) {
    const [timeRemaining, setTimeRemaining] =
        useState<TimeRemaining | null>(null);

    useEffect(() => {
        function updateCountdown() {
            setTimeRemaining(calculateTimeRemaining(weddingDate));
        }

        updateCountdown();

        const intervalId = window.setInterval(updateCountdown, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [weddingDate]);

    // Prevents server/client hydration differences
    if (!timeRemaining) {
        return (
            <div
                className="mt-10 grid grid-cols-4 gap-2 sm:gap-5"
                aria-label="Loading wedding countdown"
            >
                {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
                    <CountdownItem key={label} value="--" label={label} />
                ))}
            </div>
        );
    }

    if (timeRemaining.isComplete) {
        return (
            <div className="mt-10 rounded-2xl border border-[#cbb58f]/40 bg-white/40 px-6 py-5 backdrop-blur">
                <p className="font-serif text-2xl italic text-[#3f493d] sm:text-3xl">
                    Today is our special day!
                </p>

                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#8c7454]">
                    Let the celebration begin
                </p>
            </div>
        );
    }

    return (
        <div
            className="mt-10 grid grid-cols-4 gap-2 sm:gap-5"
            aria-label={`${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes and ${timeRemaining.seconds} seconds until the wedding`}
        >
            <CountdownItem value={timeRemaining.days} label="Days" />
            <CountdownItem value={timeRemaining.hours} label="Hours" />
            <CountdownItem value={timeRemaining.minutes} label="Minutes" />
            <CountdownItem value={timeRemaining.seconds} label="Seconds" />
        </div>
    );
}

type CountdownItemProps = {
    value: number | string;
    label: string;
};

function CountdownItem({ value, label }: CountdownItemProps) {
    const formattedValue =
        typeof value === "number" ? String(value).padStart(2, "0") : value;

    return (
        <div className="rounded-2xl border border-[#cbb58f]/35 bg-white/55 px-2 py-4 shadow-sm backdrop-blur-sm sm:px-5 sm:py-6">
            <p className="font-serif text-2xl text-[#3f493d] sm:text-4xl">
                {formattedValue}
            </p>

            <p className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-[#8c7454] sm:text-xs sm:tracking-[0.22em]">
                {label}
            </p>
        </div>
    );
}