export type NotificationType = "share" | "achievement" | "friendRequest";
export type NotificationEntityType = "lesson" | "user";

export type Notification = {
    _id: string;
    toUserId: string;
    fromUserId: string;
    type: NotificationType;
    relatedEntityId: string;
    entityType: NotificationEntityType;
    message: string;
    read: boolean;
    createdAt: string;
};