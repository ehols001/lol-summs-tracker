'use server'

import { Match } from '@/db/schema';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Insert a game into firebase given a game
 * 
 * @param game the game to be inserted into firebase
 */
export const createGame = async (game: Match) => {
    try {
        await setDoc(doc(db, 'games', game.gameId), game);
        console.log('Successfully created game', game);

    } catch (error) {
        console.log('Failed to create game', error);
    }
}