import { Friend } from "./friend";

export class User {
    FirebaseId: string;
    email: string;
    username: string;
    description: string;
    friends: Friend[];
    constructor(username: string, description: string, email: string, friends?: Friend[], FirebaseId?: string) {
        this.FirebaseId = FirebaseId;
        this.email = email;
        this.username = username;
        this.description = description;
        this.friends = (friends ? friends : []);
    }
}