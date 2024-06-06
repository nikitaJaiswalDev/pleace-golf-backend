"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetUserPasswordRequestSchema = exports.ResetUserPasswordRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  ResetUserPasswordRequest:
 *      type: object
 *      required:
 *          - email
 *          - verificationCode
 *          - newPassword
 *      properties:
 *          email:
 *              type: string
 *          verificationCode:
 *              type: string
 *          newPassword:
 *              type: string
 */
class ResetUserPasswordRequest {
}
exports.ResetUserPasswordRequest = ResetUserPasswordRequest;
exports.ResetUserPasswordRequestSchema = [
    check('email').isEmail(),
    check('verificationCode').exists({ checkFalsy: true }),
    check('newPassword').isLength({ min: 5 }),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtdXNlci1wYXNzd29yZC5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvcmVzZXQtdXNlci1wYXNzd29yZC5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQWEsd0JBQXdCO0NBSXBDO0FBSkQsNERBSUM7QUFFWSxRQUFBLDhCQUE4QixHQUFHO0lBQzFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7SUFDeEIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3RELEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgUmVzZXRVc2VyUGFzc3dvcmRSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIGVtYWlsXHJcbiAqICAgICAgICAgIC0gdmVyaWZpY2F0aW9uQ29kZVxyXG4gKiAgICAgICAgICAtIG5ld1Bhc3N3b3JkXHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBuZXdQYXNzd29yZDpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlc2V0VXNlclBhc3N3b3JkUmVxdWVzdCB7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgdmVyaWZpY2F0aW9uQ29kZTogc3RyaW5nO1xyXG4gICAgbmV3UGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJlc2V0VXNlclBhc3N3b3JkUmVxdWVzdFNjaGVtYSA9IFtcclxuICAgIGNoZWNrKCdlbWFpbCcpLmlzRW1haWwoKSxcclxuICAgIGNoZWNrKCd2ZXJpZmljYXRpb25Db2RlJykuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KSxcclxuICAgIGNoZWNrKCduZXdQYXNzd29yZCcpLmlzTGVuZ3RoKHsgbWluOiA1IH0pLFxyXG5dO1xyXG4iXX0=