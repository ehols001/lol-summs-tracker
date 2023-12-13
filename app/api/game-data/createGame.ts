'use server'

import { Match, Player } from '@/db/schema';
import clientPromise from '@/lib/mongodb';

/**
 * Insert a game into mongodb given a game
 * 
 * @param game the game to be inserted into mongodb
 */
export async function createGame(
    game: Match,
) {
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const players: Player[] = game.gameData.players.map((player) => player);

        const createdGame = await db.collection('games').insertOne({
            gameId: game.gameId,
            gameMode: game.gameMode,
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