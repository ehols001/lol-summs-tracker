import Game from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Find a specific game given the gameId 
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export const getGameByGameId = cache(async (gameId: string) => {
        await Connect();

        try {
                const game = await Game.findOne({ gameId: gameId });
                //console.log(`Successfully found game with gameId: ${gameId}`, game);

                return game;
        } catch(error) {
                console.log(`Failed to find game with gameId: ${gameId}`, error);
        }
});