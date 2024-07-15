# Games Service

This repository contains a simple game service implemented with NestJS and WebSockets. The service allows players to connect, be matched with opponents, and play a turn-based game.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file based on the provided `.env.example` file:

   ```bash
   cp .env.example .env
   ```

## Running the Server

To start the server, run:

```bash
yarn dev
```

markdown
Copy code

# Games Service

This repository contains a simple game service implemented with NestJS and WebSockets. The service allows players to connect, be matched with opponents, and play a turn-based game.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file based on the provided `.env.example` file:

   ```bash
   cp .env.example .env
   ```

## Running the Server

To start the server, run:

```bash
yarn dev
```

## Project Structure

GamesService: Manages game instances and player matchmaking.
GamesGateway: Handles WebSocket connections, player actions, and game events.
Game: Represents the game logic and state.
dtos/Move.dto: Data Transfer Object for player moves.
contracts/IMoveResult: Interface for move results.
contracts/IPlayer: Interface for player details.
enums/Status: Enum for game status.

## Environment Variables

The project requires certain environment variables to be set. Refer to the .env.example file for required variables.
