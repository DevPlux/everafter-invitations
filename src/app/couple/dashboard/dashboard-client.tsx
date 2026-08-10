"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SerializedInvitation } from "@/lib/invitations/serialization";

type InvitationItem = SerializedInvitation;
type DashboardStats = {
  total: number;
  opened: number;
  accepted: number;
  pending: number;
  openRate: number;
  acceptanceRate: number;
};

function deriveStats(invitations: InvitationItem[]): DashboardStats {
  const total = invitations.length;
  let opened = 0;
  let accepted = 0;
  invitations.forEach((item) => {
    if (item.acceptedAt) accepted++;
    else if (item.openedAt) opened++;
  });
  const pending = total - opened - accepted;
  return {
    total,
    opened,
    accepted,
    pending,
    openRate: total === 0 ? 0 : Math.round((opened / total) * 10000) / 100,
    acceptanceRate:
      total === 0 ? 0 : Math.round((accepted / total) * 10000) / 100,
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.07,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const statCards = [
  {
    key: "total",
    label: "Total",
    note: "Generated",
    icon: "✦",
    style: "border-stone-200 bg-white/90 text-stone-800",
    iconStyle: "bg-stone-100 text-stone-500",
  },
  {
    key: "opened",
    label: "Opened",
    note: "Viewed",
    icon: "◌",
    style: "border-[#d6c49f] bg-[#fffaf0]/90 text-[#80652e]",
    iconStyle: "bg-[#f6ead0] text-[#8c6d2f]",
  },
  {
    key: "accepted",
    label: "Accepted",
    note: "Confirmed",
    icon: "✓",
    style: "border-[#b9cbbf] bg-[#f3f8f4]/90 text-[#43584d]",
    iconStyle: "bg-[#dfeae2] text-[#43584d]",
  },
  {
    key: "pending",
    label: "Pending",
    note: "Awaiting",
    icon: "…",
    style: "border-[#d9d2cb] bg-[#faf8f5]/90 text-stone-700",
    iconStyle: "bg-stone-100 text-stone-600",
  },
] as const;

function formatDate(value: string | null | undefined, fallback = "—") {
  return value ? new Date(value).toLocaleString() : fallback;
}

function getStatus(invitation: InvitationItem) {
  if (invitation.acceptedAt) return "Accepted";
  if (invitation.openedAt) return "Opened";
  return "Pending";
}

function statusClasses(status: string) {
  if (status === "Accepted")
    return "border-[#b9cbbf] bg-[#edf5ef] text-[#43584d]";
  if (status === "Opened")
    return "border-[#e4cf9f] bg-[#fff8e8] text-[#8b6826]";
  return "border-stone-200 bg-stone-100 text-stone-600";
}

export default function DashboardClient({
  initialStats,
  initialInvitations,
}: {
  initialStats: DashboardStats;
  initialInvitations: InvitationItem[];
}) {
  const [invitations, setInvitations] = useState<InvitationItem[]>(
    initialInvitations || [],
  );
  const [stats, setStats] = useState<DashboardStats>(() =>
    initialStats && typeof initialStats.total === "number"
      ? initialStats
      : deriveStats(initialInvitations || []),
  );
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let source: EventSource | null = null;
    try {
      source = new EventSource("/api/invitations/subscribe");
    } catch (error) {
      console.warn("EventSource not available", error);
      return;
    }
    source.onopen = () => setConnected(true);
    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.type === "invitations") {
          setInvitations(parsed.data);
          setStats(deriveStats(parsed.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    source.onerror = (event) => {
      setConnected(false);
      console.warn("SSE error", event);
    };
    return () => {
      setConnected(false);
      source?.close();
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 sm:gap-4">
      <section className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {statCards.map((card, index) => (
          <motion.article
            key={card.key}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -3 }}
            className={`rounded-2xl border px-3 py-2.5 shadow-sm backdrop-blur-sm sm:px-4 sm:py-3 ${card.style}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.14em] opacity-65 sm:text-[10px]">
                  {card.label}
                </p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {stats[card.key]}
                  </p>
                  <span className="hidden text-[10px] opacity-60 lg:inline">
                    {card.note}
                  </span>
                </div>
              </div>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs ${card.iconStyle}`}
              >
                {card.icon}
              </span>
            </div>
          </motion.article>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[420px] flex-1 flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white/92 shadow-sm backdrop-blur-sm lg:min-h-0"
      >
        <div className="flex shrink-0 flex-col gap-3 border-b border-stone-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="font-serif text-lg font-semibold text-stone-800">
              Guest Invitations
            </h2>
            <p className="mt-0.5 text-xs text-stone-400">
              Track invitation activity and RSVP responses
            </p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-stone-50/90 px-3 py-1.5">
            <motion.span
              animate={
                connected
                  ? { opacity: [1, 0.45, 1], scale: [1, 0.8, 1] }
                  : undefined
              }
              transition={{ repeat: Infinity, duration: 1.8 }}
              className={`size-2 rounded-full ${connected ? "bg-emerald-500" : "bg-stone-400"}`}
            />
            <span
              className={`text-[11px] font-semibold ${connected ? "text-emerald-700" : "text-stone-500"}`}
            >
              {connected ? "Live updates" : "Offline"}
            </span>
          </div>
        </div>

        <div className="hidden min-h-0 flex-1 overflow-auto dashboard-scrollbar md:block">
          <table className="w-full min-w-[820px] border-separate border-spacing-0">
            <thead className="sticky top-0 z-10 bg-[#f8f7f4]/95 backdrop-blur-sm">
              <tr>
                {["Guest", "Status", "Generated", "Opened", "Accepted"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="border-b border-stone-100 px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv, index) => {
                const status = getStatus(inv);
                return (
                  <motion.tr
                    key={inv.token}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.035, 0.35) }}
                    className="group hover:bg-[#f6f8f6]"
                  >
                    <td className="border-b border-stone-100 px-5 py-3 text-sm font-semibold text-stone-800 group-last:border-0">
                      {inv.guestName}
                    </td>
                    <td className="border-b border-stone-100 px-5 py-3 group-last:border-0">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClasses(status)}`}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {status}
                      </span>
                    </td>
                    <td className="border-b border-stone-100 px-5 py-3 text-xs text-stone-500 group-last:border-0">
                      {formatDate(inv.createdAt)}
                    </td>
                    <td className="border-b border-stone-100 px-5 py-3 text-xs text-stone-500 group-last:border-0">
                      {formatDate(inv.openedAt)}
                    </td>
                    <td className="border-b border-stone-100 px-5 py-3 text-xs text-stone-500 group-last:border-0">
                      {formatDate(inv.acceptedAt)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="min-h-0 flex-1 divide-y divide-stone-100 overflow-y-auto dashboard-scrollbar md:hidden">
          {invitations.map((inv, index) => {
            const status = getStatus(inv);
            return (
              <motion.article
                key={inv.token}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.3) }}
                className="p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 truncate text-sm font-semibold text-stone-800">
                    {inv.guestName}
                  </p>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClasses(status)}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {status}
                  </span>
                </div>
                <dl className="mt-3 grid gap-2 text-xs">
                  {[
                    ["Generated", formatDate(inv.createdAt)],
                    ["Opened", formatDate(inv.openedAt, "Not opened")],
                    ["Accepted", formatDate(inv.acceptedAt, "Not accepted")],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2"
                    >
                      <dt className="text-stone-400">{label}</dt>
                      <dd className="text-right font-medium text-stone-600">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            );
          })}
        </div>

        {invitations.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#edf3ef] text-[#60776b]">
              ✦
            </div>
            <p className="mt-3 text-sm font-semibold text-stone-700">
              No invitations yet
            </p>
            <p className="mt-1 text-xs text-stone-400">
              Generated guest invitations will appear here.
            </p>
          </div>
        )}
      </motion.section>
    </div>
  );
}
