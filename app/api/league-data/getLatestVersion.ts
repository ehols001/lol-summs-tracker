export const getLatestVersion = async () => {

    const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', { cache: 'no-store'});

    var versionData = await versionResponse.json();
    var latestVersion = versionData[0];

    return latestVersion;
}
