import { getGameByGameId } from '@/app/api/game-data/getGame';
import { Match, Player } from '@/db/schema';
import TeamSelector from "@/components/TeamSelector";

export default async function GameLayout({
    params
}: {
    params: {team_code: string}
}) {

    const response = JSON.parse(JSON.stringify(await getGameByGameId(params.team_code))) as Match;
    let players = response.gameData.players;
    let team1 = players.filter(p => p.teamId === 100) as Player[];
    let team2 = players.filter(p => p.teamId === 200) as Player[];

    return (
        <TeamSelector team1={team1} team2={team2} team_code={params.team_code}/>
    )

    
}
