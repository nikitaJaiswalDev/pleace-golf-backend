"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenSchema = void 0;
const mongoose = require("mongoose");
const golf_division_enum_1 = require("../types/golf-division.enum");
const accessTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    golfDivision: {
        type: golf_division_enum_1.GolfDivision,
        required: true
    }
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
exports.AccessTokenSchema = mongoose.model("AccessToken", accessTokenSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLXRva2VuLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9hY2Nlc3MtdG9rZW4ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLG9FQUEyRDtBQUkzRCxNQUFNLGlCQUFpQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxpQ0FBWTtRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFMUQsUUFBQSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFtQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL3R5cGVzL2FjY2Vzcy10b2tlblwiO1xyXG5leHBvcnQgdHlwZSBBY2Nlc3NUb2tlbk1vZGVsID0gbW9uZ29vc2UuRG9jdW1lbnQgJiBBY2Nlc3NUb2tlbjtcclxuXHJcbmNvbnN0IGFjY2Vzc1Rva2VuU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICB0b2tlbjoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgIH0sXHJcbiAgICBnb2xmRGl2aXNpb246IHtcclxuICAgICAgICB0eXBlOiBHb2xmRGl2aXNpb24sXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH1cclxufSwgeyB0aW1lc3RhbXBzOiB7IGNyZWF0ZWRBdDogXCJjcmVhdGVkQXRcIiwgdXBkYXRlZEF0OiBcInVwZGF0ZWRBdFwiIH0gfSk7XHJcblxyXG5leHBvcnQgY29uc3QgQWNjZXNzVG9rZW5TY2hlbWEgPSBtb25nb29zZS5tb2RlbDxBY2Nlc3NUb2tlbk1vZGVsPihcIkFjY2Vzc1Rva2VuXCIsIGFjY2Vzc1Rva2VuU2NoZW1hKTtcclxuIl19