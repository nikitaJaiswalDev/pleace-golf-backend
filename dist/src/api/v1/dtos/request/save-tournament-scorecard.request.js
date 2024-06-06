"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveTournamentScorecardRequestSchema = exports.SaveTournamentScorecardRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  SaveTournamentScorecardRequest:
 *      type: object
 *      required:
 *          - scores
 *      properties:
 *          scores:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Score'
 */
class SaveTournamentScorecardRequest {
}
exports.SaveTournamentScorecardRequest = SaveTournamentScorecardRequest;
exports.SaveTournamentScorecardRequestSchema = [
    (0, validator_1.checkId)('tournamentId'),
    (0, validator_1.checkId)('scorecardId'),
    check('scores.*.hole').exists({ checkFalsy: true }).isNumeric(),
    check('scores.*.score').exists({ checkFalsy: true }).isNumeric()
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS10b3VybmFtZW50LXNjb3JlY2FyZC5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3Qvc2F2ZS10b3VybmFtZW50LXNjb3JlY2FyZC5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFFQUFnRTtBQUVoRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0M7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBYSw4QkFBOEI7Q0FFMUM7QUFGRCx3RUFFQztBQUVZLFFBQUEsb0NBQW9DLEdBQUc7SUFDaEQsSUFBQSxtQkFBTyxFQUFDLGNBQWMsQ0FBQztJQUN2QixJQUFBLG1CQUFPLEVBQUMsYUFBYSxDQUFDO0lBQ3RCLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7SUFDL0QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO0NBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuLi9zY29yZVwiO1xyXG5pbXBvcnQgeyBjaGVja0lkIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuXHJcbmNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgU2F2ZVRvdXJuYW1lbnRTY29yZWNhcmRSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIHNjb3Jlc1xyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIHNjb3JlczpcclxuICogICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9TY29yZSdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTYXZlVG91cm5hbWVudFNjb3JlY2FyZFJlcXVlc3Qge1xyXG4gICAgc2NvcmVzOiBTY29yZVtdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU2F2ZVRvdXJuYW1lbnRTY29yZWNhcmRSZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2tJZCgndG91cm5hbWVudElkJyksXHJcbiAgICBjaGVja0lkKCdzY29yZWNhcmRJZCcpLFxyXG4gICAgY2hlY2soJ3Njb3Jlcy4qLmhvbGUnKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pLmlzTnVtZXJpYygpLFxyXG4gICAgY2hlY2soJ3Njb3Jlcy4qLnNjb3JlJykuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KS5pc051bWVyaWMoKVxyXG5dO1xyXG4iXX0=