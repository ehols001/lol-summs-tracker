'use client'

import { Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';
import { useTeamContext } from './TeamProvider';

export const GameCard = ({
    players,
    gameId,
}: {
    players: Player[];
    gameId: string;
}) => {

    const [teamNum] = useTeamContext();

    let team1 = players?.filter(p => p.teamId === 100) as Player[];
    let team2 = players?.filter(p => p.teamId === 200) as Player[];

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            <div className='w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
            <div className={teamNum === 2 ? 'hidden' : 'w-[100%]'}>
                {team1?.map((player, index) => (
                    <PlayerCard player={player} key={index} playerIndex={index} gameId={gameId} />
                ))}
            </div>
            <div className={teamNum === 1 ? 'hidden' : 'w-[100%]'}>
                {team2?.map((player, index) => (
                    <PlayerCard player={player} key={index} playerIndex={index + 5} gameId={gameId} />
                ))}
            </div>
        </div>
    )
}