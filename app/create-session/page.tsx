import { TeamCodeBox } from '@/components/TeamCodeBox';
import getMatchSession from '@/utils/getMatchSession';
import { getAllGames } from '../api/game-data/getGames';

/**
* Generates a random sequence of alphanumeric characters of variable length
* 
* @param length - length of the generated string
* @returns a string consisting of a random sequence of alphanumeric characters of variable length
*/
function generateRandomString({ length }: { length: number }) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

/**
 * Generates a unique gameId
 * 
 * @returns a unique gameId
 */
async function handleGameCode() {

    var gameId = generateRandomString({ length: 4 });

    const games = await getAllGames();
    const gameIds = games?.map((game) => game.gameId);

    while(gameIds?.includes(gameId)) {
        console.log(gameId);
        gameId = gameIds.includes(gameId) ? generateRandomString({ length: 4 }) : gameId;
    }

    return gameId;
}

export default async function CreateSession({
    searchParams,
}: {
    searchParams: {
        summonerName: string,
        tagLine: string,
    }
}) {

    const game = await getMatchSession(searchParams.summonerName, searchParams.tagLine);
    game.gameId = await handleGameCode();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <TeamCodeBox game={game} />
        </div>
    )
}

