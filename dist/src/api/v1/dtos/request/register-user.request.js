"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserRequestSchema = exports.RegisterUserRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  RegisterUserRequest:
 *      type: object
 *      required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
 *          - nationality
 *          - countryOfResidence
 *          - handicapIndex
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          nationality:
 *              type: string
 *          countryOfResidence:
 *              type: string
 *          handicapIndex:
 *              type: number
 *          accessToken:
 *              type: string
 */
class RegisterUserRequest {
}
exports.RegisterUserRequest = RegisterUserRequest;
exports.RegisterUserRequestSchema = [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    check("firstName").exists({ checkFalsy: true }),
    check("lastName").exists({ checkFalsy: true }),
    (0, validator_1.checkCountry)("nationality"),
    (0, validator_1.checkCountry)("countryOfResidence"),
    check("handicapIndex").exists({ checkFalsy: true }).isNumeric(),
    check('accessToken').optional({ checkFalsy: true })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItdXNlci5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvcmVnaXN0ZXItdXNlci5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFFQUFxRTtBQUVyRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQWEsbUJBQW1CO0NBUy9CO0FBVEQsa0RBU0M7QUFFWSxRQUFBLHlCQUF5QixHQUFHO0lBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7SUFDeEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUN0QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQy9DLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDOUMsSUFBQSx3QkFBWSxFQUFDLGFBQWEsQ0FBQztJQUMzQixJQUFBLHdCQUFZLEVBQUMsb0JBQW9CLENBQUM7SUFDbEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUMvRCxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQ3RELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHZW5kZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvZ2VuZGVyLmVudW1cIjtcclxuaW1wb3J0IHsgY2hlY2tDb3VudHJ5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuXHJcbmNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIFJlZ2lzdGVyVXNlclJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gZW1haWxcclxuICogICAgICAgICAgLSBwYXNzd29yZFxyXG4gKiAgICAgICAgICAtIGZpcnN0TmFtZVxyXG4gKiAgICAgICAgICAtIGxhc3ROYW1lXHJcbiAqICAgICAgICAgIC0gbmF0aW9uYWxpdHlcclxuICogICAgICAgICAgLSBjb3VudHJ5T2ZSZXNpZGVuY2VcclxuICogICAgICAgICAgLSBoYW5kaWNhcEluZGV4XHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgcGFzc3dvcmQ6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgZmlyc3ROYW1lOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGxhc3ROYW1lOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIG5hdGlvbmFsaXR5OlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBoYW5kaWNhcEluZGV4OlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyXHJcbiAqICAgICAgICAgIGFjY2Vzc1Rva2VuOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJVc2VyUmVxdWVzdCB7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgbGFzdE5hbWU6IHN0cmluZztcclxuICAgIG5hdGlvbmFsaXR5OiBzdHJpbmc7XHJcbiAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IHN0cmluZztcclxuICAgIGhhbmRpY2FwSW5kZXg6IG51bWJlcjtcclxuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUmVnaXN0ZXJVc2VyUmVxdWVzdFNjaGVtYSA9IFtcclxuICAgIGNoZWNrKCdlbWFpbCcpLmlzRW1haWwoKSxcclxuICAgIGNoZWNrKCdwYXNzd29yZCcpLmlzTGVuZ3RoKHsgbWluOiA1IH0pLFxyXG4gICAgY2hlY2soXCJmaXJzdE5hbWVcIikuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KSxcclxuICAgIGNoZWNrKFwibGFzdE5hbWVcIikuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KSxcclxuICAgIGNoZWNrQ291bnRyeShcIm5hdGlvbmFsaXR5XCIpLFxyXG4gICAgY2hlY2tDb3VudHJ5KFwiY291bnRyeU9mUmVzaWRlbmNlXCIpLFxyXG4gICAgY2hlY2soXCJoYW5kaWNhcEluZGV4XCIpLmV4aXN0cyh7IGNoZWNrRmFsc3k6IHRydWUgfSkuaXNOdW1lcmljKCksXHJcbiAgICBjaGVjaygnYWNjZXNzVG9rZW4nKS5vcHRpb25hbCh7IGNoZWNrRmFsc3k6IHRydWUgfSlcclxuXTsiXX0=