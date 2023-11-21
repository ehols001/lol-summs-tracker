import Game from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Delete a specific game given the gameId (will be used primarily when the game ends) 
 * 
 * @param gameId the gameId of the game (not the id of the game)
 */
export const deleteGame = cache(async (gameId: string) => {
        await Connect();

        try {
                const game = await Game.deleteOne({ gameId: gameId });

                console.log(`Successfully deleted game with gameId: ${gameId}`, game);

        } catch(error) {
                console.log(`Failed to delete game with gameId: ${gameId}`, error);
        }
});