'use server'

import { getGameByGameId } from "@/app/api/game-data/getGame";
import { Match } from "@/db/schema";

export async function checkGameIdExists(team_code: string) {
    const game = await getGameByGameId(team_code) as Match;
    return game ? true : false;
}