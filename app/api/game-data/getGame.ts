'use server'

import clientPromise from '@/lib/mongodb';

/**
 * Find a specific game given the gameId 
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export async function getGameByGameId(gameId: string) {
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const game = await db.collection('games').findOne({ gameId: gameId });
        //console.log(`Successfully found game with the gameId: ${gameId}`, game);

        return game;
    } catch (error) {
        console.log(`Failed to find game with the gameId: ${gameId}`, error);
    }
};

/**
 * Find a specific game given the summonerName 
 * 
 * @param summonerName the summonerName of a player in the game
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export async function getGameBySummonerName(summonerName: string) {
    try {
        const client = await clientPromise;
        const db = client.db('GameDB');

        const game = await db.collection('games').findOne({ 'gameData.players.summonerName': summonerName });
        //console.log(`Successfully found game with the summoner name: ${summonerName}`, game);

        return game;
    } catch (error) {
        console.log(`Failed to find game with the summoner name: ${summonerName}`, error);
    }
};