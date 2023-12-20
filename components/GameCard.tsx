'use client'

import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';
import { useTeamContext } from './TeamProvider';
import { useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const GameCard = ({
    game,
}: {
    game: Match;
}) => {

    const [teamNum] = useTeamContext();

    let upToDateGame = game;

    useEffect(() => {
        const q = query(collection(db, 'games'), where('gameId', '==', game.gameId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    console.log('New game added: ', change.doc.data());
                }
                if (change.type === 'modified') {
                    upToDateGame = change.doc.data() as Match;
                    console.log('Game modified: ', change.doc.data());
                }
                if (change.type === 'removed') {
                    console.log('Game removed: ', change.doc.data());
                }
            }, (error: any) => {
                console.log("There's been an issue with the snapshot listener: ", error);
            });
            
            return () => unsubscribe();
        });
    }, []);

    let timeSinceGameStart = Date.now() - game?.gameData?.gameStartTime;
    let minutesSinceStart = Math.floor(timeSinceGameStart / 60000);

    let team1 = upToDateGame?.gameData?.players?.filter(p => p.teamId === 100) as Player[];
    let team2 = upToDateGame?.gameData?.players?.filter(p => p.teamId === 200) as Player[];

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            <div className='w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
            <div className={teamNum === 2 ? 'hidden' : 'w-[100%]'}>
                {team1?.map((player, index) => (
                    <PlayerCard
                        player={player}
                        key={index}
                        playerIndex={index}
                        gameId={game.gameId}
                        gameClock={minutesSinceStart}
                        gameMode={game.gameMode}
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
                        gameMode={game.gameMode}
                    />
                ))}
            </div>
        </div>
    )
}