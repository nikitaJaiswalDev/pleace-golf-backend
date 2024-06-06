"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileRequestSchema = exports.UpdateUserProfileRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  UpdateUserProfileRequest:
 *      type: object
 *      required:
 *          - firstName
 *          - lastName
 *          - nationality
 *          - countryOfResidence
 *          - handicapIndex
 *          - homeClub
 *          - gender
 *      properties:
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
 *          homeClub:
 *              type: string
 *          gender:
 *              type: string
 *              enum: [MALE, FEMALE]
 */
class UpdateUserProfileRequest {
}
exports.UpdateUserProfileRequest = UpdateUserProfileRequest;
exports.UpdateUserProfileRequestSchema = [
    (0, validator_1.checkId)('userId'),
    check("firstName").exists({ checkFalsy: true }),
    check("lastName").exists({ checkFalsy: true }),
    (0, validator_1.checkCountry)("nationality"),
    (0, validator_1.checkCountry)("countryOfResidence"),
    check("handicapIndex").exists({ checkFalsy: true }).isNumeric(),
    //check("homeClub").exists({ checkFalsy: true }),
    check("gender").exists({ checkFalsy: true }).isIn(["MALE", "FEMALE"])
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXVzZXItcHJvZmlsZS5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvdXBkYXRlLXVzZXItcHJvZmlsZS5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFFQUE4RTtBQUk5RSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsTUFBYSx3QkFBd0I7Q0EyQnBDO0FBM0JELDREQTJCQztBQUVZLFFBQUEsOEJBQThCLEdBQUc7SUFDMUMsSUFBQSxtQkFBTyxFQUFDLFFBQVEsQ0FBQztJQUNqQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQy9DLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDOUMsSUFBQSx3QkFBWSxFQUFDLGFBQWEsQ0FBQztJQUMzQixJQUFBLHdCQUFZLEVBQUMsb0JBQW9CLENBQUM7SUFDbEMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUMvRCxpREFBaUQ7SUFDakQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztDQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2VuZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzL2dlbmRlci5lbnVtXCI7XHJcbmltcG9ydCB7IGNoZWNrQ291bnRyeSwgY2hlY2tJZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24vdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7IFB1YmxpY1Byb2ZpbGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvcHVibGljLXByb2ZpbGVcIjtcclxuaW1wb3J0IHsgQ29udGFjdERldGFpbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvY29udGFjdC1kZXRhaWxzXCI7XHJcblxyXG5jb25zdCB7IGNoZWNrIH0gPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7XHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBVcGRhdGVVc2VyUHJvZmlsZVJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gZmlyc3ROYW1lXHJcbiAqICAgICAgICAgIC0gbGFzdE5hbWVcclxuICogICAgICAgICAgLSBuYXRpb25hbGl0eVxyXG4gKiAgICAgICAgICAtIGNvdW50cnlPZlJlc2lkZW5jZVxyXG4gKiAgICAgICAgICAtIGhhbmRpY2FwSW5kZXhcclxuICogICAgICAgICAgLSBob21lQ2x1YlxyXG4gKiAgICAgICAgICAtIGdlbmRlclxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIGZpcnN0TmFtZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBsYXN0TmFtZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBuYXRpb25hbGl0eTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgaGFuZGljYXBJbmRleDpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICBob21lQ2x1YjpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBnZW5kZXI6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgIGVudW06IFtNQUxFLCBGRU1BTEVdXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXBkYXRlVXNlclByb2ZpbGVSZXF1ZXN0IHtcclxuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgbGFzdE5hbWU6IHN0cmluZztcclxuICAgIG5hdGlvbmFsaXR5OiBzdHJpbmc7XHJcbiAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IHN0cmluZztcclxuICAgIHN0YXRlOiBzdHJpbmc7XHJcbiAgICBoYW5kaWNhcEluZGV4OiBudW1iZXI7XHJcbiAgICBob21lQ2x1Yjogc3RyaW5nO1xyXG4gICAgZ2VuZGVyOiBHZW5kZXI7XHJcbiAgICBwdWJsaWNQcm9maWxlcz8gOiBQdWJsaWNQcm9maWxlW107XHJcbiAgICBpbWFnZURhdGE/IDogc3RyaW5nO1xyXG4gICAgcHJvZmVzc2lvbj86IHN0cmluZztcclxuICAgIGhvbWVQYWdlPzogc3RyaW5nO1xyXG4gICAgb3RoZXJMaW5rcz86IHN0cmluZztcclxuICAgIHNob3J0VXBkYXRlPyA6IHN0cmluZztcclxuICAgIGJpb2dyYXBoeSA/IDogc3RyaW5nO1xyXG4gICAgb3duQ2hhcml0eUxpbmsgPyA6IHN0cmluZztcclxuICAgIHN1cHBvcnRDaGFyaXRpZXMgPyA6IHN0cmluZztcclxuICAgIHZpZGVvTXNnTGluayA/IDogc3RyaW5nO1xyXG4gICAgc3BvbnNvcnNMaW5rID8gOiBzdHJpbmc7XHJcbiAgICBzaG9wTGluayA/IDogc3RyaW5nO1xyXG4gICAgbWVyY2hhbmRpc2VMaW5rID8gOiBzdHJpbmc7XHJcbiAgICBtYW5hZ2VyRGV0YWlscyA/IDogQ29udGFjdERldGFpbHM7XHJcbiAgICBwdWJsaWNpc3REZXRhaWxzID8gOiBDb250YWN0RGV0YWlscztcclxuICAgIGFnZW50RGV0YWlscyA/IDogQ29udGFjdERldGFpbHM7XHJcbiAgICBzaW5nRm9yQ2hhcml0eT86IHN0cmluZztcclxuICAgIHBsYXlHb2xmPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgVXBkYXRlVXNlclByb2ZpbGVSZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2tJZCgndXNlcklkJyksXHJcbiAgICBjaGVjayhcImZpcnN0TmFtZVwiKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pLFxyXG4gICAgY2hlY2soXCJsYXN0TmFtZVwiKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pLFxyXG4gICAgY2hlY2tDb3VudHJ5KFwibmF0aW9uYWxpdHlcIiksXHJcbiAgICBjaGVja0NvdW50cnkoXCJjb3VudHJ5T2ZSZXNpZGVuY2VcIiksXHJcbiAgICBjaGVjayhcImhhbmRpY2FwSW5kZXhcIikuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KS5pc051bWVyaWMoKSxcclxuICAgIC8vY2hlY2soXCJob21lQ2x1YlwiKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pLFxyXG4gICAgY2hlY2soXCJnZW5kZXJcIikuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KS5pc0luKFtcIk1BTEVcIiwgXCJGRU1BTEVcIl0pXHJcbl07Il19