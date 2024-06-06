"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileResponse = void 0;
/**
 * @swagger
 * definitions:
 *  UserProfileResponse:
 *      type: object
 *      properties:
 *          userId:
 *              type: string
 *          email:
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
 *          homeClub:
 *              type: string
 *          gender:
 *              type: string
 *              enum: [MALE, FEMALE]
 *          accountStatus:
 *              type: string
 *              enum: [ACTIVE, INACTIVE, DISABLED]
 *          division:
 *              type: string
 *              enum: [Champ, Celebrity, Professional Golfer]
 */
class UserProfileResponse {
}
exports.UserProfileResponse = UserProfileResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9kdG9zL3Jlc3BvbnNlL3VzZXItcHJvZmlsZS5yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQWEsbUJBQW1CO0NBZ0MvQjtBQWhDRCxrREFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50U3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzL2FjY291bnQtc3RhdHVzLmVudW1cIjtcclxuaW1wb3J0IHsgQ29udGFjdERldGFpbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvY29udGFjdC1kZXRhaWxzXCI7XHJcbmltcG9ydCB7IEdlbmRlciB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9nZW5kZXIuZW51bVwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IFB1YmxpY1Byb2ZpbGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXMvcHVibGljLXByb2ZpbGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIFVzZXJQcm9maWxlUmVzcG9uc2U6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgdXNlcklkOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGVtYWlsOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgIGZpcnN0TmFtZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBsYXN0TmFtZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBuYXRpb25hbGl0eTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgaGFuZGljYXBJbmRleDpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICBob21lQ2x1YjpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBnZW5kZXI6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgIGVudW06IFtNQUxFLCBGRU1BTEVdXHJcbiAqICAgICAgICAgIGFjY291bnRTdGF0dXM6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgIGVudW06IFtBQ1RJVkUsIElOQUNUSVZFLCBESVNBQkxFRF1cclxuICogICAgICAgICAgZGl2aXNpb246XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgIGVudW06IFtDaGFtcCwgQ2VsZWJyaXR5LCBQcm9mZXNzaW9uYWwgR29sZmVyXVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlUmVzcG9uc2Uge1xyXG4gICAgdXNlcklkOiBzdHJpbmc7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgZmlyc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBsYXN0TmFtZTogc3RyaW5nO1xyXG4gICAgbmF0aW9uYWxpdHk6IHN0cmluZztcclxuICAgIGNvdW50cnlPZlJlc2lkZW5jZTogc3RyaW5nO1xyXG4gICAgc3RhdGU6IHN0cmluZztcclxuICAgIGhhbmRpY2FwSW5kZXg6IG51bWJlcjtcclxuICAgIGhvbWVDbHViPzogc3RyaW5nO1xyXG4gICAgZ2VuZGVyPzogR2VuZGVyO1xyXG4gICAgYWNjb3VudFN0YXR1czogQWNjb3VudFN0YXR1cztcclxuICAgIGRpdmlzaW9uOiBHb2xmRGl2aXNpb247XHJcbiAgICBpc0FkbWluIDogYm9vbGVhbjtcclxuICAgIHB1YmxpY1Byb2ZpbGVzPyA6IFB1YmxpY1Byb2ZpbGVbXTtcclxuICAgIGltYWdlRGF0YT8gOiBzdHJpbmdcclxuICAgIHByb2Zlc3Npb24/OiBzdHJpbmc7XHJcbiAgICBob21lUGFnZT86IHN0cmluZztcclxuICAgIG90aGVyTGlua3M/OiBzdHJpbmc7XHJcbiAgICBzaG9ydFVwZGF0ZT8gOiBzdHJpbmc7XHJcbiAgICBiaW9ncmFwaHkgPyA6IHN0cmluZztcclxuICAgIG93bkNoYXJpdHlMaW5rID8gOiBzdHJpbmc7XHJcbiAgICBzdXBwb3J0Q2hhcml0aWVzID8gOiBzdHJpbmc7XHJcbiAgICB2aWRlb01zZ0xpbmsgPyA6IHN0cmluZztcclxuICAgIHNwb25zb3JzTGluayA/IDogc3RyaW5nO1xyXG4gICAgc2hvcExpbmsgPyA6IHN0cmluZztcclxuICAgIG1lcmNoYW5kaXNlTGluayA/IDogc3RyaW5nO1xyXG4gICAgbWFuYWdlckRldGFpbHMgPyA6IENvbnRhY3REZXRhaWxzO1xyXG4gICAgcHVibGljaXN0RGV0YWlscyA/IDogQ29udGFjdERldGFpbHM7XHJcbiAgICBhZ2VudERldGFpbHMgPyA6IENvbnRhY3REZXRhaWxzO1xyXG4gICAgcGxheUdvbGYgPyA6IHN0cmluZztcclxuICAgIHNpbmdGb3JDaGFyaXR5ID8gOiBzdHJpbmc7XHJcbn0iXX0=