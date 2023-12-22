export interface Player {
    host: boolean,
    summonerName: string,
    teamId: number,
    championImageName: string,
    champion: string,
    summ1ImageName: string
    summ1: string,
    cooldown1: number,
    timeAvailable1: number,
    summ2ImageName: string,
    summ2: string,
    cooldown2: number,
    timeAvailable2: number,
    hasCdRune: boolean,
    hasCdBoots: boolean,
    totalHaste: number,
}

export interface Match {
    gameId: string,
    gameMode: string,
    gameData: {
        gameStartTime: number,
        players: Player[]
    }
}