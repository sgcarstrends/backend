import { Suspense } from "react";
import { MaintenanceNotice } from "@/components/maintenance-notice";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const MaintenancePage = () => {
  return (
    <Suspense fallback={null}>
      <MaintenanceNotice />
    </Suspense>
  );
};

export default MaintenancePage;
