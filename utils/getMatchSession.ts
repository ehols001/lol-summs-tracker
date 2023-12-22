import { getActiveGame } from '@/app/api/league-data/getActiveGame';
import { getChampionMapping } from '@/app/api/league-data/getChampionMapping';
import { getSummonerMapping } from '@/app/api/league-data/getSummonerMapping';
import { Match, Player } from '@/db/schema';

export default async function getMatchSession(
    summonerName: string,
    tagLine: string,
) {
    
    var activeGame = await getActiveGame(summonerName, tagLine);
    var summonerMapping = await getSummonerMapping();
    var championMapping = await getChampionMapping();

    var cdRuneId = 8347; // Cosmic Insight perkId

    var players = [] as Player[];
    
    activeGame.participants.forEach((element:any) => {

        let gameModeHaste = activeGame.gameMode === 'ARAM' ? 70 : 0;
        let hasCdRune = element.perks.perkIds.includes(cdRuneId) ? true : false;

        let champion = championMapping[element.championId];
        let summ1 = summonerMapping[element.spell1Id];
        let summ2 = summonerMapping[element.spell2Id];

        var player = { 
            champion: champion.name,
            championImageName: champion.image,

            host: (summonerName.toLowerCase() === element.summonerName.toLowerCase()) ? true : false,
            summonerName: element.summonerName,
            teamId: element.teamId,

            summ1: summ1.name,
            summ1ImageName: summ1.image,
            cooldown1: summ1.cooldown,
            timeAvailable1: activeGame.gameStartTime,

            summ2: summ2.name,
            summ2ImageName: summ2.image,
            cooldown2: summ2.cooldown,
            timeAvailable2: activeGame.gameStartTime,

            hasCdRune: hasCdRune,
            hasCdBoots: false,
            totalHaste: gameModeHaste + (hasCdRune ? 18 : 0),
            
        } as Player;

        players.push(player);
    });

    var game = {  
        gameMode: activeGame.gameMode,
        gameData: {
            gameStartTime: activeGame.gameStartTime,
            players: players
        }} as Match;

    return game;
}

