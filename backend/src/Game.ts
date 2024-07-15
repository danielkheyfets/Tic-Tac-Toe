import { every, some } from 'lodash';
import { IPlayer } from './contracts/IPlayer';
import { Cell } from './enums/board/Cell';
import { Status } from './enums/Status';
import { IMoveResult } from './contracts/IMoveResult';

export class Game {
  public players: [IPlayer, IPlayer];
  public currentPlayer: IPlayer;
  protected status: Status;
  readonly winner?: boolean;
  protected board: Cell[];

  constructor(id_1: string, id_2: string) {
    const player1: IPlayer = { id: id_1, symbol: Cell.O };
    const player2: IPlayer = { id: id_2, symbol: Cell.X };
    this.players = [player1, player2];
    this.board = Array(9).fill(Cell.NULL);
    this.currentPlayer = player1;
    this.status = Status.IN_PROGRESS;
  }
  private isDraw(): boolean {
    return every(this.board, (cell: Cell) => cell !== Cell.NULL);
  }

  private isValidMove(palyerId: string, index: number): boolean {
    return (
      this.board[index] === Cell.NULL &&
      this.currentPlayer.id === palyerId &&
      this.status === Status.IN_PROGRESS
    );
  }

  move(playerId: string, index: number): IMoveResult {
    if (!this.isValidMove(playerId, index)) {
      throw new Error('move is not valid');
    }
    this.updateBoard(playerId, index);
    this.swichPlayer();
    this.updateStatus();
    const status = this.getStatus();
    return {
      status,
      board: this.board,
      currentPlayer: this.currentPlayer,
      players: this.players,
    };
  }

  private updateBoard(palyerId: string, index: number) {
    const player = this.players.find(
      (player: IPlayer) => player.id === this.currentPlayer.id,
    );
    this.board[index] = player.symbol;
  }

  updateStatus(): void {
    this.status = this.isWinner()
      ? Status.DONE_WINNER
      : this.isDraw()
        ? Status.DONE_DRAW
        : Status.IN_PROGRESS;
  }
  private getStatus(): Status {
    return this.status;
  }

  private swichPlayer() {
    this.currentPlayer = this.players.find(
      (player: IPlayer) => player.id !== this.currentPlayer.id,
    );
  }

  private isWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return some(
      winningCombinations,
      (combination) =>
        every(combination, (i) => this.board[i] === Cell.X) ||
        every(combination, (i) => this.board[i] === Cell.O),
    );
  }
}
