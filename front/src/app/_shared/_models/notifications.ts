import { User } from "./user";

export class Notifications {
    userId: string;
    userPost: User;
    content: string;
    isNewNotif: boolean;
    date: Date;
    constructor(userId: string, userPost: User, content: string, isNewNotif: boolean, date: Date) {
        this.userId = userId;
        this.userPost = userPost;
        this.content = content;
        this.isNewNotif = isNewNotif;
        this.date = date;
    }
}