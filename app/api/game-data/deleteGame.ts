import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

/**
 * Delete a specific game given the gameId (used primarily when the game ends) 
 * 
 * @param gameId the gameId of the game (not the id of the game)
 */
export async function deleteGame(gameId: string) {
    try {
        const deletedGame = await deleteDoc(doc(db, 'games', gameId));

        console.log(`Successfully deleted game with gameId: ${gameId}`, deletedGame);

    } catch (error) {
        console.log(`Failed to delete game with gameId: ${gameId}`, error);
    }
};