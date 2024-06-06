"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentResponse = void 0;
/**
 * @swagger
 * definitions:
 *  TournamentResponse:
 *      type: object
 *      properties:
 *          tournamentId:
 *              type: string
 *          name:
 *              type: string
 *          regStartDate:
 *              type: string
 *              description: ISO 8601 format. pattern - YYYY-MM-DDTHH:mm:ss.sssZ
 *          regEndDate:
 *              type: string
 *              description: ISO 8601 format. pattern - YYYY-MM-DDTHH:mm:ss.sssZ
 *          startDate:
 *              type: string
 *              description: ISO 8601 format. pattern - YYYY-MM-DDTHH:mm:ss.sssZ
 *          endDate:
 *              type: string
 *              description: ISO 8601 format. pattern - YYYY-MM-DDTHH:mm:ss.sssZ
 *          divisions:
 *              type: array
 *              items:
 *                  type: string
 *                  enum: [Champ, Celebrity, Professional Golfer]
 *          courses:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/GolfCourseResponse'
 *
 */
class TournamentResponse {
}
exports.TournamentResponse = TournamentResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91cm5hbWVudC5yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvZHRvcy9yZXNwb25zZS90b3VybmFtZW50LnJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQWEsa0JBQWtCO0NBa0I5QjtBQWxCRCxnREFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb2xmQ291cnNlUmVzcG9uc2UgfSBmcm9tIFwiLi9nb2xmLWNvdXJzZS5yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzL2dvbGYtY2x1YlwiO1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgVG91cm5hbWVudFJlc3BvbnNlOlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIHRvdXJuYW1lbnRJZDpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBuYW1lOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIHJlZ1N0YXJ0RGF0ZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IElTTyA4NjAxIGZvcm1hdC4gcGF0dGVybiAtIFlZWVktTU0tRERUSEg6bW06c3Muc3NzWlxyXG4gKiAgICAgICAgICByZWdFbmREYXRlOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogSVNPIDg2MDEgZm9ybWF0LiBwYXR0ZXJuIC0gWVlZWS1NTS1ERFRISDptbTpzcy5zc3NaXHJcbiAqICAgICAgICAgIHN0YXJ0RGF0ZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IElTTyA4NjAxIGZvcm1hdC4gcGF0dGVybiAtIFlZWVktTU0tRERUSEg6bW06c3Muc3NzWlxyXG4gKiAgICAgICAgICBlbmREYXRlOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogSVNPIDg2MDEgZm9ybWF0LiBwYXR0ZXJuIC0gWVlZWS1NTS1ERFRISDptbTpzcy5zc3NaXHJcbiAqICAgICAgICAgIGRpdmlzaW9uczpcclxuICogICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgICBlbnVtOiBbQ2hhbXAsIENlbGVicml0eSwgUHJvZmVzc2lvbmFsIEdvbGZlcl1cclxuICogICAgICAgICAgY291cnNlczpcclxuICogICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Hb2xmQ291cnNlUmVzcG9uc2UnXHJcbiAqICAgICAgICAgICAgICAgICAgXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudFJlc3BvbnNlIHtcclxuICAgIHRvdXJuYW1lbnRJZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcmVnU3RhcnREYXRlOiBzdHJpbmc7XHJcbiAgICByZWdFbmREYXRlOiBzdHJpbmc7XHJcbiAgICBzdGFydERhdGU6IHN0cmluZztcclxuICAgIGVuZERhdGU6IHN0cmluZztcclxuICAgIGRpdmlzaW9uczogR29sZkRpdmlzaW9uW107XHJcbiAgICBjb3Vyc2VzOiBHb2xmQ291cnNlUmVzcG9uc2VbXTtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICBtYXhQbGF5ZXJzPzpudW1iZXI7XHJcbiAgICB0b3VybmFtZW50RGlyZWN0b3I/OmJvb2xlYW47XHJcbiAgICBjaGFsbGVuZ2Vycz86c3RyaW5nW107XHJcbiAgICBjcmVhdGVkQnk/IDogc3RyaW5nO1xyXG4gICAgcm91bmRzPzpudW1iZXI7XHJcbiAgICBsZWFkZXJib2FyZEN1dD86bnVtYmVyO1xyXG4gICAgaG9zdGluZ0NvdW50cnk/OiBzdHJpbmc7XHJcbiAgICBob3N0aW5nQ2x1Yj8gOiBHb2xmQ2x1YjtcclxufSJdfQ==