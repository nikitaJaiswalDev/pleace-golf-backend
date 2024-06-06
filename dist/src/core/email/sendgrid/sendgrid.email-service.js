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
exports.SendgridEmailService = void 0;
const sendgridMailer = require("@sendgrid/mail");
const email_service_1 = require("../email-service");
const email_template_interface_1 = require("../email-template.interface");
class SendgridEmailService extends email_service_1.EmailService {
    constructor(sendgridApiKey, from, replyTo) {
        super(from, replyTo);
        this.sendgridApiKey = sendgridApiKey;
        this.from = from;
        this.replyTo = replyTo;
        sendgridMailer.setApiKey(sendgridApiKey);
    }
    sendMail(emailTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            // Email address fields (to, from, cc, bcc, replyTo)
            // https://github.com/sendgrid/sendgrid-nodejs/blob/master/docs/use-cases/flexible-address-fields.md
            /*to: {
                name: 'Some One',
                email: 'someone@example.org',
            },*/
            const email = {
                from: this.from,
                replyTo: this.replyTo,
                templateId: emailTemplate.templateId,
                personalizations: [
                    {
                        subject: emailTemplate.subject,
                        to: emailTemplate.to,
                        dynamicTemplateData: emailTemplate.templateData,
                        // Values that are specific to this personalization that will be carried along with the email and its activity data. 
                        customArgs: {
                            myArg: 'Recipient 1',
                        },
                    },
                ],
                // An array of category names for this message. Each category name may not exceed 255 characters. Max 10.
                categories: ['Transactional', 'My category'],
            };
            switch (emailTemplate.templateType) {
                case email_template_interface_1.EmailTemplateType.TEMPLATE_ID:
                    email.templateId = emailTemplate.templateId;
                    break;
                case email_template_interface_1.EmailTemplateType.TEXT:
                    email.text = emailTemplate.getText();
                    break;
                case email_template_interface_1.EmailTemplateType.HTML:
                    email.html = emailTemplate.getHtml();
                    break;
                case email_template_interface_1.EmailTemplateType.TEXT_AND_HTML:
                    email.text = emailTemplate.getText();
                    email.html = emailTemplate.getHtml();
                    break;
            }
            const msg = {
                to: 'test@example.com',
                from: 'test@example.com',
                replyTo: 'othersender@example.org',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                templateId: 'd-12345678901234567890123456789012',
                dynamicTemplateData: {
                    name: 'Some One',
                    id: '123',
                },
                categories: ['Transactional', 'My category'],
                customArgs: {
                    myCustomArg: 'some string', // must be a string
                },
            };
            //to: ['recipient1@example.org', 'recipient2@example.org'],
            // The to field can contain an array of recipients, which will send a single email with all of the recipients in the to field. 
            // The recipients will be able to see each other
            // If you want to send multiple individual emails to multiple recipient where they don't see each other's email addresses
            // sgMail.sendMultiple(msg);
            try {
                yield sendgridMailer.send(email);
            }
            catch (error) {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
            }
        });
    }
}
exports.SendgridEmailService = SendgridEmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGdyaWQuZW1haWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2VtYWlsL3NlbmRncmlkL3NlbmRncmlkLmVtYWlsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFFSCxpREFBaUQ7QUFFakQsb0RBQWdEO0FBRWhELDBFQUFnRjtBQUdoRixNQUFhLG9CQUFxQixTQUFRLDRCQUFZO0lBRWxELFlBQXNCLGNBQXNCLEVBQVksSUFBa0IsRUFBWSxPQUFxQjtRQUN2RyxLQUFLLENBQ0QsSUFBSSxFQUFFLE9BQU8sQ0FDaEIsQ0FBQztRQUhnQixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUFZLFNBQUksR0FBSixJQUFJLENBQWM7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBS3ZHLGNBQWMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVLLFFBQVEsQ0FBQyxhQUE2Qjs7WUFFeEMsb0RBQW9EO1lBQ3BELG9HQUFvRztZQUVwRzs7O2dCQUdJO1lBQ0osTUFBTSxLQUFLLEdBQWU7Z0JBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLFVBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtnQkFDcEMsZ0JBQWdCLEVBQUU7b0JBQ2Q7d0JBQ0ksT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO3dCQUM5QixFQUFFLEVBQUUsYUFBYSxDQUFDLEVBQUU7d0JBQ3BCLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxZQUFZO3dCQUMvQyxxSEFBcUg7d0JBQ3JILFVBQVUsRUFBRTs0QkFDUixLQUFLLEVBQUUsYUFBYTt5QkFDdkI7cUJBQ0o7aUJBQ0o7Z0JBQ0QseUdBQXlHO2dCQUN6RyxVQUFVLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDO2FBQy9DLENBQUM7WUFFRixRQUFRLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDakMsS0FBSyw0Q0FBaUIsQ0FBQyxXQUFXO29CQUM5QixLQUFLLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyw0Q0FBaUIsQ0FBQyxJQUFJO29CQUN2QixLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckMsTUFBTTtnQkFDVixLQUFLLDRDQUFpQixDQUFDLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQyxNQUFNO2dCQUNWLEtBQUssNENBQWlCLENBQUMsYUFBYTtvQkFDaEMsS0FBSyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JDLEtBQUssQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQyxNQUFNO1lBQ2QsQ0FBQztZQUVELE1BQU0sR0FBRyxHQUFHO2dCQUNSLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSxxQ0FBcUM7Z0JBQzlDLElBQUksRUFBRSw0Q0FBNEM7Z0JBQ2xELElBQUksRUFBRSw2REFBNkQ7Z0JBQ25FLFVBQVUsRUFBRSxvQ0FBb0M7Z0JBQ2hELG1CQUFtQixFQUFFO29CQUNqQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsRUFBRSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQztnQkFFNUMsVUFBVSxFQUFFO29CQUNSLFdBQVcsRUFBRSxhQUFhLEVBQUUsbUJBQW1CO2lCQUNsRDthQUNKLENBQUM7WUFHRiwyREFBMkQ7WUFDM0QsK0hBQStIO1lBQy9ILGdEQUFnRDtZQUVoRCx5SEFBeUg7WUFDekgsNEJBQTRCO1lBRTVCLElBQUksQ0FBQztnQkFDRCxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQU0sS0FBSyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdEMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQTNGRCxvREEyRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIwIENvZGV2IFRlY2hub2xvZ2llcyAoUHR5KSBMdGQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgc2VuZGdyaWRNYWlsZXIgZnJvbSBcIkBzZW5kZ3JpZC9tYWlsXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEVtYWlsU2VydmljZSB9IGZyb20gXCIuLi9lbWFpbC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEVtYWlsQWRkcmVzcyB9IGZyb20gXCIuLi9lbWFpbC1hZGRyZXNzXCI7XHJcbmltcG9ydCB7IElFbWFpbFRlbXBsYXRlLCBFbWFpbFRlbXBsYXRlVHlwZSB9IGZyb20gXCIuLi9lbWFpbC10ZW1wbGF0ZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRW1haWxEYXRhIH0gZnJvbSBcIi4vc2VuZGdyaWQtZW1haWwtZGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbmRncmlkRW1haWxTZXJ2aWNlIGV4dGVuZHMgRW1haWxTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VuZGdyaWRBcGlLZXk6IHN0cmluZywgcHJvdGVjdGVkIGZyb206IEVtYWlsQWRkcmVzcywgcHJvdGVjdGVkIHJlcGx5VG86IEVtYWlsQWRkcmVzcykge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBmcm9tLCByZXBseVRvXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgc2VuZGdyaWRNYWlsZXIuc2V0QXBpS2V5KHNlbmRncmlkQXBpS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzZW5kTWFpbChlbWFpbFRlbXBsYXRlOiBJRW1haWxUZW1wbGF0ZSk6IFByb21pc2U8dm9pZD4ge1xyXG5cclxuICAgICAgICAvLyBFbWFpbCBhZGRyZXNzIGZpZWxkcyAodG8sIGZyb20sIGNjLCBiY2MsIHJlcGx5VG8pXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlbmRncmlkL3NlbmRncmlkLW5vZGVqcy9ibG9iL21hc3Rlci9kb2NzL3VzZS1jYXNlcy9mbGV4aWJsZS1hZGRyZXNzLWZpZWxkcy5tZFxyXG5cclxuICAgICAgICAvKnRvOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdTb21lIE9uZScsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnc29tZW9uZUBleGFtcGxlLm9yZycsXHJcbiAgICAgICAgfSwqL1xyXG4gICAgICAgIGNvbnN0IGVtYWlsOiBFbWFpbERhdGEgID0ge1xyXG4gICAgICAgICAgICBmcm9tOiB0aGlzLmZyb20sXHJcbiAgICAgICAgICAgIHJlcGx5VG86IHRoaXMucmVwbHlUbyxcclxuICAgICAgICAgICAgdGVtcGxhdGVJZDogZW1haWxUZW1wbGF0ZS50ZW1wbGF0ZUlkLFxyXG4gICAgICAgICAgICBwZXJzb25hbGl6YXRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogZW1haWxUZW1wbGF0ZS5zdWJqZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiBlbWFpbFRlbXBsYXRlLnRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNUZW1wbGF0ZURhdGE6IGVtYWlsVGVtcGxhdGUudGVtcGxhdGVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbHVlcyB0aGF0IGFyZSBzcGVjaWZpYyB0byB0aGlzIHBlcnNvbmFsaXphdGlvbiB0aGF0IHdpbGwgYmUgY2FycmllZCBhbG9uZyB3aXRoIHRoZSBlbWFpbCBhbmQgaXRzIGFjdGl2aXR5IGRhdGEuIFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUFyZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlBcmc6ICdSZWNpcGllbnQgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIC8vIEFuIGFycmF5IG9mIGNhdGVnb3J5IG5hbWVzIGZvciB0aGlzIG1lc3NhZ2UuIEVhY2ggY2F0ZWdvcnkgbmFtZSBtYXkgbm90IGV4Y2VlZCAyNTUgY2hhcmFjdGVycy4gTWF4IDEwLlxyXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBbJ1RyYW5zYWN0aW9uYWwnLCAnTXkgY2F0ZWdvcnknXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGVtYWlsVGVtcGxhdGUudGVtcGxhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRW1haWxUZW1wbGF0ZVR5cGUuVEVNUExBVEVfSUQ6XHJcbiAgICAgICAgICAgICAgICBlbWFpbC50ZW1wbGF0ZUlkID0gZW1haWxUZW1wbGF0ZS50ZW1wbGF0ZUlkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW1haWxUZW1wbGF0ZVR5cGUuVEVYVDpcclxuICAgICAgICAgICAgICAgIGVtYWlsLnRleHQgPSBlbWFpbFRlbXBsYXRlLmdldFRleHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVtYWlsVGVtcGxhdGVUeXBlLkhUTUw6XHJcbiAgICAgICAgICAgICAgICBlbWFpbC5odG1sID0gZW1haWxUZW1wbGF0ZS5nZXRIdG1sKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbWFpbFRlbXBsYXRlVHlwZS5URVhUX0FORF9IVE1MOlxyXG4gICAgICAgICAgICAgICAgZW1haWwudGV4dCA9IGVtYWlsVGVtcGxhdGUuZ2V0VGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZW1haWwuaHRtbCA9IGVtYWlsVGVtcGxhdGUuZ2V0SHRtbCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgICAgICAgIHRvOiAndGVzdEBleGFtcGxlLmNvbScsXHJcbiAgICAgICAgICAgIGZyb206ICd0ZXN0QGV4YW1wbGUuY29tJyxcclxuICAgICAgICAgICAgcmVwbHlUbzogJ290aGVyc2VuZGVyQGV4YW1wbGUub3JnJyxcclxuICAgICAgICAgICAgc3ViamVjdDogJ1NlbmRpbmcgd2l0aCBUd2lsaW8gU2VuZEdyaWQgaXMgRnVuJyxcclxuICAgICAgICAgICAgdGV4dDogJ2FuZCBlYXN5IHRvIGRvIGFueXdoZXJlLCBldmVuIHdpdGggTm9kZS5qcycsXHJcbiAgICAgICAgICAgIGh0bWw6ICc8c3Ryb25nPmFuZCBlYXN5IHRvIGRvIGFueXdoZXJlLCBldmVuIHdpdGggTm9kZS5qczwvc3Ryb25nPicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlSWQ6ICdkLTEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyJyxcclxuICAgICAgICAgICAgZHluYW1pY1RlbXBsYXRlRGF0YToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgT25lJyxcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2F0ZWdvcmllczogWydUcmFuc2FjdGlvbmFsJywgJ015IGNhdGVnb3J5J10sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjdXN0b21BcmdzOiB7XHJcbiAgICAgICAgICAgICAgICBteUN1c3RvbUFyZzogJ3NvbWUgc3RyaW5nJywgLy8gbXVzdCBiZSBhIHN0cmluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL3RvOiBbJ3JlY2lwaWVudDFAZXhhbXBsZS5vcmcnLCAncmVjaXBpZW50MkBleGFtcGxlLm9yZyddLFxyXG4gICAgICAgIC8vIFRoZSB0byBmaWVsZCBjYW4gY29udGFpbiBhbiBhcnJheSBvZiByZWNpcGllbnRzLCB3aGljaCB3aWxsIHNlbmQgYSBzaW5nbGUgZW1haWwgd2l0aCBhbGwgb2YgdGhlIHJlY2lwaWVudHMgaW4gdGhlIHRvIGZpZWxkLiBcclxuICAgICAgICAvLyBUaGUgcmVjaXBpZW50cyB3aWxsIGJlIGFibGUgdG8gc2VlIGVhY2ggb3RoZXJcclxuXHJcbiAgICAgICAgLy8gSWYgeW91IHdhbnQgdG8gc2VuZCBtdWx0aXBsZSBpbmRpdmlkdWFsIGVtYWlscyB0byBtdWx0aXBsZSByZWNpcGllbnQgd2hlcmUgdGhleSBkb24ndCBzZWUgZWFjaCBvdGhlcidzIGVtYWlsIGFkZHJlc3Nlc1xyXG4gICAgICAgIC8vIHNnTWFpbC5zZW5kTXVsdGlwbGUobXNnKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc2VuZGdyaWRNYWlsZXIuc2VuZCg8YW55PmVtYWlsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5yZXNwb25zZS5ib2R5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==