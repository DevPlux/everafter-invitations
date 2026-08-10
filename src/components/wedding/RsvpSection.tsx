"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type RsvpSectionProps = {
  token?: string;
  guestName: string;
};

export default function RsvpSection({ token, guestName }: RsvpSectionProps) {
  const [rsvpPending, setRsvpPending] = useState(false);
  const [rsvpConfirmed, setRsvpConfirmed] = useState<boolean | null>(null);
  const [rsvpMessage, setRsvpMessage] = useState<string | null>(null);

  async function handleAccept() {
    if (!token || rsvpPending) return;

    setRsvpPending(true);
    setRsvpMessage(null);

    try {
      const response = await fetch("/api/invitations/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRsvpConfirmed(false);
        setRsvpMessage(
          data?.error ??
            "We could not confirm your attendance. Please try again.",
        );
        return;
      }

      setRsvpConfirmed(true);
      setRsvpMessage(
        "Your attendance has been confirmed. We cannot wait to celebrate with you!",
      );
    } catch (error) {
      console.error("RSVP confirmation failed:", error);

      setRsvpConfirmed(false);
      setRsvpMessage(
        "Unable to confirm your attendance right now. Please try again later.",
      );
    } finally {
      setRsvpPending(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Mobile background */}
      <Image
        src="/images/wedding_hero_mobile.svg"
        alt=""
        fill
        sizes="(max-width: 767px) 100vw, 0px"
        className="-z-30 object-cover object-center md:hidden"
        aria-hidden="true"
      />

      {/* Desktop background */}
      <Image
        src="/images/wedding_bg.svg"
        alt=""
        fill
        sizes="(min-width: 768px) 100vw, 0px"
        className="-z-30 hidden object-cover object-center md:block"
        aria-hidden="true"
      />

      {/* Decorative background glows */}
      <div
        aria-hidden="true"
        className="absolute -left-20 top-8 -z-10 size-64 rounded-full bg-[#829285]/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 size-64 rounded-full bg-[#c5a66f]/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-3xl rounded-[2rem] border border-[#b99b72]/30 bg-[#fffdf8]/90 px-6 py-12 text-center shadow-[0_25px_70px_rgba(63,73,61,0.16)] backdrop-blur-md sm:px-12 sm:py-14"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#b69b72]" />

          <span className="size-2 rotate-45 border border-[#9e7e48] bg-[#d8c08c]" />

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#b69b72]" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#92774f]">
          RSVP
        </p>

        <h2 className="mt-3 font-serif text-4xl text-[#3f493d] sm:text-5xl">
          Will You Join Us?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#43584d]/75 sm:text-base">
          Dear {guestName}, we would be delighted to celebrate our special day
          with you. Please confirm whether you will be attending.
        </p>

        <AnimatePresence mode="wait">
          {rsvpMessage ? (
            <motion.div
              key="rsvp-message"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              role="status"
              className={`mt-8 rounded-2xl border px-6 py-5 ${
                rsvpConfirmed
                  ? "border-[#708679]/25 bg-[#edf3ee] text-[#35473d]"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {rsvpConfirmed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-[#43584d] text-xl text-white"
                >
                  ✓
                </motion.div>
              )}

              <p className="font-serif text-2xl">
                {rsvpConfirmed ? "Thank You" : "Confirmation Unsuccessful"}
              </p>

              <p className="mt-2 text-sm leading-6">{rsvpMessage}</p>

              {!rsvpConfirmed && (
                <button
                  type="button"
                  onClick={() => {
                    setRsvpMessage(null);
                    setRsvpConfirmed(null);
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-[0.14em] underline underline-offset-4"
                >
                  Try Again
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="rsvp-action"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="mt-8"
            >
              <motion.button
                type="button"
                onClick={handleAccept}
                disabled={!token || rsvpPending}
                whileHover={
                  token && !rsvpPending ? { y: -3, scale: 1.02 } : undefined
                }
                whileTap={token && !rsvpPending ? { scale: 0.98 } : undefined}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#43584d] bg-[#43584d] px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-colors hover:bg-[#56685e] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {rsvpPending ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Confirming...
                  </>
                ) : (
                  "Confirm Attendance"
                )}
              </motion.button>

              {!token && (
                <p className="mt-4 text-xs text-red-700">
                  This invitation cannot be confirmed because its verification
                  token is missing.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
