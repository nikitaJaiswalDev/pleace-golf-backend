import * as mongoose from "mongoose";
import { GolfCourse } from "../types/golf-course";
import { GolfCourseType } from "../types/golf-course-type.enum";
import { GolfTee } from "../types/golf-tee";
import { Gender } from "../types/gender.enum";

export type GolfCourseModel = mongoose.Document & GolfCourse;

const golfTeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Gender,
        required: true
    },
    courseRating: {
        type: Number,
        required: true
    },
    slopeRating: {
        type: Number,
        required: true
    },
    par: {
        type: Number,
        required: true
    },
    holes: [
        {
            hole: {
                type: Number,
                required: true
            },
            par: {
                type: Number,
                required: true
            }
        }
    ],
    userCourseRating : {
        type:Number
    },
    courseRatings : [
        {
            course : {
                type : Number
            },
            clubHouse : {
                type : Number
            },
            proShop : {
                type : Number
            },
            training : {
                type : Number
            },
            services : {
                type : Number
            },
            reviewComments : {
                type:String
            },
            userId : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
});

const golfCourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GolfClub',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    numberOfHoles: {
        type: Number,
        required: true
    },
    par: {
        type: Number
    },
    type: {
        type: GolfCourseType,
        required: true
    },
    slope : {
        type: Number
    },
    rating : {
        type: Number
    },
    length : {
        type: Number
    },
    tees: [
        golfTeeSchema
    ],
    status : {
        type: Boolean,
        default : true
    },
    userCourseRating : {
        type : Number,
        default : 0
    },
    courseRatings : [
        {
            course : {
                type : Number
            },
            clubHouse : {
                type : Number
            },
            proShop : {
                type : Number
            },
            training : {
                type : Number
            },
            services : {
                type : Number
            },
            ratingAvg : {
                type : Number
            },
            reviewComments : {
                type:String
            },
            userId : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

export const GolfCourseSchema = mongoose.model<GolfCourseModel>("GolfCourse", golfCourseSchema);