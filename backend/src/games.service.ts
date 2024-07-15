import { Injectable } from '@nestjs/common';
import { Game } from './Game';

@Injectable()
export class GamesService {
  private games = new Map<string, Game>();
  private waiting = new Set<string>();

  addPlayer(playerId1: string): Game | undefined {
    if (this.waiting.size > 0) {
      const playerId2 = this.waiting.values().next().value;
      this.waiting.delete(playerId2);
      return this.init(playerId2, playerId1);
    } else {
      this.waiting.add(playerId1);
      return undefined;
    }
  }

  removePlayer(playerId: string) {
    this.games.delete(playerId);
    this.waiting.delete(playerId);
  }

  init(palyerId1: string, palyerId2: string) {
    const game: Game = new Game(palyerId1, palyerId2);
    this.games.set(palyerId1, game);
    this.games.set(palyerId2, game);
    this.waiting.delete(palyerId1);
    this.waiting.delete(palyerId2);
    return game;
  }

  getGame(playerId: string): Game {
    if (!this.games.has(playerId)) {
      throw new Error('game not exsists');
    }
    return this.games.get(playerId);
  }
}
