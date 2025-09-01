import { ZodError } from 'zod';
import { toast } from 'sonner';
import { PAGES_ROUTES } from '../routes/routes.const';
import { Notification } from "../api/notification/types";

export const extractZodErrorMessagesByFields = <T extends object>({
  errors,
}: ZodError<T>) => {
  const fieldErrors: Partial<Record<keyof T, string>> = {};
  errors.forEach((err) => {
    const field = err.path[0] as keyof T;
    fieldErrors[field] = err.message;
  });

  return fieldErrors;
};

export const toastWarning = (message: string) => {
  toast.warning(message);
}

export const toastError = (message: string) => {
  toast.error(message);
}

export const formatPublishTime = (publishTime: string) => {
  const date = new Date(publishTime);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}

export const formatViews = (views: string) => {
  const n = Number(views);
  if (isNaN(n)) return views;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

export const formatDuration = (isoDuration: string | undefined) => {
  if (!isoDuration) return "";
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return isoDuration;
  const [, h, m, s] = match.map((v) => parseInt(v || "0", 10));
  const hours = h || 0;
  const minutes = m || 0;
  const seconds = s || 0;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatNotificationTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) {
    return "just now";
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  } else if (diffHr < 24) {
    return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  } else if (diffDay < 2) {
    return "1 day ago";
  } else {
    // Show as date + time (e.g., 2024-06-09 14:30)
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export const toastSuccess = (message: string) => {
  toast.success(message);
};

  export const getNotificationRoute = (notification: Notification): string => {
    switch (notification.type) {
      case "friendRequest":
        return PAGES_ROUTES.FRIENDS;
      case "achievement":
        return PAGES_ROUTES.PROFILE;
      case "share":
        return PAGES_ROUTES.LESSONS_LIST;
      default:
        return PAGES_ROUTES.NOTIFICATIONS;
    }
  };