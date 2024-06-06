"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterTournamentRequestSchema = exports.EnterTournamentRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  EnterTournamentRequest:
 *      type: object
 *      required:
 *          - accessToken
 *      properties:
 *          courseId:
 *              type: string
 *          handicapIndex:
 *              type: number
 *          tee:
 *              type: string
 */
class EnterTournamentRequest {
}
exports.EnterTournamentRequest = EnterTournamentRequest;
exports.EnterTournamentRequestSchema = [
    (0, validator_1.checkId)('tournamentId'),
    (0, validator_1.checkId)('courseId'),
    check('handicapIndex').exists({ checkFalsy: true }).isNumeric(),
    check('tee').exists({ checkFalsy: true })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50ZXItdG91cm5hbWVudC5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvZW50ZXItdG91cm5hbWVudC5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFnRTtBQUVoRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0M7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFhLHNCQUFzQjtDQU1sQztBQU5ELHdEQU1DO0FBRVksUUFBQSw0QkFBNEIsR0FBRztJQUN4QyxJQUFBLG1CQUFPLEVBQUMsY0FBYyxDQUFDO0lBQ3ZCLElBQUEsbUJBQU8sRUFBQyxVQUFVLENBQUM7SUFDbkIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUMvRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGVja0lkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuXHJcbmNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgRW50ZXJUb3VybmFtZW50UmVxdWVzdDpcclxuICogICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICByZXF1aXJlZDpcclxuICogICAgICAgICAgLSBhY2Nlc3NUb2tlblxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIGNvdXJzZUlkOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGhhbmRpY2FwSW5kZXg6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBudW1iZXJcclxuICogICAgICAgICAgdGVlOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50ZXJUb3VybmFtZW50UmVxdWVzdCB7XHJcbiAgICBjb3Vyc2VJZDogc3RyaW5nO1xyXG4gICAgaGFuZGljYXBJbmRleDogbnVtYmVyO1xyXG4gICAgdGVlOiBzdHJpbmc7XHJcbiAgICB0ZWFtTmFtZT86IHN0cmluZztcclxuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgRW50ZXJUb3VybmFtZW50UmVxdWVzdFNjaGVtYSA9IFtcclxuICAgIGNoZWNrSWQoJ3RvdXJuYW1lbnRJZCcpLFxyXG4gICAgY2hlY2tJZCgnY291cnNlSWQnKSxcclxuICAgIGNoZWNrKCdoYW5kaWNhcEluZGV4JykuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KS5pc051bWVyaWMoKSxcclxuICAgIGNoZWNrKCd0ZWUnKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pXHJcbl07XHJcbiJdfQ==