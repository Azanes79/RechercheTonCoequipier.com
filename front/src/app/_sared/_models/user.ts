
export class User {
    FirebaseId: string;
    email: string;
    username: string;
    description: string;

    constructor(username: string, description: string, email: string, FirebaseId?: string) {
        this.FirebaseId = FirebaseId;
        this.email = email;
        this.username = username;
        this.description = description;
    }
}