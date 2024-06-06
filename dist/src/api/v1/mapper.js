"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
const _ = require("lodash");
class Mapper {
    static mapUserToUserProfile(user) {
        return {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            nationality: user.nationality,
            countryOfResidence: user.countryOfResidence,
            state: user.state,
            handicapIndex: user.handicapIndex,
            homeClub: user.homeClub,
            gender: user.gender,
            accountStatus: user.status,
            division: user.division,
            isAdmin: user.isAdmin,
            publicProfiles: user.publicProfiles,
            imageData: user.imageData,
            profession: user.profession,
            homePage: user.homePage,
            otherLinks: user.otherLinks,
            shortUpdate: user.shortUpdate,
            biography: user.biography,
            ownCharityLink: user.ownCharityLink,
            supportCharities: user.supportCharities,
            videoMsgLink: user.videoMsgLink,
            sponsorsLink: user.sponsorsLink,
            shopLink: user.shopLink,
            merchandiseLink: user.merchandiseLink,
            managerDetails: user.managerDetails,
            publicistDetails: user.publicistDetails,
            agentDetails: user.agentDetails,
            playGolf: user.playGolf,
            singForCharity: user.singForCharity
        };
    }
    static mapCountry(country) {
        return {
            name: country.name,
            nationality: country.nationality,
            hasSubdivision: country.hasSubdivision,
            code: country.getCode(),
            isState: country.isState ? country.isState : false
        };
    }
    static mapCountries(countries) {
        return _.map(countries, this.mapCountry);
    }
    static mapGolfClub(golfClub) {
        return {
            clubId: golfClub._id,
            name: golfClub.name
        };
    }
    static mapGolfClubs(golfClubs) {
        return _.map(golfClubs, this.mapGolfClub);
    }
    static mapGolfTee(golfTee) {
        return {
            _id: golfTee._id,
            name: golfTee.name,
            gender: golfTee.gender,
            courseRating: golfTee.courseRating,
            slopeRating: golfTee.slopeRating,
            par: golfTee.par,
            holes: golfTee.holes
        };
    }
    static mapGolfTees(golfTees) {
        return _.map(golfTees, this.mapGolfTee.bind(this));
    }
    static mapGolfCourse(golfCourse, teeId, tee, gender) {
        let tees = this.mapGolfTees(golfCourse.tees);
        let filteredTees = _.filter(tees, (golfTee) => {
            return golfTee._id == teeId;
        });
        if ((filteredTees === null || filteredTees === void 0 ? void 0 : filteredTees.length) === 0) {
            filteredTees = _.filter(tees, (golfTee) => {
                return golfTee.name === tee && golfTee.gender === gender;
            });
        }
        if ((filteredTees === null || filteredTees === void 0 ? void 0 : filteredTees.length) === 0) {
            filteredTees = tees;
        }
        return {
            courseId: golfCourse._id,
            name: golfCourse.name,
            tees: this.mapGolfTees(filteredTees),
            clubId: golfCourse.clubId
        };
    }
    static mapTournamentGolfCourse(tournamentGolfCourse) {
        return {
            courseId: tournamentGolfCourse.course._id,
            name: tournamentGolfCourse.course.name,
            tees: this.mapGolfTees(tournamentGolfCourse.course.tees),
            clubId: tournamentGolfCourse.course.clubId,
            clubName: tournamentGolfCourse.course.clubName
        };
    }
    static mapTournamentGolfCourses(tournamentGolfCourses) {
        return _.map(tournamentGolfCourses, this.mapTournamentGolfCourse.bind(this));
    }
    static mapTournament(tournament) {
        return {
            tournamentId: tournament._id,
            name: tournament.name,
            regStartDate: tournament.regStartDate.toISOString(),
            regEndDate: tournament.regEndDate.toISOString(),
            startDate: tournament.startDate.toISOString(),
            endDate: tournament.endDate.toISOString(),
            divisions: tournament.divisions,
            courses: this.mapTournamentGolfCourses(tournament.courses),
            type: tournament === null || tournament === void 0 ? void 0 : tournament.type,
            tournamentDirector: tournament.tournamentDirector,
            maxPlayers: tournament.maxPlayers,
            challengers: tournament.challengers,
            createdBy: tournament.createdBy,
            rounds: tournament.rounds,
            leaderboardCut: tournament.leaderboardCut,
            hostingCountry: tournament.hostingCountry,
            hostingClub: tournament.hostingClub
        };
    }
    static mapTournaments(tournaments) {
        return _.map(tournaments, this.mapTournament.bind(this));
    }
    static mapTournamentEntry(tournamentEntry) {
        return {
            tournamentId: tournamentEntry.tournamentId,
            courseId: tournamentEntry.courseId,
            scorecardId: tournamentEntry.scorecardId,
            leaderboardId: tournamentEntry.leaderboardId,
            handicapIndex: tournamentEntry.handicapIndex,
            tee: tournamentEntry.tee
        };
    }
    static mapTournamentScorecard(tournamentScorecard) {
        return {
            scorecardId: tournamentScorecard._id,
            tournamentId: tournamentScorecard.tournamentId,
            course: this.mapGolfCourse(tournamentScorecard.course, tournamentScorecard.teeId, tournamentScorecard.tee, tournamentScorecard.gender),
            scores: tournamentScorecard.scores,
            courseIndex: tournamentScorecard.courseIndex,
            tee: tournamentScorecard.tee,
            teeId: tournamentScorecard.teeId,
            handicapIndex: tournamentScorecard.handicapIndex,
            teamName: tournamentScorecard.teamName,
            round: tournamentScorecard.round
        };
    }
    static mapAllRoundScorecard(tournamentScorecards) {
        return _.map(tournamentScorecards, this.mapTournamentScorecard.bind(this));
    }
    static mapTournamentLeaderboard(tournamentLeaderboard) {
        var _a, _b, _c;
        return {
            position: 0,
            name: ((_a = tournamentLeaderboard.user) === null || _a === void 0 ? void 0 : _a.firstName) + " " + ((_b = tournamentLeaderboard.user) === null || _b === void 0 ? void 0 : _b.lastName),
            countryCode: (_c = tournamentLeaderboard.user) === null || _c === void 0 ? void 0 : _c.nationality,
            total: tournamentLeaderboard.total,
            holes: tournamentLeaderboard.holes,
            round: tournamentLeaderboard.round,
            userId: tournamentLeaderboard.user._id,
            division: tournamentLeaderboard.division
        };
    }
    static mapTournamentLeaderboardView(tournamentLeaderboard) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return {
            position: 0,
            name: ((_a = tournamentLeaderboard.user) === null || _a === void 0 ? void 0 : _a.firstName) + " " + ((_b = tournamentLeaderboard.user) === null || _b === void 0 ? void 0 : _b.lastName),
            countryCode: (_c = tournamentLeaderboard.user) === null || _c === void 0 ? void 0 : _c.nationality,
            total: tournamentLeaderboard.total,
            holes: tournamentLeaderboard.holes,
            round: tournamentLeaderboard.round,
            userId: tournamentLeaderboard.user._id,
            division: tournamentLeaderboard.division,
            gender: (_d = tournamentLeaderboard.user) === null || _d === void 0 ? void 0 : _d.gender,
            courseId: (_e = tournamentLeaderboard.courseId) === null || _e === void 0 ? void 0 : _e._id,
            courseName: (_f = tournamentLeaderboard.courseId) === null || _f === void 0 ? void 0 : _f.name,
            clubId: (_h = (_g = tournamentLeaderboard.courseId) === null || _g === void 0 ? void 0 : _g.clubId) === null || _h === void 0 ? void 0 : _h._id,
            clubName: (_k = (_j = tournamentLeaderboard.courseId) === null || _j === void 0 ? void 0 : _j.clubId) === null || _k === void 0 ? void 0 : _k.name,
            clubCountryCode: (_m = (_l = tournamentLeaderboard.courseId) === null || _l === void 0 ? void 0 : _l.clubId) === null || _m === void 0 ? void 0 : _m.countryCode,
            teamName: tournamentLeaderboard.teamName
        };
    }
    static mapTournamentLeaderboards(tournamentLeaderboards) {
        return _.map(tournamentLeaderboards, (tournamentLeaderboard, i) => {
            return _.extend(this.mapTournamentLeaderboard(tournamentLeaderboard), { position: i + 1 });
        });
    }
    static mapTournamentLeaderboardsView(tournamentLeaderboards) {
        return _.map(tournamentLeaderboards, (tournamentLeaderboard, i) => {
            return _.extend(this.mapTournamentLeaderboardView(tournamentLeaderboard), { position: i + 1 });
        });
    }
    static mapTournamentToResultSummary(tournament) {
        return {
            tournamentId: tournament._id,
            startDate: tournament.startDate.toISOString(),
            endDate: tournament.endDate.toISOString(),
            name: tournament.name,
            type: tournament.type
        };
    }
    static mapTournamentsToResultSummaries(tournamentResults) {
        return _.map(tournamentResults, this.mapTournamentToResultSummary);
    }
    static mapTournamentResult(tournamentResult) {
        return {
            tournamentId: tournamentResult.tournament._id,
            position: 0,
            countryCode: tournamentResult.user.nationality,
            playerName: tournamentResult.user.firstName + " " + tournamentResult.user.lastName,
            total: tournamentResult.total,
            holes: tournamentResult.holes,
            round: tournamentResult.round,
            division: tournamentResult.division,
            points: tournamentResult.points,
            bonusPoints: tournamentResult.bonusPoints,
            totalPoints: tournamentResult.points + tournamentResult.bonusPoints
        };
    }
    static mapTournamentResults(tournamentResults) {
        return _.map(tournamentResults, (tournamentResult, i) => {
            return _.extend(this.mapTournamentResult(tournamentResult), { position: i + 1 });
        });
    }
    static mapRanking(ranking) {
        return {
            user: ranking.user._id,
            position: 0,
            name: ranking.user.firstName + " " + ranking.user.lastName,
            countryCode: ranking.user.nationality,
            totalPoints: ranking.totalPoints,
            rounds: ranking.rounds
        };
    }
    static mapRankings(rankings) {
        return _.map(rankings, (ranking, i) => {
            return _.extend(this.mapRanking(ranking), { position: i + 1 });
        });
    }
    static mergeCurrentExistingRanking(currentRanking, existingRanking) {
        return null;
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9tYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsNEJBQTRCO0FBZTVCLE1BQWEsTUFBTTtJQUVSLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFXO1FBQzFDLE9BQU87WUFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3RCLGNBQWMsRUFBRyxJQUFJLENBQUMsY0FBYztZQUNwQyxTQUFTLEVBQUcsSUFBSSxDQUFDLFNBQVM7WUFDMUIsVUFBVSxFQUFHLElBQUksQ0FBQyxVQUFVO1lBQzVCLFFBQVEsRUFBRyxJQUFJLENBQUMsUUFBUTtZQUN4QixVQUFVLEVBQUcsSUFBSSxDQUFDLFVBQVU7WUFDNUIsV0FBVyxFQUFHLElBQUksQ0FBQyxXQUFXO1lBQzlCLFNBQVMsRUFBRyxJQUFJLENBQUMsU0FBUztZQUMxQixjQUFjLEVBQUcsSUFBSSxDQUFDLGNBQWM7WUFDcEMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxZQUFZLEVBQUcsSUFB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LEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUMxRCxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3JDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxNQUFNLEVBQUcsT0FBTyxDQUFDLE1BQU07U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQW1CO1FBQ3pDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sTUFBTSxDQUFDLDJCQUEyQixDQUFDLGNBQWlCLEVBQUMsZUFBa0I7UUFFMUUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUVKO0FBdlJELHdCQXVSQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElVc2VyIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gXCIuLi8uLi9jb3JlL2NvdW50cnkvY291bnRyeVwiO1xyXG5pbXBvcnQgKiBhcyByZXNwb25zZSBmcm9tIFwiLi9kdG9zL3Jlc3BvbnNlXCI7XHJcbmltcG9ydCAqIGFzIGR0byBmcm9tIFwiLi9kdG9zXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YiB9IGZyb20gXCIuLi8uLi90eXBlcy9nb2xmLWNsdWJcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudCB9IGZyb20gXCIuLi8uLi90eXBlcy90b3VybmFtZW50XCI7XHJcbmltcG9ydCB7IEdvbGZDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vdHlwZXMvZ29sZi1jb3Vyc2VcIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudEdvbGZDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vdHlwZXMvdG91cm5hbWVudC1nb2xmLWNvdXJzZVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50RW50cnkgfSBmcm9tIFwiLi4vLi4vdHlwZXMvdG91cm5hbWVudC1lbnRyeVwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3RvdXJuYW1lbnQtc2NvcmVjYXJkXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRMZWFkZXJib2FyZCB9IGZyb20gXCIuLi8uLi90eXBlcy90b3VybmFtZW50LWxlYWRlcmJvYXJkXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHQgfSBmcm9tIFwiLi4vLi4vdHlwZXMvdG91cm5hbWVudC1yZXN1bHRcIjtcclxuaW1wb3J0IHsgUmFua2luZyB9IGZyb20gXCIuLi8uLi90eXBlcy9yYW5raW5nXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgR29sZlRlZSB9IGZyb20gXCIuLi8uLi90eXBlcy9nb2xmLXRlZVwiO1xyXG5pbXBvcnQgeyBHZW5kZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXMvZ2VuZGVyLmVudW1cIjtcclxuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hcHBlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBVc2VyVG9Vc2VyUHJvZmlsZSh1c2VyOiBJVXNlcik6IHJlc3BvbnNlLlVzZXJQcm9maWxlUmVzcG9uc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcclxuICAgICAgICAgICAgbmF0aW9uYWxpdHk6IHVzZXIubmF0aW9uYWxpdHksXHJcbiAgICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTogdXNlci5jb3VudHJ5T2ZSZXNpZGVuY2UsXHJcbiAgICAgICAgICAgIHN0YXRlOiB1c2VyLnN0YXRlLFxyXG4gICAgICAgICAgICBoYW5kaWNhcEluZGV4OiB1c2VyLmhhbmRpY2FwSW5kZXgsXHJcbiAgICAgICAgICAgIGhvbWVDbHViOiB1c2VyLmhvbWVDbHViLFxyXG4gICAgICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxyXG4gICAgICAgICAgICBhY2NvdW50U3RhdHVzOiB1c2VyLnN0YXR1cyxcclxuICAgICAgICAgICAgZGl2aXNpb246IHVzZXIuZGl2aXNpb24sXHJcbiAgICAgICAgICAgIGlzQWRtaW4gOiB1c2VyLmlzQWRtaW4sXHJcbiAgICAgICAgICAgIHB1YmxpY1Byb2ZpbGVzIDogdXNlci5wdWJsaWNQcm9maWxlcyxcclxuICAgICAgICAgICAgaW1hZ2VEYXRhIDogdXNlci5pbWFnZURhdGEsXHJcbiAgICAgICAgICAgIHByb2Zlc3Npb24gOiB1c2VyLnByb2Zlc3Npb24sXHJcbiAgICAgICAgICAgIGhvbWVQYWdlIDogdXNlci5ob21lUGFnZSxcclxuICAgICAgICAgICAgb3RoZXJMaW5rcyA6IHVzZXIub3RoZXJMaW5rcyxcclxuICAgICAgICAgICAgc2hvcnRVcGRhdGUgOiB1c2VyLnNob3J0VXBkYXRlLFxyXG4gICAgICAgICAgICBiaW9ncmFwaHkgOiB1c2VyLmJpb2dyYXBoeSxcclxuICAgICAgICAgICAgb3duQ2hhcml0eUxpbmsgOiB1c2VyLm93bkNoYXJpdHlMaW5rLFxyXG4gICAgICAgICAgICBzdXBwb3J0Q2hhcml0aWVzIDogdXNlci5zdXBwb3J0Q2hhcml0aWVzLFxyXG4gICAgICAgICAgICB2aWRlb01zZ0xpbmsgOiB1c2VyLnZpZGVvTXNnTGluayxcclxuICAgICAgICAgICAgc3BvbnNvcnNMaW5rIDogdXNlci5zcG9uc29yc0xpbmssXHJcbiAgICAgICAgICAgIHNob3BMaW5rIDogdXNlci5zaG9wTGluayxcclxuICAgICAgICAgICAgbWVyY2hhbmRpc2VMaW5rIDogdXNlci5tZXJjaGFuZGlzZUxpbmssXHJcbiAgICAgICAgICAgIG1hbmFnZXJEZXRhaWxzIDogdXNlci5tYW5hZ2VyRGV0YWlscyxcclxuICAgICAgICAgICAgcHVibGljaXN0RGV0YWlscyA6IHVzZXIucHVibGljaXN0RGV0YWlscyxcclxuICAgICAgICAgICAgYWdlbnREZXRhaWxzIDogdXNlci5hZ2VudERldGFpbHMsXHJcbiAgICAgICAgICAgIHBsYXlHb2xmIDogdXNlci5wbGF5R29sZixcclxuICAgICAgICAgICAgc2luZ0ZvckNoYXJpdHkgOiB1c2VyLnNpbmdGb3JDaGFyaXR5XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcENvdW50cnkoY291bnRyeTogQ291bnRyeSk6IHJlc3BvbnNlLkNvdW50cnlSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogY291bnRyeS5uYW1lLFxyXG4gICAgICAgICAgICBuYXRpb25hbGl0eTogY291bnRyeS5uYXRpb25hbGl0eSxcclxuICAgICAgICAgICAgaGFzU3ViZGl2aXNpb246IGNvdW50cnkuaGFzU3ViZGl2aXNpb24sXHJcbiAgICAgICAgICAgIGNvZGU6IGNvdW50cnkuZ2V0Q29kZSgpLFxyXG4gICAgICAgICAgICBpc1N0YXRlIDogY291bnRyeS5pc1N0YXRlID8gY291bnRyeS5pc1N0YXRlIDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwQ291bnRyaWVzKGNvdW50cmllczogQ291bnRyeVtdKTogcmVzcG9uc2UuQ291bnRyeVJlc3BvbnNlW10ge1xyXG4gICAgICAgIHJldHVybiBfLm1hcChjb3VudHJpZXMsIHRoaXMubWFwQ291bnRyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBHb2xmQ2x1Yihnb2xmQ2x1YjogR29sZkNsdWIpOiByZXNwb25zZS5Hb2xmQ2x1YlJlc3BvbnNlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbHViSWQ6IGdvbGZDbHViLl9pZCxcclxuICAgICAgICAgICAgbmFtZTogZ29sZkNsdWIubmFtZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBHb2xmQ2x1YnMoZ29sZkNsdWJzOiBHb2xmQ2x1YltdKTogcmVzcG9uc2UuR29sZkNsdWJSZXNwb25zZVtdIHtcclxuICAgICAgICByZXR1cm4gXy5tYXAoZ29sZkNsdWJzLCB0aGlzLm1hcEdvbGZDbHViKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcEdvbGZUZWUoZ29sZlRlZTogR29sZlRlZSk6IGR0by5Hb2xmVGVlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBfaWQ6IGdvbGZUZWUuX2lkLFxyXG4gICAgICAgICAgICBuYW1lOiBnb2xmVGVlLm5hbWUsXHJcbiAgICAgICAgICAgIGdlbmRlcjogZ29sZlRlZS5nZW5kZXIsXHJcbiAgICAgICAgICAgIGNvdXJzZVJhdGluZzogZ29sZlRlZS5jb3Vyc2VSYXRpbmcsXHJcbiAgICAgICAgICAgIHNsb3BlUmF0aW5nOiBnb2xmVGVlLnNsb3BlUmF0aW5nLFxyXG4gICAgICAgICAgICBwYXI6IGdvbGZUZWUucGFyLFxyXG4gICAgICAgICAgICBob2xlczogZ29sZlRlZS5ob2xlc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBHb2xmVGVlcyhnb2xmVGVlczogR29sZlRlZVtdKTogZHRvLkdvbGZUZWVbXSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKGdvbGZUZWVzLCB0aGlzLm1hcEdvbGZUZWUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBHb2xmQ291cnNlKGdvbGZDb3Vyc2U6IEdvbGZDb3Vyc2UsdGVlSWQ6c3RyaW5nLCB0ZWU6IHN0cmluZywgZ2VuZGVyOiBHZW5kZXIpOiByZXNwb25zZS5Hb2xmQ291cnNlUmVzcG9uc2Uge1xyXG5cclxuICAgICAgICBsZXQgdGVlcyA9IHRoaXMubWFwR29sZlRlZXMoZ29sZkNvdXJzZS50ZWVzKTtcclxuICAgICAgICBsZXQgZmlsdGVyZWRUZWVzID0gXy5maWx0ZXIodGVlcywgKGdvbGZUZWUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGdvbGZUZWUuX2lkID09IHRlZUlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGZpbHRlcmVkVGVlcz8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZpbHRlcmVkVGVlcyA9IF8uZmlsdGVyKHRlZXMsIChnb2xmVGVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ29sZlRlZS5uYW1lID09PSB0ZWUgJiYgZ29sZlRlZS5nZW5kZXIgPT09IGdlbmRlcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZpbHRlcmVkVGVlcz8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZpbHRlcmVkVGVlcyA9IHRlZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvdXJzZUlkOiBnb2xmQ291cnNlLl9pZCxcclxuICAgICAgICAgICAgbmFtZTogZ29sZkNvdXJzZS5uYW1lLFxyXG4gICAgICAgICAgICB0ZWVzOiB0aGlzLm1hcEdvbGZUZWVzKGZpbHRlcmVkVGVlcyksXHJcbiAgICAgICAgICAgIGNsdWJJZCA6IGdvbGZDb3Vyc2UuY2x1YklkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRHb2xmQ291cnNlKHRvdXJuYW1lbnRHb2xmQ291cnNlOiBUb3VybmFtZW50R29sZkNvdXJzZSk6IHJlc3BvbnNlLkdvbGZDb3Vyc2VSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY291cnNlSWQ6IHRvdXJuYW1lbnRHb2xmQ291cnNlLmNvdXJzZS5faWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHRvdXJuYW1lbnRHb2xmQ291cnNlLmNvdXJzZS5uYW1lLFxyXG4gICAgICAgICAgICB0ZWVzOiB0aGlzLm1hcEdvbGZUZWVzKHRvdXJuYW1lbnRHb2xmQ291cnNlLmNvdXJzZS50ZWVzKSxcclxuICAgICAgICAgICAgY2x1YklkOiAgdG91cm5hbWVudEdvbGZDb3Vyc2UuY291cnNlLmNsdWJJZCxcclxuICAgICAgICAgICAgY2x1Yk5hbWUgOiB0b3VybmFtZW50R29sZkNvdXJzZS5jb3Vyc2UuY2x1Yk5hbWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRHb2xmQ291cnNlcyh0b3VybmFtZW50R29sZkNvdXJzZXM6IFRvdXJuYW1lbnRHb2xmQ291cnNlW10pOiByZXNwb25zZS5Hb2xmQ291cnNlUmVzcG9uc2VbXSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRvdXJuYW1lbnRHb2xmQ291cnNlcywgdGhpcy5tYXBUb3VybmFtZW50R29sZkNvdXJzZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnQodG91cm5hbWVudDogVG91cm5hbWVudCk6IHJlc3BvbnNlLlRvdXJuYW1lbnRSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG91cm5hbWVudElkOiB0b3VybmFtZW50Ll9pZCxcclxuICAgICAgICAgICAgbmFtZTogdG91cm5hbWVudC5uYW1lLFxyXG4gICAgICAgICAgICByZWdTdGFydERhdGU6IHRvdXJuYW1lbnQucmVnU3RhcnREYXRlLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIHJlZ0VuZERhdGU6IHRvdXJuYW1lbnQucmVnRW5kRGF0ZS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgICBzdGFydERhdGU6IHRvdXJuYW1lbnQuc3RhcnREYXRlLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGVuZERhdGU6IHRvdXJuYW1lbnQuZW5kRGF0ZS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgICBkaXZpc2lvbnM6IHRvdXJuYW1lbnQuZGl2aXNpb25zLFxyXG4gICAgICAgICAgICBjb3Vyc2VzOiB0aGlzLm1hcFRvdXJuYW1lbnRHb2xmQ291cnNlcyh0b3VybmFtZW50LmNvdXJzZXMpLFxyXG4gICAgICAgICAgICB0eXBlIDogdG91cm5hbWVudD8udHlwZSxcclxuICAgICAgICAgICAgdG91cm5hbWVudERpcmVjdG9yIDogdG91cm5hbWVudC50b3VybmFtZW50RGlyZWN0b3IsXHJcbiAgICAgICAgICAgIG1heFBsYXllcnM6IHRvdXJuYW1lbnQubWF4UGxheWVycyxcclxuICAgICAgICAgICAgY2hhbGxlbmdlcnM6IHRvdXJuYW1lbnQuY2hhbGxlbmdlcnMsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRCeTogdG91cm5hbWVudC5jcmVhdGVkQnksXHJcbiAgICAgICAgICAgIHJvdW5kczogdG91cm5hbWVudC5yb3VuZHMsXHJcbiAgICAgICAgICAgIGxlYWRlcmJvYXJkQ3V0IDogdG91cm5hbWVudC5sZWFkZXJib2FyZEN1dCxcclxuICAgICAgICAgICAgaG9zdGluZ0NvdW50cnkgOiB0b3VybmFtZW50Lmhvc3RpbmdDb3VudHJ5LFxyXG4gICAgICAgICAgICBob3N0aW5nQ2x1YiA6IHRvdXJuYW1lbnQuaG9zdGluZ0NsdWJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwVG91cm5hbWVudHModG91cm5hbWVudHM6IFRvdXJuYW1lbnRbXSk6IHJlc3BvbnNlLlRvdXJuYW1lbnRSZXNwb25zZVtdIHtcclxuICAgICAgICByZXR1cm4gXy5tYXAodG91cm5hbWVudHMsIHRoaXMubWFwVG91cm5hbWVudC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRFbnRyeSh0b3VybmFtZW50RW50cnk6IFRvdXJuYW1lbnRFbnRyeSk6IHJlc3BvbnNlLlRvdXJuYW1lbnRFbnRyeVJlc3BvbnNlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRFbnRyeS50b3VybmFtZW50SWQsXHJcbiAgICAgICAgICAgIGNvdXJzZUlkOiB0b3VybmFtZW50RW50cnkuY291cnNlSWQsXHJcbiAgICAgICAgICAgIHNjb3JlY2FyZElkOiB0b3VybmFtZW50RW50cnkuc2NvcmVjYXJkSWQsXHJcbiAgICAgICAgICAgIGxlYWRlcmJvYXJkSWQ6IHRvdXJuYW1lbnRFbnRyeS5sZWFkZXJib2FyZElkLFxyXG4gICAgICAgICAgICBoYW5kaWNhcEluZGV4OiB0b3VybmFtZW50RW50cnkuaGFuZGljYXBJbmRleCxcclxuICAgICAgICAgICAgdGVlOiB0b3VybmFtZW50RW50cnkudGVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRTY29yZWNhcmQodG91cm5hbWVudFNjb3JlY2FyZDogVG91cm5hbWVudFNjb3JlY2FyZCk6IHJlc3BvbnNlLlRvdXJuYW1lbnRTY29yZWNhcmRSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVjYXJkSWQ6IHRvdXJuYW1lbnRTY29yZWNhcmQuX2lkLFxyXG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRvdXJuYW1lbnRTY29yZWNhcmQudG91cm5hbWVudElkLFxyXG4gICAgICAgICAgICBjb3Vyc2U6IHRoaXMubWFwR29sZkNvdXJzZSh0b3VybmFtZW50U2NvcmVjYXJkLmNvdXJzZSx0b3VybmFtZW50U2NvcmVjYXJkLnRlZUlkLCB0b3VybmFtZW50U2NvcmVjYXJkLnRlZSwgdG91cm5hbWVudFNjb3JlY2FyZC5nZW5kZXIpLFxyXG4gICAgICAgICAgICBzY29yZXM6IHRvdXJuYW1lbnRTY29yZWNhcmQuc2NvcmVzLFxyXG4gICAgICAgICAgICBjb3Vyc2VJbmRleDogdG91cm5hbWVudFNjb3JlY2FyZC5jb3Vyc2VJbmRleCxcclxuICAgICAgICAgICAgdGVlOiB0b3VybmFtZW50U2NvcmVjYXJkLnRlZSxcclxuICAgICAgICAgICAgdGVlSWQ6IHRvdXJuYW1lbnRTY29yZWNhcmQudGVlSWQsXHJcbiAgICAgICAgICAgIGhhbmRpY2FwSW5kZXg6IHRvdXJuYW1lbnRTY29yZWNhcmQuaGFuZGljYXBJbmRleCxcclxuICAgICAgICAgICAgdGVhbU5hbWUgOiB0b3VybmFtZW50U2NvcmVjYXJkLnRlYW1OYW1lLFxyXG4gICAgICAgICAgICByb3VuZDogdG91cm5hbWVudFNjb3JlY2FyZC5yb3VuZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcEFsbFJvdW5kU2NvcmVjYXJkKHRvdXJuYW1lbnRTY29yZWNhcmRzOiBUb3VybmFtZW50U2NvcmVjYXJkW10pOiByZXNwb25zZS5Ub3VybmFtZW50U2NvcmVjYXJkUmVzcG9uc2VbXSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRvdXJuYW1lbnRTY29yZWNhcmRzLCB0aGlzLm1hcFRvdXJuYW1lbnRTY29yZWNhcmQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBUb3VybmFtZW50TGVhZGVyYm9hcmQodG91cm5hbWVudExlYWRlcmJvYXJkOiBUb3VybmFtZW50TGVhZGVyYm9hcmQpOiByZXNwb25zZS5Ub3VybmFtZW50TGVhZGVyYm9hcmRSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgIG5hbWU6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyPy5sYXN0TmFtZSxcclxuICAgICAgICAgICAgY291bnRyeUNvZGU6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyPy5uYXRpb25hbGl0eSxcclxuICAgICAgICAgICAgdG90YWw6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC50b3RhbCxcclxuICAgICAgICAgICAgaG9sZXM6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5ob2xlcyxcclxuICAgICAgICAgICAgcm91bmQ6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5yb3VuZCxcclxuICAgICAgICAgICAgdXNlcklkOiB0b3VybmFtZW50TGVhZGVyYm9hcmQudXNlci5faWQsXHJcbiAgICAgICAgICAgIGRpdmlzaW9uOiB0b3VybmFtZW50TGVhZGVyYm9hcmQuZGl2aXNpb25cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwVG91cm5hbWVudExlYWRlcmJvYXJkVmlldyh0b3VybmFtZW50TGVhZGVyYm9hcmQ6IGFueSk6IHJlc3BvbnNlLlRvdXJuYW1lbnRMZWFkZXJib2FyZFJlc3BvbnNlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgbmFtZTogdG91cm5hbWVudExlYWRlcmJvYXJkLnVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgdG91cm5hbWVudExlYWRlcmJvYXJkLnVzZXI/Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogdG91cm5hbWVudExlYWRlcmJvYXJkLnVzZXI/Lm5hdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICB0b3RhbDogdG91cm5hbWVudExlYWRlcmJvYXJkLnRvdGFsLFxyXG4gICAgICAgICAgICBob2xlczogdG91cm5hbWVudExlYWRlcmJvYXJkLmhvbGVzLFxyXG4gICAgICAgICAgICByb3VuZDogdG91cm5hbWVudExlYWRlcmJvYXJkLnJvdW5kLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC51c2VyLl9pZCxcclxuICAgICAgICAgICAgZGl2aXNpb246IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5kaXZpc2lvbixcclxuICAgICAgICAgICAgZ2VuZGVyOiB0b3VybmFtZW50TGVhZGVyYm9hcmQudXNlcj8uZ2VuZGVyLFxyXG4gICAgICAgICAgICBjb3Vyc2VJZCA6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5jb3Vyc2VJZD8uX2lkLFxyXG4gICAgICAgICAgICBjb3Vyc2VOYW1lIDogdG91cm5hbWVudExlYWRlcmJvYXJkLmNvdXJzZUlkPy5uYW1lLFxyXG4gICAgICAgICAgICBjbHViSWQgOiB0b3VybmFtZW50TGVhZGVyYm9hcmQuY291cnNlSWQ/LmNsdWJJZD8uX2lkLFxyXG4gICAgICAgICAgICBjbHViTmFtZSA6IHRvdXJuYW1lbnRMZWFkZXJib2FyZC5jb3Vyc2VJZD8uY2x1YklkPy5uYW1lLFxyXG4gICAgICAgICAgICBjbHViQ291bnRyeUNvZGUgOiAgdG91cm5hbWVudExlYWRlcmJvYXJkLmNvdXJzZUlkPy5jbHViSWQ/LmNvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICB0ZWFtTmFtZTogdG91cm5hbWVudExlYWRlcmJvYXJkLnRlYW1OYW1lXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRMZWFkZXJib2FyZHModG91cm5hbWVudExlYWRlcmJvYXJkczogVG91cm5hbWVudExlYWRlcmJvYXJkW10pOiByZXNwb25zZS5Ub3VybmFtZW50TGVhZGVyYm9hcmRSZXNwb25zZVtdIHtcclxuICAgICAgICByZXR1cm4gXy5tYXAodG91cm5hbWVudExlYWRlcmJvYXJkcywgKHRvdXJuYW1lbnRMZWFkZXJib2FyZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5leHRlbmQodGhpcy5tYXBUb3VybmFtZW50TGVhZGVyYm9hcmQodG91cm5hbWVudExlYWRlcmJvYXJkKSwgeyBwb3NpdGlvbjogaSArIDEgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBUb3VybmFtZW50TGVhZGVyYm9hcmRzVmlldyh0b3VybmFtZW50TGVhZGVyYm9hcmRzOmFueVtdKTogcmVzcG9uc2UuVG91cm5hbWVudExlYWRlcmJvYXJkUmVzcG9uc2VbXSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKHRvdXJuYW1lbnRMZWFkZXJib2FyZHMsICh0b3VybmFtZW50TGVhZGVyYm9hcmQsIGkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHRoaXMubWFwVG91cm5hbWVudExlYWRlcmJvYXJkVmlldyh0b3VybmFtZW50TGVhZGVyYm9hcmQpLCB7IHBvc2l0aW9uOiBpICsgMSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRUb1Jlc3VsdFN1bW1hcnkodG91cm5hbWVudDogVG91cm5hbWVudCk6IHJlc3BvbnNlLlRvdXJuYW1lbnRSZXN1bHRTdW1tYXJ5UmVzcG9uc2Uge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogdG91cm5hbWVudC5faWQsXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogdG91cm5hbWVudC5zdGFydERhdGUudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgICAgZW5kRGF0ZTogdG91cm5hbWVudC5lbmREYXRlLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG5hbWU6IHRvdXJuYW1lbnQubmFtZSxcclxuICAgICAgICAgICAgdHlwZSA6IHRvdXJuYW1lbnQudHlwZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYXBUb3VybmFtZW50c1RvUmVzdWx0U3VtbWFyaWVzKHRvdXJuYW1lbnRSZXN1bHRzOiBUb3VybmFtZW50W10pOiByZXNwb25zZS5Ub3VybmFtZW50UmVzdWx0U3VtbWFyeVJlc3BvbnNlW10ge1xyXG4gICAgICAgIHJldHVybiBfLm1hcCh0b3VybmFtZW50UmVzdWx0cywgdGhpcy5tYXBUb3VybmFtZW50VG9SZXN1bHRTdW1tYXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFRvdXJuYW1lbnRSZXN1bHQodG91cm5hbWVudFJlc3VsdDogVG91cm5hbWVudFJlc3VsdCk6IHJlc3BvbnNlLlRvdXJuYW1lbnRSZXN1bHRSZXNwb25zZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG91cm5hbWVudElkOiB0b3VybmFtZW50UmVzdWx0LnRvdXJuYW1lbnQuX2lkLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgY291bnRyeUNvZGU6IHRvdXJuYW1lbnRSZXN1bHQudXNlci5uYXRpb25hbGl0eSxcclxuICAgICAgICAgICAgcGxheWVyTmFtZTogdG91cm5hbWVudFJlc3VsdC51c2VyLmZpcnN0TmFtZSArIFwiIFwiICsgdG91cm5hbWVudFJlc3VsdC51c2VyLmxhc3ROYW1lLFxyXG4gICAgICAgICAgICB0b3RhbDogdG91cm5hbWVudFJlc3VsdC50b3RhbCxcclxuICAgICAgICAgICAgaG9sZXM6IHRvdXJuYW1lbnRSZXN1bHQuaG9sZXMsXHJcbiAgICAgICAgICAgIHJvdW5kOiB0b3VybmFtZW50UmVzdWx0LnJvdW5kLFxyXG4gICAgICAgICAgICBkaXZpc2lvbjogdG91cm5hbWVudFJlc3VsdC5kaXZpc2lvbixcclxuICAgICAgICAgICAgcG9pbnRzIDogdG91cm5hbWVudFJlc3VsdC5wb2ludHMsXHJcbiAgICAgICAgICAgIGJvbnVzUG9pbnRzIDogdG91cm5hbWVudFJlc3VsdC5ib251c1BvaW50cyxcclxuICAgICAgICAgICAgdG90YWxQb2ludHMgOiB0b3VybmFtZW50UmVzdWx0LnBvaW50cyArIHRvdXJuYW1lbnRSZXN1bHQuYm9udXNQb2ludHNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwVG91cm5hbWVudFJlc3VsdHModG91cm5hbWVudFJlc3VsdHM6IFRvdXJuYW1lbnRSZXN1bHRbXSk6IHJlc3BvbnNlLlRvdXJuYW1lbnRSZXN1bHRSZXNwb25zZVtdIHtcclxuICAgICAgICByZXR1cm4gXy5tYXAodG91cm5hbWVudFJlc3VsdHMsICh0b3VybmFtZW50UmVzdWx0LCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmV4dGVuZCh0aGlzLm1hcFRvdXJuYW1lbnRSZXN1bHQodG91cm5hbWVudFJlc3VsdCksIHsgcG9zaXRpb246IGkgKyAxIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwUmFua2luZyhyYW5raW5nOiBSYW5raW5nKTogcmVzcG9uc2UuUmFua2luZ1Jlc3BvbnNlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1c2VyIDogcmFua2luZy51c2VyLl9pZCxcclxuICAgICAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgICAgIG5hbWU6IHJhbmtpbmcudXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHJhbmtpbmcudXNlci5sYXN0TmFtZSxcclxuICAgICAgICAgICAgY291bnRyeUNvZGU6IHJhbmtpbmcudXNlci5uYXRpb25hbGl0eSxcclxuICAgICAgICAgICAgdG90YWxQb2ludHM6IHJhbmtpbmcudG90YWxQb2ludHMsXHJcbiAgICAgICAgICAgIHJvdW5kcyA6IHJhbmtpbmcucm91bmRzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hcFJhbmtpbmdzKHJhbmtpbmdzOiBSYW5raW5nW10pOiByZXNwb25zZS5SYW5raW5nUmVzcG9uc2VbXSB7XHJcbiAgICAgICAgcmV0dXJuIF8ubWFwKHJhbmtpbmdzLCAocmFua2luZywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5leHRlbmQodGhpcy5tYXBSYW5raW5nKHJhbmtpbmcpLCB7IHBvc2l0aW9uOiBpICsgMSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1lcmdlQ3VycmVudEV4aXN0aW5nUmFua2luZyhjdXJyZW50UmFua2luZzpbXSxleGlzdGluZ1Jhbmtpbmc6W10pIDogcmVzcG9uc2UuUmFua2luZ1Jlc3BvbnNlW10ge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbn0iXX0=