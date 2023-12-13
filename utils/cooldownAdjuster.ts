import { Player } from "@/db/schema";

export const cooldownAdjuster = (
    player: Player,
    gameClock: number,
) => {

    let adjustedCd1 = player.cooldown1;
    let adjustedCd2 = player.cooldown2;

    // Adjust Teleport cooldown if the game is past the 10 minute mark
    if (player.summ1 === 'Teleport' && gameClock >= 10) {
        adjustedCd1 = adjustedCd1 - 30;
    }

    // Adjust Teleport cooldown if the game is past the 10 minute mark
    if (player.summ2 === 'Teleport' && gameClock >= 10) {
        adjustedCd2 = adjustedCd2 - 30;
    }

    // Summoner spell haste given from Cosmic Insight rune
    const cdRuneHaste = 18;
    // Formula Riot uses as a multiplier for cooldowns affected by haste
    const cdHasteMultiplier = 100 / (100 + cdRuneHaste);

    adjustedCd1 = player.hasCdRune ? adjustedCd1 * cdHasteMultiplier : adjustedCd1;
    adjustedCd2 = player.hasCdRune ? adjustedCd2 * cdHasteMultiplier : adjustedCd2;

    return { adjustedCd1, adjustedCd2 };
}