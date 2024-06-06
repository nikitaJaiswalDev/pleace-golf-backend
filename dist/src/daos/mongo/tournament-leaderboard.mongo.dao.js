"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentLeaderboardMongoDAO = void 0;
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const tournament_leaderboard_model_1 = require("../../models/tournament-leaderboard.model");
const user_1 = require("../../types/user");
class TournamentLeaderboardMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(tournament_leaderboard_model_1.TournamentLeaderboardSchema);
    }
    updateLeaderboard(userID, tournamentID, courseID, total, holes, round, currentRound, currentRoundTotal, currentRoundHoles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.findOneAndUpdate({
                    user: user_1.User.fromId(userID),
                    tournamentId: tournamentID,
                    courseId: courseID,
                }, {
                    $set: {
                        total: total,
                        holes: holes,
                        round: round,
                        currentRound: currentRound,
                        currentRoundTotal: currentRoundTotal,
                        currentRoundHoles: currentRoundHoles,
                    }
                }, {
                    new: true
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update tournament leaderboard ${tournamentID}:${courseID}. Error: ${error}`);
                throw error;
            }
        });
    }
    getLeaderboard(tournamentID, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_leaderboard_model_1.TournamentLeaderboardSchema.find({
                    tournamentId: tournamentID
                    /* ,division: division */
                }).sort('-total').populate("user", ["firstName", "lastName", "nationality", "gender"])
                    .populate({ path: "courseId", populate: { path: 'clubId', model: 'GolfClub' } }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get tournament leaderboard ${tournamentID}:${division}. Error: ${error}`);
                throw error;
            }
        });
    }
    getLeaderboardForResults(tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_leaderboard_model_1.TournamentLeaderboardSchema.find({
                    tournamentId: tournamentID,
                    holes: { $gte: 1 }
                }).populate("user", ["firstName", "lastName", "nationality", "gender"])
                    .populate({ path: "courseId", populate: { path: 'clubId', model: 'GolfClub' } }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get tournament leaderboard ${tournamentID} Error: ${error}`);
                throw error;
            }
        });
    }
    update(tournamentLeaderboard) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    updateAny(tournamentLeaderboard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.findOneAndUpdate({
                    _id: tournamentLeaderboard._id,
                    user: tournamentLeaderboard.user
                }, {
                    $set: tournamentLeaderboard
                }, {
                    new: true
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update any tournament leaderboard ${tournamentLeaderboard._id}. Error: ${error}`);
                throw error;
            }
        });
    }
}
exports.TournamentLeaderboardMongoDAO = TournamentLeaderboardMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1sZWFkZXJib2FyZC5tb25nby5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGFvcy9tb25nby90b3VybmFtZW50LWxlYWRlcmJvYXJkLm1vbmdvLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsOERBQTBEO0FBRzFELDRGQUF3RjtBQUV4RiwyQ0FBd0M7QUFFeEMsTUFBYSw2QkFBOEIsU0FBUSxvQkFBK0I7SUFFOUU7UUFDSSxLQUFLLENBQUMsMERBQTJCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRVksaUJBQWlCLENBQUMsTUFBYyxFQUFFLFlBQW9CLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsS0FBYSxFQUFFLEtBQWEsRUFDbEgsWUFBbUIsRUFBQyxpQkFBd0IsRUFBQyxpQkFBd0I7O1lBQ2pGLElBQUksQ0FBQztnQkFDRCxPQUFPLE1BQU0sMERBQTJCLENBQUMsZ0JBQWdCLENBQ3JEO29CQUNJLElBQUksRUFBRSxXQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDekIsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLFFBQVEsRUFBRSxRQUFRO2lCQUNyQixFQUNEO29CQUNJLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsS0FBSzt3QkFDWixLQUFLLEVBQUUsS0FBSzt3QkFDWixLQUFLLEVBQUUsS0FBSzt3QkFDWixZQUFZLEVBQUcsWUFBWTt3QkFDM0IsaUJBQWlCLEVBQUcsaUJBQWlCO3dCQUNyQyxpQkFBaUIsRUFBRyxpQkFBaUI7cUJBQ3hDO2lCQUNKLEVBQ0Q7b0JBQ0ksR0FBRyxFQUFFLElBQUk7aUJBQ1osQ0FDSixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLFlBQVksSUFBSSxRQUFRLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckcsTUFBTSxLQUFLLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUdZLGNBQWMsQ0FBQyxZQUFvQixFQUFFLFFBQXVCOztZQUNyRSxJQUFJLENBQUM7Z0JBQ0QsT0FBTywwREFBMkIsQ0FBQyxJQUFJLENBQ25DO29CQUNJLFlBQVksRUFBRSxZQUFZO29CQUMxQix5QkFBeUI7aUJBQzVCLENBQ0osQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNuRixRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixnQkFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsWUFBWSxJQUFJLFFBQVEsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVksd0JBQXdCLENBQUMsWUFBb0I7O1lBQ3RELElBQUksQ0FBQztnQkFDRCxPQUFPLDBEQUEyQixDQUFDLElBQUksQ0FDbkM7b0JBQ0ksWUFBWSxFQUFFLFlBQVk7b0JBQzFCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRyxDQUFDLEVBQUM7aUJBQ3BCLENBQ0osQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3BFLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xGLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxZQUFZLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckYsTUFBTSxLQUFLLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBQyxxQkFBNEM7O1lBQzVELE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxNQUFNLENBQUMsVUFBa0IsRUFBRSxLQUFhOztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRVksU0FBUyxDQUFDLHFCQUE0Qzs7WUFDL0QsSUFBSSxDQUFDO2dCQUVELE9BQU8sTUFBTSwwREFBMkIsQ0FBQyxnQkFBZ0IsQ0FDckQ7b0JBQ0ksR0FBRyxFQUFFLHFCQUFxQixDQUFDLEdBQUc7b0JBQzlCLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJO2lCQUNuQyxFQUNEO29CQUNJLElBQUksRUFBRSxxQkFBcUI7aUJBQzlCLEVBQ0Q7b0JBQ0ksR0FBRyxFQUFFLElBQUk7aUJBQ1osQ0FDSixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsK0NBQStDLHFCQUFxQixDQUFDLEdBQUcsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRyxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUEvRkQsc0VBK0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBNb25nb0RBTyB9IGZyb20gXCIuLi8uLi9jb3JlL2Rhby9tb25nby9tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudExlYWRlcmJvYXJkIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmRcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudExlYWRlcmJvYXJkREFPIH0gZnJvbSBcIi4uL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmQuZGFvLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmQubW9kZWxcIjtcclxuaW1wb3J0IHsgR29sZkRpdmlzaW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2dvbGYtZGl2aXNpb24uZW51bVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3VzZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50TGVhZGVyYm9hcmRNb25nb0RBTyBleHRlbmRzIE1vbmdvREFPPFRvdXJuYW1lbnRMZWFkZXJib2FyZD4gaW1wbGVtZW50cyBUb3VybmFtZW50TGVhZGVyYm9hcmREQU8ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFRvdXJuYW1lbnRMZWFkZXJib2FyZFNjaGVtYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZUxlYWRlcmJvYXJkKHVzZXJJRDogc3RyaW5nLCB0b3VybmFtZW50SUQ6IHN0cmluZywgY291cnNlSUQ6IHN0cmluZywgdG90YWw6IG51bWJlciwgaG9sZXM6IG51bWJlciwgcm91bmQ6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um91bmQ6bnVtYmVyLGN1cnJlbnRSb3VuZFRvdGFsOm51bWJlcixjdXJyZW50Um91bmRIb2xlczpudW1iZXIpOiBQcm9taXNlPFRvdXJuYW1lbnRMZWFkZXJib2FyZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZmluZE9uZUFuZFVwZGF0ZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBVc2VyLmZyb21JZCh1c2VySUQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudElELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzOiBob2xlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmQ6IHJvdW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um91bmQgOiBjdXJyZW50Um91bmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3VuZFRvdGFsIDogY3VycmVudFJvdW5kVG90YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3VuZEhvbGVzIDogY3VycmVudFJvdW5kSG9sZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgdXBkYXRlIHRvdXJuYW1lbnQgbGVhZGVyYm9hcmQgJHt0b3VybmFtZW50SUR9OiR7Y291cnNlSUR9LiBFcnJvcjogJHtlcnJvcn1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0TGVhZGVyYm9hcmQodG91cm5hbWVudElEOiBzdHJpbmcsIGRpdmlzaW9uPzogR29sZkRpdmlzaW9uKTogUHJvbWlzZTxUb3VybmFtZW50TGVhZGVyYm9hcmRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRJRFxyXG4gICAgICAgICAgICAgICAgICAgIC8qICxkaXZpc2lvbjogZGl2aXNpb24gKi9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5zb3J0KCctdG90YWwnKS5wb3B1bGF0ZShcInVzZXJcIiwgW1wiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIiwgXCJuYXRpb25hbGl0eVwiLFwiZ2VuZGVyXCJdKVxyXG4gICAgICAgICAgICAucG9wdWxhdGUoe3BhdGg6XCJjb3Vyc2VJZFwiLHBvcHVsYXRlOntwYXRoOidjbHViSWQnLG1vZGVsOidHb2xmQ2x1Yid9fSkuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgQ291bGQgbm90IGdldCB0b3VybmFtZW50IGxlYWRlcmJvYXJkICR7dG91cm5hbWVudElEfToke2RpdmlzaW9ufS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0TGVhZGVyYm9hcmRGb3JSZXN1bHRzKHRvdXJuYW1lbnRJRDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50TGVhZGVyYm9hcmRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRJRCxcclxuICAgICAgICAgICAgICAgICAgICBob2xlczogeyRndGUgOiAxfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLnBvcHVsYXRlKFwidXNlclwiLCBbXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiLCBcIm5hdGlvbmFsaXR5XCIsXCJnZW5kZXJcIl0pXHJcbiAgICAgICAgICAgIC5wb3B1bGF0ZSh7cGF0aDpcImNvdXJzZUlkXCIscG9wdWxhdGU6e3BhdGg6J2NsdWJJZCcsbW9kZWw6J0dvbGZDbHViJ319KS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgZ2V0IHRvdXJuYW1lbnQgbGVhZGVyYm9hcmQgJHt0b3VybmFtZW50SUR9IEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZSh0b3VybmFtZW50TGVhZGVyYm9hcmQ6IFRvdXJuYW1lbnRMZWFkZXJib2FyZCk6IFByb21pc2U8VG91cm5hbWVudExlYWRlcmJvYXJkPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VhcmNoKGlucHV0UXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlcik6IFByb21pc2U8VG91cm5hbWVudExlYWRlcmJvYXJkW10+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVBbnkodG91cm5hbWVudExlYWRlcmJvYXJkOiBUb3VybmFtZW50TGVhZGVyYm9hcmQpOiBQcm9taXNlPFRvdXJuYW1lbnRMZWFkZXJib2FyZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgVG91cm5hbWVudExlYWRlcmJvYXJkU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB0b3VybmFtZW50TGVhZGVyYm9hcmQuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZXQ6IHRvdXJuYW1lbnRMZWFkZXJib2FyZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgdXBkYXRlIGFueSB0b3VybmFtZW50IGxlYWRlcmJvYXJkICR7dG91cm5hbWVudExlYWRlcmJvYXJkLl9pZH0uIEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==