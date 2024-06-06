import * as mongoose from "mongoose";
import { GolfClub } from "../types/golf-club";
import { GolfClubChamps } from "../types/golf-club-champs";
import { GolfClubMembership } from "../types/golf-club-membership.enum";

export type GolfClubModel = mongoose.Document & GolfClub;

const GolfClubChampsSchema = new mongoose.Schema({
    teeId: {
        type : String
    },
    name: {
        type : String
    },
    gender: {
        type : String
    },
    r1: {
        type : Number
    },
    r2: {
        type : Number
    },
    r3: {
        type : Number
    },
    r4: {
        type : Number
    },
    bestCR : {
        type : Number
    },
    date : {
        type : Date
    },
    CR : {
        type: Number
    },
    bestScore : {
        type: Number
    }
});

const golfClubSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    membership: {
        type: GolfClubMembership,
        required: true
    },
    numberOfHoles: {
        type: Number,
        required: true
    },
    //  Alpha2 or subdivision code
    countryCode: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    contactName: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    status: {
        type: Boolean
    },
    menChamp : {
        type : GolfClubChampsSchema
    },
    ladiesChamp : {
        type : GolfClubChampsSchema
    }
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

export const GolfClubSchema = mongoose.model<GolfClubModel>("GolfClub", golfClubSchema);


