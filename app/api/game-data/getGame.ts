import Game from '@/db/schema';
import Connect from '@/lib/connect';
import { cache } from 'react';

export const revalidate = 3600;

/**
 * Find a specific game given the gameId 
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * 
 * @returns full game data including gameId, gameData, and the players array
 */
export const getGameByGameId = cache(async (gameId: string) => {
        await Connect();

        try {
                const game = await Game.findOne({ gameId: gameId });
                //console.log(`Successfully found game with gameId: ${gameId}`, game);

                return game;
        } catch(error) {
                console.log(`Failed to find game with gameId: ${gameId}`, error);
        }
});

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