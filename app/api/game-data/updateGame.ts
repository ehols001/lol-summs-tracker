'use server'

import { Player } from "@/db/schema";
import { db } from "@/lib/firebase";
import { cooldownAdjuster } from "@/utils/cooldownAdjuster";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Update a specific game given the gameId (used to updated the timestamp of when summoner spells were used)
 * 
 * @param gameId the gameId of the game (not the id of the game)
 * @param playerIndex the index of the player whose summoner spell timer is being updated
 * @param summNum the number summoner spell that was used (either 1 slot or 2 slot)
 */
export async function updateSumm(
    gameId: string,
    gameClock: number,
    playerIndex: number,
    summNum: number,
) {
    try {

        const summToUpdate = summNum === 1 ? 'timeAvailable1' : 'timeAvailable2';

        const gameRef = doc(db, 'games', gameId);

        const gameDoc = await getDoc(gameRef);
        const gameData = gameDoc.data();

        let players = [] as Player[];
        gameData?.gameData.players.forEach((element: Player, index: number) => {
            if (index === playerIndex) {
                const { adjustedCd1, adjustedCd2 } = cooldownAdjuster(element, gameClock);
                if(summNum === 1) {
                    element.timeAvailable1 = (new Date).getTime() + (adjustedCd1 * 1000);
                } else if(summNum === 2) {
                    element.timeAvailable2 = (new Date).getTime() + (adjustedCd2 * 1000);
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

        console.log(`Successfully updated ${updatedPlayer.champion}'s ${summNum === 1 ? updatedPlayer.summ1 : updatedPlayer.summ2} in game ${gameId} to time when available: ${updatedPlayer[summToUpdate]}`);

        return summNum === 1 ? updatedPlayer.timeAvailable1 : updatedPlayer.timeAvailable2;

    } catch (error) {
        console.log(`Failed to update game with gameId: ${gameId}`, error);
    }
}

/**
 * Update whether a player has cooldown boots or not given the gameId and the player's index
 * 
 * @param gameId the gameId of the game (not the id of the game)
 * @param playerIndex the index of the player whose hasCdBoots field is being updated
 * @param hasCdBoots boolean value for whether the player has cooldown boots or not
 */
export async function updateBoots(
    gameId: string,
    playerIndex: number,
    hasCdBoots: boolean,
) {
    try {

        const gameRef = doc(db, 'games', gameId);

        const gameDoc = await getDoc(gameRef);
        const gameData = gameDoc.data();

        let players = [] as Player[];
        gameData?.gameData.players.forEach((element: Player, index: number) => {
            if (index === playerIndex) {
                element.hasCdBoots = !hasCdBoots;
                element.totalHaste = element.hasCdBoots ? element.totalHaste + 12 : element.totalHaste - 12;
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

        console.log(`Successfully updated ${updatedPlayer.champion}'s hasCdBoots field in game ${gameId} to ${updatedPlayer['hasCdBoots']} and totalHaste to ${updatedPlayer.totalHaste}`);

        return updatedPlayer.hasCdBoots;

    } catch (error) {
        console.log(`Failed to update game with gameId: ${gameId}`, error);
    }
}

