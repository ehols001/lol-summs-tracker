import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match } from '@/db/schema';
import { GameCard } from '@/components/GameCard';
import JoinError from './join-error';

export default async function GamePage({
    params
}: {
    params: { team_code: string }
}) {

    const game = JSON.parse(JSON.stringify(await getGameByGameId(params.team_code))) as Match;

    return (
        <>
            {game
                ?   <GameCard game={game} />
                :   <JoinError />
            }
        </>
    )
}