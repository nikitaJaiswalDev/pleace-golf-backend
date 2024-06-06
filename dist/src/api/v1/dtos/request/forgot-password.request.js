"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRequestSchema = exports.ForgotPasswordRequest = void 0;
const { check } = require("express-validator");
/**
 * @swagger
 * definitions:
 *  ForgotPasswordRequest:
 *      type: object
 *      required:
 *          - email
 *      properties:
 *          email:
 *              type: string
 */
class ForgotPasswordRequest {
}
exports.ForgotPasswordRequest = ForgotPasswordRequest;
exports.ForgotPasswordRequestSchema = [
    check('email').isEmail()
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLnJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2R0b3MvcmVxdWVzdC9mb3Jnb3QtcGFzc3dvcmQucmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFFWSxRQUFBLDJCQUEyQixHQUFHO0lBQ3ZDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7Q0FDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2hlY2sgfSA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGRlZmluaXRpb25zOlxyXG4gKiAgRm9yZ290UGFzc3dvcmRSZXF1ZXN0OlxyXG4gKiAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAtIGVtYWlsXHJcbiAqICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3Jnb3RQYXNzd29yZFJlcXVlc3Qge1xyXG4gICAgZW1haWw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEZvcmdvdFBhc3N3b3JkUmVxdWVzdFNjaGVtYSA9IFtcclxuICAgIGNoZWNrKCdlbWFpbCcpLmlzRW1haWwoKVxyXG5dO1xyXG4iXX0=