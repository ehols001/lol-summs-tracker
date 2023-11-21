import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match } from '@/db/schema';
import { GameCard } from '@/components/GameCard';

export default async function GamePage({
    params,
}: {
    params: { team_code: string }
}) {

    const game = await getGameByGameId(params.team_code) as Match;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <GameCard game={game} />
        </div>
    )
}
