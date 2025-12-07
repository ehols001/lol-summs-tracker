'use client'

import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';
import { useTeamContext } from './TeamProvider';
import { useState } from 'react';

export const GameCard = ({
    game,
    version,
}: {
    game: Match;
    version: string;
}) => {

    const [teamNum, setTeamNum] = useTeamContext();
    const [startX, setStartX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if(startX !== null) {
            const deltaX = e.touches[0].clientX - startX;
            if(deltaX > 50) {
                setTeamNum((prev) => (prev === 1 ? 2 : 1)); // Swipe right
                setStartX(null);
            } else if(deltaX < -50) {
                setTeamNum((prev) => (prev === 2 ? 1 : 2)); // Swipe left
                setStartX(null);
            }
        }
    };

    let timeSinceGameStart = Date.now() - game?.gameData?.gameStartTime;
    let minutesSinceStart = Math.floor(timeSinceGameStart / 60000);

    let team1 = game?.gameData?.players?.filter(p => p.teamId === 100) as Player[];
    let team2 = game?.gameData?.players?.filter(p => p.teamId === 200) as Player[];

    return (
        <div
            className='flex flex-col justify-center items-center w-full max-w-[320px] px-4'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setStartX(null)}
            onTouchCancel={() => setStartX(null)}
        >
            <div className={teamNum === 2 ? 'hidden' : 'w-[100%]'}>
                {team1?.map((player, index) => (
                    <PlayerCard
                        player={player}
                        key={index}
                        playerIndex={index}
                        gameId={game.gameId}
                        gameClock={minutesSinceStart}
                        version={version}
                    />
                ))}
            </div>
            <div className={teamNum === 1 ? 'hidden' : 'w-[100%]'}>
                {team2?.map((player, index) => (
                    <PlayerCard
                        player={player}
                        key={index}
                        playerIndex={index + 5}
                        gameId={game.gameId}
                        gameClock={minutesSinceStart}
                        version={version}
                    />
                ))}
            </div>
        </div>
    )
}