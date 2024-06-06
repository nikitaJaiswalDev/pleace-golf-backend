"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserRequestSchema = exports.LoginUserRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  LoginUserRequest:
 *      type: object
 *      required:
 *          - email
 *          - password
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 */
class LoginUserRequest {
}
exports.LoginUserRequest = LoginUserRequest;
exports.LoginUserRequestSchema = [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdXNlci5yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3JlcXVlc3QvbG9naW4tdXNlci5yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMvQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBYSxnQkFBZ0I7Q0FHNUI7QUFIRCw0Q0FHQztBQUVZLFFBQUEsc0JBQXNCLEdBQUc7SUFDbEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtJQUN4QixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0NBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNoZWNrIH0gPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7XHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIExvZ2luVXNlclJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gZW1haWxcclxuICogICAgICAgICAgLSBwYXNzd29yZFxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIGVtYWlsOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIHBhc3N3b3JkOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9naW5Vc2VyUmVxdWVzdCB7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IExvZ2luVXNlclJlcXVlc3RTY2hlbWEgPSBbXHJcbiAgICBjaGVjaygnZW1haWwnKS5pc0VtYWlsKCksXHJcbiAgICBjaGVjaygncGFzc3dvcmQnKS5pc0xlbmd0aCh7IG1pbjogNSB9KVxyXG5dO1xyXG5cclxuIl19