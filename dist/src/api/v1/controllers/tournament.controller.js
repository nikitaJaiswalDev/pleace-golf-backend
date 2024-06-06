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
exports.TournamentController = void 0;
const express_1 = require("express");
const passport = require("passport");
const error_handler_1 = require("../../handlers/error-handler");
const mapper_1 = require("../mapper");
const validator_1 = require("../../../core/validation/validator");
const tournament_entry_request_1 = require("../dtos/request/tournament-entry.request");
const enter_tournament_request_1 = require("../dtos/request/enter-tournament.request");
const tournament_scorecard_request_1 = require("../dtos/request/tournament-scorecard.request");
const save_tournament_scorecard_request_1 = require("../dtos/request/save-tournament-scorecard.request");
const tournament_leaderboard_request_1 = require("../dtos/request/tournament-leaderboard.request");
const tournament_request_1 = require("../dtos/request/tournament.request");
class TournamentController {
    constructor(tournamentManagementService, userService) {
        this.tournamentManagementService = tournamentManagementService;
        this.userService = userService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        //this.router.use(passport.authenticate("jwt", { session: false }));
        this.router.get("/", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournaments, this));
        this.router.get("/all-tournaments", validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllTournaments, this));
        this.router.get("/result-summary", validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentResultSummary, this));
        this.router.get("/:tournamentId", tournament_request_1.TournamentRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournament, this));
        this.router.get("/:tournamentId/entry/:userId", tournament_entry_request_1.TournamentEntryRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentEntry, this));
        this.router.post("/:tournamentId/entry/:userId", enter_tournament_request_1.EnterTournamentRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.enterTournament, this));
        this.router.post("/:tournamentId/update-entry/:userId", enter_tournament_request_1.EnterTournamentRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateTournamentEntry, this));
        this.router.get("/:tournamentId/scorecard/:scorecardId/:userId", tournament_scorecard_request_1.TournamentScorecardRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentScorecard, this));
        this.router.get("/:tournamentId/all-round-scorecard/:scorecardId/:userId", tournament_scorecard_request_1.TournamentScorecardRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllRoundScorecard, this));
        this.router.post("/:tournamentId/scorecard/:scorecardId/:userId/:leaderboardId", save_tournament_scorecard_request_1.SaveTournamentScorecardRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateTournamentScorecard, this));
        this.router.get("/:tournamentId/leaderboard/:leaderboardId/:userId", tournament_leaderboard_request_1.TournamentLeaderboardRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentLeaderboard, this));
        this.router.get("/:tournamentId/result", validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentResults, this));
        this.router.post("/create-tournament", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.createTournament, this));
        this.router.post("/update-tournament", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateTournament, this));
        this.router.get("/leaderboard/:tournamentId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentLeaderboardForView, this));
        this.router.get("/player-scorecard/:tournamentId/:userId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getPlayerScorecard, this));
        this.router.get("/play-next-round/:tournamentId/:userId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.playNextRound, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /tournament/create-tournament:
     *  post:
     *      description: Enter tournament
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *            in: body
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    createTournament(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournament = yield this.tournamentManagementService.createTournament(req);
            res.status(200).send(tournament);
        });
    }
    /**
     * @swagger
     * /tournament/create-tournament:
     *  post:
     *      description: Enter tournament
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *            in: body
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateTournament(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournament = yield this.tournamentManagementService.updateTournament(req);
            res.status(200).send(tournament);
        });
    }
    /**
     * @swagger
     * /tournament/:
     *  get:
     *      description: Get available tournaments
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/TournamentResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournaments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield this.tournamentManagementService.getAvailableTournaments();
            res.status(200).send(mapper_1.Mapper.mapTournaments(tournaments));
        });
    }
    /**
     * @swagger
     * /tournament/all-tournaments:
     *  get:
     *      description: Get all tournaments
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/TournamentResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllTournaments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield this.tournamentManagementService.getTournaments();
            res.status(200).send(mapper_1.Mapper.mapTournaments(tournaments));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}:
     *  get:
     *      description: Get tournament
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournament(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournamentId = req.params.tournamentId;
            const tournament = yield this.tournamentManagementService.getTournament(tournamentId);
            res.status(200).send(mapper_1.Mapper.mapTournament(tournament));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/entry/{userId}:
     *  get:
     *      description: Gets user tournament entry
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentEntryResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentEntry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            //const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const tournamentEntry = yield this.tournamentManagementService.getTournamentEntry(userId, tournamentId);
            res.status(200).send(mapper_1.Mapper.mapTournamentEntry(tournamentEntry));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/entry:
     *  post:
     *      description: Enter tournament
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: enterTournament
     *            type: EnterTournamentRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/EnterTournamentRequest'
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentEntryResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    enterTournament(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const enterTournamentRequest = req.body;
            const user = yield this.userService.getUserById(userId);
            const tournamentEntry = yield this.tournamentManagementService.enterTournament(userId, tournamentId, enterTournamentRequest.courseId, user.division, user.gender, enterTournamentRequest.handicapIndex, enterTournamentRequest.tee, enterTournamentRequest.teamName, enterTournamentRequest.accessToken);
            res.status(200).send(mapper_1.Mapper.mapTournamentEntry(tournamentEntry));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/update-entry:
     *  post:
     *      description: Update tournament entry
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: enterTournament
     *            type: EnterTournamentRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/EnterTournamentRequest'
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentEntryResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateTournamentEntry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const enterTournamentRequest = req.body;
            const user = yield this.userService.getUserById(userId);
            const tournamentEntry = yield this.tournamentManagementService.updateTournamentEntry(userId, tournamentId, enterTournamentRequest.courseId, user.division, user.gender, enterTournamentRequest.handicapIndex, enterTournamentRequest.tee, enterTournamentRequest.teamName);
            res.status(200).send(mapper_1.Mapper.mapTournamentEntry(tournamentEntry));
        });
    }
    /**
     * @swagger
     * /player-scorecard/{tournamentId}/{userId}:
     *  get:
     *      description: Gets player tournament scorecard (only one tee should is returned in the course tees array)
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: scorecardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentScorecardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getPlayerScorecard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const tournamentScorecard = yield this.tournamentManagementService.getPlayerScorecard(userId, tournamentId);
            /* Logger.debug(tournamentScorecard);
            Logger.debug(tournamentScorecard.tee);
            Logger.debug(tournamentScorecard.gender); */
            res.status(200).send(mapper_1.Mapper.mapTournamentScorecard(tournamentScorecard));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/scorecard/{scorecardId}/{userId}:
     *  get:
     *      description: Gets user tournament scorecard (only one tee is returned in the course tees array)
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: scorecardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentScorecardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    playNextRound(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            // const tournamentId = req.params.tournamentId;
            const tournamentId = req.params.tournamentId;
            const tournamentScorecard = yield this.tournamentManagementService.playNextRound(userId, tournamentId);
            //Logger.debug(tournamentScorecard);
            //Logger.debug(tournamentScorecard.tee);
            //Logger.debug(tournamentScorecard.gender);
            res.status(200).send(mapper_1.Mapper.mapTournamentScorecard(tournamentScorecard));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/scorecard/{scorecardId}/{userId}:
     *  get:
     *      description: Gets user tournament scorecard (only one tee is returned in the course tees array)
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: scorecardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentScorecardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentScorecard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const scorecardId = req.params.scorecardId;
            const tournamentScorecard = yield this.tournamentManagementService.getScorecardAndCourseData(userId, scorecardId);
            res.status(200).send(mapper_1.Mapper.mapTournamentScorecard(tournamentScorecard));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/all-round-scorecard/{scorecardId}/{userId}:
     *  get:
     *      description: Gets user tournament scorecard (only one tee is returned in the course tees array)
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: scorecardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentScorecardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllRoundScorecard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const scorecardId = req.params.scorecardId;
            const tournamentScorecards = yield this.tournamentManagementService.getAllRoundScorecard(userId, scorecardId, tournamentId);
            res.status(200).send(mapper_1.Mapper.mapAllRoundScorecard(tournamentScorecards));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/scorecard/{scorecardId}/{userId}:
     *  post:
     *      description: Update user tournament scorecard
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: scorecardId
     *            type: string
     *            required: true
     *            in: path
     *          - name: saveTournamentScorecard
     *            type: SaveTournamentScorecardRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/SaveTournamentScorecardRequest'
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/TournamentScorecardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateTournamentScorecard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const scorecardId = req.params.scorecardId;
            const leaderboardId = req.params.leaderboardId;
            const saveTournamentScorecardRequest = req.body;
            const tournamentScorecard = yield this.tournamentManagementService.updateScorecard(userId, scorecardId, saveTournamentScorecardRequest.scores, leaderboardId);
            res.status(200).send(mapper_1.Mapper.mapTournamentScorecard(tournamentScorecard));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/leaderboard/{leaderboardId}/{userId}:
     *  get:
     *      description: Gets user tournament leaderboard
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: leaderboardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/TournamentLeaderboardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentLeaderboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const tournamentId = req.params.tournamentId;
            const leaderboardId = req.params.leaderboardId;
            const tournamentLeaderboard = yield this.tournamentManagementService.getLeaderboard(userId, leaderboardId);
            res.status(200).send(mapper_1.Mapper.mapTournamentLeaderboards(tournamentLeaderboard));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/leaderboard/{leaderboardId}:
     *  get:
     *      description: Gets user tournament leaderboard
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
     *          - name: leaderboardId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/TournamentLeaderboardResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentLeaderboardForView(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournamentId = req.params.tournamentId;
            const tournamentLeaderboard = yield this.tournamentManagementService.getTournamentLeaderboard(tournamentId);
            res.status(200).send(mapper_1.Mapper.mapTournamentLeaderboardsView(tournamentLeaderboard));
        });
    }
    /**
     * @swagger
     * /tournament/result-summary:
     *  get:
     *      description: Gets tournament result summary
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
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
     *                      $ref: '#/definitions/TournamentResultSummaryResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentResultSummary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const division = req.query.division;
            const tournamentResults = yield this.tournamentManagementService.getFinishedTournamentsByDivision(true, division);
            res.status(200).send(mapper_1.Mapper.mapTournamentsToResultSummaries(tournamentResults));
        });
    }
    /**
     * @swagger
     * /tournament/{tournamentId}/result:
     *  get:
     *      description: Gets tournament result
     *      tags:
     *          - Tournament
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: tournamentId
     *            type: string
     *            required: true
     *            in: path
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
     *                      $ref: '#/definitions/TournamentResultResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentResults(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournamentId = req.params.tournamentId;
            const division = req.query.division;
            const tournamentResults = yield this.tournamentManagementService.getTournamentResults(tournamentId, division);
            res.status(200).send(mapper_1.Mapper.mapTournamentResults(tournamentResults));
        });
    }
}
exports.TournamentController = TournamentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy90b3VybmFtZW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBQ2pDLHFDQUFxQztBQUVyQyxnRUFBMEU7QUFDMUUsc0NBQW1DO0FBRW5DLGtFQUE4RDtBQUk5RCx1RkFBd0Y7QUFDeEYsdUZBQWdIO0FBQ2hILCtGQUFnRztBQUNoRyx5R0FBeUk7QUFDekksbUdBQW9HO0FBS3BHLDJFQUE2RTtBQUU3RSxNQUFhLG9CQUFvQjtJQUs3QixZQUFZLDJCQUF3RCxFQUFFLFdBQXdCO1FBQzFGLElBQUksQ0FBQywyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1FBQ3ZCLG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsb0JBQVEsRUFBRSxJQUFBLDBDQUEwQixFQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLG9CQUFRLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoSCxJQUFJ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QXNDLENBQUMsQ0FBQztRQUN6SCxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ1Usb0JBQW9CLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjs7WUFDN0UsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDN0MsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUF3QixDQUFDO1lBQ3BELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTlHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBK0IsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7S0FBQTtDQUlKO0FBMW9CRCxvREEwb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nIH0gZnJvbSBcIi4uLy4uL2hhbmRsZXJzL2Vycm9yLWhhbmRsZXJcIjtcclxuaW1wb3J0IHsgTWFwcGVyIH0gZnJvbSBcIi4uL21hcHBlclwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZ29sZi1jbHViLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgdmFsaWRhdGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YlJlc3BvbnNlIH0gZnJvbSBcIi4uL2R0b3MvcmVzcG9uc2UvZ29sZi1jbHViLnJlc3BvbnNlXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy90b3VybmFtZW50LW1hbmFnZW1lbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50UmVzcG9uc2UsIFRvdXJuYW1lbnRMZWFkZXJib2FyZFJlc3BvbnNlLCBUb3VybmFtZW50UmVzdWx0U3VtbWFyeVJlc3BvbnNlLCBUb3VybmFtZW50UmVzdWx0UmVzcG9uc2UgfSBmcm9tIFwiLi4vZHRvcy9yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50RW50cnlSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC90b3VybmFtZW50LWVudHJ5LnJlcXVlc3RcIjtcclxuaW1wb3J0IHsgRW50ZXJUb3VybmFtZW50UmVxdWVzdCwgRW50ZXJUb3VybmFtZW50UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvZW50ZXItdG91cm5hbWVudC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRTY29yZWNhcmRSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC90b3VybmFtZW50LXNjb3JlY2FyZC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFNhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdCwgU2F2ZVRvdXJuYW1lbnRTY29yZWNhcmRSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC9zYXZlLXRvdXJuYW1lbnQtc2NvcmVjYXJkLnJlcXVlc3RcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudExlYWRlcmJvYXJkUmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvdG91cm5hbWVudC1sZWFkZXJib2FyZC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHRSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC90b3VybmFtZW50LXJlc3VsdC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHRTdW1tYXJ5UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvdG91cm5hbWVudC1yZXN1bHQtc3VtbWFyeS5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC90b3VybmFtZW50LnJlcXVlc3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50Q29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZTogVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB1c2VyU2VydmljZTogVXNlclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZTogVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLCB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZSA9IHRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gUm91dGVyKCk7XHJcbiAgICAgICAgLy90aGlzLnJvdXRlci51c2UocGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSkpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9cIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRUb3VybmFtZW50cywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9hbGwtdG91cm5hbWVudHNcIiwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0QWxsVG91cm5hbWVudHMsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvcmVzdWx0LXN1bW1hcnlcIiwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0VG91cm5hbWVudFJlc3VsdFN1bW1hcnksIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvOnRvdXJuYW1lbnRJZFwiLCBUb3VybmFtZW50UmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0VG91cm5hbWVudCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi86dG91cm5hbWVudElkL2VudHJ5Lzp1c2VySWRcIiwgVG91cm5hbWVudEVudHJ5UmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0VG91cm5hbWVudEVudHJ5LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi86dG91cm5hbWVudElkL2VudHJ5Lzp1c2VySWRcIiwgRW50ZXJUb3VybmFtZW50UmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZW50ZXJUb3VybmFtZW50LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi86dG91cm5hbWVudElkL3VwZGF0ZS1lbnRyeS86dXNlcklkXCIsIEVudGVyVG91cm5hbWVudFJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnVwZGF0ZVRvdXJuYW1lbnRFbnRyeSwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi86dG91cm5hbWVudElkL3Njb3JlY2FyZC86c2NvcmVjYXJkSWQvOnVzZXJJZFwiLCBUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0VG91cm5hbWVudFNjb3JlY2FyZCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi86dG91cm5hbWVudElkL2FsbC1yb3VuZC1zY29yZWNhcmQvOnNjb3JlY2FyZElkLzp1c2VySWRcIiwgVG91cm5hbWVudFNjb3JlY2FyZFJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldEFsbFJvdW5kU2NvcmVjYXJkLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi86dG91cm5hbWVudElkL3Njb3JlY2FyZC86c2NvcmVjYXJkSWQvOnVzZXJJZC86bGVhZGVyYm9hcmRJZFwiLCBTYXZlVG91cm5hbWVudFNjb3JlY2FyZFJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnVwZGF0ZVRvdXJuYW1lbnRTY29yZWNhcmQsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvOnRvdXJuYW1lbnRJZC9sZWFkZXJib2FyZC86bGVhZGVyYm9hcmRJZC86dXNlcklkXCIsIFRvdXJuYW1lbnRMZWFkZXJib2FyZFJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldFRvdXJuYW1lbnRMZWFkZXJib2FyZCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi86dG91cm5hbWVudElkL3Jlc3VsdFwiLCB2YWxpZGF0ZSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRUb3VybmFtZW50UmVzdWx0cywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvY3JlYXRlLXRvdXJuYW1lbnRcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5jcmVhdGVUb3VybmFtZW50LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi91cGRhdGUtdG91cm5hbWVudFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnVwZGF0ZVRvdXJuYW1lbnQsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvbGVhZGVyYm9hcmQvOnRvdXJuYW1lbnRJZFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldFRvdXJuYW1lbnRMZWFkZXJib2FyZEZvclZpZXcsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvcGxheWVyLXNjb3JlY2FyZC86dG91cm5hbWVudElkLzp1c2VySWRcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRQbGF5ZXJTY29yZWNhcmQsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvcGxheS1uZXh0LXJvdW5kLzp0b3VybmFtZW50SWQvOnVzZXJJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnBsYXlOZXh0Um91bmQsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVyKCk6IFJvdXRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L2NyZWF0ZS10b3VybmFtZW50OlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBFbnRlciB0b3VybmFtZW50XHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgY3JlYXRlVG91cm5hbWVudChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5jcmVhdGVUb3VybmFtZW50KHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQodG91cm5hbWVudCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdG91cm5hbWVudC9jcmVhdGUtdG91cm5hbWVudDpcclxuICAgICAqICBwb3N0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogRW50ZXIgdG91cm5hbWVudFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAgIGluOiBib2R5XHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIHVwZGF0ZVRvdXJuYW1lbnQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50ID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UudXBkYXRlVG91cm5hbWVudChyZXEpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHRvdXJuYW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50LzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXQgYXZhaWxhYmxlIHRvdXJuYW1lbnRzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Ub3VybmFtZW50UmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRBdmFpbGFibGVUb3VybmFtZW50cygpO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVG91cm5hbWVudHModG91cm5hbWVudHMpIGFzIFRvdXJuYW1lbnRSZXNwb25zZVtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdG91cm5hbWVudC9hbGwtdG91cm5hbWVudHM6XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0IGFsbCB0b3VybmFtZW50c1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIGl0ZW1zOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsVG91cm5hbWVudHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50cyA9IGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmdldFRvdXJuYW1lbnRzKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFRvdXJuYW1lbnRzKHRvdXJuYW1lbnRzKSBhcyBUb3VybmFtZW50UmVzcG9uc2VbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL3RvdXJuYW1lbnQve3RvdXJuYW1lbnRJZH06XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0IHRvdXJuYW1lbnRcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gVG91cm5hbWVudFxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiB0b3VybmFtZW50SWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRUb3VybmFtZW50KHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFRvdXJuYW1lbnQodG91cm5hbWVudCkgYXMgVG91cm5hbWVudFJlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdG91cm5hbWVudC97dG91cm5hbWVudElkfS9lbnRyeS97dXNlcklkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHVzZXIgdG91cm5hbWVudCBlbnRyeVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHRvdXJuYW1lbnRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudEVudHJ5UmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRFbnRyeShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZDogc3RyaW5nID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgLy9jb25zdCB1c2VySWQgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50SWQgPSByZXEucGFyYW1zLnRvdXJuYW1lbnRJZDtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50RW50cnkgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRUb3VybmFtZW50RW50cnkodXNlcklkLCB0b3VybmFtZW50SWQpO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVG91cm5hbWVudEVudHJ5KHRvdXJuYW1lbnRFbnRyeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L3t0b3VybmFtZW50SWR9L2VudHJ5OlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBFbnRlciB0b3VybmFtZW50XHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdG91cm5hbWVudElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBlbnRlclRvdXJuYW1lbnRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogRW50ZXJUb3VybmFtZW50UmVxdWVzdFxyXG4gICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0VudGVyVG91cm5hbWVudFJlcXVlc3QnXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRFbnRyeVJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBlbnRlclRvdXJuYW1lbnQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB1c2VySWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMudXNlcklkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IGVudGVyVG91cm5hbWVudFJlcXVlc3QgPSByZXEuYm9keSBhcyBFbnRlclRvdXJuYW1lbnRSZXF1ZXN0O1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyU2VydmljZS5nZXRVc2VyQnlJZCh1c2VySWQpO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRFbnRyeSA9IGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmVudGVyVG91cm5hbWVudChcclxuICAgICAgICAgICAgdXNlcklkLFxyXG4gICAgICAgICAgICB0b3VybmFtZW50SWQsXHJcbiAgICAgICAgICAgIGVudGVyVG91cm5hbWVudFJlcXVlc3QuY291cnNlSWQsXHJcbiAgICAgICAgICAgIHVzZXIuZGl2aXNpb24sXHJcbiAgICAgICAgICAgIHVzZXIuZ2VuZGVyLFxyXG4gICAgICAgICAgICBlbnRlclRvdXJuYW1lbnRSZXF1ZXN0LmhhbmRpY2FwSW5kZXgsXHJcbiAgICAgICAgICAgIGVudGVyVG91cm5hbWVudFJlcXVlc3QudGVlLFxyXG4gICAgICAgICAgICBlbnRlclRvdXJuYW1lbnRSZXF1ZXN0LnRlYW1OYW1lLFxyXG4gICAgICAgICAgICBlbnRlclRvdXJuYW1lbnRSZXF1ZXN0LmFjY2Vzc1Rva2VuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFRvdXJuYW1lbnRFbnRyeSh0b3VybmFtZW50RW50cnkpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL3RvdXJuYW1lbnQve3RvdXJuYW1lbnRJZH0vdXBkYXRlLWVudHJ5OlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGUgdG91cm5hbWVudCBlbnRyeVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHRvdXJuYW1lbnRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogZW50ZXJUb3VybmFtZW50XHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IEVudGVyVG91cm5hbWVudFJlcXVlc3RcclxuICAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICAqICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9FbnRlclRvdXJuYW1lbnRSZXF1ZXN0J1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Ub3VybmFtZW50RW50cnlSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIHVwZGF0ZVRvdXJuYW1lbnRFbnRyeShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZDogc3RyaW5nID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudElkID0gcmVxLnBhcmFtcy50b3VybmFtZW50SWQ7XHJcbiAgICAgICAgY29uc3QgZW50ZXJUb3VybmFtZW50UmVxdWVzdCA9IHJlcS5ib2R5IGFzIEVudGVyVG91cm5hbWVudFJlcXVlc3Q7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJCeUlkKHVzZXJJZCk7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudEVudHJ5ID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UudXBkYXRlVG91cm5hbWVudEVudHJ5KFxyXG4gICAgICAgICAgICB1c2VySWQsXHJcbiAgICAgICAgICAgIHRvdXJuYW1lbnRJZCxcclxuICAgICAgICAgICAgZW50ZXJUb3VybmFtZW50UmVxdWVzdC5jb3Vyc2VJZCxcclxuICAgICAgICAgICAgdXNlci5kaXZpc2lvbixcclxuICAgICAgICAgICAgdXNlci5nZW5kZXIsXHJcbiAgICAgICAgICAgIGVudGVyVG91cm5hbWVudFJlcXVlc3QuaGFuZGljYXBJbmRleCxcclxuICAgICAgICAgICAgZW50ZXJUb3VybmFtZW50UmVxdWVzdC50ZWUsXHJcbiAgICAgICAgICAgIGVudGVyVG91cm5hbWVudFJlcXVlc3QudGVhbU5hbWVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVG91cm5hbWVudEVudHJ5KHRvdXJuYW1lbnRFbnRyeSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvcGxheWVyLXNjb3JlY2FyZC97dG91cm5hbWVudElkfS97dXNlcklkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHBsYXllciB0b3VybmFtZW50IHNjb3JlY2FyZCAob25seSBvbmUgdGVlIHNob3VsZCBpcyByZXR1cm5lZCBpbiB0aGUgY291cnNlIHRlZXMgYXJyYXkpXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdG91cm5hbWVudElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBzY29yZWNhcmRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudFNjb3JlY2FyZFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRQbGF5ZXJTY29yZWNhcmQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB1c2VySWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMudXNlcklkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRQbGF5ZXJTY29yZWNhcmQodXNlcklkLCB0b3VybmFtZW50SWQpO1xyXG4gICAgICAgIC8qIExvZ2dlci5kZWJ1Zyh0b3VybmFtZW50U2NvcmVjYXJkKTtcclxuICAgICAgICBMb2dnZXIuZGVidWcodG91cm5hbWVudFNjb3JlY2FyZC50ZWUpO1xyXG4gICAgICAgIExvZ2dlci5kZWJ1Zyh0b3VybmFtZW50U2NvcmVjYXJkLmdlbmRlcik7ICovXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFRvdXJuYW1lbnRTY29yZWNhcmQodG91cm5hbWVudFNjb3JlY2FyZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L3t0b3VybmFtZW50SWR9L3Njb3JlY2FyZC97c2NvcmVjYXJkSWR9L3t1c2VySWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldHMgdXNlciB0b3VybmFtZW50IHNjb3JlY2FyZCAob25seSBvbmUgdGVlIGlzIHJldHVybmVkIGluIHRoZSBjb3Vyc2UgdGVlcyBhcnJheSlcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gVG91cm5hbWVudFxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiB0b3VybmFtZW50SWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHNjb3JlY2FyZElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Ub3VybmFtZW50U2NvcmVjYXJkUmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBwbGF5TmV4dFJvdW5kKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkOiBzdHJpbmcgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgIC8vIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5wbGF5TmV4dFJvdW5kKHVzZXJJZCwgdG91cm5hbWVudElkKTtcclxuICAgICAgICAvL0xvZ2dlci5kZWJ1Zyh0b3VybmFtZW50U2NvcmVjYXJkKTtcclxuICAgICAgICAvL0xvZ2dlci5kZWJ1Zyh0b3VybmFtZW50U2NvcmVjYXJkLnRlZSk7XHJcbiAgICAgICAgLy9Mb2dnZXIuZGVidWcodG91cm5hbWVudFNjb3JlY2FyZC5nZW5kZXIpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBUb3VybmFtZW50U2NvcmVjYXJkKHRvdXJuYW1lbnRTY29yZWNhcmQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdG91cm5hbWVudC97dG91cm5hbWVudElkfS9zY29yZWNhcmQve3Njb3JlY2FyZElkfS97dXNlcklkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHVzZXIgdG91cm5hbWVudCBzY29yZWNhcmQgKG9ubHkgb25lIHRlZSBpcyByZXR1cm5lZCBpbiB0aGUgY291cnNlIHRlZXMgYXJyYXkpXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdG91cm5hbWVudElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBzY29yZWNhcmRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudFNjb3JlY2FyZFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudFNjb3JlY2FyZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZDogc3RyaW5nID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudElkID0gcmVxLnBhcmFtcy50b3VybmFtZW50SWQ7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVjYXJkSWQgPSByZXEucGFyYW1zLnNjb3JlY2FyZElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRTY29yZWNhcmRBbmRDb3Vyc2VEYXRhKHVzZXJJZCwgc2NvcmVjYXJkSWQpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBUb3VybmFtZW50U2NvcmVjYXJkKHRvdXJuYW1lbnRTY29yZWNhcmQpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL3RvdXJuYW1lbnQve3RvdXJuYW1lbnRJZH0vYWxsLXJvdW5kLXNjb3JlY2FyZC97c2NvcmVjYXJkSWR9L3t1c2VySWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldHMgdXNlciB0b3VybmFtZW50IHNjb3JlY2FyZCAob25seSBvbmUgdGVlIGlzIHJldHVybmVkIGluIHRoZSBjb3Vyc2UgdGVlcyBhcnJheSlcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gVG91cm5hbWVudFxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiB0b3VybmFtZW50SWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHNjb3JlY2FyZElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Ub3VybmFtZW50U2NvcmVjYXJkUmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRBbGxSb3VuZFNjb3JlY2FyZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZDogc3RyaW5nID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudElkID0gcmVxLnBhcmFtcy50b3VybmFtZW50SWQ7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVjYXJkSWQgPSByZXEucGFyYW1zLnNjb3JlY2FyZElkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0QWxsUm91bmRTY29yZWNhcmQodXNlcklkLCBzY29yZWNhcmRJZCx0b3VybmFtZW50SWQpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBBbGxSb3VuZFNjb3JlY2FyZCh0b3VybmFtZW50U2NvcmVjYXJkcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L3t0b3VybmFtZW50SWR9L3Njb3JlY2FyZC97c2NvcmVjYXJkSWR9L3t1c2VySWR9OlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGUgdXNlciB0b3VybmFtZW50IHNjb3JlY2FyZFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHRvdXJuYW1lbnRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogc2NvcmVjYXJkSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHNhdmVUb3VybmFtZW50U2NvcmVjYXJkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IFNhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdFxyXG4gICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1NhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdCdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVG91cm5hbWVudFNjb3JlY2FyZFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVUb3VybmFtZW50U2NvcmVjYXJkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkOiBzdHJpbmcgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50SWQgPSByZXEucGFyYW1zLnRvdXJuYW1lbnRJZDtcclxuICAgICAgICBjb25zdCBzY29yZWNhcmRJZCA9IHJlcS5wYXJhbXMuc2NvcmVjYXJkSWQ7XHJcbiAgICAgICAgY29uc3QgbGVhZGVyYm9hcmRJZCA9IHJlcS5wYXJhbXMubGVhZGVyYm9hcmRJZFxyXG4gICAgICAgIGNvbnN0IHNhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdCA9IHJlcS5ib2R5IGFzIFNhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdDtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50U2NvcmVjYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UudXBkYXRlU2NvcmVjYXJkKHVzZXJJZCwgc2NvcmVjYXJkSWQsIHNhdmVUb3VybmFtZW50U2NvcmVjYXJkUmVxdWVzdC5zY29yZXMsbGVhZGVyYm9hcmRJZCk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBUb3VybmFtZW50U2NvcmVjYXJkKHRvdXJuYW1lbnRTY29yZWNhcmQpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL3RvdXJuYW1lbnQve3RvdXJuYW1lbnRJZH0vbGVhZGVyYm9hcmQve2xlYWRlcmJvYXJkSWR9L3t1c2VySWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldHMgdXNlciB0b3VybmFtZW50IGxlYWRlcmJvYXJkXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdG91cm5hbWVudElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBsZWFkZXJib2FyZElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgICAgICAgICBpdGVtczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRMZWFkZXJib2FyZFJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRUb3VybmFtZW50TGVhZGVyYm9hcmQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB1c2VySWQ6IHN0cmluZyA9IHJlcS5wYXJhbXMudXNlcklkO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgIGNvbnN0IGxlYWRlcmJvYXJkSWQgPSByZXEucGFyYW1zLmxlYWRlcmJvYXJkSWQ7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudExlYWRlcmJvYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0TGVhZGVyYm9hcmQodXNlcklkLCBsZWFkZXJib2FyZElkKTtcclxuICAgICAgICBcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVG91cm5hbWVudExlYWRlcmJvYXJkcyh0b3VybmFtZW50TGVhZGVyYm9hcmQpIGFzIFRvdXJuYW1lbnRMZWFkZXJib2FyZFJlc3BvbnNlW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L3t0b3VybmFtZW50SWR9L2xlYWRlcmJvYXJkL3tsZWFkZXJib2FyZElkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHVzZXIgdG91cm5hbWVudCBsZWFkZXJib2FyZFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBUb3VybmFtZW50XHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHRvdXJuYW1lbnRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogbGVhZGVyYm9hcmRJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Ub3VybmFtZW50TGVhZGVyYm9hcmRSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRMZWFkZXJib2FyZEZvclZpZXcocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50SWQgPSByZXEucGFyYW1zLnRvdXJuYW1lbnRJZDtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50TGVhZGVyYm9hcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZS5nZXRUb3VybmFtZW50TGVhZGVyYm9hcmQodG91cm5hbWVudElkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVG91cm5hbWVudExlYWRlcmJvYXJkc1ZpZXcodG91cm5hbWVudExlYWRlcmJvYXJkKSBhcyBUb3VybmFtZW50TGVhZGVyYm9hcmRSZXNwb25zZVtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdG91cm5hbWVudC9yZXN1bHQtc3VtbWFyeTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHRvdXJuYW1lbnQgcmVzdWx0IHN1bW1hcnlcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gVG91cm5hbWVudFxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBkaXZpc2lvblxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgZW51bTogW0NoYW1wLCBDZWxlYnJpdHksIFByb2Zlc3Npb25hbCBHb2xmZXJdXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBxdWVyeVxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgICAgICAgICBpdGVtczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRSZXN1bHRTdW1tYXJ5UmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRSZXN1bHRTdW1tYXJ5KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZGl2aXNpb24gPSByZXEucXVlcnkuZGl2aXNpb24gYXMgR29sZkRpdmlzaW9uOyBcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50UmVzdWx0cyA9IGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmdldEZpbmlzaGVkVG91cm5hbWVudHNCeURpdmlzaW9uKHRydWUsIGRpdmlzaW9uKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFRvdXJuYW1lbnRzVG9SZXN1bHRTdW1tYXJpZXModG91cm5hbWVudFJlc3VsdHMpIGFzIFRvdXJuYW1lbnRSZXN1bHRTdW1tYXJ5UmVzcG9uc2VbXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC90b3VybmFtZW50L3t0b3VybmFtZW50SWR9L3Jlc3VsdDpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIHRvdXJuYW1lbnQgcmVzdWx0XHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdG91cm5hbWVudElkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBkaXZpc2lvblxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgZW51bTogW0NoYW1wLCBDZWxlYnJpdHksIFByb2Zlc3Npb25hbCBHb2xmZXJdXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBxdWVyeVxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgICAgICAgICBpdGVtczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1RvdXJuYW1lbnRSZXN1bHRSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudFJlc3VsdHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50SWQgPSByZXEucGFyYW1zLnRvdXJuYW1lbnRJZDtcclxuICAgICAgICBjb25zdCBkaXZpc2lvbiA9IHJlcS5xdWVyeS5kaXZpc2lvbiBhcyBHb2xmRGl2aXNpb247IFxyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRSZXN1bHRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0VG91cm5hbWVudFJlc3VsdHModG91cm5hbWVudElkLCBkaXZpc2lvbik7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBUb3VybmFtZW50UmVzdWx0cyh0b3VybmFtZW50UmVzdWx0cykgYXMgVG91cm5hbWVudFJlc3VsdFJlc3BvbnNlW10pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgXHJcbn0iXX0=