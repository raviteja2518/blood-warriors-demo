import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveBridge from "@/components/dashboard/LiveBridge";
import { Suspense } from "react";

export default function BridgePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading Bridge...</div>}>
        <LiveBridge />
      </Suspense>
    </DashboardLayout>
  );
}
