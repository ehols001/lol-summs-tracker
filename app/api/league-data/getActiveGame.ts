export const getActiveGame = async (userName: string, tagLine: string) => {
    const riotHeader = new Headers();
    riotHeader.append('X-Riot-Token', process.env.RIOT_API_KEY!);

    const res = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${userName}/${tagLine}`, {
        headers: riotHeader
    });

    if(!res.ok)
    {
        throw new Error("Error fetching puuid");
    }

    var data = await res.json();

    // console.log(data);

    const res2 = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${data.puuid}`, {
        headers: riotHeader
    });

    if(!res2.ok)
    {
        throw new Error("Error fetching summoner");
    }

    data = await res2.json();

    // console.log(data);

    const res3 = await fetch(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}`, {
        headers: riotHeader
    });

    if(!res3.ok)
    {
        throw new Error("Player not in active game");
    }

    data = await res3.json();

    // console.log(data);

    return data;
}