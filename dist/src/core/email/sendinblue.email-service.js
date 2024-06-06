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
exports.SendinblueEmailService = void 0;
const SibApiV3Sdk = require("sib-api-v3-sdk");
const email_service_1 = require("./email-service");
const email_html_template_1 = require("./email-html-template");
const job_enum_1 = require("../../jobs/job.enum");
class SendinblueEmailService extends email_service_1.EmailService {
    //reply to is admin email id
    constructor(sendinblueApiKey, from, replyTo) {
        super(from, replyTo);
        this.sendinblueApiKey = sendinblueApiKey;
        this.from = from;
        this.replyTo = replyTo;
    }
    sendMail(emailTemplate, job) {
        const _super = Object.create(null, {
            validateEmailAddress: { get: () => super.validateEmailAddress }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let defaultClient = SibApiV3Sdk.ApiClient.instance;
            let apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = this.sendinblueApiKey;
            let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            let htmlContent = '';
            if (job === job_enum_1.Job.CreateInviteeRequestJob) {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getCreateInviteeTemplate();
            }
            else if (job === job_enum_1.Job.NotifyClubsUpdateCourseJob) {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getNotifyClubTemplate();
            }
            else if (job === job_enum_1.Job.GolfClubUpdatedNotificationJob) {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getGolfClubUpdatedTemplate();
            }
            else if (job === job_enum_1.Job.needHelpJob) {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getNeedHelpTemplate();
            }
            else if (job === job_enum_1.Job.helpSupportJob) {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getHelpSupportTemplate();
            }
            else {
                htmlContent = email_html_template_1.EmailHtmlTemplate.getPleaceGolfTemplate();
            }
            sendSmtpEmail.subject = emailTemplate.subject;
            sendSmtpEmail.htmlContent = htmlContent;
            sendSmtpEmail.sender = { "name": this.from.name, "email": this.from.email };
            if (job === job_enum_1.Job.GolfClubUpdatedNotificationJob || job === job_enum_1.Job.NotifyClubsUpdateCourseJob) {
                if (_super.validateEmailAddress.call(this, emailTemplate.to.email)) {
                    //club and admin both
                    sendSmtpEmail.to = [
                        { "email": emailTemplate.to.email, "name": emailTemplate.to.name },
                        { "email": this.replyTo.email, "name": this.replyTo.name }
                    ];
                }
                else {
                    //only admin
                    sendSmtpEmail.to = [{ "email": this.replyTo.email, "name": this.replyTo.name }];
                }
                sendSmtpEmail.templateId = 5;
            }
            else {
                //to user
                sendSmtpEmail.to = [
                    { "email": emailTemplate.to.email, "name": emailTemplate.to.name }
                ];
            }
            //sendSmtpEmail.cc = [{ "email": this.replyTo.email, "name": this.replyTo.name }];
            //sendSmtpEmail.bcc = [{ "email": "John Doe", "name": "example@example.com" }];
            sendSmtpEmail.replyTo = { "email": this.replyTo.email, "name": this.replyTo.name };
            sendSmtpEmail.headers = { "Some-Custom-Name-192012": "unique-id-123238239231214" };
            sendSmtpEmail.params = emailTemplate.templateData;
            //console.log('sendSmtpEmail: ',sendSmtpEmail);
            //apiInstance.
            //apiInstance.seb
            apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
                console.log('Email sent successfully. Returned data: ' + JSON.stringify(data));
            }, function (error) {
                console.error(error);
            });
        });
    }
}
exports.SendinblueEmailService = SendinblueEmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGluYmx1ZS5lbWFpbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZW1haWwvc2VuZGluYmx1ZS5lbWFpbC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLDhDQUE4QztBQUU5QyxtREFBK0M7QUFDL0MsK0RBQTBEO0FBQzFELGtEQUEwQztBQUUxQyxNQUFhLHNCQUF1QixTQUFRLDRCQUFZO0lBQ3BELDRCQUE0QjtJQUM1QixZQUFzQixnQkFBd0IsRUFBWSxJQUFrQixFQUFZLE9BQXFCO1FBQ3pHLEtBQUssQ0FDRCxJQUFJLEVBQUUsT0FBTyxDQUNoQixDQUFDO1FBSGdCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUFZLFNBQUksR0FBSixJQUFJLENBQWM7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFjO0lBSTdHLENBQUM7SUFFSyxRQUFRLENBQUMsYUFBNkIsRUFBQyxHQUFVOzs7OztZQUVuRCxJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNuRCxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBRXZDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFFM0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFcEQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLElBQUcsR0FBRyxLQUFLLGNBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUNyQyxXQUFXLEdBQUcsdUNBQWlCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUMvRCxDQUFDO2lCQUFNLElBQUcsR0FBRyxLQUFLLGNBQUcsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUMvQyxXQUFXLEdBQUcsdUNBQWlCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM1RCxDQUFDO2lCQUFNLElBQUcsR0FBRyxLQUFLLGNBQUcsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2dCQUNuRCxXQUFXLEdBQUcsdUNBQWlCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNqRSxDQUFDO2lCQUFNLElBQUcsR0FBRyxLQUFLLGNBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDaEMsV0FBVyxHQUFHLHVDQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDMUQsQ0FBQztpQkFBTSxJQUFHLEdBQUcsS0FBSyxjQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ25DLFdBQVcsR0FBRyx1Q0FBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzdELENBQUM7aUJBQU0sQ0FBQztnQkFDSixXQUFXLEdBQUcsdUNBQWlCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsYUFBYSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzlDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFNUUsSUFBRyxHQUFHLEtBQUssY0FBRyxDQUFDLDhCQUE4QixJQUFJLEdBQUcsS0FBSyxjQUFHLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFDdEYsSUFBRyxPQUFNLG9CQUFvQixZQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUM7b0JBQ3BELHFCQUFxQjtvQkFDckIsYUFBYSxDQUFDLEVBQUUsR0FBRzt3QkFDZixFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7d0JBQ2xFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtxQkFDN0QsQ0FBQztnQkFDTixDQUFDO3FCQUFNLENBQUM7b0JBQ0osWUFBWTtvQkFDWixhQUFhLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEYsQ0FBQztnQkFDRCxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osU0FBUztnQkFDVCxhQUFhLENBQUMsRUFBRSxHQUFHO29CQUNmLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtpQkFDckUsQ0FBQztZQUNOLENBQUM7WUFDRCxrRkFBa0Y7WUFDbEYsK0VBQStFO1lBQy9FLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUM7WUFDbEYsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLHlCQUF5QixFQUFFLDJCQUEyQixFQUFFLENBQUM7WUFDbkYsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBRWxELCtDQUErQztZQUMvQyxjQUFjO1lBQ2QsaUJBQWlCO1lBRWpCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuRixDQUFDLEVBQUUsVUFBVSxLQUFLO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0E0Qko7QUFsR0Qsd0RBa0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xyXG5pbXBvcnQgeyBFbWFpbEFkZHJlc3MgfSBmcm9tIFwiLi9lbWFpbC1hZGRyZXNzXCI7XHJcbmltcG9ydCAqIGFzIFNpYkFwaVYzU2RrIGZyb20gXCJzaWItYXBpLXYzLXNka1wiO1xyXG5pbXBvcnQgeyBJRW1haWxUZW1wbGF0ZSB9IGZyb20gXCIuL2VtYWlsLXRlbXBsYXRlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFbWFpbFNlcnZpY2UgfSBmcm9tIFwiLi9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsSHRtbFRlbXBsYXRlIH0gZnJvbSBcIi4vZW1haWwtaHRtbC10ZW1wbGF0ZVwiO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tIFwiLi4vLi4vam9icy9qb2IuZW51bVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbmRpbmJsdWVFbWFpbFNlcnZpY2UgZXh0ZW5kcyBFbWFpbFNlcnZpY2UgIHtcclxuICAgIC8vcmVwbHkgdG8gaXMgYWRtaW4gZW1haWwgaWRcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzZW5kaW5ibHVlQXBpS2V5OiBzdHJpbmcsIHByb3RlY3RlZCBmcm9tOiBFbWFpbEFkZHJlc3MsIHByb3RlY3RlZCByZXBseVRvOiBFbWFpbEFkZHJlc3MpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgZnJvbSwgcmVwbHlUb1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2VuZE1haWwoZW1haWxUZW1wbGF0ZTogSUVtYWlsVGVtcGxhdGUsam9iOlN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdENsaWVudCA9IFNpYkFwaVYzU2RrLkFwaUNsaWVudC5pbnN0YW5jZTtcclxuICAgICAgICBsZXQgYXBpS2V5ID0gZGVmYXVsdENsaWVudC5hdXRoZW50aWNhdGlvbnNbJ2FwaS1rZXknXTtcclxuICAgICAgICBhcGlLZXkuYXBpS2V5ID0gIHRoaXMuc2VuZGluYmx1ZUFwaUtleTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYXBpSW5zdGFuY2UgPSBuZXcgU2liQXBpVjNTZGsuVHJhbnNhY3Rpb25hbEVtYWlsc0FwaSgpO1xyXG5cclxuICAgICAgICBsZXQgc2VuZFNtdHBFbWFpbCA9IG5ldyBTaWJBcGlWM1Nkay5TZW5kU210cEVtYWlsKCk7XHJcblxyXG4gICAgICAgIGxldCBodG1sQ29udGVudCA9ICcnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGpvYiA9PT0gSm9iLkNyZWF0ZUludml0ZWVSZXF1ZXN0Sm9iKSB7XHJcbiAgICAgICAgICAgIGh0bWxDb250ZW50ID0gRW1haWxIdG1sVGVtcGxhdGUuZ2V0Q3JlYXRlSW52aXRlZVRlbXBsYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGpvYiA9PT0gSm9iLk5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iKSB7XHJcbiAgICAgICAgICAgIGh0bWxDb250ZW50ID0gRW1haWxIdG1sVGVtcGxhdGUuZ2V0Tm90aWZ5Q2x1YlRlbXBsYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGpvYiA9PT0gSm9iLkdvbGZDbHViVXBkYXRlZE5vdGlmaWNhdGlvbkpvYikge1xyXG4gICAgICAgICAgICBodG1sQ29udGVudCA9IEVtYWlsSHRtbFRlbXBsYXRlLmdldEdvbGZDbHViVXBkYXRlZFRlbXBsYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGpvYiA9PT0gSm9iLm5lZWRIZWxwSm9iKSB7XHJcbiAgICAgICAgICAgIGh0bWxDb250ZW50ID0gRW1haWxIdG1sVGVtcGxhdGUuZ2V0TmVlZEhlbHBUZW1wbGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZihqb2IgPT09IEpvYi5oZWxwU3VwcG9ydEpvYikge1xyXG4gICAgICAgICAgICBodG1sQ29udGVudCA9IEVtYWlsSHRtbFRlbXBsYXRlLmdldEhlbHBTdXBwb3J0VGVtcGxhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sQ29udGVudCA9IEVtYWlsSHRtbFRlbXBsYXRlLmdldFBsZWFjZUdvbGZUZW1wbGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZW5kU210cEVtYWlsLnN1YmplY3QgPSBlbWFpbFRlbXBsYXRlLnN1YmplY3Q7XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5odG1sQ29udGVudCA9IGh0bWxDb250ZW50O1xyXG4gICAgICAgIHNlbmRTbXRwRW1haWwuc2VuZGVyID0geyBcIm5hbWVcIjogdGhpcy5mcm9tLm5hbWUsIFwiZW1haWxcIjogdGhpcy5mcm9tLmVtYWlsIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoam9iID09PSBKb2IuR29sZkNsdWJVcGRhdGVkTm90aWZpY2F0aW9uSm9iIHx8IGpvYiA9PT0gSm9iLk5vdGlmeUNsdWJzVXBkYXRlQ291cnNlSm9iKSB7IFxyXG4gICAgICAgICAgICBpZihzdXBlci52YWxpZGF0ZUVtYWlsQWRkcmVzcyhlbWFpbFRlbXBsYXRlLnRvLmVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgLy9jbHViIGFuZCBhZG1pbiBib3RoXHJcbiAgICAgICAgICAgICAgICBzZW5kU210cEVtYWlsLnRvID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgXCJlbWFpbFwiOiBlbWFpbFRlbXBsYXRlLnRvLmVtYWlsLCBcIm5hbWVcIjogZW1haWxUZW1wbGF0ZS50by5uYW1lIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcImVtYWlsXCI6IHRoaXMucmVwbHlUby5lbWFpbCwgXCJuYW1lXCI6IHRoaXMucmVwbHlUby5uYW1lIH1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL29ubHkgYWRtaW5cclxuICAgICAgICAgICAgICAgIHNlbmRTbXRwRW1haWwudG8gPSBbeyBcImVtYWlsXCI6IHRoaXMucmVwbHlUby5lbWFpbCwgXCJuYW1lXCI6IHRoaXMucmVwbHlUby5uYW1lIH1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbmRTbXRwRW1haWwudGVtcGxhdGVJZCA9IDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy90byB1c2VyXHJcbiAgICAgICAgICAgIHNlbmRTbXRwRW1haWwudG8gPSBbXHJcbiAgICAgICAgICAgICAgICB7IFwiZW1haWxcIjogZW1haWxUZW1wbGF0ZS50by5lbWFpbCwgXCJuYW1lXCI6IGVtYWlsVGVtcGxhdGUudG8ubmFtZSB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL3NlbmRTbXRwRW1haWwuY2MgPSBbeyBcImVtYWlsXCI6IHRoaXMucmVwbHlUby5lbWFpbCwgXCJuYW1lXCI6IHRoaXMucmVwbHlUby5uYW1lIH1dO1xyXG4gICAgICAgIC8vc2VuZFNtdHBFbWFpbC5iY2MgPSBbeyBcImVtYWlsXCI6IFwiSm9obiBEb2VcIiwgXCJuYW1lXCI6IFwiZXhhbXBsZUBleGFtcGxlLmNvbVwiIH1dO1xyXG4gICAgICAgIHNlbmRTbXRwRW1haWwucmVwbHlUbyA9IHsgXCJlbWFpbFwiOiB0aGlzLnJlcGx5VG8uZW1haWwsIFwibmFtZVwiOiB0aGlzLnJlcGx5VG8ubmFtZX07XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5oZWFkZXJzID0geyBcIlNvbWUtQ3VzdG9tLU5hbWUtMTkyMDEyXCI6IFwidW5pcXVlLWlkLTEyMzIzODIzOTIzMTIxNFwiIH07XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5wYXJhbXMgPSBlbWFpbFRlbXBsYXRlLnRlbXBsYXRlRGF0YTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdzZW5kU210cEVtYWlsOiAnLHNlbmRTbXRwRW1haWwpO1xyXG4gICAgICAgIC8vYXBpSW5zdGFuY2UuXHJcbiAgICAgICAgLy9hcGlJbnN0YW5jZS5zZWJcclxuICAgICAgICBcclxuICAgICAgICBhcGlJbnN0YW5jZS5zZW5kVHJhbnNhY0VtYWlsKHNlbmRTbXRwRW1haWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VtYWlsIHNlbnQgc3VjY2Vzc2Z1bGx5LiBSZXR1cm5lZCBkYXRhOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBhc3luYyBzZW5kTWFpbChlbWFpbFRlbXBsYXRlOiBJRW1haWxUZW1wbGF0ZSkge1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdENsaWVudCA9IFNpYkFwaVYzU2RrLkFwaUNsaWVudC5pbnN0YW5jZTtcclxuICAgICAgICBsZXQgYXBpS2V5ID0gZGVmYXVsdENsaWVudC5hdXRoZW50aWNhdGlvbnNbJ2FwaS1rZXknXTtcclxuICAgICAgICBhcGlLZXkuYXBpS2V5ID0gIHRoaXMuc2VuZGluYmx1ZUFwaUtleTtcclxuXHJcbiAgICAgICAgbGV0IGFwaUluc3RhbmNlID0gbmV3IFNpYkFwaVYzU2RrLlRyYW5zYWN0aW9uYWxFbWFpbHNBcGkoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbmRTbXRwRW1haWwgPSBuZXcgU2liQXBpVjNTZGsuU2VuZFNtdHBFbWFpbCgpO1xyXG5cclxuICAgICAgICBzZW5kU210cEVtYWlsLnN1YmplY3QgPSBcIk15IHt7cGFyYW1zLnN1YmplY3R9fVwiO1xyXG4gICAgICAgIHNlbmRTbXRwRW1haWwuaHRtbENvbnRlbnQgPSBcIjxodG1sPjxib2R5PjxoMT5UaGlzIGlzIG15IGZpcnN0IHRyYW5zYWN0aW9uYWwgZW1haWwge3twYXJhbXMucGFyYW1ldGVyfX08L2gxPjwvYm9keT48L2h0bWw+XCI7XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5zZW5kZXIgPSB7IFwibmFtZVwiOiBcIlNhbmRlZXAgS25pdFwiLCBcImVtYWlsXCI6IFwic2FuZGUua25pdEBnbWFpbC5jb21cIiB9O1xyXG4gICAgICAgIHNlbmRTbXRwRW1haWwudG8gPSBbeyBcImVtYWlsXCI6IFwic2FuZGU5OTFAZ21haWwuY29tXCIsIFwibmFtZVwiOiBcIlNhbmRlZXAgdmVybWFcIiB9XTtcclxuICAgICAgICAvL3NlbmRTbXRwRW1haWwuY2MgPSBbeyBcImVtYWlsXCI6IFwiZXhhbXBsZTJAZXhhbXBsZTIuY29tXCIsIFwibmFtZVwiOiBcIkphbmljZSBEb2VcIiB9XTtcclxuICAgICAgICAvL3NlbmRTbXRwRW1haWwuYmNjID0gW3sgXCJlbWFpbFwiOiBcIkpvaG4gRG9lXCIsIFwibmFtZVwiOiBcImV4YW1wbGVAZXhhbXBsZS5jb21cIiB9XTtcclxuICAgICAgICAvL3NlbmRTbXRwRW1haWwucmVwbHlUbyA9IHsgXCJlbWFpbFwiOiBcInJlcGx5dG9AZG9tYWluLmNvbVwiLCBcIm5hbWVcIjogXCJKb2huIERvZVwiIH07XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5oZWFkZXJzID0geyBcIlNvbWUtQ3VzdG9tLU5hbWUtMTkyMDEyXCI6IFwidW5pcXVlLWlkLTEyMzIzODIzOTIzMTIxNFwiIH07XHJcbiAgICAgICAgc2VuZFNtdHBFbWFpbC5wYXJhbXMgPSB7IFwicGFyYW1ldGVyXCI6IFwiTXkgcGFyYW0gdmFsdWVcIiwgXCJzdWJqZWN0XCI6IFwiTmV3IFN1YmplY3RcIiB9O1xyXG5cclxuICAgICAgICBhcGlJbnN0YW5jZS5zZW5kVHJhbnNhY0VtYWlsKHNlbmRTbXRwRW1haWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FQSSBjYWxsZWQgc3VjY2Vzc2Z1bGx5LiBSZXR1cm5lZCBkYXRhOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gKi9cclxufSJdfQ==