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
exports.GmailEmailService = void 0;
const nodemailer = require("nodemailer");
const logging_1 = require("../../logging");
const email_service_1 = require("../email-service");
class GmailEmailService extends email_service_1.EmailService {
    constructor(from, replyTo) {
        super(from, replyTo);
        this.from = from;
        this.replyTo = replyTo;
    }
    sendMail(emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            const testAccount = {
                user: "codevtest7@gmail.com",
                password: "--"
            };
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                //port: 587,
                //secure: false, // upgrade later with STARTTLS
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: testAccount.user,
                    pass: testAccount.password
                }
            });
            const info = yield transporter.sendMail({
                from: this.from.email, // sender address
                to: emailTemplate.to.email, // list of receivers
                subject: emailTemplate.subject, // Subject line
                text: emailTemplate.getText(), // plain text body
                html: emailTemplate.getHtml() // html body
            });
            logging_1.Logger.info("Message sent: %s", info.messageId);
        });
    }
}
exports.GmailEmailService = GmailEmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21haWwuZW1haWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2VtYWlsL2dtYWlsL2dtYWlsLmVtYWlsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFFSCx5Q0FBeUM7QUFHekMsMkNBQXVDO0FBQ3ZDLG9EQUFnRDtBQUloRCxNQUFhLGlCQUFrQixTQUFRLDRCQUFZO0lBRS9DLFlBQXNCLElBQWtCLEVBQVksT0FBcUI7UUFDckUsS0FBSyxDQUNELElBQUksRUFBRSxPQUFPLENBQ2hCLENBQUM7UUFIZ0IsU0FBSSxHQUFKLElBQUksQ0FBYztRQUFZLFlBQU8sR0FBUCxPQUFPLENBQWM7SUFJekUsQ0FBQztJQUVLLFFBQVEsQ0FBQyxhQUE2Qjs7WUFFeEMsTUFBTSxXQUFXLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUM7WUFFRixzRUFBc0U7WUFDdEUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztnQkFDM0MsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsWUFBWTtnQkFDWiwrQ0FBK0M7Z0JBQy9DLElBQUksRUFBRSxHQUFHO2dCQUNULE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVTtnQkFDeEIsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtvQkFDdEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2lCQUM3QjthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLG9CQUFvQjtnQkFDaEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsZUFBZTtnQkFDL0MsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ2pELElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWTthQUM3QyxDQUFDLENBQUM7WUFFSCxnQkFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEQsQ0FBQztLQUFBO0NBQ0o7QUF2Q0QsOENBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgRW1haWxTZXJ2aWNlIH0gZnJvbSBcIi4uL2VtYWlsLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRW1haWxBZGRyZXNzIH0gZnJvbSBcIi4uL2VtYWlsLWFkZHJlc3NcIjtcclxuaW1wb3J0IHsgSUVtYWlsVGVtcGxhdGUsIEVtYWlsVGVtcGxhdGVUeXBlIH0gZnJvbSBcIi4uL2VtYWlsLXRlbXBsYXRlLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdtYWlsRW1haWxTZXJ2aWNlIGV4dGVuZHMgRW1haWxTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZnJvbTogRW1haWxBZGRyZXNzLCBwcm90ZWN0ZWQgcmVwbHlUbzogRW1haWxBZGRyZXNzKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGZyb20sIHJlcGx5VG9cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNlbmRNYWlsKGVtYWlsVGVtcGxhdGU6IElFbWFpbFRlbXBsYXRlKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RBY2NvdW50ID0ge1xyXG4gICAgICAgICAgICB1c2VyOiBcImNvZGV2dGVzdDdAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBcIi0tXCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgcmV1c2FibGUgdHJhbnNwb3J0ZXIgb2JqZWN0IHVzaW5nIHRoZSBkZWZhdWx0IFNNVFAgdHJhbnNwb3J0XHJcbiAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgICAgICAgIGhvc3Q6IFwic210cC5nbWFpbC5jb21cIixcclxuICAgICAgICAgICAgLy9wb3J0OiA1ODcsXHJcbiAgICAgICAgICAgIC8vc2VjdXJlOiBmYWxzZSwgLy8gdXBncmFkZSBsYXRlciB3aXRoIFNUQVJUVExTXHJcbiAgICAgICAgICAgIHBvcnQ6IDQ2NSxcclxuICAgICAgICAgICAgc2VjdXJlOiB0cnVlLCAvLyB1c2UgVExTXHJcbiAgICAgICAgICAgIGF1dGg6IHtcclxuICAgICAgICAgICAgICAgIHVzZXI6IHRlc3RBY2NvdW50LnVzZXIsXHJcbiAgICAgICAgICAgICAgICBwYXNzOiB0ZXN0QWNjb3VudC5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbCh7XHJcbiAgICAgICAgICAgIGZyb206IHRoaXMuZnJvbS5lbWFpbCwgLy8gc2VuZGVyIGFkZHJlc3NcclxuICAgICAgICAgICAgdG86IGVtYWlsVGVtcGxhdGUudG8uZW1haWwsIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXHJcbiAgICAgICAgICAgIHN1YmplY3Q6IGVtYWlsVGVtcGxhdGUuc3ViamVjdCwgLy8gU3ViamVjdCBsaW5lXHJcbiAgICAgICAgICAgIHRleHQ6IGVtYWlsVGVtcGxhdGUuZ2V0VGV4dCgpLCAvLyBwbGFpbiB0ZXh0IGJvZHlcclxuICAgICAgICAgICAgaHRtbDogZW1haWxUZW1wbGF0ZS5nZXRIdG1sKCkgLy8gaHRtbCBib2R5XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiTWVzc2FnZSBzZW50OiAlc1wiLCBpbmZvLm1lc3NhZ2VJZCk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==