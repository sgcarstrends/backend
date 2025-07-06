import { renderHook } from "@testing-library/react";
import { toast } from "sonner";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import useStore from "@/app/store";
import { NotificationPrompt } from "./notification-prompt";

vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

vi.mock("@/app/store", () => ({
  default: vi.fn(() => ({
    notificationStatus: "default",
    setNotificationStatus: vi.fn(),
  })),
}));

const mockUseStore = useStore as vi.Mock;

describe("NotificationPrompt Component", () => {
  let originalNotification: any;

  beforeAll(() => {
    originalNotification = global.Notification;

    global.Notification = {
      requestPermission: vi.fn(),
      permission: "default",
    } as any;
  });

  afterAll(() => {
    global.Notification = originalNotification;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set notification status to current permission on mount", () => {
    const setNotificationStatus = vi.fn();
    mockUseStore.mockReturnValue({
      notificationStatus: "default",
      setNotificationStatus,
    });

    renderHook(() => NotificationPrompt());

    expect(setNotificationStatus).toHaveBeenCalledWith("default");
  });

  it("should display a toast when notificationStatus is 'default'", () => {
    const setNotificationStatus = vi.fn();
    mockUseStore.mockReturnValue({
      notificationStatus: "default",
      setNotificationStatus,
    });

    renderHook(() => NotificationPrompt());

    expect(toast).toHaveBeenCalledWith(
      "Enable Notifications?",
      expect.objectContaining({
        duration: Infinity,
        description:
          "Stay updated with the latest news and alerts by enabling browser notifications",
        action: expect.any(Object),
        cancel: expect.any(Object),
      }),
    );
  });

  it("should do nothing if notificationStatus is not 'default' (e.g., granted/denied)", () => {
    const setNotificationStatus = vi.fn();
    mockUseStore.mockReturnValue({
      notificationStatus: "granted",
      setNotificationStatus,
    });

    renderHook(() => NotificationPrompt());

    expect(toast).not.toHaveBeenCalled();
  });
});
