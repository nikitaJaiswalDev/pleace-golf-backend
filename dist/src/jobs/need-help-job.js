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
exports.NeedHelpJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class NeedHelpJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            console.log('jobData', jobData);
            const needHelfForm = jobData;
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createNeedHelpTemplete(needHelfForm, config_1.default.email.adminEmail.name, config_1.default.email.adminEmail.email);
            yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.needHelpJob);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.needHelpJob;
    }
}
exports.NeedHelpJobProcessor = NeedHelpJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVlZC1oZWxwLWpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qb2JzL25lZWQtaGVscC1qb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsOERBQTBEO0FBRTFELHlDQUFpQztBQUVqQyw0RUFBdUU7QUFDdkUsc0NBQStCO0FBRS9CLE1BQWEsb0JBQXFCLFNBQVEsNEJBQVk7SUFHbEQsWUFBWSxnQkFBbUMsRUFBRSxZQUEwQjtRQUN2RSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQVFyQixZQUFPLEdBQUcsQ0FBTyxHQUFRLEVBQWlCLEVBQUU7WUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM3QixNQUFNLGFBQWEsR0FBRyw2Q0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUksTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsY0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQSxDQUFBO1FBYkcsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVNLFVBQVU7UUFDYixPQUFPLGNBQUcsQ0FBQyxXQUFXLENBQUM7SUFDM0IsQ0FBQztDQVdKO0FBckJELG9EQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgSm9iUHJvY2Vzc29yIH0gZnJvbSBcIi4uL2NvcmUvam9icy9qb2ItcHJvY2Vzc29yXCI7XHJcbmltcG9ydCB7IElKb2JEYXRhRXh0cmFjdG9yIH0gZnJvbSBcIi4uL2NvcmUvam9icy9qb2ItZGF0YS1leHRyYWN0b3IuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEpvYiB9IGZyb20gXCIuL2pvYi5lbnVtXCI7XHJcbmltcG9ydCB7IEVtYWlsU2VydmljZSB9IGZyb20gXCIuLi9jb3JlL2VtYWlsL2VtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRW1haWxUZW1wbGF0ZUZhY3RvcnkgfSBmcm9tIFwiLi4vZW1haWwvZW1haWwtdGVtcGxhdGUtZmFjdG9yeVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmVlZEhlbHBKb2JQcm9jZXNzb3IgZXh0ZW5kcyBKb2JQcm9jZXNzb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBlbWFpbFNlcnZpY2U6IEVtYWlsU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqb2JEYXRhRXh0cmFjdG9yOiBJSm9iRGF0YUV4dHJhY3RvciwgZW1haWxTZXJ2aWNlOiBFbWFpbFNlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihqb2JEYXRhRXh0cmFjdG9yKTtcclxuICAgICAgICB0aGlzLmVtYWlsU2VydmljZSA9IGVtYWlsU2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Sm9iTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIEpvYi5uZWVkSGVscEpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2JEYXRhJyxqb2JEYXRhKTtcclxuICAgICAgICBjb25zdCBuZWVkSGVsZkZvcm0gPSBqb2JEYXRhO1xyXG4gICAgICAgIGNvbnN0IGVtYWlsVGVtcGxhdGUgPSBFbWFpbFRlbXBsYXRlRmFjdG9yeS5jcmVhdGVOZWVkSGVscFRlbXBsZXRlKG5lZWRIZWxmRm9ybSxjb25maWcuZW1haWwuYWRtaW5FbWFpbC5uYW1lLCBjb25maWcuZW1haWwuYWRtaW5FbWFpbC5lbWFpbCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbWFpbFNlcnZpY2Uuc2VuZE1haWwoZW1haWxUZW1wbGF0ZSxKb2IubmVlZEhlbHBKb2IpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==