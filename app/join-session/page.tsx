'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function JoinSession() {

    const [team_code, setTeamCode] = useState('');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className='flex flex-col justify-evenly items-center w-[320px] h-[175px] bg-slate-300 rounded-xl border-2 border-slate-400'>
                <div className='text-slate-600 font-bold'>
                    <p>Enter Your Team's Access Code</p>
                </div>
                <input
                    type="text"
                    id="team_code"
                    name="team_code"
                    className='bg-slate-100 w-[200px] text-center text-slate-600 px-3 py-2 rounded-lg border border-slate-400'
                    onChange={() => setTeamCode((document.getElementById('team_code') as HTMLInputElement).value)}
                />
                {team_code === '' ?
                    <div className='bg-gray-300 text-gray-400 px-2 py-1 border border-gray-400 rounded-lg'>
                        Submit
                    </div>
                :   <Link
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
