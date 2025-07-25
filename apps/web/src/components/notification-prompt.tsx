"use client";

import { useCallback, useEffect } from "react";
import { Alert, Button, cn, addToast } from "@heroui/react";
import useStore from "@web/app/store";

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

    if (permission === "granted") {
      addToast({
        title: "Notifications Enabled!",
        description:
          "You will now receive updates and alerts whenever new data is published",
        color: "success",
        classNames: {
          base: "bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700",
          icon: "w-5 h-5 fill-current text-success-600",
        },
        shouldShowTimeoutProgress: true,
      });
    }
  }, [setNotificationStatus]);

  const handleDenied = useCallback(async () => {
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);

    if (permission === "denied") {
      addToast({
        title: "Notifications Disabled!",
        description:
          "You will not receive updates and alerts whenever new data is published",
        color: "warning",
        classNames: {
          base: "bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700",
          icon: "w-5 h-5 fill-current text-warning-600",
        },
        shouldShowTimeoutProgress: true,
      });
    }
  }, [setNotificationStatus]);

  const handleClose = useCallback(() => {
    setNotificationStatus("denied");
  }, [setNotificationStatus]);

  if (notificationStatus === "default") {
    return (
      <Alert
        color="primary"
        variant="faded"
        title="Enable Notifications?"
        description="Stay updated with the latest news and alerts by enabling browser notifications"
        isClosable
        onClose={handleClose}
        className={cn([
          "bg-default-50 dark:bg-background shadow-sm",
          "rounded-md rounded-l-none border border-l-8",
          "border-primary-200 dark:border-primary-100 border-l-primary",
        ])}
        endContent={
          <div className="mt-2 flex gap-2">
            <Button
              onPress={handleGranted}
              color="primary"
              size="sm"
              variant="solid"
            >
              Allow
            </Button>
            <Button
              onPress={handleDenied}
              color="default"
              size="sm"
              variant="bordered"
            >
              Deny
            </Button>
          </div>
        }
      />
    );
  }

  return null;
};
