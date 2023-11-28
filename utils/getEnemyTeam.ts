'use server'

import { getGameByGameId } from "@/app/api/game-data/getGame";
import { Match, Player } from "@/db/schema";

export default async function getEnemyTeam(team_code: string) {
    const game = await getGameByGameId(team_code) as Match;
    //console.log('Match: ', game);
    
    const players: Player[] = game?.gameData.players.map((player) => player);

    const hostTeamId = players?.find((player) => player.host === true)?.teamId;
    //console.log(hostTeamId);

    function filterEnemyTeam(player: Player) {
        return player.teamId !== hostTeamId;
    }

    const enemyTeam = players?.filter(filterEnemyTeam);
    //console.log(enemyTeam);

    return enemyTeam;
}