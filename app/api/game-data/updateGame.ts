'use server'

import clientPromise from '@/lib/mongodb';

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
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const summToUpdate = summNum === 1 ? 'timeWhenUsed1' : 'timeWhenUsed2';

        await db.collection('games').updateOne(
            { gameId: gameId },
            {
                $set: {
                    [`gameData.players.${playerIndex}.${summToUpdate}`]: new Date,
                }
            }
        );

        const updatedGame = await db.collection('games').findOne({ gameId: gameId });
        const updatedPlayer = updatedGame?.gameData.players[playerIndex];
        
        summNum === 1
            ? console.log(`Successfully updated ${updatedPlayer.champion}'s ${updatedPlayer.summ1} in game ${gameId} to time used: ${updatedPlayer.timeWhenUsed1.toTimeString()}`)
            : console.log(`Successfully updated ${updatedPlayer.champion}'s ${updatedPlayer.summ2} in game ${gameId} to time used: ${updatedPlayer.timeWhenUsed2.toTimeString()}`)

    } catch (error) {
        console.log(`Failed to update game with gameId: ${gameId}`, error);
    }
}

