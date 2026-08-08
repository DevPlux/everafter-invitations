"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SerializedInvitation } from "@/lib/invitations/serialization";

type InvitationItem = SerializedInvitation;

function deriveStats(invitations: InvitationItem[]) {
  const total = invitations.length;
  let opened = 0;
  let accepted = 0;

  invitations.forEach((d) => {
    if (d.acceptedAt) accepted++;
    else if (d.openedAt) opened++;
  });

  const pending = total - opened - accepted;
  const openRate = total === 0 ? 0 : Math.round((opened / total) * 10000) / 100;
  const acceptanceRate = total === 0 ? 0 : Math.round((accepted / total) * 10000) / 100;

  return { total, opened, accepted, pending, openRate, acceptanceRate };
}

export default function DashboardClient({ initialStats, initialInvitations }: { initialStats: any; initialInvitations: InvitationItem[]; }) {
  const [invitations, setInvitations] = useState<InvitationItem[]>(initialInvitations || []);
  const [stats, setStats] = useState(() => {
    if (initialStats && typeof initialStats.total === "number") {
      return initialStats;
    }

    return deriveStats(initialInvitations || []);
  });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let es: EventSource | null = null;

    try {
      es = new EventSource("/api/invitations/subscribe");
    } catch (err) {
      console.warn("EventSource not available", err);
      return;
    }

    es.onopen = () => setConnected(true);

    es.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data);
        if (parsed.type === "invitations") {
          setInvitations(parsed.data);

          // derive stats
          const total = parsed.data.length;
          let opened = 0;
          let accepted = 0;

          parsed.data.forEach((d: InvitationItem) => {
            if (d.acceptedAt) accepted++;
            else if (d.openedAt) opened++;
          });

          const pending = total - opened - accepted;
          const openRate = total === 0 ? 0 : Math.round((opened / total) * 10000) / 100;
          const acceptanceRate = total === 0 ? 0 : Math.round((accepted / total) * 10000) / 100;

          setStats({ total, opened, accepted, pending, openRate, acceptanceRate });
        }
      } catch (err) {
        console.error(err);
      }
    };

    es.onerror = (ev) => {
      console.warn("SSE error", ev);
    };

    return () => {
      setConnected(false);
      if (es) es.close();
    };
  }, []);

  

return (
  <div className="w-full space-y-5">
    {/* Statistics */}
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
{/* Real-time Status */}
    <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-800">
          Guest responses
        </p>

        <p className="mt-0.5 text-xs text-stone-400">
          Invitation activity updates automatically
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5">
        <span
          className={`h-2 w-2 rounded-full ${
            connected ? "bg-emerald-500" : "bg-stone-400"
          }`}
        />

        <span
          className={`text-xs font-medium ${
            connected ? "text-emerald-700" : "text-stone-500"
          }`}
        >
          {connected ? "Live updates" : "Offline"}
        </span>
      </div>
    </div>

      {/* Total Invitations */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400 sm:text-xs">
              Total
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-800 sm:text-3xl">
              {stats.total}
            </p>
          </div>

          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 sm:flex">
            <span className="text-sm">✦</span>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-4 text-stone-400 sm:text-xs">
          Invitations generated
        </p>
      </motion.div>

      {/* Opened */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-amber-700 sm:text-xs">
              Opened
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-amber-900 sm:text-3xl">
              {stats.opened}
            </p>
          </div>

          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 sm:flex">
            <span className="text-sm">◌</span>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-4 text-amber-800/70 sm:text-xs">
          Invitations viewed
        </p>
      </motion.div>

      {/* Accepted */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700 sm:text-xs">
              Accepted
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-900 sm:text-3xl">
              {stats.accepted}
            </p>
          </div>

          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:flex">
            <span className="text-sm">✓</span>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-4 text-emerald-800/70 sm:text-xs">
          Guests confirmed
        </p>
      </motion.div>

      {/* Pending */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-700 sm:text-xs">
              Pending
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {stats.pending}
            </p>
          </div>

          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 sm:flex">
            <span className="text-sm">…</span>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-4 text-slate-800/70 sm:text-xs">
          Invitations still pending
        </p>
      </motion.div>

      
    </section>

    

    {/* Guest Invitations */}
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-stone-100 px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold tracking-tight text-stone-800 sm:text-lg">
          Guest Invitations
        </h2>

        <p className="mt-1 text-xs text-stone-400 sm:text-sm">
          Track invitation activity and RSVP responses
        </p>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-stone-400">
                Guest
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-stone-400">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-stone-400">
                Generated
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-stone-400">
                Opened
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-stone-400">
                Accepted
              </th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((inv) => {
              const status = inv.acceptedAt
                ? "Accepted"
                : inv.openedAt
                  ? "Opened"
                  : "Pending";

              const statusStyles =
                status === "Accepted"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : status === "Opened"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-stone-100 text-stone-600 border-stone-200";

              return (
                <tr
                  key={inv.token}
                  className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-stone-800">
                      {inv.guestName}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-stone-500">
                    {inv.createdAt
                      ? new Date(inv.createdAt).toLocaleString()
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-stone-500">
                    {inv.openedAt
                      ? new Date(inv.openedAt).toLocaleString()
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-stone-500">
                    {inv.acceptedAt
                      ? new Date(inv.acceptedAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Guest Cards */}
      <div className="divide-y divide-stone-100 md:hidden">
        {invitations.map((inv) => {
          const status = inv.acceptedAt
            ? "Accepted"
            : inv.openedAt
              ? "Opened"
              : "Pending";

          const statusStyles =
            status === "Accepted"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : status === "Opened"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-stone-100 text-stone-600 border-stone-200";

          return (
            <div
              key={inv.token}
              className="p-4 active:bg-stone-50"
            >
              {/* Guest + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-stone-800">
                    {inv.guestName}
                  </p>

                  <p className="mt-1 text-[11px] text-stone-400">
                    Invitation details
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {status}
                </span>
              </div>

              {/* Dates */}
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2.5">
                  <span className="text-[11px] text-stone-400">
                    Generated
                  </span>

                  <span className="text-right text-xs font-medium text-stone-600">
                    {inv.createdAt
                      ? new Date(inv.createdAt).toLocaleString()
                      : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2.5">
                  <span className="text-[11px] text-stone-400">
                    Opened
                  </span>

                  <span className="text-right text-xs font-medium text-stone-600">
                    {inv.openedAt
                      ? new Date(inv.openedAt).toLocaleString()
                      : "Not opened"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2.5">
                  <span className="text-[11px] text-stone-400">
                    Accepted
                  </span>

                  <span className="text-right text-xs font-medium text-stone-600">
                    {inv.acceptedAt
                      ? new Date(inv.acceptedAt).toLocaleString()
                      : "Not accepted"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {invitations.length === 0 && (
        <div className="px-5 py-12 text-center sm:px-6">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            ✦
          </div>

          <p className="mt-4 text-sm font-medium text-stone-700">
            No invitations yet
          </p>

          <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-stone-400">
            Generated guest invitations will appear here.
          </p>
        </div>
      )}
    </div>
  </div>
);




}
