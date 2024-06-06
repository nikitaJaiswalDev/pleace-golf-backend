"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyAccessTokenRequestSchema = exports.ApplyAccessTokenRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  ApplyAccessTokenRequest:
 *      type: object
 *      required:
 *          - accessToken
 *      properties:
 *          accessToken:
 *              type: string
 */
class ApplyAccessTokenRequest {
}
exports.ApplyAccessTokenRequest = ApplyAccessTokenRequest;
exports.ApplyAccessTokenRequestSchema = [
    check('accessToken').exists({ checkFalsy: true })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktYWNjZXNzLXRva2VuLnJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2R0b3MvcmVxdWVzdC9hcHBseS1hY2Nlc3MtdG9rZW4ucmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsdUJBQXVCO0NBRW5DO0FBRkQsMERBRUM7QUFFWSxRQUFBLDZCQUE2QixHQUFHO0lBQ3pDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgQXBwbHlBY2Nlc3NUb2tlblJlcXVlc3Q6XHJcbiAqICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgIC0gYWNjZXNzVG9rZW5cclxuICogICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICBhY2Nlc3NUb2tlbjpcclxuICogICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcGx5QWNjZXNzVG9rZW5SZXF1ZXN0IHtcclxuICAgIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBcHBseUFjY2Vzc1Rva2VuUmVxdWVzdFNjaGVtYSA9IFtcclxuICAgIGNoZWNrKCdhY2Nlc3NUb2tlbicpLmV4aXN0cyh7IGNoZWNrRmFsc3k6IHRydWUgfSlcclxuXTtcclxuIl19