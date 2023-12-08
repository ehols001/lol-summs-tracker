'use client'

import Link from "next/link";

export default function GameError() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <p>Oops! We're unable to find the game you're looking for.</p>
            <Link
                href='/'
                replace
                className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 text-slate-100 mt-2 px-2 py-1 border border-teal-950 rounded-lg'
            >
                Try Again
            </Link>
        </div>
    )
}