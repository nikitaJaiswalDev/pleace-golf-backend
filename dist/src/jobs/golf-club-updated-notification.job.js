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
exports.GolfClubUpdatedNotificationJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class GolfClubUpdatedNotificationJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            //console.log('jobData',jobData);
            const clubInfo = jobData.clubInfo;
            const golfClubPageUrl = config_1.default.app.getGolfClubPageUrl(clubInfo._id);
            clubInfo['golfClubPageUrl'] = golfClubPageUrl;
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createGolfClubUpdateNotificationTemplete(clubInfo, jobData.operation);
            yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.GolfClubUpdatedNotificationJob);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.GolfClubUpdatedNotificationJob;
    }
}
exports.GolfClubUpdatedNotificationJobProcessor = GolfClubUpdatedNotificationJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZi1jbHViLXVwZGF0ZWQtbm90aWZpY2F0aW9uLmpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qb2JzL2dvbGYtY2x1Yi11cGRhdGVkLW5vdGlmaWNhdGlvbi5qb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsOERBQTBEO0FBRTFELHlDQUFpQztBQUVqQyw0RUFBdUU7QUFDdkUsc0NBQStCO0FBRS9CLE1BQWEsdUNBQXdDLFNBQVEsNEJBQVk7SUFHckUsWUFBWSxnQkFBbUMsRUFBRSxZQUEwQjtRQUN2RSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQVFyQixZQUFPLEdBQUcsQ0FBTyxHQUFRLEVBQWlCLEVBQUU7WUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELGlDQUFpQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ2xDLE1BQU0sZUFBZSxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxlQUFlLENBQUM7WUFDOUMsTUFBTSxhQUFhLEdBQUcsNkNBQW9CLENBQUMsd0NBQXdDLENBQUMsUUFBUSxFQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoSCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyxjQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUV2RixDQUFDLENBQUEsQ0FBQTtRQWhCRyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sY0FBRyxDQUFDLDhCQUE4QixDQUFDO0lBQzlDLENBQUM7Q0FjSjtBQXhCRCwwRkF3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXByb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBJSm9iRGF0YUV4dHJhY3RvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLWRhdGEtZXh0cmFjdG9yLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi9qb2IuZW51bVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9lbWFpbC9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsVGVtcGxhdGVGYWN0b3J5IH0gZnJvbSBcIi4uL2VtYWlsL2VtYWlsLXRlbXBsYXRlLWZhY3RvcnlcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvbGZDbHViVXBkYXRlZE5vdGlmaWNhdGlvbkpvYlByb2Nlc3NvciBleHRlbmRzIEpvYlByb2Nlc3NvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpvYkRhdGFFeHRyYWN0b3I6IElKb2JEYXRhRXh0cmFjdG9yLCBlbWFpbFNlcnZpY2U6IEVtYWlsU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKGpvYkRhdGFFeHRyYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuZW1haWxTZXJ2aWNlID0gZW1haWxTZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRKb2JOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gSm9iLkdvbGZDbHViVXBkYXRlZE5vdGlmaWNhdGlvbkpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2pvYkRhdGEnLGpvYkRhdGEpO1xyXG4gICAgICAgIGNvbnN0IGNsdWJJbmZvID0gam9iRGF0YS5jbHViSW5mbztcclxuICAgICAgICBjb25zdCBnb2xmQ2x1YlBhZ2VVcmwgPSBjb25maWcuYXBwLmdldEdvbGZDbHViUGFnZVVybChjbHViSW5mby5faWQpO1xyXG4gICAgICAgIGNsdWJJbmZvWydnb2xmQ2x1YlBhZ2VVcmwnXSA9IGdvbGZDbHViUGFnZVVybDtcclxuICAgICAgICBjb25zdCBlbWFpbFRlbXBsYXRlID0gRW1haWxUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlR29sZkNsdWJVcGRhdGVOb3RpZmljYXRpb25UZW1wbGV0ZShjbHViSW5mbyxqb2JEYXRhLm9wZXJhdGlvbik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbWFpbFNlcnZpY2Uuc2VuZE1haWwoZW1haWxUZW1wbGF0ZSxKb2IuR29sZkNsdWJVcGRhdGVkTm90aWZpY2F0aW9uSm9iKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==