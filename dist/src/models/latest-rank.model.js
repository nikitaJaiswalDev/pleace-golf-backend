"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestRank = exports.LatestRankSchema = void 0;
const mongoose = require("mongoose");
const latestRankSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    nationality: {
        type: String,
    },
    position: {
        type: Number,
    },
    totalPoints: {
        type: Number,
    },
    division: {
        type: String
    },
    rounds: {
        type: Number
    }
});
exports.LatestRankSchema = mongoose.model("latestrank", latestRankSchema);
class LatestRank {
}
exports.LatestRank = LatestRank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0ZXN0LXJhbmsubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2xhdGVzdC1yYW5rLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFxQztBQUdyQyxNQUFNLGdCQUFnQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNwQyxHQUFHLEVBQUUsTUFBTTtRQUNYLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07S0FDZjtDQUNKLENBQUMsQ0FBQztBQUVVLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBa0IsWUFBWSxFQUFDLGdCQUFnQixDQUFDLENBQUM7QUFHL0YsTUFBYSxVQUFVO0NBUXRCO0FBUkQsZ0NBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmV4cG9ydCB0eXBlIExhdGVzdFJhbmtNb2RlbCA9IG1vbmdvb3NlLkRvY3VtZW50ICYgTGF0ZXN0UmFuaztcclxuXHJcbmNvbnN0IGxhdGVzdFJhbmtTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIHVzZXI6IHtcclxuICAgICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgcmVmOiAnVXNlcicsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBmaXJzdE5hbWU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgbGFzdE5hbWU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgbmF0aW9uYWxpdHk6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgcG9zaXRpb246IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB9LFxyXG4gICAgdG90YWxQb2ludHM6IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICB9LFxyXG4gICAgZGl2aXNpb246IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICByb3VuZHM6IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXJcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgTGF0ZXN0UmFua1NjaGVtYSA9IG1vbmdvb3NlLm1vZGVsPExhdGVzdFJhbmtNb2RlbD4oXCJsYXRlc3RyYW5rXCIsbGF0ZXN0UmFua1NjaGVtYSk7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExhdGVzdFJhbmsge1xyXG4gICAgX2lkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0b3RhbFBvaW50czogbnVtYmVyO1xyXG4gICAgcG9zaXRpb24gOiBudW1iZXI7XHJcbiAgICBjb3VudHJ5Q29kZSA6IHN0cmluZztcclxuICAgIGRpdmlzaW9uOnN0cmluZztcclxuICAgIHJvdW5kcyA6IG51bWJlcjtcclxufSJdfQ==