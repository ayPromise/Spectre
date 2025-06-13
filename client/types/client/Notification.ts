import { ID, MaterialUnion, Schedule } from "@shared/types";

interface WebSocketNotification {
  data: MaterialUnion | Schedule;
  type: "material" | "schedule";
  action: "edit" | "create";
  isRead: boolean;
}

interface StorageNotifications {
  notifications: WebSocketNotification[];
  userId: ID;
}

export type { WebSocketNotification, StorageNotifications };
