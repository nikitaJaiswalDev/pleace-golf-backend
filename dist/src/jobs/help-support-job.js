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
exports.HelpSupportJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class HelpSupportJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            //console.log('jobData',jobData);
            const helpForm = jobData;
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createHelpSupportTemplete(helpForm, config_1.default.email.adminEmail.name, config_1.default.email.adminEmail.email);
            yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.helpSupportJob);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.helpSupportJob;
    }
}
exports.HelpSupportJobProcessor = HelpSupportJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1zdXBwb3J0LWpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qb2JzL2hlbHAtc3VwcG9ydC1qb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsOERBQTBEO0FBRTFELHlDQUFpQztBQUVqQyw0RUFBdUU7QUFDdkUsc0NBQStCO0FBRS9CLE1BQWEsdUJBQXdCLFNBQVEsNEJBQVk7SUFHckQsWUFBWSxnQkFBbUMsRUFBRSxZQUEwQjtRQUN2RSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQVFyQixZQUFPLEdBQUcsQ0FBTyxHQUFRLEVBQWlCLEVBQUU7WUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELGlDQUFpQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDekIsTUFBTSxhQUFhLEdBQUcsNkNBQW9CLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNJLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFDLGNBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUEsQ0FBQTtRQWJHLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxVQUFVO1FBQ2IsT0FBTyxjQUFHLENBQUMsY0FBYyxDQUFDO0lBQzlCLENBQUM7Q0FXSjtBQXJCRCwwREFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXByb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBJSm9iRGF0YUV4dHJhY3RvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLWRhdGEtZXh0cmFjdG9yLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi9qb2IuZW51bVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9lbWFpbC9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsVGVtcGxhdGVGYWN0b3J5IH0gZnJvbSBcIi4uL2VtYWlsL2VtYWlsLXRlbXBsYXRlLWZhY3RvcnlcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBTdXBwb3J0Sm9iUHJvY2Vzc29yIGV4dGVuZHMgSm9iUHJvY2Vzc29yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZW1haWxTZXJ2aWNlOiBFbWFpbFNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioam9iRGF0YUV4dHJhY3RvcjogSUpvYkRhdGFFeHRyYWN0b3IsIGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoam9iRGF0YUV4dHJhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5lbWFpbFNlcnZpY2UgPSBlbWFpbFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEpvYk5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBKb2IuaGVscFN1cHBvcnRKb2I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3MgPSBhc3luYyAoam9iOiBhbnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgICB2YXIgam9iRGF0YSA9IHRoaXMuam9iRGF0YUV4dHJhY3Rvci5leHRyYWN0RGF0YUZyb21Kb2Ioam9iKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdqb2JEYXRhJyxqb2JEYXRhKTtcclxuICAgICAgICBjb25zdCBoZWxwRm9ybSA9IGpvYkRhdGE7XHJcbiAgICAgICAgY29uc3QgZW1haWxUZW1wbGF0ZSA9IEVtYWlsVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZUhlbHBTdXBwb3J0VGVtcGxldGUoaGVscEZvcm0sY29uZmlnLmVtYWlsLmFkbWluRW1haWwubmFtZSwgY29uZmlnLmVtYWlsLmFkbWluRW1haWwuZW1haWwpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZW1haWxTZXJ2aWNlLnNlbmRNYWlsKGVtYWlsVGVtcGxhdGUsSm9iLmhlbHBTdXBwb3J0Sm9iKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG4iXX0=