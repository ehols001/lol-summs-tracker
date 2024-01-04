'use client'

import { updateBoots, updateSumm } from '@/app/api/game-data/updateGame';
import { Match, Player } from '@/db/schema';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SummTimers } from './SummTimers';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

    const [timeRemainingOnSumm1, setTimeRemainingOnSumm1] = useState(0);
    const [timeRemainingOnSumm2, setTimeRemainingOnSumm2] = useState(0);
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

    // Keeps summs up to date on page refresh
    useEffect(() => {
        setTimeRemainingOnSumm1(player.timeAvailable1 - (new Date).getTime());
        setTimeRemainingOnSumm2(player.timeAvailable2 - (new Date).getTime());
    }, []);

    // Listen for changes between firestore snapshots and updates time remaining on summs or the players boot status if there's a change
    useEffect(() => {
        const q = query(collection(db, 'games'), where('gameId', '==', gameId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'modified') {
                    let upToDateGame = change.doc.data() as Match;
                    let currPlayer = upToDateGame.gameData.players[playerIndex];
                    if(player.timeAvailable1 !== currPlayer.timeAvailable1) {
                        //console.log(`${currPlayer.champion} summ timer 1: `, currPlayer.timeAvailable1);
                        setTimeRemainingOnSumm1(currPlayer.timeAvailable1 - (new Date).getTime());
                    }
                    if(player.timeAvailable2 !== currPlayer.timeAvailable2) {
                        //console.log(`${currPlayer.champion} summ timer 2: `, currPlayer.timeAvailable2);
                        setTimeRemainingOnSumm2(currPlayer.timeAvailable2 - (new Date).getTime());
                    }
                    if(player.hasCdBoots !== currPlayer.hasCdBoots) {
                        setHasCdBoots(currPlayer.hasCdBoots);
                    }
                }
            }, (error: any) => {
                console.log("There's been an issue with the snapshot listener: ", error);
            });
            
            return () => unsubscribe();
        });
    }, []);

    // Updates the db with the time the summ will be available again for whichever summ was clicked
    async function handleSummClick(summNum: number) {
        if (summNum === 1 && timeRemainingOnSumm1 <= 0) {
            await updateSumm(gameId, gameClock, playerIndex, summNum);
        }
        else if (summNum === 2 && timeRemainingOnSumm2 <= 0) {
            await updateSumm(gameId, gameClock, playerIndex, summNum);
        }
    }

    // Updates the db to whether the player has cooldown boots or not
    async function handleBootsChange() {
        await updateBoots(gameId, playerIndex, hasCdBoots);
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