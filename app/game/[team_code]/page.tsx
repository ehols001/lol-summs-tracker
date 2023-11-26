import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match, Player } from '@/db/schema';
import { GameCard } from '@/components/GameCard';
import { getActiveGame } from '@/app/api/league-data/getActiveGame';
import { getChampionMapping } from '@/app/api/league-data/getChampionMapping';
import { getSummonerMapping } from '@/app/api/league-data/getSummonerMapping';
import { useSearchParams } from 'next/navigation'

export default async function GamePage({
    params, searchParams
}: {
    params: { team_code: string }; searchParams: { summonerName: string, tagLine: string }
}) {

    console.log('Summoner Name:', searchParams.summonerName);
    console.log('Tag Line:', searchParams.tagLine);

    var activeGame = await getActiveGame(searchParams.summonerName, searchParams.tagLine);
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
        gameId: activeGame.gameId, 
        gameData: {
            gameStartTime: activeGame.gameStartTime,
            players: players
        }} as Match;

    console.log('Match: ', game);
    // const game = await getGameByGameId(params.team_code) as Match;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <GameCard game={game} />
        </div>
    )
}
