'use server'

import Game, { Player } from '@/db/schema';
import Connect from '@/lib/connect';
import getMatchSession from '@/utils/getMatchSession';

/**
 * Insert a game into mongodb given a gameId, summonerName, and tagLine
 * 
 * @param gameId the unique team code used to access the game
 * @param summonerName the summoner name of the player creating the game
 * @param tagLine the tag line of the player creating the game
 */
export async function createGame(
    gameId: string,
    summonerName: string,
    tagLine: string,
) {
    
    await Connect();

    try {

        const game = await getMatchSession(gameId, summonerName, tagLine);

        const players: Player[] = game.gameData.players.map((player) => player);

        const createdGame = await Game.create({
            gameId: game.gameId,
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