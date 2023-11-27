'use server'

import Game, { Player } from '@/db/schema';
import Connect from '@/lib/connect';
import getMatchSession from '@/utils/getMatchSession';

/**
 * Insert a provided game into mongodb
 * 
 * @param game full game data including gameId, gameData, and the array players
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