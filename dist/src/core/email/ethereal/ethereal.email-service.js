"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
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
exports.EtherealEmailService = void 0;
const nodemailer = require("nodemailer");
const email_service_1 = require("../email-service");
class EtherealEmailService extends email_service_1.EmailService {
    constructor(from, replyTo) {
        super(from, replyTo);
        this.from = from;
        this.replyTo = replyTo;
    }
    sendMail(emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            const testAccount = yield nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                }
            });
            const info = yield transporter.sendMail({
                from: this.formatEmailAsNameAndAddress(this.from), // sender address
                to: emailTemplate.to.email, // list of receivers
                subject: emailTemplate.subject, // Subject line
                text: emailTemplate.getText(), // plain text body
                html: emailTemplate.getHtml() // html body
            });
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }
}
exports.EtherealEmailService = EtherealEmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoZXJlYWwuZW1haWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2VtYWlsL2V0aGVyZWFsL2V0aGVyZWFsLmVtYWlsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFFSCx5Q0FBeUM7QUFJekMsb0RBQWdEO0FBSWhELE1BQWEsb0JBQXFCLFNBQVEsNEJBQVk7SUFFbEQsWUFBc0IsSUFBa0IsRUFBWSxPQUFxQjtRQUNyRSxLQUFLLENBQ0QsSUFBSSxFQUFFLE9BQU8sQ0FDaEIsQ0FBQztRQUhnQixTQUFJLEdBQUosSUFBSSxDQUFjO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBYztJQUl6RSxDQUFDO0lBRUssUUFBUSxDQUFDLGFBQTZCOztZQUV4Qyx5REFBeUQ7WUFDekQsZ0VBQWdFO1lBQ2hFLE1BQU0sV0FBVyxHQUFHLE1BQU0sVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFFekQsc0VBQXNFO1lBQ3RFLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7Z0JBQzNDLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLElBQUksRUFBRSxHQUFHO2dCQUNULE1BQU0sRUFBRSxLQUFLLEVBQUUsc0NBQXNDO2dCQUNyRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCO29CQUNsRCxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyw4QkFBOEI7aUJBQ3hEO2FBQ0osQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDO2dCQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxpQkFBaUI7Z0JBQ3BFLEVBQUUsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxvQkFBb0I7Z0JBQ2hELE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLGVBQWU7Z0JBQy9DLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQWtCO2dCQUNqRCxJQUFJLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVk7YUFDN0MsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFaEQsa0VBQWtFO1lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQztLQUFBO0NBQ0o7QUF0Q0Qsb0RBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgRW1haWxTZXJ2aWNlIH0gZnJvbSBcIi4uL2VtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRW1haWxBZGRyZXNzIH0gZnJvbSBcIi4uL2VtYWlsLWFkZHJlc3NcIjtcclxuaW1wb3J0IHsgSUVtYWlsVGVtcGxhdGUsIEVtYWlsVGVtcGxhdGVUeXBlIH0gZnJvbSBcIi4uL2VtYWlsLXRlbXBsYXRlLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV0aGVyZWFsRW1haWxTZXJ2aWNlIGV4dGVuZHMgRW1haWxTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZnJvbTogRW1haWxBZGRyZXNzLCBwcm90ZWN0ZWQgcmVwbHlUbzogRW1haWxBZGRyZXNzKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGZyb20sIHJlcGx5VG9cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNlbmRNYWlsKGVtYWlsVGVtcGxhdGU6IElFbWFpbFRlbXBsYXRlKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgICAgIC8vIEdlbmVyYXRlIHRlc3QgU01UUCBzZXJ2aWNlIGFjY291bnQgZnJvbSBldGhlcmVhbC5lbWFpbFxyXG4gICAgICAgIC8vIE9ubHkgbmVlZGVkIGlmIHlvdSBkb24ndCBoYXZlIGEgcmVhbCBtYWlsIGFjY291bnQgZm9yIHRlc3RpbmdcclxuICAgICAgICBjb25zdCB0ZXN0QWNjb3VudCA9IGF3YWl0IG5vZGVtYWlsZXIuY3JlYXRlVGVzdEFjY291bnQoKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIHJldXNhYmxlIHRyYW5zcG9ydGVyIG9iamVjdCB1c2luZyB0aGUgZGVmYXVsdCBTTVRQIHRyYW5zcG9ydFxyXG4gICAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgICAgICBob3N0OiBcInNtdHAuZXRoZXJlYWwuZW1haWxcIixcclxuICAgICAgICAgICAgcG9ydDogNTg3LFxyXG4gICAgICAgICAgICBzZWN1cmU6IGZhbHNlLCAvLyB0cnVlIGZvciA0NjUsIGZhbHNlIGZvciBvdGhlciBwb3J0c1xyXG4gICAgICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyOiB0ZXN0QWNjb3VudC51c2VyLCAvLyBnZW5lcmF0ZWQgZXRoZXJlYWwgdXNlclxyXG4gICAgICAgICAgICAgICAgcGFzczogdGVzdEFjY291bnQucGFzcyAvLyBnZW5lcmF0ZWQgZXRoZXJlYWwgcGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xyXG4gICAgICAgICAgICBmcm9tOiB0aGlzLmZvcm1hdEVtYWlsQXNOYW1lQW5kQWRkcmVzcyh0aGlzLmZyb20pLCAvLyBzZW5kZXIgYWRkcmVzc1xyXG4gICAgICAgICAgICB0bzogZW1haWxUZW1wbGF0ZS50by5lbWFpbCwgLy8gbGlzdCBvZiByZWNlaXZlcnNcclxuICAgICAgICAgICAgc3ViamVjdDogZW1haWxUZW1wbGF0ZS5zdWJqZWN0LCAvLyBTdWJqZWN0IGxpbmVcclxuICAgICAgICAgICAgdGV4dDogZW1haWxUZW1wbGF0ZS5nZXRUZXh0KCksIC8vIHBsYWluIHRleHQgYm9keVxyXG4gICAgICAgICAgICBodG1sOiBlbWFpbFRlbXBsYXRlLmdldEh0bWwoKSAvLyBodG1sIGJvZHlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIHNlbnQ6ICVzXCIsIGluZm8ubWVzc2FnZUlkKTtcclxuXHJcbiAgICAgICAgLy8gUHJldmlldyBvbmx5IGF2YWlsYWJsZSB3aGVuIHNlbmRpbmcgdGhyb3VnaCBhbiBFdGhlcmVhbCBhY2NvdW50XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmV2aWV3IFVSTDogJXNcIiwgbm9kZW1haWxlci5nZXRUZXN0TWVzc2FnZVVybChpbmZvKSk7XHJcbiAgICB9XHJcbn1cclxuIl19