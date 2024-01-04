'use client'

import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';
import { useTeamContext } from './TeamProvider';
import { useDrag } from '@use-gesture/react';

export const GameCard = ({
    game,
    version,
}: {
    game: Match;
    version: string;
}) => {

    const [teamNum, setTeamNum] = useTeamContext();

    // Used to allow swiping between team tabs
    const bind = useDrag(
        ({ swipe: [swipeX], cancel }) => {
            if(swipeX > 50) {
                setTeamNum((prev) => (prev === 1 ? 2 : 1)); // Swipe right
                cancel(); // Cancel gesture prevents unintentional drags
            } else if(swipeX < -50) {
                setTeamNum((prev) => (prev === 2 ? 1 : 2)); // Swipe left
                cancel(); // Cancel gesture prevents unintentional drags
            }
        }, 
        { eventOptions: { passive: false} } // Enables touch events
    );

    let timeSinceGameStart = Date.now() - game?.gameData?.gameStartTime;
    let minutesSinceStart = Math.floor(timeSinceGameStart / 60000);

    let team1 = game?.gameData?.players?.filter(p => p.teamId === 100) as Player[];
    let team2 = game?.gameData?.players?.filter(p => p.teamId === 200) as Player[];

    return (
        <div className='flex flex-col justify-center items-center w-[320px]' {...bind()}>
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