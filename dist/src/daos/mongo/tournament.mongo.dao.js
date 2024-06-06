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
exports.TournamentMongoDAO = void 0;
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const tournament_model_1 = require("../../models/tournament.model");
const moment = require("moment");
class TournamentMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(tournament_model_1.TournamentSchema);
    }
    getTournament(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_model_1.TournamentSchema
                    .findById(tournamentId)
                    .populate("courses.course", ["name", "tees"])
                    .populate("hostingClub", ["_id", "name"])
                    .exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not get tournament ${tournamentId}. Error: ${error}`);
                throw error;
            }
        });
    }
    getAvailableTournaments() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = moment.utc().toDate();
            try {
                let tournaments = yield tournament_model_1.TournamentSchema
                    .find( /* {
                    regStartDate: {
                        $lte: now
                    },
                    endDate: {
                        $gte: now
                    }
                } */).sort('startDate')
                    .populate("courses.course", ["name", "tees.name", "tees.gender", "clubId"])
                    .exec();
                //console.log('tournament ::',tournaments);
                /* for(let i=0;i<tournaments.length; i++) {
                    let tour = tournaments[i];
                    for(let j=0;j<tour.courses.length;j++) {
                        let course = tour.courses[j].course;
                        let clubDetails:any = await GolfClubSchema.findById(course.clubId).exec();
                        course['clubName'] = clubDetails?.name;
                    }
                } */
                return tournaments;
            }
            catch (error) {
                logging_1.Logger.error(`Could not get all available tournaments. Error: ${error}`);
                throw error;
            }
        });
    }
    markTournamentAsProcessed(tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tournament_model_1.TournamentSchema.findByIdAndUpdate(tournamentID, {
                    $set: {
                        isResultProcessed: true
                    }
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not mark tournament=${tournamentID} as processed. Error: ${error}`);
                throw error;
            }
        });
    }
    update(tournament) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return tournament_model_1.TournamentSchema.findByIdAndUpdate(tournament._id, {
                    $set: tournament
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update tournament=${tournament._id}. Error: ${error}`);
                throw error;
            }
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.TournamentMongoDAO = TournamentMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC5tb25nby5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGFvcy9tb25nby90b3VybmFtZW50Lm1vbmdvLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsOERBQTBEO0FBRzFELG9FQUFpRTtBQUNqRSxpQ0FBaUM7QUFJakMsTUFBYSxrQkFBbUIsU0FBUSxvQkFBb0I7SUFFeEQ7UUFDSSxLQUFLLENBQUMsbUNBQWdCLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVksYUFBYSxDQUFDLFlBQW9COztZQUMzQyxJQUFJLENBQUM7Z0JBQ0QsT0FBTyxtQ0FBZ0I7cUJBQ2xCLFFBQVEsQ0FBQyxZQUFZLENBQUM7cUJBQ3RCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDNUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDeEMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLFlBQVksWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVksdUJBQXVCOztZQUNoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDO2dCQUNELElBQUksV0FBVyxHQUFHLE1BQU0sbUNBQWdCO3FCQUNuQyxJQUFJLEVBQUM7Ozs7Ozs7b0JBT0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7cUJBQ3RCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUN6RSxJQUFJLEVBQUUsQ0FBQztnQkFDUiwyQ0FBMkM7Z0JBQzNDOzs7Ozs7O29CQU9JO2dCQUNKLE9BQU8sV0FBVyxDQUFDO1lBQzNCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVkseUJBQXlCLENBQUMsWUFBb0I7O1lBQ3ZELElBQUksQ0FBQztnQkFFRCxNQUFNLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFDakQ7b0JBQ0ksSUFBSSxFQUFFO3dCQUNGLGlCQUFpQixFQUFFLElBQUk7cUJBQzFCO2lCQUNKLENBQ0osQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixZQUFZLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RixNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBR1ksTUFBTSxDQUFDLFVBQXNCOztZQUN0QyxJQUFJLENBQUM7Z0JBQ0QsT0FBTyxtQ0FBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUNwRDtvQkFDSSxJQUFJLEVBQUUsVUFBVTtpQkFDbkIsQ0FDSixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDL0UsTUFBTSxLQUFLLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBQyxVQUFrQixFQUFFLEtBQWE7O1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7Q0FFSjtBQW5GRCxnREFtRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IE1vbmdvREFPIH0gZnJvbSBcIi4uLy4uL2NvcmUvZGFvL21vbmdvL21vbmdvLmRhb1wiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSBcIi4uLy4uL3R5cGVzL3RvdXJuYW1lbnRcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudERBTyB9IGZyb20gXCIuLi90b3VybmFtZW50LmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFNjaGVtYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdG91cm5hbWVudC5tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViU2NoZW1hIH0gZnJvbSBcIi4uLy4uL21vZGVscy9nb2xmLWNsdWIubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50TW9uZ29EQU8gZXh0ZW5kcyBNb25nb0RBTzxUb3VybmFtZW50PiBpbXBsZW1lbnRzIFRvdXJuYW1lbnREQU8ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFRvdXJuYW1lbnRTY2hlbWEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRUb3VybmFtZW50KHRvdXJuYW1lbnRJZDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIFRvdXJuYW1lbnRTY2hlbWFcclxuICAgICAgICAgICAgICAgIC5maW5kQnlJZCh0b3VybmFtZW50SWQpXHJcbiAgICAgICAgICAgICAgICAucG9wdWxhdGUoXCJjb3Vyc2VzLmNvdXJzZVwiLCBbXCJuYW1lXCIsIFwidGVlc1wiXSlcclxuICAgICAgICAgICAgICAgIC5wb3B1bGF0ZShcImhvc3RpbmdDbHViXCIsIFtcIl9pZFwiLCBcIm5hbWVcIl0pXHJcbiAgICAgICAgICAgICAgICAuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgQ291bGQgbm90IGdldCB0b3VybmFtZW50ICR7dG91cm5hbWVudElkfS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QXZhaWxhYmxlVG91cm5hbWVudHMoKTogUHJvbWlzZTxUb3VybmFtZW50W10+IHtcclxuICAgICAgICBjb25zdCBub3cgPSBtb21lbnQudXRjKCkudG9EYXRlKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHRvdXJuYW1lbnRzID0gYXdhaXQgVG91cm5hbWVudFNjaGVtYVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoLyoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ1N0YXJ0RGF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbHRlOiBub3dcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGd0ZTogbm93XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAqLykuc29ydCgnc3RhcnREYXRlJylcclxuICAgICAgICAgICAgICAgIC5wb3B1bGF0ZShcImNvdXJzZXMuY291cnNlXCIsIFtcIm5hbWVcIiwgXCJ0ZWVzLm5hbWVcIiwgXCJ0ZWVzLmdlbmRlclwiLFwiY2x1YklkXCJdKVxyXG4gICAgICAgICAgICAgICAgLmV4ZWMoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RvdXJuYW1lbnQgOjonLHRvdXJuYW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIC8qIGZvcihsZXQgaT0wO2k8dG91cm5hbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG91ciA9IHRvdXJuYW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8dG91ci5jb3Vyc2VzLmxlbmd0aDtqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdXJzZSA9IHRvdXIuY291cnNlc1tqXS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbHViRGV0YWlsczphbnkgPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5maW5kQnlJZChjb3Vyc2UuY2x1YklkKS5leGVjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZVsnY2x1Yk5hbWUnXSA9IGNsdWJEZXRhaWxzPy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3VybmFtZW50cztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBnZXQgYWxsIGF2YWlsYWJsZSB0b3VybmFtZW50cy4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbWFya1RvdXJuYW1lbnRBc1Byb2Nlc3NlZCh0b3VybmFtZW50SUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50U2NoZW1hLmZpbmRCeUlkQW5kVXBkYXRlKHRvdXJuYW1lbnRJRCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVzdWx0UHJvY2Vzc2VkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBtYXJrIHRvdXJuYW1lbnQ9JHt0b3VybmFtZW50SUR9IGFzIHByb2Nlc3NlZC4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZSh0b3VybmFtZW50OiBUb3VybmFtZW50KTogUHJvbWlzZTxUb3VybmFtZW50PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIFRvdXJuYW1lbnRTY2hlbWEuZmluZEJ5SWRBbmRVcGRhdGUodG91cm5hbWVudC5faWQsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDogdG91cm5hbWVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCB1cGRhdGUgdG91cm5hbWVudD0ke3RvdXJuYW1lbnQuX2lkfS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VhcmNoKGlucHV0UXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlcik6IFByb21pc2U8VG91cm5hbWVudFtdPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19