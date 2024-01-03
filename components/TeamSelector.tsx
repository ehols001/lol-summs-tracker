'use client'

import React from 'react';
import { useTeamContext } from './TeamProvider';

export const TeamSelector = () => {

    const [teamDisplay, setTeamDisplay] = useTeamContext();

    return (
        <div className='relative flex flex-col w-[265px] mb-3'>
            <div className='py-1'>
                <button
                    className={`w-1/2 p-2 ${teamDisplay === 1 ? 'text-slate-300' : 'text-slate-500'}`}
                    onClick={() => setTeamDisplay(1)}
                >
                    Team 1
                </button>
                <button
                    className={`w-1/2 p-2 ${teamDisplay === 2 ? 'text-slate-300' : 'text-slate-500'}`}
                    onClick={() => setTeamDisplay(2)}
                >
                    Team 2
                </button>
            </div>
            <div className={`w-1/2 h-[4px] bg-red-800 absolute bottom-0 transition-transform ${teamDisplay === 1 ? 'translate-x-0' : 'translate-x-full'}`}></div>
        </div>
    )
}