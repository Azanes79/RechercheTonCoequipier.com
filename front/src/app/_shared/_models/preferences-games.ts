
export class PreferencesGames {
    userId: string;
    gameId: string;
    username: string;
    level: string;
    constructor(userId: string, gameId: string, username: string, level: string) {
        this.userId = userId;
        this.gameId = gameId;
        this.username = username;
        this.level = level;
    }
}