import clientPromise from '@/lib/mongodb';

/**
 * Find all games
 * 
 * @returns full game data including gameId, gameData, and the players array for all games
 */
export async function getAllGames() {
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const games = await db.collection('games').find({}).toArray();
        //console.log('Successfully found all games', games);

        return games;
    } catch (error) {
        console.log('Failed to find all games', error);
    }
};