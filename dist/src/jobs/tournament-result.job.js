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
exports.TournamentResultJobProcessor = void 0;
const logging_1 = require("../core/logging");
const job_processor_1 = require("../core/jobs/job-processor");
const job_enum_1 = require("./job.enum");
class TournamentResultJobProcessor extends job_processor_1.JobProcessor {
    constructor(jobDataExtractor, tournamentManagementService) {
        super(jobDataExtractor);
        this.process = (job) => __awaiter(this, void 0, void 0, function* () {
            var jobData = this.jobDataExtractor.extractDataFromJob(job);
            const unprocessedFinishedTournaments = yield this.tournamentManagementService.getFinishedTournaments(false);
            logging_1.Logger.info(`${unprocessedFinishedTournaments.length} unprocessed finished tournaments`);
            yield unprocessedFinishedTournaments.reduce((accumulatorPromise, unprocessedFinishedTournament) => {
                return accumulatorPromise.then(() => {
                    return this.processTournament(unprocessedFinishedTournament._id);
                });
            }, Promise.resolve());
        });
        this.tournamentManagementService = tournamentManagementService;
    }
    getJobName() {
        return job_enum_1.Job.TournamentResultJob;
    }
    processTournament(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tournamentManagementService.createTournamentResults(tournamentId);
            yield this.tournamentManagementService.markTournamentAsProcessed(tournamentId);
        });
    }
}
exports.TournamentResultJobProcessor = TournamentResultJobProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1yZXN1bHQuam9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pvYnMvdG91cm5hbWVudC1yZXN1bHQuam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF5QztBQUN6Qyw4REFBMEQ7QUFHMUQseUNBQWlDO0FBRWpDLE1BQWEsNEJBQTZCLFNBQVEsNEJBQVk7SUFHMUQsWUFBWSxnQkFBbUMsRUFBRSwyQkFBd0Q7UUFDckcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFhckIsWUFBTyxHQUFHLENBQU8sR0FBUSxFQUFpQixFQUFFO1lBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLDhCQUE4QixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVHLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsOEJBQThCLENBQUMsTUFBTSxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3pGLE1BQU0sOEJBQThCLENBQUMsTUFBTSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsNkJBQTZCLEVBQUUsRUFBRTtnQkFDOUYsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNoQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFBLENBQUE7UUFyQkcsSUFBSSxDQUFDLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDO0lBQ25FLENBQUM7SUFFTSxVQUFVO1FBQ2IsT0FBTyxjQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDbkMsQ0FBQztJQUVhLGlCQUFpQixDQUFDLFlBQW9COztZQUNoRCxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3RSxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQUE7Q0FZSjtBQTNCRCxvRUEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXByb2Nlc3NvclwiO1xyXG5pbXBvcnQgeyBJSm9iRGF0YUV4dHJhY3RvciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLWRhdGEtZXh0cmFjdG9yLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvdG91cm5hbWVudC1tYW5hZ2VtZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4vam9iLmVudW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50UmVzdWx0Sm9iUHJvY2Vzc29yIGV4dGVuZHMgSm9iUHJvY2Vzc29yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlOiBUb3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioam9iRGF0YUV4dHJhY3RvcjogSUpvYkRhdGFFeHRyYWN0b3IsIHRvdXJuYW1lbnRNYW5hZ2VtZW50U2VydmljZTogVG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoam9iRGF0YUV4dHJhY3Rvcik7XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UgPSB0b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEpvYk5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSm9iLlRvdXJuYW1lbnRSZXN1bHRKb2I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBwcm9jZXNzVG91cm5hbWVudCh0b3VybmFtZW50SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMudG91cm5hbWVudE1hbmFnZW1lbnRTZXJ2aWNlLmNyZWF0ZVRvdXJuYW1lbnRSZXN1bHRzKHRvdXJuYW1lbnRJZCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UubWFya1RvdXJuYW1lbnRBc1Byb2Nlc3NlZCh0b3VybmFtZW50SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcm9jZXNzID0gYXN5bmMgKGpvYjogYW55KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgICAgdmFyIGpvYkRhdGEgPSB0aGlzLmpvYkRhdGFFeHRyYWN0b3IuZXh0cmFjdERhdGFGcm9tSm9iKGpvYik7XHJcbiAgICAgICAgY29uc3QgdW5wcm9jZXNzZWRGaW5pc2hlZFRvdXJuYW1lbnRzID0gYXdhaXQgdGhpcy50b3VybmFtZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0RmluaXNoZWRUb3VybmFtZW50cyhmYWxzZSk7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYCR7dW5wcm9jZXNzZWRGaW5pc2hlZFRvdXJuYW1lbnRzLmxlbmd0aH0gdW5wcm9jZXNzZWQgZmluaXNoZWQgdG91cm5hbWVudHNgKTtcclxuICAgICAgICBhd2FpdCB1bnByb2Nlc3NlZEZpbmlzaGVkVG91cm5hbWVudHMucmVkdWNlKChhY2N1bXVsYXRvclByb21pc2UsIHVucHJvY2Vzc2VkRmluaXNoZWRUb3VybmFtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVG91cm5hbWVudCh1bnByb2Nlc3NlZEZpbmlzaGVkVG91cm5hbWVudC5faWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUoKSk7XHJcbiAgICB9XHJcbn1cclxuIl19