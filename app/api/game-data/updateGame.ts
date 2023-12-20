'use server'

import { Player } from "@/db/schema";
import { db } from "@/lib/firebase";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Update a specific game given the gameId (used to updated the timestamp of when summoner spells were used)
 * 
 * @param gameId the gameId of the game (not the id of the game)
 * @param playerIndex the index of the player whose summoner spell timer is being updated
 * @param summNum the number summoner spell that was used (either 1 slot or 2 slot)
 */
export async function updateGame(
    gameId: string,
    playerIndex: number,
    summNum: number,
) {
    try {

        const summToUpdate = summNum === 1 ? 'timeWhenUsed1' : 'timeWhenUsed2';

        const gameRef = doc(db, 'games', gameId);

        const gameDoc = await getDoc(gameRef);
        const gameData = gameDoc.data();

        let players = [] as Player[];
        gameData?.gameData.players.forEach((element: Player, index: number) => {
            if (index === playerIndex) {
                let currDate = new Date;
                let currTimeInMs = currDate.getTime();
                if(summNum === 1) {
                    element.timeWhenUsed1 = new Timestamp(Math.floor(currTimeInMs / 1000), (currTimeInMs % 1000) * 1000000);
                } else if(summNum === 2) {
                    element.timeWhenUsed2 = new Timestamp(currTimeInMs / 1000, (currTimeInMs % 1000) * 1000000);
                }
            }
            players.push(element);
        })

        const gameObject = {
            gameId: gameData?.gameId,
            gameMode: gameData?.gameMode,
            gameData: {
                gameStartTime: gameData?.gameData.gameStartTime,
                players: players,
            }
        }

        await setDoc(doc(db, 'games', gameId), gameObject);

        const updatedGame = await getDoc(gameRef);
        const updatedPlayer = updatedGame.data()?.gameData.players[playerIndex] as Player;

        console.log(`Successfully updated ${updatedPlayer.champion}'s ${summNum === 1 ? updatedPlayer.summ1 : updatedPlayer.summ2} in game ${gameId} to time when used: ${updatedPlayer[summToUpdate]}`);

    } catch (error) {
        console.log(`Failed to update game with gameId: ${gameId}`, error);
    }
}

