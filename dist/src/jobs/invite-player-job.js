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
exports.InvitePlayerJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
class InvitePlayerJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const inviteeForm = jobData.user;
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createInvitePlayerTemplate(inviteeForm.firstName, inviteeForm.email, inviteeForm);
            yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.InvitePlayerJob);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.InvitePlayerJob;
    }
}
exports.InvitePlayerJobProcessor = InvitePlayerJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLXBsYXllci1qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvam9icy9pbnZpdGUtcGxheWVyLWpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw4REFBMEQ7QUFFMUQseUNBQWlDO0FBR2pDLDRFQUF1RTtBQUd2RSxNQUFhLHdCQUF5QixTQUFRLDRCQUFZO0lBR3RELFlBQVksZ0JBQW1DLEVBQUUsWUFBMEI7UUFDdkUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFRckIsWUFBTyxHQUFHLENBQU8sR0FBUSxFQUFpQixFQUFFO1lBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLFdBQVcsR0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLDZDQUFvQixDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM1SCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyxjQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFBLENBQUE7UUFaRyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sY0FBRyxDQUFDLGVBQWUsQ0FBQztJQUMvQixDQUFDO0NBUUo7QUFsQkQsNERBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBKb2JQcm9jZXNzb3IgfSBmcm9tIFwiLi4vY29yZS9qb2JzL2pvYi1wcm9jZXNzb3JcIjtcclxuaW1wb3J0IHsgSUpvYkRhdGFFeHRyYWN0b3IgfSBmcm9tIFwiLi4vY29yZS9qb2JzL2pvYi1kYXRhLWV4dHJhY3Rvci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4vam9iLmVudW1cIjtcclxuaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vY29yZS9lbWFpbC9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsVGVtcGxhdGVGYWN0b3J5IH0gZnJvbSBcIi4uL2VtYWlsL2VtYWlsLXRlbXBsYXRlLWZhY3RvcnlcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludml0ZVBsYXllckpvYlByb2Nlc3NvciBleHRlbmRzIEpvYlByb2Nlc3NvciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVtYWlsU2VydmljZTogRW1haWxTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpvYkRhdGFFeHRyYWN0b3I6IElKb2JEYXRhRXh0cmFjdG9yLCBlbWFpbFNlcnZpY2U6IEVtYWlsU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKGpvYkRhdGFFeHRyYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuZW1haWxTZXJ2aWNlID0gZW1haWxTZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRKb2JOYW1lKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gSm9iLkludml0ZVBsYXllckpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIGNvbnN0IGludml0ZWVGb3JtOmFueSA9IGpvYkRhdGEudXNlcjtcclxuICAgICAgICBjb25zdCBlbWFpbFRlbXBsYXRlID0gRW1haWxUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlSW52aXRlUGxheWVyVGVtcGxhdGUoaW52aXRlZUZvcm0uZmlyc3ROYW1lLGludml0ZWVGb3JtLmVtYWlsLCBpbnZpdGVlRm9ybSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbWFpbFNlcnZpY2Uuc2VuZE1haWwoZW1haWxUZW1wbGF0ZSxKb2IuSW52aXRlUGxheWVySm9iKTtcclxuICAgIH1cclxufVxyXG4iXX0=