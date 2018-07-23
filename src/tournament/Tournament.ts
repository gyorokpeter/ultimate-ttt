import SocketServer from '../server/SocketServer';
import Player from './model/Player';
import {TournamentStats} from "./model/TournamentStats";
import Matchmaker from './matchmaker/Matchmaker';
import Match from './match/Match';
import FreeForAllMatchmaker from './matchmaker/FreeForAllMatchmaker';
import { MatchOptions } from './match/MatchOptions';

/**
 * Tournament Options, these can be modified by the web interface
 * when starting a tournament.
 */
export type TournamentOptions = {
    numberOfGames: number,
    type: string,
    timeout: number,
};

/**
 * Represents a tournament within a lobby, when given a matching strategy, it matches players according to that strategy,
 * runs the games between matched players and broadcasts game stats
 */
export class Tournament {
    private player: Player[];
    private stats: TournamentStats = {
        started: false,
        finished: false,
        matches: [],
    };
    private matchmaker: Matchmaker;

    constructor(private options: TournamentOptions, private socket: SocketServer, public players: Player[], private lobbyToken: string) {
        const matchOptions: MatchOptions = {
            maxGames: this.options.numberOfGames,
            timeout: this.options.timeout,
        };
        switch (options.type) {
            case 'FreeForAll':
            default:
                this.matchmaker = new FreeForAllMatchmaker(this.players, matchOptions, this.sendStats);
                break;
        }
    }

    async start() {
        if (!this.stats.started && !this.isFinished()) {
            this.stats.started = true;
            while(!this.matchmaker.isFinished()) {
                const matches = this.matchmaker.getRemainingMatches(this.stats);
                await this.playMatches(matches);
                this.stats.matches = this.stats.matches.concat(matches);
                this.sendStats();
            }
            console.log('Finished games');
            this.stats.finished = true;
            this.sendStats();
        }
    }

    async playMatches(matches: Match[]) {
        for(let match of matches) {
            await match.playGames();
        }
    }
    
    isFinished(): boolean {
        return this.stats.finished
    }

    private sendStats = (): void => {
        this.socket.emitInLobby(this.lobbyToken, 'tournament stats', this.stats);
    }
}