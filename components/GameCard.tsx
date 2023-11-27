import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';

export const GameCard = ({
        game,
}: {
        game: Match;
}) => {
        
        const players: Player[] = game.gameData.players.map((player) => player);

        return (
                <div className='flex flex-col justify-center items-center w-[320px]'>
                        {players.map((player) => (
                                <PlayerCard player={player} key={player.champion} />
                        ))}
                </div>
        )
}