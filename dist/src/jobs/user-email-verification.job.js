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
exports.UserEmailVerificationJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class UserEmailVerificationJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const user = jobData.user;
            const accountConfirmationCtaLink = config_1.default.app.accountConfirmationUrl(user.email, user.emailVerificationCode);
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createActivateAccountTemplate(user.firstName + " " + user.lastName, user.email, accountConfirmationCtaLink);
            yield this.emailService.sendMail(emailTemplate);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.UserEmailVerificationJob;
    }
}
exports.UserEmailVerificationJobProcessor = UserEmailVerificationJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1lbWFpbC12ZXJpZmljYXRpb24uam9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pvYnMvdXNlci1lbWFpbC12ZXJpZmljYXRpb24uam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhEQUEwRDtBQUUxRCx5Q0FBaUM7QUFHakMsNEVBQXVFO0FBQ3ZFLHNDQUErQjtBQUUvQixNQUFhLGlDQUFrQyxTQUFRLDRCQUFZO0lBRy9ELFlBQVksZ0JBQW1DLEVBQUUsWUFBMEI7UUFDdkUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFRckIsWUFBTyxHQUFHLENBQU8sR0FBUSxFQUFpQixFQUFFO1lBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBYSxDQUFDO1lBRW5DLE1BQU0sMEJBQTBCLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM3RyxNQUFNLGFBQWEsR0FBRyw2Q0FBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUV2SixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQSxDQUFBO1FBZkcsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVNLFVBQVU7UUFDYixPQUFPLGNBQUcsQ0FBQyx3QkFBd0IsQ0FBQztJQUN4QyxDQUFDO0NBV0o7QUFyQkQsOEVBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBKb2JQcm9jZXNzb3IgfSBmcm9tIFwiLi4vY29yZS9qb2JzL2pvYi1wcm9jZXNzb3JcIjtcclxuaW1wb3J0IHsgSUpvYkRhdGFFeHRyYWN0b3IgfSBmcm9tIFwiLi4vY29yZS9qb2JzL2pvYi1kYXRhLWV4dHJhY3Rvci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4vam9iLmVudW1cIjtcclxuaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9lbWFpbC9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsVGVtcGxhdGVGYWN0b3J5IH0gZnJvbSBcIi4uL2VtYWlsL2VtYWlsLXRlbXBsYXRlLWZhY3RvcnlcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYlByb2Nlc3NvciBleHRlbmRzIEpvYlByb2Nlc3NvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpvYkRhdGFFeHRyYWN0b3I6IElKb2JEYXRhRXh0cmFjdG9yLCBlbWFpbFNlcnZpY2U6IEVtYWlsU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKGpvYkRhdGFFeHRyYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuZW1haWxTZXJ2aWNlID0gZW1haWxTZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRKb2JOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gSm9iLlVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBqb2JEYXRhLnVzZXIgYXMgSVVzZXI7XHJcblxyXG4gICAgICAgIGNvbnN0IGFjY291bnRDb25maXJtYXRpb25DdGFMaW5rID0gY29uZmlnLmFwcC5hY2NvdW50Q29uZmlybWF0aW9uVXJsKHVzZXIuZW1haWwsIHVzZXIuZW1haWxWZXJpZmljYXRpb25Db2RlKTtcclxuICAgICAgICBjb25zdCBlbWFpbFRlbXBsYXRlID0gRW1haWxUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlQWN0aXZhdGVBY2NvdW50VGVtcGxhdGUodXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWUsIHVzZXIuZW1haWwsIGFjY291bnRDb25maXJtYXRpb25DdGFMaW5rKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbWFpbFNlcnZpY2Uuc2VuZE1haWwoZW1haWxUZW1wbGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19