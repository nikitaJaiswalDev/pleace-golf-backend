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
exports.CommonController = void 0;
const express_1 = require("express");
const passport = require("passport");
const error_handler_1 = require("../../handlers/error-handler");
class CommonController {
    constructor(commonService) {
        this.commonService = commonService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.get("/get-categories", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCategories, this));
        this.router.post("/create-invite", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.createInvite, this));
        this.router.get("/get-invite-details/:inviteId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getInviteDetails, this));
        this.router.get("/get-celeb-index-ranking", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCelebIndexRanking, this));
        this.router.get("/invitation-used/:inviteId/:userId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.invitationUsed, this));
        this.router.get("/invitation-declined/:inviteId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.invitationDeclined, this));
        this.router.post("/verify-invitee/:inviteId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.verifyInvitee, this));
        this.router.get("/get-all-golf-courses", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllGolfCourses, this));
        this.router.get("/find-golf-courses/:searchStr", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.findGolfCourses, this));
        this.router.get("/find-golf-clubs/:searchStr/:countryCode", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.findGolfClubs, this));
        this.router.get("/get-golf-club-info/:clubId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getClubInfoById, this));
        this.router.get("/get-golf-course-info/:courseId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCourseInfoById, this));
        this.router.post("/update-golf-course", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateGolfCourse, this));
        this.router.post("/update-golf-club-course", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateClubCourseDetails, this));
        this.router.get("/golf-course-scorecard/:courseId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCourseScoreCard, this));
        this.router.delete("/delete-golf-course/:courseId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deleteGolfCourse, this));
        this.router.delete("/delete-golf-club/:clubId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deleteGolfClub, this));
        this.router.get("/get-all-invitees/:from", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllInvitees, this));
        this.router.get("/get-invitees-by-country/:countryCode", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getInviteesByCourtry, this));
        this.router.get("/get-Celebrity-types", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCelebrityTypes, this));
        this.router.post("/notify-single-club", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.notifySingleClub, this));
        this.router.post("/notify-all-club", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.notifyAllClub, this));
        this.router.get("/get-all-tournament", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllTournament, this));
        this.router.delete("/delete-invitee/:inviteId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deleteInvitee, this));
        this.router.get("/get-challengers", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getChallengers, this));
        this.router.get("/get-entered-tournaments/:userId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getEnteredTournaments, this));
        this.router.get("/get-tournament-entries/:tournamentId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getTournamentEntries, this));
        this.router.post("/add-challengers/:tournamentId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.addChallengers, this));
        this.router.delete("/delete-tournament/:tournamentId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deleteTournament, this));
        this.router.delete("/leave-tournament/:tournamentId/:userId", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.leaveTournament, this));
        this.router.get("/get-all-players", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAllPlayers, this));
        this.router.delete("/delete-player/:userId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deletePlayerByAdmin, this));
        this.router.post("/add-golf-club", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.addGolfClub, this));
        this.router.post("/need-help", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.needHelp, this));
        this.router.get("/get-amateur-tokens/:userId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getAmateurTokens, this));
        this.router.get("/get-club-champs", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getClubChamps, this));
        this.router.post("/add-champion", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.addCountryChampion, this));
        this.router.get("/get-champions/:countryCode", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCountryChampions, this));
        this.router.post("/help-support", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.helpSupport, this));
        this.router.get("/get-user-tournament-points/:tournamentId/:userId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getUserTournamentPoints, this));
        this.router.post("/save-course-ratings/:courseId", passport.authenticate("jwt", { session: false }), (0, error_handler_1.wrapAsyncWithErrorHandling)(this.saveCourseRatings, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /common/get-categories/:
     *  get:
     *      description: Gets all categories
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const categories = await CategorySchema.find({});
            res.status(200).send(categories.map(c => c.name)); */
            yield this.commonService.getCategories(req, res);
        });
    }
    /**
     * @swagger
     * /common/create-invite/:
     *  post:
     *      description: Create invite
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: user
     *          schema:
     *          type: object
     *          required:
     *          - firstName
     *          properties:
     *              firstName:
     *                  type:string
     *              lastName:
     *                  type:string
     *              category:
     *                  type:string
     *              type:
     *                  type:string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    createInvite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const categories = await CategorySchema.find({});
            res.status(200).send(categories.map(c => c.name)); */
            yield this.commonService.createInvite(req, res);
        });
    }
    /**
     * @swagger
     * /common/get-invite-details/{inviteId} :
     *  get:
     *      description: Gets all categories
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getInviteDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commonService.getInviteDetails(req, res);
        });
    }
    /**
     * @swagger
     * /common/get-celeb-index-ranking/:
     *  get:
     *      description: Gets all categories
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCelebIndexRanking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const categories = await CategorySchema.find({});
            res.status(200).send(categories.map(c => c.name)); */
            yield this.commonService.getCelebIndexRanking(req, res);
        });
    }
    /**
     * @swagger
     * /common/invitation-used/{inviteId}/{userId}:
     *  get:
     *      description: Gets all categories
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    invitationUsed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const categories = await CategorySchema.find({});
            res.status(200).send(categories.map(c => c.name)); */
            yield this.commonService.invitationUsed(req, res);
        });
    }
    /**
     * @swagger
     * /common/invitation-declined/{inviteId}:
     *  get:
     *      description: invitation decline
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    invitationDeclined(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commonService.invitationDeclined(req, res);
        });
    }
    /**
     * @swagger
     * /common/get-all-golf-courses/:
     *  get:
     *      description: Get All Golf Courses
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllGolfCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allGolfCourses = yield this.commonService.getAllGolfCourses();
            res.status(200).send(allGolfCourses);
        });
    }
    /**
     * @swagger
     * /common/find-golf-courses/{searchStr}:
     *  get:
     *      description: find golf courses
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: searchStr
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    findGolfCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allGolfCourses = yield this.commonService.findGolfCourses(req.params.searchStr);
            res.status(200).send(allGolfCourses);
        });
    }
    /**
     * @swagger
     * /common/get-golf-club-info/{clubId}:
     *  get:
     *      description: find golf courses
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: clubId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getClubInfoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allGolfCourses = yield this.commonService.getClubInfoById(req.params.clubId);
            res.status(200).send(allGolfCourses);
        });
    }
    /**
     * @swagger
     * /common/get-golf-course-info/{courseId}:
     *  get:
     *      description: find golf courses
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: clubId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCourseInfoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const golfCourse = yield this.commonService.getCourseInfoById(req.params.courseId);
            res.status(200).send(golfCourse);
        });
    }
    /**
     * @swagger
     * /common/update-golf-course/:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateGolfCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGolfCourse = yield this.commonService.updateGolfCourse(req);
            res.status(200).send(updatedGolfCourse);
        });
    }
    /**
     *  @swagger
     * /common/golf-course-scorecard/{courseId}:
     *  get:
     *      description: find golf courses
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCourseScoreCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseScorecard = yield this.commonService.getCourseScoreCard(req.params.courseId);
            res.status(200).send(courseScorecard);
        });
    }
    /**
     *  @swagger
     * /common/delete-golf-course/{courseId}:
     *  delete:
     *      description: Delete Golf Course
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    deleteGolfCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCourse = yield this.commonService.deleteGolfCourse(req.params.courseId);
            res.status(200).send(deletedCourse);
        });
    }
    /**
     *  @swagger
     * /common/delete-golf-club/{clubId}:
     *  delete:
     *      description: Delete Golf Course
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    deleteGolfClub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedClub = yield this.commonService.deleteGolfClub(req.params.clubId);
            res.status(200).send(deletedClub);
        });
    }
    /**
     * @swagger
     * /common/find-golf-clubs/{searchStr}/{countryCode}:
     *  get:
     *      description: find golf clubs
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: searchStr
     *            type: string
     *            required: true
     *            in: path
     *          - name: countryCode
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    findGolfClubs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allGolfClubs = yield this.commonService.findGolfClubs(req.params.searchStr, req.params.countryCode);
            res.status(200).send(allGolfClubs);
        });
    }
    /**
     * @swagger
     * /common/get-all-invitees/:
     *  get:
     *      description: Gets all invitees
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllInvitees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitees = yield this.commonService.getAllInvitees(req);
            res.status(200).send(invitees);
        });
    }
    /**
     * @swagger
     * /common/get-Celebrity-types/:
     *  get:
     *      description: Gets all Celebrity types
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCelebrityTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('request>>> ', req.user);
            const CelebrityTypes = yield this.commonService.getCelebrityTypes();
            res.status(200).send(CelebrityTypes);
        });
    }
    /**
     * @swagger
     * /common/update-golf-club-course/:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateClubCourseDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGolfCourse = yield this.commonService.updateClubCourseDetails(req);
            res.status(200).send(updatedGolfCourse);
        });
    }
    /**
     * @swagger
     * /common/notify-single-club/:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    notifySingleClub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGolfCourse = yield this.commonService.notifySingleClub(req);
            res.status(200).send(updatedGolfCourse);
        });
    }
    /**
     * @swagger
     * /common/notify-single-club/:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    notifyAllClub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGolfCourse = yield this.commonService.notifyAllClub(req);
            res.status(200).send(updatedGolfCourse);
        });
    }
    /**
     * @swagger
     * /common/get-all-tournament/:
     *  get:
     *      description: Gets all tournament
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllTournament(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('request>>> ',req.user);
            const tournments = yield this.commonService.getAllTournament();
            res.status(200).send(tournments);
        });
    }
    /**
     * @swagger
     * /common/get-invitees-by-country/{countryCode} :
     *  get:
     *      description: Gets all invitees by country
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getInviteesByCourtry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitees = yield this.commonService.getInviteesByCourtry(req.params.countryCode);
            res.status(200).send(invitees);
        });
    }
    /**
     * @swagger
     * /common/verify-invitee/{:inviteId}:
     *  get:
     *      description: Gets all tournament
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    verifyInvitee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('request>>> ',req.user);
            const invitee = yield this.commonService.verifyInvitee(req);
            res.status(200).send({ savedInvite: invitee });
        });
    }
    /**
     *  @swagger
     * /common/delete-invitee/{inviteId}:
     *  delete:
     *      description: Delete Golf Course
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    deleteInvitee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedInvitee = yield this.commonService.deleteInvitee(req.params.inviteId);
            res.status(200).send(deletedInvitee);
        });
    }
    /**
     * @swagger
     * /common/get-challengers/ :
     *  get:
     *      description: Gets all challengers
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getChallengers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const challengers = yield this.commonService.getChallengers();
            res.status(200).send(challengers);
        });
    }
    /**
     * @swagger
     * /common/get-entered-tournaments/{userId}:
     *  get:
     *      description: Gets entered tournaments
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getEnteredTournaments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield this.commonService.getEnteredTournaments(req);
            res.status(200).send(tournaments);
        });
    }
    /**
     * @swagger
     * /common/get-tournament-entries/{tournamentId}:
     *  get:
     *      description: Gets tournament entries
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getTournamentEntries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield this.commonService.getTournamentEntries(req);
            res.status(200).send(tournaments);
        });
    }
    /**
    * @swagger
    * /common/add-challengers/{tournamentId}:
    *  post:
    *      description: Add Challengers
    *      tags:
    *          - Common
    *      consumes:
    *          - application/json
    *      produces:
    *          - application/json
    *      parameters:
    *        - in: body
    *          name: golf course details
    *          description: The user to create.
    *          schema:
    *              type: object
    *              properties:
    *                  _id:
    *                      type: string
    *                  name:
    *                      type: string
    *                  numberOfHoles:
    *                      type: string
    *                  type:
    *                      type: string
    *                  par:
    *                      type: string
    *                  rating:
    *                      type: string
    *                  slope:
    *                      type: string
    *                  length:
    *                      type: string
    *      responses:
    *          200:
    *              description: OK
    *              schema:
    *                  type: object
    *          404:
    *              description: Resource not found
    *          500:
    *              description: Server error
    */
    addChallengers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const udpateTournament = yield this.commonService.addChallengers(req);
            res.status(200).send(udpateTournament);
        });
    }
    /**
     *  @swagger
     * /common/delete-tournament/{tournamentId}:
     *  delete:
     *      description: Delete Golf Course
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    deleteTournament(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTour = yield this.commonService.deleteTournament(req);
            res.status(200).send(deletedTour);
        });
    }
    /**
     *  @swagger
     * /common/leave-tournament/{tournamentId}/{userId}:
     *  delete:
     *      description: Leave Tournament
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    leaveTournament(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTour = yield this.commonService.leaveTournament(req);
            res.status(200).send(deletedTour);
        });
    }
    /**
     *  @swagger
     * /common/get-all-players/:
     *  get:
     *      description: Leave Tournament
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAllPlayers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const players = yield this.commonService.getAllPlayers();
            res.status(200).send(players);
        });
    }
    /**
     *  @swagger
     * /common/delete-player/{userId}:
     *  delete:
     *      description: Leave Tournament
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    deletePlayerByAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPlayer = yield this.commonService.deletePlayerByAdmin(req);
            res.status(200).send(deletedPlayer);
        });
    }
    /**
     * @swagger
     * /common/add-golf-club/:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    addGolfClub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClub = yield this.commonService.addGolfClub(req);
            res.status(200).send(newClub);
        });
    }
    /**
     * @swagger
     * /common/need-help:
     *  post:
     *      description: Update Golf Course
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    needHelp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.commonService.needHelp(req);
            res.status(200).send(response);
        });
    }
    /**
     * @swagger
     * /common/help-support:
     *  post:
     *      description: Help and Support
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    helpSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.commonService.helpSupport(req);
            res.status(200).send(response);
        });
    }
    /**
     *  @swagger
     * /common/get-amateur-tokens/{userId}:
     *  get:
     *      description: Get Amateur Tokens
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getAmateurTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.commonService.getAmateurTokens(req.params.userId);
            res.status(200).send(tokens);
        });
    }
    /**
    *  @swagger
    * /common/get-club-champs/:
    *  get:
    *      description: Get Club Champions
    *      tags:
    *          - Common
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: courseId
    *            type: string
    *            required: true
    *            in: path
    *      responses:
    *          200:
    *              description: OK
    *              schema:
    *                  type: array
    *          404:
    *              description: Resource not found
    *          500:
    *              description: Server error
    */
    getClubChamps(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const champions = yield this.commonService.getClubChamps();
            res.status(200).send(champions);
        });
    }
    /**
     * @swagger
     * /common/add-champion/:
     *  post:
     *      description: Add Country Champion
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    addCountryChampion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const champion = yield this.commonService.addCountryChampion(req);
            res.status(200).send(champion);
        });
    }
    /**
     *  @swagger
     * /common/get-champions/{countryCode}:
     *  get:
     *      description: Get Country Champions
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCountryChampions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const champions = yield this.commonService.getCountryChampions(req.params.countryCode);
            res.status(200).send(champions);
        });
    }
    /**
     *  @swagger
     * /common/get-user-tournament-points/{tournamentId}/{userId}:
     *  get:
     *      description: Get User Tournament Points
     *      tags:
     *          - Common
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: courseId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getUserTournamentPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const points = yield this.commonService.getUserTournamentPoints(req.params.tournamentId, req.params.userId);
            res.status(200).send(points);
        });
    }
    /**
     * @swagger
     * /common/save-course-ratings/courseId:
     *  post:
     *      description: Save Course Ratings
     *      tags:
     *          - Common
     *      consumes:
     *          - application/json
     *      produces:
     *          - application/json
     *      parameters:
     *        - in: body
     *          name: golf course details
     *          description: The user to create.
     *          schema:
     *              type: object
     *              properties:
     *                  _id:
     *                      type: string
     *                  name:
     *                      type: string
     *                  numberOfHoles:
     *                      type: string
     *                  type:
     *                      type: string
     *                  par:
     *                      type: string
     *                  rating:
     *                      type: string
     *                  slope:
     *                      type: string
     *                  length:
     *                      type: string
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: object
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    saveCourseRatings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.courseId;
            const updatedCourse = yield this.commonService.saveCourseRatings(req.body, courseId);
            res.status(200).send(updatedCourse);
        });
    }
}
exports.CommonController = CommonController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2NvbnRyb2xsZXJzL2NvbW1vbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFpQztBQUVqQyxxQ0FBcUM7QUFDckMsZ0VBQTBFO0FBRzFFLE1BQWEsZ0JBQWdCO0lBR3pCLFlBQW9CLGFBQTJCO1FBQTNCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFBLDBDQUEwQixFQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLElBQUEsMENBQTBCLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdH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SUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtDQUVKO0FBcjRDRCw0Q0FxNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvY29tbW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcbmltcG9ydCB7IHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nIH0gZnJvbSBcIi4uLy4uL2hhbmRsZXJzL2Vycm9yLWhhbmRsZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9uQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tbW9uU2VydmljZTpDb21tb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gUm91dGVyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1jYXRlZ29yaWVzXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0Q2F0ZWdvcmllcywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvY3JlYXRlLWludml0ZVwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmNyZWF0ZUludml0ZSwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtaW52aXRlLWRldGFpbHMvOmludml0ZUlkXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0SW52aXRlRGV0YWlscywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtY2VsZWItaW5kZXgtcmFua2luZ1wiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldENlbGViSW5kZXhSYW5raW5nLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2ludml0YXRpb24tdXNlZC86aW52aXRlSWQvOnVzZXJJZFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmludml0YXRpb25Vc2VkLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2ludml0YXRpb24tZGVjbGluZWQvOmludml0ZUlkXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuaW52aXRhdGlvbkRlY2xpbmVkLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi92ZXJpZnktaW52aXRlZS86aW52aXRlSWRcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy52ZXJpZnlJbnZpdGVlLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1hbGwtZ29sZi1jb3Vyc2VzXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0QWxsR29sZkNvdXJzZXMsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvZmluZC1nb2xmLWNvdXJzZXMvOnNlYXJjaFN0clwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmZpbmRHb2xmQ291cnNlcywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9maW5kLWdvbGYtY2x1YnMvOnNlYXJjaFN0ci86Y291bnRyeUNvZGVcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5maW5kR29sZkNsdWJzLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1nb2xmLWNsdWItaW5mby86Y2x1YklkXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0Q2x1YkluZm9CeUlkLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1nb2xmLWNvdXJzZS1pbmZvLzpjb3Vyc2VJZFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldENvdXJzZUluZm9CeUlkLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi91cGRhdGUtZ29sZi1jb3Vyc2VcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy51cGRhdGVHb2xmQ291cnNlLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi91cGRhdGUtZ29sZi1jbHViLWNvdXJzZVwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnVwZGF0ZUNsdWJDb3Vyc2VEZXRhaWxzLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dvbGYtY291cnNlLXNjb3JlY2FyZC86Y291cnNlSWRcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRDb3Vyc2VTY29yZUNhcmQsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5kZWxldGUoXCIvZGVsZXRlLWdvbGYtY291cnNlLzpjb3Vyc2VJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmRlbGV0ZUdvbGZDb3Vyc2UsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5kZWxldGUoXCIvZGVsZXRlLWdvbGYtY2x1Yi86Y2x1YklkXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZGVsZXRlR29sZkNsdWIsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvZ2V0LWFsbC1pbnZpdGVlcy86ZnJvbVwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldEFsbEludml0ZWVzLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1pbnZpdGVlcy1ieS1jb3VudHJ5Lzpjb3VudHJ5Q29kZVwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldEludml0ZWVzQnlDb3VydHJ5LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1DZWxlYnJpdHktdHlwZXNcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRDZWxlYnJpdHlUeXBlcywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvbm90aWZ5LXNpbmdsZS1jbHViXCIscGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMubm90aWZ5U2luZ2xlQ2x1YiwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvbm90aWZ5LWFsbC1jbHViXCIscGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMubm90aWZ5QWxsQ2x1YiwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtYWxsLXRvdXJuYW1lbnRcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRBbGxUb3VybmFtZW50LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZGVsZXRlKFwiL2RlbGV0ZS1pbnZpdGVlLzppbnZpdGVJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmRlbGV0ZUludml0ZWUsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvZ2V0LWNoYWxsZW5nZXJzXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0Q2hhbGxlbmdlcnMsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvZ2V0LWVudGVyZWQtdG91cm5hbWVudHMvOnVzZXJJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldEVudGVyZWRUb3VybmFtZW50cywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtdG91cm5hbWVudC1lbnRyaWVzLzp0b3VybmFtZW50SWRcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRUb3VybmFtZW50RW50cmllcywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvYWRkLWNoYWxsZW5nZXJzLzp0b3VybmFtZW50SWRcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5hZGRDaGFsbGVuZ2VycywgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmRlbGV0ZShcIi9kZWxldGUtdG91cm5hbWVudC86dG91cm5hbWVudElkXCIscGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZGVsZXRlVG91cm5hbWVudCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmRlbGV0ZShcIi9sZWF2ZS10b3VybmFtZW50Lzp0b3VybmFtZW50SWQvOnVzZXJJZFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmxlYXZlVG91cm5hbWVudCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtYWxsLXBsYXllcnNcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRBbGxQbGF5ZXJzLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZGVsZXRlKFwiL2RlbGV0ZS1wbGF5ZXIvOnVzZXJJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmRlbGV0ZVBsYXllckJ5QWRtaW4sIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiL2FkZC1nb2xmLWNsdWJcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5hZGRHb2xmQ2x1YiwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvbmVlZC1oZWxwXCIscGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMubmVlZEhlbHAsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvZ2V0LWFtYXRldXItdG9rZW5zLzp1c2VySWRcIixwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRBbWF0ZXVyVG9rZW5zLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC1jbHViLWNoYW1wc1wiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldENsdWJDaGFtcHMsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiL2FkZC1jaGFtcGlvblwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmFkZENvdW50cnlDaGFtcGlvbiwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9nZXQtY2hhbXBpb25zLzpjb3VudHJ5Q29kZVwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldENvdW50cnlDaGFtcGlvbnMsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiL2hlbHAtc3VwcG9ydFwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmhlbHBTdXBwb3J0LCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2dldC11c2VyLXRvdXJuYW1lbnQtcG9pbnRzLzp0b3VybmFtZW50SWQvOnVzZXJJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldFVzZXJUb3VybmFtZW50UG9pbnRzLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi9zYXZlLWNvdXJzZS1yYXRpbmdzLzpjb3Vyc2VJZFwiLHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImp3dFwiLCB7IHNlc3Npb246IGZhbHNlIH0pLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnNhdmVDb3Vyc2VSYXRpbmdzLCB0aGlzKSk7XHJcblxyXG4gICAgXHJcbiAgICB9ICAgXHJcblxyXG4gICAgcHVibGljIGdldFJvdXRlcigpOiBSb3V0ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC1jYXRlZ29yaWVzLzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIGFsbCBjYXRlZ29yaWVzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDYXRlZ29yaWVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLyogY29uc3QgY2F0ZWdvcmllcyA9IGF3YWl0IENhdGVnb3J5U2NoZW1hLmZpbmQoe30pO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGNhdGVnb3JpZXMubWFwKGMgPT4gYy5uYW1lKSk7ICovXHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmdldENhdGVnb3JpZXMocmVxLHJlcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vY3JlYXRlLWludml0ZS86XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IENyZWF0ZSBpbnZpdGVcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogdXNlclxyXG4gICAgICogICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICByZXF1aXJlZDpcclxuICAgICAqICAgICAgICAgIC0gZmlyc3ROYW1lXHJcbiAgICAgKiAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgIGZpcnN0TmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTpzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICBsYXN0TmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTpzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICBjYXRlZ29yeTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTpzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOnN0cmluZ1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgY3JlYXRlSW52aXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIC8qIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBDYXRlZ29yeVNjaGVtYS5maW5kKHt9KTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChjYXRlZ29yaWVzLm1hcChjID0+IGMubmFtZSkpOyAqL1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuY3JlYXRlSW52aXRlKHJlcSxyZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZ2V0LWludml0ZS1kZXRhaWxzL3tpbnZpdGVJZH0gOlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldHMgYWxsIGNhdGVnb3JpZXNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldEludml0ZURldGFpbHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmdldEludml0ZURldGFpbHMocmVxLHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtY2VsZWItaW5kZXgtcmFua2luZy86XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyBhbGwgY2F0ZWdvcmllc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGdldENlbGViSW5kZXhSYW5raW5nKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIC8qIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBDYXRlZ29yeVNjaGVtYS5maW5kKHt9KTsgXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoY2F0ZWdvcmllcy5tYXAoYyA9PiBjLm5hbWUpKTsgKi9cclxuICAgICAgICBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0Q2VsZWJJbmRleFJhbmtpbmcocmVxLHJlcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vaW52aXRhdGlvbi11c2VkL3tpbnZpdGVJZH0ve3VzZXJJZH06XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyBhbGwgY2F0ZWdvcmllc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGludml0YXRpb25Vc2VkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIC8qIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBDYXRlZ29yeVNjaGVtYS5maW5kKHt9KTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChjYXRlZ29yaWVzLm1hcChjID0+IGMubmFtZSkpOyAqL1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5pbnZpdGF0aW9uVXNlZChyZXEscmVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2ludml0YXRpb24tZGVjbGluZWQve2ludml0ZUlkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBpbnZpdGF0aW9uIGRlY2xpbmVcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBpbnZpdGF0aW9uRGVjbGluZWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmludml0YXRpb25EZWNsaW5lZChyZXEscmVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC1hbGwtZ29sZi1jb3Vyc2VzLzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXQgQWxsIEdvbGYgQ291cnNlc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsR29sZkNvdXJzZXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgYWxsR29sZkNvdXJzZXMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0QWxsR29sZkNvdXJzZXMoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhbGxHb2xmQ291cnNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9maW5kLWdvbGYtY291cnNlcy97c2VhcmNoU3RyfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBmaW5kIGdvbGYgY291cnNlc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogc2VhcmNoU3RyXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZmluZEdvbGZDb3Vyc2VzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGFsbEdvbGZDb3Vyc2VzID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmZpbmRHb2xmQ291cnNlcyhyZXEucGFyYW1zLnNlYXJjaFN0cik7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYWxsR29sZkNvdXJzZXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC1nb2xmLWNsdWItaW5mby97Y2x1YklkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBmaW5kIGdvbGYgY291cnNlc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY2x1YklkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDbHViSW5mb0J5SWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgYWxsR29sZkNvdXJzZXMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0Q2x1YkluZm9CeUlkKHJlcS5wYXJhbXMuY2x1YklkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhbGxHb2xmQ291cnNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtZ29sZi1jb3Vyc2UtaW5mby97Y291cnNlSWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IGZpbmQgZ29sZiBjb3Vyc2VzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjbHViSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRDb3Vyc2VJbmZvQnlJZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBnb2xmQ291cnNlID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmdldENvdXJzZUluZm9CeUlkKHJlcS5wYXJhbXMuY291cnNlSWQpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGdvbGZDb3Vyc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vdXBkYXRlLWdvbGYtY291cnNlLzpcclxuICAgICAqICBwb3N0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogVXBkYXRlIEdvbGYgQ291cnNlXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBjb25zdW1lczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgIC0gaW46IGJvZHlcclxuICAgICAqICAgICAgICAgIG5hbWU6IGdvbGYgY291cnNlIGRldGFpbHNcclxuICAgICAqICAgICAgICAgIGRlc2NyaXB0aW9uOiBUaGUgdXNlciB0byBjcmVhdGUuXHJcbiAgICAgKiAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgX2lkOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIG5hbWU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZIb2xlczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHBhcjpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICByYXRpbmc6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgc2xvcGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbGVuZ3RoOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVHb2xmQ291cnNlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRHb2xmQ291cnNlID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLnVwZGF0ZUdvbGZDb3Vyc2UocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1cGRhdGVkR29sZkNvdXJzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dvbGYtY291cnNlLXNjb3JlY2FyZC97Y291cnNlSWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IGZpbmQgZ29sZiBjb3Vyc2VzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjb3Vyc2VJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q291cnNlU2NvcmVDYXJkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGNvdXJzZVNjb3JlY2FyZCA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRDb3Vyc2VTY29yZUNhcmQocmVxLnBhcmFtcy5jb3Vyc2VJZCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoY291cnNlU2NvcmVjYXJkKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZGVsZXRlLWdvbGYtY291cnNlL3tjb3Vyc2VJZH06XHJcbiAgICAgKiAgZGVsZXRlOlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogRGVsZXRlIEdvbGYgQ291cnNlXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjb3Vyc2VJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGRlbGV0ZUdvbGZDb3Vyc2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZENvdXJzZSA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5kZWxldGVHb2xmQ291cnNlKHJlcS5wYXJhbXMuY291cnNlSWQpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGRlbGV0ZWRDb3Vyc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2RlbGV0ZS1nb2xmLWNsdWIve2NsdWJJZH06XHJcbiAgICAgKiAgZGVsZXRlOlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogRGVsZXRlIEdvbGYgQ291cnNlXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjb3Vyc2VJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGRlbGV0ZUdvbGZDbHViKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZWRDbHViID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmRlbGV0ZUdvbGZDbHViKHJlcS5wYXJhbXMuY2x1YklkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChkZWxldGVkQ2x1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9maW5kLWdvbGYtY2x1YnMve3NlYXJjaFN0cn0ve2NvdW50cnlDb2RlfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBmaW5kIGdvbGYgY2x1YnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHNlYXJjaFN0clxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY291bnRyeUNvZGVcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBmaW5kR29sZkNsdWJzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGFsbEdvbGZDbHVicyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5maW5kR29sZkNsdWJzKHJlcS5wYXJhbXMuc2VhcmNoU3RyLHJlcS5wYXJhbXMuY291bnRyeUNvZGUpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGFsbEdvbGZDbHVicyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtYWxsLWludml0ZWVzLzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIGFsbCBpbnZpdGVlc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGdldEFsbEludml0ZWVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGludml0ZWVzID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmdldEFsbEludml0ZWVzKHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoaW52aXRlZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZ2V0LUNlbGVicml0eS10eXBlcy86XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyBhbGwgQ2VsZWJyaXR5IHR5cGVzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZ2V0Q2VsZWJyaXR5VHlwZXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3Q+Pj4gJyxyZXEudXNlcik7XHJcbiAgICAgICAgY29uc3QgQ2VsZWJyaXR5VHlwZXMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0Q2VsZWJyaXR5VHlwZXMoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChDZWxlYnJpdHlUeXBlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi91cGRhdGUtZ29sZi1jbHViLWNvdXJzZS86XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IFVwZGF0ZSBHb2xmIENvdXJzZVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgY29uc3VtZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAtIGluOiBib2R5XHJcbiAgICAgKiAgICAgICAgICBuYW1lOiBnb2xmIGNvdXJzZSBkZXRhaWxzXHJcbiAgICAgKiAgICAgICAgICBkZXNjcmlwdGlvbjogVGhlIHVzZXIgdG8gY3JlYXRlLlxyXG4gICAgICogICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gICAgICogICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIF9pZDpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBuYW1lOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIG51bWJlck9mSG9sZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBwYXI6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcmF0aW5nOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHNsb3BlOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIGxlbmd0aDpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2x1YkNvdXJzZURldGFpbHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlZEdvbGZDb3Vyc2UgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UudXBkYXRlQ2x1YkNvdXJzZURldGFpbHMocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1cGRhdGVkR29sZkNvdXJzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9ub3RpZnktc2luZ2xlLWNsdWIvOlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGUgR29sZiBDb3Vyc2VcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBub3RpZnlTaW5nbGVDbHViKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRHb2xmQ291cnNlID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLm5vdGlmeVNpbmdsZUNsdWIocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1cGRhdGVkR29sZkNvdXJzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9ub3RpZnktc2luZ2xlLWNsdWIvOlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGUgR29sZiBDb3Vyc2VcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBub3RpZnlBbGxDbHViKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRHb2xmQ291cnNlID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLm5vdGlmeUFsbENsdWIocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1cGRhdGVkR29sZkNvdXJzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtYWxsLXRvdXJuYW1lbnQvOlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldHMgYWxsIHRvdXJuYW1lbnRcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRBbGxUb3VybmFtZW50KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JlcXVlc3Q+Pj4gJyxyZXEudXNlcik7XHJcbiAgICAgICAgY29uc3QgdG91cm5tZW50cyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRBbGxUb3VybmFtZW50KCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQodG91cm5tZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtaW52aXRlZXMtYnktY291bnRyeS97Y291bnRyeUNvZGV9IDpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIGFsbCBpbnZpdGVlcyBieSBjb3VudHJ5XHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZ2V0SW52aXRlZXNCeUNvdXJ0cnkocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgaW52aXRlZXMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0SW52aXRlZXNCeUNvdXJ0cnkocmVxLnBhcmFtcy5jb3VudHJ5Q29kZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoaW52aXRlZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vdmVyaWZ5LWludml0ZWUvezppbnZpdGVJZH06XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyBhbGwgdG91cm5hbWVudFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIHZlcmlmeUludml0ZWUocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmVxdWVzdD4+PiAnLHJlcS51c2VyKTtcclxuICAgICAgICBjb25zdCBpbnZpdGVlID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLnZlcmlmeUludml0ZWUocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7c2F2ZWRJbnZpdGU6aW52aXRlZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2RlbGV0ZS1pbnZpdGVlL3tpbnZpdGVJZH06XHJcbiAgICAgKiAgZGVsZXRlOlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogRGVsZXRlIEdvbGYgQ291cnNlXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjb3Vyc2VJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGRlbGV0ZUludml0ZWUocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZEludml0ZWUgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZGVsZXRlSW52aXRlZShyZXEucGFyYW1zLmludml0ZUlkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChkZWxldGVkSW52aXRlZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZ2V0LWNoYWxsZW5nZXJzLyA6XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyBhbGwgY2hhbGxlbmdlcnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRDaGFsbGVuZ2VycyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBjaGFsbGVuZ2VycyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRDaGFsbGVuZ2VycygpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGNoYWxsZW5nZXJzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9nZXQtZW50ZXJlZC10b3VybmFtZW50cy97dXNlcklkfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIGVudGVyZWQgdG91cm5hbWVudHNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRFbnRlcmVkVG91cm5hbWVudHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0RW50ZXJlZFRvdXJuYW1lbnRzKHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQodG91cm5hbWVudHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC10b3VybmFtZW50LWVudHJpZXMve3RvdXJuYW1lbnRJZH06XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyB0b3VybmFtZW50IGVudHJpZXNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRUb3VybmFtZW50RW50cmllcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50cyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRUb3VybmFtZW50RW50cmllcyhyZXEpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHRvdXJuYW1lbnRzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vYWRkLWNoYWxsZW5nZXJzL3t0b3VybmFtZW50SWR9OlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBBZGQgQ2hhbGxlbmdlcnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgICBwdWJsaWMgYXN5bmMgYWRkQ2hhbGxlbmdlcnMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgdWRwYXRlVG91cm5hbWVudCA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5hZGRDaGFsbGVuZ2VycyhyZXEpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVkcGF0ZVRvdXJuYW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2RlbGV0ZS10b3VybmFtZW50L3t0b3VybmFtZW50SWR9OlxyXG4gICAgICogIGRlbGV0ZTpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IERlbGV0ZSBHb2xmIENvdXJzZVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY291cnNlSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBkZWxldGVUb3VybmFtZW50KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZWRUb3VyID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmRlbGV0ZVRvdXJuYW1lbnQocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChkZWxldGVkVG91cik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2xlYXZlLXRvdXJuYW1lbnQve3RvdXJuYW1lbnRJZH0ve3VzZXJJZH06XHJcbiAgICAgKiAgZGVsZXRlOlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogTGVhdmUgVG91cm5hbWVudFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY291cnNlSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBsZWF2ZVRvdXJuYW1lbnQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZFRvdXIgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UubGVhdmVUb3VybmFtZW50KHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoZGVsZXRlZFRvdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC1hbGwtcGxheWVycy86XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogTGVhdmUgVG91cm5hbWVudFxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY291cnNlSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRBbGxQbGF5ZXJzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuZ2V0QWxsUGxheWVycygpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHBsYXllcnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9kZWxldGUtcGxheWVyL3t1c2VySWR9OlxyXG4gICAgICogIGRlbGV0ZTpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IExlYXZlIFRvdXJuYW1lbnRcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdXJzZUlkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgZGVsZXRlUGxheWVyQnlBZG1pbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBkZWxldGVkUGxheWVyID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmRlbGV0ZVBsYXllckJ5QWRtaW4ocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChkZWxldGVkUGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2FkZC1nb2xmLWNsdWIvOlxyXG4gICAgICogIHBvc3Q6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGUgR29sZiBDb3Vyc2VcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBhZGRHb2xmQ2x1YihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBuZXdDbHViID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmFkZEdvbGZDbHViKHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQobmV3Q2x1Yik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9uZWVkLWhlbHA6XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IFVwZGF0ZSBHb2xmIENvdXJzZVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgY29uc3VtZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAtIGluOiBib2R5XHJcbiAgICAgKiAgICAgICAgICBuYW1lOiBnb2xmIGNvdXJzZSBkZXRhaWxzXHJcbiAgICAgKiAgICAgICAgICBkZXNjcmlwdGlvbjogVGhlIHVzZXIgdG8gY3JlYXRlLlxyXG4gICAgICogICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gICAgICogICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIF9pZDpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBuYW1lOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIG51bWJlck9mSG9sZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBwYXI6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcmF0aW5nOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHNsb3BlOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIGxlbmd0aDpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgbmVlZEhlbHAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UubmVlZEhlbHAocmVxKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChyZXNwb25zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2NvbW1vbi9oZWxwLXN1cHBvcnQ6XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEhlbHAgYW5kIFN1cHBvcnRcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBoZWxwU3VwcG9ydChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5oZWxwU3VwcG9ydChyZXEpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZ2V0LWFtYXRldXItdG9rZW5zL3t1c2VySWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldCBBbWF0ZXVyIFRva2Vuc1xyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBDb21tb25cclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogY291cnNlSWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRBbWF0ZXVyVG9rZW5zKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHRva2VucyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRBbWF0ZXVyVG9rZW5zKHJlcS5wYXJhbXMudXNlcklkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh0b2tlbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiAgQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vZ2V0LWNsdWItY2hhbXBzLzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXQgQ2x1YiBDaGFtcGlvbnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdXJzZUlkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgICAgcHVibGljIGFzeW5jIGdldENsdWJDaGFtcHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbXBpb25zID0gYXdhaXQgdGhpcy5jb21tb25TZXJ2aWNlLmdldENsdWJDaGFtcHMoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChjaGFtcGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb21tb24vYWRkLWNoYW1waW9uLzpcclxuICAgICAqICBwb3N0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogQWRkIENvdW50cnkgQ2hhbXBpb25cclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBhZGRDb3VudHJ5Q2hhbXBpb24ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbXBpb24gPSBhd2FpdCB0aGlzLmNvbW1vblNlcnZpY2UuYWRkQ291bnRyeUNoYW1waW9uKHJlcSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoY2hhbXBpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC1jaGFtcGlvbnMve2NvdW50cnlDb2RlfTpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXQgQ291bnRyeSBDaGFtcGlvbnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdXJzZUlkXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcGF0aFxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDb3VudHJ5Q2hhbXBpb25zKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IGNoYW1waW9ucyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRDb3VudHJ5Q2hhbXBpb25zKHJlcS5wYXJhbXMuY291bnRyeUNvZGUpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGNoYW1waW9ucyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL2dldC11c2VyLXRvdXJuYW1lbnQtcG9pbnRzL3t0b3VybmFtZW50SWR9L3t1c2VySWR9OlxyXG4gICAgICogIGdldDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEdldCBVc2VyIFRvdXJuYW1lbnQgUG9pbnRzXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIENvbW1vblxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiBjb3Vyc2VJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFzeW5jIGdldFVzZXJUb3VybmFtZW50UG9pbnRzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5nZXRVc2VyVG91cm5hbWVudFBvaW50cyhyZXEucGFyYW1zLnRvdXJuYW1lbnRJZCxyZXEucGFyYW1zLnVzZXJJZCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQocG9pbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvY29tbW9uL3NhdmUtY291cnNlLXJhdGluZ3MvY291cnNlSWQ6XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IFNhdmUgQ291cnNlIFJhdGluZ3NcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ29tbW9uXHJcbiAgICAgKiAgICAgIGNvbnN1bWVzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgLSBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgbmFtZTogZ29sZiBjb3Vyc2UgZGV0YWlsc1xyXG4gICAgICogICAgICAgICAgZGVzY3JpcHRpb246IFRoZSB1c2VyIHRvIGNyZWF0ZS5cclxuICAgICAqICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICAgICAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICBfaWQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgbmFtZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHR5cGU6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgICAgICAgcGFyOlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJhdGluZzpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBzbG9wZTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICAgICAgICBsZW5ndGg6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBzYXZlQ291cnNlUmF0aW5ncyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBjb3Vyc2VJZCA9IHJlcS5wYXJhbXMuY291cnNlSWQ7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlZENvdXJzZSA9IGF3YWl0IHRoaXMuY29tbW9uU2VydmljZS5zYXZlQ291cnNlUmF0aW5ncyhyZXEuYm9keSxjb3Vyc2VJZCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQodXBkYXRlZENvdXJzZSk7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==