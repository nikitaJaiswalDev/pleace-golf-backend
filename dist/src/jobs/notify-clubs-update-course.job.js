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
exports.NotifyClubsUpdateCourseJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class NotifyClubsUpdateCourseJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const clubEmailArr = jobData.clubInfo;
            for (let i = 0; i < clubEmailArr.length; i++) {
                const clubEmailInfo = clubEmailArr[i];
                if (this.emailService.validateEmailAddress(clubEmailInfo.clubEmail)) {
                    const golfClubPageUrl = config_1.default.app.getGolfClubPageUrl(clubEmailInfo.clubId);
                    clubEmailInfo['golfClubPageUrl'] = golfClubPageUrl;
                    const emailTemplate = email_template_factory_1.EmailTemplateFactory.createNotifyClubTemplate(clubEmailInfo);
                    yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.NotifyClubsUpdateCourseJob);
                }
            }
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.NotifyClubsUpdateCourseJob;
    }
}
exports.NotifyClubsUpdateCourseJobProcessor = NotifyClubsUpdateCourseJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LWNsdWJzLXVwZGF0ZS1jb3Vyc2Uuam9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pvYnMvbm90aWZ5LWNsdWJzLXVwZGF0ZS1jb3Vyc2Uuam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhEQUEwRDtBQUUxRCx5Q0FBaUM7QUFFakMsNEVBQXVFO0FBQ3ZFLHNDQUErQjtBQUUvQixNQUFhLG1DQUFvQyxTQUFRLDRCQUFZO0lBR2pFLFlBQVksZ0JBQW1DLEVBQUUsWUFBMEI7UUFDdkUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFRckIsWUFBTyxHQUFHLENBQU8sR0FBUSxFQUFpQixFQUFFO1lBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLFlBQVksR0FBUyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQzVDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNqRSxNQUFNLGVBQWUsR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVFLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGVBQWUsQ0FBQztvQkFDbkQsTUFBTSxhQUFhLEdBQUcsNkNBQW9CLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ25GLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFDLGNBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNuRixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO1FBbkJHLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxVQUFVO1FBQ2IsT0FBTyxjQUFHLENBQUMsMEJBQTBCLENBQUM7SUFDMUMsQ0FBQztDQWlCSjtBQTNCRCxrRkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXByb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBJSm9iRGF0YUV4dHJhY3RvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLWRhdGEtZXh0cmFjdG9yLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi9qb2IuZW51bVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9lbWFpbC9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsVGVtcGxhdGVGYWN0b3J5IH0gZnJvbSBcIi4uL2VtYWlsL2VtYWlsLXRlbXBsYXRlLWZhY3RvcnlcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iUHJvY2Vzc29yIGV4dGVuZHMgSm9iUHJvY2Vzc29yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZW1haWxTZXJ2aWNlOiBFbWFpbFNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioam9iRGF0YUV4dHJhY3RvcjogSUpvYkRhdGFFeHRyYWN0b3IsIGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoam9iRGF0YUV4dHJhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5lbWFpbFNlcnZpY2UgPSBlbWFpbFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEpvYk5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBKb2IuTm90aWZ5Q2x1YnNVcGRhdGVDb3Vyc2VKb2I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3MgPSBhc3luYyAoam9iOiBhbnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgICB2YXIgam9iRGF0YSA9IHRoaXMuam9iRGF0YUV4dHJhY3Rvci5leHRyYWN0RGF0YUZyb21Kb2Ioam9iKTtcclxuICAgICAgICBjb25zdCBjbHViRW1haWxBcnI6YW55W10gPSBqb2JEYXRhLmNsdWJJbmZvO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGNsdWJFbWFpbEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjbHViRW1haWxJbmZvID0gY2x1YkVtYWlsQXJyW2ldO1xyXG4gICAgICAgICAgICBpZih0aGlzLmVtYWlsU2VydmljZS52YWxpZGF0ZUVtYWlsQWRkcmVzcyhjbHViRW1haWxJbmZvLmNsdWJFbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdvbGZDbHViUGFnZVVybCA9IGNvbmZpZy5hcHAuZ2V0R29sZkNsdWJQYWdlVXJsKGNsdWJFbWFpbEluZm8uY2x1YklkKTtcclxuICAgICAgICAgICAgICAgIGNsdWJFbWFpbEluZm9bJ2dvbGZDbHViUGFnZVVybCddID0gZ29sZkNsdWJQYWdlVXJsO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1haWxUZW1wbGF0ZSA9IEVtYWlsVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZU5vdGlmeUNsdWJUZW1wbGF0ZShjbHViRW1haWxJbmZvKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZW1haWxTZXJ2aWNlLnNlbmRNYWlsKGVtYWlsVGVtcGxhdGUsSm9iLk5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG4iXX0=