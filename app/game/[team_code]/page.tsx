import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match } from '@/db/schema';
import { GameCard } from '@/components/GameCard';
import JoinError from './join-error';
import { getLatestVersion } from '@/app/api/league-data/getLatestVersion';

export default async function GamePage({
    params
}: {
    params: { team_code: string }
}) {

    const riotCurrentVersion = await getLatestVersion();

    let game = await getGameByGameId(params.team_code) as Match;
    if(game) {
        game = JSON.parse(JSON.stringify(game));
    }

    return ( 
        <>
            {game
                ?   <GameCard game={game} version={riotCurrentVersion} />
                :   <JoinError />
            }
        </>
    )
}