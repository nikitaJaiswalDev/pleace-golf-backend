"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyUserEmailRequestSchema = exports.VerifyUserEmailRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  VerifyUserEmailRequest:
 *      type: object
 *      required:
 *          - email
 *          - verificationCode
 *      properties:
 *          email:
 *              type: string
 *          verificationCode:
 *              type: string
 */
class VerifyUserEmailRequest {
}
exports.VerifyUserEmailRequest = VerifyUserEmailRequest;
exports.VerifyUserEmailRequestSchema = [
    check('email').isEmail(),
    check('verificationCode').exists({ checkFalsy: true })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXVzZXItZW1haWwucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvZHRvcy9yZXF1ZXN0L3ZlcmlmeS11c2VyLWVtYWlsLnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQy9DOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFhLHNCQUFzQjtDQUdsQztBQUhELHdEQUdDO0FBRVksUUFBQSw0QkFBNEIsR0FBRztJQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO0lBQ3hCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjaGVjayB9ID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpO1xyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBWZXJpZnlVc2VyRW1haWxSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIGVtYWlsXHJcbiAqICAgICAgICAgIC0gdmVyaWZpY2F0aW9uQ29kZVxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIGVtYWlsOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIHZlcmlmaWNhdGlvbkNvZGU6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWZXJpZnlVc2VyRW1haWxSZXF1ZXN0IHtcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBWZXJpZnlVc2VyRW1haWxSZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2soJ2VtYWlsJykuaXNFbWFpbCgpLFxyXG4gICAgY2hlY2soJ3ZlcmlmaWNhdGlvbkNvZGUnKS5leGlzdHMoeyBjaGVja0ZhbHN5OiB0cnVlIH0pXHJcbl07XHJcbiJdfQ==