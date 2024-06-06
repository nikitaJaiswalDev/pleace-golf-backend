"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentScorecardResponse = void 0;
/**
 * @swagger
 * definitions:
 *  TournamentScorecardResponse:
 *      type: object
 *      properties:
 *          scorecardId:
 *              type: string
 *          tournamentId:
 *              type: string
 *          course:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/GolfCourseResponse'
 *          scores:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Score'
 *          courseIndex:
 *              type: number
 *          tee:
 *              type: string
 */
class TournamentScorecardResponse {
}
exports.TournamentScorecardResponse = TournamentScorecardResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC1zY29yZWNhcmQucmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2R0b3MvcmVzcG9uc2UvdG91cm5hbWVudC1zY29yZWNhcmQucmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFhLDJCQUEyQjtDQVd2QztBQVhELGtFQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi4vc2NvcmVcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZVJlc3BvbnNlIH0gZnJvbSBcIi4vZ29sZi1jb3Vyc2UucmVzcG9uc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIFRvdXJuYW1lbnRTY29yZWNhcmRSZXNwb25zZTpcclxuICogICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBzY29yZWNhcmRJZDpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICB0b3VybmFtZW50SWQ6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgY291cnNlOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICogICAgICAgICAgICAgIGl0ZW1zOlxyXG4gKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0dvbGZDb3Vyc2VSZXNwb25zZSdcclxuICogICAgICAgICAgc2NvcmVzOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICogICAgICAgICAgICAgIGl0ZW1zOlxyXG4gKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1Njb3JlJ1xyXG4gKiAgICAgICAgICBjb3Vyc2VJbmRleDpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICB0ZWU6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50U2NvcmVjYXJkUmVzcG9uc2Uge1xyXG4gICAgc2NvcmVjYXJkSWQ6IHN0cmluZztcclxuICAgIHRvdXJuYW1lbnRJZDogc3RyaW5nO1xyXG4gICAgY291cnNlOiBHb2xmQ291cnNlUmVzcG9uc2U7XHJcbiAgICBzY29yZXM6IFNjb3JlW107XHJcbiAgICBjb3Vyc2VJbmRleDogbnVtYmVyO1xyXG4gICAgdGVlOiBzdHJpbmc7XHJcbiAgICB0ZWVJZD86IHN0cmluZztcclxuICAgIHRlYW1OYW1lPzogc3RyaW5nO1xyXG4gICAgaGFuZGljYXBJbmRleD86IG51bWJlcjtcclxuICAgIHJvdW5kPzogbnVtYmVyO1xyXG59Il19