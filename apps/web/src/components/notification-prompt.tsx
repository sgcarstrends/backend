"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import useStore from "@/app/store";

export const NotificationPrompt = () => {
  const { notificationStatus, setNotificationStatus } = useStore();

  useEffect(() => {
    if (!("Notification" in window)) {
      return;
    }

    const status = Notification.permission;
    setNotificationStatus(status);
  }, [setNotificationStatus]);

  const handleGranted = useCallback(async () => {
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
 
    toast.success("Notifications Enabled!", {
      description:
        "You will now receive updates and alerts whenever new data is published",
    });
  }, [setNotificationStatus]);

  const handleDenied = useCallback(async () => {
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);

    toast.warning("Notifications Disabled!", {
      description:
        "You will not receive updates and alerts whenever new data is published",
    });
  }, [setNotificationStatus]);

  useEffect(() => {
    if (notificationStatus === "default") {
      toast("Enable Notifications?", {
        duration: Infinity,
        description:
          "Stay updated with the latest news and alerts by enabling browser notifications",
        action: {
          label: "Allow",
          onClick: handleGranted,
        },
        cancel: {
          label: "Deny",
          onClick: handleDenied,
        },
      });
    }
  }, [handleGranted, handleDenied, notificationStatus]);

  return null;
};
