"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserPasswordRequestSchema = exports.ChangeUserPasswordRequest = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  ChangeUserPasswordRequest:
 *      type: object
 *      required:
 *          - oldPassword
 *          - newPassword
 *      properties:
 *          oldPassword:
 *              type: string
 *          newPassword:
 *              type: string
 */
class ChangeUserPasswordRequest {
}
exports.ChangeUserPasswordRequest = ChangeUserPasswordRequest;
exports.ChangeUserPasswordRequestSchema = [
    (0, validator_1.checkId)('userId'),
    check('oldPassword').isLength({ min: 5 }),
    check('newPassword').isLength({ min: 5 })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLXVzZXItcGFzc3dvcmQucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvZHRvcy9yZXF1ZXN0L2NoYW5nZS11c2VyLXBhc3N3b3JkLnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQWdFO0FBRWhFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMvQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBYSx5QkFBeUI7Q0FHckM7QUFIRCw4REFHQztBQUVZLFFBQUEsK0JBQStCLEdBQUc7SUFDM0MsSUFBQSxtQkFBTyxFQUFDLFFBQVEsQ0FBQztJQUNqQixLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3pDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNoZWNrSWQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uL3ZhbGlkYXRvclwiO1xyXG5cclxuY29uc3QgeyBjaGVjayB9ID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpO1xyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBDaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIG9sZFBhc3N3b3JkXHJcbiAqICAgICAgICAgIC0gbmV3UGFzc3dvcmRcclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBvbGRQYXNzd29yZDpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBuZXdQYXNzd29yZDpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3Qge1xyXG4gICAgb2xkUGFzc3dvcmQ6IHN0cmluZztcclxuICAgIG5ld1Bhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2tJZCgndXNlcklkJyksXHJcbiAgICBjaGVjaygnb2xkUGFzc3dvcmQnKS5pc0xlbmd0aCh7IG1pbjogNSB9KSxcclxuICAgIGNoZWNrKCduZXdQYXNzd29yZCcpLmlzTGVuZ3RoKHsgbWluOiA1IH0pXHJcbl07XHJcbiJdfQ==