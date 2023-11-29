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
    const team2: Player[] = players?.slice(5);

    return (
        <div>
            {game ? <GameCard players={team2} /> : <Loading />}
        </div>
    )
}
