import Player from './Player';
import { Tournament } from '../Tournament';
export declare class Lobby {
    admin: Player;
    token: string;
    players: Array<Player>;
    tournament: Tournament;
    constructor(admin: Player);
    toObject(): {
        token: string;
        players: {
            token: string;
        }[];
        tournament: {
            options: import("../../../../../../../../Users/Bharat/code/sg/ultimate-ttt-server/src/tournament/Tournament").TournamentOptions;
            started: boolean;
            finished: boolean;
            matches: {
                stats: import("../../../../../../../../Users/Bharat/code/sg/ultimate-ttt-server/src/tournament/model/State").default;
                players: {
                    token: string;
                }[];
            }[];
            ranking: string[];
        };
    };
}
