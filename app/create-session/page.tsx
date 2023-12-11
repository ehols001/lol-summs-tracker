import { TeamCodeBox } from '@/components/TeamCodeBox';
import getMatchSession from '@/utils/getMatchSession';

export default async function CreateSession({
    searchParams,
}: {
    searchParams: {
        summonerName: string,
        tagLine: string,
    }
}) {

    const game = await getMatchSession(searchParams.summonerName, searchParams.tagLine);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <TeamCodeBox game={game} />
        </div>
    )
}

