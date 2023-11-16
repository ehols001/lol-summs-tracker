'use client'

import Link from 'next/link';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CreateSession() {

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

    const team_code = generateRandomString({ length: 16 });

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className='flex flex-col justify-evenly items-center w-[320px] h-[175px] bg-slate-300 rounded-xl border-2 border-slate-400'>
                <div className='text-slate-600 font-bold'>
                    <p>Team Access Code</p>
                </div>
                <div className='flex justify-center'>
                    <div className='bg-slate-100 w-[200px] text-center text-slate-600 px-3 py-2 rounded-l-lg border border-slate-400'>
                        {team_code}
                    </div>
                    {isCopied ?
                        <div className='bg-slate-100 px-3 py-2 text-green-600 rounded-r-lg border border-l-transparent border-slate-400'>
                            <FontAwesomeIcon icon={faCheck} size='lg' />
                        </div>
                        : <button
                            className='bg-slate-100 px-3 py-2 text-slate-600 hover:text-slate-500 rounded-r-lg border border-l-transparent border-slate-400'
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
                    <div className='bg-gray-300 text-gray-400 px-2 py-1 border border-gray-400 rounded-lg'>
                        Continue
                    </div>
                :   <Link
                        className='bg-cyan-700 hover:bg-cyan-600 text-slate-100 px-2 py-1 border border-cyan-900 rounded-lg'
                        href={`/game/${team_code}`}
                    >
                        Continue
                    </Link>
                }
            </div>
        </div>
    )
}
