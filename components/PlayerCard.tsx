import { Player } from '@/db/schema';
import Image from 'next/image';

export const PlayerCard = ({
        player,
}: {
        player: Player;
}) => {

        const championTile = `/images/champions/${player.champion}.jpg`;
        const summ1 = `/images/summoners/${player.summ1}.png`;
        const summ2 = `/images/summoners/${player.summ2}.png`;

        /* function handleSummClick() {

        } */

        return (
                <>
                        <div className='flex justify-evenly items-evenly w-[90%] py-2'>
                                <Image
                                        src={championTile}
                                        alt={player.champion}
                                        width={70}
                                        height={70}
                                        className='bg-white w-1/4 border border-gray-600 rounded-md'
                                />
                                <Image
                                        src={summ1}
                                        alt={player.summ1}
                                        width={70}
                                        height={70}
                                        className='bg-white w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'
                                        /* onClick={handleSummClick()} */
                                />
                                <Image
                                        src={summ2}
                                        alt={player.summ2}
                                        width={70}
                                        height={70}
                                        className='bg-white w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'
                                />
                        </div>
                        <div className='last:hidden w-[90%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
                </>
        )
}