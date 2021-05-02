import { User } from "./user";

export class UserReact {
    user: User;
    state: string
    constructor(user: User) {
        this.user = user;
        this.state = 'waiting'
    }
}