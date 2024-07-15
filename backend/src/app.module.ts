import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [GamesService, GamesGateway],
})
export class AppModule {}
