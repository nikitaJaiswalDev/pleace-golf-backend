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
const server_1 = require("./server");
const config_1 = require("./config");
const dependencies_1 = require("./core/dependencies");
const agenda_dependency_1 = require("./core/dependencies/agenda/agenda.dependency");
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDBDependency = new dependencies_1.MongoDBDependency(config_1.default.mongoDbUri);
    //const agendaJobDataExtractor = new AgendaJobDataExtractor();
    //const userEmailVerificationJob = new UserEmailVerificationJobProcessor(agendaJobDataExtractor);
    //const tournamentResultJob = new TournamentResultJobProcessor(agendaJobDataExtractor);
    const agendaDependency = new agenda_dependency_1.AgendaDependency(config_1.default.mongoDbUri, true);
    //const agendaDependency = new AgendaDependency(config.mongoDbUri, true, userEmailVerificationJob, tournamentResultJob);
    const dependencyBootstrapper = new dependencies_1.DependencyBootstrapper(mongoDBDependency, agendaDependency);
    yield dependencyBootstrapper.bootstrap();
    //const agenda = await agendaDependency.getClient();
    //const agendaJobScheduler = new AgendaJobScheduler(agenda);
    //await agendaJobScheduler.now("UserEmailVerificationJob");
    const server = new server_1.Server(agendaDependency);
    yield server.init();
    server.start();
});
runServer();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0M7QUFDbEMscUNBQThCO0FBQzlCLHNEQUFnRjtBQUNoRixvRkFBZ0Y7QUFHaEYsTUFBTSxTQUFTLEdBQUcsR0FBUyxFQUFFO0lBRXpCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxnQ0FBaUIsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRW5FLDhEQUE4RDtJQUM5RCxpR0FBaUc7SUFDakcsdUZBQXVGO0lBQ3ZGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxvQ0FBZ0IsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSx3SEFBd0g7SUFFeEgsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLHFDQUFzQixDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDL0YsTUFBTSxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QyxvREFBb0Q7SUFDcEQsNERBQTREO0lBQzVELDJEQUEyRDtJQUUzRCxNQUFNLE1BQU0sR0FBVyxJQUFJLGVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUEsQ0FBQztBQUVGLFNBQVMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIi4vc2VydmVyXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgeyBNb25nb0RCRGVwZW5kZW5jeSwgRGVwZW5kZW5jeUJvb3RzdHJhcHBlciB9IGZyb20gXCIuL2NvcmUvZGVwZW5kZW5jaWVzXCI7XHJcbmltcG9ydCB7IEFnZW5kYURlcGVuZGVuY3kgfSBmcm9tIFwiLi9jb3JlL2RlcGVuZGVuY2llcy9hZ2VuZGEvYWdlbmRhLmRlcGVuZGVuY3lcIjtcclxuXHJcblxyXG5jb25zdCBydW5TZXJ2ZXIgPSBhc3luYyAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgbW9uZ29EQkRlcGVuZGVuY3kgPSBuZXcgTW9uZ29EQkRlcGVuZGVuY3koY29uZmlnLm1vbmdvRGJVcmkpO1xyXG5cclxuICAgIC8vY29uc3QgYWdlbmRhSm9iRGF0YUV4dHJhY3RvciA9IG5ldyBBZ2VuZGFKb2JEYXRhRXh0cmFjdG9yKCk7XHJcbiAgICAvL2NvbnN0IHVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYiA9IG5ldyBVc2VyRW1haWxWZXJpZmljYXRpb25Kb2JQcm9jZXNzb3IoYWdlbmRhSm9iRGF0YUV4dHJhY3Rvcik7XHJcbiAgICAvL2NvbnN0IHRvdXJuYW1lbnRSZXN1bHRKb2IgPSBuZXcgVG91cm5hbWVudFJlc3VsdEpvYlByb2Nlc3NvcihhZ2VuZGFKb2JEYXRhRXh0cmFjdG9yKTtcclxuICAgIGNvbnN0IGFnZW5kYURlcGVuZGVuY3kgPSBuZXcgQWdlbmRhRGVwZW5kZW5jeShjb25maWcubW9uZ29EYlVyaSwgdHJ1ZSk7XHJcbiAgICAvL2NvbnN0IGFnZW5kYURlcGVuZGVuY3kgPSBuZXcgQWdlbmRhRGVwZW5kZW5jeShjb25maWcubW9uZ29EYlVyaSwgdHJ1ZSwgdXNlckVtYWlsVmVyaWZpY2F0aW9uSm9iLCB0b3VybmFtZW50UmVzdWx0Sm9iKTtcclxuXHJcbiAgICBjb25zdCBkZXBlbmRlbmN5Qm9vdHN0cmFwcGVyID0gbmV3IERlcGVuZGVuY3lCb290c3RyYXBwZXIobW9uZ29EQkRlcGVuZGVuY3ksIGFnZW5kYURlcGVuZGVuY3kpO1xyXG4gICAgYXdhaXQgZGVwZW5kZW5jeUJvb3RzdHJhcHBlci5ib290c3RyYXAoKTtcclxuICAgIFxyXG4gICAgLy9jb25zdCBhZ2VuZGEgPSBhd2FpdCBhZ2VuZGFEZXBlbmRlbmN5LmdldENsaWVudCgpO1xyXG4gICAgLy9jb25zdCBhZ2VuZGFKb2JTY2hlZHVsZXIgPSBuZXcgQWdlbmRhSm9iU2NoZWR1bGVyKGFnZW5kYSk7XHJcbiAgICAvL2F3YWl0IGFnZW5kYUpvYlNjaGVkdWxlci5ub3coXCJVc2VyRW1haWxWZXJpZmljYXRpb25Kb2JcIik7XHJcblxyXG4gICAgY29uc3Qgc2VydmVyOiBTZXJ2ZXIgPSBuZXcgU2VydmVyKGFnZW5kYURlcGVuZGVuY3kpO1xyXG4gICAgYXdhaXQgc2VydmVyLmluaXQoKTtcclxuICAgIHNlcnZlci5zdGFydCgpO1xyXG59O1xyXG5cclxucnVuU2VydmVyKCk7XHJcbiJdfQ==