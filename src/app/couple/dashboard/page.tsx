import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { verifyCoupleSession } from "@/lib/auth/session";
import { getStats, listInvitations } from "@/lib/invitations/repository";
import { serializeInvitations } from "@/lib/invitations/serialization";
import DashboardWrapper from "./dashboard-wrapper";

export const metadata: Metadata = {
  title: "Couple Dashboard",
};

export default async function DashboardPage() {
  const authenticated = await verifyCoupleSession();

  if (!authenticated) {
    redirect("/couple");
  }

  const stats = await getStats();
  const invitations = serializeInvitations(await listInvitations());

  return (
    <main className="relative flex min-h-dvh overflow-x-hidden bg-stone-50 px-3 py-3 sm:px-4 sm:py-4 lg:flex lg:h-dvh lg:items-center lg:overflow-hidden lg:px-6">
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
        src="/images/wedding_bg.svg"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 100vw, 0px"
        className="hidden object-cover object-center md:block"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_24px_70px_rgba(67,88,77,0.18)] backdrop-blur-md sm:rounded-[2rem] sm:p-6 lg:h-[calc(100dvh-2rem)] lg:max-h-[900px] lg:p-7">
        <header className="flex shrink-0 flex-col gap-4 border-b border-stone-200/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#60776b] sm:text-xs">
              Couple Portal
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-stone-800 sm:text-3xl lg:text-4xl">
              Couple Dashboard
            </h1>
            <p className="mt-1 text-xs leading-5 text-stone-500 sm:text-sm">
              Invitation analytics and guest responses in one place.
            </p>
          </div>

          <Link
            href="/couple/generate"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#60776b]/30 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#43584d] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#43584d] hover:bg-[#43584d] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#43584d]/20 sm:w-auto"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-4"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to generator
          </Link>
        </header>

        <div className="min-h-0 flex-1 pt-4">
          <DashboardWrapper
            initialStats={stats}
            initialInvitations={invitations}
          />
        </div>
      </section>
    </main>
  );
}
