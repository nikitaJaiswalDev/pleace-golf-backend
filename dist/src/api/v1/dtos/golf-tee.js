"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GolfTee = void 0;
/**
 * @swagger
 * definitions:
 *  GolfTee:
 *      type: object
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
 *                  $ref: '#/definitions/GolfHoleResponse'
 *
 */
class GolfTee {
}
exports.GolfTee = GolfTee;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZi10ZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2R0b3MvZ29sZi10ZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFhLE9BQU87Q0FRbkI7QUFSRCwwQkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdlbmRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlcy9nZW5kZXIuZW51bVwiO1xyXG5pbXBvcnQgeyBHb2xmSG9sZVJlc3BvbnNlIH0gZnJvbSBcIi4vcmVzcG9uc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIEdvbGZUZWU6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgbmFtZTpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICBnZW5kZXI6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgIGVudW06IFtNQUxFLCBGRU1BTEVdXHJcbiAqICAgICAgICAgIGNvdXJzZVJhdGluZzpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICBzbG9wZVJhdGluZzpcclxuICogICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICBwYXI6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBudW1iZXJcclxuICogICAgICAgICAgaG9sZXM6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvR29sZkhvbGVSZXNwb25zZSdcclxuICogICAgICAgICAgICAgIFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdvbGZUZWUge1xyXG4gICAgX2lkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBnZW5kZXI6IEdlbmRlcjtcclxuICAgIGNvdXJzZVJhdGluZzogbnVtYmVyO1xyXG4gICAgc2xvcGVSYXRpbmc6IG51bWJlcjtcclxuICAgIHBhcjogbnVtYmVyO1xyXG4gICAgaG9sZXM6IEdvbGZIb2xlUmVzcG9uc2VbXTtcclxufSJdfQ==