export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    return false;
  }

  const permission = await Notification.requestPermission();

  return permission === "granted";
}

export function showNotification(title, message) {
  if (
    "Notification" in window &&
    Notification.permission === "granted"
  ) {
    new Notification(title, {
      body: message,
      icon: "/favicon.svg",
    });
  }
}