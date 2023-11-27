import { getActiveGame } from '@/app/api/league-data/getActiveGame';
import { getChampionMapping } from '@/app/api/league-data/getChampionMapping';
import { getSummonerMapping } from '@/app/api/league-data/getSummonerMapping';
import { Match, Player } from '@/db/schema';

export default async function getMatchSession(
    team_code: string,
    summonerName: string,
    tagLine: string,
) {
    
    var activeGame = await getActiveGame(summonerName, tagLine);
    var summonerMapping = await getSummonerMapping();
    var championMapping = await getChampionMapping();

    var players = [] as Player[];
    
    activeGame.participants.forEach((element:any) => {
        let champion = championMapping[element.championId];
        let summ1 = summonerMapping[element.spell1Id];
        let summ2 = summonerMapping[element.spell2Id];

        var player = { 
            champion: champion.name,
            championImageName: champion.image,

            summonerName: element.summonerName,
            teamId: element.teamId,

            summ1: summ1.name,
            summ1ImageName: summ1.image,
            cooldown1: summ1.cooldown,

            summ2: summ2.name,
            summ2ImageName: summ2.image,
            cooldown2: summ2.cooldown
        } as Player;

        players.push(player);
    });

    var game = { 
        gameId: team_code, 
        gameData: {
            gameStartTime: activeGame.gameStartTime,
            players: players
        }} as Match;

    return game;
}

