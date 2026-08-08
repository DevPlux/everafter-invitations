"use client";

import dynamic from "next/dynamic";
import React from "react";

const DashboardClient = dynamic(() => import("./dashboard-client"), { ssr: false });

export default function DashboardWrapper(props: any) {
  return <DashboardClient {...props} />;
}
