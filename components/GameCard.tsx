import { Match, Player } from '@/db/schema';
import { PlayerCard } from './PlayerCard';

export const GameCard = ({
    game,
}: {
    game: Match;
}) => {

    const players: Player[] = game.gameData.players.map((player) => player);

    const hostTeamId = players.find((player) => player.host === true)?.teamId;
    //console.log(hostTeamId);

    function filterEnemyTeam(player: Player) {
        return player.teamId !== hostTeamId;
    }

    const enemyTeam = players.filter(filterEnemyTeam);
    //console.log(enemyTeam);

    return (
        <div className='flex flex-col justify-center items-center w-[320px]'>
            {enemyTeam.map((player, index) => (
                <PlayerCard player={player} key={index} />
            ))}
        </div>
    )
}