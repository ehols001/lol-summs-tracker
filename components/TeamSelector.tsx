'use client'

import React from 'react';
import { useTeamContext } from './TeamProvider';

export const TeamSelector = () => {

    const [teamDisplay, setTeamDisplay] = useTeamContext();

    return (
        <div className='flex w-[265px]'>
            <button
                className={teamDisplay === 1 ? 'w-1/2 p-2 text-slate-300 border-t border-gray-400 rounded-t-xl' : 'w-1/2 p-2 text-slate-500'}
                onClick={() => setTeamDisplay(1)}
            >
                Team 1
            </button>
            <button
                className={teamDisplay === 2 ? 'w-1/2 p-2 text-slate-300 border-t border-gray-400 rounded-t-xl' : 'w-1/2 p-2 text-slate-500'}
                onClick={() => setTeamDisplay(2)}
            >
                Team 2
            </button>
        </div>
    )
}