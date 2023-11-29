'use client'

import { Suspense, useState } from "react"
import Loading from "./loading"

export default function GameLayout({
    team1,
    team2,
}: {
    team1: React.ReactNode;
    team2: React.ReactNode;
}) {

    const [teamDisplay, setTeamDisplay] = useState(1);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
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
            <Suspense fallback={<Loading />}>
                {teamDisplay === 1 ? team1 : team2}
            </Suspense>
        </div>
    )
}