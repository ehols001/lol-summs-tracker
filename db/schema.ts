import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface Player {
        summonerName: string,
        champion: string,
        summ1: string,
        cooldown1: number,
        timeWhenUsed1: Date,
        summ2: string,
        cooldown2: number,
        timeWhenUsed2: Date
}

export interface Match {
        gameId: string,
        gameData: {
                gameStartTime: Date,
                players: Player[]
        }
}

const gameSchema = new Schema({
        gameId: String,
        gameData: {
                gameStartTime: Date,
                players: [
                        {
                                summonerName: String,
                                champion: String,
                                summ1: String,
                                cooldown1: Number,
                                timeWhenUsed1: Date,
                                summ2: String,
                                cooldown2: Number,
                                timeWhenUsed2: Date
                        }
                ]
        }
});

const Game = models.Game || mongoose.model('Game', gameSchema);
export default Game;