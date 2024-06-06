"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GolfHoleRequest = exports.CourseTeeRequest = exports.CourseTeesRequest = exports.AddCourseTeeRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  AddCourseTeeRequest:
 *      type: object
 *      required:
 *          - courses
 *      properties:
 *          courses:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/CourseTeesRequest'
 */
class AddCourseTeeRequest {
}
exports.AddCourseTeeRequest = AddCourseTeeRequest;
/**
 * @swagger
 * definitions:
 *  CourseTeesRequest:
 *      type: object
 *      required:
 *          - courseId
 *          - tees
 *      properties:
 *          courseId:
 *              type: string
 *          tees:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/CourseTeeRequest'
 */
class CourseTeesRequest {
}
exports.CourseTeesRequest = CourseTeesRequest;
/**
 * @swagger
 * definitions:
 *  CourseTeeRequest:
 *      type: object
 *      required:
 *          - name
 *          - gender
 *          - courseRating
 *          - slopeRating
 *          - par
 *          - holes
 *      properties:
 *          name:
 *              type: string
 *          gender:
 *              type: string
 *              enum: [MALE, FEMALE]
 *          courseRating:
 *              type: number
 *          slopeRating:
 *              type: number
 *          par:
 *              type: number
 *          holes:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/GolfHoleRequest'
 */
class CourseTeeRequest {
}
exports.CourseTeeRequest = CourseTeeRequest;
/**
 * @swagger
 * definitions:
 *  GolfHoleRequest:
 *      type: object
 *      required:
 *          - hole
 *          - par
 *      properties:
 *          hole:
 *              type: number
 *          par:
 *              type: number
 */
class GolfHoleRequest {
}
exports.GolfHoleRequest = GolfHoleRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWNvdXJzZS10ZWUucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvZHRvcy9yZXF1ZXN0L2FkZC1jb3Vyc2UtdGVlLnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRS9DOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQWEsbUJBQW1CO0NBRS9CO0FBRkQsa0RBRUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFhLGlCQUFpQjtDQUc3QjtBQUhELDhDQUdDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFhLGdCQUFnQjtDQU81QjtBQVBELDRDQU9DO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQWEsZUFBZTtDQUczQjtBQUhELDBDQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2VuZGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzL2dlbmRlci5lbnVtXCI7XHJcbmltcG9ydCB7IGNoZWNrQ291bnRyeSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24vdmFsaWRhdG9yXCI7XHJcblxyXG5jb25zdCB7IGNoZWNrIH0gPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7XHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBBZGRDb3Vyc2VUZWVSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIGNvdXJzZXNcclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBjb3Vyc2VzOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICogICAgICAgICAgICAgIGl0ZW1zOlxyXG4gKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0NvdXJzZVRlZXNSZXF1ZXN0J1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFkZENvdXJzZVRlZVJlcXVlc3Qge1xyXG4gICAgY291cnNlczogQ291cnNlVGVlc1JlcXVlc3RbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgQ291cnNlVGVlc1JlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gY291cnNlSWRcclxuICogICAgICAgICAgLSB0ZWVzXHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgY291cnNlSWQ6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgdGVlczpcclxuICogICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Db3Vyc2VUZWVSZXF1ZXN0J1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvdXJzZVRlZXNSZXF1ZXN0IHtcclxuICAgIGNvdXJzZUlkOiBzdHJpbmc7XHJcbiAgICB0ZWVzOiBDb3Vyc2VUZWVSZXF1ZXN0W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIENvdXJzZVRlZVJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gbmFtZVxyXG4gKiAgICAgICAgICAtIGdlbmRlclxyXG4gKiAgICAgICAgICAtIGNvdXJzZVJhdGluZ1xyXG4gKiAgICAgICAgICAtIHNsb3BlUmF0aW5nXHJcbiAqICAgICAgICAgIC0gcGFyXHJcbiAqICAgICAgICAgIC0gaG9sZXNcclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBuYW1lOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGdlbmRlcjpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgZW51bTogW01BTEUsIEZFTUFMRV1cclxuICogICAgICAgICAgY291cnNlUmF0aW5nOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyXHJcbiAqICAgICAgICAgIHNsb3BlUmF0aW5nOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyXHJcbiAqICAgICAgICAgIHBhcjpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICBob2xlczpcclxuICogICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Hb2xmSG9sZVJlcXVlc3QnXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ291cnNlVGVlUmVxdWVzdCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBnZW5kZXI6IEdlbmRlcjtcclxuICAgIGNvdXJzZVJhdGluZzogbnVtYmVyO1xyXG4gICAgc2xvcGVSYXRpbmc6IG51bWJlcjtcclxuICAgIHBhcjogbnVtYmVyO1xyXG4gICAgaG9sZXM6IEdvbGZIb2xlUmVxdWVzdFtdO1xyXG59XHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogZGVmaW5pdGlvbnM6XHJcbiAqICBHb2xmSG9sZVJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gaG9sZVxyXG4gKiAgICAgICAgICAtIHBhclxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIGhvbGU6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBudW1iZXJcclxuICogICAgICAgICAgcGFyOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29sZkhvbGVSZXF1ZXN0IHtcclxuICAgIGhvbGU6IG51bWJlcjtcclxuICAgIHBhcjogbnVtYmVyO1xyXG59Il19