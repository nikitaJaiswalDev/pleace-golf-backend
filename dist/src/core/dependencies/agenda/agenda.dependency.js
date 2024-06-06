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
exports.AgendaDependency = void 0;
const dependency_1 = require("../dependency");
const logging_1 = require("../../logging");
const Agenda = require("agenda");
const Agendash = require('agendash');
class AgendaDependency extends dependency_1.Dependency {
    // Mongo host
    constructor(host, isAgendash) {
        super(host);
        this.host = host;
        this.isJobDefinitionsRegistered = false;
        this.isAgendash = isAgendash;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const options = {
                    defaultConcurrency: 5, // Takes a number which specifies the default number of a specific job that can be running at any given moment. (Default=5)
                    maxConcurrency: 20, // Takes a number which specifies the max number of jobs that can be running at any given moment. (Default=20)
                    defaultLockLimit: 0, // Takes a number which specifies the default number of a specific job that can be locked at any given moment. (Default=0 for no max)
                    lockLimit: 0, //Takes a number which specifies the max number jobs that can be locked at any given moment. (Default=0 for no max)
                    defaultLockLifetime: 600000, // Takes a number which specifies the default lock lifetime in milliseconds. (Default=600000 for 10 minutes)
                    db: {
                        address: this.host, // The MongoDB connection URL.
                        collection: "agendajobs", // The name of the MongoDB collection to use. (Default=agendaJobs)
                        options: {
                            useNewUrlParser: true,
                            useUnifiedTopology: true, // new topology engine (No longer relevant: autoReconnect, reconnectTries and reconnectInterval)
                            //autoIndex: false, // Don't automatically build indexes,
                            poolSize: 10, // The maximum size of the individual server pool. (Default: 5)
                            //Sets a cap on how many operations the driver will buffer up before giving up on getting a working connection. (Default:-1 for unlimited).
                            //bufferMaxEntries: 0 // 0: If not connected, return errors immediately rather than waiting for reconnect
                        }
                    }
                };
                try {
                    this.agenda = new Agenda(options);
                    // Job Queue Events
                    // Called just before a job starts
                    this.agenda.on("start", job => {
                        logging_1.Logger.info(`Job ${job.attrs.name} starting`);
                    });
                    // Called when a job finishes successfully
                    this.agenda.on("success", job => {
                        logging_1.Logger.info(`Job ${job.attrs.name} Successful`);
                    });
                    // Called when a job throws an error
                    this.agenda.on("fail", (err, job) => {
                        logging_1.Logger.error(`Job ${job.attrs.name} failed with error: ${err.message}`);
                        logging_1.Logger.info(job);
                    });
                    // Called when Agenda mongo connection process has thrown an error
                    this.agenda.on("error", (err) => {
                        logging_1.Logger.error(`${this.getName()} error: ${err.message}`);
                        // TODO: Test this...
                        // this.disconnected.bind(this)
                    });
                    // Called when Agenda mongo connection is successfully opened and indices created.
                    this.agenda.on("ready", () => __awaiter(this, void 0, void 0, function* () {
                        logging_1.Logger.info(`${this.getName()} ready.`);
                        // Register job definitions
                        //for (let jobProcessor of this.jobProcessors) {
                        //    this.agenda.define(jobProcessor.getJobName(), jobProcessor.process);
                        //}
                        // Starts the job queue processing
                        //await this.agenda.start();
                        logging_1.Logger.info(`${this.getName()} connected.`);
                        this.connected();
                        resolve(this.agenda);
                    }));
                }
                catch (error) {
                    logging_1.Logger.error(`${this.getName()} connection unsuccessful`);
                    this.disconnected();
                    reject(error);
                }
            }));
            //return this.agenda;
        });
    }
    registerJobDefinitions(...jobProcessors) {
        return __awaiter(this, void 0, void 0, function* () {
            // Register job definitions
            for (let jobProcessor of jobProcessors) {
                logging_1.Logger.info(`Registering job processor: ${jobProcessor.getJobName()}.`);
                this.agenda.define(jobProcessor.getJobName(), jobProcessor.process);
            }
            this.isJobDefinitionsRegistered = true;
        });
    }
    removeUndefinedBehaviourJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info(`Starting remove undefined behaviour jobs.`);
            if (this.isJobDefinitionsRegistered) {
                // Removes all jobs in the database without defined behaviors. Useful if you change a definition name and want to remove old jobs. 
                // Returns a Promise resolving to the number of removed jobs, or rejecting on error.
                const numRemoved = yield this.agenda.purge();
                logging_1.Logger.info(`Removed ${numRemoved} undefined old jobs.`);
            }
            else {
                logging_1.Logger.info(`Agenda purge not called as no job definitions have been registered. This is to prevent the job collection from being destroyed.`);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Starts the job queue processing
            logging_1.Logger.info(`Starting job queue processing.`);
            yield this.agenda.start();
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.agenda;
        });
    }
    disconnected() {
        try {
            this.connect.bind(this);
        }
        catch (error) {
            logging_1.Logger.error(error);
        }
    }
    connected() {
    }
    getName() {
        return "Agenda";
    }
    addAgendash(app) {
        // Agendash UI
        if (this.isAgendash) {
            app.use('/agendash', Agendash(this.agenda));
        }
    }
}
exports.AgendaDependency = AgendaDependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbmRhLmRlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9kZXBlbmRlbmNpZXMvYWdlbmRhL2FnZW5kYS5kZXBlbmRlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7O0FBRUgsOENBQTJDO0FBQzNDLDJDQUF1QztBQUN2QyxpQ0FBa0M7QUFDbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBSXJDLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQWtCO0lBTXBELGFBQWE7SUFDYixZQUFzQixJQUFZLEVBQUUsVUFBbUI7UUFDbkQsS0FBSyxDQUNELElBQUksQ0FDUCxDQUFDO1FBSGdCLFNBQUksR0FBSixJQUFJLENBQVE7UUFIMUIsK0JBQTBCLEdBQVksS0FBSyxDQUFDO1FBT2hELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFWSxPQUFPOztZQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN6QyxNQUFNLE9BQU8sR0FBRztvQkFDWixrQkFBa0IsRUFBRSxDQUFDLEVBQUUsMkhBQTJIO29CQUNsSixjQUFjLEVBQUUsRUFBRSxFQUFFLDhHQUE4RztvQkFDbEksZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLHFJQUFxSTtvQkFDMUosU0FBUyxFQUFFLENBQUMsRUFBRSxtSEFBbUg7b0JBQ2pJLG1CQUFtQixFQUFFLE1BQU0sRUFBRSw0R0FBNEc7b0JBQ3pJLEVBQUUsRUFBRTt3QkFDQSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSw4QkFBOEI7d0JBQ2xELFVBQVUsRUFBRSxZQUFZLEVBQUUsa0VBQWtFO3dCQUM1RixPQUFPLEVBQUU7NEJBQ0wsZUFBZSxFQUFFLElBQUk7NEJBQ3JCLGtCQUFrQixFQUFFLElBQUksRUFBRSxnR0FBZ0c7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QixjQUFjO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDTCxDQUFDO0NBRUo7QUE5SUQsNENBOElDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vZGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vbG9nZ2luZ1wiO1xyXG5pbXBvcnQgQWdlbmRhID0gcmVxdWlyZShcImFnZW5kYVwiKTtcclxuY29uc3QgQWdlbmRhc2ggPSByZXF1aXJlKCdhZ2VuZGFzaCcpO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IEpvYlByb2Nlc3NvciB9IGZyb20gXCIuLi8uLi9qb2JzL2pvYi1wcm9jZXNzb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBZ2VuZGFEZXBlbmRlbmN5IGV4dGVuZHMgRGVwZW5kZW5jeTxBZ2VuZGE+IHtcclxuXHJcbiAgICBwcml2YXRlIGFnZW5kYTogQWdlbmRhO1xyXG4gICAgcHJpdmF0ZSBpc0FnZW5kYXNoOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpc0pvYkRlZmluaXRpb25zUmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIE1vbmdvIGhvc3RcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBob3N0OiBzdHJpbmcsIGlzQWdlbmRhc2g6IGJvb2xlYW4sICkge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBob3N0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmlzQWdlbmRhc2ggPSBpc0FnZW5kYXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8QWdlbmRhPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRDb25jdXJyZW5jeTogNSwgLy8gVGFrZXMgYSBudW1iZXIgd2hpY2ggc3BlY2lmaWVzIHRoZSBkZWZhdWx0IG51bWJlciBvZiBhIHNwZWNpZmljIGpvYiB0aGF0IGNhbiBiZSBydW5uaW5nIGF0IGFueSBnaXZlbiBtb21lbnQuIChEZWZhdWx0PTUpXHJcbiAgICAgICAgICAgICAgICBtYXhDb25jdXJyZW5jeTogMjAsIC8vIFRha2VzIGEgbnVtYmVyIHdoaWNoIHNwZWNpZmllcyB0aGUgbWF4IG51bWJlciBvZiBqb2JzIHRoYXQgY2FuIGJlIHJ1bm5pbmcgYXQgYW55IGdpdmVuIG1vbWVudC4gKERlZmF1bHQ9MjApXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0TG9ja0xpbWl0OiAwLCAvLyBUYWtlcyBhIG51bWJlciB3aGljaCBzcGVjaWZpZXMgdGhlIGRlZmF1bHQgbnVtYmVyIG9mIGEgc3BlY2lmaWMgam9iIHRoYXQgY2FuIGJlIGxvY2tlZCBhdCBhbnkgZ2l2ZW4gbW9tZW50LiAoRGVmYXVsdD0wIGZvciBubyBtYXgpXHJcbiAgICAgICAgICAgICAgICBsb2NrTGltaXQ6IDAsIC8vVGFrZXMgYSBudW1iZXIgd2hpY2ggc3BlY2lmaWVzIHRoZSBtYXggbnVtYmVyIGpvYnMgdGhhdCBjYW4gYmUgbG9ja2VkIGF0IGFueSBnaXZlbiBtb21lbnQuIChEZWZhdWx0PTAgZm9yIG5vIG1heClcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRMb2NrTGlmZXRpbWU6IDYwMDAwMCwgLy8gVGFrZXMgYSBudW1iZXIgd2hpY2ggc3BlY2lmaWVzIHRoZSBkZWZhdWx0IGxvY2sgbGlmZXRpbWUgaW4gbWlsbGlzZWNvbmRzLiAoRGVmYXVsdD02MDAwMDAgZm9yIDEwIG1pbnV0ZXMpXHJcbiAgICAgICAgICAgICAgICBkYjogeyAvLyBTcGVjaWZpZXMgdGhhdCBBZ2VuZGEgc2hvdWxkIGNvbm5lY3QgdG8gTW9uZ29EQi5cclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmhvc3QsIC8vIFRoZSBNb25nb0RCIGNvbm5lY3Rpb24gVVJMLlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IFwiYWdlbmRham9ic1wiLCAvLyBUaGUgbmFtZSBvZiB0aGUgTW9uZ29EQiBjb2xsZWN0aW9uIHRvIHVzZS4gKERlZmF1bHQ9YWdlbmRhSm9icylcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7IC8vIENvbm5lY3Rpb24gb3B0aW9ucyB0byBwYXNzIHRvIE1vbmdvREIuIChPcHRpb25zOiBodHRwOi8vbW9uZ29kYi5naXRodWIuaW8vbm9kZS1tb25nb2RiLW5hdGl2ZS8yLjIvYXBpL01vbmdvQ2xpZW50Lmh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLCAvLyBuZXcgdG9wb2xvZ3kgZW5naW5lIChObyBsb25nZXIgcmVsZXZhbnQ6IGF1dG9SZWNvbm5lY3QsIHJlY29ubmVjdFRyaWVzIGFuZCByZWNvbm5lY3RJbnRlcnZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXRvSW5kZXg6IGZhbHNlLCAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGJ1aWxkIGluZGV4ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvb2xTaXplOiAxMCwgLy8gVGhlIG1heGltdW0gc2l6ZSBvZiB0aGUgaW5kaXZpZHVhbCBzZXJ2ZXIgcG9vbC4gKERlZmF1bHQ6IDUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0cyBhIGNhcCBvbiBob3cgbWFueSBvcGVyYXRpb25zIHRoZSBkcml2ZXIgd2lsbCBidWZmZXIgdXAgYmVmb3JlIGdpdmluZyB1cCBvbiBnZXR0aW5nIGEgd29ya2luZyBjb25uZWN0aW9uLiAoRGVmYXVsdDotMSBmb3IgdW5saW1pdGVkKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9idWZmZXJNYXhFbnRyaWVzOiAwIC8vIDA6IElmIG5vdCBjb25uZWN0ZWQsIHJldHVybiBlcnJvcnMgaW1tZWRpYXRlbHkgcmF0aGVyIHRoYW4gd2FpdGluZyBmb3IgcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWdlbmRhID0gbmV3IEFnZW5kYShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBKb2IgUXVldWUgRXZlbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsZWQganVzdCBiZWZvcmUgYSBqb2Igc3RhcnRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYS5vbihcInN0YXJ0XCIsIGpvYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmluZm8oYEpvYiAke2pvYi5hdHRycy5uYW1lfSBzdGFydGluZ2ApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsZWQgd2hlbiBhIGpvYiBmaW5pc2hlcyBzdWNjZXNzZnVsbHlcclxuICAgICAgICAgICAgICAgIHRoaXMuYWdlbmRhLm9uKFwic3VjY2Vzc1wiLCBqb2IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5pbmZvKGBKb2IgJHtqb2IuYXR0cnMubmFtZX0gU3VjY2Vzc2Z1bGApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsZWQgd2hlbiBhIGpvYiB0aHJvd3MgYW4gZXJyb3JcclxuICAgICAgICAgICAgICAgIHRoaXMuYWdlbmRhLm9uKFwiZmFpbFwiLCAoZXJyLCBqb2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoYEpvYiAke2pvYi5hdHRycy5uYW1lfSBmYWlsZWQgd2l0aCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhqb2IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbGVkIHdoZW4gQWdlbmRhIG1vbmdvIGNvbm5lY3Rpb24gcHJvY2VzcyBoYXMgdGhyb3duIGFuIGVycm9yXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYS5vbihcImVycm9yXCIsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoYCR7dGhpcy5nZXROYW1lKCl9IGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBUZXN0IHRoaXMuLi5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsZWQgd2hlbiBBZ2VuZGEgbW9uZ28gY29ubmVjdGlvbiBpcyBzdWNjZXNzZnVsbHkgb3BlbmVkIGFuZCBpbmRpY2VzIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFnZW5kYS5vbihcInJlYWR5XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhgJHt0aGlzLmdldE5hbWUoKX0gcmVhZHkuYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgam9iIGRlZmluaXRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3IgKGxldCBqb2JQcm9jZXNzb3Igb2YgdGhpcy5qb2JQcm9jZXNzb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5hZ2VuZGEuZGVmaW5lKGpvYlByb2Nlc3Nvci5nZXRKb2JOYW1lKCksIGpvYlByb2Nlc3Nvci5wcm9jZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnRzIHRoZSBqb2IgcXVldWUgcHJvY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYXdhaXQgdGhpcy5hZ2VuZGEuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmluZm8oYCR7dGhpcy5nZXROYW1lKCl9IGNvbm5lY3RlZC5gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYWdlbmRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihgJHt0aGlzLmdldE5hbWUoKX0gY29ubmVjdGlvbiB1bnN1Y2Nlc3NmdWxgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5hZ2VuZGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVySm9iRGVmaW5pdGlvbnMoLi4uam9iUHJvY2Vzc29yczogSm9iUHJvY2Vzc29yW10pIHtcclxuICAgICAgICAvLyBSZWdpc3RlciBqb2IgZGVmaW5pdGlvbnNcclxuICAgICAgICBmb3IgKGxldCBqb2JQcm9jZXNzb3Igb2Ygam9iUHJvY2Vzc29ycykge1xyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhgUmVnaXN0ZXJpbmcgam9iIHByb2Nlc3NvcjogJHtqb2JQcm9jZXNzb3IuZ2V0Sm9iTmFtZSgpfS5gKTtcclxuICAgICAgICAgICAgdGhpcy5hZ2VuZGEuZGVmaW5lKGpvYlByb2Nlc3Nvci5nZXRKb2JOYW1lKCksIGpvYlByb2Nlc3Nvci5wcm9jZXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0pvYkRlZmluaXRpb25zUmVnaXN0ZXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlbW92ZVVuZGVmaW5lZEJlaGF2aW91ckpvYnMoKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIExvZ2dlci5pbmZvKGBTdGFydGluZyByZW1vdmUgdW5kZWZpbmVkIGJlaGF2aW91ciBqb2JzLmApO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSm9iRGVmaW5pdGlvbnNSZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZXMgYWxsIGpvYnMgaW4gdGhlIGRhdGFiYXNlIHdpdGhvdXQgZGVmaW5lZCBiZWhhdmlvcnMuIFVzZWZ1bCBpZiB5b3UgY2hhbmdlIGEgZGVmaW5pdGlvbiBuYW1lIGFuZCB3YW50IHRvIHJlbW92ZSBvbGQgam9icy4gXHJcbiAgICAgICAgICAgIC8vIFJldHVybnMgYSBQcm9taXNlIHJlc29sdmluZyB0byB0aGUgbnVtYmVyIG9mIHJlbW92ZWQgam9icywgb3IgcmVqZWN0aW5nIG9uIGVycm9yLlxyXG4gICAgICAgICAgICBjb25zdCBudW1SZW1vdmVkID0gYXdhaXQgdGhpcy5hZ2VuZGEucHVyZ2UoKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmluZm8oYFJlbW92ZWQgJHtudW1SZW1vdmVkfSB1bmRlZmluZWQgb2xkIGpvYnMuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhgQWdlbmRhIHB1cmdlIG5vdCBjYWxsZWQgYXMgbm8gam9iIGRlZmluaXRpb25zIGhhdmUgYmVlbiByZWdpc3RlcmVkLiBUaGlzIGlzIHRvIHByZXZlbnQgdGhlIGpvYiBjb2xsZWN0aW9uIGZyb20gYmVpbmcgZGVzdHJveWVkLmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc3RhcnQoKSA6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFN0YXJ0cyB0aGUgam9iIHF1ZXVlIHByb2Nlc3NpbmdcclxuICAgICAgICBMb2dnZXIuaW5mbyhgU3RhcnRpbmcgam9iIHF1ZXVlIHByb2Nlc3NpbmcuYCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZ2VuZGEuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q2xpZW50KCk6IFByb21pc2U8QWdlbmRhPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdlbmRhO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3QuYmluZCh0aGlzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0ZWQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gXCJBZ2VuZGFcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQWdlbmRhc2goYXBwOiBBcHBsaWNhdGlvbikge1xyXG4gICAgICAgIC8vIEFnZW5kYXNoIFVJXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBZ2VuZGFzaCkge1xyXG4gICAgICAgICAgICBhcHAudXNlKCcvYWdlbmRhc2gnLCBBZ2VuZGFzaCh0aGlzLmFnZW5kYSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19