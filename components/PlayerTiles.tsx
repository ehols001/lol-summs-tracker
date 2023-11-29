'use client'

import Image from 'next/image';
import { useState } from 'react';

export const PlayerTiles = ({
    championTile,
    summ1,
    summ2,
}: {
    championTile: string;
    summ1: string;
    summ2: string;
}) => {

    const [summ1Active, setSumm1Active] = useState(false);
    const [summ2Active, setSumm2Active] = useState(false);

    const championTileAlt = championTile.slice(championTile.lastIndexOf('/') + 1, championTile.lastIndexOf('.'));
    const summ1Alt = summ1.slice(summ1.lastIndexOf('/') + 1, summ1.lastIndexOf('.'));
    const summ2Alt = summ2.slice(summ2.lastIndexOf('/') + 1, summ2.lastIndexOf('.'));
    //console.log(championTileAlt + " " + summ1Alt + " " + summ2Alt);

    function handleSummClick(summNum: number) {
        summNum === 1 ? setSumm1Active(!summ1Active) : setSumm2Active(!summ2Active);
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
                    onClick={() => handleSummClick(1)}
                ></div>
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
                    onClick={() => handleSummClick(2)}
                ></div>
            </div>
        </div>
    )
}