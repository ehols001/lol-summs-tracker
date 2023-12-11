'use server'

import Game, { Match, Player } from '@/db/schema';
import Connect from '@/lib/connect';

/**
 * Insert a game into mongodb given a game
 * 
 * @param game the game to be inserted into mongodb
 */
export async function createGame(
    game: Match,
) {
    
    await Connect();

    try {

        const players: Player[] = game.gameData.players.map((player) => player);

        const createdGame = await Game.create({
            gameId: game.gameId,
            gameData: {
                gameStartTime: game.gameData.gameStartTime,
                players: players
            }
        });

        console.log('Successfully created game', createdGame);

    } catch (error) {
        console.log('Failed to create game', error);
    }
};