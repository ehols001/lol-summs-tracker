import { Player } from '@/db/schema';
import Image from 'next/image';

export const PlayerCard = ({
        player,
}: {
        player: Player;
}) => {

        const championTile = `/images/champions/${player.champion}.jpg`;
        const summ1 = `/images/${player.summ1}.jpg`;
        const summ2 = `/images/${player.summ2}.jpg`;

        return (
                <div className='flex justify-evenly items-evenly w-[90%] py-2'>
                        <Image
                                src={championTile}
                                alt={player.champion}
                                width={70}
                                height={70}
                                className='bg-white w-1/4 rounded-md'
                        />
                        <div className='bg-white w-1/4 rounded-md'>
                                {player.summ1}
                        </div>
                        <div className='bg-white w-1/4 rounded-md'>
                                {player.summ2}
                        </div>
                </div>
        )
}