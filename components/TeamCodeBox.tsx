'use client'

import { createGame } from "@/app/api/game-data/createGame";
import { Match } from "@/db/schema";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const TeamCodeBox = ({
    game,
}: {
    game: Match;
}) => {
    
    const [isCopied, setIsCopied] = useState(false);

    return (
        <div className='flex flex-col justify-evenly items-center w-[320px] h-[175px]'>
            <div className='text-white font-bold'>
                <p>Your Team's Game Code</p>
            </div>
            <div className='flex justify-center'>
                <div className='bg-slate-100 w-[200px] text-center text-slate-600 my-2 p-2 rounded-l-lg border border-slate-400'>
                    {game.gameId}
                </div>
                {isCopied ?
                    <div className='bg-slate-100 my-2 px-3 py-2 text-green-600 rounded-r-lg border border-l-transparent border-slate-400'>
                        <FontAwesomeIcon icon={faCheck} size='lg' />
                    </div>
                    : <button
                        className='bg-slate-100 my-2 px-3 py-2 text-slate-600 hover:text-slate-500 rounded-r-lg border border-l-transparent border-slate-400'
                        onClick={() => {
                            navigator.clipboard.writeText(game.gameId);
                            setIsCopied(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faCopy} size='lg' />
                    </button>
                }
            </div>
            <Link
                className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 text-slate-100 px-2 py-1 border border-teal-950 rounded-lg'
                href={`/game/${game.gameId}`}
                replace
                onClick={() => { createGame(game) }}
            >
                Continue
            </Link>
        </div>
    )
}