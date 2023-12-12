import { riotCurrentPatch } from "@/utils/riotCurrentPatch";

export const getSummonerMapping = async () => {

    const summonerResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${riotCurrentPatch}/data/en_US/summoner.json`);

    var summonerData = await summonerResponse.json();
    var result: { [key: number]: any } = {};

    for (let key in summonerData.data) {
        var summoner = summonerData.data[key];

        result[summoner.key] = {
            name: summoner.name,
            image: summoner.image.full,
            cooldown: summoner.cooldown[0]
        }
    }

    return result;
}
