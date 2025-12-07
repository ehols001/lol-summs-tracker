export const getActiveGame = async (userName: string, tagLine: string) => {
    const riotHeader = new Headers();
    riotHeader.append('X-Riot-Token', process.env.RIOT_API_KEY!);

    const res = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${userName}/${tagLine}`, {
        headers: riotHeader
    });

    if(!res.ok)
    {
        const errorText = await res.text();
        console.error(`Error fetching puuid for ${userName}#${tagLine}:`, {
            status: res.status,
            statusText: res.statusText,
            error: errorText
        });
        throw new Error(`Error fetching puuid: ${res.status} ${res.statusText} - ${errorText}`);
    }

    var data = await res.json();

    //console.log('FIRST DATA CHECK:');
    //console.log(data);

    const res2 = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${data.puuid}`, {
        headers: riotHeader
    });

    if(!res2.ok)
    {
        const errorText = await res2.text();
        console.error(`Error fetching summoner for puuid ${data.puuid}:`, {
            status: res2.status,
            statusText: res2.statusText,
            error: errorText
        });
        throw new Error(`Error fetching summoner: ${res2.status} ${res2.statusText} - ${errorText}`);
    }

    data = await res2.json();

    //console.log('SECOND DATA CHECK:');
    //console.log(data);

    const res3 = await fetch(`https://na1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${data.puuid}`, {
        headers: riotHeader
    });

    if(!res3.ok)
    {
        const errorText = await res3.text();
        console.error(`Error fetching active game for summoner ${data.puuid}:`, {
            status: res3.status,
            statusText: res3.statusText,
            error: errorText
        });
        throw new Error(`Player not in active game: ${res3.status} ${res3.statusText} - ${errorText}`);
    }

    data = await res3.json();

    //console.log('THIRD DATA CHECK:');
    //console.log(data);

    return data;
}