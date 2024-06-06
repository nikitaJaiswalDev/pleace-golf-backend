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
exports.RankingController = void 0;
const express_1 = require("express");
const error_handler_1 = require("../../handlers/error-handler");
const mapper_1 = require("../mapper");
const validator_1 = require("../../../core/validation/validator");
const ranking_request_1 = require("../dtos/request/ranking.request");
const individual_ranking_request_1 = require("../dtos/request/individual-ranking.request");
class RankingController {
    constructor(tournamentManagementService, userService) {
        this.tournamentManagementService = tournamentManagementService;
        this.userService = userService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        //this.router.use(passport.authenticate("jwt", { session: false }));
        this.router.get("/", ranking_request_1.RankingRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getRankings, this));
        this.router.get("/individual", individual_ranking_request_1.IndividualRankingRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getIndividualRanking, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /ranking/:
     *  get:
     *      description: Get ranking
     *      tags:
     *          - Ranking
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: countryCode
     *            type: array
     *            required: false
     *            in: query
     *            items:
     *                type: string
     *          - name: division
     *            type: string
     *            enum: [Champ, Celebrity, Professional Golfer]
     *            required: true
     *            in: query
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/RankingResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getRankings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryCodes = req.query.countryCode || [];
            const division = req.query.division;
            const rankings = yield this.tournamentManagementService.getRanking(countryCodes, division);
            console.log('rankings:::', rankings);
            let mappedRank = mapper_1.Mapper.mapRankings(rankings);
            //console.log('b mappedRank:::',mappedRank);
            const existingRank = yield this.tournamentManagementService.getStaticLatestRank(countryCodes, division);
            //console.log('existingRank:::',existingRank);
            let rankingResp = [];
            let userWithPoints = mappedRank.map(m => m.user);
            console.log('R >> userWithPoints', userWithPoints);
            existingRank.forEach((element) => {
                let totalPoints = element.totalPoints;
                let rounds = element.rounds;
                userWithPoints.push(element.user);
                //if new results exists with same user sum the points.
                if (element.user) {
                    let index = mappedRank.findIndex(o => o.user.toString() == element.user.toString());
                    if (index > -1) {
                        totalPoints = totalPoints + mappedRank[index].totalPoints;
                        rounds = rounds + mappedRank[index].rounds;
                        mappedRank.splice(index, 1);
                    }
                }
                let rank = {
                    user: element.user,
                    position: element.position,
                    name: element.firstName + " " + element.lastName,
                    totalPoints: totalPoints,
                    countryCode: element.nationality,
                    rounds: rounds
                };
                rankingResp.push(rank);
            });
            let userWithNoPoints = yield this.tournamentManagementService.getUsersWithNoPoints(countryCodes, division, userWithPoints);
            let userWithNoPointsResponse = [];
            userWithNoPoints.forEach((element) => {
                let rank = {
                    user: element._id,
                    position: -1,
                    name: element.firstName + " " + element.lastName,
                    totalPoints: 0,
                    countryCode: element.nationality,
                    rounds: 0
                };
                userWithNoPointsResponse.push(rank);
            });
            //console.log('a mappedRank:::',mappedRank);
            let absoluteResp = rankingResp.concat(mappedRank).concat(userWithNoPointsResponse).sort(function (a, b) {
                return b.totalPoints - a.totalPoints;
            });
            res.status(200).send(absoluteResp);
        });
    }
    /**
     * @swagger
     * /ranking/individual:
     *  get:
     *      description: Get individual ranking of user
     *      tags:
     *          - Ranking
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: countryCode
     *            type: array
     *            required: false
     *            in: query
     *            items:
     *                type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/IndividualRankingResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getIndividualRanking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.sub;
            const countryCodes = req.query.countryCode || [];
            const user = yield this.userService.getUserById(userId);
            const ranking = yield this.tournamentManagementService.getIndividualRanking(userId, countryCodes, user.division);
            res.status(200).send({ position: ranking });
        });
    }
}
exports.RankingController = RankingController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFua2luZy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy9yYW5raW5nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBR2pDLGdFQUEwRTtBQUMxRSxzQ0FBbUM7QUFDbkMsa0VBQThEO0FBSTlELHFFQUF1RTtBQUd2RSwyRkFBNEY7QUFFNUYsTUFBYSxpQkFBaUI7SUFLMUIsWUFBWSwyQkFBd0QsRUFBRSxXQUF3QjtRQUMxRixJQUFJLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUN2QixvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHNDQUFvQixFQUFFLG9CQUFRLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLDJEQUE4QixFQUFFLG9CQUFRLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxSSxDQUFDO0lBRU0sU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ1UsV0FBVyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7O1lBQ3BFLE1BQU0sWUFBWSxHQUFH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QXBKRCw4Q0FvSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvZXJyb3ItaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBNYXBwZXIgfSBmcm9tIFwiLi4vbWFwcGVyXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL3RvdXJuYW1lbnQtbWFuYWdlbWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJhbmtpbmdSZXNwb25zZSB9IGZyb20gXCIuLi9kdG9zL3Jlc3BvbnNlXCI7XHJcbmltcG9ydCB7IEdvbGZEaXZpc2lvbiB9IGZyb20gXCIuLi8uLi8uLi90eXBlcy9nb2xmLWRpdmlzaW9uLmVudW1cIjtcclxuaW1wb3J0IHsgUmFua2luZ1JlcXVlc3RTY2hlbWEgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L3JhbmtpbmcucmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSW5kaXZpZHVhbFJhbmtpbmdSZXNwb25zZSB9IGZyb20gXCIuLi9kdG9zL3Jlc3BvbnNlL2luZGl2aWR1YWwtcmFua2luZy5yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBJbmRpdmlkdWFsUmFua2luZ1JlcXVlc3RTY2hlbWEgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L2luZGl2aWR1YWwtcmFua2luZy5yZXF1ZXN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmFua2luZ0NvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2U6IFRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2U6IFRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZSwgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UgPSB0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvdXRlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IFJvdXRlcigpO1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIudXNlKHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvXCIsIFJhbmtpbmdSZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRSYW5raW5ncywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9pbmRpdmlkdWFsXCIsIEluZGl2aWR1YWxSYW5raW5nUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0SW5kaXZpZHVhbFJhbmtpbmcsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVyKCk6IFJvdXRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9yYW5raW5nLzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXQgcmFua2luZ1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBSYW5raW5nXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdW50cnlDb2RlXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICogICAgICAgICAgICBpbjogcXVlcnlcclxuICAgICAqICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogZGl2aXNpb25cclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIGVudW06IFtDaGFtcCwgQ2VsZWJyaXR5LCBQcm9mZXNzaW9uYWwgR29sZmVyXVxyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcXVlcnlcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9SYW5raW5nUmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFJhbmtpbmdzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgY291bnRyeUNvZGVzID0gcmVxLnF1ZXJ5LmNvdW50cnlDb2RlIGFzIHN0cmluZ1tdIHx8IFtdOyBcclxuICAgICAgICBjb25zdCBkaXZpc2lvbiA9IHJlcS5xdWVyeS5kaXZpc2lvbiBhcyBHb2xmRGl2aXNpb247IFxyXG4gICAgICAgIGNvbnN0IHJhbmtpbmdzID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0UmFua2luZyhjb3VudHJ5Q29kZXMsIGRpdmlzaW9uKTtcclxuICAgICAgICBjb25zb2xlLmxvZygncmFua2luZ3M6OjonLHJhbmtpbmdzKTtcclxuICAgICAgICBsZXQgbWFwcGVkUmFuayA9IE1hcHBlci5tYXBSYW5raW5ncyhyYW5raW5ncykgYXMgUmFua2luZ1Jlc3BvbnNlW107XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYiBtYXBwZWRSYW5rOjo6JyxtYXBwZWRSYW5rKTtcclxuICAgICAgICBjb25zdCBleGlzdGluZ1JhbmsgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRTdGF0aWNMYXRlc3RSYW5rKGNvdW50cnlDb2RlcywgZGl2aXNpb24pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2V4aXN0aW5nUmFuazo6OicsZXhpc3RpbmdSYW5rKTtcclxuICAgICAgICBsZXQgcmFua2luZ1Jlc3A6UmFua2luZ1Jlc3BvbnNlW10gPSBbXTtcclxuICAgICAgICBsZXQgdXNlcldpdGhQb2ludHMgPSBtYXBwZWRSYW5rLm1hcChtID0+IG0udXNlcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1IgPj4gdXNlcldpdGhQb2ludHMnLHVzZXJXaXRoUG9pbnRzKTtcclxuICAgICAgICBleGlzdGluZ1JhbmsuZm9yRWFjaCgoZWxlbWVudCk9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbFBvaW50cyA9IGVsZW1lbnQudG90YWxQb2ludHM7XHJcbiAgICAgICAgICAgIGxldCByb3VuZHMgPSBlbGVtZW50LnJvdW5kc1xyXG4gICAgICAgICAgICB1c2VyV2l0aFBvaW50cy5wdXNoKGVsZW1lbnQudXNlcik7XHJcbiAgICAgICAgICAgIC8vaWYgbmV3IHJlc3VsdHMgZXhpc3RzIHdpdGggc2FtZSB1c2VyIHN1bSB0aGUgcG9pbnRzLlxyXG4gICAgICAgICAgICBpZihlbGVtZW50LnVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG1hcHBlZFJhbmsuZmluZEluZGV4KG89PiBvLnVzZXIudG9TdHJpbmcoKSA9PSBlbGVtZW50LnVzZXIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQb2ludHMgPSB0b3RhbFBvaW50cyArIG1hcHBlZFJhbmtbaW5kZXhdLnRvdGFsUG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kcyA9IHJvdW5kcyArIG1hcHBlZFJhbmtbaW5kZXhdLnJvdW5kcztcclxuICAgICAgICAgICAgICAgICAgICBtYXBwZWRSYW5rLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHJhbms6UmFua2luZ1Jlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA6IGVsZW1lbnQudXNlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZWxlbWVudC5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBlbGVtZW50LmZpcnN0TmFtZSArIFwiIFwiICsgZWxlbWVudC5sYXN0TmFtZSxcclxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRzIDogdG90YWxQb2ludHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA6IGVsZW1lbnQubmF0aW9uYWxpdHksXHJcbiAgICAgICAgICAgICAgICByb3VuZHMgOiByb3VuZHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5raW5nUmVzcC5wdXNoKHJhbmspO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdXNlcldpdGhOb1BvaW50cyA9IGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmdldFVzZXJzV2l0aE5vUG9pbnRzKGNvdW50cnlDb2RlcywgZGl2aXNpb24sdXNlcldpdGhQb2ludHMpO1xyXG4gICAgICAgIGxldCB1c2VyV2l0aE5vUG9pbnRzUmVzcG9uc2UgPSBbXTtcclxuICAgICAgICB1c2VyV2l0aE5vUG9pbnRzLmZvckVhY2goKGVsZW1lbnQpPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmFuazpSYW5raW5nUmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyIDogZWxlbWVudC5faWQsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IC0xLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA6IGVsZW1lbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBlbGVtZW50Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludHMgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnRyeUNvZGUgOiBlbGVtZW50Lm5hdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgICAgcm91bmRzIDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVzZXJXaXRoTm9Qb2ludHNSZXNwb25zZS5wdXNoKHJhbmspO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYSBtYXBwZWRSYW5rOjo6JyxtYXBwZWRSYW5rKTtcclxuICAgICAgICBsZXQgYWJzb2x1dGVSZXNwID0gcmFua2luZ1Jlc3AuY29uY2F0KG1hcHBlZFJhbmspLmNvbmNhdCh1c2VyV2l0aE5vUG9pbnRzUmVzcG9uc2UpLnNvcnQoZnVuY3Rpb24oYSxiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiLnRvdGFsUG9pbnRzIC0gYS50b3RhbFBvaW50cztcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGFic29sdXRlUmVzcCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvcmFua2luZy9pbmRpdmlkdWFsOlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldCBpbmRpdmlkdWFsIHJhbmtpbmcgb2YgdXNlclxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBSYW5raW5nXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdW50cnlDb2RlXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZVxyXG4gICAgICogICAgICAgICAgICBpbjogcXVlcnlcclxuICAgICAqICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvSW5kaXZpZHVhbFJhbmtpbmdSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW5kaXZpZHVhbFJhbmtpbmcocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB1c2VySWQ6IHN0cmluZyA9IHJlcS51c2VyLnN1YjtcclxuICAgICAgICBjb25zdCBjb3VudHJ5Q29kZXMgPSByZXEucXVlcnkuY291bnRyeUNvZGUgYXMgc3RyaW5nW10gfHwgW107XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJCeUlkKHVzZXJJZCk7XHJcbiAgICAgICAgY29uc3QgcmFua2luZyA9IGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmdldEluZGl2aWR1YWxSYW5raW5nKHVzZXJJZCwgY291bnRyeUNvZGVzLCB1c2VyLmRpdmlzaW9uKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoe3Bvc2l0aW9uOiByYW5raW5nfSBhcyBJbmRpdmlkdWFsUmFua2luZ1Jlc3BvbnNlKTtcclxuICAgIH1cclxufSJdfQ==