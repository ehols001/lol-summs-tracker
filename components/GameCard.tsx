import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';

export const GameCard = ({
        game,
}: {
        game: Match;
}) => {
        
        const players: Player[] = game.gameData.players.map((player) => player);

        return (
                <div className='flex flex-col justify-center items-center w-[320px] h-[500px] bg-gradient-to-br from-cyan-950 to-blue-950 border-2 border-stone-500 rounded-xl'>
                        {players.map((player) => (
                                <PlayerCard player={player} key={player.champion} />
                        ))}
                </div>
        )
}