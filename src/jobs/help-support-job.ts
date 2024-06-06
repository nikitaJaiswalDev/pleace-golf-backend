import { Logger } from "../core/logging";
import { JobProcessor } from "../core/jobs/job-processor";
import { IJobDataExtractor } from "../core/jobs/job-data-extractor.interface";
import { Job } from "./job.enum";
import { EmailService } from "../core/email/email-service";
import { EmailTemplateFactory } from "../email/email-template-factory";
import config from '../config';

export class HelpSupportJobProcessor extends JobProcessor {
    private readonly emailService: EmailService;

    constructor(jobDataExtractor: IJobDataExtractor, emailService: EmailService) {
        super(jobDataExtractor);
        this.emailService = emailService;
    }

    public getJobName(): string{
        return Job.helpSupportJob;
    }

    public process = async (job: any): Promise<void> => {
        var jobData = this.jobDataExtractor.extractDataFromJob(job);
        //console.log('jobData',jobData);
        const helpForm = jobData;
        const emailTemplate = EmailTemplateFactory.createHelpSupportTemplete(helpForm,config.email.adminEmail.name, config.email.adminEmail.email);
        await this.emailService.sendMail(emailTemplate,Job.helpSupportJob);
    }

    
}
