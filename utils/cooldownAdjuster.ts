import { Player } from "@/db/schema";

export const cooldownAdjuster = (
    player: Player,
    gameClock: number,
    gameMode: string,
) => {

    // 70 haste applied to cooldowns in ARAMs
    const aramHaste = gameMode === 'ARAM' ? 70 : 0;
    // 18 haste given to summoner spells from Cosmic Insight rune
    const cdRuneHaste = player.hasCdRune ? 18 : 0;

    const totalHaste = aramHaste + cdRuneHaste;

    // Formula Riot uses as a multiplier for cooldowns affected by haste
    const cdHasteMultiplier = 100 / (100 + totalHaste);

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

    adjustedCd1 = adjustedCd1 * cdHasteMultiplier;
    adjustedCd2 = adjustedCd2 * cdHasteMultiplier;

    return { adjustedCd1, adjustedCd2 };
}

export const cooldownAdjusterBoots = (
    cooldown1: number,
    cooldown2: number,
    hasCdBoots: boolean,
) => {

    // 12 haste applied to cooldowns from boots of lucidity
    const bootHaste = hasCdBoots ? 12 : 0;

    // Formula Riot uses as a multiplier for cooldowns affected by haste
    const cdHasteMultiplier = 100 / (100 + bootHaste);

    let adjustedCd1 = cooldown1;
    let adjustedCd2 = cooldown2;

    adjustedCd1 = adjustedCd1 * cdHasteMultiplier;
    adjustedCd2 = adjustedCd2 * cdHasteMultiplier;

    return { adjustedCd1, adjustedCd2 };
}