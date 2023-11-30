'use client'

import { updateGame } from '@/app/api/game-data/updateGame';
import getSummonerTimes from '@/utils/getSummonerTimes';
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
    summ2,
    playerIndex,
    gameId,
}: {
    championTile: string;
    summ1: string;
    summ2: string;
    playerIndex: number;
    gameId: string;
}) => {

    const [summ1Active, setSumm1Active] = useState(false);
    const [summ2Active, setSumm2Active] = useState(false);
    const [timeRemainingOnSumm1, setTimeRemainingOnSumm1] = useState(0);
    const [timeRemainingOnSumm2, setTimeRemainingOnSumm2] = useState(0);

    const championTileAlt = championTile.slice(championTile.lastIndexOf('/') + 1, championTile.lastIndexOf('.'));
    const summ1Alt = summ1.slice(summ1.lastIndexOf('/') + 1, summ1.lastIndexOf('.'));
    const summ2Alt = summ2.slice(summ2.lastIndexOf('/') + 1, summ2.lastIndexOf('.'));
    //console.log(championTileAlt + " " + summ1Alt + " " + summ2Alt);
    
    // Gets the summoner spell cooldowns and sets the remaining time left on them
    useEffect(() => {
        const fetchSummonerTimes = async () => {
            try {
                const response = await getSummonerTimes(gameId, playerIndex);
                setTimeRemainingOnSumm1(response.timeLeftOn1);
                setTimeRemainingOnSumm1(response.timeLeftOn2);
            } catch(error) {
                console.error('Error fetching remaining summoner times:', error);
            }
        };

        fetchSummonerTimes();
    }, [gameId, playerIndex]);

    // Update the countdown timers every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(timeRemainingOnSumm1 <= 0) {
                setSumm1Active(false);
            }
            if(timeRemainingOnSumm2 <= 0) {
                setSumm2Active(false);
            }
            if(summ1Active && timeRemainingOnSumm1 > 0) {
                setTimeRemainingOnSumm1((previous) => previous - 1000);
            }
            if(summ2Active && timeRemainingOnSumm2 > 0) {
                setTimeRemainingOnSumm2((previous) => previous - 1000);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [summ1Active, summ2Active, timeRemainingOnSumm1, timeRemainingOnSumm2]);

    // Sets whichever summ that was clicked to active and updates the time it was clicked in the db
    function handleSummClick(summNum: number) {
        if(summNum === 1 && !summ1Active) {
            setSumm1Active(!summ1Active);
            updateGame(gameId, playerIndex, summNum);
        }
        else if(summNum === 2 && !summ2Active) {
            setSumm2Active(!summ2Active);
            updateGame(gameId, playerIndex, summNum);
        }
    }

    return (
        <div className='flex justify-evenly w-[100%] py-3'>
            <Image
                src={championTile}
                alt={championTileAlt}
                width={70}
                height={70}
                className='bg-gradient-to-br from-slate-400 to-slate-600 w-1/4 border border-gray-600 rounded-md'
            />
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ1}
                    alt={summ1Alt}
                    width={70}
                    height={70}
                    className='rounded-md'
                    onClick={() => handleSummClick(1)}
                />
                <div
                    className={`${summ1Active ? '' : 'hidden'} absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md`}
                >
                    <span className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        {formatTime(timeRemainingOnSumm1)}
                    </span>
                </div>
            </div>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ2}
                    alt={summ2Alt}
                    width={70}
                    height={70}
                    className='rounded-md'
                    onClick={() => handleSummClick(2)}
                />
                <div
                    className={`${summ2Active ? '' : 'hidden'} absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md`}
                >
                    <span className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        {formatTime(timeRemainingOnSumm2)}
                    </span>
                </div>
            </div>
        </div>
    )
}