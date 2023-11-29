'use client'

import Link from 'next/link';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { createGame } from '../api/game-data/createGame';
import { checkGameIdExists } from '@/utils/checkGameIdExists';

export default function CreateSession({
    searchParams,
}: {
    searchParams: {
        summonerName: string,
        tagLine: string,
    }
}) {

    const [team_code, setTeamCode] = useState(generateRandomString({ length: 4 }));
    const [isCopied, setIsCopied] = useState(false);

    /**
     * Generates a random sequence of alphanumeric characters of variable length
     * 
     * @param length - length of the generated string
     * @returns a string consisting of a random sequence of alphanumeric characters of variable length
     */
    function generateRandomString({ length }: { length: number }) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    /**
     * Checks to see whether a game is already using the current team code and if so sets a new one 
     * 
     * @returns either the original team code or a newly generated code depending on whether
     * or not the team code already exists in the db
     */
    async function handleTeamCode() {
        // TO DO - make sure team_codes (gameIds) are unique
        return await checkGameIdExists(team_code) ? setTeamCode(generateRandomString({ length: 4 })) : team_code;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className='flex flex-col justify-evenly items-center w-[320px] h-[175px]'>
                <div className='text-white font-bold'>
                    <p>Your Team's Game Code</p>
                </div>
                <div className='flex justify-center'>
                    <div className='bg-slate-100 w-[200px] text-center text-slate-600 my-2 p-2 rounded-l-lg border border-slate-400'>
                        {team_code}
                    </div>
                    {isCopied ?
                        <div className='bg-slate-100 my-2 px-3 py-2 text-green-600 rounded-r-lg border border-l-transparent border-slate-400'>
                            <FontAwesomeIcon icon={faCheck} size='lg' />
                        </div>
                        : <button
                            className='bg-slate-100 my-2 px-3 py-2 text-slate-600 hover:text-slate-500 rounded-r-lg border border-l-transparent border-slate-400'
                            onClick={() => {
                                navigator.clipboard.writeText(team_code);
                                setIsCopied(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faCopy} size='lg' />
                        </button>
                    }
                </div>
                {!isCopied ?
                    <div className='bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 text-slate-400 px-2 py-1 border border-slate-400 rounded-lg'>
                        Continue
                    </div>
                    : <Link
                        className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 text-slate-100 px-2 py-1 border border-teal-950 rounded-lg'
                        href={`/game/${team_code}`}
                        replace
                        onClick={() => createGame(team_code, searchParams.summonerName, searchParams.tagLine)}
                    >
                        Continue
                    </Link>
                }
            </div>
        </div>
    )
}

