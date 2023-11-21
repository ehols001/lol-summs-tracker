import Game from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Update a specific game given the gameId (will primarily be used to updated the timestamp of when summoner spells were used)
 * 
 * @param gameId the gameId of the game (not the id of the game)
 * @param playerIndex the index of the player whose summoner spell timer is being updated
 * @param summ the summoner spell that was used (either 1 slot or 2 slot)
 * 
 * @returns full updated game data including gameId, gameData, and the players array
 */
export const updateGame = cache(async (
        gameId: string,
        playerIndex: number,
        summ: number,
) => {
        await Connect();

        try {
                const updatedGame = await Game.findOne({ gameId: gameId });

                /* if(summ === 1) {
                        game.gameData.players[playerIndex].timeWhenUsed1 = new Date;
                } else if(summ === 2) {
                        game.gameData.players[playerIndex].timeWhenUsed2 = new Date;
                }
                await game.save(); */
                
                console.log(`Successfully updated game with gameId: ${gameId}`);

                return updatedGame;

        } catch(error) {
                console.log(`Failed to update game with gameId: ${gameId}`, error);
        }
});