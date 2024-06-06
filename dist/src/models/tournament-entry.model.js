"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentEntrySchema = void 0;
const mongoose = require("mongoose");
const golf_division_enum_1 = require("../types/golf-division.enum");
const gender_enum_1 = require("../types/gender.enum");
const tournamentEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GolfCourse',
        required: true
    },
    scorecardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TournamentScorecard',
        required: true
    },
    leaderboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TournamentLeaderboard',
        required: true
    },
    division: {
        type: golf_division_enum_1.GolfDivision,
        required: true
    },
    handicapIndex: {
        type: Number,
        required: true
    },
    tee: {
        type: String,
        required: true
    },
    gender: {
        type: gender_enum_1.Gender,
        required: true
    },
    teamName: {
        type: String
    },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
exports.TournamentEntrySchema = mongoose.model("TournamentEntry", tournamentEntrySchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1lbnRyeS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvdG91cm5hbWVudC1lbnRyeS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFFckMsb0VBQTJEO0FBQzNELHNEQUE4QztBQUk5QyxNQUFNLHFCQUFxQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM5QyxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsTUFBTTtRQUNYLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDcEMsR0FBRyxFQUFFLFlBQVk7UUFDakIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsWUFBWTtRQUNqQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQ3BDLEdBQUcsRUFBRSxxQkFBcUI7UUFDMUIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxhQUFhLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsdUJBQXVCO1FBQzVCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLGlDQUFZO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsb0JBQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO0tBQ2Y7Q0FDSixFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTFELFFBQUEscUJBQXFCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBdUIsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50RW50cnkgfSBmcm9tIFwiLi4vdHlwZXMvdG91cm5hbWVudC1lbnRyeVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IEdlbmRlciB9IGZyb20gXCIuLi90eXBlcy9nZW5kZXIuZW51bVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVG91cm5hbWVudEVudHJ5TW9kZWwgPSBtb25nb29zZS5Eb2N1bWVudCAmIFRvdXJuYW1lbnRFbnRyeTtcclxuXHJcbmNvbnN0IHRvdXJuYW1lbnRFbnRyeVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgdXNlcklkOiB7XHJcbiAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgIHJlZjogJ1VzZXInLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgdG91cm5hbWVudElkOiB7XHJcbiAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgIHJlZjogJ1RvdXJuYW1lbnQnLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgY291cnNlSWQ6IHtcclxuICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgcmVmOiAnR29sZkNvdXJzZScsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBzY29yZWNhcmRJZDoge1xyXG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICByZWY6ICdUb3VybmFtZW50U2NvcmVjYXJkJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGxlYWRlcmJvYXJkSWQ6IHtcclxuICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgcmVmOiAnVG91cm5hbWVudExlYWRlcmJvYXJkJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGRpdmlzaW9uOiB7XHJcbiAgICAgICAgdHlwZTogR29sZkRpdmlzaW9uLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgaGFuZGljYXBJbmRleDoge1xyXG4gICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHRlZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGdlbmRlcjoge1xyXG4gICAgICAgIHR5cGU6IEdlbmRlcixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHRlYW1OYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG59LCB7IHRpbWVzdGFtcHM6IHsgY3JlYXRlZEF0OiBcImNyZWF0ZWRBdFwiLCB1cGRhdGVkQXQ6IFwidXBkYXRlZEF0XCIgfSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBUb3VybmFtZW50RW50cnlTY2hlbWEgPSBtb25nb29zZS5tb2RlbDxUb3VybmFtZW50RW50cnlNb2RlbD4oXCJUb3VybmFtZW50RW50cnlcIiwgdG91cm5hbWVudEVudHJ5U2NoZW1hKTsiXX0=