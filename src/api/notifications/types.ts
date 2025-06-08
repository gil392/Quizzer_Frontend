export type Notification = {
    _id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    relatedEntityId?: string;
    entityType?: "quiz" | "summary" | "user";
};