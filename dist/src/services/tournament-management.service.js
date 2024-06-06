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
exports.TournamentManagementService = void 0;
const logging_1 = require("../core/logging");
const error_builder_1 = require("../core/errors/error-builder");
const error_type_enum_1 = require("../core/errors/error-type.enum");
const error_message_enum_1 = require("../types/error-message.enum");
const tournament_1 = require("../types/tournament");
const _ = require("lodash");
const filter_builder_1 = require("../core/dao/filter/filter-builder");
const greater_than_or_equal_filter_1 = require("../core/dao/filter/greater-than-or-equal.filter");
const less_than_or_equal_filter_1 = require("../core/dao/filter/less-than-or-equal.filter");
const user_1 = require("../types/user");
const golf_division_enum_1 = require("../types/golf-division.enum");
const golf_course_1 = require("../types/golf-course");
const tournament_entry_model_1 = require("../models/tournament-entry.model");
const tournament_leaderboard_model_1 = require("../models/tournament-leaderboard.model");
const latest_rank_model_1 = require("../models/latest-rank.model");
const golf_course_model_1 = require("../models/golf-course.model");
const user_model_1 = require("../models/user.model");
const rankPointFieldDtls = require("../../rank-point-field-details.json");
const pointsTable = require("../../celebrity-champ-ranking-points.json");
const tournament_model_1 = require("../models/tournament.model");
class TournamentManagementService {
    constructor(tournamentDAO, tournamentEntryDAO, tournamentResultDAO, tournamentScorecardDAO, tournamentLeaderboardDAO) {
        this.tournamentDAO = tournamentDAO;
        this.tournamentEntryDAO = tournamentEntryDAO;
        this.tournamentResultDAO = tournamentResultDAO;
        this.tournamentScorecardDAO = tournamentScorecardDAO;
        this.tournamentLeaderboardDAO = tournamentLeaderboardDAO;
    }
    /**
     * Get Tournaments
     * @async
     * @returns {Promise<Tournament[]>} List of tournaments.
     */
    getTournaments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournaments = yield this.tournamentDAO.getAll();
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Create Tournaments
     * @async
     * @returns {Promise<Tournament>} List of tournaments.
     */
    createTournament(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentForm = req.body;
                tournamentForm['createdBy'] = req.user.sub;
                const tournaments = yield this.tournamentDAO.create(tournamentForm);
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Create Tournaments
     * @async
     * @returns {Promise<Tournament>} List of tournaments.
     */
    updateTournament(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentForm = req.body;
                const tournaments = yield this.tournamentDAO.update(tournamentForm);
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get Available Tournaments
     * @async
     * @returns {Promise<Tournament[]>} List of available tournaments.
     */
    getAvailableTournaments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("regStartDate", new greater_than_or_equal_filter_1.GreaterThanOrEqualFilter(new Date()))
                    .addFilter("regEndDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date()))
                    .addFilter("endDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date()))
                    .buildAll();
                const tournaments = yield this.tournamentDAO.getAvailableTournaments();
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get Finished Tournaments
     * @async
     * @returns {Promise<Tournament[]>} List of available tournaments.
     */
    getFinishedTournaments(isResultProcessed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("isResultProcessed", isResultProcessed)
                    .addFilter("endDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date(Date.now() - (3600 * 1000 * 24))))
                    .buildAll();
                const tournaments = yield this.tournamentDAO.getMultipleByFilters(filters);
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get Finished Tournaments by division
     * @async
     * @returns {Promise<Tournament[]>} List of available tournaments.
     */
    getFinishedTournamentsByDivision(isResultProcessed, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filters;
                if (division === 'All') {
                    filters = new filter_builder_1.FilterBuilder()
                        .addFilter("isResultProcessed", isResultProcessed)
                        .addFilter("endDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date(Date.now() - (3600 * 1000 * 24))))
                        .buildAll();
                }
                else {
                    filters = new filter_builder_1.FilterBuilder()
                        .addFilter("isResultProcessed", isResultProcessed)
                        .addFilter("endDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date(Date.now() - (3600 * 1000 * 24))))
                        .addFilter("divisions", division)
                        .buildAll();
                }
                const tournaments = yield this.tournamentDAO.getMultipleByFilters(filters);
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get Tournament
     * @async
     * @returns {Promise<Tournament>} Tournament object.
     */
    getTournament(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournament = yield this.tournamentDAO.getTournament(tournamentId);
                return Promise.resolve(tournament);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Enter tournament
     * @async
     * @returns {Promise<TournamentEntry>} Tournament Entry
     */
    enterTournament(userID, tournamentID, courseID, division, gender, handicapIndex, tee, teamName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tournament = yield this.tournamentDAO.getTournament(tournamentID);
                /* const entriesCount = await TournamentEntrySchema.find({tournamentId:tournament._id}).count();
                if(entriesCount > 3) {
                    tournament = await this.createNewTournament(tournament);
                    tournamentID = tournament._id;
                } */
                // Validate tournament ID
                if (!tournament) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Range, error_message_enum_1.ErrorMessage.InvalidTournamentId));
                }
                // Validate course ID
                /* const courseIds = _.map(tournament.courses, (tournamentGolfCourse) => {
                    return tournamentGolfCourse.course._id.toString();
                });
                if (!_.includes(courseIds, courseID.toString())) {
                    return Promise.reject(ErrorBuilder.generate(ErrorType.Range, ErrorMessage.InvalidCourseId));
                } */
                // Validate division
                if (!_.includes(Object.values(tournament.divisions), division.toString())) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Range, error_message_enum_1.ErrorMessage.InvalidTournamentDivision));
                }
                // Validate entry
                const existingTournamentEntry = yield this.tournamentEntryDAO.getByFilters(new filter_builder_1.FilterBuilder()
                    .addFilter("userId", userID)
                    .addFilter("tournamentId", tournamentID)
                    .addFilter("courseId", courseID)
                    .buildAll());
                if (existingTournamentEntry) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Exists, error_message_enum_1.ErrorMessage.TournamentEntryExists));
                }
                /* const enteredCourse = _.find(tournament.courses, (tournamentGolfCourse) => {
                    return tournamentGolfCourse.course._id == courseID;
                }); */
                const enteredCourse = yield golf_course_model_1.GolfCourseSchema.findById(courseID).exec();
                //console.log('renter',enteredCourse);
                const enteredTee = _.find(enteredCourse.tees, (golfTee) => {
                    return golfTee._id == tee;
                });
                const courseRating = Number(enteredTee.courseRating);
                const slopeRating = Number(enteredTee.slopeRating);
                const par = Number(enteredTee.par);
                const holes = enteredTee.holes;
                //Course Handicap = (Handicap Index * Slope Rating / 113) + (CR - Par)
                const courseIndex = Math.round((Number(handicapIndex) * slopeRating / 113) + (courseRating - par));
                // Create empty scorecard
                const tournamentScorecard = {
                    userId: userID,
                    tournamentId: tournamentID,
                    course: golf_course_1.GolfCourse.fromId(courseID),
                    division: division,
                    handicapIndex: handicapIndex,
                    courseIndex: courseIndex,
                    tee: enteredTee.name,
                    round: 1,
                    teeId: enteredTee._id,
                    gender: enteredTee.gender,
                    teamName: teamName ? teamName : undefined
                };
                const storedScorecard = yield this.tournamentScorecardDAO.create(tournamentScorecard);
                // Create empty leaderboard record
                const tournamentLeaderboard = {
                    user: user_1.User.fromId(userID),
                    tournamentId: tournamentID,
                    courseId: courseID,
                    division: division,
                    total: courseIndex,
                    holes: 0,
                    round: 1,
                    teamName: teamName ? teamName : undefined
                };
                const storedLeaderboard = yield this.tournamentLeaderboardDAO.create(tournamentLeaderboard);
                // Tournament entry
                const tournamentEntry = {
                    userId: userID,
                    tournamentId: tournamentID,
                    courseId: courseID,
                    scorecardId: storedScorecard._id,
                    leaderboardId: storedLeaderboard._id,
                    division: division,
                    handicapIndex: handicapIndex,
                    tee: enteredTee.name,
                    gender: gender,
                    teamName: teamName ? teamName : undefined
                };
                const storedTournamentEntry = yield this.tournamentEntryDAO.create(tournamentEntry);
                if (accessToken) {
                    let user = yield user_model_1.UserSchema.findById(userID);
                    const tokenIndex = user.amateurTokens.findIndex(o => o.includes(accessToken));
                    if (tokenIndex > -1) {
                        user.amateurTokens.splice(tokenIndex, 1);
                        yield user_model_1.UserSchema.findOneAndUpdate({
                            _id: user._id
                        }, {
                            $set: { amateurTokens: user.amateurTokens }
                        }, {
                            new: true
                        }).exec();
                    }
                }
                return Promise.resolve(storedTournamentEntry);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    //Check tournament entry if greater than 50 then create new tournament with tournamemnt name - 1,2,3...
    createNewTournament(tournament) {
        return __awaiter(this, void 0, void 0, function* () {
            /* const entriesCount = await TournamentEntrySchema.find({tournamentId:tournament._id}).count();
            console.log('entries Count',entriesCount);
            if(entriesCount > 3) { */
            let tournamentName = tournament['name'];
            const arr = tournamentName.split(' - ');
            let newName = '';
            if (arr.length > 1) {
                const num = Number(arr[1]) + 1;
                newName = tournament['name'] + ' - ' + num;
            }
            else {
                newName = tournament['name'] + ' - ' + 1;
            }
            const checkNewTournament = yield tournament_model_1.TournamentSchema.findOne({ 'name': newName }).exec();
            if (checkNewTournament) {
                return checkNewTournament;
            }
            else {
                let newTournament = {};
                newTournament.name = newName;
                newTournament.regStartDate = tournament.regStartDate;
                newTournament.regEndDate = tournament.regEndDate;
                newTournament.startDate = tournament.startDate;
                newTournament.endDate = tournament.endDate;
                newTournament.divisions = tournament.divisions;
                newTournament.maxPlayers = tournament.maxPlayers;
                newTournament.challengers = tournament.challengers;
                newTournament.courses = tournament.courses;
                newTournament.type = tournament.type;
                //console.log('newTournament>>',newTournament);
                return yield this.tournamentDAO.create(newTournament);
            }
            //return newTournament;
            /* } else {
                return tournament;
            } */
        });
    }
    /**
     * Enter tournament
     * @async
     * @returns {Promise<TournamentEntry>} Tournament Entry
     */
    updateTournamentEntry(userID, tournamentID, courseID, division, gender, handicapIndex, tee, teamName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournament = yield this.tournamentDAO.getTournament(tournamentID);
                // Validate tournament ID
                if (!tournament) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Range, error_message_enum_1.ErrorMessage.InvalidTournamentId));
                }
                // Validate division
                if (!_.includes(Object.values(tournament.divisions), division.toString())) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Range, error_message_enum_1.ErrorMessage.InvalidTournamentDivision));
                }
                // Validate entry
                const existingTournamentEntry = yield this.tournamentEntryDAO.getByFilters(new filter_builder_1.FilterBuilder()
                    .addFilter("userId", userID)
                    .addFilter("tournamentId", tournamentID)
                    .buildAll());
                if (!existingTournamentEntry) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.TournamentEntryNotExists));
                }
                /*  const enteredCourse = _.find(tournament.courses, (tournamentGolfCourse) => {
                     return tournamentGolfCourse.course._id == courseID;
                 }); */
                const enteredCourse = yield golf_course_model_1.GolfCourseSchema.findById(courseID).exec();
                const enteredTee = _.find(enteredCourse.tees, (golfTee) => {
                    return golfTee._id == tee;
                });
                const courseRating = Number(enteredTee.courseRating);
                const slopeRating = Number(enteredTee.slopeRating);
                const par = Number(enteredTee.par);
                const holes = enteredTee.holes;
                //Course Handicap = (Handicap Index * Slope Rating / 113) + (CR - Par)
                const courseIndex = Math.round((Number(handicapIndex) * slopeRating / 113) + (courseRating - par));
                let storedScorecard = yield this.tournamentScorecardDAO.getByID(existingTournamentEntry.scorecardId);
                storedScorecard['course'] = golf_course_1.GolfCourse.fromId(courseID);
                storedScorecard['handicapIndex'] = handicapIndex;
                storedScorecard['courseIndex'] = courseIndex;
                storedScorecard['tee'] = enteredTee.name;
                storedScorecard['teeId'] = enteredTee._id;
                storedScorecard['teamName'] = teamName ? teamName : undefined;
                yield this.tournamentScorecardDAO.updateAny(storedScorecard);
                console.log('udpate scrorecard:::', storedScorecard);
                const storedLeaderboard = yield this.tournamentLeaderboardDAO.getByID(existingTournamentEntry.leaderboardId);
                storedLeaderboard['courseId'] = courseID;
                storedLeaderboard['total'] = courseIndex;
                storedLeaderboard['teamName'] = teamName ? teamName : undefined;
                yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.findOneAndUpdate({
                    _id: storedLeaderboard._id,
                    user: storedLeaderboard.user
                }, {
                    $set: storedLeaderboard
                }, {
                    new: true
                }).exec();
                existingTournamentEntry['courseId'] = courseID;
                existingTournamentEntry['handicapIndex'] = handicapIndex;
                existingTournamentEntry['tee'] = enteredTee.name;
                existingTournamentEntry['teamName'] = teamName ? teamName : undefined;
                yield tournament_entry_model_1.TournamentEntrySchema.findOneAndUpdate({
                    _id: existingTournamentEntry._id,
                    userId: existingTournamentEntry.userId
                }, {
                    $set: existingTournamentEntry
                }, {
                    new: true
                }).exec();
                //await this.tournamentEntryDAO.update(existingTournamentEntry);
                console.log('udpate existingTournamentEntry:::', existingTournamentEntry);
                return Promise.resolve(existingTournamentEntry);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get user's tournament scorecard
     * @async
     * @returns {Promise<TournamentScorecard>} Tournament scorecard.
     */
    playNextRound(userID, tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("tournamentId", tournamentId)
                    .addFilter("userId", userID)
                    .buildAll();
                const tournamentScorecards = yield this.getAllRoundScorecard(userID, null, tournamentId); //await this.tournamentScorecardDAO.getMultipleByFilters(filters);
                const tournamentScorecard = tournamentScorecards[tournamentScorecards.length - 1];
                const nextRoundScorecard = {
                    userId: tournamentScorecard.userId,
                    tournamentId: tournamentScorecard.tournamentId,
                    course: tournamentScorecard.course,
                    division: tournamentScorecard.division,
                    handicapIndex: tournamentScorecard.handicapIndex,
                    courseIndex: tournamentScorecard.courseIndex,
                    tee: tournamentScorecard.tee,
                    teeId: tournamentScorecard.teeId,
                    gender: tournamentScorecard.gender,
                    round: tournamentScorecard['round'] + 1,
                    teamName: tournamentScorecard.teamName
                };
                const storedScorecard = yield this.tournamentScorecardDAO.create(nextRoundScorecard);
                /* const allRoundLeaderboards = await this.getAllRoundLeaderboard(userID,tournamentId); //await this.tournamentScorecardDAO.getMultipleByFilters(filters);
                const leaderboard = allRoundLeaderboards[allRoundLeaderboards.length - 1];
                const nextRoundLeaderboard = {
                    user : leaderboard.user,
                    tournamentId : leaderboard.tournamentId,
                    courseId : leaderboard.courseId,
                    division : leaderboard.division,
                    total : 0,
                    holes : 0,
                    teamName : leaderboard.teamName,
                    round : leaderboard['round'] + 1
                } as TournamentLeaderboard;
    
                await this.tournamentLeaderboardDAO.create(nextRoundLeaderboard); */
                return Promise.resolve(storedScorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get user's tournament scorecard
     * @async
     * @returns {Promise<TournamentScorecard>} Tournament scorecard.
     */
    getScorecard(userID, scorecardID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("_id", scorecardID)
                    .addFilter("userId", userID)
                    .buildAll();
                const tournamentScorecard = yield this.tournamentScorecardDAO.getByFilters(filters);
                if (!tournamentScorecard) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidScorecardId));
                }
                return Promise.resolve(tournamentScorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get user's tournament scorecard
     * @async
     * @returns {Promise<TournamentScorecard>} Tournament scorecard.
     */
    getPlayerScorecard(userID, tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentScorecard = yield this.tournamentScorecardDAO.getPlayerScorecard(userID, tournamentID);
                if (!tournamentScorecard) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidScorecardId));
                }
                return Promise.resolve(tournamentScorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get user's tournament scorecard
     * @async
     * @returns {Promise<TournamentScorecard>} Tournament scorecard.
     */
    getScorecardAndCourseData(userID, scorecardID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentScorecard = yield this.tournamentScorecardDAO.getScorecard(userID, scorecardID);
                if (!tournamentScorecard) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidScorecardId));
                }
                return Promise.resolve(tournamentScorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get user's tournament scorecard
     * @async
     * @returns {Promise<TournamentScorecard[]>} Tournament scorecard.
     */
    getAllRoundScorecard(userID, scorecardID, tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentScorecards = yield this.tournamentScorecardDAO.getAllRoundScorecard(userID, scorecardID, tournamentID);
                if (!tournamentScorecards) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidScorecardId));
                }
                return Promise.resolve(tournamentScorecards);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Update scorecard
     * @async
     * @returns {Promise<TournamentScorecard>} Updated tournament scorecard.
     */
    updateScorecard(userID, scorecardID, scores, leaderboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate scorecard ID
                const tournamentScorecard = yield this.tournamentScorecardDAO.getScorecard(userID, scorecardID);
                if (!tournamentScorecard) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidScorecardId));
                }
                // Update scorecard
                const updatedTournamentScorecard = yield this.tournamentScorecardDAO.updateScores(userID, scorecardID, scores);
                let enteredTee = _.find(tournamentScorecard.course.tees, (golfTee) => {
                    return golfTee._id === tournamentScorecard.teeId;
                });
                if (!enteredTee) {
                    enteredTee = _.find(tournamentScorecard.course.tees, (golfTee) => {
                        return golfTee.name === tournamentScorecard.tee && golfTee.gender === tournamentScorecard.gender;
                    });
                }
                if (!enteredTee) {
                    enteredTee = tournamentScorecard.course.tees[0];
                }
                const courseRating = Number(enteredTee.courseRating);
                const slopeRating = Number(enteredTee.slopeRating);
                const par = Number(enteredTee.par);
                const holes = enteredTee.holes;
                const allRoundScorecards = yield this.getAllRoundScorecard(userID, scorecardID, tournamentScorecard.tournamentId);
                const leaderboard = yield this.getLeaderboardById(leaderboardId);
                //Course Handicap = (Handicap Index * Slope Rating / 113) + (CR - Par)
                const courseIndex = Math.round((Number(tournamentScorecard.handicapIndex) * slopeRating / 113) + (courseRating - par));
                let totalPoints = 0;
                let numberOfPlayedHoles = 0;
                allRoundScorecards.forEach(element => {
                    const total = this.calculateTotal(element.scores, holes);
                    totalPoints = totalPoints + total.totalPoints + courseIndex;
                    numberOfPlayedHoles = numberOfPlayedHoles + total.numberOfPlayedHoles;
                });
                const currentRoundDetails = this.calculateTotal(scores, holes);
                let currentRound = allRoundScorecards.length;
                let currentRoundTotal = currentRoundDetails.totalPoints + courseIndex;
                let currentRoundHoles = currentRoundDetails.numberOfPlayedHoles;
                //let numberOfPlayedHoles = leaderboard.holes + total.numberOfPlayedHoles;
                //let totalPoints = total.totalPoints;
                //let net = totalPoints + courseIndex;
                let round = leaderboard.round;
                if (leaderboard.round < tournamentScorecard.round) {
                    round = tournamentScorecard.round;
                }
                logging_1.Logger.info(numberOfPlayedHoles);
                logging_1.Logger.info(totalPoints);
                // Logger.info(net);
                //await this.tournamentLeaderboardDAO.updateLeaderboard(userID, tournamentScorecard.tournamentId, tournamentScorecard.course._id, net, numberOfPlayedHoles,round);
                yield this.tournamentLeaderboardDAO.updateLeaderboard(userID, tournamentScorecard.tournamentId, tournamentScorecard.course._id, totalPoints, numberOfPlayedHoles, round, currentRound, currentRoundTotal, currentRoundHoles);
                return Promise.resolve(updatedTournamentScorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament leaderboard
     * @async
     * @returns {Promise<TournamentLeaderboard[]>} Tournament leaderboard list.
     */
    getLeaderboard(userID, leaderboardID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("user", userID)
                    .addFilter("_id", leaderboardID)
                    .buildAll();
                const userTournamentLeaderboardRecord = yield this.tournamentLeaderboardDAO.getByFilters(filters);
                if (userTournamentLeaderboardRecord) {
                    const tournamentLeaderboard = yield this.tournamentLeaderboardDAO.getLeaderboard(userTournamentLeaderboardRecord.tournamentId, userTournamentLeaderboardRecord.division);
                    return Promise.resolve(tournamentLeaderboard);
                }
                else {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidLeaderboardId));
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament leaderboard
     * @async
     * @returns {Promise<TournamentLeaderboard>} Tournament leaderboard list.
     */
    getLeaderboardById(leaderboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("_id", leaderboardId)
                    .buildAll();
                const leaderboard = yield this.tournamentLeaderboardDAO.getByFilters(filters);
                if (leaderboard) {
                    return Promise.resolve(leaderboard);
                }
                else {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidLeaderboardId));
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament leaderboard
     * @async
     * @returns {Promise<TournamentLeaderboard[]>} Tournament leaderboard list.
     */
    getTournamentLeaderboard(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentLeaderboard = yield this.tournamentLeaderboardDAO.getLeaderboard(tournamentId);
                //Logger.debug('tournamentLeaderboard');
                //Logger.debug(tournamentLeaderboard);
                return Promise.resolve(tournamentLeaderboard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament entry
     * @async
     * @returns {Promise<TournamentEntry>} Tournament entry
     */
    getTournamentEntry(userID, tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("userId", userID)
                    .addFilter("tournamentId", tournamentId)
                    .buildAll();
                const tournamentEntry = yield this.tournamentEntryDAO.getByFilters(filters);
                if (!tournamentEntry) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.InvalidTournamentId));
                }
                return Promise.resolve(tournamentEntry);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament entries
     * @async
     * @returns {Promise<TournamentEntry[]>} Tournament entry list.
     */
    getTournamentEntries(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("userId", userID)
                    .buildAll();
                const tournamentEntries = yield this.tournamentEntryDAO.getMultipleByFilters(filters);
                return Promise.resolve(tournamentEntries);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get active tournament entries
     * @async
     * @returns {Promise<TournamentEntry[]>} Tournament entry list.
     */
    getActiveTournamentEntries(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("userId", userID)
                    .addFilter("startDate", new greater_than_or_equal_filter_1.GreaterThanOrEqualFilter(new Date()))
                    .addFilter("endDate", new less_than_or_equal_filter_1.LessThanOrEqualFilter(new Date()))
                    .buildAll();
                const tournamentEntries = yield this.tournamentEntryDAO.getMultipleByFilters(filters);
                return Promise.resolve(tournamentEntries);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Create tournament result
     * @async
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    createTournamentResult(userID, tournamentID, courseID, division, total, holes, round) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentResult = {
                    user: user_1.User.fromId(userID),
                    tournament: tournament_1.Tournament.fromId(tournamentID),
                    courseId: courseID,
                    division: division,
                    total: total,
                    holes: holes,
                    round: round
                };
                yield this.tournamentResultDAO.create(tournamentResult);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Create tournament results
     * @async
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    createTournamentResults(tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_1.Logger.info(`createTournamentResults.`);
                let tournament = yield this.getTournament(tournamentID);
                //const tournamentDivisions = ["CHAMP","CELEBRITY","PROFESSIONAL_GOLFER","PGA Pro"]; //tournament.divisions;
                let tournamentResults = [];
                let leaderboardWithPoints = yield this.calculatePlayersPoints(tournamentID);
                let playersPoints = leaderboardWithPoints.playersPoints;
                let tournamentLeaderboards = leaderboardWithPoints.leaderboards;
                const avgIndex = leaderboardWithPoints.avgIndex;
                // Map tournament results
                const divisionTournamentResults = _.map(tournamentLeaderboards, (tournamentLeaderboard) => {
                    var _a;
                    let points = (_a = playersPoints.find(o => o.userId == tournamentLeaderboard.user)) === null || _a === void 0 ? void 0 : _a.points;
                    if (tournament.hostingClub && String(tournament.hostingClub._id) == String(tournamentLeaderboard.courseId.clubId._id)) {
                        logging_1.Logger.info('doubling the points of hosting club players');
                        points = 2 * points;
                    }
                    let isChallenge = tournament.type === 'Challenge' ? true : false;
                    return {
                        user: tournamentLeaderboard.user,
                        tournament: tournament_1.Tournament.fromId(tournamentID),
                        courseId: tournamentLeaderboard.courseId,
                        division: tournamentLeaderboard.division,
                        total: tournamentLeaderboard.total,
                        holes: tournamentLeaderboard.holes,
                        round: tournamentLeaderboard.round,
                        points: !isChallenge ? points : 0,
                        bonusPoints: isChallenge ? points : 0,
                        avgIndex: avgIndex
                    };
                });
                tournamentResults.push(...divisionTournamentResults);
                //}
                logging_1.Logger.info(`${tournamentResults.length} tournament results created.`);
                yield this.tournamentResultDAO.createMany(tournamentResults);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    calculatePlayersPoints(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = new filter_builder_1.FilterBuilder()
                .addFilter("tournamentId", tournamentId)
                .addFilter("holes", new greater_than_or_equal_filter_1.GreaterThanOrEqualFilter(1))
                .buildAll();
            //const tournamentLeaderboards = await this.tournamentLeaderboardDAO.getMultipleByFilters(filters);
            const tournamentLeaderboards = yield this.tournamentLeaderboardDAO.getLeaderboardForResults(tournamentId);
            //console.log('leaderboard::',tournamentLeaderboards);
            //tournamentLeaderboards.forEach(()=>{});
            const tournamentEntries = yield this.tournamentEntryDAO.getMultipleByFilters(new filter_builder_1.FilterBuilder()
                .addFilter("tournamentId", tournamentId)
                .buildAll());
            //console.log('tournamentEntries::',JSON.stringify(tournamentEntries));
            const fieldSize = tournamentEntries.length;
            if (fieldSize && fieldSize > 1) {
                console.log('tournamentId:::', tournamentId);
                console.log('fieldSize:::', fieldSize);
                let fieldSizeMetaData = rankPointFieldDtls.find(o => o.fieldSize === fieldSize);
                console.log('fieldSizeMetaData:::', fieldSizeMetaData);
                let totalIndex = 0;
                tournamentEntries.forEach(entries => {
                    totalIndex = totalIndex + entries.handicapIndex;
                });
                const avgIndex = totalIndex / fieldSize;
                //console.log('avgIndex', avgIndex);
                let playerPoints = [];
                let sortedLeaderboard = tournamentLeaderboards.sort((a, b) => a.total < b.total ? 1 : -1);
                let rankedLeaderBoard = this.mapRanking(sortedLeaderboard, 'total').sort();
                //console.log('sorted',rankedLeaderBoard);
                for (let i = 0; i < rankedLeaderBoard.length; i++) {
                    let playerLB = rankedLeaderBoard[i];
                    //console.log('playerLB',playerLB);
                    if (playerLB.division.toLowerCase() === golf_division_enum_1.GolfDivision.Celebrity.toLowerCase()
                        || playerLB.division.toLowerCase() === golf_division_enum_1.GolfDivision.PGAPro.toLowerCase()
                        || playerLB.division.toLowerCase() === golf_division_enum_1.GolfDivision.TourPlayer.toLowerCase()) {
                        const pointTB = pointsTable.CELEBRITY;
                        playerPoints.push(this.getCalcPoints(playerLB, pointTB, avgIndex, fieldSizeMetaData));
                    }
                    else {
                        const pointTB = pointsTable.CHAMP;
                        playerPoints.push(this.getCalcPoints(playerLB, pointTB, avgIndex, fieldSizeMetaData));
                    }
                }
                //console.log('playersPoints',playerPoints);
                let leaderboardWithPoints = {
                    "playersPoints": playerPoints,
                    "leaderboards": rankedLeaderBoard,
                    "avgIndex": avgIndex
                };
                return Promise.resolve(leaderboardWithPoints);
            }
            else {
                let leaderboardWithPoints = {
                    "playersPoints": [],
                    "leaderboards": tournamentLeaderboards,
                    "avgIndex": 0
                };
                return leaderboardWithPoints;
            }
        });
    }
    mapRanking(array, key) {
        let rank = 1;
        for (let i = 0; i < array.length; i++) {
            let obj = array[i];
            let tie = false;
            if (i !== 0) {
                if (obj[key] !== array[i - 1][key]) {
                    rank = i + 1;
                    tie = false;
                }
                else {
                    tie = true;
                }
            }
            if (i < array.length - 1 && obj[key] == array[i + 1][key]) {
                tie = true;
            }
            if (tie) {
                obj['rank'] = 'T' + rank;
            }
            else {
                obj['rank'] = rank;
            }
        }
        return array;
    }
    getCalcPoints(playerLB, pointsTable, avgIndex, fieldSizeMetaData) {
        let pointColumn;
        for (let j = 0; j < pointsTable.length; j++) {
            let column = pointsTable[j];
            if (j === 0) {
                if (avgIndex <= column.endAvgIndex
                    || playerLB.division.toLowerCase() === golf_division_enum_1.GolfDivision.PGAPro.toLowerCase()
                    || playerLB.division.toLowerCase() === golf_division_enum_1.GolfDivision.TourPlayer.toLowerCase()) {
                    pointColumn = column;
                    break;
                }
            }
            else if (avgIndex >= column.startAvgIndex && avgIndex <= column.endAvgIndex) {
                pointColumn = column;
                break;
            }
        }
        let position = playerLB.rank;
        //check position above cut
        if (isNaN(position) && position.includes('T')) {
            position = position.split('T')[1];
        }
        console.log('division::', playerLB.division);
        //console.log(playerLB.user+' points',pointColumn);
        if (Number(position) <= fieldSizeMetaData.cut) {
            const points = pointColumn.points_position.find(o => o.position == position).points / fieldSizeMetaData.divisor;
            let playerPoints = { userId: playerLB.user, points: Math.round(points * 10) / 10 };
            console.log('playerpoints', playerPoints);
            return playerPoints;
        }
        else {
            return { userId: playerLB.user, points: 0 };
        }
    }
    /**
     * Mark tournament as processed
     * @async
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    markTournamentAsProcessed(tournamentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.tournamentDAO.markTournamentAsProcessed(tournamentID);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Get tournament results
     * @async
     * @returns {Promise<TournamentResult[]>} Tournament result list
     */
    getTournamentResults(tournamentID, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentResults = yield this.tournamentResultDAO.getTournamentResults(tournamentID, division);
                return Promise.resolve(tournamentResults);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
    * Get ranking
    * @async
    * @returns {Promise<Ranking[]>} Ranking list
    */
    getRanking(countryCodes, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rankings = yield this.tournamentResultDAO.getRanking(countryCodes, division);
                return Promise.resolve(rankings);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
    * Get ranking
    * @async
    * @returns {Promise<any>} Ranking list
    */
    getUsersWithNoPoints(countryCodes, division, userWithPoints) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userWithNoPoints = yield user_model_1.UserSchema.find({
                    _id: { $nin: userWithPoints },
                    division: division,
                    //countryOfResidence: { $in: countryCodes },
                    $or: [
                        { countryOfResidence: { $in: countryCodes } },
                        { state: { $in: countryCodes } }
                    ],
                    isAdmin: false
                }, { firstName: 1, lastName: 1, nationality: 1 }).exec();
                return Promise.resolve(userWithNoPoints);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getStaticLatestRank(countryCodes, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRank = yield latest_rank_model_1.LatestRankSchema.find({
                    division: division,
                    nationality: { $in: countryCodes }
                }).exec();
                return Promise.resolve(existingRank);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
    * Get individual ranking
    * @async
    * @returns {Promise<Number>} Ranking (null if no ranking)
    */
    getIndividualRanking(userId, countryCodes, division) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rankings = yield this.tournamentResultDAO.getRanking(countryCodes, division);
                const index = _.findIndex(rankings, function (ranking) { return ranking.user._id == userId; });
                let position = null;
                if (index !== -1) {
                    position = index + 1;
                }
                return Promise.resolve(position);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    calculateTotal(scores, holes) {
        const numberOfHoles = holes.length;
        let numberOfPlayedHoles = 0;
        let totalPoints = 0;
        for (let i = 1; i < numberOfHoles + 1; i++) {
            const foundScore = _.find(scores, (score) => {
                return score.hole === i;
            });
            const foundPar = _.find(holes, (hole) => {
                return hole.hole === i;
            });
            if (foundScore) {
                numberOfPlayedHoles++;
                const points = foundScore.points; //this.getPoints(foundScore.score, foundPar.par, i, numberOfHoles);
                totalPoints += points; //.points;
            }
        }
        return {
            numberOfPlayedHoles: numberOfPlayedHoles,
            totalPoints: totalPoints
        };
    }
    getStrokePoint(points, description) {
        return {
            points: points,
            description: description
        };
    }
}
exports.TournamentManagementService = TournamentManagementService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1tYW5hZ2VtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvdG91cm5hbWVudC1tYW5hZ2VtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXlDO0FBQ3pDLGdFQUE0RDtBQUM1RCxvRUFBMkQ7QUFDM0Qsb0VBQTJEO0FBRzNELG9EQUFpRDtBQVFqRCw0QkFBNEI7QUFDNUIsc0VBQWtFO0FBQ2xFLGtHQUEyRjtBQUMzRiw0RkFBcUY7QUFDckYsd0NBQXFDO0FBR3JDLG9FQUEyRDtBQUUzRCxzREFBa0Q7QUFJbEQsNkVBQXlFO0FBQ3pFLHlGQUFxRjtBQUNyRixtRUFBK0Q7QUFFL0QsbUVBQStEO0FBQy9ELHFEQUFrRDtBQUNsRCwwRUFBMEU7QUFDMUUseUVBQXlFO0FBQ3pFLGlFQUE4RDtBQUU5RCxNQUFhLDJCQUEyQjtJQVFwQyxZQUNJLGFBQTRCLEVBQzVCLGtCQUF3QyxFQUN4QyxtQkFBd0MsRUFDeEMsc0JBQThDLEVBQzlDLHdCQUFrRDtRQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBQy9DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxjQUFjOztZQUN2QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUFDLE9BQU8sS0FB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QzNCLENBQUE7SUFDTCxDQUFDO0lBRU8sY0FBYyxDQUFDLE1BQWMsRUFBRSxXQUFtQjtRQUN0RCxPQUFPO1lBQ0gsTUFBTSxFQUFFLE1BQU07WUFDZCxXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFBO0lBQ0wsQ0FBQztDQTBDSjtBQWhwQ0Qsa0VBZ3BDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgRXJyb3JCdWlsZGVyIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgRXJyb3JUeXBlIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLXR5cGUuZW51bVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi4vdHlwZXMvZXJyb3ItbWVzc2FnZS5lbnVtXCI7XHJcbmltcG9ydCB7IERBTyB9IGZyb20gXCIuLi9jb3JlL2Rhby9kYW8uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViIH0gZnJvbSBcIi4uL3R5cGVzL2dvbGYtY2x1YlwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSBcIi4uL3R5cGVzL3RvdXJuYW1lbnRcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudEVudHJ5IH0gZnJvbSBcIi4uL3R5cGVzL3RvdXJuYW1lbnQtZW50cnlcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdCB9IGZyb20gXCIuLi90eXBlcy90b3VybmFtZW50LXJlc3VsdFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkIH0gZnJvbSBcIi4uL3R5cGVzL3RvdXJuYW1lbnQtc2NvcmVjYXJkXCI7XHJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4uL3R5cGVzL3Njb3JlXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRTY29yZWNhcmREQU8gfSBmcm9tIFwiLi4vZGFvcy90b3VybmFtZW50LXNjb3JlY2FyZC5kYW8uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRMZWFkZXJib2FyZERBTyB9IGZyb20gXCIuLi9kYW9zL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmQuZGFvLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50TGVhZGVyYm9hcmQgfSBmcm9tIFwiLi4vdHlwZXMvdG91cm5hbWVudC1sZWFkZXJib2FyZFwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgRmlsdGVyQnVpbGRlciB9IGZyb20gXCIuLi9jb3JlL2Rhby9maWx0ZXIvZmlsdGVyLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgR3JlYXRlclRoYW5PckVxdWFsRmlsdGVyIH0gZnJvbSBcIi4uL2NvcmUvZGFvL2ZpbHRlci9ncmVhdGVyLXRoYW4tb3ItZXF1YWwuZmlsdGVyXCI7XHJcbmltcG9ydCB7IExlc3NUaGFuT3JFcXVhbEZpbHRlciB9IGZyb20gXCIuLi9jb3JlL2Rhby9maWx0ZXIvbGVzcy10aGFuLW9yLWVxdWFsLmZpbHRlclwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3R5cGVzL3VzZXJcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdERBTyB9IGZyb20gXCIuLi9kYW9zL3RvdXJuYW1lbnQtcmVzdWx0LmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudERBTyB9IGZyb20gXCIuLi9kYW9zL3RvdXJuYW1lbnQuZGFvLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IFJhbmtpbmcgfSBmcm9tIFwiLi4vdHlwZXMvcmFua2luZ1wiO1xyXG5pbXBvcnQgeyBHb2xmQ291cnNlIH0gZnJvbSBcIi4uL3R5cGVzL2dvbGYtY291cnNlXCI7XHJcbmltcG9ydCB7IEdlbmRlciB9IGZyb20gXCIuLi90eXBlcy9nZW5kZXIuZW51bVwiO1xyXG5pbXBvcnQgeyBHb2xmSG9sZSB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWhvbGVcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudEVudHJ5U2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy90b3VybmFtZW50LWVudHJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRMZWFkZXJib2FyZFNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvdG91cm5hbWVudC1sZWFkZXJib2FyZC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMYXRlc3RSYW5rU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9sYXRlc3QtcmFuay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZVNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvZ29sZi1jb3Vyc2UubW9kZWxcIjtcclxuaW1wb3J0IHsgVXNlclNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyByYW5rUG9pbnRGaWVsZER0bHMgZnJvbSBcIi4uLy4uL3JhbmstcG9pbnQtZmllbGQtZGV0YWlscy5qc29uXCI7XHJcbmltcG9ydCAqIGFzIHBvaW50c1RhYmxlIGZyb20gXCIuLi8uLi9jZWxlYnJpdHktY2hhbXAtcmFua2luZy1wb2ludHMuanNvblwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy90b3VybmFtZW50Lm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnREQU86IFRvdXJuYW1lbnREQU87XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnRFbnRyeURBTzogREFPPFRvdXJuYW1lbnRFbnRyeT47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnRSZXN1bHREQU86IFRvdXJuYW1lbnRSZXN1bHREQU87XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnRTY29yZWNhcmREQU86IFRvdXJuYW1lbnRTY29yZWNhcmREQU87XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRvdXJuYW1lbnRMZWFkZXJib2FyZERBTzogVG91cm5hbWVudExlYWRlcmJvYXJkREFPO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICB0b3VybmFtZW50REFPOiBUb3VybmFtZW50REFPLFxyXG4gICAgICAgIHRvdXJuYW1lbnRFbnRyeURBTzogREFPPFRvdXJuYW1lbnRFbnRyeT4sXHJcbiAgICAgICAgdG91cm5hbWVudFJlc3VsdERBTzogVG91cm5hbWVudFJlc3VsdERBTyxcclxuICAgICAgICB0b3VybmFtZW50U2NvcmVjYXJkREFPOiBUb3VybmFtZW50U2NvcmVjYXJkREFPLFxyXG4gICAgICAgIHRvdXJuYW1lbnRMZWFkZXJib2FyZERBTzogVG91cm5hbWVudExlYWRlcmJvYXJkREFPLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50REFPID0gdG91cm5hbWVudERBTztcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTyA9IHRvdXJuYW1lbnRFbnRyeURBTztcclxuICAgICAgICB0aGlzLnRvdXJuYW1lbnRSZXN1bHREQU8gPSB0b3VybmFtZW50UmVzdWx0REFPO1xyXG4gICAgICAgIHRoaXMudG91cm5hbWVudFNjb3JlY2FyZERBTyA9IHRvdXJuYW1lbnRTY29yZWNhcmREQU87XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50TGVhZGVyYm9hcmREQU8gPSB0b3VybmFtZW50TGVhZGVyYm9hcmREQU87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgVG91cm5hbWVudHNcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudFtdPn0gTGlzdCBvZiB0b3VybmFtZW50cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRzKCk6IFByb21pc2U8VG91cm5hbWVudFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnREQU8uZ2V0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIFRvdXJuYW1lbnRzXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnQ+fSBMaXN0IG9mIHRvdXJuYW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlVG91cm5hbWVudChyZXE6IFJlcXVlc3QpOiBQcm9taXNlPFRvdXJuYW1lbnQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50Rm9ybSA9IHJlcS5ib2R5IGFzIFRvdXJuYW1lbnQ7XHJcbiAgICAgICAgICAgIHRvdXJuYW1lbnRGb3JtWydjcmVhdGVkQnknXSA9IHJlcS51c2VyLnN1YjtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnREQU8uY3JlYXRlKHRvdXJuYW1lbnRGb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgVG91cm5hbWVudHNcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudD59IExpc3Qgb2YgdG91cm5hbWVudHMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVUb3VybmFtZW50KHJlcTogUmVxdWVzdCk6IFByb21pc2U8VG91cm5hbWVudD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRGb3JtID0gcmVxLmJvZHkgYXMgVG91cm5hbWVudDtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnREQU8udXBkYXRlKHRvdXJuYW1lbnRGb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgQXZhaWxhYmxlIFRvdXJuYW1lbnRzXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRbXT59IExpc3Qgb2YgYXZhaWxhYmxlIHRvdXJuYW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QXZhaWxhYmxlVG91cm5hbWVudHMoKTogUHJvbWlzZTxUb3VybmFtZW50W10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJzID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInJlZ1N0YXJ0RGF0ZVwiLCBuZXcgR3JlYXRlclRoYW5PckVxdWFsRmlsdGVyKG5ldyBEYXRlKCkpKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInJlZ0VuZERhdGVcIiwgbmV3IExlc3NUaGFuT3JFcXVhbEZpbHRlcihuZXcgRGF0ZSgpKSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJlbmREYXRlXCIsIG5ldyBMZXNzVGhhbk9yRXF1YWxGaWx0ZXIobmV3IERhdGUoKSkpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50REFPLmdldEF2YWlsYWJsZVRvdXJuYW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEZpbmlzaGVkIFRvdXJuYW1lbnRzXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRbXT59IExpc3Qgb2YgYXZhaWxhYmxlIHRvdXJuYW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0RmluaXNoZWRUb3VybmFtZW50cyhpc1Jlc3VsdFByb2Nlc3NlZDogYm9vbGVhbik6IFByb21pc2U8VG91cm5hbWVudFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IG5ldyBGaWx0ZXJCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJpc1Jlc3VsdFByb2Nlc3NlZFwiLCBpc1Jlc3VsdFByb2Nlc3NlZClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJlbmREYXRlXCIsIG5ldyBMZXNzVGhhbk9yRXF1YWxGaWx0ZXIobmV3IERhdGUoRGF0ZS5ub3coKSAtICggMzYwMCAqIDEwMDAgKiAyNCkpKSlcclxuICAgICAgICAgICAgICAgIC5idWlsZEFsbCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnREQU8uZ2V0TXVsdGlwbGVCeUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEZpbmlzaGVkIFRvdXJuYW1lbnRzIGJ5IGRpdmlzaW9uXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRbXT59IExpc3Qgb2YgYXZhaWxhYmxlIHRvdXJuYW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0RmluaXNoZWRUb3VybmFtZW50c0J5RGl2aXNpb24oaXNSZXN1bHRQcm9jZXNzZWQ6IGJvb2xlYW4sIGRpdmlzaW9uOiBhbnkpOiBQcm9taXNlPFRvdXJuYW1lbnRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzO1xyXG4gICAgICAgICAgICBpZiAoZGl2aXNpb24gPT09ICdBbGwnKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJpc1Jlc3VsdFByb2Nlc3NlZFwiLCBpc1Jlc3VsdFByb2Nlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiZW5kRGF0ZVwiLCBuZXcgTGVzc1RoYW5PckVxdWFsRmlsdGVyKG5ldyBEYXRlKERhdGUubm93KCkgLSAoIDM2MDAgKiAxMDAwICogMjQpKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJ1aWxkQWxsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJpc1Jlc3VsdFByb2Nlc3NlZFwiLCBpc1Jlc3VsdFByb2Nlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiZW5kRGF0ZVwiLCBuZXcgTGVzc1RoYW5PckVxdWFsRmlsdGVyKG5ldyBEYXRlKERhdGUubm93KCkgLSAoIDM2MDAgKiAxMDAwICogMjQpKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcImRpdmlzaW9uc1wiLCBkaXZpc2lvbilcclxuICAgICAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50cyA9IGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5nZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgVG91cm5hbWVudFxyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUb3VybmFtZW50Pn0gVG91cm5hbWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRUb3VybmFtZW50KHRvdXJuYW1lbnRJZDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudCA9IGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5nZXRUb3VybmFtZW50KHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbnRlciB0b3VybmFtZW50XHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRFbnRyeT59IFRvdXJuYW1lbnQgRW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGVudGVyVG91cm5hbWVudCh1c2VySUQ6IHN0cmluZywgdG91cm5hbWVudElEOiBzdHJpbmcsIGNvdXJzZUlEOiBzdHJpbmcsIGRpdmlzaW9uOiBHb2xmRGl2aXNpb24sIGdlbmRlcjogR2VuZGVyLCBoYW5kaWNhcEluZGV4OiBudW1iZXIsIHRlZTogc3RyaW5nLHRlYW1OYW1lPzpzdHJpbmcsYWNjZXNzVG9rZW4/OnN0cmluZyk6IFByb21pc2U8VG91cm5hbWVudEVudHJ5PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0b3VybmFtZW50ID0gYXdhaXQgdGhpcy50b3VybmFtZW50REFPLmdldFRvdXJuYW1lbnQodG91cm5hbWVudElEKTtcclxuICAgICAgICAgICAgLyogY29uc3QgZW50cmllc0NvdW50ID0gYXdhaXQgVG91cm5hbWVudEVudHJ5U2NoZW1hLmZpbmQoe3RvdXJuYW1lbnRJZDp0b3VybmFtZW50Ll9pZH0pLmNvdW50KCk7XHJcbiAgICAgICAgICAgIGlmKGVudHJpZXNDb3VudCA+IDMpIHtcclxuICAgICAgICAgICAgICAgIHRvdXJuYW1lbnQgPSBhd2FpdCB0aGlzLmNyZWF0ZU5ld1RvdXJuYW1lbnQodG91cm5hbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0b3VybmFtZW50SUQgPSB0b3VybmFtZW50Ll9pZDtcclxuICAgICAgICAgICAgfSAqL1xyXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSB0b3VybmFtZW50IElEXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghdG91cm5hbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuUmFuZ2UsIEVycm9yTWVzc2FnZS5JbnZhbGlkVG91cm5hbWVudElkKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGNvdXJzZSBJRFxyXG4gICAgICAgICAgICAvKiBjb25zdCBjb3Vyc2VJZHMgPSBfLm1hcCh0b3VybmFtZW50LmNvdXJzZXMsICh0b3VybmFtZW50R29sZkNvdXJzZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdXJuYW1lbnRHb2xmQ291cnNlLmNvdXJzZS5faWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghXy5pbmNsdWRlcyhjb3Vyc2VJZHMsIGNvdXJzZUlELnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5SYW5nZSwgRXJyb3JNZXNzYWdlLkludmFsaWRDb3Vyc2VJZCkpO1xyXG4gICAgICAgICAgICB9ICovXHJcblxyXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBkaXZpc2lvblxyXG4gICAgICAgICAgICBpZiAoIV8uaW5jbHVkZXMoT2JqZWN0LnZhbHVlcyh0b3VybmFtZW50LmRpdmlzaW9ucyksIGRpdmlzaW9uLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5SYW5nZSwgRXJyb3JNZXNzYWdlLkludmFsaWRUb3VybmFtZW50RGl2aXNpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVmFsaWRhdGUgZW50cnlcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb3VybmFtZW50RW50cnkgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTy5nZXRCeUZpbHRlcnMoXHJcbiAgICAgICAgICAgICAgICBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInVzZXJJZFwiLCB1c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInRvdXJuYW1lbnRJZFwiLCB0b3VybmFtZW50SUQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcImNvdXJzZUlkXCIsIGNvdXJzZUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIC5idWlsZEFsbCgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdUb3VybmFtZW50RW50cnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkV4aXN0cywgRXJyb3JNZXNzYWdlLlRvdXJuYW1lbnRFbnRyeUV4aXN0cykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiBjb25zdCBlbnRlcmVkQ291cnNlID0gXy5maW5kKHRvdXJuYW1lbnQuY291cnNlcywgKHRvdXJuYW1lbnRHb2xmQ291cnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG91cm5hbWVudEdvbGZDb3Vyc2UuY291cnNlLl9pZCA9PSBjb3Vyc2VJRDtcclxuICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgICAgIGNvbnN0IGVudGVyZWRDb3Vyc2U6IGFueSA9IGF3YWl0IEdvbGZDb3Vyc2VTY2hlbWEuZmluZEJ5SWQoY291cnNlSUQpLmV4ZWMoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncmVudGVyJyxlbnRlcmVkQ291cnNlKTtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZFRlZSA9IF8uZmluZChlbnRlcmVkQ291cnNlLnRlZXMsIChnb2xmVGVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ29sZlRlZS5faWQgPT0gdGVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvdXJzZVJhdGluZyA9IE51bWJlcihlbnRlcmVkVGVlLmNvdXJzZVJhdGluZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3BlUmF0aW5nID0gTnVtYmVyKGVudGVyZWRUZWUuc2xvcGVSYXRpbmcpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXIgPSBOdW1iZXIoZW50ZXJlZFRlZS5wYXIpO1xyXG4gICAgICAgICAgICBjb25zdCBob2xlcyA9IGVudGVyZWRUZWUuaG9sZXM7XHJcblxyXG4gICAgICAgICAgICAvL0NvdXJzZSBIYW5kaWNhcCA9IChIYW5kaWNhcCBJbmRleCAqIFNsb3BlIFJhdGluZyAvIDExMykgKyAoQ1IgLSBQYXIpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvdXJzZUluZGV4ID0gTWF0aC5yb3VuZCgoTnVtYmVyKGhhbmRpY2FwSW5kZXgpICogc2xvcGVSYXRpbmcgLyAxMTMpICsgKGNvdXJzZVJhdGluZyAtIHBhcikpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGVtcHR5IHNjb3JlY2FyZFxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50U2NvcmVjYXJkID0ge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySUQsXHJcbiAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRJRCxcclxuICAgICAgICAgICAgICAgIGNvdXJzZTogR29sZkNvdXJzZS5mcm9tSWQoY291cnNlSUQpLFxyXG4gICAgICAgICAgICAgICAgZGl2aXNpb246IGRpdmlzaW9uLFxyXG4gICAgICAgICAgICAgICAgaGFuZGljYXBJbmRleDogaGFuZGljYXBJbmRleCxcclxuICAgICAgICAgICAgICAgIGNvdXJzZUluZGV4OiBjb3Vyc2VJbmRleCxcclxuICAgICAgICAgICAgICAgIHRlZTogZW50ZXJlZFRlZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgcm91bmQ6IDEsXHJcbiAgICAgICAgICAgICAgICB0ZWVJZDogZW50ZXJlZFRlZS5faWQsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6IGVudGVyZWRUZWUuZ2VuZGVyLFxyXG4gICAgICAgICAgICAgICAgdGVhbU5hbWUgOiB0ZWFtTmFtZSA/IHRlYW1OYW1lIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH0gYXMgVG91cm5hbWVudFNjb3JlY2FyZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFNjb3JlY2FyZCA9IGF3YWl0IHRoaXMudG91cm5hbWVudFNjb3JlY2FyZERBTy5jcmVhdGUodG91cm5hbWVudFNjb3JlY2FyZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZW1wdHkgbGVhZGVyYm9hcmQgcmVjb3JkXHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRMZWFkZXJib2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXI6IFVzZXIuZnJvbUlkKHVzZXJJRCksXHJcbiAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRJRCxcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uOiBkaXZpc2lvbixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiBjb3Vyc2VJbmRleCxcclxuICAgICAgICAgICAgICAgIGhvbGVzOiAwLFxyXG4gICAgICAgICAgICAgICAgcm91bmQ6IDEsXHJcbiAgICAgICAgICAgICAgICB0ZWFtTmFtZSA6IHRlYW1OYW1lID8gdGVhbU5hbWUgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSBhcyBUb3VybmFtZW50TGVhZGVyYm9hcmQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRMZWFkZXJib2FyZCA9IGF3YWl0IHRoaXMudG91cm5hbWVudExlYWRlcmJvYXJkREFPLmNyZWF0ZSh0b3VybmFtZW50TGVhZGVyYm9hcmQpO1xyXG5cclxuICAgICAgICAgICAgLy8gVG91cm5hbWVudCBlbnRyeVxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50RW50cnkgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJRCxcclxuICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudElELFxyXG4gICAgICAgICAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgc2NvcmVjYXJkSWQ6IHN0b3JlZFNjb3JlY2FyZC5faWQsXHJcbiAgICAgICAgICAgICAgICBsZWFkZXJib2FyZElkOiBzdG9yZWRMZWFkZXJib2FyZC5faWQsXHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbjogZGl2aXNpb24sXHJcbiAgICAgICAgICAgICAgICBoYW5kaWNhcEluZGV4OiBoYW5kaWNhcEluZGV4LFxyXG4gICAgICAgICAgICAgICAgdGVlOiBlbnRlcmVkVGVlLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6IGdlbmRlcixcclxuICAgICAgICAgICAgICAgIHRlYW1OYW1lIDogdGVhbU5hbWUgPyB0ZWFtTmFtZSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9IGFzIFRvdXJuYW1lbnRFbnRyeTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFRvdXJuYW1lbnRFbnRyeSA9IGF3YWl0IHRoaXMudG91cm5hbWVudEVudHJ5REFPLmNyZWF0ZSh0b3VybmFtZW50RW50cnkpO1xyXG5cclxuICAgICAgICAgICAgaWYoYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlclNjaGVtYS5maW5kQnlJZCh1c2VySUQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5JbmRleCA9IHVzZXIuYW1hdGV1clRva2Vucy5maW5kSW5kZXgobyA9PiBvLmluY2x1ZGVzKGFjY2Vzc1Rva2VuKSk7XHJcbiAgICAgICAgICAgICAgICBpZih0b2tlbkluZGV4ID4gLTEpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlci5hbWF0ZXVyVG9rZW5zLnNwbGljZSh0b2tlbkluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBVc2VyU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogdXNlci5faWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldDoge2FtYXRldXJUb2tlbnMgOiB1c2VyLmFtYXRldXJUb2tlbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RvcmVkVG91cm5hbWVudEVudHJ5KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0NoZWNrIHRvdXJuYW1lbnQgZW50cnkgaWYgZ3JlYXRlciB0aGFuIDUwIHRoZW4gY3JlYXRlIG5ldyB0b3VybmFtZW50IHdpdGggdG91cm5hbWVtbnQgbmFtZSAtIDEsMiwzLi4uXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZU5ld1RvdXJuYW1lbnQodG91cm5hbWVudDogVG91cm5hbWVudCkge1xyXG4gICAgICAgIC8qIGNvbnN0IGVudHJpZXNDb3VudCA9IGF3YWl0IFRvdXJuYW1lbnRFbnRyeVNjaGVtYS5maW5kKHt0b3VybmFtZW50SWQ6dG91cm5hbWVudC5faWR9KS5jb3VudCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbnRyaWVzIENvdW50JyxlbnRyaWVzQ291bnQpO1xyXG4gICAgICAgIGlmKGVudHJpZXNDb3VudCA+IDMpIHsgKi9cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRvdXJuYW1lbnROYW1lID0gdG91cm5hbWVudFsnbmFtZSddO1xyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSB0b3VybmFtZW50TmFtZS5zcGxpdCgnIC0gJyk7XHJcbiAgICAgICAgICAgIGxldCBuZXdOYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGlmKGFyci5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBudW0gPSBOdW1iZXIoYXJyWzFdKSArIDE7XHJcbiAgICAgICAgICAgICAgICBuZXdOYW1lID0gdG91cm5hbWVudFsnbmFtZSddICsgJyAtICcrbnVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3TmFtZSA9IHRvdXJuYW1lbnRbJ25hbWUnXSArICcgLSAnKzE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY2hlY2tOZXdUb3VybmFtZW50ID0gYXdhaXQgVG91cm5hbWVudFNjaGVtYS5maW5kT25lKHsnbmFtZScgOiBuZXdOYW1lfSkuZXhlYygpO1xyXG4gICAgICAgICAgICBpZihjaGVja05ld1RvdXJuYW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGVja05ld1RvdXJuYW1lbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VG91cm5hbWVudDphbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIG5ld1RvdXJuYW1lbnQubmFtZSA9IG5ld05hbWU7XHJcbiAgICAgICAgICAgICAgICBuZXdUb3VybmFtZW50LnJlZ1N0YXJ0RGF0ZSA9IHRvdXJuYW1lbnQucmVnU3RhcnREYXRlO1xyXG4gICAgICAgICAgICAgICAgbmV3VG91cm5hbWVudC5yZWdFbmREYXRlID0gdG91cm5hbWVudC5yZWdFbmREYXRlO1xyXG4gICAgICAgICAgICAgICAgbmV3VG91cm5hbWVudC5zdGFydERhdGUgPSB0b3VybmFtZW50LnN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgICAgIG5ld1RvdXJuYW1lbnQuZW5kRGF0ZSAgID0gdG91cm5hbWVudC5lbmREYXRlO1xyXG4gICAgICAgICAgICAgICAgbmV3VG91cm5hbWVudC5kaXZpc2lvbnMgICA9IHRvdXJuYW1lbnQuZGl2aXNpb25zO1xyXG4gICAgICAgICAgICAgICAgbmV3VG91cm5hbWVudC5tYXhQbGF5ZXJzID0gdG91cm5hbWVudC5tYXhQbGF5ZXJzO1xyXG4gICAgICAgICAgICAgICAgbmV3VG91cm5hbWVudC5jaGFsbGVuZ2VycyA9IHRvdXJuYW1lbnQuY2hhbGxlbmdlcnM7XHJcbiAgICAgICAgICAgICAgICBuZXdUb3VybmFtZW50LmNvdXJzZXMgPSB0b3VybmFtZW50LmNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICBuZXdUb3VybmFtZW50LnR5cGUgPSB0b3VybmFtZW50LnR5cGU7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCduZXdUb3VybmFtZW50Pj4nLG5ld1RvdXJuYW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5jcmVhdGUobmV3VG91cm5hbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gbmV3VG91cm5hbWVudDtcclxuICAgICAgICAvKiB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdG91cm5hbWVudDtcclxuICAgICAgICB9ICovXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW50ZXIgdG91cm5hbWVudFxyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUb3VybmFtZW50RW50cnk+fSBUb3VybmFtZW50IEVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVUb3VybmFtZW50RW50cnkodXNlcklEOiBzdHJpbmcsIHRvdXJuYW1lbnRJRDogc3RyaW5nLCBjb3Vyc2VJRDogc3RyaW5nLCBkaXZpc2lvbjogR29sZkRpdmlzaW9uLCBnZW5kZXI6IEdlbmRlciwgaGFuZGljYXBJbmRleDogbnVtYmVyLCB0ZWU6IHN0cmluZyx0ZWFtTmFtZT86c3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50RW50cnk+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudCA9IGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5nZXRUb3VybmFtZW50KHRvdXJuYW1lbnRJRCk7XHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIHRvdXJuYW1lbnQgSURcclxuICAgICAgICAgICAgaWYgKCF0b3VybmFtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5SYW5nZSwgRXJyb3JNZXNzYWdlLkludmFsaWRUb3VybmFtZW50SWQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVmFsaWRhdGUgZGl2aXNpb25cclxuICAgICAgICAgICAgaWYgKCFfLmluY2x1ZGVzKE9iamVjdC52YWx1ZXModG91cm5hbWVudC5kaXZpc2lvbnMpLCBkaXZpc2lvbi50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuUmFuZ2UsIEVycm9yTWVzc2FnZS5JbnZhbGlkVG91cm5hbWVudERpdmlzaW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGVudHJ5XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVG91cm5hbWVudEVudHJ5OiBUb3VybmFtZW50RW50cnkgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTy5nZXRCeUZpbHRlcnMoXHJcbiAgICAgICAgICAgICAgICBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInVzZXJJZFwiLCB1c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInRvdXJuYW1lbnRJZFwiLCB0b3VybmFtZW50SUQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJ1aWxkQWxsKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXhpc3RpbmdUb3VybmFtZW50RW50cnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLlRvdXJuYW1lbnRFbnRyeU5vdEV4aXN0cykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiAgY29uc3QgZW50ZXJlZENvdXJzZSA9IF8uZmluZCh0b3VybmFtZW50LmNvdXJzZXMsICh0b3VybmFtZW50R29sZkNvdXJzZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIHJldHVybiB0b3VybmFtZW50R29sZkNvdXJzZS5jb3Vyc2UuX2lkID09IGNvdXJzZUlEO1xyXG4gICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgICAgIGNvbnN0IGVudGVyZWRDb3Vyc2U6IGFueSA9IGF3YWl0IEdvbGZDb3Vyc2VTY2hlbWEuZmluZEJ5SWQoY291cnNlSUQpLmV4ZWMoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVudGVyZWRUZWUgPSBfLmZpbmQoZW50ZXJlZENvdXJzZS50ZWVzLCAoZ29sZlRlZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvbGZUZWUuX2lkID09IHRlZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb3Vyc2VSYXRpbmcgPSBOdW1iZXIoZW50ZXJlZFRlZS5jb3Vyc2VSYXRpbmcpO1xyXG4gICAgICAgICAgICBjb25zdCBzbG9wZVJhdGluZyA9IE51bWJlcihlbnRlcmVkVGVlLnNsb3BlUmF0aW5nKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyID0gTnVtYmVyKGVudGVyZWRUZWUucGFyKTtcclxuICAgICAgICAgICAgY29uc3QgaG9sZXMgPSBlbnRlcmVkVGVlLmhvbGVzO1xyXG5cclxuICAgICAgICAgICAgLy9Db3Vyc2UgSGFuZGljYXAgPSAoSGFuZGljYXAgSW5kZXggKiBTbG9wZSBSYXRpbmcgLyAxMTMpICsgKENSIC0gUGFyKVxyXG4gICAgICAgICAgICBjb25zdCBjb3Vyc2VJbmRleCA9IE1hdGgucm91bmQoKE51bWJlcihoYW5kaWNhcEluZGV4KSAqIHNsb3BlUmF0aW5nIC8gMTEzKSArIChjb3Vyc2VSYXRpbmcgLSBwYXIpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdG9yZWRTY29yZWNhcmQ6IFRvdXJuYW1lbnRTY29yZWNhcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRTY29yZWNhcmREQU8uZ2V0QnlJRChleGlzdGluZ1RvdXJuYW1lbnRFbnRyeS5zY29yZWNhcmRJZCk7XHJcblxyXG4gICAgICAgICAgICBzdG9yZWRTY29yZWNhcmRbJ2NvdXJzZSddID0gR29sZkNvdXJzZS5mcm9tSWQoY291cnNlSUQpO1xyXG4gICAgICAgICAgICBzdG9yZWRTY29yZWNhcmRbJ2hhbmRpY2FwSW5kZXgnXSA9IGhhbmRpY2FwSW5kZXg7XHJcbiAgICAgICAgICAgIHN0b3JlZFNjb3JlY2FyZFsnY291cnNlSW5kZXgnXSA9IGNvdXJzZUluZGV4O1xyXG4gICAgICAgICAgICBzdG9yZWRTY29yZWNhcmRbJ3RlZSddID0gZW50ZXJlZFRlZS5uYW1lO1xyXG4gICAgICAgICAgICBzdG9yZWRTY29yZWNhcmRbJ3RlZUlkJ10gPSBlbnRlcmVkVGVlLl9pZDtcclxuICAgICAgICAgICAgc3RvcmVkU2NvcmVjYXJkWyd0ZWFtTmFtZSddID0gdGVhbU5hbWUgPyB0ZWFtTmFtZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLnVwZGF0ZUFueShzdG9yZWRTY29yZWNhcmQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndWRwYXRlIHNjcm9yZWNhcmQ6OjonLCBzdG9yZWRTY29yZWNhcmQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZExlYWRlcmJvYXJkOiBUb3VybmFtZW50TGVhZGVyYm9hcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRMZWFkZXJib2FyZERBTy5nZXRCeUlEKGV4aXN0aW5nVG91cm5hbWVudEVudHJ5LmxlYWRlcmJvYXJkSWQpO1xyXG4gICAgICAgICAgICBzdG9yZWRMZWFkZXJib2FyZFsnY291cnNlSWQnXSA9IGNvdXJzZUlEO1xyXG4gICAgICAgICAgICBzdG9yZWRMZWFkZXJib2FyZFsndG90YWwnXSA9IGNvdXJzZUluZGV4O1xyXG4gICAgICAgICAgICBzdG9yZWRMZWFkZXJib2FyZFsndGVhbU5hbWUnXSA9IHRlYW1OYW1lID8gdGVhbU5hbWUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IHN0b3JlZExlYWRlcmJvYXJkLl9pZCxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHN0b3JlZExlYWRlcmJvYXJkLnVzZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiBzdG9yZWRMZWFkZXJib2FyZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcblxyXG4gICAgICAgICAgICBleGlzdGluZ1RvdXJuYW1lbnRFbnRyeVsnY291cnNlSWQnXSA9IGNvdXJzZUlEO1xyXG4gICAgICAgICAgICBleGlzdGluZ1RvdXJuYW1lbnRFbnRyeVsnaGFuZGljYXBJbmRleCddID0gaGFuZGljYXBJbmRleDtcclxuICAgICAgICAgICAgZXhpc3RpbmdUb3VybmFtZW50RW50cnlbJ3RlZSddID0gZW50ZXJlZFRlZS5uYW1lO1xyXG4gICAgICAgICAgICBleGlzdGluZ1RvdXJuYW1lbnRFbnRyeVsndGVhbU5hbWUnXSA9IHRlYW1OYW1lID8gdGVhbU5hbWUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50RW50cnlTY2hlbWEuZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IGV4aXN0aW5nVG91cm5hbWVudEVudHJ5Ll9pZCxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogZXhpc3RpbmdUb3VybmFtZW50RW50cnkudXNlcklkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDogZXhpc3RpbmdUb3VybmFtZW50RW50cnlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG5cclxuICAgICAgICAgICAgLy9hd2FpdCB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTy51cGRhdGUoZXhpc3RpbmdUb3VybmFtZW50RW50cnkpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VkcGF0ZSBleGlzdGluZ1RvdXJuYW1lbnRFbnRyeTo6OicsIGV4aXN0aW5nVG91cm5hbWVudEVudHJ5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZXhpc3RpbmdUb3VybmFtZW50RW50cnkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHVzZXIncyB0b3VybmFtZW50IHNjb3JlY2FyZFxyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkPn0gVG91cm5hbWVudCBzY29yZWNhcmQuXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgYXN5bmMgcGxheU5leHRSb3VuZCh1c2VySUQ6IHN0cmluZywgdG91cm5hbWVudElkOiBzdHJpbmcsKTogUHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwidG91cm5hbWVudElkXCIsIHRvdXJuYW1lbnRJZClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJ1c2VySWRcIiwgdXNlcklEKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkQWxsKCk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmRzID0gYXdhaXQgdGhpcy5nZXRBbGxSb3VuZFNjb3JlY2FyZCh1c2VySUQsbnVsbCx0b3VybmFtZW50SWQpOyAvL2F3YWl0IHRoaXMudG91cm5hbWVudFNjb3JlY2FyZERBTy5nZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudFNjb3JlY2FyZCA9IHRvdXJuYW1lbnRTY29yZWNhcmRzW3RvdXJuYW1lbnRTY29yZWNhcmRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Um91bmRTY29yZWNhcmQgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQgOiB0b3VybmFtZW50U2NvcmVjYXJkLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZCA6IHRvdXJuYW1lbnRTY29yZWNhcmQudG91cm5hbWVudElkLFxyXG4gICAgICAgICAgICAgICAgY291cnNlIDogdG91cm5hbWVudFNjb3JlY2FyZC5jb3Vyc2UsXHJcbiAgICAgICAgICAgICAgICBkaXZpc2lvbiA6IHRvdXJuYW1lbnRTY29yZWNhcmQuZGl2aXNpb24sXHJcbiAgICAgICAgICAgICAgICBoYW5kaWNhcEluZGV4IDogdG91cm5hbWVudFNjb3JlY2FyZC5oYW5kaWNhcEluZGV4LFxyXG4gICAgICAgICAgICAgICAgY291cnNlSW5kZXggOiB0b3VybmFtZW50U2NvcmVjYXJkLmNvdXJzZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgdGVlIDogdG91cm5hbWVudFNjb3JlY2FyZC50ZWUsXHJcbiAgICAgICAgICAgICAgICB0ZWVJZCA6IHRvdXJuYW1lbnRTY29yZWNhcmQudGVlSWQsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXIgOiB0b3VybmFtZW50U2NvcmVjYXJkLmdlbmRlcixcclxuICAgICAgICAgICAgICAgIHJvdW5kIDogdG91cm5hbWVudFNjb3JlY2FyZFsncm91bmQnXSArIDEsXHJcbiAgICAgICAgICAgICAgICB0ZWFtTmFtZSA6IHRvdXJuYW1lbnRTY29yZWNhcmQudGVhbU5hbWVcclxuICAgICAgICAgICAgfSBhcyBUb3VybmFtZW50U2NvcmVjYXJkO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RvcmVkU2NvcmVjYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLmNyZWF0ZShuZXh0Um91bmRTY29yZWNhcmQpO1xyXG5cclxuICAgICAgICAgICAgLyogY29uc3QgYWxsUm91bmRMZWFkZXJib2FyZHMgPSBhd2FpdCB0aGlzLmdldEFsbFJvdW5kTGVhZGVyYm9hcmQodXNlcklELHRvdXJuYW1lbnRJZCk7IC8vYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLmdldE11bHRpcGxlQnlGaWx0ZXJzKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICBjb25zdCBsZWFkZXJib2FyZCA9IGFsbFJvdW5kTGVhZGVyYm9hcmRzW2FsbFJvdW5kTGVhZGVyYm9hcmRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Um91bmRMZWFkZXJib2FyZCA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXIgOiBsZWFkZXJib2FyZC51c2VyLFxyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudElkIDogbGVhZGVyYm9hcmQudG91cm5hbWVudElkLFxyXG4gICAgICAgICAgICAgICAgY291cnNlSWQgOiBsZWFkZXJib2FyZC5jb3Vyc2VJZCxcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uIDogbGVhZGVyYm9hcmQuZGl2aXNpb24sXHJcbiAgICAgICAgICAgICAgICB0b3RhbCA6IDAsXHJcbiAgICAgICAgICAgICAgICBob2xlcyA6IDAsXHJcbiAgICAgICAgICAgICAgICB0ZWFtTmFtZSA6IGxlYWRlcmJvYXJkLnRlYW1OYW1lLFxyXG4gICAgICAgICAgICAgICAgcm91bmQgOiBsZWFkZXJib2FyZFsncm91bmQnXSArIDFcclxuICAgICAgICAgICAgfSBhcyBUb3VybmFtZW50TGVhZGVyYm9hcmQ7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRvdXJuYW1lbnRMZWFkZXJib2FyZERBTy5jcmVhdGUobmV4dFJvdW5kTGVhZGVyYm9hcmQpOyAqL1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdG9yZWRTY29yZWNhcmQpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB1c2VyJ3MgdG91cm5hbWVudCBzY29yZWNhcmRcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudFNjb3JlY2FyZD59IFRvdXJuYW1lbnQgc2NvcmVjYXJkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2NvcmVjYXJkKHVzZXJJRDogc3RyaW5nLCBzY29yZWNhcmRJRDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiX2lkXCIsIHNjb3JlY2FyZElEKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInVzZXJJZFwiLCB1c2VySUQpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRTY29yZWNhcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRTY29yZWNhcmREQU8uZ2V0QnlGaWx0ZXJzKGZpbHRlcnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0b3VybmFtZW50U2NvcmVjYXJkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5Eb2VzTm90RXhpc3QsIEVycm9yTWVzc2FnZS5JbnZhbGlkU2NvcmVjYXJkSWQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50U2NvcmVjYXJkKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdXNlcidzIHRvdXJuYW1lbnQgc2NvcmVjYXJkXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+fSBUb3VybmFtZW50IHNjb3JlY2FyZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFBsYXllclNjb3JlY2FyZCh1c2VySUQ6IHN0cmluZywgdG91cm5hbWVudElEOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudFNjb3JlY2FyZCA9IGF3YWl0IHRoaXMudG91cm5hbWVudFNjb3JlY2FyZERBTy5nZXRQbGF5ZXJTY29yZWNhcmQodXNlcklELCB0b3VybmFtZW50SUQpO1xyXG4gICAgICAgICAgICBpZiAoIXRvdXJuYW1lbnRTY29yZWNhcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLkludmFsaWRTY29yZWNhcmRJZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudFNjb3JlY2FyZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdXNlcidzIHRvdXJuYW1lbnQgc2NvcmVjYXJkXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+fSBUb3VybmFtZW50IHNjb3JlY2FyZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFNjb3JlY2FyZEFuZENvdXJzZURhdGEodXNlcklEOiBzdHJpbmcsIHNjb3JlY2FyZElEOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRTY29yZWNhcmQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50U2NvcmVjYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLmdldFNjb3JlY2FyZCh1c2VySUQsIHNjb3JlY2FyZElEKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdG91cm5hbWVudFNjb3JlY2FyZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuRG9lc05vdEV4aXN0LCBFcnJvck1lc3NhZ2UuSW52YWxpZFNjb3JlY2FyZElkKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudFNjb3JlY2FyZCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHVzZXIncyB0b3VybmFtZW50IHNjb3JlY2FyZFxyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUb3VybmFtZW50U2NvcmVjYXJkW10+fSBUb3VybmFtZW50IHNjb3JlY2FyZC5cclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBnZXRBbGxSb3VuZFNjb3JlY2FyZCh1c2VySUQ6IHN0cmluZywgc2NvcmVjYXJkSUQ6IHN0cmluZyx0b3VybmFtZW50SUQ6IHN0cmluZyk6IFByb21pc2U8VG91cm5hbWVudFNjb3JlY2FyZFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudFNjb3JlY2FyZHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRTY29yZWNhcmREQU8uZ2V0QWxsUm91bmRTY29yZWNhcmQodXNlcklELCBzY29yZWNhcmRJRCx0b3VybmFtZW50SUQpO1xyXG4gICAgICAgICAgICBpZiAoIXRvdXJuYW1lbnRTY29yZWNhcmRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5Eb2VzTm90RXhpc3QsIEVycm9yTWVzc2FnZS5JbnZhbGlkU2NvcmVjYXJkSWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvdXJuYW1lbnRTY29yZWNhcmRzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBzY29yZWNhcmRcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudFNjb3JlY2FyZD59IFVwZGF0ZWQgdG91cm5hbWVudCBzY29yZWNhcmQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVTY29yZWNhcmQodXNlcklEOiBzdHJpbmcsIHNjb3JlY2FyZElEOiBzdHJpbmcsIHNjb3JlczogU2NvcmVbXSxsZWFkZXJib2FyZElkOnN0cmluZyk6IFByb21pc2U8VG91cm5hbWVudFNjb3JlY2FyZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIHNjb3JlY2FyZCBJRFxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50U2NvcmVjYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLmdldFNjb3JlY2FyZCh1c2VySUQsIHNjb3JlY2FyZElEKTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoIXRvdXJuYW1lbnRTY29yZWNhcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLkludmFsaWRTY29yZWNhcmRJZCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc2NvcmVjYXJkXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRUb3VybmFtZW50U2NvcmVjYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50U2NvcmVjYXJkREFPLnVwZGF0ZVNjb3Jlcyh1c2VySUQsIHNjb3JlY2FyZElELCBzY29yZXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGVudGVyZWRUZWUgPSBfLmZpbmQodG91cm5hbWVudFNjb3JlY2FyZC5jb3Vyc2UudGVlcywgKGdvbGZUZWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnb2xmVGVlLl9pZCA9PT0gdG91cm5hbWVudFNjb3JlY2FyZC50ZWVJZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghZW50ZXJlZFRlZSkge1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZFRlZSA9IF8uZmluZCh0b3VybmFtZW50U2NvcmVjYXJkLmNvdXJzZS50ZWVzLCAoZ29sZlRlZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnb2xmVGVlLm5hbWUgPT09IHRvdXJuYW1lbnRTY29yZWNhcmQudGVlICYmIGdvbGZUZWUuZ2VuZGVyID09PSB0b3VybmFtZW50U2NvcmVjYXJkLmdlbmRlcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZW50ZXJlZFRlZSkge1xyXG4gICAgICAgICAgICAgICAgZW50ZXJlZFRlZSA9IHRvdXJuYW1lbnRTY29yZWNhcmQuY291cnNlLnRlZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY291cnNlUmF0aW5nID0gTnVtYmVyKGVudGVyZWRUZWUuY291cnNlUmF0aW5nKTtcclxuICAgICAgICAgICAgY29uc3Qgc2xvcGVSYXRpbmcgPSBOdW1iZXIoZW50ZXJlZFRlZS5zbG9wZVJhdGluZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhciA9IE51bWJlcihlbnRlcmVkVGVlLnBhcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvbGVzID0gZW50ZXJlZFRlZS5ob2xlcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFJvdW5kU2NvcmVjYXJkcyA9IGF3YWl0IHRoaXMuZ2V0QWxsUm91bmRTY29yZWNhcmQodXNlcklELHNjb3JlY2FyZElELHRvdXJuYW1lbnRTY29yZWNhcmQudG91cm5hbWVudElkKTtcclxuICAgICAgICAgICAgY29uc3QgbGVhZGVyYm9hcmQgPSBhd2FpdCB0aGlzLmdldExlYWRlcmJvYXJkQnlJZChsZWFkZXJib2FyZElkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vQ291cnNlIEhhbmRpY2FwID0gKEhhbmRpY2FwIEluZGV4ICogU2xvcGUgUmF0aW5nIC8gMTEzKSArIChDUiAtIFBhcilcclxuICAgICAgICAgICAgY29uc3QgY291cnNlSW5kZXggPSBNYXRoLnJvdW5kKChOdW1iZXIodG91cm5hbWVudFNjb3JlY2FyZC5oYW5kaWNhcEluZGV4KSAqIHNsb3BlUmF0aW5nIC8gMTEzKSArIChjb3Vyc2VSYXRpbmcgLSBwYXIpKTtcclxuICAgICAgICAgICAgbGV0IHRvdGFsUG9pbnRzID0gMDtcclxuICAgICAgICAgICAgbGV0IG51bWJlck9mUGxheWVkSG9sZXMgPSAwO1xyXG4gICAgICAgICAgICBhbGxSb3VuZFNjb3JlY2FyZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5jYWxjdWxhdGVUb3RhbChlbGVtZW50LnNjb3JlcywgaG9sZXMpO1xyXG4gICAgICAgICAgICAgICAgdG90YWxQb2ludHMgPSB0b3RhbFBvaW50cyArIHRvdGFsLnRvdGFsUG9pbnRzICsgY291cnNlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBsYXllZEhvbGVzID0gbnVtYmVyT2ZQbGF5ZWRIb2xlcyArIHRvdGFsLm51bWJlck9mUGxheWVkSG9sZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um91bmREZXRhaWxzID0gdGhpcy5jYWxjdWxhdGVUb3RhbChzY29yZXMsIGhvbGVzKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3VuZCA9IGFsbFJvdW5kU2NvcmVjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Um91bmRUb3RhbCA9IGN1cnJlbnRSb3VuZERldGFpbHMudG90YWxQb2ludHMgKyBjb3Vyc2VJbmRleDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3VuZEhvbGVzID0gY3VycmVudFJvdW5kRGV0YWlscy5udW1iZXJPZlBsYXllZEhvbGVzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9sZXQgbnVtYmVyT2ZQbGF5ZWRIb2xlcyA9IGxlYWRlcmJvYXJkLmhvbGVzICsgdG90YWwubnVtYmVyT2ZQbGF5ZWRIb2xlcztcclxuICAgICAgICAgICAgLy9sZXQgdG90YWxQb2ludHMgPSB0b3RhbC50b3RhbFBvaW50cztcclxuICAgICAgICAgICAgLy9sZXQgbmV0ID0gdG90YWxQb2ludHMgKyBjb3Vyc2VJbmRleDtcclxuICAgICAgICAgICAgbGV0IHJvdW5kID0gbGVhZGVyYm9hcmQucm91bmQ7XHJcbiAgICAgICAgICAgIGlmKGxlYWRlcmJvYXJkLnJvdW5kIDwgdG91cm5hbWVudFNjb3JlY2FyZC5yb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcm91bmQgPSB0b3VybmFtZW50U2NvcmVjYXJkLnJvdW5kO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhudW1iZXJPZlBsYXllZEhvbGVzKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmluZm8odG90YWxQb2ludHMpO1xyXG4gICAgICAgICAgIC8vIExvZ2dlci5pbmZvKG5ldCk7XHJcblxyXG4gICAgICAgICAgICAvL2F3YWl0IHRoaXMudG91cm5hbWVudExlYWRlcmJvYXJkREFPLnVwZGF0ZUxlYWRlcmJvYXJkKHVzZXJJRCwgdG91cm5hbWVudFNjb3JlY2FyZC50b3VybmFtZW50SWQsIHRvdXJuYW1lbnRTY29yZWNhcmQuY291cnNlLl9pZCwgbmV0LCBudW1iZXJPZlBsYXllZEhvbGVzLHJvdW5kKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy50b3VybmFtZW50TGVhZGVyYm9hcmREQU8udXBkYXRlTGVhZGVyYm9hcmQodXNlcklELCB0b3VybmFtZW50U2NvcmVjYXJkLnRvdXJuYW1lbnRJZCwgdG91cm5hbWVudFNjb3JlY2FyZC5jb3Vyc2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRzLCBudW1iZXJPZlBsYXllZEhvbGVzLHJvdW5kLGN1cnJlbnRSb3VuZCxjdXJyZW50Um91bmRUb3RhbCxjdXJyZW50Um91bmRIb2xlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZWRUb3VybmFtZW50U2NvcmVjYXJkKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRvdXJuYW1lbnQgbGVhZGVyYm9hcmRcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudExlYWRlcmJvYXJkW10+fSBUb3VybmFtZW50IGxlYWRlcmJvYXJkIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRMZWFkZXJib2FyZCh1c2VySUQ6IHN0cmluZywgbGVhZGVyYm9hcmRJRDogc3RyaW5nKTogUHJvbWlzZTxUb3VybmFtZW50TGVhZGVyYm9hcmRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwidXNlclwiLCB1c2VySUQpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiX2lkXCIsIGxlYWRlcmJvYXJkSUQpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlclRvdXJuYW1lbnRMZWFkZXJib2FyZFJlY29yZCA9IGF3YWl0IHRoaXMudG91cm5hbWVudExlYWRlcmJvYXJkREFPLmdldEJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgaWYgKHVzZXJUb3VybmFtZW50TGVhZGVyYm9hcmRSZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRMZWFkZXJib2FyZCA9IGF3YWl0IHRoaXMudG91cm5hbWVudExlYWRlcmJvYXJkREFPLmdldExlYWRlcmJvYXJkKHVzZXJUb3VybmFtZW50TGVhZGVyYm9hcmRSZWNvcmQudG91cm5hbWVudElkLCB1c2VyVG91cm5hbWVudExlYWRlcmJvYXJkUmVjb3JkLmRpdmlzaW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudExlYWRlcmJvYXJkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLkludmFsaWRMZWFkZXJib2FyZElkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0b3VybmFtZW50IGxlYWRlcmJvYXJkXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRMZWFkZXJib2FyZD59IFRvdXJuYW1lbnQgbGVhZGVyYm9hcmQgbGlzdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldExlYWRlcmJvYXJkQnlJZChsZWFkZXJib2FyZElkOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRMZWFkZXJib2FyZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiX2lkXCIsIGxlYWRlcmJvYXJkSWQpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuICAgICAgICAgICAgY29uc3QgbGVhZGVyYm9hcmQgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRMZWFkZXJib2FyZERBTy5nZXRCeUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgIGlmIChsZWFkZXJib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsZWFkZXJib2FyZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5Eb2VzTm90RXhpc3QsIEVycm9yTWVzc2FnZS5JbnZhbGlkTGVhZGVyYm9hcmRJZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRvdXJuYW1lbnQgbGVhZGVyYm9hcmRcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudExlYWRlcmJvYXJkW10+fSBUb3VybmFtZW50IGxlYWRlcmJvYXJkIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRUb3VybmFtZW50TGVhZGVyYm9hcmQodG91cm5hbWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRMZWFkZXJib2FyZFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudExlYWRlcmJvYXJkID0gYXdhaXQgdGhpcy50b3VybmFtZW50TGVhZGVyYm9hcmREQU8uZ2V0TGVhZGVyYm9hcmQodG91cm5hbWVudElkKTtcclxuICAgICAgICAgICAgLy9Mb2dnZXIuZGVidWcoJ3RvdXJuYW1lbnRMZWFkZXJib2FyZCcpO1xyXG4gICAgICAgICAgICAvL0xvZ2dlci5kZWJ1Zyh0b3VybmFtZW50TGVhZGVyYm9hcmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvdXJuYW1lbnRMZWFkZXJib2FyZCk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0b3VybmFtZW50IGVudHJ5XHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRFbnRyeT59IFRvdXJuYW1lbnQgZW50cnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFRvdXJuYW1lbnRFbnRyeSh1c2VySUQ6IHN0cmluZywgdG91cm5hbWVudElkOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRFbnRyeT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwidXNlcklkXCIsIHVzZXJJRClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJ0b3VybmFtZW50SWRcIiwgdG91cm5hbWVudElkKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50RW50cnkgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTy5nZXRCeUZpbHRlcnMoZmlsdGVycyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRvdXJuYW1lbnRFbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuRG9lc05vdEV4aXN0LCBFcnJvck1lc3NhZ2UuSW52YWxpZFRvdXJuYW1lbnRJZCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvdXJuYW1lbnRFbnRyeSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdG91cm5hbWVudCBlbnRyaWVzXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRFbnRyeVtdPn0gVG91cm5hbWVudCBlbnRyeSBsaXN0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudEVudHJpZXModXNlcklEOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRFbnRyeVtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IG5ldyBGaWx0ZXJCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJ1c2VySWRcIiwgdXNlcklEKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50RW50cmllcyA9IGF3YWl0IHRoaXMudG91cm5hbWVudEVudHJ5REFPLmdldE11bHRpcGxlQnlGaWx0ZXJzKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvdXJuYW1lbnRFbnRyaWVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhY3RpdmUgdG91cm5hbWVudCBlbnRyaWVzXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFRvdXJuYW1lbnRFbnRyeVtdPn0gVG91cm5hbWVudCBlbnRyeSBsaXN0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWN0aXZlVG91cm5hbWVudEVudHJpZXModXNlcklEOiBzdHJpbmcpOiBQcm9taXNlPFRvdXJuYW1lbnRFbnRyeVtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IG5ldyBGaWx0ZXJCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJ1c2VySWRcIiwgdXNlcklEKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInN0YXJ0RGF0ZVwiLCBuZXcgR3JlYXRlclRoYW5PckVxdWFsRmlsdGVyKG5ldyBEYXRlKCkpKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcImVuZERhdGVcIiwgbmV3IExlc3NUaGFuT3JFcXVhbEZpbHRlcihuZXcgRGF0ZSgpKSlcclxuICAgICAgICAgICAgICAgIC5idWlsZEFsbCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudEVudHJpZXMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRFbnRyeURBTy5nZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50RW50cmllcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdG91cm5hbWVudCByZXN1bHRcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBzdWNjZWVkZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVUb3VybmFtZW50UmVzdWx0KHVzZXJJRDogc3RyaW5nLCB0b3VybmFtZW50SUQ6IHN0cmluZywgY291cnNlSUQ6IHN0cmluZywgZGl2aXNpb246IEdvbGZEaXZpc2lvbiwgdG90YWw6IG51bWJlciwgaG9sZXM6IG51bWJlciwgcm91bmQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyOiBVc2VyLmZyb21JZCh1c2VySUQpLFxyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudDogVG91cm5hbWVudC5mcm9tSWQodG91cm5hbWVudElEKSxcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgIGRpdmlzaW9uOiBkaXZpc2lvbixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIGhvbGVzOiBob2xlcyxcclxuICAgICAgICAgICAgICAgIHJvdW5kOiByb3VuZFxyXG4gICAgICAgICAgICB9IGFzIFRvdXJuYW1lbnRSZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnRvdXJuYW1lbnRSZXN1bHREQU8uY3JlYXRlKHRvdXJuYW1lbnRSZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0b3VybmFtZW50IHJlc3VsdHNcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBzdWNjZWVkZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVUb3VybmFtZW50UmVzdWx0cyh0b3VybmFtZW50SUQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKGBjcmVhdGVUb3VybmFtZW50UmVzdWx0cy5gKTtcclxuICAgICAgICAgICAgbGV0IHRvdXJuYW1lbnQgPSBhd2FpdCB0aGlzLmdldFRvdXJuYW1lbnQodG91cm5hbWVudElEKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vY29uc3QgdG91cm5hbWVudERpdmlzaW9ucyA9IFtcIkNIQU1QXCIsXCJDRUxFQlJJVFlcIixcIlBST0ZFU1NJT05BTF9HT0xGRVJcIixcIlBHQSBQcm9cIl07IC8vdG91cm5hbWVudC5kaXZpc2lvbnM7XHJcbiAgICAgICAgICAgIGxldCB0b3VybmFtZW50UmVzdWx0czogVG91cm5hbWVudFJlc3VsdFtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBsZWFkZXJib2FyZFdpdGhQb2ludHMgPSBhd2FpdCB0aGlzLmNhbGN1bGF0ZVBsYXllcnNQb2ludHModG91cm5hbWVudElEKTtcclxuICAgICAgICAgICAgbGV0IHBsYXllcnNQb2ludHMgPSBsZWFkZXJib2FyZFdpdGhQb2ludHMucGxheWVyc1BvaW50cztcclxuICAgICAgICAgICAgbGV0IHRvdXJuYW1lbnRMZWFkZXJib2FyZHMgPSBsZWFkZXJib2FyZFdpdGhQb2ludHMubGVhZGVyYm9hcmRzO1xyXG4gICAgICAgICAgICBjb25zdCBhdmdJbmRleCA9IGxlYWRlcmJvYXJkV2l0aFBvaW50cy5hdmdJbmRleDtcclxuICAgICAgICAgICAgLy8gTWFwIHRvdXJuYW1lbnQgcmVzdWx0c1xyXG4gICAgICAgICAgICBjb25zdCBkaXZpc2lvblRvdXJuYW1lbnRSZXN1bHRzID0gXy5tYXAodG91cm5hbWVudExlYWRlcmJvYXJkcywgKHRvdXJuYW1lbnRMZWFkZXJib2FyZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50cyA9IHBsYXllcnNQb2ludHMuZmluZChvID0+IG8udXNlcklkID09IHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyKT8ucG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYodG91cm5hbWVudC5ob3N0aW5nQ2x1YiAmJiBTdHJpbmcodG91cm5hbWVudC5ob3N0aW5nQ2x1Yi5faWQpID09IFN0cmluZyh0b3VybmFtZW50TGVhZGVyYm9hcmQuY291cnNlSWQuY2x1YklkLl9pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5pbmZvKCdkb3VibGluZyB0aGUgcG9pbnRzIG9mIGhvc3RpbmcgY2x1YiBwbGF5ZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzID0gMipwb2ludHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNDaGFsbGVuZ2UgPSB0b3VybmFtZW50LnR5cGUgPT09ICdDaGFsbGVuZ2UnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB0b3VybmFtZW50TGVhZGVyYm9hcmQudXNlcixcclxuICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50OiBUb3VybmFtZW50LmZyb21JZCh0b3VybmFtZW50SUQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlkOiB0b3VybmFtZW50TGVhZGVyYm9hcmQuY291cnNlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aXNpb246IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5kaXZpc2lvbixcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogdG91cm5hbWVudExlYWRlcmJvYXJkLnRvdGFsLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbGVzOiB0b3VybmFtZW50TGVhZGVyYm9hcmQuaG9sZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcm91bmQ6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5yb3VuZCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHM6ICFpc0NoYWxsZW5nZSA/IHBvaW50cyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9udXNQb2ludHM6IGlzQ2hhbGxlbmdlID8gcG9pbnRzIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBhdmdJbmRleCA6IGF2Z0luZGV4XHJcbiAgICAgICAgICAgICAgICB9IGFzIFRvdXJuYW1lbnRSZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdG91cm5hbWVudFJlc3VsdHMucHVzaCguLi5kaXZpc2lvblRvdXJuYW1lbnRSZXN1bHRzKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKGAke3RvdXJuYW1lbnRSZXN1bHRzLmxlbmd0aH0gdG91cm5hbWVudCByZXN1bHRzIGNyZWF0ZWQuYCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudG91cm5hbWVudFJlc3VsdERBTy5jcmVhdGVNYW55KHRvdXJuYW1lbnRSZXN1bHRzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNhbGN1bGF0ZVBsYXllcnNQb2ludHModG91cm5hbWVudElkKSB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVycyA9IG5ldyBGaWx0ZXJCdWlsZGVyKClcclxuICAgICAgICAgICAgLmFkZEZpbHRlcihcInRvdXJuYW1lbnRJZFwiLCB0b3VybmFtZW50SWQpXHJcbiAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJob2xlc1wiLG5ldyBHcmVhdGVyVGhhbk9yRXF1YWxGaWx0ZXIoMSkpXHJcbiAgICAgICAgICAgIC5idWlsZEFsbCgpO1xyXG5cclxuICAgICAgICAvL2NvbnN0IHRvdXJuYW1lbnRMZWFkZXJib2FyZHMgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRMZWFkZXJib2FyZERBTy5nZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50TGVhZGVyYm9hcmRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50TGVhZGVyYm9hcmREQU8uZ2V0TGVhZGVyYm9hcmRGb3JSZXN1bHRzKHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbGVhZGVyYm9hcmQ6OicsdG91cm5hbWVudExlYWRlcmJvYXJkcyk7XHJcbiAgICAgICAgLy90b3VybmFtZW50TGVhZGVyYm9hcmRzLmZvckVhY2goKCk9Pnt9KTtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50RW50cmllcyA9IGF3YWl0IHRoaXMudG91cm5hbWVudEVudHJ5REFPLmdldE11bHRpcGxlQnlGaWx0ZXJzKFxyXG4gICAgICAgICAgICBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwidG91cm5hbWVudElkXCIsIHRvdXJuYW1lbnRJZClcclxuICAgICAgICAgICAgICAgIC5idWlsZEFsbCgpXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCd0b3VybmFtZW50RW50cmllczo6JyxKU09OLnN0cmluZ2lmeSh0b3VybmFtZW50RW50cmllcykpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkU2l6ZSA9IHRvdXJuYW1lbnRFbnRyaWVzLmxlbmd0aDtcclxuICAgICAgICBpZiAoZmllbGRTaXplICYmIGZpZWxkU2l6ZSA+IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdXJuYW1lbnRJZDo6OicsIHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaWVsZFNpemU6OjonLCBmaWVsZFNpemUpO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRTaXplTWV0YURhdGEgPSByYW5rUG9pbnRGaWVsZER0bHMuZmluZChvID0+IG8uZmllbGRTaXplID09PSBmaWVsZFNpemUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmllbGRTaXplTWV0YURhdGE6OjonLCBmaWVsZFNpemVNZXRhRGF0YSk7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbEluZGV4ID0gMDtcclxuICAgICAgICAgICAgdG91cm5hbWVudEVudHJpZXMuZm9yRWFjaChlbnRyaWVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRvdGFsSW5kZXggPSB0b3RhbEluZGV4ICsgZW50cmllcy5oYW5kaWNhcEluZGV4O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgYXZnSW5kZXggPSB0b3RhbEluZGV4IC8gZmllbGRTaXplO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhdmdJbmRleCcsIGF2Z0luZGV4KTtcclxuICAgICAgICAgICAgbGV0IHBsYXllclBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgc29ydGVkTGVhZGVyYm9hcmQgPSB0b3VybmFtZW50TGVhZGVyYm9hcmRzLnNvcnQoKGEsIGIpID0+IGEudG90YWwgPCBiLnRvdGFsID8gMSA6IC0xKVxyXG4gICAgICAgICAgICBsZXQgcmFua2VkTGVhZGVyQm9hcmQgPSB0aGlzLm1hcFJhbmtpbmcoc29ydGVkTGVhZGVyYm9hcmQsICd0b3RhbCcpLnNvcnQoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc29ydGVkJyxyYW5rZWRMZWFkZXJCb2FyZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFua2VkTGVhZGVyQm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJMQiA9IHJhbmtlZExlYWRlckJvYXJkW2ldO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGxheWVyTEInLHBsYXllckxCKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJMQi5kaXZpc2lvbi50b0xvd2VyQ2FzZSgpID09PSBHb2xmRGl2aXNpb24uQ2VsZWJyaXR5LnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgICAgICB8fCBwbGF5ZXJMQi5kaXZpc2lvbi50b0xvd2VyQ2FzZSgpID09PSBHb2xmRGl2aXNpb24uUEdBUHJvLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgICAgICB8fCBwbGF5ZXJMQi5kaXZpc2lvbi50b0xvd2VyQ2FzZSgpID09PSBHb2xmRGl2aXNpb24uVG91clBsYXllci50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRUQiA9IHBvaW50c1RhYmxlLkNFTEVCUklUWTtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJQb2ludHMucHVzaCh0aGlzLmdldENhbGNQb2ludHMocGxheWVyTEIsIHBvaW50VEIsIGF2Z0luZGV4LCBmaWVsZFNpemVNZXRhRGF0YSkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50VEIgPSBwb2ludHNUYWJsZS5DSEFNUDtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJQb2ludHMucHVzaCh0aGlzLmdldENhbGNQb2ludHMocGxheWVyTEIsIHBvaW50VEIsIGF2Z0luZGV4LCBmaWVsZFNpemVNZXRhRGF0YSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGxheWVyc1BvaW50cycscGxheWVyUG9pbnRzKTtcclxuICAgICAgICAgICAgbGV0IGxlYWRlcmJvYXJkV2l0aFBvaW50cyA9IHtcclxuICAgICAgICAgICAgICAgIFwicGxheWVyc1BvaW50c1wiOiBwbGF5ZXJQb2ludHMsXHJcbiAgICAgICAgICAgICAgICBcImxlYWRlcmJvYXJkc1wiOiByYW5rZWRMZWFkZXJCb2FyZCxcclxuICAgICAgICAgICAgICAgIFwiYXZnSW5kZXhcIiA6IGF2Z0luZGV4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsZWFkZXJib2FyZFdpdGhQb2ludHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsZWFkZXJib2FyZFdpdGhQb2ludHMgPSB7XHJcbiAgICAgICAgICAgICAgICBcInBsYXllcnNQb2ludHNcIjogW10sXHJcbiAgICAgICAgICAgICAgICBcImxlYWRlcmJvYXJkc1wiOiB0b3VybmFtZW50TGVhZGVyYm9hcmRzLFxyXG4gICAgICAgICAgICAgICAgXCJhdmdJbmRleFwiIDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsZWFkZXJib2FyZFdpdGhQb2ludHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1hcFJhbmtpbmcoYXJyYXksIGtleSkge1xyXG4gICAgICAgIGxldCByYW5rID0gMTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgbGV0IHRpZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoaSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialtrZXldICE9PSBhcnJheVtpIC0gMV1ba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmsgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGllID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA8IGFycmF5Lmxlbmd0aCAtIDEgJiYgb2JqW2tleV0gPT0gYXJyYXlbaSArIDFdW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRpZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRpZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqWydyYW5rJ10gPSAnVCcgKyByYW5rO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqWydyYW5rJ10gPSByYW5rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYWxjUG9pbnRzKHBsYXllckxCLCBwb2ludHNUYWJsZSwgYXZnSW5kZXgsIGZpZWxkU2l6ZU1ldGFEYXRhKSB7XHJcbiAgICAgICAgbGV0IHBvaW50Q29sdW1uO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9pbnRzVGFibGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHBvaW50c1RhYmxlW2pdO1xyXG4gICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2Z0luZGV4IDw9IGNvbHVtbi5lbmRBdmdJbmRleFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHBsYXllckxCLmRpdmlzaW9uLnRvTG93ZXJDYXNlKCkgPT09IEdvbGZEaXZpc2lvbi5QR0FQcm8udG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHBsYXllckxCLmRpdmlzaW9uLnRvTG93ZXJDYXNlKCkgPT09IEdvbGZEaXZpc2lvbi5Ub3VyUGxheWVyLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludENvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhdmdJbmRleCA+PSBjb2x1bW4uc3RhcnRBdmdJbmRleCAmJiBhdmdJbmRleCA8PSBjb2x1bW4uZW5kQXZnSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50Q29sdW1uID0gY29sdW1uO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gcGxheWVyTEIucmFuaztcclxuICAgICAgICAvL2NoZWNrIHBvc2l0aW9uIGFib3ZlIGN1dFxyXG4gICAgICAgIGlmIChpc05hTihwb3NpdGlvbikgJiYgcG9zaXRpb24uaW5jbHVkZXMoJ1QnKSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLnNwbGl0KCdUJylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXZpc2lvbjo6JywgcGxheWVyTEIuZGl2aXNpb24pO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHBsYXllckxCLnVzZXIrJyBwb2ludHMnLHBvaW50Q29sdW1uKTtcclxuICAgICAgICBpZiAoTnVtYmVyKHBvc2l0aW9uKSA8PSBmaWVsZFNpemVNZXRhRGF0YS5jdXQpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gcG9pbnRDb2x1bW4ucG9pbnRzX3Bvc2l0aW9uLmZpbmQobyA9PiBvLnBvc2l0aW9uID09IHBvc2l0aW9uKS5wb2ludHMgLyBmaWVsZFNpemVNZXRhRGF0YS5kaXZpc29yO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyUG9pbnRzID0geyB1c2VySWQ6IHBsYXllckxCLnVzZXIsIHBvaW50czogTWF0aC5yb3VuZChwb2ludHMgKiAxMCkvMTAgfTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BsYXllcnBvaW50cycsIHBsYXllclBvaW50cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJQb2ludHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcklkOiBwbGF5ZXJMQi51c2VyLCBwb2ludHM6IDAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrIHRvdXJuYW1lbnQgYXMgcHJvY2Vzc2VkXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBXaGV0aGVyIHRoZSBvcGVyYXRpb24gc3VjY2VlZGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgbWFya1RvdXJuYW1lbnRBc1Byb2Nlc3NlZCh0b3VybmFtZW50SUQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5tYXJrVG91cm5hbWVudEFzUHJvY2Vzc2VkKHRvdXJuYW1lbnRJRCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0b3VybmFtZW50IHJlc3VsdHNcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VG91cm5hbWVudFJlc3VsdFtdPn0gVG91cm5hbWVudCByZXN1bHQgbGlzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudFJlc3VsdHModG91cm5hbWVudElEOiBzdHJpbmcsIGRpdmlzaW9uOiBHb2xmRGl2aXNpb24pOiBQcm9taXNlPFRvdXJuYW1lbnRSZXN1bHRbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRSZXN1bHRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50UmVzdWx0REFPLmdldFRvdXJuYW1lbnRSZXN1bHRzKHRvdXJuYW1lbnRJRCwgZGl2aXNpb24pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50UmVzdWx0cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCByYW5raW5nXHJcbiAgICAqIEBhc3luY1xyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSYW5raW5nW10+fSBSYW5raW5nIGxpc3RcclxuICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0UmFua2luZyhjb3VudHJ5Q29kZXM6IHN0cmluZ1tdLCBkaXZpc2lvbjogR29sZkRpdmlzaW9uKTogUHJvbWlzZTxSYW5raW5nW10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByYW5raW5nczogYW55ID0gYXdhaXQgdGhpcy50b3VybmFtZW50UmVzdWx0REFPLmdldFJhbmtpbmcoY291bnRyeUNvZGVzLCBkaXZpc2lvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmFua2luZ3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgcmFua2luZ1xyXG4gICAgKiBAYXN5bmNcclxuICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmFua2luZyBsaXN0XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJzV2l0aE5vUG9pbnRzKGNvdW50cnlDb2Rlczogc3RyaW5nW10sIGRpdmlzaW9uOiBHb2xmRGl2aXNpb24sIHVzZXJXaXRoUG9pbnRzOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJXaXRoTm9Qb2ludHM6IGFueSA9IGF3YWl0IFVzZXJTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogeyAkbmluOiB1c2VyV2l0aFBvaW50cyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlzaW9uOiBkaXZpc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAvL2NvdW50cnlPZlJlc2lkZW5jZTogeyAkaW46IGNvdW50cnlDb2RlcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICRvcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNvdW50cnlPZlJlc2lkZW5jZTogeyAkaW46IGNvdW50cnlDb2RlcyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGU6IHsgJGluOiBjb3VudHJ5Q29kZXMgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBpc0FkbWluOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHsgZmlyc3ROYW1lOiAxLCBsYXN0TmFtZTogMSwgbmF0aW9uYWxpdHk6IDEgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1c2VyV2l0aE5vUG9pbnRzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0U3RhdGljTGF0ZXN0UmFuayhjb3VudHJ5Q29kZXM6IHN0cmluZ1tdLCBkaXZpc2lvbjogR29sZkRpdmlzaW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdSYW5rOiBhbnkgPSBhd2FpdCBMYXRlc3RSYW5rU2NoZW1hLmZpbmQoe1xyXG4gICAgICAgICAgICAgICAgZGl2aXNpb246IGRpdmlzaW9uLFxyXG4gICAgICAgICAgICAgICAgbmF0aW9uYWxpdHk6IHsgJGluOiBjb3VudHJ5Q29kZXMgfVxyXG4gICAgICAgICAgICB9KS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZXhpc3RpbmdSYW5rKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IGluZGl2aWR1YWwgcmFua2luZ1xyXG4gICAgKiBAYXN5bmNcclxuICAgICogQHJldHVybnMge1Byb21pc2U8TnVtYmVyPn0gUmFua2luZyAobnVsbCBpZiBubyByYW5raW5nKVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRJbmRpdmlkdWFsUmFua2luZyh1c2VySWQ6IHN0cmluZywgY291bnRyeUNvZGVzOiBzdHJpbmdbXSwgZGl2aXNpb246IEdvbGZEaXZpc2lvbik6IFByb21pc2U8TnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmFua2luZ3MgPSBhd2FpdCB0aGlzLnRvdXJuYW1lbnRSZXN1bHREQU8uZ2V0UmFua2luZyhjb3VudHJ5Q29kZXMsIGRpdmlzaW9uKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBfLmZpbmRJbmRleChyYW5raW5ncywgZnVuY3Rpb24gKHJhbmtpbmcpIHsgcmV0dXJuIHJhbmtpbmcudXNlci5faWQgPT0gdXNlcklkOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvc2l0aW9uKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVRvdGFsKHNjb3JlczogU2NvcmVbXSwgaG9sZXM6IEdvbGZIb2xlW10pIHtcclxuICAgICAgICBjb25zdCBudW1iZXJPZkhvbGVzID0gaG9sZXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBudW1iZXJPZlBsYXllZEhvbGVzID0gMDtcclxuICAgICAgICBsZXQgdG90YWxQb2ludHMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mSG9sZXMgKyAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kU2NvcmUgPSBfLmZpbmQoc2NvcmVzLCAoc2NvcmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY29yZS5ob2xlID09PSBpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kUGFyID0gXy5maW5kKGhvbGVzLCAoaG9sZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvbGUuaG9sZSA9PT0gaTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm91bmRTY29yZSkge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZQbGF5ZWRIb2xlcysrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IGZvdW5kU2NvcmUucG9pbnRzOy8vdGhpcy5nZXRQb2ludHMoZm91bmRTY29yZS5zY29yZSwgZm91bmRQYXIucGFyLCBpLCBudW1iZXJPZkhvbGVzKTtcclxuICAgICAgICAgICAgICAgIHRvdGFsUG9pbnRzICs9IHBvaW50czsgLy8ucG9pbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBudW1iZXJPZlBsYXllZEhvbGVzOiBudW1iZXJPZlBsYXllZEhvbGVzLFxyXG4gICAgICAgICAgICB0b3RhbFBvaW50czogdG90YWxQb2ludHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTdHJva2VQb2ludChwb2ludHM6IG51bWJlciwgZGVzY3JpcHRpb246IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogcHJpdmF0ZSBnZXRQb2ludHMoc3Ryb2tlczogbnVtYmVyLCBwYXI6IG51bWJlciwgaG9sZTogbnVtYmVyLCBudW1iZXJPZkhvbGVzOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgLy8gTm8gY2hhbmdlXHJcbiAgICAgICAgbGV0IHBvaW50TXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICAgIC8vIERvdWJsZSBwb2ludHMgZm9yIGxhc3QgMyBob2xlc1xyXG4gICAgICAgIGlmIChob2xlID09PSBudW1iZXJPZkhvbGVzIHx8IGhvbGUgPT09IChudW1iZXJPZkhvbGVzIC0gMSkgfHwgaG9sZSA9PT0gKG51bWJlck9mSG9sZXMgLSAyKSkge1xyXG4gICAgICAgICAgICBwb2ludE11bHRpcGxpZXIgPSAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0cm9rZXMgPT09IG51bGwgfHwgcGFyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG9QYXIgPSBOdW1iZXIoc3Ryb2tlcykgLSBOdW1iZXIocGFyKTtcclxuXHJcbiAgICAgICAgaWYgKHRvUGFyID49IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3Ryb2tlUG9pbnQoLTMgKiBwb2ludE11bHRpcGxpZXIsIFwiRG91YmxlIEJvZ2V5ICtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvUGFyID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0cm9rZVBvaW50KC0xICogcG9pbnRNdWx0aXBsaWVyLCBcIkJvZ2V5XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b1BhciA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdHJva2VQb2ludCgwLCBcIlBBUlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9QYXIgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0cm9rZVBvaW50KDIgKiBwb2ludE11bHRpcGxpZXIsIFwiQmlyZGllXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b1BhciA9PT0gLTIpIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlcihwYXIpID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdHJva2VQb2ludCg3ICogcG9pbnRNdWx0aXBsaWVyLCBcIkhvbGUtSW4tT25lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3Ryb2tlUG9pbnQoNSAqIHBvaW50TXVsdGlwbGllciwgXCJFYWdsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b1BhciA8PSAtMykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdHJva2VQb2ludCg5ICogcG9pbnRNdWx0aXBsaWVyLCBcIkFsYmF0cm9zc1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9ICovXHJcbn1cclxuIl19