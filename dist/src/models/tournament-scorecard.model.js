"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentScorecardSchema = void 0;
const mongoose = require("mongoose");
const golf_division_enum_1 = require("../types/golf-division.enum");
const gender_enum_1 = require("../types/gender.enum");
const tournamentScorecardSchema = new mongoose.Schema({
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
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GolfCourse',
        required: true
    },
    division: {
        type: golf_division_enum_1.GolfDivision,
        required: true
    },
    scores: [
        {
            hole: {
                type: Number,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            points: {
                type: Number
            }
        }
    ],
    handicapIndex: {
        type: Number,
        required: true
    },
    courseIndex: {
        type: Number,
        required: true
    },
    tee: {
        type: String,
        required: true
    },
    teeId: {
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
    round: {
        type: Number
    }
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
exports.TournamentScorecardSchema = mongoose.model("TournamentScorecard", tournamentScorecardSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1zY29yZWNhcmQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL3RvdXJuYW1lbnQtc2NvcmVjYXJkLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUVyQyxvRUFBMkQ7QUFDM0Qsc0RBQThDO0FBSTlDLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2xELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQ3BDLEdBQUcsRUFBRSxNQUFNO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsWUFBWTtRQUNqQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQ3BDLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLGlDQUFZO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0o7WUFDSSxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLG9CQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsS0FBSyxFQUFHO1FBQ0osSUFBSSxFQUFFLE1BQU07S0FDZjtDQUVKLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFMUQsUUFBQSx5QkFBeUIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUEyQixxQkFBcUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRTY29yZWNhcmQgfSBmcm9tIFwiLi4vdHlwZXMvdG91cm5hbWVudC1zY29yZWNhcmRcIjtcclxuaW1wb3J0IHsgR29sZkRpdmlzaW9uIH0gZnJvbSBcIi4uL3R5cGVzL2dvbGYtZGl2aXNpb24uZW51bVwiO1xyXG5pbXBvcnQgeyBHZW5kZXIgfSBmcm9tIFwiLi4vdHlwZXMvZ2VuZGVyLmVudW1cIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRvdXJuYW1lbnRTY29yZWNhcmRNb2RlbCA9IG1vbmdvb3NlLkRvY3VtZW50ICYgVG91cm5hbWVudFNjb3JlY2FyZDtcclxuXHJcbmNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmRTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIHVzZXJJZDoge1xyXG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHRvdXJuYW1lbnRJZDoge1xyXG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICByZWY6ICdUb3VybmFtZW50JyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGNvdXJzZToge1xyXG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICByZWY6ICdHb2xmQ291cnNlJyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGRpdmlzaW9uOiB7XHJcbiAgICAgICAgdHlwZTogR29sZkRpdmlzaW9uLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgc2NvcmVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBob2xlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY29yZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBoYW5kaWNhcEluZGV4OiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgY291cnNlSW5kZXg6IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICB0ZWU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICB0ZWVJZDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGdlbmRlcjoge1xyXG4gICAgICAgIHR5cGU6IEdlbmRlcixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHRlYW1OYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgcm91bmQgOiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyXHJcbiAgICB9XHJcblxyXG59LCB7IHRpbWVzdGFtcHM6IHsgY3JlYXRlZEF0OiBcImNyZWF0ZWRBdFwiLCB1cGRhdGVkQXQ6IFwidXBkYXRlZEF0XCIgfSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hID0gbW9uZ29vc2UubW9kZWw8VG91cm5hbWVudFNjb3JlY2FyZE1vZGVsPihcIlRvdXJuYW1lbnRTY29yZWNhcmRcIiwgdG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYSk7Il19