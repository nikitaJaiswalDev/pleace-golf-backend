"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserProfileRequestSchema = exports.DeleteUserProfileRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  DeleteUserProfileRequest:
 *      type: object
 *      required:
 *          - password
 *      properties:
 *          password:
 *              type: string
 */
class DeleteUserProfileRequest {
}
exports.DeleteUserProfileRequest = DeleteUserProfileRequest;
exports.DeleteUserProfileRequestSchema = [
    (0, validator_1.checkId)('userId'),
    check('password').isLength({ min: 5 }),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXVzZXItcHJvZmlsZS5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvZGVsZXRlLXVzZXItcHJvZmlsZS5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUFnRTtBQUVoRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsd0JBQXdCO0NBRXBDO0FBRkQsNERBRUM7QUFFWSxRQUFBLDhCQUE4QixHQUFHO0lBQzFDLElBQUEsbUJBQU8sRUFBQyxRQUFRLENBQUM7SUFDakIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2hlY2tJZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24vdmFsaWRhdG9yXCI7XHJcblxyXG5jb25zdCB7IGNoZWNrIH0gPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7XHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIERlbGV0ZVVzZXJQcm9maWxlUmVxdWVzdDpcclxuICogICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICByZXF1aXJlZDpcclxuICogICAgICAgICAgLSBwYXNzd29yZFxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIHBhc3N3b3JkOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGVsZXRlVXNlclByb2ZpbGVSZXF1ZXN0IHtcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBEZWxldGVVc2VyUHJvZmlsZVJlcXVlc3RTY2hlbWEgPSBbXHJcbiAgICBjaGVja0lkKCd1c2VySWQnKSxcclxuICAgIGNoZWNrKCdwYXNzd29yZCcpLmlzTGVuZ3RoKHsgbWluOiA1IH0pLFxyXG5dO1xyXG4iXX0=