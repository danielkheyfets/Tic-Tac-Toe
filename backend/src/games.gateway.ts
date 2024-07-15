import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GamesService } from './games.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MoveDto } from './dtos/Move.dto';
import { Game } from './Game';
import { IMoveResult } from './contracts/IMoveResult';
import { IPlayer } from './contracts/IPlayer';
import { Status } from './enums/Status';

@WebSocketGateway({ cors: { origin: '*' } })
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private gamesService: GamesService) {}

  handleDisconnect(client: Socket) {
    const game = this.gamesService.getGame(client.id);
    if (game) {
      const opponent = game.players.find((player) => player.id !== client.id);
      if (opponent) {
        this.server
          .to(opponent.id)
          .emit('game.done', { text: 'Your opponent disconnected. You win!' });
      }
    }
    this.gamesService.removePlayer(client.id);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('move')
  handleMove(@MessageBody() move: MoveDto, @ConnectedSocket() client: Socket) {
    try {
      const game = this.gamesService.getGame(client.id);
      if (!game) throw new Error('Game not found');

      const result: IMoveResult = game.move(client.id, move.index);

      result.players.forEach((player: IPlayer) => {
        this.server.to(player.id).emit('game.update', result);

        const message =
          result.currentPlayer.id === player.id
            ? 'Your turn'
            : 'Waiting for opponent';
        this.server.to(player.id).emit('message', { text: message });

        if (result.status === Status.DONE_WINNER) {
          const endMessage = player.id === client.id ? 'You won!' : 'You lost!';
          this.server.to(player.id).emit('game.done', { text: endMessage });
        } else if (result.status === Status.DONE_DRAW) {
          this.server.to(player.id).emit('game.done', { text: "It's a draw!" });
        }
      });
    } catch (e) {
      this.server.to(client.id).emit('error', { message: e.message });
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const game: Game | undefined = this.gamesService.addPlayer(client.id);
    if (!game) {
      client.emit('message', { text: 'Waiting for an opponent...' });
    } else {
      for (const player of game.players) {
        this.server.to(player.id).emit('message', {
          text:
            game.currentPlayer.id === player.id
              ? `Let's start! You are ${player.symbol}, Your Turn!`
              : `Let's start! You are ${player.symbol}, Waiting for opponent`,
        });
      }
    }
  }
}
