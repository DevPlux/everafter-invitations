"use client";

import { motion, useReducedMotion } from "framer-motion";

const petals = [
    { left: 4, delay: 0.2, duration: 9, drift: 45, size: 12, rotate: 190 },
    { left: 12, delay: 2.6, duration: 11, drift: -35, size: 16, rotate: 260 },
    { left: 21, delay: 1.1, duration: 10, drift: 55, size: 11, rotate: 220 },
    { left: 31, delay: 4.2, duration: 12, drift: -45, size: 15, rotate: 300 },
    { left: 42, delay: 0.8, duration: 9.5, drift: 40, size: 13, rotate: 250 },
    { left: 53, delay: 3.4, duration: 11.5, drift: -55, size: 17, rotate: 320 },
    { left: 63, delay: 1.8, duration: 10.5, drift: 48, size: 12, rotate: 210 },
    { left: 73, delay: 5.1, duration: 12.5, drift: -38, size: 15, rotate: 280 },
    { left: 83, delay: 2.1, duration: 9.8, drift: 42, size: 11, rotate: 230 },
    { left: 92, delay: 4.6, duration: 11.8, drift: -50, size: 16, rotate: 310 },
    { left: 17, delay: 6.3, duration: 10.8, drift: 35, size: 13, rotate: 270 },
    { left: 68, delay: 7.1, duration: 12, drift: -42, size: 14, rotate: 290 },

    // Additional petals
    { left: 8, delay: 5.7, duration: 11.2, drift: -28, size: 10, rotate: 240 },
    { left: 27, delay: 7.8, duration: 12.3, drift: 38, size: 14, rotate: 310 },
    { left: 47, delay: 5.9, duration: 10.2, drift: -46, size: 11, rotate: 225 },
    { left: 58, delay: 8.4, duration: 11.7, drift: 52, size: 15, rotate: 285 },
    { left: 78, delay: 6.8, duration: 10.9, drift: -34, size: 12, rotate: 255 },
    { left: 96, delay: 8.9, duration: 12.6, drift: -48, size: 13, rotate: 325 },
] as const;

export function FloatingPetals() {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        >
            {petals.map((petal, index) => (
                <motion.span
                    key={index}
                    className="absolute -top-8 block bg-gradient-to-br from-[#fff4f3] via-[#f3c9ca] to-[#d99fa4] opacity-80 shadow-[0_2px_5px_rgba(82,41,43,0.18)]"
                    style={{
                        left: `${petal.left}%`,
                        width: petal.size,
                        height: petal.size * 1.45,
                        borderRadius: "75% 25% 70% 30% / 75% 35% 65% 25%",
                    }}
                    initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
                    animate={{
                        y: "112vh",
                        x: [0, petal.drift, -petal.drift * 0.45, petal.drift * 0.3],
                        rotate: [0, petal.rotate, petal.rotate * 1.8],
                        opacity: [0, 0.85, 0.8, 0],
                    }}
                    transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.3, 0.7, 1],
                    }}
                />
            ))}
        </div>
    );
}