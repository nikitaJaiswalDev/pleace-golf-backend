"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryResponse = void 0;
/**
 * @swagger
 * definitions:
 *  CountryResponse:
 *      type: object
 *      required:
 *          - name
 *          - nationality
 *          - hasSubdivision
 *      properties:
 *          name:
 *              type: string
 *          nationality:
 *              type: string
 *          hasSubdivision:
 *              type: boolean
 *              description: Whether the country has children countries (countries that have a subdivision code that contains this countries alpha2 code)
 *          code:
 *              type: string
 *              description: Alpha2 country code or subdivision code
 */
class CountryResponse {
}
exports.CountryResponse = CountryResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS5yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvZHRvcy9yZXNwb25zZS9jb3VudHJ5LnJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQWEsZUFBZTtDQU0zQjtBQU5ELDBDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBkZWZpbml0aW9uczpcclxuICogIENvdW50cnlSZXNwb25zZTpcclxuICogICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICByZXF1aXJlZDpcclxuICogICAgICAgICAgLSBuYW1lXHJcbiAqICAgICAgICAgIC0gbmF0aW9uYWxpdHlcclxuICogICAgICAgICAgLSBoYXNTdWJkaXZpc2lvblxyXG4gKiAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgIG5hbWU6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgbmF0aW9uYWxpdHk6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgaGFzU3ViZGl2aXNpb246XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBib29sZWFuXHJcbiAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogV2hldGhlciB0aGUgY291bnRyeSBoYXMgY2hpbGRyZW4gY291bnRyaWVzIChjb3VudHJpZXMgdGhhdCBoYXZlIGEgc3ViZGl2aXNpb24gY29kZSB0aGF0IGNvbnRhaW5zIHRoaXMgY291bnRyaWVzIGFscGhhMiBjb2RlKVxyXG4gKiAgICAgICAgICBjb2RlOlxyXG4gKiAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogQWxwaGEyIGNvdW50cnkgY29kZSBvciBzdWJkaXZpc2lvbiBjb2RlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ291bnRyeVJlc3BvbnNlIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIG5hdGlvbmFsaXR5OiBzdHJpbmc7XHJcbiAgICBoYXNTdWJkaXZpc2lvbjogYm9vbGVhbjtcclxuICAgIGNvZGU/OiBzdHJpbmc7XHJcbiAgICBpc1N0YXRlOiBib29sZWFuO1xyXG59Il19