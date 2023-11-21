import Game, { Player, Match } from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Insert a provided game into mongodb
 * 
 * @param game full game data including gameId, gameData, and the array players
 */
export const createGame = cache(async (game: Match) => {
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

        } catch(error) {
                console.log('Failed to create game', error);
        }
});