'use client'

import { updateBoots, updateSumm } from '@/app/api/game-data/updateGame';
import { Player } from '@/db/schema';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SummTimers } from './SummTimers';

export const PlayerTiles = ({
    championTile,
    summ1Tile,
    summ2Tile,
    player,
    playerIndex,
    gameId,
    gameClock,
}: {
    championTile: string;
    summ1Tile: string;
    summ2Tile: string;
    player: Player;
    playerIndex: number;
    gameId: string;
    gameClock: number;
}) => {

    const [timeRemainingOnSumm1, setTimeRemainingOnSumm1] = useState(player.timeAvailable1 <= (new Date).getTime() ? 0 : player.timeAvailable1 - (new Date).getTime());
    const [timeRemainingOnSumm2, setTimeRemainingOnSumm2] = useState(player.timeAvailable2 <= (new Date).getTime() ? 0 : player.timeAvailable2 - (new Date).getTime());
    const [hasCdBoots, setHasCdBoots] = useState(player.hasCdBoots);

    const championTileAlt = championTile.slice(championTile.lastIndexOf('/') + 1, championTile.lastIndexOf('.'));
    const summ1Alt = summ1Tile.slice(summ1Tile.lastIndexOf('/') + 1, summ1Tile.lastIndexOf('.'));
    const summ2Alt = summ2Tile.slice(summ2Tile.lastIndexOf('/') + 1, summ2Tile.lastIndexOf('.'));

    // Update the countdown timers every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeRemainingOnSumm1 > 0) {
                setTimeRemainingOnSumm1((previous) => previous - 1000);
            }
            if (timeRemainingOnSumm2 > 0) {
                setTimeRemainingOnSumm2((previous) => previous - 1000);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeRemainingOnSumm1, timeRemainingOnSumm2]);

    // Sets whichever summ that was clicked to active and updates the time it was clicked in the db
    async function handleSummClick(summNum: number) {
        if (summNum === 1 && timeRemainingOnSumm1 <= 0) {
            let timeUntil = await updateSumm(gameId, gameClock, playerIndex, summNum) as number;
            setTimeRemainingOnSumm1(timeUntil - (new Date).getTime());
        }
        else if (summNum === 2 && timeRemainingOnSumm2 <= 0) {
            let timeUntil = await updateSumm(gameId, gameClock, playerIndex, summNum) as number;
            setTimeRemainingOnSumm2(timeUntil - (new Date).getTime());
        }
    }

    // Sets whether the player has cooldown boots or not and updates the db
    async function handleBootsChange() {
        let bootsStatus = await updateBoots(gameId, playerIndex, hasCdBoots) as boolean;
        setHasCdBoots(bootsStatus);
    }

    return (
        <div className='flex justify-evenly items-center w-[100%] py-3'>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 border border-gray-600 rounded-md'>
                <Image
                    src={championTile}
                    alt={championTileAlt}
                    width={75}
                    height={75}
                    priority={true}
                    className='rounded-md'
                />
                <Image
                    src={hasCdBoots ? '/CdBoots.jpg' : '/NoCdBoots.jpg'}
                    alt='Cooldown Boots'
                    width={25}
                    height={25}
                    className='absolute bottom-0 left-0 rounded-md hover:cursor-pointer'
                    onClick={handleBootsChange}
                />
            </div>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ1Tile}
                    alt={summ1Alt}
                    width={70}
                    height={70}
                    priority={true}
                    className='rounded-md hover:cursor-pointer'
                    onClick={() => handleSummClick(1)}
                />
                <div className={`${timeRemainingOnSumm1 > 0 ? '' : 'hidden'}`}>
                    <div className='absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md'></div>
                    <SummTimers timeRemaining={timeRemainingOnSumm1} />
                </div>
            </div>
            <div className='relative bg-gradient-to-br from-slate-400 to-slate-600 w-1/5 h-5/6 my-auto border border-gray-600 rounded-md'>
                <Image
                    src={summ2Tile}
                    alt={summ2Alt}
                    width={70}
                    height={70}
                    priority={true}
                    className='rounded-md hover:cursor-pointer'
                    onClick={() => handleSummClick(2)}
                />
                <div className={`${timeRemainingOnSumm2 > 0 ? '' : 'hidden'}`}>
                    <div className='absolute top-0 left-0 bg-black opacity-70 w-[100%] h-[100%] rounded-md'></div>
                    <SummTimers timeRemaining={timeRemainingOnSumm2} />
                </div>
            </div>
        </div>
    )
}