import { Player } from '@/db/schema';
import { PlayerTiles } from './PlayerTiles';

export const PlayerCard = ({
    player,
    playerIndex,
    gameId,
    gameClock,
    version,
}: {
    player: Player;
    playerIndex: number;
    gameId: string;
    gameClock: number;
    version: string;
}) => {

    const championTile = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championImageName}`;
    const summ1Tile = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${player.summ1ImageName}`;
    const summ2Tile = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${player.summ2ImageName}`;

    return (
        <>
            <PlayerTiles
                championTile={championTile}
                summ1Tile={summ1Tile}
                summ2Tile={summ2Tile}
                player={player}
                playerIndex={playerIndex}
                gameId={gameId}
                gameClock={gameClock}
            />
            <div className='last:hidden w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
        </>
    )
}