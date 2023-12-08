import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match } from '@/db/schema';
import { GameCard } from '@/components/GameCard';
import GameError from './error';

export default async function GamePage({
    params
}: {
    params: { team_code: string }
}) {

    const response = JSON.parse(JSON.stringify(await getGameByGameId(params.team_code))) as Match;
    let players = response?.gameData?.players;

    return (
        <>
            {players
                ? <GameCard players={players} gameId={params.team_code} />
                : <GameError />
            }
        </>
    )


}