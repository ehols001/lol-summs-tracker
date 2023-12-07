import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match, Player } from '@/db/schema';
import TeamSelector from "@/components/TeamSelector";
import Link from 'next/link';

export default async function GamePage({
    params
}: {
    params: {team_code: string}
}) {

    const response = JSON.parse(JSON.stringify(await getGameByGameId(params.team_code))) as Match;
    let players = response?.gameData?.players;
    let team1 = players?.filter(p => p.teamId === 100) as Player[];
    let team2 = players?.filter(p => p.teamId === 200) as Player[];

    return (
        <>
            {players
                ? <TeamSelector team1={team1} team2={team2} team_code={params.team_code}/>
                : <div className='flex min-h-screen flex-col items-center justify-center p-24'>
                    <p>Oops! We're unable to find a game with that summoner.</p>
                    <Link
                        href='/'
                        replace
                        className='bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900 text-slate-100 mt-2 px-2 py-1 border border-teal-950 rounded-lg'
                    >
                        Try Again
                    </Link>
                </div>
            }
        </>
    )

    
}
