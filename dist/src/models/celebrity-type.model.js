"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CelebrityTypeSchema = void 0;
const mongoose = require("mongoose");
const celebrityTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    }
});
exports.CelebrityTypeSchema = mongoose.model("celebritytype", celebrityTypeSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsZWJyaXR5LXR5cGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2NlbGVicml0eS10eXBlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUdyQyxNQUFNLG1CQUFtQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtJQUNuQyxJQUFJLEVBQUc7UUFDSCxJQUFJLEVBQUUsTUFBTTtLQUNmO0NBQ0osQ0FBQyxDQUFDO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFxQixlQUFlLEVBQUMsbUJBQW1CLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5leHBvcnQgdHlwZSBDZWxlYnJpdHlUeXBlTW9kZWwgPSBtb25nb29zZS5Eb2N1bWVudDtcclxuXHJcbmNvbnN0IGNlbGVicml0eVR5cGVTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIF9pZDogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgbmFtZSA6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICB9XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgQ2VsZWJyaXR5VHlwZVNjaGVtYSA9IG1vbmdvb3NlLm1vZGVsPENlbGVicml0eVR5cGVNb2RlbD4oXCJjZWxlYnJpdHl0eXBlXCIsY2VsZWJyaXR5VHlwZVNjaGVtYSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19