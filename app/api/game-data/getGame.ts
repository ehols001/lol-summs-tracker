'use server'
import Game, { Match } from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';


/**
 * Find a specific game given the gameId 
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export const getGameByGameId = async (gameId: string): Promise<Match> => {
        await Connect();

        const game: Match = await Game.findOne({ gameId: gameId }) as Match;

        return game;
};

/**
 * Find a specific game given the summonerName 
 * 
 * @param summonerName the summonerName of a player in the game
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export const getGameBySummonerName = cache(async (summonerName: string) => {
    await Connect();

    try {
            const game = await Game.findOne({ 'gameData.players.summonerName': summonerName });
            console.log(`Successfully found a game with the summoner name: ${summonerName}`, game);

            return game;
    } catch(error) {
            console.log(`Failed to find a game with the summoner name: ${summonerName}`, error);
    }
});