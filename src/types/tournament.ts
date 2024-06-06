import { GolfClub } from "./golf-club";
import { GolfDivision } from "./golf-division.enum";
import { TournamentGolfCourse } from "./tournament-golf-course";

export class Tournament {
    _id: string;
    name: string;
    regStartDate: Date;
    regEndDate: Date;
    startDate: Date;
    endDate: Date;
    maxPlayers: number;
    divisions: GolfDivision[];
    courses: TournamentGolfCourse[];
    isResultProcessed: boolean;
    tournamentDirector?: boolean;
    type?: string;
    challengers?:string[]
    createdBy? : string;
    rounds? : number;
    leaderboardCut? : number;
    hostingCountry? : string;
    hostingClub? : GolfClub;
    public static fromId(id: string): Tournament {
        return {
            _id: id
        } as Tournament;
    }
}
