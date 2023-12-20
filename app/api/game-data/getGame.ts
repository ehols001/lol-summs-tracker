'use server'

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Find a specific game given the gameId 
 * 
 * @param gameId the gameId of the game (not the id of the game) 
 * 
 * @returns full game data (gameId, gameMode, and gameData including gameStartTime and the players array)
 */
export const getGameByGameId = async (gameId: string) => {
    try {
        const gameRef = doc(db, 'games', gameId);
        const game = await getDoc(gameRef);

        if(game.exists()) {
            //console.log(`Successfully found game with the gameId: ${gameId}`, game.data());
            return game.data();
        } else {
            console.log(`Failed to find game with the gameId: ${gameId}`);
        }

    } catch (error) {
        console.log(`Failed to find game with the gameId: ${gameId}`, error);
    }
};