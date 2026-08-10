"use client";

import dynamic from "next/dynamic";
import type { SerializedInvitation } from "@/lib/invitations/serialization";

type DashboardStats = {
  total: number;
  opened: number;
  accepted: number;
  pending: number;
  openRate: number;
  acceptanceRate: number;
};

const DashboardClient = dynamic(() => import("./dashboard-client"), {
  ssr: false,
});

export default function DashboardWrapper(props: {
  initialStats: DashboardStats;
  initialInvitations: SerializedInvitation[];
}) {
  return <DashboardClient {...props} />;
}
