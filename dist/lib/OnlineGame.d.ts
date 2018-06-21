import { PlayerOrTie } from "@socialgorithm/ultimate-ttt/dist/model/constants";
import { Options } from "./input";
import GUI from "./GUI";
import { SocketServer } from './SocketServer';
import { Player } from './player';
import Session from './Session';
import { Tournament } from './Tournament';
export default class OnlineGame {
    private tournament;
    private session;
    private socket;
    private ui;
    private timeout;
    private maxGames;
    private state;
    private currentPlayer;
    private firstPlayer;
    private game;
    private gameStart;
    private gameIDForUI;
    private active;
    constructor(tournament: Tournament, session: Session, socket: SocketServer, ui: GUI, options: Options);
    playGame(): void;
    handleGameEnd(winner: PlayerOrTie, playerDisconnected?: boolean): void;
    private parseMove;
    private writeMove;
    handlePlayerMove(player: Player): (data: string) => void;
    private switchPlayer;
    private sessionEnd;
    private playerZero;
    private playerOne;
    private log;
}
