/**
 * Function to get the remaining time left on both summoner spells for the given player
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * @param playerIndex the index of the player whose summs you're getting
 * 
 * @returns the remaining time left on summ1 and summ2 for the player at playerIndex
 */
export default function getSummonerTimes(
    adjustedCd1: number,
    adjustedCd2: number,
    timeWhenUsed1: number,
    timeWhenUsed2: number
) {

    const currentTime = new Date().getTime();

    const cd1 = adjustedCd1 * 1000;

    // The amount of time its been since summ1 was used
    const timePassedOn1 = currentTime - timeWhenUsed1;

    // The amount of time remaining until summ1 is back up
    const timeLeftOn1 = timeWhenUsed1 === 0 ? 0 : cd1 - timePassedOn1;

    const cd2 = adjustedCd2 * 1000;

    // The amount of time its been since summ2 was used
    const timePassedOn2 = currentTime - timeWhenUsed2;

    // The amount of time remaining until summ2 is back up
    const timeLeftOn2 = timeWhenUsed2 === 0 ? 0 : cd2 - timePassedOn2;
    
    return { timeLeftOn1, timeLeftOn2 };
}