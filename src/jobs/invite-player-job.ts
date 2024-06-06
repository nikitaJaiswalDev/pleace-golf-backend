import { Logger } from "../core/logging";
import { JobProcessor } from "../core/jobs/job-processor";
import { IJobDataExtractor } from "../core/jobs/job-data-extractor.interface";
import { Job } from "./job.enum";
import { IUser } from "../interfaces/user.interface";
import { EmailService } from "../core/email/email-service";
import { EmailTemplateFactory } from "../email/email-template-factory";
import config from '../config';

export class InvitePlayerJobProcessor extends JobProcessor {
    private readonly emailService: EmailService;

    constructor(jobDataExtractor: IJobDataExtractor, emailService: EmailService) {
        super(jobDataExtractor);
        this.emailService = emailService;
    }

    public getJobName(): string{
        return Job.InvitePlayerJob;
    }

    public process = async (job: any): Promise<void> => {
        var jobData = this.jobDataExtractor.extractDataFromJob(job);
        const inviteeForm:any = jobData.user;
        const emailTemplate = EmailTemplateFactory.createInvitePlayerTemplate(inviteeForm.firstName,inviteeForm.email, inviteeForm);
        await this.emailService.sendMail(emailTemplate,Job.InvitePlayerJob);
    }
}
