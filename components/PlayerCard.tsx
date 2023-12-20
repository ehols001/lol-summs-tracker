import { Player } from '@/db/schema';
import { PlayerTiles } from './PlayerTiles';
import { cooldownAdjuster } from '@/utils/cooldownAdjuster';
import { riotCurrentVersion } from '@/utils/getRiotCurrentVersion';
import getSummonerTimes from '@/utils/getSummonerTimes';

export const PlayerCard = ({
    player,
    playerIndex,
    gameId,
    gameClock,
    gameMode,
}: {
    player: Player;
    playerIndex: number;
    gameId: string;
    gameClock: number;
    gameMode: string;
}) => {

    // Currently have to update riotCurrentVersion manually on new version releases
    const championTile = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentVersion}/img/champion/${player.championImageName}`;
    const summ1 = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentVersion}/img/spell/${player.summ1ImageName}`;
    const summ2 = `https://ddragon.leagueoflegends.com/cdn/${riotCurrentVersion}/img/spell/${player.summ2ImageName}`;

    const { adjustedCd1, adjustedCd2 } = cooldownAdjuster(player, gameClock, gameMode);
    const currCdTime1 = player.timeWhenUsed1 !== null ? player.timeWhenUsed1.seconds : 0;
    const currCdTime2 = player.timeWhenUsed2 !== null ? player.timeWhenUsed2.seconds : 0;
    const cdRemainders = getSummonerTimes(adjustedCd1, adjustedCd2, currCdTime1, currCdTime2);

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
                cd1TimeLeft={cdRemainders.timeLeftOn1}
                cd2TimeLeft={cdRemainders.timeLeftOn2}
            />
            <div className='last:hidden w-[100%] h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent'></div>
        </>
    )
}