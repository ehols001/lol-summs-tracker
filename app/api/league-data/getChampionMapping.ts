import { riotCurrentVersion } from '@/utils/getRiotCurrentVersion';

export const getChampionMapping = async () => {

    const championResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${riotCurrentVersion}/data/en_US/champion.json`);

    var championData = await championResponse.json();
    var result: { [key: number]: any } = {};

    for (let key in championData.data) {
        var champion = championData.data[key];

        result[champion.key] = {
            name: champion.name,
            image: champion.image.full
        }
    }

    return result;
}
