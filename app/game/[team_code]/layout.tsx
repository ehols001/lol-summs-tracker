import { Suspense } from "react";
import Loading from "./loading";
import { TeamSelector } from "@/components/TeamSelector";
import TeamProvider from "@/components/TeamProvider";
import { getGameByGameId } from "@/app/api/game-data/getGame";
import { Match } from "@/db/schema";

export default async function GameLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { team_code: string };
}) {

    let game = await getGameByGameId(params.team_code) as Match;
    if(game) {
        game = JSON.parse(JSON.stringify(game));
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <TeamProvider>
                {game ? <TeamSelector /> : <></> }
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </TeamProvider>
        </div>
    )
}

