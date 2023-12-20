import { Match } from "@/db/schema";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * Find all games
 * 
 * @returns full game data (gameId, gameMode, and gameData including gameStartTime and the players array) for all games
 */
export async function getAllGames() {
    try {
        let games = [] as Match[];
        const gamesSnapshot = await getDocs(collection(db, 'games'));
        gamesSnapshot.forEach((game) => {
            games.push(game.data() as Match);
        })

        //console.log('Successfully found all games', games);
        return games;

    } catch (error) {
        console.log('Failed to find all games', error);
    }
};