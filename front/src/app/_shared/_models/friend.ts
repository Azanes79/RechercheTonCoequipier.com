import { User } from "./user";

export class Friend {
    user: User;
    state: string;
    constructor(user: User) {
        this.user = user;
        this.state = 'waiting';
    }
}