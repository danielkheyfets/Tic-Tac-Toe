import { Status } from '../enums/Status';
import { Cell } from '../enums/board/Cell';
import { IPlayer } from './IPlayer';

export type IMoveResult = {
  status: Status;
  board: Cell[];
  currentPlayer: IPlayer;
  players: [IPlayer, IPlayer];
};
