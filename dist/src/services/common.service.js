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
exports.CommonService = void 0;
const invite_model_1 = require("../models/invite.model");
const category_model_1 = require("../models/category.model");
const logging_1 = require("../core/logging");
const user_model_1 = require("../models/user.model");
const crypto = require("crypto");
const error_message_enum_1 = require("../types/error-message.enum");
const config_1 = require("../config");
const error_builder_1 = require("../core/errors/error-builder");
const error_type_enum_1 = require("../core/errors/error-type.enum");
const golf_course_model_1 = require("../models/golf-course.model");
const golf_club_model_1 = require("../models/golf-club.model");
const tournament_leaderboard_model_1 = require("../models/tournament-leaderboard.model");
const tournament_result_model_1 = require("../models/tournament-result.model");
const mongodb_1 = require("mongodb");
const celebrity_type_model_1 = require("../models/celebrity-type.model");
const job_enum_1 = require("../jobs/job.enum");
const tournament_model_1 = require("../models/tournament.model");
const tournament_entry_model_1 = require("../models/tournament-entry.model");
const tournament_scorecard_model_1 = require("../models/tournament-scorecard.model");
const latest_rank_model_1 = require("../models/latest-rank.model");
const champions_model_1 = require("../models/champions.model");
class CommonService {
    constructor(golfCourseDAO, jobScheduler) {
        this.golfCourseDAO = golfCourseDAO;
        this.jobScheduler = jobScheduler;
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_model_1.CategorySchema.find({});
            res.status(200).send(categories);
        });
    }
    createInvite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const createInviteForm = req.body;
                const alreadyExistInvitee = yield invite_model_1.InviteSchema.find({
                    firstName: { $regex: createInviteForm.firstName, $options: "i" },
                    country: createInviteForm.country,
                    type: createInviteForm.type
                });
                if ((alreadyExistInvitee === null || alreadyExistInvitee === void 0 ? void 0 : alreadyExistInvitee.length) > 0) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error_message_enum_1.ErrorMessage.InviteeAlreadyExists));
                }
                const savedObj = yield invite_model_1.InviteSchema.create(createInviteForm);
                let inviteUrl = '';
                if (config_1.default.environment === "development") {
                    inviteUrl = `${req.protocol}://${config_1.default.app.baseAddress}/register?id=${savedObj._id}`;
                }
                else {
                    inviteUrl = `${req.protocol}://${req.hostname}/register?id=${savedObj._id}`;
                }
                invite_model_1.InviteSchema.findByIdAndUpdate(savedObj._id, { url: inviteUrl }).exec();
                savedObj['url'] = inviteUrl;
                createInviteForm['url'] = inviteUrl;
                if (createInviteForm.isVerified) {
                    if (createInviteForm.isInvitedByDirector) {
                        yield this.jobScheduler.now(job_enum_1.Job.InvitePlayerJob, { user: createInviteForm });
                    }
                    res.status(200).send({ savedInvite: savedObj });
                }
                else {
                    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    const user = yield user_model_1.UserSchema.findById(userId).exec();
                    createInviteForm['requestedByName'] = user.firstName + ' ' + user.lastName;
                    createInviteForm['requestedByEmail'] = user.email;
                    createInviteForm['_id'] = savedObj._id;
                    yield this.jobScheduler.now(job_enum_1.Job.CreateInviteeRequestJob, { user: createInviteForm });
                    res.status(200).send({ successMsg: 'Invitee request sent successfully' });
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getInviteDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inviteDetails = yield invite_model_1.InviteSchema.findById(req.params.inviteId).exec();
                res.status(200).send(inviteDetails);
            }
            catch (error) {
                //return Promise.reject(ErrorBuilder.generate(ErrorType.InviteDoesNotExist, ErrorMessage.InvalidInvitationLink));
                let err = { errorCode: 404, errorMessage: error_message_enum_1.ErrorMessage.InvalidInvitationLink };
                res.status(404).send(err);
            }
        });
    }
    getCelebIndexRanking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const celebrities = yield user_model_1.UserSchema.find({ division: { $regex: 'Celebrity', $options: "i" }, isAdmin: false }, { firstName: 1, lastName: 1, nationality: 1, handicapIndex: 1, profession: 1, imageData: 1, gender: 1 }).sort('handicapIndex').exec();
            res.status(200).send(celebrities);
        });
    }
    invitationUsed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield invite_model_1.InviteSchema.findByIdAndUpdate(req.params.inviteId, { isUsed: true, usedBy: req.params.userId }).exec();
                res.status(200).send({ successMessage: 'Invitation updated successfully' });
            }
            catch (error) {
                //return Promise.reject(ErrorBuilder.generate(ErrorType.InviteDoesNotExist, ErrorMessage.InvalidInvitationLink));
                //let err = {errorCode:404,errorMessage:ErrorMessage.InvalidInvitationLink};
                res.status(500).send(error);
            }
        });
    }
    invitationDeclined(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield invite_model_1.InviteSchema.findByIdAndUpdate(req.params.inviteId, { isUsed: true, isDeclined: true }).exec();
                res.status(200).send({ successMessage: 'Invitation Declined successfully' });
            }
            catch (error) {
                //return Promise.reject(ErrorBuilder.generate(ErrorType.InviteDoesNotExist, ErrorMessage.InvalidInvitationLink));
                //let err = {errorCode:404,errorMessage:ErrorMessage.InvalidInvitationLink};
                res.status(500).send(error);
            }
        });
    }
    verifyInvitee(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createInviteForm = req.body;
                const invitee = yield invite_model_1.InviteSchema.findByIdAndUpdate(req.params.inviteId, createInviteForm).exec();
                return Promise.resolve(invitee);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getAllGolfCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allGolfCourses = yield this.golfCourseDAO.getAll();
                return Promise.resolve(allGolfCourses);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    findGolfCourses(searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const allGolfCourses = await  GolfCourseSchema.find({name:{ "$regex": searchStr, "$options": "i" }});
                let allGolfCourses = yield golf_course_model_1.GolfCourseSchema.aggregate([
                    {
                        "$lookup": {
                            from: 'golfclubs',
                            localField: 'clubId',
                            foreignField: '_id',
                            as: 'club'
                        }
                    },
                    {
                        "$match": {
                            "name": { "$regex": searchStr, "$options": "i" }
                        }
                    }
                ]).exec();
                return Promise.resolve(allGolfCourses);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /* public async getClubInfoById(id:string) {
        try {
            //const allGolfCourses = await this.golfCourseDAO.getByFilter({name:{ "$regex": searchStr, "$options": "i" }})
            const golfCulbInfo = await  GolfClubSchema.findById(id);//.find({name:{ "$regex": searchStr, "$options": "i" }});
            return Promise.resolve(golfCulbInfo);
        } catch (error) {
            Logger.error(error);
            return Promise.reject(ErrorBuilder.generate(ErrorType.Generic, error));
        }
    } */
    updateGolfCourse(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let courseForm = req.body.courseInfo;
                const updatedCourse = yield golf_course_model_1.GolfCourseSchema.findOneAndUpdate({
                    _id: courseForm._id
                }, {
                    $set: courseForm
                }, {
                    new: true
                }).exec();
                let clubInfo = req.body.clubInfo;
                const updatedClub = yield golf_club_model_1.GolfClubSchema.findOneAndUpdate({
                    _id: clubInfo._id
                }, {
                    $set: clubInfo
                }, {
                    new: true
                }).exec();
                return Promise.resolve({ clubInfo: updatedClub, courseInfo: updatedCourse });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getCourseScoreCard(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let scorecard = yield tournament_result_model_1.TournamentResultSchema.aggregate([
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
                            "courseId": (0, mongodb_1.ObjectId)(courseId)
                        }
                    },
                    {
                        $project: {
                            "user.password": 0,
                            "user.email": 0,
                            "user.status": 0,
                            "user.isConfirmed": 0,
                            "user.emailVerificationCode": 0,
                            "user.resetPasswordVerificationCode": 0,
                            "user.pgaMemberNumber": 0,
                            "user.isAdmin": 0,
                            "user.createdAt": 0,
                            "user.updatedAt": 0,
                            "user.invitation": 0
                        }
                    }
                ]).exec();
                return Promise.resolve(scorecard);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    deleteGolfCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCourse = yield golf_course_model_1.GolfCourseSchema.findOneAndUpdate({
                    _id: courseId
                }, {
                    $set: { status: false }
                }, {
                    new: true
                }).exec();
                return Promise.resolve(deletedCourse);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    deleteGolfClub(clubId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //let clubInfo = await GolfClubSchema.findById(clubId);
                yield golf_course_model_1.GolfCourseSchema.deleteMany({ clubId: (0, mongodb_1.ObjectId)(clubId) });
                const deletedCourse = yield golf_club_model_1.GolfClubSchema.deleteOne({ _id: (0, mongodb_1.ObjectId)(clubId) });
                //this.jobScheduler.now(Job.GolfClubUpdatedNotificationJob, { clubInfo: clubInfo , 'operation' : 'delete'});
                return Promise.resolve(deletedCourse);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getCourseInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const golfCourseInfo = await  GolfCourseSchema.findById(id);
                let golfCourseInfo = yield golf_course_model_1.GolfCourseSchema.aggregate([
                    {
                        "$lookup": {
                            from: 'golfclubs',
                            localField: 'clubId',
                            foreignField: '_id',
                            as: 'club'
                        }
                    },
                    {
                        "$match": {
                            "_id": (0, mongodb_1.ObjectId)(id)
                        }
                    }
                ]).exec();
                return Promise.resolve(golfCourseInfo[0]);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    findGolfClubs(searchStr, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findFilter;
                if (searchStr === 'all') { }
                if (countryCode !== 'all') {
                    if (searchStr === '-9999') {
                        findFilter = {
                            countryCode: countryCode
                        };
                    }
                    else {
                        findFilter = {
                            name: { "$regex": searchStr, "$options": "i" },
                            countryCode: countryCode
                        };
                    }
                }
                else {
                    if (searchStr === '-9999') {
                        findFilter = {};
                    }
                    else {
                        findFilter = {
                            name: { "$regex": searchStr, "$options": "i" }
                        };
                    }
                }
                findFilter['$or'] = [
                    { status: { $exists: false } },
                    { status: true }
                ];
                const golfClubs = yield golf_club_model_1.GolfClubSchema.find(findFilter);
                return Promise.resolve(golfClubs);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getClubInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const golfCourseInfo = await  GolfCourseSchema.findById(id);
                let golfClubInfo = yield golf_club_model_1.GolfClubSchema.aggregate([
                    {
                        "$lookup": {
                            from: 'golfcourses',
                            localField: '_id',
                            foreignField: 'clubId',
                            as: 'courses'
                        }
                    },
                    {
                        "$match": {
                            "_id": (0, mongodb_1.ObjectId)(id)
                        }
                    }
                ]).exec();
                return Promise.resolve(golfClubInfo[0]);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getAllInvitees(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (((_a = req.params) === null || _a === void 0 ? void 0 : _a.from) === 'adminPage') {
                    const invitees = yield invite_model_1.InviteSchema.find().sort('firstName').exec();
                    return Promise.resolve(invitees);
                }
                else {
                    const invitees = yield invite_model_1.InviteSchema.find({
                        isUsed: false, isVerified: true,
                        $or: [
                            { isSpecialInvitee: { $exists: false } },
                            { isSpecialInvitee: false }
                        ]
                    }).sort('firstName').exec();
                    return Promise.resolve(invitees);
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getInviteesByCourtry(countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitees = yield invite_model_1.InviteSchema.find({ isUsed: false, isVerified: true, country: countryCode });
                return Promise.resolve(invitees);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getCelebrityTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const celebTypes = yield celebrity_type_model_1.CelebrityTypeSchema.find({});
                return Promise.resolve(celebTypes);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    updateClubCourseDetails(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clubInfo = req.body.clubInfo;
                let courses = clubInfo.courses;
                let deletedCourses = clubInfo.deletedCourses;
                let clubHoles = 0;
                for (let i = 0; i < courses.length; i++) {
                    let courseForm = courses[i];
                    clubHoles = clubHoles + courseForm.numberOfHoles;
                    //console.log('courseForm::::',courseForm);
                    if (courseForm._id) {
                        yield golf_course_model_1.GolfCourseSchema.findOneAndUpdate({
                            _id: courseForm._id
                        }, {
                            $set: courseForm
                        }, {
                            new: true
                        }).exec();
                    }
                    else {
                        courseForm._id = this.hashIdTo12Characters(courseForm.code);
                        yield golf_course_model_1.GolfCourseSchema.create(courseForm);
                    }
                }
                for (let i = 0; i < deletedCourses.length; i++) {
                    let courseForm = deletedCourses[i];
                    yield golf_course_model_1.GolfCourseSchema.deleteOne({ _id: (0, mongodb_1.ObjectId)(courseForm._id) });
                }
                clubInfo['numberOfHoles'] = clubHoles;
                const updatedClub = yield golf_club_model_1.GolfClubSchema.findOneAndUpdate({
                    _id: clubInfo._id
                }, {
                    $set: clubInfo
                }, {
                    new: true
                }).exec();
                //let clubDetails = Promise.resolve(updatedClub);
                //const actionBy = req.body.actionBy;
                //updatedClub['actionBy'] = actionBy;
                //this.jobScheduler.now(Job.GolfClubUpdatedNotificationJob, { clubInfo: updatedClub , 'operation' : 'update'});
                return Promise.resolve(updatedClub);
                ;
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    notifySingleClub(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.jobScheduler.now(job_enum_1.Job.NotifyClubsUpdateCourseJob, { clubInfo: [req.body] });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    notifyAllClub(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const golfClubsDb = yield golf_club_model_1.GolfClubSchema.find({ email: { $ne: 'N/D' } });
                let golfClubs = [];
                golfClubsDb.forEach(function (elm) {
                    const club = {
                        subject: req.body.subject,
                        body: req.body.body,
                        clubId: elm._id,
                        clubName: elm.name,
                        clubEmail: elm.email,
                        countryCode: elm.countryCode
                    };
                    golfClubs.push(club);
                });
                this.jobScheduler.now(job_enum_1.Job.NotifyClubsUpdateCourseJob, { clubInfo: golfClubs });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getAllTournament() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournaments = yield tournament_model_1.TournamentSchema.find({}).sort('startDate');
                return Promise.resolve(tournaments);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    deleteInvitee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedInvitee = yield invite_model_1.InviteSchema.deleteOne({ "_id": (0, mongodb_1.ObjectId)(id) });
                return Promise.resolve(deletedInvitee);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getChallengers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let challengersDb = yield user_model_1.UserSchema.find({ isAdmin: false }, { firstName: 1, lastName: 1, nationality: 1, handicapIndex: 1, division: 1 });
                let challengers = [];
                for (let i = 0; i < (challengersDb === null || challengersDb === void 0 ? void 0 : challengersDb.length); i++) {
                    let challenger = challengersDb[i];
                    const invitee = yield invite_model_1.InviteSchema.find({ usedBy: challenger._id }).exec();
                    let obj = {
                        _id: challenger._id,
                        firstName: challenger.firstName,
                        lastName: challenger.lastName,
                        nationality: challenger.nationality,
                        division: challenger.division
                    };
                    if ((invitee === null || invitee === void 0 ? void 0 : invitee.length) > 0) {
                        obj['type'] = invitee[0].type;
                        obj['stageName'] = invitee[0].stageName;
                    }
                    challengers.push(obj);
                }
                return Promise.resolve(challengers);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getEnteredTournaments(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                let enteredTournament = yield tournament_entry_model_1.TournamentEntrySchema.find({ userId: (0, mongodb_1.ObjectId)(userId) }).exec();
                return Promise.resolve(enteredTournament);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getTournamentEntries(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentId = req.params.tournamentId;
                let tournamentEntries = yield tournament_entry_model_1.TournamentEntrySchema.find({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId) })
                    .populate('userId', ['firstName', 'lastName', 'nationality', 'stageName', 'division']).exec();
                //console.log('tournamentEntries',tournamentEntries);
                return Promise.resolve(tournamentEntries);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    addChallengers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentId = req.params.tournamentId;
                let challengers = req.body.challengers;
                //const userId = req.user.sub;
                //challengers.push(userId);
                const updatedTournament = yield tournament_model_1.TournamentSchema.findByIdAndUpdate(tournamentId, { challengers: challengers }).exec();
                return Promise.resolve(updatedTournament);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    deleteTournament(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentId = req.params.tournamentId;
                yield tournament_result_model_1.TournamentResultSchema.deleteMany({ tournament: (0, mongodb_1.ObjectId)(tournamentId) });
                yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.deleteMany({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId) });
                yield tournament_scorecard_model_1.TournamentScorecardSchema.deleteMany({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId) });
                yield tournament_entry_model_1.TournamentEntrySchema.deleteMany({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId) });
                const deletedTour = yield tournament_model_1.TournamentSchema.deleteOne({ _id: (0, mongodb_1.ObjectId)(tournamentId) });
                return Promise.resolve(deletedTour);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    leaveTournament(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournamentId = req.params.tournamentId;
                const userId = req.params.userId;
                const tournament = yield tournament_model_1.TournamentSchema.findById(tournamentId);
                yield tournament_result_model_1.TournamentResultSchema.deleteOne({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId), user: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.deleteOne({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId), user: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_scorecard_model_1.TournamentScorecardSchema.deleteOne({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId), userId: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_entry_model_1.TournamentEntrySchema.deleteOne({ tournamentId: (0, mongodb_1.ObjectId)(tournamentId), userId: (0, mongodb_1.ObjectId)(userId) });
                const playerIndex = tournament.challengers.findIndex(o => o.includes(userId));
                if (playerIndex > -1) {
                    tournament.challengers.splice(playerIndex, 1);
                    const updatedTournament = yield tournament_model_1.TournamentSchema.findOneAndUpdate({
                        _id: tournamentId
                    }, {
                        $set: tournament
                    }, {
                        new: true
                    }).exec();
                }
                return Promise.resolve(tournament);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getAllPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const players = yield user_model_1.UserSchema.find({ isAdmin: false }, { firstName: 1, lastName: 1, nationality: 1, handicapIndex: 1, stageName: 1, division: 1 }).sort('handicapIndex').exec();
                return Promise.resolve(players);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    deletePlayerByAdmin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = req.params.userId;
                yield tournament_result_model_1.TournamentResultSchema.deleteMany({ user: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_leaderboard_model_1.TournamentLeaderboardSchema.deleteMany({ user: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_scorecard_model_1.TournamentScorecardSchema.deleteMany({ userId: (0, mongodb_1.ObjectId)(userId) });
                yield tournament_entry_model_1.TournamentEntrySchema.deleteMany({ userId: (0, mongodb_1.ObjectId)(userId) });
                let tournaments = yield tournament_model_1.TournamentSchema.find();
                if ((tournaments === null || tournaments === void 0 ? void 0 : tournaments.length) > 0) {
                    for (let i = 0; i < tournaments.length; i++) {
                        let tournament = tournaments[i];
                        const playerIndex = (_a = tournament.challengers) === null || _a === void 0 ? void 0 : _a.findIndex(o => o.includes(userId));
                        if (playerIndex > -1) {
                            tournament.challengers.splice(playerIndex, 1);
                            const updatedTournament = yield tournament_model_1.TournamentSchema.findOneAndUpdate({
                                _id: tournament._id
                            }, {
                                $set: tournament
                            }, {
                                new: true
                            }).exec();
                        }
                    }
                }
                yield latest_rank_model_1.LatestRankSchema.deleteOne({ user: (0, mongodb_1.ObjectId)(userId) });
                const deletedPlayer = yield user_model_1.UserSchema.deleteOne({ _id: (0, mongodb_1.ObjectId)(userId) });
                return Promise.resolve(deletedPlayer);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    addGolfClub(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clubInfo = req.body.clubInfo;
                clubInfo._id = this.hashIdTo12Characters(clubInfo.code);
                const newClub = yield golf_club_model_1.GolfClubSchema.create(clubInfo);
                //this.jobScheduler.now(Job.GolfClubUpdatedNotificationJob, { clubInfo: newClub , 'operation' : 'add'});
                return Promise.resolve(newClub);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    needHelp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let needHelpForm = req.body;
                this.jobScheduler.now(job_enum_1.Job.needHelpJob, needHelpForm);
                return Promise.resolve({ successMsg: 'Email is sent to admin' });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getAmateurTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isSpecialInvitee = false;
                const tokens = yield user_model_1.UserSchema.findById(userId, { amateurTokens: 1 }).exec();
                const invitee = yield invite_model_1.InviteSchema.find({ usedBy: userId }).exec();
                if (invitee.length > 0) {
                    isSpecialInvitee = true;
                }
                return Promise.resolve({ tokens: tokens.amateurTokens, isSpecialInvitee: isSpecialInvitee });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getClubChamps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clubChamps = yield golf_club_model_1.GolfClubSchema.find({
                    $or: [
                        { menChamp: { $exists: true } },
                        { ladiesChamp: { $exists: true } }
                    ]
                }, { name: 1, countryCode: 1, menChamp: 1, ladiesChamp: 1 }).exec();
                return Promise.resolve(clubChamps);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    addCountryChampion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const champion = req.body;
                if (!champion._id) {
                    delete champion._id;
                }
                //await ChampionSchema.deleteOne({division:champion.division,country:champion.country});
                yield champions_model_1.ChampionSchema.create(champion);
                let champions = yield champions_model_1.ChampionSchema.find({ country: champion.country });
                return Promise.resolve(champions);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getCountryChampions(countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let champions;
                if (countryCode != -1) {
                    champions = yield champions_model_1.ChampionSchema.find({
                        country: countryCode
                    });
                }
                else {
                    champions = yield champions_model_1.ChampionSchema.find({});
                }
                return Promise.resolve(champions);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    helpSupport(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let helpForm = req.body;
                this.jobScheduler.now(job_enum_1.Job.helpSupportJob, helpForm);
                return Promise.resolve({ successMsg: 'Email is sent to admin' });
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    getUserTournamentPoints(tournamentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tournamentResult = yield tournament_result_model_1.TournamentResultSchema.findOne({
                    tournament: (0, mongodb_1.ObjectId)(tournamentId),
                    user: (0, mongodb_1.ObjectId)(userId)
                });
                const userPoints = {
                    points: tournamentResult ? tournamentResult.points + tournamentResult.bonusPoints : '-'
                };
                return Promise.resolve(userPoints);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    saveCourseRatings(requestBody, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = '34412fcfef5b4a4e965fcb6f';
                let courseDetails = yield golf_course_model_1.GolfCourseSchema.findById(courseId).exec();
                let updatedCourse;
                const existingRating = courseDetails.userCourseRating ? courseDetails.userCourseRating : 0;
                let userCourseRating = 0;
                if (courseDetails.courseRatings && courseDetails.courseRatings.length > 0) {
                    userCourseRating = (existingRating + requestBody.ratingAvg) / (courseDetails.courseRatings.length + 1);
                }
                else {
                    userCourseRating = requestBody.ratingAvg;
                }
                if (courseDetails.courseRatings) {
                    updatedCourse = golf_course_model_1.GolfCourseSchema.updateOne({ _id: courseId }, {
                        $push: { courseRatings: requestBody },
                        $set: { userCourseRating: userCourseRating }
                    }).exec();
                }
                else {
                    updatedCourse = yield golf_course_model_1.GolfCourseSchema.updateOne({ _id: courseId }, {
                        $set: { courseRatings: [requestBody], userCourseRating: userCourseRating }
                    }).exec();
                }
                return Promise.resolve(updatedCourse);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    hashIdTo12Characters(id) {
        const hash = crypto.createHash('sha256');
        hash.update(id);
        return hash.digest('hex').substring(0, 24);
    }
}
exports.CommonService = CommonService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvY29tbW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseURBQXNEO0FBQ3RELDZEQUEwRDtBQUMxRCw2Q0FBeUM7QUFDekMscURBQWtEO0FBQ2xELGlDQUFpQztBQUNqQyxvRUFBMkQ7QUFDM0Qsc0NBQStCO0FBRS9CLGdFQUE0RDtBQUM1RCxvRUFBMkQ7QUFDM0QsbUVBQStEO0FBQy9ELCtEQUEyRDtBQUMzRCx5RkFBcUY7QUFDckYsK0VBQTJFO0FBQzNFLHFDQUFtQztBQUNuQyx5RUFBcUU7QUFDckUsK0NBQXVDO0FBRXZDLGlFQUE4RDtBQUM5RCw2RUFBeUU7QUFDekUscUZBQWlGO0FBQ2pGLG1FQUErRDtBQUMvRCwrREFBMkQ7QUFJM0QsTUFBYSxhQUFhO0lBTXRCLFlBQW1CLGFBQTRCLEVBQUUsWUFBMkI7UUFDeEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUdZLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYTs7WUFDbEQsTUFBTSxVQUFVLEdBQUcsTUFBTSwrQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFWSxZQUFZLENBQUMsR0FBWSxFQUFFLEdBQWE7OztZQUNqRCxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sMkJBQVksQ0FBQyxJQUFJLENBQy9DO29CQUNJLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0Is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RSxFQUFFLGFBQWEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLGdCQUFnQixFQUFHLGdCQUFnQixFQUFFO3FCQUM3RSxDQUNKLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFHTyxvQkFBb0IsQ0FBQyxFQUFVO1FBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBRUo7QUFsekJELHNDQWt6QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IEludml0ZVNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvaW52aXRlLm1vZGVsXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5U2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9jYXRlZ29yeS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IFVzZXJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcclxuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSBcIi4uL3R5cGVzL2Vycm9yLW1lc3NhZ2UuZW51bVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IEdvbGZDb3Vyc2VEQU8gfSBmcm9tIFwiLi4vZGFvcy9nb2xmLWNvdXJzZS5kYW8uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEVycm9yQnVpbGRlciB9IGZyb20gXCIuLi9jb3JlL2Vycm9ycy9lcnJvci1idWlsZGVyXCI7XHJcbmltcG9ydCB7IEVycm9yVHlwZSB9IGZyb20gXCIuLi9jb3JlL2Vycm9ycy9lcnJvci10eXBlLmVudW1cIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZVNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvZ29sZi1jb3Vyc2UubW9kZWxcIjtcclxuaW1wb3J0IHsgR29sZkNsdWJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzL2dvbGYtY2x1Yi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmQubW9kZWxcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdFNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvdG91cm5hbWVudC1yZXN1bHQubW9kZWxcIjtcclxuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5pbXBvcnQgeyBDZWxlYnJpdHlUeXBlU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9jZWxlYnJpdHktdHlwZS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi4vam9icy9qb2IuZW51bVwiO1xyXG5pbXBvcnQgeyBJSm9iU2NoZWR1bGVyIH0gZnJvbSBcIi4uL2NvcmUvam9icy9qb2Itc2NoZWR1bGVyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy90b3VybmFtZW50Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRFbnRyeVNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvdG91cm5hbWVudC1lbnRyeS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy90b3VybmFtZW50LXNjb3JlY2FyZC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMYXRlc3RSYW5rU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9sYXRlc3QtcmFuay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBDaGFtcGlvblNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHMvY2hhbXBpb25zLm1vZGVsXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHQgfSBmcm9tIFwiLi4vdHlwZXMvdG91cm5hbWVudC1yZXN1bHRcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9uU2VydmljZSB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ29sZkNvdXJzZURBTzogR29sZkNvdXJzZURBTztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgam9iU2NoZWR1bGVyOiBJSm9iU2NoZWR1bGVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihnb2xmQ291cnNlREFPOiBHb2xmQ291cnNlREFPLCBqb2JTY2hlZHVsZXI6IElKb2JTY2hlZHVsZXIpIHtcclxuICAgICAgICB0aGlzLmdvbGZDb3Vyc2VEQU8gPSBnb2xmQ291cnNlREFPO1xyXG4gICAgICAgIHRoaXMuam9iU2NoZWR1bGVyID0gam9iU2NoZWR1bGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q2F0ZWdvcmllcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgQ2F0ZWdvcnlTY2hlbWEuZmluZCh7fSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoY2F0ZWdvcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZUludml0ZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJbnZpdGVGb3JtID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlFeGlzdEludml0ZWUgPSBhd2FpdCBJbnZpdGVTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHsgJHJlZ2V4OiBjcmVhdGVJbnZpdGVGb3JtLmZpcnN0TmFtZSwgJG9wdGlvbnM6IFwiaVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeTogY3JlYXRlSW52aXRlRm9ybS5jb3VudHJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGNyZWF0ZUludml0ZUZvcm0udHlwZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoYWxyZWFkeUV4aXN0SW52aXRlZT8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgRXJyb3JNZXNzYWdlLkludml0ZWVBbHJlYWR5RXhpc3RzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc2F2ZWRPYmo6IGFueSA9IGF3YWl0IEludml0ZVNjaGVtYS5jcmVhdGUoY3JlYXRlSW52aXRlRm9ybSk7XHJcbiAgICAgICAgICAgIGxldCBpbnZpdGVVcmwgPSAnJztcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5lbnZpcm9ubWVudCA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZpdGVVcmwgPSBgJHtyZXEucHJvdG9jb2x9Oi8vJHtjb25maWcuYXBwLmJhc2VBZGRyZXNzfS9yZWdpc3Rlcj9pZD0ke3NhdmVkT2JqLl9pZH1gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW52aXRlVXJsID0gYCR7cmVxLnByb3RvY29sfTovLyR7cmVxLmhvc3RuYW1lfS9yZWdpc3Rlcj9pZD0ke3NhdmVkT2JqLl9pZH1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEludml0ZVNjaGVtYS5maW5kQnlJZEFuZFVwZGF0ZShzYXZlZE9iai5faWQsIHsgdXJsOiBpbnZpdGVVcmwgfSkuZXhlYygpO1xyXG4gICAgICAgICAgICBzYXZlZE9ialsndXJsJ10gPSBpbnZpdGVVcmw7XHJcbiAgICAgICAgICAgIGNyZWF0ZUludml0ZUZvcm1bJ3VybCddID0gaW52aXRlVXJsO1xyXG4gICAgICAgICAgICBpZiAoY3JlYXRlSW52aXRlRm9ybS5pc1ZlcmlmaWVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjcmVhdGVJbnZpdGVGb3JtLmlzSW52aXRlZEJ5RGlyZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmpvYlNjaGVkdWxlci5ub3coSm9iLkludml0ZVBsYXllckpvYix7dXNlcjpjcmVhdGVJbnZpdGVGb3JtfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IHNhdmVkSW52aXRlOiBzYXZlZE9iaiB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHJlcS51c2VyPy5zdWI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlclNjaGVtYS5maW5kQnlJZCh1c2VySWQpLmV4ZWMoKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUludml0ZUZvcm1bJ3JlcXVlc3RlZEJ5TmFtZSddID0gdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlSW52aXRlRm9ybVsncmVxdWVzdGVkQnlFbWFpbCddID0gdXNlci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUludml0ZUZvcm1bJ19pZCddID0gc2F2ZWRPYmouX2lkO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5DcmVhdGVJbnZpdGVlUmVxdWVzdEpvYiwgeyB1c2VyOiBjcmVhdGVJbnZpdGVGb3JtIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBzdWNjZXNzTXNnOiAnSW52aXRlZSByZXF1ZXN0IHNlbnQgc3VjY2Vzc2Z1bGx5JyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRJbnZpdGVEZXRhaWxzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludml0ZURldGFpbHMgPSBhd2FpdCBJbnZpdGVTY2hlbWEuZmluZEJ5SWQocmVxLnBhcmFtcy5pbnZpdGVJZCkuZXhlYygpO1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChpbnZpdGVEZXRhaWxzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvL3JldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkludml0ZURvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLkludmFsaWRJbnZpdGF0aW9uTGluaykpO1xyXG4gICAgICAgICAgICBsZXQgZXJyID0geyBlcnJvckNvZGU6IDQwNCwgZXJyb3JNZXNzYWdlOiBFcnJvck1lc3NhZ2UuSW52YWxpZEludml0YXRpb25MaW5rIH07XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDZWxlYkluZGV4UmFua2luZyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBjZWxlYnJpdGllcyA9IGF3YWl0IFVzZXJTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgeyBkaXZpc2lvbjogeyAkcmVnZXg6ICdDZWxlYnJpdHknLCAkb3B0aW9uczogXCJpXCIgfSwgaXNBZG1pbjogZmFsc2UgfSxcclxuICAgICAgICAgICAgeyBmaXJzdE5hbWU6IDEsIGxhc3ROYW1lOiAxLCBuYXRpb25hbGl0eTogMSwgaGFuZGljYXBJbmRleDogMSxwcm9mZXNzaW9uOiAxLCBpbWFnZURhdGEgOiAxLGdlbmRlcjoxIH1cclxuICAgICAgICApLnNvcnQoJ2hhbmRpY2FwSW5kZXgnKS5leGVjKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoY2VsZWJyaXRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBpbnZpdGF0aW9uVXNlZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBJbnZpdGVTY2hlbWEuZmluZEJ5SWRBbmRVcGRhdGUocmVxLnBhcmFtcy5pbnZpdGVJZCwgeyBpc1VzZWQ6IHRydWUsIHVzZWRCeTogcmVxLnBhcmFtcy51c2VySWQgfSkuZXhlYygpO1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IHN1Y2Nlc3NNZXNzYWdlOiAnSW52aXRhdGlvbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5JbnZpdGVEb2VzTm90RXhpc3QsIEVycm9yTWVzc2FnZS5JbnZhbGlkSW52aXRhdGlvbkxpbmspKTtcclxuICAgICAgICAgICAgLy9sZXQgZXJyID0ge2Vycm9yQ29kZTo0MDQsZXJyb3JNZXNzYWdlOkVycm9yTWVzc2FnZS5JbnZhbGlkSW52aXRhdGlvbkxpbmt9O1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBpbnZpdGF0aW9uRGVjbGluZWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgSW52aXRlU2NoZW1hLmZpbmRCeUlkQW5kVXBkYXRlKHJlcS5wYXJhbXMuaW52aXRlSWQsIHsgaXNVc2VkOiB0cnVlLCBpc0RlY2xpbmVkOiB0cnVlIH0pLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBzdWNjZXNzTWVzc2FnZTogJ0ludml0YXRpb24gRGVjbGluZWQgc3VjY2Vzc2Z1bGx5JyB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvL3JldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkludml0ZURvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLkludmFsaWRJbnZpdGF0aW9uTGluaykpO1xyXG4gICAgICAgICAgICAvL2xldCBlcnIgPSB7ZXJyb3JDb2RlOjQwNCxlcnJvck1lc3NhZ2U6RXJyb3JNZXNzYWdlLkludmFsaWRJbnZpdGF0aW9uTGlua307XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHZlcmlmeUludml0ZWUocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSW52aXRlRm9ybSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICBjb25zdCBpbnZpdGVlID0gYXdhaXQgSW52aXRlU2NoZW1hLmZpbmRCeUlkQW5kVXBkYXRlKHJlcS5wYXJhbXMuaW52aXRlSWQsIGNyZWF0ZUludml0ZUZvcm0pLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnZpdGVlKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsR29sZkNvdXJzZXMoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgYWxsR29sZkNvdXJzZXMgPSBhd2FpdCB0aGlzLmdvbGZDb3Vyc2VEQU8uZ2V0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYWxsR29sZkNvdXJzZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBmaW5kR29sZkNvdXJzZXMoc2VhcmNoU3RyOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL2NvbnN0IGFsbEdvbGZDb3Vyc2VzID0gYXdhaXQgIEdvbGZDb3Vyc2VTY2hlbWEuZmluZCh7bmFtZTp7IFwiJHJlZ2V4XCI6IHNlYXJjaFN0ciwgXCIkb3B0aW9uc1wiOiBcImlcIiB9fSk7XHJcbiAgICAgICAgICAgIGxldCBhbGxHb2xmQ291cnNlcyA9IGF3YWl0IEdvbGZDb3Vyc2VTY2hlbWEuYWdncmVnYXRlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRsb29rdXBcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnZ29sZmNsdWJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWVsZDogJ2NsdWJJZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVpZ25GaWVsZDogJ19pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzOiAnY2x1YidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJG1hdGNoXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHsgXCIkcmVnZXhcIjogc2VhcmNoU3RyLCBcIiRvcHRpb25zXCI6IFwiaVwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhbGxHb2xmQ291cnNlcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogcHVibGljIGFzeW5jIGdldENsdWJJbmZvQnlJZChpZDpzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL2NvbnN0IGFsbEdvbGZDb3Vyc2VzID0gYXdhaXQgdGhpcy5nb2xmQ291cnNlREFPLmdldEJ5RmlsdGVyKHtuYW1lOnsgXCIkcmVnZXhcIjogc2VhcmNoU3RyLCBcIiRvcHRpb25zXCI6IFwiaVwiIH19KVxyXG4gICAgICAgICAgICBjb25zdCBnb2xmQ3VsYkluZm8gPSBhd2FpdCAgR29sZkNsdWJTY2hlbWEuZmluZEJ5SWQoaWQpOy8vLmZpbmQoe25hbWU6eyBcIiRyZWdleFwiOiBzZWFyY2hTdHIsIFwiJG9wdGlvbnNcIjogXCJpXCIgfX0pO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdvbGZDdWxiSW5mbyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9ICovXHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZUdvbGZDb3Vyc2UocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvdXJzZUZvcm06IGFueSA9IHJlcS5ib2R5LmNvdXJzZUluZm87XHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDb3Vyc2UgPSBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgX2lkOiBjb3Vyc2VGb3JtLl9pZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZXQ6IGNvdXJzZUZvcm1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsdWJJbmZvOiBhbnkgPSByZXEuYm9keS5jbHViSW5mbztcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZENsdWIgPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIF9pZDogY2x1YkluZm8uX2lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDogY2x1YkluZm9cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgY2x1YkluZm86IHVwZGF0ZWRDbHViLCBjb3Vyc2VJbmZvOiB1cGRhdGVkQ291cnNlIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDb3Vyc2VTY29yZUNhcmQoY291cnNlSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBzY29yZWNhcmQgPSBhd2FpdCBUb3VybmFtZW50UmVzdWx0U2NoZW1hLmFnZ3JlZ2F0ZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCIkbG9va3VwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJ3VzZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWVsZDogJ3VzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlaWduRmllbGQ6ICdfaWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhczogJ3VzZXInXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRtYXRjaFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY291cnNlSWRcIjogT2JqZWN0SWQoY291cnNlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJvamVjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXIucGFzc3dvcmRcIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyLmVtYWlsXCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlci5zdGF0dXNcIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyLmlzQ29uZmlybWVkXCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlci5lbWFpbFZlcmlmaWNhdGlvbkNvZGVcIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyLnJlc2V0UGFzc3dvcmRWZXJpZmljYXRpb25Db2RlXCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlci5wZ2FNZW1iZXJOdW1iZXJcIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyLmlzQWRtaW5cIjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyLmNyZWF0ZWRBdFwiOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXIudXBkYXRlZEF0XCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlci5pbnZpdGF0aW9uXCI6IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY29yZWNhcmQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZWxldGVHb2xmQ291cnNlKGNvdXJzZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVkQ291cnNlID0gYXdhaXQgR29sZkNvdXJzZVNjaGVtYS5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIF9pZDogY291cnNlSWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7IHN0YXR1czogZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVsZXRlZENvdXJzZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZUdvbGZDbHViKGNsdWJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy9sZXQgY2x1YkluZm8gPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5maW5kQnlJZChjbHViSWQpO1xyXG4gICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmRlbGV0ZU1hbnkoe2NsdWJJZDpPYmplY3RJZChjbHViSWQpfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRDb3Vyc2UgPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5kZWxldGVPbmUoe19pZDpPYmplY3RJZChjbHViSWQpfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5Hb2xmQ2x1YlVwZGF0ZWROb3RpZmljYXRpb25Kb2IsIHsgY2x1YkluZm86IGNsdWJJbmZvICwgJ29wZXJhdGlvbicgOiAnZGVsZXRlJ30pO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlbGV0ZWRDb3Vyc2UpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q291cnNlSW5mb0J5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vY29uc3QgZ29sZkNvdXJzZUluZm8gPSBhd2FpdCAgR29sZkNvdXJzZVNjaGVtYS5maW5kQnlJZChpZCk7XHJcbiAgICAgICAgICAgIGxldCBnb2xmQ291cnNlSW5mbyA9IGF3YWl0IEdvbGZDb3Vyc2VTY2hlbWEuYWdncmVnYXRlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRsb29rdXBcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnZ29sZmNsdWJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWVsZDogJ2NsdWJJZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVpZ25GaWVsZDogJ19pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzOiAnY2x1YidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJG1hdGNoXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogT2JqZWN0SWQoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZ29sZkNvdXJzZUluZm9bMF0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBmaW5kR29sZkNsdWJzKHNlYXJjaFN0cjogc3RyaW5nLCBjb3VudHJ5Q29kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGZpbmRGaWx0ZXI7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hTdHIgPT09ICdhbGwnKSB7IH1cclxuICAgICAgICAgICAgaWYgKGNvdW50cnlDb2RlICE9PSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaFN0ciA9PT0gJy05OTk5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmRGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmRGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgXCIkcmVnZXhcIjogc2VhcmNoU3RyLCBcIiRvcHRpb25zXCI6IFwiaVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoU3RyID09PSAnLTk5OTknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluZEZpbHRlciA9IHt9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmRGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgXCIkcmVnZXhcIjogc2VhcmNoU3RyLCBcIiRvcHRpb25zXCI6IFwiaVwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluZEZpbHRlclsnJG9yJ10gPSBbXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogeyAkZXhpc3RzOiBmYWxzZSB9IH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgY29uc3QgZ29sZkNsdWJzID0gYXdhaXQgR29sZkNsdWJTY2hlbWEuZmluZChmaW5kRmlsdGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShnb2xmQ2x1YnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDbHViSW5mb0J5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vY29uc3QgZ29sZkNvdXJzZUluZm8gPSBhd2FpdCAgR29sZkNvdXJzZVNjaGVtYS5maW5kQnlJZChpZCk7XHJcbiAgICAgICAgICAgIGxldCBnb2xmQ2x1YkluZm8gPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5hZ2dyZWdhdGUoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJGxvb2t1cFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206ICdnb2xmY291cnNlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsRmllbGQ6ICdfaWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlaWduRmllbGQ6ICdjbHViSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhczogJ2NvdXJzZXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcIiRtYXRjaFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IE9iamVjdElkKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSkuZXhlYygpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdvbGZDbHViSW5mb1swXSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEFsbEludml0ZWVzKHJlcTogUmVxdWVzdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyZXEucGFyYW1zPy5mcm9tID09PSAnYWRtaW5QYWdlJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52aXRlZXMgPSBhd2FpdCBJbnZpdGVTY2hlbWEuZmluZCgpLnNvcnQoJ2ZpcnN0TmFtZScpLmV4ZWMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW52aXRlZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52aXRlZXMgPSBhd2FpdCBJbnZpdGVTY2hlbWEuZmluZChcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVXNlZDogZmFsc2UsIGlzVmVyaWZpZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpc1NwZWNpYWxJbnZpdGVlOiB7ICRleGlzdHM6IGZhbHNlIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaXNTcGVjaWFsSW52aXRlZTogZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuc29ydCgnZmlyc3ROYW1lJykuZXhlYygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnZpdGVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SW52aXRlZXNCeUNvdXJ0cnkoY291bnRyeUNvZGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnZpdGVlcyA9IGF3YWl0IEludml0ZVNjaGVtYS5maW5kKHsgaXNVc2VkOiBmYWxzZSwgaXNWZXJpZmllZDogdHJ1ZSwgY291bnRyeTogY291bnRyeUNvZGUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW52aXRlZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRDZWxlYnJpdHlUeXBlcygpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBjZWxlYlR5cGVzID0gYXdhaXQgQ2VsZWJyaXR5VHlwZVNjaGVtYS5maW5kKHt9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjZWxlYlR5cGVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlQ2x1YkNvdXJzZURldGFpbHMocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjbHViSW5mbzogYW55ID0gcmVxLmJvZHkuY2x1YkluZm87XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY291cnNlcyA9IGNsdWJJbmZvLmNvdXJzZXM7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVkQ291cnNlcyA9IGNsdWJJbmZvLmRlbGV0ZWRDb3Vyc2VzO1xyXG4gICAgICAgICAgICBsZXQgY2x1YkhvbGVzID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3Vyc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291cnNlRm9ybSA9IGNvdXJzZXNbaV07XHJcbiAgICAgICAgICAgICAgICBjbHViSG9sZXMgPSBjbHViSG9sZXMgKyBjb3Vyc2VGb3JtLm51bWJlck9mSG9sZXM7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb3Vyc2VGb3JtOjo6OicsY291cnNlRm9ybSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291cnNlRm9ybS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogY291cnNlRm9ybS5faWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldDogY291cnNlRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VGb3JtLl9pZCA9IHRoaXMuaGFzaElkVG8xMkNoYXJhY3RlcnMoY291cnNlRm9ybS5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmNyZWF0ZShjb3Vyc2VGb3JtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbGV0ZWRDb3Vyc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291cnNlRm9ybSA9IGRlbGV0ZWRDb3Vyc2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgR29sZkNvdXJzZVNjaGVtYS5kZWxldGVPbmUoe19pZDpPYmplY3RJZChjb3Vyc2VGb3JtLl9pZCl9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbHViSW5mb1snbnVtYmVyT2ZIb2xlcyddID0gY2x1YkhvbGVzO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQ2x1YiA9IGF3YWl0IEdvbGZDbHViU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgX2lkOiBjbHViSW5mby5faWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiBjbHViSW5mb1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgICAgIC8vbGV0IGNsdWJEZXRhaWxzID0gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZWRDbHViKTtcclxuICAgICAgICAgICAgLy9jb25zdCBhY3Rpb25CeSA9IHJlcS5ib2R5LmFjdGlvbkJ5O1xyXG4gICAgICAgICAgICAvL3VwZGF0ZWRDbHViWydhY3Rpb25CeSddID0gYWN0aW9uQnk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5Hb2xmQ2x1YlVwZGF0ZWROb3RpZmljYXRpb25Kb2IsIHsgY2x1YkluZm86IHVwZGF0ZWRDbHViICwgJ29wZXJhdGlvbicgOiAndXBkYXRlJ30pO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZWRDbHViKTs7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG5vdGlmeVNpbmdsZUNsdWIocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5Ob3RpZnlDbHVic1VwZGF0ZUNvdXJzZUpvYiwgeyBjbHViSW5mbzogW3JlcS5ib2R5XSB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbm90aWZ5QWxsQ2x1YihyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBnb2xmQ2x1YnNEYjogYW55W10gPSBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5maW5kKHsgZW1haWw6IHsgJG5lOiAnTi9EJyB9IH0pO1xyXG4gICAgICAgICAgICBsZXQgZ29sZkNsdWJzID0gW107XHJcbiAgICAgICAgICAgIGdvbGZDbHVic0RiLmZvckVhY2goZnVuY3Rpb24gKGVsbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2x1YiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OiByZXEuYm9keS5zdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHJlcS5ib2R5LmJvZHksXHJcbiAgICAgICAgICAgICAgICAgICAgY2x1YklkOiBlbG0uX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsdWJOYW1lOiBlbG0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjbHViRW1haWw6IGVsbS5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogZWxtLmNvdW50cnlDb2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnb2xmQ2x1YnMucHVzaChjbHViKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuam9iU2NoZWR1bGVyLm5vdyhKb2IuTm90aWZ5Q2x1YnNVcGRhdGVDb3Vyc2VKb2IsIHsgY2x1YkluZm86IGdvbGZDbHVicyB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsVG91cm5hbWVudCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50cyA9IGF3YWl0IFRvdXJuYW1lbnRTY2hlbWEuZmluZCh7fSkuc29ydCgnc3RhcnREYXRlJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodG91cm5hbWVudHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZWxldGVJbnZpdGVlKGlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlZEludml0ZWUgPSBhd2FpdCBJbnZpdGVTY2hlbWEuZGVsZXRlT25lKHsgXCJfaWRcIjogT2JqZWN0SWQoaWQpIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlbGV0ZWRJbnZpdGVlKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q2hhbGxlbmdlcnMoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNoYWxsZW5nZXJzRGI6IGFueSA9IGF3YWl0IFVzZXJTY2hlbWEuZmluZCh7IGlzQWRtaW46IGZhbHNlIH0sIHsgZmlyc3ROYW1lOiAxLCBsYXN0TmFtZTogMSwgbmF0aW9uYWxpdHk6IDEsIGhhbmRpY2FwSW5kZXg6IDEsIGRpdmlzaW9uOiAxIH0pO1xyXG4gICAgICAgICAgICBsZXQgY2hhbGxlbmdlcnMgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYWxsZW5nZXJzRGI/Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhbGxlbmdlciA9IGNoYWxsZW5nZXJzRGJbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpdGVlID0gYXdhaXQgSW52aXRlU2NoZW1hLmZpbmQoeyB1c2VkQnk6IGNoYWxsZW5nZXIuX2lkIH0pLmV4ZWMoKTtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiBjaGFsbGVuZ2VyLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGNoYWxsZW5nZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBjaGFsbGVuZ2VyLmxhc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGlvbmFsaXR5OiBjaGFsbGVuZ2VyLm5hdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlzaW9uOiBjaGFsbGVuZ2VyLmRpdmlzaW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW52aXRlZT8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialsndHlwZSddID0gaW52aXRlZVswXS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialsnc3RhZ2VOYW1lJ10gPSBpbnZpdGVlWzBdLnN0YWdlTmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZXJzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoYWxsZW5nZXJzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEVudGVyZWRUb3VybmFtZW50cyhyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgICAgICAgbGV0IGVudGVyZWRUb3VybmFtZW50OiBhbnkgPSBhd2FpdCBUb3VybmFtZW50RW50cnlTY2hlbWEuZmluZCh7IHVzZXJJZDogT2JqZWN0SWQodXNlcklkKSB9KS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW50ZXJlZFRvdXJuYW1lbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VG91cm5hbWVudEVudHJpZXMocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdG91cm5hbWVudElkID0gcmVxLnBhcmFtcy50b3VybmFtZW50SWQ7XHJcbiAgICAgICAgICAgIGxldCB0b3VybmFtZW50RW50cmllczogYW55ID0gYXdhaXQgVG91cm5hbWVudEVudHJ5U2NoZW1hLmZpbmQoeyB0b3VybmFtZW50SWQ6IE9iamVjdElkKHRvdXJuYW1lbnRJZCkgfSlcclxuICAgICAgICAgICAgICAgIC5wb3B1bGF0ZSgndXNlcklkJywgWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnbmF0aW9uYWxpdHknLCAnc3RhZ2VOYW1lJywgJ2RpdmlzaW9uJ10pLmV4ZWMoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndG91cm5hbWVudEVudHJpZXMnLHRvdXJuYW1lbnRFbnRyaWVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b3VybmFtZW50RW50cmllcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFkZENoYWxsZW5nZXJzKHJlcTogUmVxdWVzdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgICAgICBsZXQgY2hhbGxlbmdlcnMgPSByZXEuYm9keS5jaGFsbGVuZ2VycztcclxuICAgICAgICAgICAgLy9jb25zdCB1c2VySWQgPSByZXEudXNlci5zdWI7XHJcbiAgICAgICAgICAgIC8vY2hhbGxlbmdlcnMucHVzaCh1c2VySWQpO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkVG91cm5hbWVudCA9IGF3YWl0IFRvdXJuYW1lbnRTY2hlbWEuZmluZEJ5SWRBbmRVcGRhdGUodG91cm5hbWVudElkLCB7IGNoYWxsZW5nZXJzOiBjaGFsbGVuZ2VycyB9KS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlZFRvdXJuYW1lbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZWxldGVUb3VybmFtZW50KHJlcTogUmVxdWVzdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnRJZCA9IHJlcS5wYXJhbXMudG91cm5hbWVudElkO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50UmVzdWx0U2NoZW1hLmRlbGV0ZU1hbnkoeyB0b3VybmFtZW50OiBPYmplY3RJZCh0b3VybmFtZW50SWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZGVsZXRlTWFueSh7IHRvdXJuYW1lbnRJZDogT2JqZWN0SWQodG91cm5hbWVudElkKSB9KTtcclxuICAgICAgICAgICAgYXdhaXQgVG91cm5hbWVudFNjb3JlY2FyZFNjaGVtYS5kZWxldGVNYW55KHsgdG91cm5hbWVudElkOiBPYmplY3RJZCh0b3VybmFtZW50SWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50RW50cnlTY2hlbWEuZGVsZXRlTWFueSh7IHRvdXJuYW1lbnRJZDogT2JqZWN0SWQodG91cm5hbWVudElkKSB9KTtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlZFRvdXIgPSBhd2FpdCBUb3VybmFtZW50U2NoZW1hLmRlbGV0ZU9uZSh7IF9pZDogT2JqZWN0SWQodG91cm5hbWVudElkKSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZWxldGVkVG91cik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxlYXZlVG91cm5hbWVudChyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VybmFtZW50SWQgPSByZXEucGFyYW1zLnRvdXJuYW1lbnRJZDtcclxuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdXJuYW1lbnQgPSBhd2FpdCBUb3VybmFtZW50U2NoZW1hLmZpbmRCeUlkKHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRvdXJuYW1lbnRSZXN1bHRTY2hlbWEuZGVsZXRlT25lKHsgdG91cm5hbWVudElkOiBPYmplY3RJZCh0b3VybmFtZW50SWQpLCB1c2VyOiBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEuZGVsZXRlT25lKHsgdG91cm5hbWVudElkOiBPYmplY3RJZCh0b3VybmFtZW50SWQpLCB1c2VyOiBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hLmRlbGV0ZU9uZSh7IHRvdXJuYW1lbnRJZDogT2JqZWN0SWQodG91cm5hbWVudElkKSwgdXNlcklkOiBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50RW50cnlTY2hlbWEuZGVsZXRlT25lKHsgdG91cm5hbWVudElkOiBPYmplY3RJZCh0b3VybmFtZW50SWQpLCB1c2VySWQ6IE9iamVjdElkKHVzZXJJZCkgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckluZGV4ID0gdG91cm5hbWVudC5jaGFsbGVuZ2Vycy5maW5kSW5kZXgobyA9PiBvLmluY2x1ZGVzKHVzZXJJZCkpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVySW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudC5jaGFsbGVuZ2Vycy5zcGxpY2UocGxheWVySW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZFRvdXJuYW1lbnQgPSBhd2FpdCBUb3VybmFtZW50U2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHRvdXJuYW1lbnRJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2V0OiB0b3VybmFtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvdXJuYW1lbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRBbGxQbGF5ZXJzKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBVc2VyU2NoZW1hLmZpbmQoeyBpc0FkbWluOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaXJzdE5hbWU6IDEsIGxhc3ROYW1lOiAxLCBuYXRpb25hbGl0eTogMSwgaGFuZGljYXBJbmRleDogMSwgc3RhZ2VOYW1lOiAxLCBkaXZpc2lvbjogMSB9XHJcbiAgICAgICAgICAgICkuc29ydCgnaGFuZGljYXBJbmRleCcpLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwbGF5ZXJzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlUGxheWVyQnlBZG1pbihyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgICAgICAgYXdhaXQgVG91cm5hbWVudFJlc3VsdFNjaGVtYS5kZWxldGVNYW55KHsgdXNlcjogT2JqZWN0SWQodXNlcklkKSB9KTtcclxuICAgICAgICAgICAgYXdhaXQgVG91cm5hbWVudExlYWRlcmJvYXJkU2NoZW1hLmRlbGV0ZU1hbnkoeyB1c2VyOiBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hLmRlbGV0ZU1hbnkoeyB1c2VySWQ6IE9iamVjdElkKHVzZXJJZCkgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRvdXJuYW1lbnRFbnRyeVNjaGVtYS5kZWxldGVNYW55KHsgdXNlcklkOiBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgICAgICAgICBsZXQgdG91cm5hbWVudHMgPSBhd2FpdCBUb3VybmFtZW50U2NoZW1hLmZpbmQoKTtcclxuICAgICAgICAgICAgaWYgKHRvdXJuYW1lbnRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdXJuYW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdXJuYW1lbnQgPSB0b3VybmFtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJJbmRleCA9IHRvdXJuYW1lbnQuY2hhbGxlbmdlcnM/LmZpbmRJbmRleChvID0+IG8uaW5jbHVkZXModXNlcklkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudC5jaGFsbGVuZ2Vycy5zcGxpY2UocGxheWVySW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkVG91cm5hbWVudCA9IGF3YWl0IFRvdXJuYW1lbnRTY2hlbWEuZmluZE9uZUFuZFVwZGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHRvdXJuYW1lbnQuX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZXQ6IHRvdXJuYW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCBMYXRlc3RSYW5rU2NoZW1hLmRlbGV0ZU9uZSh7dXNlcjpPYmplY3RJZCh1c2VySWQpfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRQbGF5ZXIgPSBhd2FpdCBVc2VyU2NoZW1hLmRlbGV0ZU9uZSh7X2lkOk9iamVjdElkKHVzZXJJZCl9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZWxldGVkUGxheWVyKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYWRkR29sZkNsdWIocmVxOiBSZXF1ZXN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNsdWJJbmZvOiBhbnkgPSByZXEuYm9keS5jbHViSW5mbztcclxuICAgICAgICAgICAgY2x1YkluZm8uX2lkID0gdGhpcy5oYXNoSWRUbzEyQ2hhcmFjdGVycyhjbHViSW5mby5jb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3Q2x1YiA9IGF3YWl0IEdvbGZDbHViU2NoZW1hLmNyZWF0ZShjbHViSW5mbyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5Hb2xmQ2x1YlVwZGF0ZWROb3RpZmljYXRpb25Kb2IsIHsgY2x1YkluZm86IG5ld0NsdWIgLCAnb3BlcmF0aW9uJyA6ICdhZGQnfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3Q2x1Yik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG5lZWRIZWxwKHJlcTogUmVxdWVzdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBuZWVkSGVscEZvcm06IGFueSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICB0aGlzLmpvYlNjaGVkdWxlci5ub3coSm9iLm5lZWRIZWxwSm9iLG5lZWRIZWxwRm9ybSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdWNjZXNzTXNnOiAnRW1haWwgaXMgc2VudCB0byBhZG1pbicgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEFtYXRldXJUb2tlbnModXNlcklkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGlzU3BlY2lhbEludml0ZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgdG9rZW5zID0gYXdhaXQgVXNlclNjaGVtYS5maW5kQnlJZCh1c2VySWQsXHJcbiAgICAgICAgICAgICAgICB7IGFtYXRldXJUb2tlbnM6IDF9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnZpdGVlID0gYXdhaXQgSW52aXRlU2NoZW1hLmZpbmQoe3VzZWRCeTp1c2VySWR9KS5leGVjKCk7XHJcbiAgICAgICAgICAgIGlmKGludml0ZWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaXNTcGVjaWFsSW52aXRlZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7dG9rZW5zIDogdG9rZW5zLmFtYXRldXJUb2tlbnMsIGlzU3BlY2lhbEludml0ZWUgOiBpc1NwZWNpYWxJbnZpdGVlfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldENsdWJDaGFtcHMoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY2x1YkNoYW1wcyA9IGF3YWl0IEdvbGZDbHViU2NoZW1hLmZpbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG9yIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVuQ2hhbXAgOiB7JGV4aXN0czp0cnVlfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWRpZXNDaGFtcCA6IHskZXhpc3RzOnRydWV9fVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IDEsY291bnRyeUNvZGU6MSxtZW5DaGFtcDoxLGxhZGllc0NoYW1wOjEgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2x1YkNoYW1wcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFkZENvdW50cnlDaGFtcGlvbihyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFtcGlvbjogYW55ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGlmKCFjaGFtcGlvbi5faWQpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjaGFtcGlvbi5faWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9hd2FpdCBDaGFtcGlvblNjaGVtYS5kZWxldGVPbmUoe2RpdmlzaW9uOmNoYW1waW9uLmRpdmlzaW9uLGNvdW50cnk6Y2hhbXBpb24uY291bnRyeX0pO1xyXG4gICAgICAgICAgICBhd2FpdCBDaGFtcGlvblNjaGVtYS5jcmVhdGUoY2hhbXBpb24pO1xyXG4gICAgICAgICAgICBsZXQgY2hhbXBpb25zID0gYXdhaXQgQ2hhbXBpb25TY2hlbWEuZmluZCh7Y291bnRyeSA6IGNoYW1waW9uLmNvdW50cnl9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGFtcGlvbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q291bnRyeUNoYW1waW9ucyhjb3VudHJ5Q29kZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFtcGlvbnM7XHJcbiAgICAgICAgICAgIGlmKGNvdW50cnlDb2RlICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFtcGlvbnMgPSBhd2FpdCBDaGFtcGlvblNjaGVtYS5maW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5IDogY291bnRyeUNvZGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hhbXBpb25zID0gYXdhaXQgQ2hhbXBpb25TY2hlbWEuZmluZCh7fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGFtcGlvbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBoZWxwU3VwcG9ydChyZXE6IFJlcXVlc3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgaGVscEZvcm06IGFueSA9IHJlcS5ib2R5O1xyXG4gICAgICAgICAgICB0aGlzLmpvYlNjaGVkdWxlci5ub3coSm9iLmhlbHBTdXBwb3J0Sm9iLGhlbHBGb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN1Y2Nlc3NNc2c6ICdFbWFpbCBpcyBzZW50IHRvIGFkbWluJyB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VXNlclRvdXJuYW1lbnRQb2ludHModG91cm5hbWVudElkLHVzZXJJZCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB0b3VybmFtZW50UmVzdWx0OlRvdXJuYW1lbnRSZXN1bHQgPSBhd2FpdCBUb3VybmFtZW50UmVzdWx0U2NoZW1hLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudDogT2JqZWN0SWQodG91cm5hbWVudElkKSxcclxuICAgICAgICAgICAgICAgIHVzZXI6IE9iamVjdElkKHVzZXJJZClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJQb2ludHMgPSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgOiB0b3VybmFtZW50UmVzdWx0ID8gdG91cm5hbWVudFJlc3VsdC5wb2ludHMgKyB0b3VybmFtZW50UmVzdWx0LmJvbnVzUG9pbnRzIDogJy0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1c2VyUG9pbnRzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5HZW5lcmljLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2F2ZUNvdXJzZVJhdGluZ3MocmVxdWVzdEJvZHksY291cnNlSWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL2NvbnN0IGNvdXJzZUlkID0gJzM0NDEyZmNmZWY1YjRhNGU5NjVmY2I2Zic7XHJcbiAgICAgICAgICAgIGxldCBjb3Vyc2VEZXRhaWxzOiBhbnkgPSBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmRCeUlkKGNvdXJzZUlkKS5leGVjKCk7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVkQ291cnNlOiBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nUmF0aW5nID0gY291cnNlRGV0YWlscy51c2VyQ291cnNlUmF0aW5nID8gY291cnNlRGV0YWlscy51c2VyQ291cnNlUmF0aW5nIDogMDtcclxuICAgICAgICAgICAgbGV0IHVzZXJDb3Vyc2VSYXRpbmcgPSAwO1xyXG4gICAgICAgICAgICBpZihjb3Vyc2VEZXRhaWxzLmNvdXJzZVJhdGluZ3MgJiYgIGNvdXJzZURldGFpbHMuY291cnNlUmF0aW5ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyQ291cnNlUmF0aW5nID0gKGV4aXN0aW5nUmF0aW5nICsgcmVxdWVzdEJvZHkucmF0aW5nQXZnKS8oY291cnNlRGV0YWlscy5jb3Vyc2VSYXRpbmdzLmxlbmd0aCArIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXNlckNvdXJzZVJhdGluZyA9IHJlcXVlc3RCb2R5LnJhdGluZ0F2ZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291cnNlRGV0YWlscy5jb3Vyc2VSYXRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkQ291cnNlID0gR29sZkNvdXJzZVNjaGVtYS51cGRhdGVPbmUoeyBfaWQ6IGNvdXJzZUlkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcHVzaDogeyBjb3Vyc2VSYXRpbmdzOiByZXF1ZXN0Qm9keSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2V0IDogeyB1c2VyQ291cnNlUmF0aW5nIDogdXNlckNvdXJzZVJhdGluZyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkQ291cnNlID0gYXdhaXQgR29sZkNvdXJzZVNjaGVtYS51cGRhdGVPbmUoeyBfaWQ6IGNvdXJzZUlkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2V0OiB7IGNvdXJzZVJhdGluZ3M6IFtyZXF1ZXN0Qm9keV0sdXNlckNvdXJzZVJhdGluZyA6IHVzZXJDb3Vyc2VSYXRpbmcgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlZENvdXJzZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGhhc2hJZFRvMTJDaGFyYWN0ZXJzKGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2Jyk7XHJcbiAgICAgICAgaGFzaC51cGRhdGUoaWQpO1xyXG4gICAgICAgIHJldHVybiBoYXNoLmRpZ2VzdCgnaGV4Jykuc3Vic3RyaW5nKDAsIDI0KTtcclxuICAgIH1cclxuXHJcbn0iXX0=