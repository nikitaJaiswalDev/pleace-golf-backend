
/**
 * @swagger
 * definitions:
 *  TournamentResultResponse:
 *      type: object
 *      properties:
 *          tournamentId:
 *              type: string
 *          position:
 *              type: number
 *          countryCode:
 *              type: string
 *          playerName:
 *              type: string
 *          total:
 *              type: number
 *          holes:
 *              type: number
 *          round:
 *              type: number
 */
export class TournamentResultResponse {
    tournamentId: string;
    position: number;
    countryCode: string;
    playerName: string;
    total: number;
    holes: number;
    round: number;
    division?:string;
    points:number;
    bonusPoints:number;
    totalPoints:number;
}