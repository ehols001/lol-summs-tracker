import { getLatestVersion } from './getLatestVersion';

export const getCdRuneData = async () => {

    const riotCurrentVersion = await getLatestVersion();

    const runesResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${riotCurrentVersion}/data/en_US/runesReforged.json`);

    var runesData = await runesResponse.json();
    const cosmicInsightRune = runesData.flatMap(
        ( runeTree: any ) => runeTree.slots.flatMap(
            ( slot: any ) => slot.runes)).find(
                ( rune: any ) => rune.name === "Cosmic Insight");

    //console.log(cosmicInsightRune.id)
    return cosmicInsightRune ? cosmicInsightRune.id : null;
}
