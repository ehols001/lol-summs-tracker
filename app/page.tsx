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
                className='bg-slate-600 m-2 p-2 rounded-lg placeholder-slate-400'
                onChange={(e) => setSummonerNameValue(e.target.value)} />

            <input name='tagLine'
                placeholder='Example: NA1'
                className='bg-slate-600 m-2 p-2 rounded-lg placeholder-slate-400'
                onChange={(e) => setTagLineValue(e.target.value)} />

            {(summonerNameValue === '' || tagLineValue === '') ?
                <div className='bg-slate-300 text-slate-400 m-2 p-2 border border-slate-400 rounded-lg'>
                    Create Session
                </div>
                :
                <Link
                    className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 m-2 p-2 border border-teal-950 rounded-lg'
                    href={{ pathname: '/create-session', query: { summonerName: summonerNameValue, tagLine: tagLineValue } }}
                >
                    Create Session
                </Link>
            }

            <p className='pt-12'>Already have a code from a teammate?</p>
            <Link
                className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 m-2 p-2 border border-teal-950 rounded-lg'
                href='/join-session'
            >
                Join Session
            </Link>

        </div>
    )
}
