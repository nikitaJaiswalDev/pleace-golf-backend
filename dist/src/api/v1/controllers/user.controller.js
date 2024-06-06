"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const passport = require("passport");
const express_1 = require("express");
const validator_1 = require("../../../core/validation/validator");
const request_1 = require("../dtos/request");
const error_handler_1 = require("../../handlers/error-handler");
const change_user_password_request_1 = require("../dtos/request/change-user-password.request");
const forgot_password_request_1 = require("../dtos/request/forgot-password.request");
const reset_user_password_request_1 = require("../dtos/request/reset-user-password.request");
const user_profile_request_1 = require("../dtos/request/user-profile.request");
const verify_user_email_request_1 = require("../dtos/request/verify-user-email.request");
const update_user_profile_request_1 = require("../dtos/request/update-user-profile.request");
const verify_access_token_request_1 = require("../dtos/request/verify-access-token.request");
const apply_access_token_request_1 = require("../dtos/request/apply-access-token.request");
const mapper_1 = require("../mapper");
const delete_user_profile_request_1 = require("../dtos/request/delete-user-profile.request");
class UserController {
    constructor(userService, authService) {
        this.authService = authService;
        this.userService = userService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.post("/", request_1.RegisterUserRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.registerUser, this));
        this.router.post("/verify-email", verify_user_email_request_1.VerifyUserEmailRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.verifyEmail, this));
        this.router.post("/access-token", verify_access_token_request_1.VerifyAccessTokenRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.verifyAccessToken, this));
        this.router.post("/forgot-password", forgot_password_request_1.ForgotPasswordRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.forgotPassword, this));
        this.router.post("/reset-password", reset_user_password_request_1.ResetUserPasswordRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.resetPassword, this));
        this.router.post("/:userId", passport.authenticate("jwt", { session: false }), update_user_profile_request_1.UpdateUserProfileRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.updateUserProfile, this));
        this.router.get("/:userId", user_profile_request_1.UserProfileRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getUserProfile, this));
        this.router.get("/email/:email", user_profile_request_1.UserProfileRequestSchema, validator_1.validateEmail, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getUserProfileByToken, this));
        this.router.get("/all/users", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getUsers, this));
        this.router.post("/:userId/change-password", passport.authenticate("jwt", { session: false }), change_user_password_request_1.ChangeUserPasswordRequestSchema, validator_1.validate, validator_1.CheckUserIdInPathMatchJWT, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.changePassword, this));
        this.router.post("/:userId/access-token", passport.authenticate("jwt", { session: false }), apply_access_token_request_1.ApplyAccessTokenRequestSchema, validator_1.validate, validator_1.CheckUserIdInPathMatchJWT, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.applyAccessToken, this));
        this.router.post("/:userId/delete-profile", passport.authenticate("jwt", { session: false }), delete_user_profile_request_1.DeleteUserProfileRequestSchema, validator_1.validate, validator_1.CheckUserIdInPathMatchJWT, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.deleteProfile, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /user/:
     *  post:
     *      description: Register a user.
     *      tags:
     *          - User
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: register
     *            type: RegisterUserRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/RegisterUserRequest'
     *      responses:
     *          200:
     *              description: OK
     *          400:
     *              description: Missing or invalid parameter.
     *          500:
     *              description: Server error
     */
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRegistrationForm = req.body;
            console.log({ userRegistrationForm });
            const result = yield this.userService.registerUser(userRegistrationForm);
            res.status(200).send(result);
        });
    }
    /**
    * @swagger
    * /user/verify-email:
    *  post:
    *      description: Verify user email
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: verifyEmail
    *            type: VerifyUserEmailRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/VerifyUserEmailRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyUserEmailRequest = req.body;
            yield this.userService.verifyUserEmail(verifyUserEmailRequest.email, verifyUserEmailRequest.verificationCode);
            res.status(200).send();
        });
    }
    /**
     * @swagger
     * /user/{userId}:
     *  post:
     *      description: Update user profile
     *      tags:
     *          - User
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: userId
     *            type: string
     *            required: true
     *            in: path
     *          - name: updateProfile
     *            type: UpdateUserProfileRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/UpdateUserProfileRequest'
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/UserProfileResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    updateUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const updateUserProfileRequest = req.body;
            const user = yield this.userService.updateUser(userId, updateUserProfileRequest);
            res.status(200).send(mapper_1.Mapper.mapUserToUserProfile(user));
        });
    }
    /**
     * @swagger
     * /user/{userId}:
     *  get:
     *      description: Gets user profile
     *      tags:
     *          - User
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: userId
     *            type: string
     *            required: true
     *            in: path
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/UserProfileResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const user = yield this.userService.getUserById(userId);
            res.status(200).send(mapper_1.Mapper.mapUserToUserProfile(user));
        });
    }
    getUserProfileByToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            const user = yield this.userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            this.authService.authenticateUser(user._id).then((jwt) => {
                res.status(200).send({
                    user: mapper_1.Mapper.mapUserToUserProfile(user),
                    token: jwt,
                });
            });
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUser();
            res.status(200).send(users);
        });
    }
    /**
    * @swagger
    * /user/{userId}/change-password:
    *  post:
    *      description: Change user password
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - in: path
    *            name: userId
    *            required: true
    *            type: string
    *          - name: changePassword
    *            type: ChangeUserPasswordRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/ChangeUserPasswordRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const changeUserPasswordRequest = req.body;
            yield this.userService.changePassword(userId, changeUserPasswordRequest.oldPassword, changeUserPasswordRequest.newPassword);
            res.status(200).send();
        });
    }
    /**
    * @swagger
    * /user/{userId}/access-token:
    *  post:
    *      description: Apply access token
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - in: path
    *            name: userId
    *            required: true
    *            type: string
    *          - name: applyAccessToken
    *            type: ApplyAccessTokenRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/ApplyAccessTokenRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    applyAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const applyAccessTokenRequest = req.body;
            yield this.userService.applyAccessToken(userId, applyAccessTokenRequest.accessToken);
            res.status(200).send();
        });
    }
    /**
    * @swagger
    * /user/{userId}/delete-profile:
    *  post:
    *      description: Delete user profile
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: deleteProfile
    *            type: DeleteUserProfileRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/DeleteUserProfileRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    deleteProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const deleteUserProfileRequest = req.body;
            yield this.userService.deleteUser(userId, deleteUserProfileRequest.password);
            res.status(200).send();
        });
    }
    /**
    * @swagger
    * /user/access-token:
    *  post:
    *      description: Verify access token
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: verifyAccessToken
    *            type: VerifyAccessTokenRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/VerifyAccessTokenRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    verifyAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyAccessTokenRequest = req.body;
            yield this.userService.verifyAccessToken(verifyAccessTokenRequest.accessToken);
            res.status(200).send();
        });
    }
    /**
     * @swagger
     * /user/forgot-password:
     *  post:
     *      description: Request forgot password verification code
     *      tags:
     *          - User
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: forgotPassword
     *            type: ForgotPasswordRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/ForgotPasswordRequest'
     *      responses:
     *          200:
     *              description: OK
     *          400:
     *              description: Missing or invalid parameter
     *          500:
     *              description: Server error
     */
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeUserPasswordRequest = req.body;
            yield this.userService.resetPasswordVerificationCode(changeUserPasswordRequest.email);
            res.status(200).send();
        });
    }
    /**
    * @swagger
    * /user/resetPassword:
    *  post:
    *      description: Reset user password with verification code from forgot password request
    *      tags:
    *          - User
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: resetPassword
    *            type: ResetUserPasswordRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/ResetUserPasswordRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter
    *          500:
    *              description: Server error
    */
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const changeUserPasswordRequest = req.body;
            yield this.userService.resetPassword(changeUserPasswordRequest.email, changeUserPasswordRequest.verificationCode, changeUserPasswordRequest.newPassword);
            res.status(200).send();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQXFDO0FBQ3JDLHFDQUFpQztBQUdqQyxrRUFBd0c7QUFDeEcsNkNBQTREO0FBRzVELGdFQUEwRTtBQUMxRSwrRkFBMEg7QUFDMUgscUZBQTZHO0FBQzdHLDZGQUF1SDtBQUN2SCwrRUFBZ0Y7QUFFaEYseUZBQWlIO0FBQ2pILDZGQUF1SDtBQUN2SCw2RkFBdUg7QUFDdkgsMkZBQW9IO0FBQ3BILHNDQUFtQztBQUNuQyw2RkFBdUg7QUFHdkgsTUFBYSxjQUFjO0lBSXZCLFlBQVksV0FBd0IsRUFBVSxXQUFrQztRQUFsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7UUFDNUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsbUNBQXlCLEVBQUUsb0JBQVEsRUFBRSxJQUFBLDBDQUEwQixFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVoSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsd0RBQTRCLEVBQUUsb0JBQVEsRUFBRSxJQUFBLDBDQUEwQixFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU5SCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsNERBQThCLEVBQUUsb0JBQVEsRUFBRSxJQUFBLDBDQUEwQixFQUFD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QUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7Q0FJSjtBQXRaRCx3Q0FzWkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyUmVnaXN0cmF0aW9uRm9ybSB9IGZyb20gXCIuLi8uLi8uLi90eXBlcy91c2VyLXJlZ2lzdHJhdGlvbi1mb3JtXCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlLCBDaGVja1VzZXJJZEluUGF0aE1hdGNoSldULCB2YWxpZGF0ZUVtYWlsIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJVc2VyUmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3RcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlcy91c2VyXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvZXJyb3ItaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0U2NoZW1hLCBDaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0IH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC9jaGFuZ2UtdXNlci1wYXNzd29yZC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IEZvcmdvdFBhc3N3b3JkUmVxdWVzdFNjaGVtYSwgRm9yZ290UGFzc3dvcmRSZXF1ZXN0IH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC9mb3Jnb3QtcGFzc3dvcmQucmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBSZXNldFVzZXJQYXNzd29yZFJlcXVlc3QsIFJlc2V0VXNlclBhc3N3b3JkUmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvcmVzZXQtdXNlci1wYXNzd29yZC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFVzZXJQcm9maWxlUmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvdXNlci1wcm9maWxlLnJlcXVlc3RcIjtcclxuaW1wb3J0IHsgVXNlclByb2ZpbGVSZXNwb25zZSB9IGZyb20gXCIuLi9kdG9zL3Jlc3BvbnNlL3VzZXItcHJvZmlsZS5yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBWZXJpZnlVc2VyRW1haWxSZXF1ZXN0LCBWZXJpZnlVc2VyRW1haWxSZXF1ZXN0U2NoZW1hIH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC92ZXJpZnktdXNlci1lbWFpbC5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFVwZGF0ZVVzZXJQcm9maWxlUmVxdWVzdFNjaGVtYSwgVXBkYXRlVXNlclByb2ZpbGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2R0b3MvcmVxdWVzdC91cGRhdGUtdXNlci1wcm9maWxlLnJlcXVlc3RcIjtcclxuaW1wb3J0IHsgVmVyaWZ5QWNjZXNzVG9rZW5SZXF1ZXN0U2NoZW1hLCBWZXJpZnlBY2Nlc3NUb2tlblJlcXVlc3QgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L3ZlcmlmeS1hY2Nlc3MtdG9rZW4ucmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBBcHBseUFjY2Vzc1Rva2VuUmVxdWVzdFNjaGVtYSwgQXBwbHlBY2Nlc3NUb2tlblJlcXVlc3QgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L2FwcGx5LWFjY2Vzcy10b2tlbi5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IE1hcHBlciB9IGZyb20gXCIuLi9tYXBwZXJcIjtcclxuaW1wb3J0IHsgRGVsZXRlVXNlclByb2ZpbGVSZXF1ZXN0U2NoZW1hLCBEZWxldGVVc2VyUHJvZmlsZVJlcXVlc3QgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L2RlbGV0ZS11c2VyLXByb2ZpbGUucmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tIFwic3JjL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZTtcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gUm91dGVyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi9cIiwgUmVnaXN0ZXJVc2VyUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMucmVnaXN0ZXJVc2VyLCB0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvdmVyaWZ5LWVtYWlsXCIsIFZlcmlmeVVzZXJFbWFpbFJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnZlcmlmeUVtYWlsLCB0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvYWNjZXNzLXRva2VuXCIsIFZlcmlmeUFjY2Vzc1Rva2VuUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMudmVyaWZ5QWNjZXNzVG9rZW4sIHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi9mb3Jnb3QtcGFzc3dvcmRcIiwgRm9yZ290UGFzc3dvcmRSZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5mb3Jnb3RQYXNzd29yZCwgdGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiL3Jlc2V0LXBhc3N3b3JkXCIsIFJlc2V0VXNlclBhc3N3b3JkUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMucmVzZXRQYXNzd29yZCwgdGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiLzp1c2VySWRcIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIFVwZGF0ZVVzZXJQcm9maWxlUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMudXBkYXRlVXNlclByb2ZpbGUsIHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiLzp1c2VySWRcIiwgVXNlclByb2ZpbGVSZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRVc2VyUHJvZmlsZSwgdGhpcykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9lbWFpbC86ZW1haWxcIiwgVXNlclByb2ZpbGVSZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZUVtYWlsLCAgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRVc2VyUHJvZmlsZUJ5VG9rZW4sIHRoaXMpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvYWxsL3VzZXJzXCIsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuZ2V0VXNlcnMsIHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi86dXNlcklkL2NoYW5nZS1wYXNzd29yZFwiLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJqd3RcIiwgeyBzZXNzaW9uOiBmYWxzZSB9KSwgQ2hhbmdlVXNlclBhc3N3b3JkUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIENoZWNrVXNlcklkSW5QYXRoTWF0Y2hKV1QsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmNoYW5nZVBhc3N3b3JkLCB0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvOnVzZXJJZC9hY2Nlc3MtdG9rZW5cIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIEFwcGx5QWNjZXNzVG9rZW5SZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZSwgQ2hlY2tVc2VySWRJblBhdGhNYXRjaEpXVCwgdmFsaWRhdGUsIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKHRoaXMuYXBwbHlBY2Nlc3NUb2tlbiwgdGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5wb3N0KFwiLzp1c2VySWQvZGVsZXRlLXByb2ZpbGVcIiwgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwiand0XCIsIHsgc2Vzc2lvbjogZmFsc2UgfSksIERlbGV0ZVVzZXJQcm9maWxlUmVxdWVzdFNjaGVtYSwgdmFsaWRhdGUsIENoZWNrVXNlcklkSW5QYXRoTWF0Y2hKV1QsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmRlbGV0ZVByb2ZpbGUsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVyKCk6IFJvdXRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC91c2VyLzpcclxuICAgICAqICBwb3N0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogUmVnaXN0ZXIgYSB1c2VyLlxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBVc2VyXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHJlZ2lzdGVyXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IFJlZ2lzdGVyVXNlclJlcXVlc3RcclxuICAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICAqICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9SZWdpc3RlclVzZXJSZXF1ZXN0J1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICA0MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE1pc3Npbmcgb3IgaW52YWxpZCBwYXJhbWV0ZXIuXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJVc2VyKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlclJlZ2lzdHJhdGlvbkZvcm0gPSByZXEuYm9keSBhcyBVc2VyUmVnaXN0cmF0aW9uRm9ybTtcclxuICAgICAgICBjb25zb2xlLmxvZyh7IHVzZXJSZWdpc3RyYXRpb25Gb3JtIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudXNlclNlcnZpY2UucmVnaXN0ZXJVc2VyKHVzZXJSZWdpc3RyYXRpb25Gb3JtKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL3VzZXIvdmVyaWZ5LWVtYWlsOlxyXG4gICAgKiAgcG9zdDpcclxuICAgICogICAgICBkZXNjcmlwdGlvbjogVmVyaWZ5IHVzZXIgZW1haWxcclxuICAgICogICAgICB0YWdzOlxyXG4gICAgKiAgICAgICAgICAtIFVzZXJcclxuICAgICogICAgICBwcm9kdWNlczpcclxuICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICogICAgICAgICAgLSBuYW1lOiB2ZXJpZnlFbWFpbFxyXG4gICAgKiAgICAgICAgICAgIHR5cGU6IFZlcmlmeVVzZXJFbWFpbFJlcXVlc3RcclxuICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgKiAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9WZXJpZnlVc2VyRW1haWxSZXF1ZXN0J1xyXG4gICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICogICAgICAgICAgMjAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAqICAgICAgICAgIDQwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBNaXNzaW5nIG9yIGludmFsaWQgcGFyYW1ldGVyXHJcbiAgICAqICAgICAgICAgIDUwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdmVyaWZ5RW1haWwocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB2ZXJpZnlVc2VyRW1haWxSZXF1ZXN0ID0gcmVxLmJvZHkgYXMgVmVyaWZ5VXNlckVtYWlsUmVxdWVzdDtcclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLnZlcmlmeVVzZXJFbWFpbChcclxuICAgICAgICAgICAgdmVyaWZ5VXNlckVtYWlsUmVxdWVzdC5lbWFpbCxcclxuICAgICAgICAgICAgdmVyaWZ5VXNlckVtYWlsUmVxdWVzdC52ZXJpZmljYXRpb25Db2RlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdXNlci97dXNlcklkfTpcclxuICAgICAqICBwb3N0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogVXBkYXRlIHVzZXIgcHJvZmlsZVxyXG4gICAgICogICAgICB0YWdzOlxyXG4gICAgICogICAgICAgICAgLSBVc2VyXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IHVzZXJJZFxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAqICAgICAgICAgICAgaW46IHBhdGhcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogdXBkYXRlUHJvZmlsZVxyXG4gICAgICogICAgICAgICAgICB0eXBlOiBVcGRhdGVVc2VyUHJvZmlsZVJlcXVlc3RcclxuICAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICAqICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9VcGRhdGVVc2VyUHJvZmlsZVJlcXVlc3QnXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1VzZXJQcm9maWxlUmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZVVzZXJQcm9maWxlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlVXNlclByb2ZpbGVSZXF1ZXN0ID0gcmVxLmJvZHkgYXMgVXBkYXRlVXNlclByb2ZpbGVSZXF1ZXN0O1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlcklkLCB1cGRhdGVVc2VyUHJvZmlsZVJlcXVlc3QpO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwVXNlclRvVXNlclByb2ZpbGUodXNlcikpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL3VzZXIve3VzZXJJZH06XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0cyB1c2VyIHByb2ZpbGVcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gVXNlclxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgICogICAgICAgICAgLSBuYW1lOiB1c2VySWRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgKiAgICAgICAgICAgIGluOiBwYXRoXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1VzZXJQcm9maWxlUmVzcG9uc2UnXHJcbiAgICAgKiAgICAgICAgICA0MDQ6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgICogICAgICAgICAgNTAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJQcm9maWxlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlckJ5SWQodXNlcklkKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoTWFwcGVyLm1hcFVzZXJUb1VzZXJQcm9maWxlKHVzZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0VXNlclByb2ZpbGVCeVRva2VuKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWwgPSByZXEucGFyYW1zLmVtYWlsO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJCeUVtYWlsKGVtYWlsKTtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlVXNlcih1c2VyLl9pZCkudGhlbigoand0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgdXNlcjogTWFwcGVyLm1hcFVzZXJUb1VzZXJQcm9maWxlKHVzZXIpLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IGp3dCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbFVzZXIoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1c2Vycyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAc3dhZ2dlclxyXG4gICAgKiAvdXNlci97dXNlcklkfS9jaGFuZ2UtcGFzc3dvcmQ6XHJcbiAgICAqICBwb3N0OlxyXG4gICAgKiAgICAgIGRlc2NyaXB0aW9uOiBDaGFuZ2UgdXNlciBwYXNzd29yZFxyXG4gICAgKiAgICAgIHRhZ3M6XHJcbiAgICAqICAgICAgICAgIC0gVXNlclxyXG4gICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgKiAgICAgICAgICAtIGluOiBwYXRoXHJcbiAgICAqICAgICAgICAgICAgbmFtZTogdXNlcklkXHJcbiAgICAqICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICogICAgICAgICAgLSBuYW1lOiBjaGFuZ2VQYXNzd29yZFxyXG4gICAgKiAgICAgICAgICAgIHR5cGU6IENoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3RcclxuICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgKiAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9DaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0J1xyXG4gICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICogICAgICAgICAgMjAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAqICAgICAgICAgIDQwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBNaXNzaW5nIG9yIGludmFsaWQgcGFyYW1ldGVyXHJcbiAgICAqICAgICAgICAgIDUwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgY2hhbmdlUGFzc3dvcmQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB1c2VySWQgPSByZXEucGFyYW1zLnVzZXJJZDtcclxuICAgICAgICBjb25zdCBjaGFuZ2VVc2VyUGFzc3dvcmRSZXF1ZXN0ID0gcmVxLmJvZHkgYXMgQ2hhbmdlVXNlclBhc3N3b3JkUmVxdWVzdDtcclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmNoYW5nZVBhc3N3b3JkKFxyXG4gICAgICAgICAgICB1c2VySWQsXHJcbiAgICAgICAgICAgIGNoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3Qub2xkUGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGNoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3QubmV3UGFzc3dvcmRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAc3dhZ2dlclxyXG4gICAgKiAvdXNlci97dXNlcklkfS9hY2Nlc3MtdG9rZW46XHJcbiAgICAqICBwb3N0OlxyXG4gICAgKiAgICAgIGRlc2NyaXB0aW9uOiBBcHBseSBhY2Nlc3MgdG9rZW5cclxuICAgICogICAgICB0YWdzOlxyXG4gICAgKiAgICAgICAgICAtIFVzZXJcclxuICAgICogICAgICBwcm9kdWNlczpcclxuICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICogICAgICAgICAgLSBpbjogcGF0aFxyXG4gICAgKiAgICAgICAgICAgIG5hbWU6IHVzZXJJZFxyXG4gICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAqICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAgICAqICAgICAgICAgIC0gbmFtZTogYXBwbHlBY2Nlc3NUb2tlblxyXG4gICAgKiAgICAgICAgICAgIHR5cGU6IEFwcGx5QWNjZXNzVG9rZW5SZXF1ZXN0XHJcbiAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAqICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvQXBwbHlBY2Nlc3NUb2tlblJlcXVlc3QnXHJcbiAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICogICAgICAgICAgNDAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE1pc3Npbmcgb3IgaW52YWxpZCBwYXJhbWV0ZXJcclxuICAgICogICAgICAgICAgNTAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBhcHBseUFjY2Vzc1Rva2VuKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gcmVxLnBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgY29uc3QgYXBwbHlBY2Nlc3NUb2tlblJlcXVlc3QgPSByZXEuYm9keSBhcyBBcHBseUFjY2Vzc1Rva2VuUmVxdWVzdDtcclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmFwcGx5QWNjZXNzVG9rZW4oXHJcbiAgICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgICAgYXBwbHlBY2Nlc3NUb2tlblJlcXVlc3QuYWNjZXNzVG9rZW5cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAc3dhZ2dlclxyXG4gICAgKiAvdXNlci97dXNlcklkfS9kZWxldGUtcHJvZmlsZTpcclxuICAgICogIHBvc3Q6XHJcbiAgICAqICAgICAgZGVzY3JpcHRpb246IERlbGV0ZSB1c2VyIHByb2ZpbGVcclxuICAgICogICAgICB0YWdzOlxyXG4gICAgKiAgICAgICAgICAtIFVzZXJcclxuICAgICogICAgICBwcm9kdWNlczpcclxuICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICogICAgICAgICAgLSBuYW1lOiBkZWxldGVQcm9maWxlXHJcbiAgICAqICAgICAgICAgICAgdHlwZTogRGVsZXRlVXNlclByb2ZpbGVSZXF1ZXN0XHJcbiAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAqICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvRGVsZXRlVXNlclByb2ZpbGVSZXF1ZXN0J1xyXG4gICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICogICAgICAgICAgMjAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAqICAgICAgICAgIDQwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBNaXNzaW5nIG9yIGludmFsaWQgcGFyYW1ldGVyXHJcbiAgICAqICAgICAgICAgIDUwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlUHJvZmlsZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJZCA9IHJlcS5wYXJhbXMudXNlcklkO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVVzZXJQcm9maWxlUmVxdWVzdCA9IHJlcS5ib2R5IGFzIERlbGV0ZVVzZXJQcm9maWxlUmVxdWVzdDtcclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIoXHJcbiAgICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgICAgZGVsZXRlVXNlclByb2ZpbGVSZXF1ZXN0LnBhc3N3b3JkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL3VzZXIvYWNjZXNzLXRva2VuOlxyXG4gICAgKiAgcG9zdDpcclxuICAgICogICAgICBkZXNjcmlwdGlvbjogVmVyaWZ5IGFjY2VzcyB0b2tlblxyXG4gICAgKiAgICAgIHRhZ3M6XHJcbiAgICAqICAgICAgICAgIC0gVXNlclxyXG4gICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgKiAgICAgICAgICAtIG5hbWU6IHZlcmlmeUFjY2Vzc1Rva2VuXHJcbiAgICAqICAgICAgICAgICAgdHlwZTogVmVyaWZ5QWNjZXNzVG9rZW5SZXF1ZXN0XHJcbiAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAqICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvVmVyaWZ5QWNjZXNzVG9rZW5SZXF1ZXN0J1xyXG4gICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICogICAgICAgICAgMjAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAqICAgICAgICAgIDQwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBNaXNzaW5nIG9yIGludmFsaWQgcGFyYW1ldGVyXHJcbiAgICAqICAgICAgICAgIDUwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZXJ2ZXIgZXJyb3JcclxuICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdmVyaWZ5QWNjZXNzVG9rZW4ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB2ZXJpZnlBY2Nlc3NUb2tlblJlcXVlc3QgPSByZXEuYm9keSBhcyBWZXJpZnlBY2Nlc3NUb2tlblJlcXVlc3Q7XHJcbiAgICAgICAgYXdhaXQgdGhpcy51c2VyU2VydmljZS52ZXJpZnlBY2Nlc3NUb2tlbihcclxuICAgICAgICAgICAgdmVyaWZ5QWNjZXNzVG9rZW5SZXF1ZXN0LmFjY2Vzc1Rva2VuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBzd2FnZ2VyXHJcbiAgICAgKiAvdXNlci9mb3Jnb3QtcGFzc3dvcmQ6XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IFJlcXVlc3QgZm9yZ290IHBhc3N3b3JkIHZlcmlmaWNhdGlvbiBjb2RlXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIFVzZXJcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogZm9yZ290UGFzc3dvcmRcclxuICAgICAqICAgICAgICAgICAgdHlwZTogRm9yZ290UGFzc3dvcmRSZXF1ZXN0XHJcbiAgICAgKiAgICAgICAgICAgIGluOiBib2R5XHJcbiAgICAgKiAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvRm9yZ290UGFzc3dvcmRSZXF1ZXN0J1xyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICA0MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE1pc3Npbmcgb3IgaW52YWxpZCBwYXJhbWV0ZXJcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBmb3Jnb3RQYXNzd29yZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3QgPSByZXEuYm9keSBhcyBGb3Jnb3RQYXNzd29yZFJlcXVlc3Q7XHJcbiAgICAgICAgYXdhaXQgdGhpcy51c2VyU2VydmljZS5yZXNldFBhc3N3b3JkVmVyaWZpY2F0aW9uQ29kZShcclxuICAgICAgICAgICAgY2hhbmdlVXNlclBhc3N3b3JkUmVxdWVzdC5lbWFpbFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEBzd2FnZ2VyXHJcbiAgICAqIC91c2VyL3Jlc2V0UGFzc3dvcmQ6XHJcbiAgICAqICBwb3N0OlxyXG4gICAgKiAgICAgIGRlc2NyaXB0aW9uOiBSZXNldCB1c2VyIHBhc3N3b3JkIHdpdGggdmVyaWZpY2F0aW9uIGNvZGUgZnJvbSBmb3Jnb3QgcGFzc3dvcmQgcmVxdWVzdFxyXG4gICAgKiAgICAgIHRhZ3M6XHJcbiAgICAqICAgICAgICAgIC0gVXNlclxyXG4gICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgKiAgICAgICAgICAtIG5hbWU6IHJlc2V0UGFzc3dvcmRcclxuICAgICogICAgICAgICAgICB0eXBlOiBSZXNldFVzZXJQYXNzd29yZFJlcXVlc3RcclxuICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgKiAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICogICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9SZXNldFVzZXJQYXNzd29yZFJlcXVlc3QnXHJcbiAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICogICAgICAgICAgNDAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE1pc3Npbmcgb3IgaW52YWxpZCBwYXJhbWV0ZXJcclxuICAgICogICAgICAgICAgNTAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlVXNlclBhc3N3b3JkUmVxdWVzdCA9IHJlcS5ib2R5IGFzIFJlc2V0VXNlclBhc3N3b3JkUmVxdWVzdDtcclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJTZXJ2aWNlLnJlc2V0UGFzc3dvcmQoXHJcbiAgICAgICAgICAgIGNoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3QuZW1haWwsXHJcbiAgICAgICAgICAgIGNoYW5nZVVzZXJQYXNzd29yZFJlcXVlc3QudmVyaWZpY2F0aW9uQ29kZSxcclxuICAgICAgICAgICAgY2hhbmdlVXNlclBhc3N3b3JkUmVxdWVzdC5uZXdQYXNzd29yZFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXX0=