import Game from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Find all games
 * 
 * @returns full game data including gameId, gameData, and the players array for all games
 */
export const getAllGames = cache(async () => {
        await Connect();

        try {
                const games = await Game.find();
                console.log('Successfully found all games', games);

                return games;
        } catch(error) {
                console.log('Failed to find all games', error);
        }
});