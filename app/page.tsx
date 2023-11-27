'use client'

import Link from 'next/link'
import React from 'react';

export default function Home() {
    const [summonerNameValue, setSummonerNameValue] = React.useState('');
    const [tagLineValue, setTagLineValue] = React.useState('');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <input name='summonerName'
                placeholder='Summoner'
                className='bg-slate-400 m-2 p-2 rounded-lg placeholder-white'
                onChange={(e) => setSummonerNameValue(e.target.value)} />

            <input name='tagLine'
                placeholder='Tag Line'
                className='bg-slate-400 m-2 p-2 rounded-lg placeholder-white'
                onChange={(e) => setTagLineValue(e.target.value)} />

            <Link className='bg-slate-400 m-2 p-2 rounded-lg' href={{ pathname: '/create-session', query: { summonerName: summonerNameValue, tagLine: tagLineValue } }}>
                Create Session
            </Link>

            <p className='pt-12'>Already have a game code?</p>
            <Link className='bg-slate-400 m-2 p-2 rounded-lg'
                href='/join-session'>
                Join Session
            </Link>

        </div>
    )
}
