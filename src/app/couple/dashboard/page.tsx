import type { Metadata } from "next";
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
    <main className="mx-auto max-w-7xl p-6 ">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#43584d]">Couple Dashboard</p>
        <h1 className="mt-2 font-serif text-3xl text-[#3f493d]">Invitation Analytics</h1>
      </header>

      <DashboardWrapper initialStats={stats} initialInvitations={invitations} />
    </main>
  );
}
