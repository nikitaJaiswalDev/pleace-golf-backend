import * as mongoose from "mongoose";
export type ChampionModel = mongoose.Document & Champion;

const championSchema = new mongoose.Schema({
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    division: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    permitForInvite: {
        type: Boolean,
    }
});

export const ChampionSchema = mongoose.model<ChampionModel>("champion",championSchema);

export class Champion {
    _id: string;
    country: string;
    state: string;
    division: string;
    name: string;
    email : string;
    permitForInvite : boolean;
}