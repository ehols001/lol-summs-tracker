import { GameCard } from '@/components/GameCard';
import { Player } from '@/db/schema';
import getEnemyTeam from '@/utils/getEnemyTeam';

export default async function GamePage({
    params,
}: {
    params: { 
        team_code: string
    };
}) {

    const enemyTeam = await getEnemyTeam(params.team_code) as Player[];
    //console.log(enemyTeam);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            {enemyTeam ? <GameCard enemyTeam={enemyTeam} /> : <p>Oops! That summoner isn't currently in a game</p>}
        </div>
    )
}
