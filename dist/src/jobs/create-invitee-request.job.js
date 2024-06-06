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
exports.CreateInviteeRequestJobProcessor = void 0;
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
const email_template_factory_1 = require("../email/email-template-factory");
const config_1 = require("../config");
class CreateInviteeRequestJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, emailService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const inviteeForm = jobData.user;
            const emailTemplate = email_template_factory_1.EmailTemplateFactory.createInviteeRequestTemplate(config_1.default.email.adminEmail.name, config_1.default.email.adminEmail.email, inviteeForm);
            yield this.emailService.sendMail(emailTemplate, job_enum_1.Job.CreateInviteeRequestJob);
        });
        this.emailService = emailService;
    }
    getJobName() {
        return job_enum_1.Job.CreateInviteeRequestJob;
    }
}
exports.CreateInviteeRequestJobProcessor = CreateInviteeRequestJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWludml0ZWUtcmVxdWVzdC5qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvam9icy9jcmVhdGUtaW52aXRlZS1yZXF1ZXN0LmpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw4REFBMEQ7QUFFMUQseUNBQWlDO0FBR2pDLDRFQUF1RTtBQUN2RSxzQ0FBK0I7QUFFL0IsTUFBYSxnQ0FBaUMsU0FBUSw0QkFBWTtJQUc5RCxZQUFZLGdCQUFtQyxFQUFFLFlBQTBCO1FBQ3ZFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBUXJCLFlBQU8sR0FBRyxDQUFPLEdBQVEsRUFBaUIsRUFBRTtZQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsTUFBTSxXQUFXLEdBQU8sT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQyxNQUFNLGFBQWEsR0FBRyw2Q0FBb0IsQ0FBQyw0QkFBNEIsQ0FBQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbEosTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsY0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFBLENBQUE7UUFaRyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sY0FBRyxDQUFDLHVCQUF1QixDQUFDO0lBQ3ZDLENBQUM7Q0FRSjtBQWxCRCw0RUFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXByb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBJSm9iRGF0YUV4dHJhY3RvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLWRhdGEtZXh0cmFjdG9yLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi9qb2IuZW51bVwiO1xyXG5pbXBvcnQgeyBJVXNlciB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsU2VydmljZSB9IGZyb20gXCIuLi9jb3JlL2VtYWlsL2VtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRW1haWxUZW1wbGF0ZUZhY3RvcnkgfSBmcm9tIFwiLi4vZW1haWwvZW1haWwtdGVtcGxhdGUtZmFjdG9yeVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlSW52aXRlZVJlcXVlc3RKb2JQcm9jZXNzb3IgZXh0ZW5kcyBKb2JQcm9jZXNzb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBlbWFpbFNlcnZpY2U6IEVtYWlsU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqb2JEYXRhRXh0cmFjdG9yOiBJSm9iRGF0YUV4dHJhY3RvciwgZW1haWxTZXJ2aWNlOiBFbWFpbFNlcnZpY2UpIHtcclxuICAgICAgICBzdXBlcihqb2JEYXRhRXh0cmFjdG9yKTtcclxuICAgICAgICB0aGlzLmVtYWlsU2VydmljZSA9IGVtYWlsU2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Sm9iTmFtZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIEpvYi5DcmVhdGVJbnZpdGVlUmVxdWVzdEpvYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2VzcyA9IGFzeW5jIChqb2I6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHZhciBqb2JEYXRhID0gdGhpcy5qb2JEYXRhRXh0cmFjdG9yLmV4dHJhY3REYXRhRnJvbUpvYihqb2IpO1xyXG4gICAgICAgIGNvbnN0IGludml0ZWVGb3JtOmFueSA9IGpvYkRhdGEudXNlcjtcclxuICAgICAgICBjb25zdCBlbWFpbFRlbXBsYXRlID0gRW1haWxUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlSW52aXRlZVJlcXVlc3RUZW1wbGF0ZShjb25maWcuZW1haWwuYWRtaW5FbWFpbC5uYW1lLCBjb25maWcuZW1haWwuYWRtaW5FbWFpbC5lbWFpbCwgaW52aXRlZUZvcm0pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZW1haWxTZXJ2aWNlLnNlbmRNYWlsKGVtYWlsVGVtcGxhdGUsSm9iLkNyZWF0ZUludml0ZWVSZXF1ZXN0Sm9iKTtcclxuICAgIH1cclxufVxyXG4iXX0=