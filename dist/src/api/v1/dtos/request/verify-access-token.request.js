"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccessTokenRequestSchema = exports.VerifyAccessTokenRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  VerifyAccessTokenRequest:
 *      type: object
 *      required:
 *          - accessToken
 *      properties:
 *          accessToken:
 *              type: string
 */
class VerifyAccessTokenRequest {
}
exports.VerifyAccessTokenRequest = VerifyAccessTokenRequest;
exports.VerifyAccessTokenRequestSchema = [
    check('accessToken').exists({ checkFalsy: true })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LWFjY2Vzcy10b2tlbi5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvdmVyaWZ5LWFjY2Vzcy10b2tlbi5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMvQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSx3QkFBd0I7Q0FFcEM7QUFGRCw0REFFQztBQUVZLFFBQUEsOEJBQThCLEdBQUc7SUFDMUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjaGVjayB9ID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpO1xyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBWZXJpZnlBY2Nlc3NUb2tlblJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gYWNjZXNzVG9rZW5cclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBhY2Nlc3NUb2tlbjpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZlcmlmeUFjY2Vzc1Rva2VuUmVxdWVzdCB7XHJcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgVmVyaWZ5QWNjZXNzVG9rZW5SZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2soJ2FjY2Vzc1Rva2VuJykuZXhpc3RzKHsgY2hlY2tGYWxzeTogdHJ1ZSB9KVxyXG5dO1xyXG4iXX0=