import { Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';

export const GameCard = ({
    enemyTeam,
}: {
    enemyTeam: Player[];
}) => {

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            {enemyTeam.map((player, index) => (
                <PlayerCard player={player} key={index} />
            ))}
        </div>
    )
}