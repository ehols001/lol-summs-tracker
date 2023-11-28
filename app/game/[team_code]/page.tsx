import { getGameByGameId } from '@/app/api/game-data/getGame';
import { GameCard } from '@/components/GameCard';
import { Match, Player } from '@/db/schema';

export default async function GamePage({
    params,
}: {
    params: { 
        team_code: string
    };
}) {

    const game = await getGameByGameId(params.team_code) as Match;
    //console.log('Match: ', game);
    
    const players: Player[] = game.gameData.players.map((player) => player);

    const hostTeamId = players.find((player) => player.host === true)?.teamId;
    //console.log(hostTeamId);

    function filterEnemyTeam(player: Player) {
        return player.teamId !== hostTeamId;
    }

    const enemyTeam = players.filter(filterEnemyTeam);
    //console.log(enemyTeam);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <GameCard enemyTeam={enemyTeam} />
        </div>
    )
}
