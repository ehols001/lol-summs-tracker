'use client'

import { updateGame } from '@/app/api/game-data/updateGame';
import { cooldownAdjusterBoots } from '@/utils/cooldownAdjuster';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Helper function to format a time into a readable format
 * 
 * @param time the time to be formatted
 * 
 * @returns the formatted time in M:SS format
 */
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const PlayerTiles = ({
    championTile,
    summ1,
    cooldown1,
    summ2,
    cooldown2,
    playerIndex,
    gameId,
}: {
    championTile: string;
    summ1: string;
    cooldown1: number;
    summ2: string;
    cooldown2: number;
    playerIndex: number;
    gameId: string;
}) => {

    const [summ1Active, setSumm1Active] = useState(false);
    const [summ2Active, setSumm2Active] = useState(false);
    const [timeRemainingOnSumm1, setTimeRemainingOnSumm1] = useState(0);
    const [timeRemainingOnSumm2, setTimeRemainingOnSumm2] = useState(0);
    const [hasCdBoots, setHasCdBoots] = useState(false);

    const championTileAlt = championTile.slice(championTile.lastIndexOf('/') + 1, championTile.lastIndexOf('.'));
    const summ1Alt = summ1.slice(summ1.lastIndexOf('/') + 1, summ1.lastIndexOf('.'));
    const summ2Alt = summ2.slice(summ2.lastIndexOf('/') + 1, summ2.lastIndexOf('.'));

    // Update the countdown timers every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeRemainingOnSumm1 <= 0) {
                setSumm1Active(false);
            }
            if (timeRemainingOnSumm2 <= 0) {
                setSumm2Active(false);
            }
            if (summ1Active && timeRemainingOnSumm1 > 0) {
                setTimeRemainingOnSumm1((previous) => previous - 1000);
            }
            if (summ2Active && timeRemainingOnSumm2 > 0) {
                setTimeRemainingOnSumm2((previous) => previous - 1000);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [summ1Active, summ2Active, timeRemainingOnSumm1, timeRemainingOnSumm2]);

    // Sets whichever summ that was clicked to active and updates the time it was clicked in the db
    async function handleSummClick(summNum: number) {
        // Adjusted cooldowns if player has cooldown boots
        let {adjustedCd1, adjustedCd2} = cooldownAdjusterBoots(cooldown1, cooldown2, hasCdBoots);
        
        if (summNum === 1 && !summ1Active) {
            cooldown1 = adjustedCd1;
            setTimeRemainingOnSumm1(cooldown1 * 1000);
            setSumm1Active(true);
            await updateGame(gameId, playerIndex, summNum);
        }
        else if (summNum === 2 && !summ2Active) {
            cooldown2 = adjustedCd2;
            setTimeRemainingOnSumm2(cooldown2 * 1000);
            setSumm2Active(true);
            await updateGame(gameId, playerIndex, summNum);
        }
    }

    // Sets whether the player has cooldown boots or not
    function handleBootsChange() {
        setHasCdBoots(!hasCdBoots);
    }

    return (
        <div className='flex justify-evenly items-center w-[100%] py-3'>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 border border-gray-600 rounded-md'>
                <Image
                    src={championTile}
                    alt={championTileAlt}
                    width={75}
                    height={75}
                    className='rounded-md'
                />
                <Image
                    src={hasCdBoots ? '/CdBoots.jpg' : '/NoCdBoots.jpg'}
                    alt='Boots of Lucidity'
                    width={25}
                    height={25}
                    className='absolute bottom-0 left-0 rounded-md hover:cursor-pointer'
                    onClick={handleBootsChange}
                />
            </div>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ1}
                    alt={summ1Alt}
                    width={70}
                    height={70}
                    className='rounded-md hover:cursor-pointer'
                    onClick={() => handleSummClick(1)}
                />
                <div className={`${summ1Active ? '' : 'hidden'}`}>
                    <div className='absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md'></div>
                    <div className='absolute top-0 left-0 w-[100%] h-[100%] rounded-md'>
                        <span className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            {formatTime(timeRemainingOnSumm1)}
                        </span>
                    </div>
                </div>
            </div>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ2}
                    alt={summ2Alt}
                    width={70}
                    height={70}
                    className='rounded-md hover:cursor-pointer'
                    onClick={() => handleSummClick(2)}
                />
                <div className={`${summ2Active ? '' : 'hidden'}`}>
                    <div className='absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md'></div>
                    <div className='absolute top-0 left-0 w-[100%] h-[100%] rounded-md'>
                        <span className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            {formatTime(timeRemainingOnSumm2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}