'use server'

import { getGameByGameId } from "@/app/api/game-data/getGame";
import { Match } from "@/db/schema";

/**
 * Function to get the remaining time left on both summoner spells for the given player
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * @param playerIndex the index of the player whose summs you're getting
 * 
 * @returns the remaining time left on summ1 and summ2 for the player at playerIndex
 */
export default async function getSummonerTimes(
    gameId: string,
    playerIndex: number
) {
    
    const game = await getGameByGameId(gameId) as Match;
    //console.log('Match: ', game);
    
    const player = game?.gameData.players[playerIndex];

    const currentTime = new Date().getTime();

    const cd1 = player.cooldown1 * 1000;
    const timeWhenUsed1 = player?.timeWhenUsed1?.getTime();

    // The amount of time its been since summ1 was used
    const timePassedOn1 = currentTime - timeWhenUsed1;

    // The amount of time remaining until summ1 is back up
    const timeLeftOn1 = cd1 - timePassedOn1;

    const cd2 = player.cooldown2 * 1000;
    const timeWhenUsed2 = player?.timeWhenUsed2?.getTime();

    // The amount of time its been since summ2 was used
    const timePassedOn2 = currentTime - timeWhenUsed2;
    // The amount of time remaining until summ2 is back up
    const timeLeftOn2 = cd2 - timePassedOn2;
    
    return { timeLeftOn1, timeLeftOn2 };
}