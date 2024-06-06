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
exports.Server = void 0;
const https = require("https");
const http = require("http");
const fs = require("fs");
const config_1 = require("./config");
const routes_1 = require("./api/v1/routes");
const app_1 = require("./app");
const logging_1 = require("./core/logging");
const authentication_service_1 = require("./services/authentication.service");
const user_service_1 = require("./services/user.service");
const user_mongo_dao_1 = require("./daos/mongo/user.mongo.dao");
const data_importer_1 = require("./data/data-importer");
const country_service_1 = require("./core/country/country-service");
const basic_mongo_dao_1 = require("./core/dao/mongo/basic-mongo.dao");
const access_token_model_1 = require("./models/access-token.model");
const golf_club_model_1 = require("./models/golf-club.model");
const golf_club_service_1 = require("./services/golf-club.service");
const tournament_management_service_1 = require("./services/tournament-management.service");
const tournament_scorecard_mongo_dao_1 = require("./daos/mongo/tournament-scorecard.mongo.dao");
const tournament_leaderboard_mongo_dao_1 = require("./daos/mongo/tournament-leaderboard.mongo.dao");
const tournament_result_mongo_dao_1 = require("./daos/mongo/tournament-result.mongo.dao");
const tournament_mongo_dao_1 = require("./daos/mongo/tournament.mongo.dao");
const tournament_entry_model_1 = require("./models/tournament-entry.model");
const agenda_job_scheduler_1 = require("./core/jobs/agenda/agenda.job-scheduler");
const agenda_job_data_extractor_1 = require("./core/jobs/agenda/agenda.job-data-extractor");
const user_email_verification_job_1 = require("./jobs/user-email-verification.job");
const tournament_result_job_1 = require("./jobs/tournament-result.job");
const job_enum_1 = require("./jobs/job.enum");
const sendgrid_email_service_1 = require("./core/email/sendgrid/sendgrid.email-service");
const user_forgot_password_request_job_1 = require("./jobs/user-forgot-password-request.job");
const golf_course_mongo_dao_1 = require("./daos/mongo/golf-course.mongo.dao");
const data_transformer_1 = require("./data/data-transformer");
const common_service_1 = require("./services/common.service");
const sendinblue_email_service_1 = require("./core/email/sendinblue.email-service");
const create_invitee_request_job_1 = require("./jobs/create-invitee-request.job");
const notify_clubs_update_course_job_1 = require("./jobs/notify-clubs-update-course.job");
const golf_club_updated_notification_job_1 = require("./jobs/golf-club-updated-notification.job");
const need_help_job_1 = require("./jobs/need-help-job");
const help_support_job_1 = require("./jobs/help-support-job");
const invite_player_job_1 = require("./jobs/invite-player-job");
class Server {
    constructor(agendaDependency) {
        this.agendaDependency = agendaDependency;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Job Scheduler
            const agenda = yield this.agendaDependency.getClient();
            const agendaJobScheduler = new agenda_job_scheduler_1.AgendaJobScheduler(agenda);
            // DAOs
            const userMongoDAO = new user_mongo_dao_1.UserMongoDAO();
            const golfClubMongoDAO = new basic_mongo_dao_1.BasicMongoDAO(golf_club_model_1.GolfClubSchema);
            const golfCourseMongoDAO = new golf_course_mongo_dao_1.GolfCourseMongoDAO();
            const accessTokenMongoDAO = new basic_mongo_dao_1.BasicMongoDAO(access_token_model_1.AccessTokenSchema);
            const tournamentMongoDAO = new tournament_mongo_dao_1.TournamentMongoDAO();
            const tournamentScorecardMongoDAO = new tournament_scorecard_mongo_dao_1.TournamentScorecardMongoDAO();
            const tournamentLeaderboardMongoDAO = new tournament_leaderboard_mongo_dao_1.TournamentLeaderboardMongoDAO();
            const tournamentResultMongoDAO = new tournament_result_mongo_dao_1.TournamentResultMongoDAO();
            const tournamentEntryMongoDAO = new basic_mongo_dao_1.BasicMongoDAO(tournament_entry_model_1.TournamentEntrySchema);
            // Services
            const countryService = new country_service_1.CountryService();
            const authService = new authentication_service_1.AuthenticationService();
            const userService = new user_service_1.UserService(userMongoDAO, accessTokenMongoDAO, agendaJobScheduler);
            const golfClubService = new golf_club_service_1.GolfClubService(golfClubMongoDAO);
            const tournamentManagementService = new tournament_management_service_1.TournamentManagementService(tournamentMongoDAO, tournamentEntryMongoDAO, tournamentResultMongoDAO, tournamentScorecardMongoDAO, tournamentLeaderboardMongoDAO);
            const sendgridEmailService = new sendgrid_email_service_1.SendgridEmailService(config_1.default.email.sendgridApiKey, config_1.default.email.fromEmail, config_1.default.email.replyEmail);
            const sendinblueEmailService = new sendinblue_email_service_1.SendinblueEmailService(config_1.default.email.sendinblueApiKey, config_1.default.email.fromEmail, config_1.default.email.adminEmail);
            // Data Importer
            const dataImporter = new data_importer_1.DataImporter(golfClubMongoDAO, golfCourseMongoDAO, accessTokenMongoDAO, tournamentMongoDAO, config_1.default.dataImportFilePath, countryService, config_1.default.dataImportFilePathNew);
            // Data Transformer
            const dataTransformer = new data_transformer_1.DataTransformer(golfClubMongoDAO, golfCourseMongoDAO, accessTokenMongoDAO, tournamentMongoDAO, config_1.default.dataTransformFilePath, countryService);
            //common service 
            const commonService = new common_service_1.CommonService(golfCourseMongoDAO, agendaJobScheduler);
            // Jobs
            const agendaJobDataExtractor = new agenda_job_data_extractor_1.AgendaJobDataExtractor();
            //const userEmailVerificationJob = new UserEmailVerificationJobProcessor(agendaJobDataExtractor, sendgridEmailService);
            const userEmailVerificationJob = new user_email_verification_job_1.UserEmailVerificationJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            //const userForgotPasswordRequestJob = new UserForgotPasswordRequestJobProcessor(agendaJobDataExtractor, sendgridEmailService);
            const userForgotPasswordRequestJob = new user_forgot_password_request_job_1.UserForgotPasswordRequestJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const createInviteeRequestJobProcessor = new create_invitee_request_job_1.CreateInviteeRequestJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const invitePlayerJobProcessor = new invite_player_job_1.InvitePlayerJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const notifyClubsUpdateCourseJobProcessor = new notify_clubs_update_course_job_1.NotifyClubsUpdateCourseJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const golfClubUpdatedNotificationJobProcessor = new golf_club_updated_notification_job_1.GolfClubUpdatedNotificationJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const needHelpJobProcessor = new need_help_job_1.NeedHelpJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const helpSupportJobProcessor = new help_support_job_1.HelpSupportJobProcessor(agendaJobDataExtractor, sendinblueEmailService);
            const tournamentResultJob = new tournament_result_job_1.TournamentResultJobProcessor(agendaJobDataExtractor, tournamentManagementService);
            // Register jobs
            this.agendaDependency.registerJobDefinitions(userEmailVerificationJob, userForgotPasswordRequestJob, tournamentResultJob, createInviteeRequestJobProcessor, notifyClubsUpdateCourseJobProcessor, needHelpJobProcessor, helpSupportJobProcessor, invitePlayerJobProcessor);
            // Clean jobs
            yield this.agendaDependency.removeUndefinedBehaviourJobs();
            // Start job queue processing
            yield this.agendaDependency.start();
            // Schedule recurring jobs
            const schedulerOptions = { skipImmediate: true };
            yield agendaJobScheduler.every('15 minutes', job_enum_1.Job.TournamentResultJob, {}, schedulerOptions);
            //await agendaJobScheduler.every('2 minutes', 'UserEmailVerificationJob', {}, schedulerOptions);
            //await agendaJobScheduler.now("UserEmailVerificationJob");
            const routerV1 = new routes_1.ApiRouter(authService, userService, countryService, golfClubService, tournamentManagementService, dataImporter, dataTransformer, commonService);
            const routersMap = {
                "": routerV1,
                "v1": routerV1,
            };
            this.app = (new app_1.App(routersMap, userService, this.agendaDependency)).getApp();
            this.app.set("port", config_1.default.api.port);
            if (config_1.default.https.isEnabled) {
                let options = {
                    key: fs.readFileSync(config_1.default.https.keyPath),
                    cert: fs.readFileSync(config_1.default.https.certPath)
                };
                this.server = https.createServer(options, this.app);
            }
            else {
                this.server = http.createServer(this.app);
            }
        });
    }
    start() {
        this.server.listen(config_1.default.api.port);
        this.server.on("error", (ex) => { this.onError(ex); });
        this.server.on("listening", () => { this.onListening(); });
    }
    onError(ex) {
        logging_1.Logger.info('Error...');
        logging_1.Logger.error(ex);
    }
    onListening() {
        const addr = this.server.address();
        const bind = (typeof addr === "string") ? `${addr}` : `${addr.port}`;
        logging_1.Logger.info(`API is listening on port: ${bind}`);
    }
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUd6QixxQ0FBOEI7QUFDOUIsNENBQTJEO0FBQzNELCtCQUE0QjtBQUM1Qiw0Q0FBd0M7QUFDeEMsOEVBQTBFO0FBQzFFLDBEQUFzRDtBQUN0RCxnRUFBMkQ7QUFFM0Qsd0RBQW9EO0FBQ3BELG9FQUFnRTtBQUloRSxzRUFBaUU7QUFDakUsb0VBQWdFO0FBSWhFLDhEQUEwRDtBQUcxRCxvRUFBK0Q7QUFDL0QsNEZBQXVGO0FBQ3ZGLGdHQUEwRjtBQUMxRixvR0FBOEY7QUFDOUYsMEZBQW9GO0FBQ3BGLDRFQUF1RTtBQUV2RSw0RUFBd0U7QUFDeEUsa0ZBQTZFO0FBQzdFLDRGQUFzRjtBQUN0RixvRkFBdUY7QUFDdkYsd0VBQTRFO0FBQzVFLDhDQUFzQztBQUN0Qyx5RkFBb0Y7QUFDcEYsOEZBQWdHO0FBQ2hHLDhFQUF3RTtBQUN4RSw4REFBMEQ7QUFDMUQsOERBQTBEO0FBQzFELG9GQUErRTtBQUMvRSxrRkFBcUY7QUFDckYsMEZBQTRGO0FBQzVGLGtHQUFvRztBQUNwRyx3REFBNEQ7QUFDNUQsOERBQWtFO0FBQ2xFLGdFQUFvRTtBQUVwRSxNQUFhLE1BQU07SUFLZixZQUFtQixnQkFBa0M7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzdDLENBQUM7SUFFWSxJQUFJOztZQUViLGdCQUFnQjtZQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN2RCxNQUFNLGtCQUFrQixHQUFHLElBQUkseUNBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUQsT0FBTztZQUNQLE1BQU0sWUFBWSxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFD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RSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sT0FBTyxDQUFDLEVBQVM7UUFDckIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsRUFBUyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVPLFdBQVc7UUFDZixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JFLGdCQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQW5IRCx3QkFtSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIGh0dHBzIGZyb20gXCJodHRwc1wiO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgQXBpUm91dGVyIGFzIEFwaVJvdXRlclYxIH0gZnJvbSBcIi4vYXBpL3YxL3JvdXRlc1wiO1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9hcHBcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlck1vbmdvREFPIH0gZnJvbSBcIi4vZGFvcy9tb25nby91c2VyLm1vbmdvLmRhb1wiO1xyXG5pbXBvcnQgeyBBZ2VuZGFEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY29yZS9kZXBlbmRlbmNpZXMvYWdlbmRhL2FnZW5kYS5kZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IERhdGFJbXBvcnRlciB9IGZyb20gXCIuL2RhdGEvZGF0YS1pbXBvcnRlclwiO1xyXG5pbXBvcnQgeyBDb3VudHJ5U2VydmljZSB9IGZyb20gXCIuL2NvcmUvY291bnRyeS9jb3VudHJ5LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291bnRyeUNvZGVUeXBlIH0gZnJvbSBcIi4vY29yZS9jb3VudHJ5L2NvdW50cnktY29kZS10eXBlLmVudW1cIjtcclxuaW1wb3J0IHsgVG9rZW5HZW5lcmF0b3IgfSBmcm9tIFwiLi9jb3JlL2F1dGgvdG9rZW4tZ2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4vdHlwZXMvYWNjZXNzLXRva2VuXCI7XHJcbmltcG9ydCB7IEJhc2ljTW9uZ29EQU8gfSBmcm9tIFwiLi9jb3JlL2Rhby9tb25nby9iYXNpYy1tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgQWNjZXNzVG9rZW5TY2hlbWEgfSBmcm9tIFwiLi9tb2RlbHMvYWNjZXNzLXRva2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IEdvbGZDb3Vyc2UgfSBmcm9tIFwiLi90eXBlcy9nb2xmLWNvdXJzZVwiO1xyXG5pbXBvcnQgeyBHb2xmQ291cnNlU2NoZW1hIH0gZnJvbSBcIi4vbW9kZWxzL2dvbGYtY291cnNlLm1vZGVsXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViIH0gZnJvbSBcIi4vdHlwZXMvZ29sZi1jbHViXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViU2NoZW1hIH0gZnJvbSBcIi4vbW9kZWxzL2dvbGYtY2x1Yi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSBcIi4vdHlwZXMvdG91cm5hbWVudFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NoZW1hIH0gZnJvbSBcIi4vbW9kZWxzL3RvdXJuYW1lbnQubW9kZWxcIjtcclxuaW1wb3J0IHsgR29sZkNsdWJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZ29sZi1jbHViLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdG91cm5hbWVudC1tYW5hZ2VtZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFNjb3JlY2FyZE1vbmdvREFPIH0gZnJvbSBcIi4vZGFvcy9tb25nby90b3VybmFtZW50LXNjb3JlY2FyZC5tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudExlYWRlcmJvYXJkTW9uZ29EQU8gfSBmcm9tIFwiLi9kYW9zL21vbmdvL3RvdXJuYW1lbnQtbGVhZGVyYm9hcmQubW9uZ28uZGFvXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHRNb25nb0RBTyB9IGZyb20gXCIuL2Rhb3MvbW9uZ28vdG91cm5hbWVudC1yZXN1bHQubW9uZ28uZGFvXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRNb25nb0RBTyB9IGZyb20gXCIuL2Rhb3MvbW9uZ28vdG91cm5hbWVudC5tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudEVudHJ5IH0gZnJvbSBcIi4vdHlwZXMvdG91cm5hbWVudC1lbnRyeVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50RW50cnlTY2hlbWEgfSBmcm9tIFwiLi9tb2RlbHMvdG91cm5hbWVudC1lbnRyeS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBBZ2VuZGFKb2JTY2hlZHVsZXIgfSBmcm9tIFwiLi9jb3JlL2pvYnMvYWdlbmRhL2FnZW5kYS5qb2Itc2NoZWR1bGVyXCI7XHJcbmltcG9ydCB7IEFnZW5kYUpvYkRhdGFFeHRyYWN0b3IgfSBmcm9tIFwiLi9jb3JlL2pvYnMvYWdlbmRhL2FnZW5kYS5qb2ItZGF0YS1leHRyYWN0b3JcIjtcclxuaW1wb3J0IHsgVXNlckVtYWlsVmVyaWZpY2F0aW9uSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4vam9icy91c2VyLWVtYWlsLXZlcmlmaWNhdGlvbi5qb2JcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudFJlc3VsdEpvYlByb2Nlc3NvciB9IGZyb20gXCIuL2pvYnMvdG91cm5hbWVudC1yZXN1bHQuam9iXCI7XHJcbmltcG9ydCB7IEpvYiB9IGZyb20gXCIuL2pvYnMvam9iLmVudW1cIjtcclxuaW1wb3J0IHsgU2VuZGdyaWRFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi9jb3JlL2VtYWlsL3NlbmRncmlkL3NlbmRncmlkLmVtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlckZvcmdvdFBhc3N3b3JkUmVxdWVzdEpvYlByb2Nlc3NvciB9IGZyb20gXCIuL2pvYnMvdXNlci1mb3Jnb3QtcGFzc3dvcmQtcmVxdWVzdC5qb2JcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZU1vbmdvREFPIH0gZnJvbSBcIi4vZGFvcy9tb25nby9nb2xmLWNvdXJzZS5tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgRGF0YVRyYW5zZm9ybWVyIH0gZnJvbSBcIi4vZGF0YS9kYXRhLXRyYW5zZm9ybWVyXCI7XHJcbmltcG9ydCB7IENvbW1vblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb21tb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZW5kaW5ibHVlRW1haWxTZXJ2aWNlIH0gZnJvbSBcIi4vY29yZS9lbWFpbC9zZW5kaW5ibHVlLmVtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3JlYXRlSW52aXRlZVJlcXVlc3RKb2JQcm9jZXNzb3IgfSBmcm9tIFwiLi9qb2JzL2NyZWF0ZS1pbnZpdGVlLXJlcXVlc3Quam9iXCI7XHJcbmltcG9ydCB7IE5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4vam9icy9ub3RpZnktY2x1YnMtdXBkYXRlLWNvdXJzZS5qb2JcIjtcclxuaW1wb3J0IHsgR29sZkNsdWJVcGRhdGVkTm90aWZpY2F0aW9uSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4vam9icy9nb2xmLWNsdWItdXBkYXRlZC1ub3RpZmljYXRpb24uam9iXCI7XHJcbmltcG9ydCB7IE5lZWRIZWxwSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4vam9icy9uZWVkLWhlbHAtam9iXCI7XHJcbmltcG9ydCB7IEhlbHBTdXBwb3J0Sm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4vam9icy9oZWxwLXN1cHBvcnQtam9iXCI7XHJcbmltcG9ydCB7IEludml0ZVBsYXllckpvYlByb2Nlc3NvciB9IGZyb20gXCIuL2pvYnMvaW52aXRlLXBsYXllci1qb2JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xyXG4gICAgcHJpdmF0ZSBzZXJ2ZXI6IGh0dHBzLlNlcnZlciB8IGh0dHAuU2VydmVyO1xyXG4gICAgcHJpdmF0ZSBhcHA6IEFwcGxpY2F0aW9uO1xyXG4gICAgcHJpdmF0ZSBhZ2VuZGFEZXBlbmRlbmN5OiBBZ2VuZGFEZXBlbmRlbmN5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhZ2VuZGFEZXBlbmRlbmN5OiBBZ2VuZGFEZXBlbmRlbmN5KSB7XHJcbiAgICAgICAgdGhpcy5hZ2VuZGFEZXBlbmRlbmN5ID0gYWdlbmRhRGVwZW5kZW5jeTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdCgpIHtcclxuXHJcbiAgICAgICAgLy8gSm9iIFNjaGVkdWxlclxyXG4gICAgICAgIGNvbnN0IGFnZW5kYSA9IGF3YWl0IHRoaXMuYWdlbmRhRGVwZW5kZW5jeS5nZXRDbGllbnQoKTtcclxuICAgICAgICBjb25zdCBhZ2VuZGFKb2JTY2hlZHVsZXIgPSBuZXcgQWdlbmRhSm9iU2NoZWR1bGVyKGFnZW5kYSk7XHJcblxyXG4gICAgICAgIC8vIERBT3NcclxuICAgICAgICBjb25zdCB1c2VyTW9uZ29EQU8gPSBuZXcgVXNlck1vbmdvREFPKCk7XHJcbiAgICAgICAgY29uc3QgZ29sZkNsdWJNb25nb0RBTyA9IG5ldyBCYXNpY01vbmdvREFPPEdvbGZDbHViPihHb2xmQ2x1YlNjaGVtYSk7XHJcbiAgICAgICAgY29uc3QgZ29sZkNvdXJzZU1vbmdvREFPID0gbmV3IEdvbGZDb3Vyc2VNb25nb0RBTygpO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuTW9uZ29EQU8gPSBuZXcgQmFzaWNNb25nb0RBTzxBY2Nlc3NUb2tlbj4oQWNjZXNzVG9rZW5TY2hlbWEpO1xyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnRNb25nb0RBTyA9IG5ldyBUb3VybmFtZW50TW9uZ29EQU8oKTtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50U2NvcmVjYXJkTW9uZ29EQU8gPSBuZXcgVG91cm5hbWVudFNjb3JlY2FyZE1vbmdvREFPKCk7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudExlYWRlcmJvYXJkTW9uZ29EQU8gPSBuZXcgVG91cm5hbWVudExlYWRlcmJvYXJkTW9uZ29EQU8oKTtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50UmVzdWx0TW9uZ29EQU8gPSBuZXcgVG91cm5hbWVudFJlc3VsdE1vbmdvREFPKCk7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudEVudHJ5TW9uZ29EQU8gPSBuZXcgQmFzaWNNb25nb0RBTzxUb3VybmFtZW50RW50cnk+KFRvdXJuYW1lbnRFbnRyeVNjaGVtYSk7XHJcblxyXG4gICAgICAgIC8vIFNlcnZpY2VzXHJcbiAgICAgICAgY29uc3QgY291bnRyeVNlcnZpY2UgPSBuZXcgQ291bnRyeVNlcnZpY2UoKTtcclxuICAgICAgICBjb25zdCBhdXRoU2VydmljZSA9IG5ldyBBdXRoZW50aWNhdGlvblNlcnZpY2UoKTtcclxuICAgICAgICBjb25zdCB1c2VyU2VydmljZSA9IG5ldyBVc2VyU2VydmljZSh1c2VyTW9uZ29EQU8sIGFjY2Vzc1Rva2VuTW9uZ29EQU8sIGFnZW5kYUpvYlNjaGVkdWxlcik7XHJcbiAgICAgICAgY29uc3QgZ29sZkNsdWJTZXJ2aWNlID0gbmV3IEdvbGZDbHViU2VydmljZShnb2xmQ2x1Yk1vbmdvREFPKTtcclxuICAgICAgICBjb25zdCB0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UgPSBuZXcgVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlKHRvdXJuYW1lbnRNb25nb0RBTywgdG91cm5hbWVudEVudHJ5TW9uZ29EQU8sIHRvdXJuYW1lbnRSZXN1bHRNb25nb0RBTywgdG91cm5hbWVudFNjb3JlY2FyZE1vbmdvREFPLCB0b3VybmFtZW50TGVhZGVyYm9hcmRNb25nb0RBTyk7XHJcbiAgICAgICAgY29uc3Qgc2VuZGdyaWRFbWFpbFNlcnZpY2UgPSBuZXcgU2VuZGdyaWRFbWFpbFNlcnZpY2UoY29uZmlnLmVtYWlsLnNlbmRncmlkQXBpS2V5LCBjb25maWcuZW1haWwuZnJvbUVtYWlsLCBjb25maWcuZW1haWwucmVwbHlFbWFpbCk7XHJcbiAgICAgICAgY29uc3Qgc2VuZGluYmx1ZUVtYWlsU2VydmljZSA9IG5ldyBTZW5kaW5ibHVlRW1haWxTZXJ2aWNlKGNvbmZpZy5lbWFpbC5zZW5kaW5ibHVlQXBpS2V5LCBjb25maWcuZW1haWwuZnJvbUVtYWlsLCBjb25maWcuZW1haWwuYWRtaW5FbWFpbCk7XHJcblxyXG4gICAgICAgIC8vIERhdGEgSW1wb3J0ZXJcclxuICAgICAgICBjb25zdCBkYXRhSW1wb3J0ZXIgPSBuZXcgRGF0YUltcG9ydGVyKGdvbGZDbHViTW9uZ29EQU8sIGdvbGZDb3Vyc2VNb25nb0RBTywgYWNjZXNzVG9rZW5Nb25nb0RBTywgdG91cm5hbWVudE1vbmdvREFPLCBjb25maWcuZGF0YUltcG9ydEZpbGVQYXRoLCBjb3VudHJ5U2VydmljZSxjb25maWcuZGF0YUltcG9ydEZpbGVQYXRoTmV3KTtcclxuICAgICAgICAvLyBEYXRhIFRyYW5zZm9ybWVyXHJcbiAgICAgICAgY29uc3QgZGF0YVRyYW5zZm9ybWVyID0gbmV3IERhdGFUcmFuc2Zvcm1lcihnb2xmQ2x1Yk1vbmdvREFPLCBnb2xmQ291cnNlTW9uZ29EQU8sIGFjY2Vzc1Rva2VuTW9uZ29EQU8sIHRvdXJuYW1lbnRNb25nb0RBTywgY29uZmlnLmRhdGFUcmFuc2Zvcm1GaWxlUGF0aCwgY291bnRyeVNlcnZpY2UpO1xyXG4gICAgICAgIC8vY29tbW9uIHNlcnZpY2UgXHJcbiAgICAgICAgY29uc3QgY29tbW9uU2VydmljZSA9IG5ldyBDb21tb25TZXJ2aWNlKGdvbGZDb3Vyc2VNb25nb0RBTyxhZ2VuZGFKb2JTY2hlZHVsZXIpO1xyXG4gICAgICAgIC8vIEpvYnNcclxuICAgICAgICBjb25zdCBhZ2VuZGFKb2JEYXRhRXh0cmFjdG9yID0gbmV3IEFnZW5kYUpvYkRhdGFFeHRyYWN0b3IoKTtcclxuICAgICAgICAvL2NvbnN0IHVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYiA9IG5ldyBVc2VyRW1haWxWZXJpZmljYXRpb25Kb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGdyaWRFbWFpbFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYiA9IG5ldyBVc2VyRW1haWxWZXJpZmljYXRpb25Kb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGluYmx1ZUVtYWlsU2VydmljZSk7XHJcbiAgICAgICAgLy9jb25zdCB1c2VyRm9yZ290UGFzc3dvcmRSZXF1ZXN0Sm9iID0gbmV3IFVzZXJGb3Jnb3RQYXNzd29yZFJlcXVlc3RKb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGdyaWRFbWFpbFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJGb3Jnb3RQYXNzd29yZFJlcXVlc3RKb2IgPSBuZXcgVXNlckZvcmdvdFBhc3N3b3JkUmVxdWVzdEpvYlByb2Nlc3NvcihhZ2VuZGFKb2JEYXRhRXh0cmFjdG9yLCBzZW5kaW5ibHVlRW1haWxTZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBjcmVhdGVJbnZpdGVlUmVxdWVzdEpvYlByb2Nlc3NvciA9IG5ldyBDcmVhdGVJbnZpdGVlUmVxdWVzdEpvYlByb2Nlc3NvcihhZ2VuZGFKb2JEYXRhRXh0cmFjdG9yLCBzZW5kaW5ibHVlRW1haWxTZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBpbnZpdGVQbGF5ZXJKb2JQcm9jZXNzb3IgPSBuZXcgSW52aXRlUGxheWVySm9iUHJvY2Vzc29yKGFnZW5kYUpvYkRhdGFFeHRyYWN0b3IsIHNlbmRpbmJsdWVFbWFpbFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IG5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iUHJvY2Vzc29yID0gbmV3IE5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iUHJvY2Vzc29yKGFnZW5kYUpvYkRhdGFFeHRyYWN0b3IsIHNlbmRpbmJsdWVFbWFpbFNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IGdvbGZDbHViVXBkYXRlZE5vdGlmaWNhdGlvbkpvYlByb2Nlc3NvciA9IG5ldyBHb2xmQ2x1YlVwZGF0ZWROb3RpZmljYXRpb25Kb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGluYmx1ZUVtYWlsU2VydmljZSk7XHJcbiAgICAgICAgY29uc3QgbmVlZEhlbHBKb2JQcm9jZXNzb3IgPSBuZXcgTmVlZEhlbHBKb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGluYmx1ZUVtYWlsU2VydmljZSk7XHJcbiAgICAgICAgY29uc3QgaGVscFN1cHBvcnRKb2JQcm9jZXNzb3IgPSBuZXcgSGVscFN1cHBvcnRKb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvciwgc2VuZGluYmx1ZUVtYWlsU2VydmljZSk7XHJcbiAgICAgICAgY29uc3QgdG91cm5hbWVudFJlc3VsdEpvYiA9IG5ldyBUb3VybmFtZW50UmVzdWx0Sm9iUHJvY2Vzc29yKGFnZW5kYUpvYkRhdGFFeHRyYWN0b3IsIHRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZSk7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGpvYnNcclxuICAgICAgICB0aGlzLmFnZW5kYURlcGVuZGVuY3kucmVnaXN0ZXJKb2JEZWZpbml0aW9ucyh1c2VyRW1haWxWZXJpZmljYXRpb25Kb2IsIHVzZXJGb3Jnb3RQYXNzd29yZFJlcXVlc3RKb2IsIHRvdXJuYW1lbnRSZXN1bHRKb2IsXHJcbiAgICAgICAgICAgIGNyZWF0ZUludml0ZWVSZXF1ZXN0Sm9iUHJvY2Vzc29yLG5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iUHJvY2Vzc29yLFxyXG4gICAgICAgICAgICBuZWVkSGVscEpvYlByb2Nlc3NvcixoZWxwU3VwcG9ydEpvYlByb2Nlc3NvcixpbnZpdGVQbGF5ZXJKb2JQcm9jZXNzb3IpO1xyXG4gICAgICAgIC8vIENsZWFuIGpvYnNcclxuICAgICAgICBhd2FpdCB0aGlzLmFnZW5kYURlcGVuZGVuY3kucmVtb3ZlVW5kZWZpbmVkQmVoYXZpb3VySm9icygpO1xyXG4gICAgICAgIC8vIFN0YXJ0IGpvYiBxdWV1ZSBwcm9jZXNzaW5nXHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZ2VuZGFEZXBlbmRlbmN5LnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIC8vIFNjaGVkdWxlIHJlY3VycmluZyBqb2JzXHJcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVyT3B0aW9ucyA9IHsgc2tpcEltbWVkaWF0ZTogdHJ1ZSB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGF3YWl0IGFnZW5kYUpvYlNjaGVkdWxlci5ldmVyeSgnMTUgbWludXRlcycsIEpvYi5Ub3VybmFtZW50UmVzdWx0Sm9iLCB7fSwgc2NoZWR1bGVyT3B0aW9ucyk7XHJcbiAgICAgICAgLy9hd2FpdCBhZ2VuZGFKb2JTY2hlZHVsZXIuZXZlcnkoJzIgbWludXRlcycsICdVc2VyRW1haWxWZXJpZmljYXRpb25Kb2InLCB7fSwgc2NoZWR1bGVyT3B0aW9ucyk7XHJcbiAgICAgICAgLy9hd2FpdCBhZ2VuZGFKb2JTY2hlZHVsZXIubm93KFwiVXNlckVtYWlsVmVyaWZpY2F0aW9uSm9iXCIpO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3Qgcm91dGVyVjEgPSBuZXcgQXBpUm91dGVyVjEoYXV0aFNlcnZpY2UsIHVzZXJTZXJ2aWNlLCBjb3VudHJ5U2VydmljZSwgZ29sZkNsdWJTZXJ2aWNlLCB0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UsIGRhdGFJbXBvcnRlciwgZGF0YVRyYW5zZm9ybWVyLGNvbW1vblNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHJvdXRlcnNNYXA6IHsgW3ZlcnNpb246IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICBcIlwiOiByb3V0ZXJWMSxcclxuICAgICAgICAgICAgXCJ2MVwiOiByb3V0ZXJWMSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFwcCA9IChuZXcgQXBwKHJvdXRlcnNNYXAsIHVzZXJTZXJ2aWNlLCB0aGlzLmFnZW5kYURlcGVuZGVuY3kpKS5nZXRBcHAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAuc2V0KFwicG9ydFwiLCBjb25maWcuYXBpLnBvcnQpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnLmh0dHBzLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKGNvbmZpZy5odHRwcy5rZXlQYXRoKSxcclxuICAgICAgICAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhjb25maWcuaHR0cHMuY2VydFBhdGgpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IGh0dHBzLmNyZWF0ZVNlcnZlcihvcHRpb25zLCB0aGlzLmFwcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIodGhpcy5hcHApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKGNvbmZpZy5hcGkucG9ydCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oXCJlcnJvclwiLCAoZXg6IEVycm9yKSA9PiB7IHRoaXMub25FcnJvcihleCk7IH0pO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLm9uKFwibGlzdGVuaW5nXCIsICgpID0+IHsgdGhpcy5vbkxpc3RlbmluZygpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXJyb3IoZXg6IEVycm9yKTogdm9pZCB7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oJ0Vycm9yLi4uJyk7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKGV4IGFzIGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxpc3RlbmluZygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBhZGRyID0gdGhpcy5zZXJ2ZXIuYWRkcmVzcygpO1xyXG4gICAgICAgIGNvbnN0IGJpbmQgPSAodHlwZW9mIGFkZHIgPT09IFwic3RyaW5nXCIpID8gYCR7YWRkcn1gIDogYCR7YWRkci5wb3J0fWA7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYEFQSSBpcyBsaXN0ZW5pbmcgb24gcG9ydDogJHtiaW5kfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHAoKTogQXBwbGljYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcDtcclxuICAgIH1cclxufVxyXG4iXX0=