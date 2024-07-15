import { Cell } from '../enums/board/Cell';

export type IPlayer = {
  id: string;
  symbol: Cell.O | Cell.X;
};
