'use client'

import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';
import { useTeamContext } from './TeamProvider';

export const GameCard = ({
    game,
}: {
    game: Match;
}) => {

    const [teamNum] = useTeamContext();

    let timeSinceGameStart = Date.now() - game?.gameData?.gameStartTime;
    let minutesSinceStart = Math.floor(timeSinceGameStart / 60000);

    let team1 = game?.gameData?.players?.filter(p => p.teamId === 100) as Player[];
    let team2 = game?.gameData?.players?.filter(p => p.teamId === 200) as Player[];

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            <div className='w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
            <div className={teamNum === 2 ? 'hidden' : 'w-[100%]'}>
                {team1?.map((player, index) => (
                    <PlayerCard player={player} key={index} playerIndex={index} gameId={game.gameId} gameClock={minutesSinceStart} />
                ))}
            </div>
            <div className={teamNum === 1 ? 'hidden' : 'w-[100%]'}>
                {team2?.map((player, index) => (
                    <PlayerCard player={player} key={index} playerIndex={index + 5} gameId={game.gameId} gameClock={minutesSinceStart} />
                ))}
            </div>
        </div>
    )
}