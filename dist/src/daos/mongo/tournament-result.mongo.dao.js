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
exports.TournamentResultMongoDAO = void 0;
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const tournament_result_model_1 = require("../../models/tournament-result.model");
const tournament_1 = require("../../types/tournament");
class TournamentResultMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(tournament_result_model_1.TournamentResultSchema);
    }
    getRanking(countryCodes, division) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info(countryCodes);
            try {
                return tournament_result_model_1.TournamentResultSchema.aggregate([
                    {
                        "$lookup": {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        "$match": {
                            "user.countryOfResidence": {
                                "$in": countryCodes
                            },
                            "division": { $regex: division, $options: "i" }
                        }
                    },
                    {
                        "$group": {
                            "_id": {
                                "userId": "$user._id",
                            },
                            "roundTotal": { "$sum": "$total" },
                            "points": { "$sum": "$points" },
                            "bonusPoints": { "$sum": "$bonusPoints" },
                            "totalPoints": { "$sum": { '$add': ['$points', '$bonusPoints'] } },
                            "resultCount": { "$sum": 1 },
                            "rounds": { "$sum": 1 },
                            "user": {
                                "$first": "$user"
                            }
                        }
                    },
                    {
                        "$sort": {
                            "roundTotal": -1
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "roundTotal": 1,
                            "totalPoints": { $round: ["$totalPoints", 1] },
                            "points": 1,
                            "bonusPoints": 1,
                            "rounds": 1,
                            "user": {
                                $arrayElemAt: [
                                    '$user',
                                    0
                                ]
                            }
                        }
                    },
                    {
                        "$project": {
                            "totalPoints": "$totalPoints",
                            "roundTotal": "$roundTotal",
                            "rounds": "$rounds",
                            "user": {
                                "_id": "$user._id",
                                "nationality": "$user.nationality",
                                "firstName": "$user.firstName",
                                "lastName": "$user.lastName"
                            }
                        }
                    }
                ]).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get ranking data. Error: ${error}`);
                throw error;
            }
        });
    }
    getTournamentResults(tournamentId, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_result_model_1.TournamentResultSchema
                    .find({
                    tournament: tournament_1.Tournament.fromId(tournamentId)
                    /* , division: division */
                })
                    .sort({
                    total: -1
                })
                    .populate("user", ["firstName", "lastName", "nationality", "homeClub"])
                    .populate("tournament", ["name", "startDate", "endDate"])
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all tournament results. Error: ${error}`);
                throw error;
            }
        });
    }
    getAllTournamentResults(division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_result_model_1.TournamentResultSchema
                    .find({
                    division: division
                })
                    .populate("user", ["firstName", "lastName", "nationality", "homeClub"])
                    .populate("tournament", ["name", "startDate", "endDate"])
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all tournament results. Error: ${error}`);
                throw error;
            }
        });
    }
    update(tournamentResult) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.TournamentResultMongoDAO = TournamentResultMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1yZXN1bHQubW9uZ28uZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Rhb3MvbW9uZ28vdG91cm5hbWVudC1yZXN1bHQubW9uZ28uZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw4REFBMEQ7QUFHMUQsa0ZBQThFO0FBRzlFLHVEQUFvRDtBQUVwRCxNQUFhLHdCQUF5QixTQUFRLG9CQUEwQjtJQUVwRTtRQUNJLEtBQUssQ0FBQyxnREFBc0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFWSxVQUFVLENBQUMsWUFBc0IsRUFBRSxRQUFzQjs7WUFDbEUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDO2dCQUNELE9BQU8sZ0RBQXNCLENBQUMsU0FBUyxDQUFDO29CQUNwQzt3QkFDSSxTQUFTLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLE9BQU87NEJBQ2IsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFlBQVksRUFBRSxLQUFLOzRCQUNuQixFQUFFLEVBQUUsTUFBTTt5QkFDYjtxQkFDSjtvQkFDRDt3QkFDSSxRQUFRLEVBQUU7NEJBQ04seUJBQXlCLEVBQUU7Z0NBQ3ZCLEtBQUssRUFBRSxZQUFZOzZCQUN0Qjs0QkFDRCxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7eUJBQ2hEO3FCQUNKO29CQUNEO3dCQUNJLFFBQVEsRUFBRTs0QkFDTixLQUFLLEVBQUU7Z0NBQ0gsUUFBUSxFQUFFLFdBQVc7NkJBQ3hCOzRCQUNELFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7NEJBQ2xDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7NEJBQy9CLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUU7NEJBQ3pDLGFBQWEsRUFB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QkFDdEUsTUFBTSxLQUFLLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBQyxnQkFBa0M7O1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxNQUFNLENBQUMsVUFBa0IsRUFBRSxLQUFhOztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBRUo7QUE3SEQsNERBNkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBNb25nb0RBTyB9IGZyb20gXCIuLi8uLi9jb3JlL2Rhby9tb25nby9tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdCB9IGZyb20gXCIuLi8uLi90eXBlcy90b3VybmFtZW50LXJlc3VsdFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50UmVzdWx0REFPIH0gZnJvbSBcIi4uL3RvdXJuYW1lbnQtcmVzdWx0LmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdFNjaGVtYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG91cm5hbWVudC1yZXN1bHQubW9kZWxcIjtcclxuaW1wb3J0IHsgR29sZkRpdmlzaW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2dvbGYtZGl2aXNpb24uZW51bVwiO1xyXG5pbXBvcnQgeyBSYW5raW5nIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3JhbmtpbmdcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudCB9IGZyb20gXCIuLi8uLi90eXBlcy90b3VybmFtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudFJlc3VsdE1vbmdvREFPIGV4dGVuZHMgTW9uZ29EQU88VG91cm5hbWVudFJlc3VsdD4gaW1wbGVtZW50cyBUb3VybmFtZW50UmVzdWx0REFPIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihUb3VybmFtZW50UmVzdWx0U2NoZW1hKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0UmFua2luZyhjb3VudHJ5Q29kZXM6IHN0cmluZ1tdLCBkaXZpc2lvbjogR29sZkRpdmlzaW9uKTogUHJvbWlzZTxSYW5raW5nW10+IHtcclxuICAgICAgICBMb2dnZXIuaW5mbyhjb3VudHJ5Q29kZXMpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb3VybmFtZW50UmVzdWx0U2NoZW1hLmFnZ3JlZ2F0ZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCIkbG9va3VwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ3VzZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWVsZDogJ3VzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlaWduRmllbGQ6ICdfaWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhczogJ3VzZXInXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRtYXRjaFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlci5jb3VudHJ5T2ZSZXNpZGVuY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkaW5cIjogY291bnRyeUNvZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2aXNpb25cIjogeyRyZWdleDogZGl2aXNpb24sICRvcHRpb25zOiBcImlcIn1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJGdyb3VwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogXCIkdXNlci5faWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3VuZFRvdGFsXCI6IHsgXCIkc3VtXCI6IFwiJHRvdGFsXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogeyBcIiRzdW1cIjogXCIkcG9pbnRzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib251c1BvaW50c1wiOiB7IFwiJHN1bVwiOiBcIiRib251c1BvaW50c1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxQb2ludHNcIjogeyBcIiRzdW1cIjogeyAnJGFkZCcgOiBbICckcG9pbnRzJywgJyRib251c1BvaW50cycgXSB9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXN1bHRDb3VudFwiOiB7IFwiJHN1bVwiOiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicm91bmRzXCI6IHsgXCIkc3VtXCI6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJGZpcnN0XCI6IFwiJHVzZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRzb3J0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3VuZFRvdGFsXCI6IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRwcm9qZWN0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3VuZFRvdGFsXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxQb2ludHNcIjogeyAkcm91bmQ6IFsgXCIkdG90YWxQb2ludHNcIiwgMSBdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9udXNQb2ludHNcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3VuZHNcIiA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYXJyYXlFbGVtQXQ6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHVzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCIkcHJvamVjdFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxQb2ludHNcIiA6IFwiJHRvdGFsUG9pbnRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicm91bmRUb3RhbFwiOiBcIiRyb3VuZFRvdGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicm91bmRzXCIgOiBcIiRyb3VuZHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiJHVzZXIuX2lkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGlvbmFsaXR5XCI6IFwiJHVzZXIubmF0aW9uYWxpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IFwiJHVzZXIuZmlyc3ROYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhc3ROYW1lXCI6IFwiJHVzZXIubGFzdE5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgZ2V0IHJhbmtpbmcgZGF0YS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudFJlc3VsdHModG91cm5hbWVudElkOiBzdHJpbmcsIGRpdmlzaW9uOiBHb2xmRGl2aXNpb24pOiBQcm9taXNlPFRvdXJuYW1lbnRSZXN1bHRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb3VybmFtZW50UmVzdWx0U2NoZW1hXHJcbiAgICAgICAgICAgICAgICAuZmluZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudDogVG91cm5hbWVudC5mcm9tSWQodG91cm5hbWVudElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC8qICwgZGl2aXNpb246IGRpdmlzaW9uICovXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNvcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAtMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5wb3B1bGF0ZShcInVzZXJcIiwgW1wiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIiwgXCJuYXRpb25hbGl0eVwiLCBcImhvbWVDbHViXCJdKVxyXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKFwidG91cm5hbWVudFwiLCBbXCJuYW1lXCIsIFwic3RhcnREYXRlXCIsIFwiZW5kRGF0ZVwiXSlcclxuICAgICAgICAgICAgICAgIC5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgZ2V0IGFsbCB0b3VybmFtZW50IHJlc3VsdHMuIEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEFsbFRvdXJuYW1lbnRSZXN1bHRzKGRpdmlzaW9uOiBHb2xmRGl2aXNpb24pOiBQcm9taXNlPFRvdXJuYW1lbnRSZXN1bHRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb3VybmFtZW50UmVzdWx0U2NoZW1hXHJcbiAgICAgICAgICAgICAgICAuZmluZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aXNpb246IGRpdmlzaW9uXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKFwidXNlclwiLCBbXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiLCBcIm5hdGlvbmFsaXR5XCIsIFwiaG9tZUNsdWJcIl0pXHJcbiAgICAgICAgICAgICAgICAucG9wdWxhdGUoXCJ0b3VybmFtZW50XCIsIFtcIm5hbWVcIiwgXCJzdGFydERhdGVcIiwgXCJlbmREYXRlXCJdKVxyXG4gICAgICAgICAgICAgICAgLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBnZXQgYWxsIHRvdXJuYW1lbnQgcmVzdWx0cy4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKHRvdXJuYW1lbnRSZXN1bHQ6IFRvdXJuYW1lbnRSZXN1bHQpOiBQcm9taXNlPFRvdXJuYW1lbnRSZXN1bHQ+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZWFyY2goaW5wdXRRdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyKTogUHJvbWlzZTxUb3VybmFtZW50UmVzdWx0W10+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=