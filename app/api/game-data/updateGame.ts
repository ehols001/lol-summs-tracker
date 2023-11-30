'use server'

import Game from '@/db/schema';
import Connect from '@/lib/connect';

/**
 * Update a specific game given the gameId (will primarily be used to updated the timestamp of when summoner spells were used)
 * 
 * @param gameId the gameId of the game (not the id of the game)
 * @param playerIndex the index of the player whose summoner spell timer is being updated
 * @param summNum the number summoner spell that was used (either 1 slot or 2 slot)
 */
export async function updateGame(
        gameId: string,
        playerIndex: number,
        summNum: number,
) {
        await Connect();

        try {
                const game = await Game.findOne({ gameId: gameId });

                const player = game.gameData.players[playerIndex];
                if(summNum === 1) {
                        player.timeWhenUsed1 = new Date;
                        await game.save();
                        console.log(`Successfully updated ${player.champion}'s ${player.summ1} in game ${gameId} to time used: ${player.timeWhenUsed1.getTime()}`);
                } else if(summNum === 2) {
                        player.timeWhenUsed2 = new Date;
                        await game.save();
                        console.log(`Successfully updated ${player.champion}'s ${player.summ2} in game ${gameId} to time used: ${player.timeWhenUsed2.getTime()}`);
                }

        } catch(error) {
                console.log(`Failed to update game with gameId: ${gameId}`, error);
        }
}