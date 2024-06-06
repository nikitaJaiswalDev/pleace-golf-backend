"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Champion = exports.ChampionSchema = void 0;
const mongoose = require("mongoose");
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
exports.ChampionSchema = mongoose.model("champion", championSchema);
class Champion {
}
exports.Champion = Champion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbXBpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9jaGFtcGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBR3JDLE1BQU0sY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxPQUFPO0tBQ2hCO0NBQ0osQ0FBQyxDQUFDO0FBRVUsUUFBQSxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBZ0IsVUFBVSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXZGLE1BQWEsUUFBUTtDQVFwQjtBQVJELDRCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmV4cG9ydCB0eXBlIENoYW1waW9uTW9kZWwgPSBtb25nb29zZS5Eb2N1bWVudCAmIENoYW1waW9uO1xyXG5cclxuY29uc3QgY2hhbXBpb25TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIGNvdW50cnk6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgc3RhdGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgZGl2aXNpb246IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgIH0sXHJcbiAgICBlbWFpbDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgIH0sXHJcbiAgICBwZXJtaXRGb3JJbnZpdGU6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGFtcGlvblNjaGVtYSA9IG1vbmdvb3NlLm1vZGVsPENoYW1waW9uTW9kZWw+KFwiY2hhbXBpb25cIixjaGFtcGlvblNjaGVtYSk7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbXBpb24ge1xyXG4gICAgX2lkOiBzdHJpbmc7XHJcbiAgICBjb3VudHJ5OiBzdHJpbmc7XHJcbiAgICBzdGF0ZTogc3RyaW5nO1xyXG4gICAgZGl2aXNpb246IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGVtYWlsIDogc3RyaW5nO1xyXG4gICAgcGVybWl0Rm9ySW52aXRlIDogYm9vbGVhbjtcclxufSJdfQ==