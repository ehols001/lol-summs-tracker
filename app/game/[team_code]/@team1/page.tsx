import { getGameByGameId } from '@/app/api/game-data/getGame';
import { GameCard } from '@/components/GameCard';
import { Match, Player } from '@/db/schema';
import Loading from '../loading';

export default async function GamePage({
    params,
}: {
    params: { 
        team_code: string
    };
}) {

    const game = await getGameByGameId(params.team_code) as Match;
    const players: Player[] = game?.gameData.players.map((player) => player);
    const team1: Player[] = players?.slice(0, 5);

    return (
        <div>
            {game ? <GameCard players={team1} gameId={params.team_code} /> : <Loading />}
        </div>
    )
}
