export interface Player {
    host: boolean,
    summonerName: string,
    teamId: number,
    championImageName: string,
    champion: string,
    summ1ImageName: string
    summ1: string,
    cooldown1: number,
    timeWhenUsed1: Date,
    summ2ImageName: string,
    summ2: string,
    cooldown2: number,
    timeWhenUsed2: Date,
    hasCdRune: boolean
}

export interface Match {
    gameId: string,
    gameMode: string,
    gameData: {
        gameStartTime: number,
        players: Player[]
    }
}