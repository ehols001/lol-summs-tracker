import { Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';

export const GameCard = ({
    players,
    gameId,
}: {
    players: Player[];
    gameId: string;
}) => {

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            <div className='w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
            {players?.map((player, index) => (
                <PlayerCard player={player} key={index} playerIndex={index} gameId={gameId} />
            ))}
        </div>
    )
}