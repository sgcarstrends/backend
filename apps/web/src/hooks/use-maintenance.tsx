import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useMaintenance = (pollingInterval = 5000) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        // TODO: Simulating this for now
        const isMaintenanceMode = process.env.MAINTENANCE_MODE;

        if (!isMaintenanceMode) {
          const from = searchParams.get("from");
          if (from) {
            router.replace(decodeURIComponent(from));
          } else {
            router.replace("/");
          }
        }
      } catch (e) {
        console.error("Error checking maintenance status:", e);
      }
    };

    const interval = setInterval(checkMaintenance, pollingInterval);

    void checkMaintenance();

    return () => clearInterval(interval);
  }, [pollingInterval, router, searchParams]);
};

export default useMaintenance;
