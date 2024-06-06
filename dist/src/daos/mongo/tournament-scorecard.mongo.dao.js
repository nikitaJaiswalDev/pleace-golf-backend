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
exports.TournamentScorecardMongoDAO = void 0;
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const tournament_scorecard_model_1 = require("../../models/tournament-scorecard.model");
class TournamentScorecardMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(tournament_scorecard_model_1.TournamentScorecardSchema);
    }
    getScorecard(userID, scorecardID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_scorecard_model_1.TournamentScorecardSchema
                    .findOne({
                    _id: scorecardID,
                    userId: userID
                })
                    .populate({
                    path: "course",
                    //match: {
                    //    "course.tees.name": "YELLOW",
                    //"course.tees.gender": gender
                    //},
                })
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all available tournaments. Error: ${error}`);
                throw error;
            }
        });
    }
    getAllRoundScorecard(userID, scorecardID, tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_scorecard_model_1.TournamentScorecardSchema
                    .find({
                    tournamentId: tournamentID,
                    userId: userID
                })
                    .populate({
                    path: "course",
                })
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all round scorecard. Error: ${error}`);
                throw error;
            }
        });
    }
    getPlayerScorecard(userID, tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_scorecard_model_1.TournamentScorecardSchema
                    .findOne({
                    tournamentId: tournamentId,
                    userId: userID
                })
                    .populate({
                    path: "course",
                    //match: {
                    //    "course.tees.name": "YELLOW",
                    //"course.tees.gender": gender
                    //},
                })
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all available tournaments. Error: ${error}`);
                throw error;
            }
        });
    }
    updateScores(userID, scorecardID, scores) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tournament_scorecard_model_1.TournamentScorecardSchema.findOneAndUpdate({
                    _id: scorecardID,
                    userId: userID
                }, {
                    $set: {
                        scores: scores
                    }
                }, {
                    new: true
                }).populate({
                    path: "course"
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update scores - tournament scorecard ${scorecardID}. Error: ${error}`);
                throw error;
            }
        });
    }
    update(tournamentScorecard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tournament_scorecard_model_1.TournamentScorecardSchema.findOneAndUpdate({
                    _id: tournamentScorecard._id,
                    userId: tournamentScorecard.userId
                }, {
                    $set: {
                        scores: tournamentScorecard.scores
                    }
                }, {
                    new: true
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update tournament scorecard ${tournamentScorecard._id}. Error: ${error}`);
                throw error;
            }
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    updateAny(tournamentScorecard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tournament_scorecard_model_1.TournamentScorecardSchema.findOneAndUpdate({
                    _id: tournamentScorecard._id,
                    userId: tournamentScorecard.userId
                }, {
                    $set: tournamentScorecard
                }, {
                    new: true
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update tournament scorecard ${tournamentScorecard._id}. Error: ${error}`);
                throw error;
            }
        });
    }
}
exports.TournamentScorecardMongoDAO = TournamentScorecardMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1zY29yZWNhcmQubW9uZ28uZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Rhb3MvbW9uZ28vdG91cm5hbWVudC1zY29yZWNhcmQubW9uZ28uZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw4REFBMEQ7QUFFMUQsd0ZBQW9GO0FBS3BGLE1BQWEsMkJBQTRCLFNBQVEsb0JBQTZCO0lBRTFFO1FBQ0ksS0FBSyxDQUFDLHNEQUF5QixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdZLFlBQVksQ0FBQyxNQUFjLEVBQUUsV0FBbUI7O1lBQ3pELElBQUksQ0FBQztnQkFDRCxPQUFPLHNEQUF5QjtxQkFDM0IsT0FBTyxDQUFDO29CQUNMLEdBQUcsRUFBRSxXQUFXO29CQUNoQixNQUFNLEVBQUUsTUFBTTtpQkFDakIsQ0FBQztxQkFDRCxRQUFRLENBQUM7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVTtvQkFDVixtQ0FBbUM7b0JBQy9CLDhCQUE4QjtvQkFDbEMsSUFBSTtpQkFDUCxDQUFDO3FCQUNELElBQUksRUFBRSxDQUFDO1lBQ2hCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBR1ksb0JBQW9CLENBQUMsTUFBYyxFQUFFLFdBQW1CLEVBQUMsWUFBb0I7O1lBQ3RGLElBQUksQ0FBQztnQkFDRCxPQUFPLHNEQUF5QjtxQkFDM0IsSUFBSSxDQUFDO29CQUNGLFlBQVksRUFBRSxZQUFZO29CQUMxQixNQUFNLEVBQUUsTUFBTTtpQkFDakIsQ0FBQztxQkFDRCxRQUFRLENBQUM7b0JBQ04sSUFBSSxFQUFFLFFBQVE7aUJBQ2pCLENBQUM7cUJBQ0Qs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S0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLG1CQUFtQixDQUFDLEdBQUcsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBR0o7QUE1SUQsa0VBNElDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBNb25nb0RBTyB9IGZyb20gXCIuLi8uLi9jb3JlL2Rhby9tb25nby9tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFNjb3JlY2FyZCB9IGZyb20gXCIuLi8uLi90eXBlcy90b3VybmFtZW50LXNjb3JlY2FyZFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hIH0gZnJvbSBcIi4uLy4uL21vZGVscy90b3VybmFtZW50LXNjb3JlY2FyZC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi8uLi90eXBlcy9zY29yZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkREFPIH0gZnJvbSBcIi4uL3RvdXJuYW1lbnQtc2NvcmVjYXJkLmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgR2VuZGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2dlbmRlci5lbnVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudFNjb3JlY2FyZE1vbmdvREFPIGV4dGVuZHMgTW9uZ29EQU88VG91cm5hbWVudFNjb3JlY2FyZD4gaW1wbGVtZW50cyBUb3VybmFtZW50U2NvcmVjYXJkREFPIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRTY29yZWNhcmQodXNlcklEOiBzdHJpbmcsIHNjb3JlY2FyZElEOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYVxyXG4gICAgICAgICAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogc2NvcmVjYXJkSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySURcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAucG9wdWxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwiY291cnNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXRjaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFwiY291cnNlLnRlZXMubmFtZVwiOiBcIllFTExPV1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1wiY291cnNlLnRlZXMuZ2VuZGVyXCI6IGdlbmRlclxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgQ291bGQgbm90IGdldCBhbGwgYXZhaWxhYmxlIHRvdXJuYW1lbnRzLiBFcnJvcjogJHtlcnJvcn1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEFsbFJvdW5kU2NvcmVjYXJkKHVzZXJJRDogc3RyaW5nLCBzY29yZWNhcmRJRDogc3RyaW5nLHRvdXJuYW1lbnRJRDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkW10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudElELFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklEXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcImNvdXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgZ2V0IGFsbCByb3VuZCBzY29yZWNhcmQuIEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFBsYXllclNjb3JlY2FyZCh1c2VySUQ6IHN0cmluZywgdG91cm5hbWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYVxyXG4gICAgICAgICAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklEXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcImNvdXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWF0Y2g6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcImNvdXJzZS50ZWVzLm5hbWVcIjogXCJZRUxMT1dcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cImNvdXJzZS50ZWVzLmdlbmRlclwiOiBnZW5kZXJcclxuICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBnZXQgYWxsIGF2YWlsYWJsZSB0b3VybmFtZW50cy4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlU2NvcmVzKHVzZXJJRDogc3RyaW5nLCBzY29yZWNhcmRJRDogc3RyaW5nLCBzY29yZXM6IFNjb3JlW10pOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYS5maW5kT25lQW5kVXBkYXRlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogc2NvcmVjYXJkSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZXM6IHNjb3Jlc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkucG9wdWxhdGUoe1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJjb3Vyc2VcIlxyXG4gICAgICAgICAgICB9KS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgdXBkYXRlIHNjb3JlcyAtIHRvdXJuYW1lbnQgc2NvcmVjYXJkICR7c2NvcmVjYXJkSUR9LiBFcnJvcjogJHtlcnJvcn1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKHRvdXJuYW1lbnRTY29yZWNhcmQ6IFRvdXJuYW1lbnRTY29yZWNhcmQpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYS5maW5kT25lQW5kVXBkYXRlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogdG91cm5hbWVudFNjb3JlY2FyZC5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0b3VybmFtZW50U2NvcmVjYXJkLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlczogdG91cm5hbWVudFNjb3JlY2FyZC5zY29yZXNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCB1cGRhdGUgdG91cm5hbWVudCBzY29yZWNhcmQgJHt0b3VybmFtZW50U2NvcmVjYXJkLl9pZH0uIEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlYXJjaChpbnB1dFF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmRbXT4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZUFueSh0b3VybmFtZW50U2NvcmVjYXJkOiBUb3VybmFtZW50U2NvcmVjYXJkKTogUHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB0b3VybmFtZW50U2NvcmVjYXJkLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRvdXJuYW1lbnRTY29yZWNhcmQudXNlcklkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZXQ6IHRvdXJuYW1lbnRTY29yZWNhcmRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgQ291bGQgbm90IHVwZGF0ZSB0b3VybmFtZW50IHNjb3JlY2FyZCAke3RvdXJuYW1lbnRTY29yZWNhcmQuX2lkfS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxufVxyXG4iXX0=