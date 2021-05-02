import { User } from "./user";
import { UserReact } from "./userReact";

export class Post {
    _id: string;
    user: User;
    content: string;
    gameId: string;
    nbPlayers: number;
    visibility: string;
    datePost: Date;
    likes: UserReact[];
    shares: UserReact[];

    constructor(user: User, content: string, gameId: string, nbPlayers: number, visibility: string, datePost: Date) {
        this.user = user;
        this.content = content;
        this.gameId = gameId;
        this.nbPlayers = nbPlayers;
        this.visibility = visibility;
        this.datePost = datePost;
        this.likes = [];
        this.shares = [];
    }
}