'use client'

import Link from 'next/link'
import { useState } from 'react';

export default function Home() {
    const [summonerNameValue, setSummonerNameValue] = useState('');
    const [tagLineValue, setTagLineValue] = useState('');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <input name='summonerName'
                placeholder='Summoner Name'
                className='bg-slate-600 m-2 p-2 rounded-lg placeholder-white'
                onChange={(e) => setSummonerNameValue(e.target.value)} />

            <input name='tagLine'
                placeholder='Example: NA1'
                className='bg-slate-600 m-2 p-2 rounded-lg placeholder-white'
                onChange={(e) => setTagLineValue(e.target.value)} />

            {(summonerNameValue === '' || tagLineValue === '') ?
                <div className='bg-gray-300 text-gray-400 m-2 p-2 rounded-lg'>
                    Create Session
                </div>
                :
                <Link className='bg-slate-400 m-2 p-2 rounded-lg' href={{ pathname: '/create-session', query: { summonerName: summonerNameValue, tagLine: tagLineValue } }}>
                    Create Session
                </Link>
            }

            <p className='pt-12'>Already have a game code?</p>
            <Link className='bg-slate-400 m-2 p-2 rounded-lg'
                href='/join-session'>
                Join Session
            </Link>

        </div>
    )
}
