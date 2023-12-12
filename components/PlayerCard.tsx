import { Player } from '@/db/schema';
import { PlayerTiles } from './PlayerTiles';
import { riotCurrentPatch } from '@/utils/riotCurrentPatch';

export const PlayerCard = ({
    player,
    playerIndex,
    gameId,
    gameClock,
}: {
    player: Player;
    playerIndex: number;
    gameId: string;
    gameClock: number;
}) => {

    const championTile = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentPatch}/img/champion/${player.championImageName}`;
    const summ1 = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentPatch}/img/spell/${player.summ1ImageName}`;
    const summ2 = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentPatch}/img/spell/${player.summ2ImageName}`;

    const cdRuneHaste = 18; // Summoner spell haste given from Cosmic Insight rune
    const cdHasteMultiplier = 100 / (100 + cdRuneHaste); // Formula Riot uses as a multiplier for cooldowns affected by haste

    const adjustedCd1 = player.hasCdRune ? player.cooldown1 * cdHasteMultiplier : player.cooldown1;
    const adjustedCd2 = player.hasCdRune ? player.cooldown2 * cdHasteMultiplier : player.cooldown2;

    return (
        <>
            <PlayerTiles
                championTile={championTile}
                summ1={summ1}
                summ2={summ2}
                playerIndex={playerIndex}
                gameId={gameId}
                cooldown1={adjustedCd1}
                cooldown2={adjustedCd2}
                gameClock={gameClock}
            />
            <div className='last:hidden w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
        </>
    )
}