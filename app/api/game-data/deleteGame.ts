import clientPromise from '@/lib/mongodb';

/**
 * Delete a specific game given the gameId (will be used primarily when the game ends) 
 * 
 * @param gameId the gameId of the game (not the id of the game)
 */
export async function deleteGame(gameId: string) {
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const game = await db.collection('games').deleteOne({ gameId: gameId });

        console.log(`Successfully deleted game with gameId: ${gameId}`, game);

    } catch (error) {
        console.log(`Failed to delete game with gameId: ${gameId}`, error);
    }
};