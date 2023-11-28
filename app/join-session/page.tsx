'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function JoinSession() {

    const [team_code, setTeamCode] = useState('');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className='flex flex-col justify-evenly items-center w-[320px] h-[175px]'>
                <div className='text-white font-bold'>
                    <p>Enter Your Team's Game Code</p>
                </div>

                <input name='teamCode'
                    placeholder="Game Code"
                    className='bg-slate-600 m-2 p-2 rounded-lg placeholder-white'
                    onChange={(e) => setTeamCode(e.target.value)} />

                {team_code === '' ?
                    <div className='bg-gray-300 text-gray-400 px-2 py-1 border border-gray-400 rounded-lg'>
                        Submit
                    </div>
                    : <Link
                        className='bg-cyan-700 hover:bg-cyan-600 text-slate-100 px-2 py-1 border border-cyan-900 rounded-lg'
                        href={`game/${team_code}`}
                    >
                        Submit
                    </Link>
                }
            </div>
        </div>
    )
}
