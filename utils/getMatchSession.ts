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
        var player = { 
            champion: championMapping[element.championId].name,
            summ1: summonerMapping[element.spell1Id].name,
            cooldown1: summonerMapping[element.spell1Id].cooldown,
            summ2: summonerMapping[element.spell2Id].name,
            cooldown2: summonerMapping[element.spell2Id].cooldown
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

