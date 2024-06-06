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
exports.UserForgotPasswordRequestJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class UserForgotPasswordRequestJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const user = jobData.user;
            const resetPasswordCtaLink = config_1.default.app.resetPasswordUrl(user.email, user.resetPasswordVerificationCode);
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createResetPasswordRequestTemplate(user.firstName + " " + user.lastName, user.email, resetPasswordCtaLink);
            yield this.emailService.sendMail(emailTemplate);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.UserForgotPasswordRequestJob;
    }
}
exports.UserForgotPasswordRequestJobProcessor = UserForgotPasswordRequestJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1mb3Jnb3QtcGFzc3dvcmQtcmVxdWVzdC5qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvam9icy91c2VyLWZvcmdvdC1wYXNzd29yZC1yZXF1ZXN0LmpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw4REFBMEQ7QUFFMUQseUNBQWlDO0FBR2pDLDRFQUF1RTtBQUN2RSxzQ0FBK0I7QUFFL0IsTUFBYSxxQ0FBc0MsU0FBUSw0QkFBWTtJQUduRSxZQUFZLGdCQUFtQyxFQUFFLFlBQTBCO1FBQ3ZFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBUXJCLFlBQU8sR0FBRyxDQUFPLEdBQVEsRUFBaUIsRUFBRTtZQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQWEsQ0FBQztZQUVuQyxNQUFNLG9CQUFvQixHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDekcsTUFBTSxhQUFhLEdBQUcsNkNBQW9CLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFFdEosTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUEsQ0FBQTtRQWZHLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxVQUFVO1FBQ2IsT0FBTyxjQUFHLENBQUMsNEJBQTRCLENBQUM7SUFDNUMsQ0FBQztDQVdKO0FBckJELHNGQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4uL2NvcmUvam9icy9qb2ItcHJvY2Vzc29yXCI7XHJcbmltcG9ydCB7IElKb2JEYXRhRXh0cmFjdG9yIH0gZnJvbSBcIi4uL2NvcmUvam9icy9qb2ItZGF0YS1leHRyYWN0b3IuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEpvYiB9IGZyb20gXCIuL2pvYi5lbnVtXCI7XHJcbmltcG9ydCB7IElVc2VyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRW1haWxTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvcmUvZW1haWwvZW1haWwtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBFbWFpbFRlbXBsYXRlRmFjdG9yeSB9IGZyb20gXCIuLi9lbWFpbC9lbWFpbC10ZW1wbGF0ZS1mYWN0b3J5XCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyRm9yZ290UGFzc3dvcmRSZXF1ZXN0Sm9iUHJvY2Vzc29yIGV4dGVuZHMgSm9iUHJvY2Vzc29yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZW1haWxTZXJ2aWNlOiBFbWFpbFNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioam9iRGF0YUV4dHJhY3RvcjogSUpvYkRhdGFFeHRyYWN0b3IsIGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoam9iRGF0YUV4dHJhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5lbWFpbFNlcnZpY2UgPSBlbWFpbFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEpvYk5hbWUoKTogc3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBKb2IuVXNlckZvcmdvdFBhc3N3b3JkUmVxdWVzdEpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBqb2JEYXRhLnVzZXIgYXMgSVVzZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcmVzZXRQYXNzd29yZEN0YUxpbmsgPSBjb25maWcuYXBwLnJlc2V0UGFzc3dvcmRVcmwodXNlci5lbWFpbCwgdXNlci5yZXNldFBhc3N3b3JkVmVyaWZpY2F0aW9uQ29kZSk7XHJcbiAgICAgICAgY29uc3QgZW1haWxUZW1wbGF0ZSA9IEVtYWlsVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZVJlc2V0UGFzc3dvcmRSZXF1ZXN0VGVtcGxhdGUodXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWUsIHVzZXIuZW1haWwsIHJlc2V0UGFzc3dvcmRDdGFMaW5rKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbWFpbFNlcnZpY2Uuc2VuZE1haWwoZW1haWxUZW1wbGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19