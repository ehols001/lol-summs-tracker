import { Player } from '@/db/schema';
import { PlayerTiles } from './PlayerTiles';

export const PlayerCard = ({
    player,
    playerIndex,
    gameId,
}: {
    player: Player;
    playerIndex: number;
    gameId: string;
}) => {

    const championTile = `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${player.championImageName}`;
    const summ1 = `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${player.summ1ImageName}`;
    const summ2 = `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${player.summ2ImageName}`;

    return (
        <>
            <PlayerTiles championTile={championTile} summ1={summ1} summ2={summ2} playerIndex={playerIndex} gameId={gameId}/>
            <div className='last:hidden w-[90%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
        </>
    )
}