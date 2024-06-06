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
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const logging_1 = require("../core/logging");
const user_1 = require("../types/user");
const error_builder_1 = require("../core/errors/error-builder");
const error_type_enum_1 = require("../core/errors/error-type.enum");
const error_message_enum_1 = require("../types/error-message.enum");
const token_generator_1 = require("../core/auth/token-generator");
const filter_builder_1 = require("../core/dao/filter/filter-builder");
const job_enum_1 = require("../jobs/job.enum");
const account_status_enum_1 = require("../types/account-status.enum");
const config_1 = require("../config");
const golf_division_enum_1 = require("../types/golf-division.enum");
const latest_rank_model_1 = require("../models/latest-rank.model");
class UserService {
    constructor(userDAO, accessTokenDAO, jobScheduler) {
        this.userDAO = userDAO;
        this.accessTokenDAO = accessTokenDAO;
        this.jobScheduler = jobScheduler;
    }
    /**
     * Register user
     * @async
     * @param {UserRegistrationForm} userRegistrationForm User's registration form
     * @returns {Promise<IUser>} Returns promise of user
     */
    registerUser(userRegistrationForm) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                let savedUser;
                console.log({ userRegistrationForm });
                const storedUser = yield this.userDAO.getByEmail(userRegistrationForm.email);
                if (storedUser) {
                    result = Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Exists, error_message_enum_1.ErrorMessage.UserExists(userRegistrationForm.email)));
                }
                else {
                    // Check access token
                    if (userRegistrationForm.accessToken) {
                        yield this.verifyAccessToken(userRegistrationForm.accessToken);
                    }
                    const user = this.mapUserRegistrationForm(userRegistrationForm);
                    // Set email verification code
                    user.emailVerificationCode = yield token_generator_1.TokenGenerator.generateToken(Number(config_1.default.verificationCodeLength));
                    //set free tokens for amateurs 
                    if (user.division === golf_division_enum_1.GolfDivision.Champ) {
                        user.amateurTokens = this.getFreeAmateurTokens();
                    }
                    // Create user
                    savedUser = yield this.userDAO.create(user);
                    // Apply access token
                    if (userRegistrationForm.accessToken) {
                        yield this.applyAccessToken(savedUser._id, userRegistrationForm.accessToken);
                    }
                    // Schedule user email verification job
                    yield this.jobScheduler.now(job_enum_1.Job.UserEmailVerificationJob, { user: savedUser });
                }
                if (!result) {
                    this.mappedUserWithLatestRank(savedUser);
                    result = Promise.resolve(savedUser);
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
            return result;
        });
    }
    getFreeAmateurTokens() {
        let tokens = [];
        for (let i = 0; i < 3; i++) {
            let token = Math.random().toString(36).substr(2, 10).toUpperCase();
            tokens.push(token);
        }
        return tokens;
    }
    mappedUserWithLatestRank(savedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersInRank = yield latest_rank_model_1.LatestRankSchema.find({
                firstName: { $regex: savedUser.firstName, $options: "i" }, //savedUser.firstName,
                lastName: { $regex: savedUser.lastName, $options: "i" },
                division: savedUser.division,
                nationality: savedUser.nationality,
                user: undefined
            });
            if ((usersInRank === null || usersInRank === void 0 ? void 0 : usersInRank.length) === 1) {
                const userInRank = usersInRank[0];
                yield latest_rank_model_1.LatestRankSchema.findOneAndUpdate({
                    _id: userInRank._id
                }, {
                    $set: {
                        user: savedUser
                    }
                }, {
                    new: true
                }).exec();
            }
        });
    }
    /**
     * Request email verification code
     * @async
     * @param {string} userID The user's ID
     * @returns {Promise<UserVerificationCode>} Returns promise of user verification code
     */
    requestEmailVerificationCode(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                if (user.isConfirmed) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Exists, error_message_enum_1.ErrorMessage.EmailConfirmed(user.email)));
                }
                else {
                    user.emailVerificationCode = yield token_generator_1.TokenGenerator.generateToken(Number(config_1.default.verificationCodeLength));
                    yield this.userDAO.update(user);
                    return Promise.resolve({
                        userId: user._id,
                        verificationCode: user.emailVerificationCode
                    });
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.EmailVerificationCode(userID), error.message));
            }
        });
    }
    /**
     * Verify user email
     * @async
     * @param {any} userEmail The email of the user.
     * @param {any} verificationCode The verification token sent to the user's email
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    verifyUserEmail(userEmail, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByEmail(userEmail);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                const isVerifyEmailVerificationCodeValid = verificationCode === user.emailVerificationCode ? true : false;
                if (!isVerifyEmailVerificationCodeValid) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.InvalidCode, error_message_enum_1.ErrorMessage.InvalidEmailOrVerificationCode));
                }
                user.isConfirmed = true;
                user.emailVerificationCode = undefined;
                yield this.userDAO.update(user);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Sends a security code which is needed for resetting the users password.
     * @async
     * @param {string} userEmail The email of the user.
     * @param {ErrorCondition<string>[]} errors Error conditions
     * @returns {Promise<boolean>} User verification code.
     */
    resetPasswordVerificationCode(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userDAO.getByEmail(userEmail);
                if (!user || !user.isConfirmed || user.status !== account_status_enum_1.AccountStatus.Active) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                // Set reset password verification code
                user.resetPasswordVerificationCode = yield token_generator_1.TokenGenerator.generateToken(Number(config_1.default.verificationCodeLength));
                // Update user
                user = yield this.userDAO.update(user);
                // Schedule user forgot password request job
                yield this.jobScheduler.now(job_enum_1.Job.UserForgotPasswordRequestJob, { user: user });
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.ResetVerificationCode(userEmail), error.message));
            }
        });
    }
    /**
     * Resets the user's password and sends the new password.
     * @async
     * @param {string} userEmail The email of the user.
     * @param {string?} verificationCode The verification code needed for authentication.
     * @param {string?} newPassword The new password.
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    resetPassword(userEmail, verificationCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByEmail(userEmail);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                const isResetPasswordVerificationCodeValid = verificationCode === user.resetPasswordVerificationCode ? true : false;
                if (!isResetPasswordVerificationCodeValid) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.InvalidCode, error_message_enum_1.ErrorMessage.InvalidEmailOrVerificationCode));
                }
                user.password = newPassword;
                user.resetPasswordVerificationCode = undefined;
                yield this.userDAO.update(user);
                yield this.userDAO.changePassword(user._id, user.password);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.ResetPassword(userEmail), error.message));
            }
        });
    }
    /**
     * Update user
     * @async
     * @param {string} userID The id of the user
     * @param {any} fieldsToUpdate Fields that should be updated
     * @returns {Promise<IUser>} Returns promise of user
     */
    updateUser(userID, fieldsToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    result = Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                else {
                    this.updateUserModel(user, fieldsToUpdate);
                    yield this.userDAO.update(user);
                    result = Promise.resolve(user);
                }
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
            return result;
        });
    }
    /**
     * Delete user
     * @async
     * @param {string} userID The id of the user
     * @param {string} password The password of the user
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    deleteUser(userID, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                const isPasswordCorrect = yield bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                const deleted = yield this.userDAO.delete(user._id);
                if (!deleted) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
    * Used to change the users password.
    * @async
    * @param {string} userID The ID of the user.
    * @param {string} oldPassword The old password.
    * @param {string} newPassword The new password.
    * @returns {Promise<string>} A message for the operation result.
    */
    changePassword(userID, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.UserDoesNotExist));
                }
                const isPasswordCorrect = yield bcrypt.compare(oldPassword, user.password);
                if (!isPasswordCorrect) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.InvalidCredentials));
                }
                yield this.userDAO.changePassword(user._id, newPassword);
                return Promise.resolve(user._id);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.ChangePassword(userID), error.message));
            }
        });
    }
    /**
    * Fetches a user by id.
    * @async
    * @param {string} userID The id of the user.
    * @returns {Promise<IUser>} The fetched user.
    */
    getUserById(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.UserDoesNotExist));
                }
                return user;
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.GetByID(userID), error.message));
            }
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = new filter_builder_1.FilterBuilder()
                    .addFilter("isAdminCreated", true)
                    .buildFirst();
                const users = yield this.userDAO.getByFilterArray(filter);
                if (!users) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.UserDoesNotExist));
                }
                return users;
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generateGeneric(error_message_enum_1.ErrorMessage.NotExists(), error.message));
            }
        });
    }
    /**
    * Get User By Email
    * @async
    * @param {string} email User's email
    * @returns {Promise<IUser>} Returns promise of user
    */
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userDAO.getByEmail(email);
        });
    }
    /**
     * Verify Access Token
     * @async
     * @param {string} accessToken Division access token
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    verifyAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = new filter_builder_1.FilterBuilder()
                    .addFilter("token", accessToken)
                    .buildFirst();
                const storedAccessToken = yield this.accessTokenDAO.getByFilter(filter);
                if (!storedAccessToken) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.InvalidCode, error_message_enum_1.ErrorMessage.InvalidAccessToken));
                }
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    /**
     * Apply Access Token
     * @async
     * @param {string} userID The id of the user.
     * @param {string} accessToken Division access token
     * @returns {Promise<boolean>} Whether the operation succeeded.
     */
    applyAccessToken(userID, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = new filter_builder_1.FilterBuilder()
                    .addFilter("token", accessToken)
                    .buildFirst();
                const storedAccessToken = yield this.accessTokenDAO.getByFilter(filter);
                if (!storedAccessToken) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.InvalidCode, error_message_enum_1.ErrorMessage.InvalidAccessToken));
                }
                const user = yield this.userDAO.getByID(userID);
                if (!user) {
                    return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.DoesNotExist, error_message_enum_1.ErrorMessage.UserDoesNotExist));
                }
                const golfDivision = storedAccessToken.golfDivision;
                user.division = golfDivision;
                yield this.userDAO.update(user);
                yield this.accessTokenDAO.delete(storedAccessToken._id);
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
    mapUserRegistrationForm(userRegistrationForm) {
        const newUser = new user_1.User();
        newUser.email = userRegistrationForm.email;
        newUser.password = userRegistrationForm.password;
        newUser.firstName = userRegistrationForm.firstName;
        newUser.lastName = userRegistrationForm.lastName;
        newUser.nationality = userRegistrationForm.nationality;
        newUser.countryOfResidence = userRegistrationForm.countryOfResidence;
        newUser.handicapIndex = userRegistrationForm.handicapIndex;
        newUser.pgaMemberNumber = userRegistrationForm.pgaMemberNumber ? userRegistrationForm.pgaMemberNumber : null;
        newUser.accessToken = userRegistrationForm.accessToken ? userRegistrationForm.accessToken : null;
        newUser.division = userRegistrationForm.division;
        newUser.homeClub = userRegistrationForm.homeClub;
        newUser.gender = userRegistrationForm.gender;
        newUser.state = userRegistrationForm.state;
        newUser.profession = userRegistrationForm.profession;
        newUser.isAdminCreated = userRegistrationForm.isAdminCreated;
        return newUser;
    }
    updateUserModel(user, fieldsToUpdate) {
        user.firstName = fieldsToUpdate.firstName;
        user.lastName = fieldsToUpdate.lastName;
        user.nationality = fieldsToUpdate.nationality;
        user.countryOfResidence = fieldsToUpdate.countryOfResidence;
        user.state = fieldsToUpdate.state;
        user.handicapIndex = fieldsToUpdate.handicapIndex;
        user.homeClub = fieldsToUpdate.homeClub;
        user.gender = fieldsToUpdate.gender;
        user.email = fieldsToUpdate.email;
        user.publicProfiles = fieldsToUpdate.publicProfiles;
        user.profession = fieldsToUpdate.profession;
        user.homePage = fieldsToUpdate.homePage;
        user.otherLinks = fieldsToUpdate.otherLinks;
        user.shortUpdate = fieldsToUpdate.shortUpdate;
        user.imageData = fieldsToUpdate.imageData;
        user.biography = fieldsToUpdate.biography;
        user.ownCharityLink = fieldsToUpdate.ownCharityLink;
        user.supportCharities = fieldsToUpdate.supportCharities;
        user.videoMsgLink = fieldsToUpdate.videoMsgLink;
        user.sponsorsLink = fieldsToUpdate.sponsorsLink;
        user.shopLink = fieldsToUpdate.shopLink;
        user.merchandiseLink = fieldsToUpdate.merchandiseLink;
        user.managerDetails = fieldsToUpdate.managerDetails;
        user.publicistDetails = fieldsToUpdate.publicistDetails;
        user.agentDetails = fieldsToUpdate.agentDetails;
        user.playGolf = fieldsToUpdate.playGolf;
        user.singForCharity = fieldsToUpdate.singForCharity;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsNkNBQXlDO0FBS3pDLHdDQUFxQztBQUNyQyxnRUFBNEQ7QUFDNUQsb0VBQTJEO0FBQzNELG9FQUEyRDtBQUMzRCxrRUFBOEQ7QUFJOUQsc0VBQWtFO0FBRWxFLCtDQUF1QztBQUN2QyxzRUFBNkQ7QUFDN0Qsc0NBQStCO0FBQy9CLG9FQUEyRDtBQUMzRCxtRUFBK0Q7QUFFL0QsTUFBYSxXQUFXO0lBTXBCLFlBQW1CLE9BQWdCLEVBQUUsY0FBZ0MsRUFBRSxZQUEyQjtRQUU5RixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsb0JBQTBDOztZQUNoRSxJQUFJLE1BQU0sR0FBbUIsU0FBUyxDQUFDO1lBQ3ZDLElBQUksQ0FBQztnQkFDRCxJQUFJLFNBQWdCLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7Z0JBRXRDLE1BQU0sVUFBVSxHQUFVLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ2IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxNQUFNLEVBQUUsaUNBQVksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxSCxDQUFDO3FCQUFNLENBQUM7b0JBRUoscUJBQXFCO29CQUNyQixJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbkUsQ0FBQztvQkFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDaEUsOEJBQThCO29CQUM5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7b0JBRXZHLCtCQUErQjtvQkFDL0IsSUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLGlDQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0JBQ3JELENBQUM7b0JBQ0QsY0FBYztvQkFDZCxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFNUMscUJBQXFCO29CQUNyQixJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNqRixDQUFDO29CQUVELHVDQUF1QztvQkFDdkMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxjQUFHLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ1YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUVMLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBR1Esb0JBQW9CO1FBQ3pCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFWSx3QkFBd0IsQ0FBQyxTQUFlOztZQUNqRCxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUFnQixDQUFDLElBQUksQ0FBQztnQkFDNUMsU0FBUyxFQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxFQUFFLHNCQUFzQjtnQkFDOUUsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQztnQkFDcEQsUUFBUSxFQUFDLFNBQVMsQ0FBQyxRQUFRO2dCQUMzQixXQUFXLEVBQUMsU0FBUyxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBRyxTQUFTO2FBQ25CLENBQUMsQ0FBQztZQUNILElBQUcsQ0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsTUFBTSxNQUFLLENBQUMsRUFBRSxDQUFDO2dCQUMzQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sb0NBQWdCLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2hDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztpQkFDdEIsRUFDRDtvQkFDSSxJQUFJLEVBQUM7d0JBQ0QsSUFBSSxFQUFHLFNBQVM7cUJBQ25CO2lCQUNKLEVBQ0Q7b0JBQ0ksR0FBRyxFQUFFLElBQUk7aUJBQ1osQ0FDSixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsNEJBQTRCLENBQUMsTUFBYzs7WUFDcEQsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFVLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDUixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxjQUFjLEVBQUUsaUNBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzVHLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLE1BQU0sRUFBRSxpQ0FBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO29CQUN0RyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVoQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRzt3QkFDaEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtxQkFDdkIsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO1lBQ0wsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxpQ0FBWSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25ILENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxlQUFlLENBQUMsU0FBaUIsRUFBRSxnQkFBcUI7O1lBQ2pFLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBVSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLDJCQUFTLENBQUMsY0FBYyxFQUFFLGlDQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO2dCQUVELE1BQU0sa0NBQWtDLEdBQVksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFFbkgsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7b0JBQ3RDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLFdBQVcsRUFBRSxpQ0FBWSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztnQkFDckgsQ0FBQztnQkFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztnQkFFdkMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsNkJBQTZCLENBQUMsU0FBaUI7O1lBQ3hELElBQUksQ0FBQztnQkFDRCxJQUFJLElBQUksR0FBVSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLG1DQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3JFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLGNBQWMsRUFBRSxpQ0FBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDNUcsQ0FBQztnQkFDRCx1Q0FBdUM7Z0JBQ3ZDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxNQUFNLGdDQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQTtnQkFDOUcsY0FBYztnQkFDZCxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsNENBQTRDO2dCQUM1QyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQUcsQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUU5RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxpQ0FBWSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RILENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ1UsYUFBYSxDQUFDLFNBQWlCLEVBQUUsZ0JBQXdCLEVBQUUsV0FBbUI7O1lBQ3ZGLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBVSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLDJCQUFTLENBQUMsY0FBYyxFQUFFLGlDQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO2dCQUVELE1BQU0sb0NBQW9DLEdBQVksZ0JBQWdCLEtBQUssSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFFN0gsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7b0JBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLFdBQVcsRUFBRSxpQ0FBWSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztnQkFDckgsQ0FBQztnQkFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLDZCQUE2QixHQUFHLFNBQVMsQ0FBQztnQkFFL0MsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxlQUFlLENBQUMsaUNBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUcsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUdEOzs7Ozs7T0FNRztJQUNVLFVBQVUsQ0FBQyxNQUFjLEVBQUUsY0FBbUI7O1lBRXZELElBQUksTUFBTSxHQUFvQixTQUFTLENBQUM7WUFDeEMsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFVLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDUixNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLGNBQWMsRUFBRSxpQ0FBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDOUcsQ0FBQztxQkFBTSxDQUFDO29CQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsVUFBVSxDQUFDLE1BQWMsRUFBRSxRQUFnQjs7WUFDcEQsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFVLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDUixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxjQUFjLEVBQUUsaUNBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzVHLENBQUM7Z0JBQ0QsTUFBTSxpQkFBaUIsR0FBWSxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3JCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLGNBQWMsRUFBRSxpQ0FBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDNUcsQ0FBQztnQkFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNYLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLGNBQWMsRUFBRSxpQ0FBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDNUcsQ0FBQztnQkFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7OztNQU9FO0lBQ1csY0FBYyxDQUFDLE1BQWMsRUFBRSxXQUFtQixFQUFFLFdBQW1COztZQUNoRixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxJQUFJLEdBQVUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLFlBQVksRUFBRSxpQ0FBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFFRCxNQUFNLGlCQUFpQixHQUFZLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLDJCQUFTLENBQUMsY0FBYyxFQUFFLGlDQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO2dCQUVELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDekQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsZUFBZSxDQUFDLGlDQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVHLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7TUFLRTtJQUNXLFdBQVcsQ0FBQyxNQUFjOztZQUNuQyxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxJQUFJLEdBQVUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLFlBQVksRUFBRSxpQ0FBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsZUFBZSxDQUFDLGlDQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JHLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNuQixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSw4QkFBYSxFQUFFO3FCQUM3QixTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO3FCQUNqQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxLQUFLLEdBQVksTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ1QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLDJCQUFTLENBQUMsWUFBWSxFQUFFLGlDQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RyxDQUFDO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxlQUFlLENBQUMsaUNBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqRyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7O01BS0U7SUFDVyxjQUFjLENBQUMsS0FBYTs7WUFDckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLGlCQUFpQixDQUFDLFdBQW1COztZQUM5QyxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSw4QkFBYSxFQUFFO3FCQUM3QixTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztxQkFDL0IsVUFBVSxFQUFFLENBQUM7Z0JBRWxCLE1BQU0saUJBQWlCLEdBQWdCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUNyQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxXQUFXLEVBQUUsaUNBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pHLENBQUM7Z0JBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRSxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLFdBQW1COztZQUM3RCxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSw4QkFBYSxFQUFFO3FCQUM3QixTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztxQkFDL0IsVUFBVSxFQUFFLENBQUM7Z0JBRWxCLE1BQU0saUJBQWlCLEdBQWdCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUNyQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsNEJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVMsQ0FBQyxXQUFXLEVBQUUsaUNBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pHLENBQUM7Z0JBRUQsTUFBTSxJQUFJLEdBQVUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLFlBQVksRUFBRSxpQ0FBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFFRCxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2dCQUM3QixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVoQyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUV4RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyw0QkFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCx1QkFBdUIsQ0FBQyxvQkFBMEM7UUFDOUQsTUFBTSxPQUFPLEdBQVMsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUMzQyxPQUFPLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNqRCxPQUFPLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztRQUNuRCxPQUFPLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNqRCxPQUFPLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDLFdBQVcsQ0FBQztRQUN2RCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckUsT0FBTyxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLENBQUM7UUFDM0QsT0FBTyxDQUFDLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRyxPQUFPLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNqRCxPQUFPLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztRQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztRQUM3QyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUMzQyxPQUFPLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztRQUNyRCxPQUFPLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztRQUM3RCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQVUsRUFBRSxjQUFtQjtRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLGtCQUFrQixDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQTtJQUN2RCxDQUFDO0NBQ0o7QUEvY0Qsa0NBK2NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBKV1QgfSBmcm9tIFwiLi4vY29yZS9hdXRoL2p3dFwiO1xyXG5pbXBvcnQgeyBVc2VyREFPIH0gZnJvbSBcIi4uL2Rhb3MvdXNlci5kYW8uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElVc2VyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVXNlclJlZ2lzdHJhdGlvbkZvcm0gfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1yZWdpc3RyYXRpb24tZm9ybVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3R5cGVzL3VzZXJcIjtcclxuaW1wb3J0IHsgRXJyb3JCdWlsZGVyIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgRXJyb3JUeXBlIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLXR5cGUuZW51bVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi4vdHlwZXMvZXJyb3ItbWVzc2FnZS5lbnVtXCI7XHJcbmltcG9ydCB7IFRva2VuR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvcmUvYXV0aC90b2tlbi1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgVXNlclZlcmlmaWNhdGlvbkNvZGUgfSBmcm9tIFwiLi4vdHlwZXMvdXNlci12ZXJpZmljYXRpb24tY29kZVwiO1xyXG5pbXBvcnQgeyBBY2Nlc3NUb2tlbiB9IGZyb20gXCIuLi90eXBlcy9hY2Nlc3MtdG9rZW5cIjtcclxuaW1wb3J0IHsgREFPIH0gZnJvbSBcIi4uL2NvcmUvZGFvL2Rhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRmlsdGVyQnVpbGRlciB9IGZyb20gXCIuLi9jb3JlL2Rhby9maWx0ZXIvZmlsdGVyLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgSUpvYlNjaGVkdWxlciB9IGZyb20gXCIuLi9jb3JlL2pvYnMvam9iLXNjaGVkdWxlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSm9iIH0gZnJvbSBcIi4uL2pvYnMvam9iLmVudW1cIjtcclxuaW1wb3J0IHsgQWNjb3VudFN0YXR1cyB9IGZyb20gXCIuLi90eXBlcy9hY2NvdW50LXN0YXR1cy5lbnVtXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgR29sZkRpdmlzaW9uIH0gZnJvbSBcIi4uL3R5cGVzL2dvbGYtZGl2aXNpb24uZW51bVwiO1xyXG5pbXBvcnQgeyBMYXRlc3RSYW5rU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9sYXRlc3QtcmFuay5tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJEQU86IFVzZXJEQU87XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFjY2Vzc1Rva2VuREFPOiBEQU88QWNjZXNzVG9rZW4+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBqb2JTY2hlZHVsZXI6IElKb2JTY2hlZHVsZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHVzZXJEQU86IFVzZXJEQU8sIGFjY2Vzc1Rva2VuREFPOiBEQU88QWNjZXNzVG9rZW4+LCBqb2JTY2hlZHVsZXI6IElKb2JTY2hlZHVsZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VyREFPID0gdXNlckRBTztcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuREFPID0gYWNjZXNzVG9rZW5EQU87XHJcbiAgICAgICAgdGhpcy5qb2JTY2hlZHVsZXIgPSBqb2JTY2hlZHVsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciB1c2VyXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEBwYXJhbSB7VXNlclJlZ2lzdHJhdGlvbkZvcm19IHVzZXJSZWdpc3RyYXRpb25Gb3JtIFVzZXIncyByZWdpc3RyYXRpb24gZm9ybVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SVVzZXI+fSBSZXR1cm5zIHByb21pc2Ugb2YgdXNlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJVc2VyKHVzZXJSZWdpc3RyYXRpb25Gb3JtOiBVc2VyUmVnaXN0cmF0aW9uRm9ybSk6IFByb21pc2U8SVVzZXI+IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBQcm9taXNlPElVc2VyPiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgc2F2ZWRVc2VyOiBJVXNlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coeyB1c2VyUmVnaXN0cmF0aW9uRm9ybSB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFVzZXI6IElVc2VyID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5RW1haWwodXNlclJlZ2lzdHJhdGlvbkZvcm0uZW1haWwpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmVkVXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5FeGlzdHMsIEVycm9yTWVzc2FnZS5Vc2VyRXhpc3RzKHVzZXJSZWdpc3RyYXRpb25Gb3JtLmVtYWlsKSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGFjY2VzcyB0b2tlblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJSZWdpc3RyYXRpb25Gb3JtLmFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy52ZXJpZnlBY2Nlc3NUb2tlbih1c2VyUmVnaXN0cmF0aW9uRm9ybS5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHRoaXMubWFwVXNlclJlZ2lzdHJhdGlvbkZvcm0odXNlclJlZ2lzdHJhdGlvbkZvcm0pO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGVtYWlsIHZlcmlmaWNhdGlvbiBjb2RlXHJcbiAgICAgICAgICAgICAgICB1c2VyLmVtYWlsVmVyaWZpY2F0aW9uQ29kZSA9IGF3YWl0IFRva2VuR2VuZXJhdG9yLmdlbmVyYXRlVG9rZW4oTnVtYmVyKGNvbmZpZy52ZXJpZmljYXRpb25Db2RlTGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vc2V0IGZyZWUgdG9rZW5zIGZvciBhbWF0ZXVycyBcclxuICAgICAgICAgICAgICAgIGlmKHVzZXIuZGl2aXNpb24gPT09IEdvbGZEaXZpc2lvbi5DaGFtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXIuYW1hdGV1clRva2VucyA9IHRoaXMuZ2V0RnJlZUFtYXRldXJUb2tlbnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB1c2VyXHJcbiAgICAgICAgICAgICAgICBzYXZlZFVzZXIgPSBhd2FpdCB0aGlzLnVzZXJEQU8uY3JlYXRlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBhY2Nlc3MgdG9rZW5cclxuICAgICAgICAgICAgICAgIGlmICh1c2VyUmVnaXN0cmF0aW9uRm9ybS5hY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwbHlBY2Nlc3NUb2tlbihzYXZlZFVzZXIuX2lkLCB1c2VyUmVnaXN0cmF0aW9uRm9ybS5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2NoZWR1bGUgdXNlciBlbWFpbCB2ZXJpZmljYXRpb24gam9iXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmpvYlNjaGVkdWxlci5ub3coSm9iLlVzZXJFbWFpbFZlcmlmaWNhdGlvbkpvYiwge3VzZXI6IHNhdmVkVXNlcn0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBwZWRVc2VyV2l0aExhdGVzdFJhbmsoc2F2ZWRVc2VyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShzYXZlZFVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHJpdmF0ZSAgZ2V0RnJlZUFtYXRldXJUb2tlbnMoKSB7XHJcbiAgICAgICAgbGV0IHRva2VucyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCAzIDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9rZW5zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBtYXBwZWRVc2VyV2l0aExhdGVzdFJhbmsoc2F2ZWRVc2VyOklVc2VyKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcnNJblJhbmsgPSBhd2FpdCBMYXRlc3RSYW5rU2NoZW1hLmZpbmQoe1xyXG4gICAgICAgICAgICBmaXJzdE5hbWU6eyRyZWdleDogc2F2ZWRVc2VyLmZpcnN0TmFtZSwgJG9wdGlvbnM6IFwiaVwifSwgLy9zYXZlZFVzZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTp7JHJlZ2V4OiBzYXZlZFVzZXIubGFzdE5hbWUsICRvcHRpb25zOiBcImlcIn0sXHJcbiAgICAgICAgICAgIGRpdmlzaW9uOnNhdmVkVXNlci5kaXZpc2lvbixcclxuICAgICAgICAgICAgbmF0aW9uYWxpdHk6c2F2ZWRVc2VyLm5hdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICB1c2VyIDogdW5kZWZpbmVkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodXNlcnNJblJhbms/Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VySW5SYW5rID0gdXNlcnNJblJhbmtbMF07XHJcbiAgICAgICAgICAgIGF3YWl0IExhdGVzdFJhbmtTY2hlbWEuZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB1c2VySW5SYW5rLl9pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlciA6IHNhdmVkVXNlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZXhlYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcXVlc3QgZW1haWwgdmVyaWZpY2F0aW9uIGNvZGVcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJRCBUaGUgdXNlcidzIElEXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxVc2VyVmVyaWZpY2F0aW9uQ29kZT59IFJldHVybnMgcHJvbWlzZSBvZiB1c2VyIHZlcmlmaWNhdGlvbiBjb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0RW1haWxWZXJpZmljYXRpb25Db2RlKHVzZXJJRDogc3RyaW5nKTogUHJvbWlzZTxVc2VyVmVyaWZpY2F0aW9uQ29kZT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IElVc2VyID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5SUQodXNlcklEKTtcclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmlzQ29uZmlybWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5FeGlzdHMsIEVycm9yTWVzc2FnZS5FbWFpbENvbmZpcm1lZCh1c2VyLmVtYWlsKSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbFZlcmlmaWNhdGlvbkNvZGUgPSBhd2FpdCBUb2tlbkdlbmVyYXRvci5nZW5lcmF0ZVRva2VuKE51bWJlcihjb25maWcudmVyaWZpY2F0aW9uQ29kZUxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVzZXJEQU8udXBkYXRlKHVzZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uQ29kZTogdXNlci5lbWFpbFZlcmlmaWNhdGlvbkNvZGVcclxuICAgICAgICAgICAgICAgIH0gYXMgVXNlclZlcmlmaWNhdGlvbkNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZUdlbmVyaWMoRXJyb3JNZXNzYWdlLkVtYWlsVmVyaWZpY2F0aW9uQ29kZSh1c2VySUQpLCBlcnJvci5tZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZ5IHVzZXIgZW1haWxcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHthbnl9IHVzZXJFbWFpbCBUaGUgZW1haWwgb2YgdGhlIHVzZXIuXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gdmVyaWZpY2F0aW9uQ29kZSBUaGUgdmVyaWZpY2F0aW9uIHRva2VuIHNlbnQgdG8gdGhlIHVzZXIncyBlbWFpbFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBzdWNjZWVkZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB2ZXJpZnlVc2VyRW1haWwodXNlckVtYWlsOiBzdHJpbmcsIHZlcmlmaWNhdGlvbkNvZGU6IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IElVc2VyID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5RW1haWwodXNlckVtYWlsKTtcclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc1ZlcmlmeUVtYWlsVmVyaWZpY2F0aW9uQ29kZVZhbGlkOiBib29sZWFuID0gdmVyaWZpY2F0aW9uQ29kZSA9PT0gdXNlci5lbWFpbFZlcmlmaWNhdGlvbkNvZGUgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzVmVyaWZ5RW1haWxWZXJpZmljYXRpb25Db2RlVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkludmFsaWRDb2RlLCBFcnJvck1lc3NhZ2UuSW52YWxpZEVtYWlsT3JWZXJpZmljYXRpb25Db2RlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVzZXIuaXNDb25maXJtZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB1c2VyLmVtYWlsVmVyaWZpY2F0aW9uQ29kZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXNlckRBTy51cGRhdGUodXNlcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VuZHMgYSBzZWN1cml0eSBjb2RlIHdoaWNoIGlzIG5lZWRlZCBmb3IgcmVzZXR0aW5nIHRoZSB1c2VycyBwYXNzd29yZC5cclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJFbWFpbCBUaGUgZW1haWwgb2YgdGhlIHVzZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yQ29uZGl0aW9uPHN0cmluZz5bXX0gZXJyb3JzIEVycm9yIGNvbmRpdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBVc2VyIHZlcmlmaWNhdGlvbiBjb2RlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZFZlcmlmaWNhdGlvbkNvZGUodXNlckVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgdXNlcjogSVVzZXIgPSBhd2FpdCB0aGlzLnVzZXJEQU8uZ2V0QnlFbWFpbCh1c2VyRW1haWwpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIuaXNDb25maXJtZWQgfHwgdXNlci5zdGF0dXMgIT09IEFjY291bnRTdGF0dXMuQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNldCByZXNldCBwYXNzd29yZCB2ZXJpZmljYXRpb24gY29kZVxyXG4gICAgICAgICAgICB1c2VyLnJlc2V0UGFzc3dvcmRWZXJpZmljYXRpb25Db2RlID0gYXdhaXQgVG9rZW5HZW5lcmF0b3IuZ2VuZXJhdGVUb2tlbihOdW1iZXIoY29uZmlnLnZlcmlmaWNhdGlvbkNvZGVMZW5ndGgpKVxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdXNlclxyXG4gICAgICAgICAgICB1c2VyID0gYXdhaXQgdGhpcy51c2VyREFPLnVwZGF0ZSh1c2VyKTtcclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgdXNlciBmb3Jnb3QgcGFzc3dvcmQgcmVxdWVzdCBqb2JcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5qb2JTY2hlZHVsZXIubm93KEpvYi5Vc2VyRm9yZ290UGFzc3dvcmRSZXF1ZXN0Sm9iLCB7IHVzZXI6IHVzZXIgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGVHZW5lcmljKEVycm9yTWVzc2FnZS5SZXNldFZlcmlmaWNhdGlvbkNvZGUodXNlckVtYWlsKSwgZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgdXNlcidzIHBhc3N3b3JkIGFuZCBzZW5kcyB0aGUgbmV3IHBhc3N3b3JkLlxyXG4gICAgICogQGFzeW5jXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlckVtYWlsIFRoZSBlbWFpbCBvZiB0aGUgdXNlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nP30gdmVyaWZpY2F0aW9uQ29kZSBUaGUgdmVyaWZpY2F0aW9uIGNvZGUgbmVlZGVkIGZvciBhdXRoZW50aWNhdGlvbi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nP30gbmV3UGFzc3dvcmQgVGhlIG5ldyBwYXNzd29yZC5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBXaGV0aGVyIHRoZSBvcGVyYXRpb24gc3VjY2VlZGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZCh1c2VyRW1haWw6IHN0cmluZywgdmVyaWZpY2F0aW9uQ29kZTogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlcjogSVVzZXIgPSBhd2FpdCB0aGlzLnVzZXJEQU8uZ2V0QnlFbWFpbCh1c2VyRW1haWwpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkF1dGhlbnRpY2F0aW9uLCBFcnJvck1lc3NhZ2UuSW52YWxpZENyZWRlbnRpYWxzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzUmVzZXRQYXNzd29yZFZlcmlmaWNhdGlvbkNvZGVWYWxpZDogYm9vbGVhbiA9IHZlcmlmaWNhdGlvbkNvZGUgPT09IHVzZXIucmVzZXRQYXNzd29yZFZlcmlmaWNhdGlvbkNvZGUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCFpc1Jlc2V0UGFzc3dvcmRWZXJpZmljYXRpb25Db2RlVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkludmFsaWRDb2RlLCBFcnJvck1lc3NhZ2UuSW52YWxpZEVtYWlsT3JWZXJpZmljYXRpb25Db2RlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcclxuICAgICAgICAgICAgdXNlci5yZXNldFBhc3N3b3JkVmVyaWZpY2F0aW9uQ29kZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXNlckRBTy51cGRhdGUodXNlcik7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXNlckRBTy5jaGFuZ2VQYXNzd29yZCh1c2VyLl9pZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGVHZW5lcmljKEVycm9yTWVzc2FnZS5SZXNldFBhc3N3b3JkKHVzZXJFbWFpbCksIGVycm9yLm1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHVzZXJcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJRCBUaGUgaWQgb2YgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSB7YW55fSBmaWVsZHNUb1VwZGF0ZSBGaWVsZHMgdGhhdCBzaG91bGQgYmUgdXBkYXRlZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SVVzZXI+fSBSZXR1cm5zIHByb21pc2Ugb2YgdXNlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlVXNlcih1c2VySUQ6IHN0cmluZywgZmllbGRzVG9VcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IFByb21pc2U8b2JqZWN0PiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyOiBJVXNlciA9IGF3YWl0IHRoaXMudXNlckRBTy5nZXRCeUlEKHVzZXJJRCk7XHJcbiAgICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyTW9kZWwodXNlciwgZmllbGRzVG9VcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy51c2VyREFPLnVwZGF0ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIHVzZXJcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJRCBUaGUgaWQgb2YgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQgb2YgdGhlIHVzZXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBXaGV0aGVyIHRoZSBvcGVyYXRpb24gc3VjY2VlZGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlVXNlcih1c2VySUQ6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IElVc2VyID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5SUQodXNlcklEKTtcclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGlzUGFzc3dvcmRDb3JyZWN0OiBib29sZWFuID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBpZiAoIWlzUGFzc3dvcmRDb3JyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBhd2FpdCB0aGlzLnVzZXJEQU8uZGVsZXRlKHVzZXIuX2lkKTtcclxuICAgICAgICAgICAgaWYgKCFkZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFVzZWQgdG8gY2hhbmdlIHRoZSB1c2VycyBwYXNzd29yZC5cclxuICAgICogQGFzeW5jXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySUQgVGhlIElEIG9mIHRoZSB1c2VyLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGFzc3dvcmQgVGhlIG9sZCBwYXNzd29yZC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkIFRoZSBuZXcgcGFzc3dvcmQuXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgbWVzc2FnZSBmb3IgdGhlIG9wZXJhdGlvbiByZXN1bHQuXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGNoYW5nZVBhc3N3b3JkKHVzZXJJRDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyOiBJVXNlciA9IGF3YWl0IHRoaXMudXNlckRBTy5nZXRCeUlEKHVzZXJJRCk7XHJcbiAgICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuRG9lc05vdEV4aXN0LCBFcnJvck1lc3NhZ2UuVXNlckRvZXNOb3RFeGlzdCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc1Bhc3N3b3JkQ29ycmVjdDogYm9vbGVhbiA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKG9sZFBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkQ29ycmVjdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuQXV0aGVudGljYXRpb24sIEVycm9yTWVzc2FnZS5JbnZhbGlkQ3JlZGVudGlhbHMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy51c2VyREFPLmNoYW5nZVBhc3N3b3JkKHVzZXIuX2lkLCBuZXdQYXNzd29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXNlci5faWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGVHZW5lcmljKEVycm9yTWVzc2FnZS5DaGFuZ2VQYXNzd29yZCh1c2VySUQpLCBlcnJvci5tZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBGZXRjaGVzIGEgdXNlciBieSBpZC5cclxuICAgICogQGFzeW5jXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySUQgVGhlIGlkIG9mIHRoZSB1c2VyLlxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJVXNlcj59IFRoZSBmZXRjaGVkIHVzZXIuXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJCeUlkKHVzZXJJRDogc3RyaW5nKTogUHJvbWlzZTxJVXNlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IElVc2VyID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5SUQodXNlcklEKTtcclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3JCdWlsZGVyLmdlbmVyYXRlKEVycm9yVHlwZS5Eb2VzTm90RXhpc3QsIEVycm9yTWVzc2FnZS5Vc2VyRG9lc05vdEV4aXN0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZUdlbmVyaWMoRXJyb3JNZXNzYWdlLkdldEJ5SUQodXNlcklEKSwgZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsVXNlcigpOiBQcm9taXNlPElVc2VyW10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiaXNBZG1pbkNyZWF0ZWRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5idWlsZEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJzOiBJVXNlcltdID0gYXdhaXQgdGhpcy51c2VyREFPLmdldEJ5RmlsdGVyQXJyYXkoZmlsdGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLlVzZXJEb2VzTm90RXhpc3QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXNlcnM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZUdlbmVyaWMoRXJyb3JNZXNzYWdlLk5vdEV4aXN0cygpLCBlcnJvci5tZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgVXNlciBCeSBFbWFpbFxyXG4gICAgKiBAYXN5bmNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsIFVzZXIncyBlbWFpbFxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJVXNlcj59IFJldHVybnMgcHJvbWlzZSBvZiB1c2VyXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPElVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRBTy5nZXRCeUVtYWlsKGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmeSBBY2Nlc3MgVG9rZW5cclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2Vzc1Rva2VuIERpdmlzaW9uIGFjY2VzcyB0b2tlblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBzdWNjZWVkZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB2ZXJpZnlBY2Nlc3NUb2tlbihhY2Nlc3NUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInRva2VuXCIsIGFjY2Vzc1Rva2VuKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkRmlyc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZEFjY2Vzc1Rva2VuOiBBY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuYWNjZXNzVG9rZW5EQU8uZ2V0QnlGaWx0ZXIoZmlsdGVyKTtcclxuICAgICAgICAgICAgaWYgKCFzdG9yZWRBY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuSW52YWxpZENvZGUsIEVycm9yTWVzc2FnZS5JbnZhbGlkQWNjZXNzVG9rZW4pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkdlbmVyaWMsIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbHkgQWNjZXNzIFRva2VuXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySUQgVGhlIGlkIG9mIHRoZSB1c2VyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2Vzc1Rva2VuIERpdmlzaW9uIGFjY2VzcyB0b2tlblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFdoZXRoZXIgdGhlIG9wZXJhdGlvbiBzdWNjZWVkZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBhcHBseUFjY2Vzc1Rva2VuKHVzZXJJRDogc3RyaW5nLCBhY2Nlc3NUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpbHRlcihcInRva2VuXCIsIGFjY2Vzc1Rva2VuKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkRmlyc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZEFjY2Vzc1Rva2VuOiBBY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuYWNjZXNzVG9rZW5EQU8uZ2V0QnlGaWx0ZXIoZmlsdGVyKTtcclxuICAgICAgICAgICAgaWYgKCFzdG9yZWRBY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuSW52YWxpZENvZGUsIEVycm9yTWVzc2FnZS5JbnZhbGlkQWNjZXNzVG9rZW4pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlcjogSVVzZXIgPSBhd2FpdCB0aGlzLnVzZXJEQU8uZ2V0QnlJRCh1c2VySUQpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvckJ1aWxkZXIuZ2VuZXJhdGUoRXJyb3JUeXBlLkRvZXNOb3RFeGlzdCwgRXJyb3JNZXNzYWdlLlVzZXJEb2VzTm90RXhpc3QpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ29sZkRpdmlzaW9uID0gc3RvcmVkQWNjZXNzVG9rZW4uZ29sZkRpdmlzaW9uO1xyXG4gICAgICAgICAgICB1c2VyLmRpdmlzaW9uID0gZ29sZkRpdmlzaW9uO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnVzZXJEQU8udXBkYXRlKHVzZXIpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hY2Nlc3NUb2tlbkRBTy5kZWxldGUoc3RvcmVkQWNjZXNzVG9rZW4uX2lkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFwVXNlclJlZ2lzdHJhdGlvbkZvcm0odXNlclJlZ2lzdHJhdGlvbkZvcm06IFVzZXJSZWdpc3RyYXRpb25Gb3JtKTogSVVzZXIge1xyXG4gICAgICAgIGNvbnN0IG5ld1VzZXI6IFVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIG5ld1VzZXIuZW1haWwgPSB1c2VyUmVnaXN0cmF0aW9uRm9ybS5lbWFpbDtcclxuICAgICAgICBuZXdVc2VyLnBhc3N3b3JkID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0ucGFzc3dvcmQ7XHJcbiAgICAgICAgbmV3VXNlci5maXJzdE5hbWUgPSB1c2VyUmVnaXN0cmF0aW9uRm9ybS5maXJzdE5hbWU7XHJcbiAgICAgICAgbmV3VXNlci5sYXN0TmFtZSA9IHVzZXJSZWdpc3RyYXRpb25Gb3JtLmxhc3ROYW1lO1xyXG4gICAgICAgIG5ld1VzZXIubmF0aW9uYWxpdHkgPSB1c2VyUmVnaXN0cmF0aW9uRm9ybS5uYXRpb25hbGl0eTtcclxuICAgICAgICBuZXdVc2VyLmNvdW50cnlPZlJlc2lkZW5jZSA9IHVzZXJSZWdpc3RyYXRpb25Gb3JtLmNvdW50cnlPZlJlc2lkZW5jZTtcclxuICAgICAgICBuZXdVc2VyLmhhbmRpY2FwSW5kZXggPSB1c2VyUmVnaXN0cmF0aW9uRm9ybS5oYW5kaWNhcEluZGV4O1xyXG4gICAgICAgIG5ld1VzZXIucGdhTWVtYmVyTnVtYmVyID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0ucGdhTWVtYmVyTnVtYmVyID8gdXNlclJlZ2lzdHJhdGlvbkZvcm0ucGdhTWVtYmVyTnVtYmVyIDogbnVsbDtcclxuICAgICAgICBuZXdVc2VyLmFjY2Vzc1Rva2VuID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0uYWNjZXNzVG9rZW4gPyB1c2VyUmVnaXN0cmF0aW9uRm9ybS5hY2Nlc3NUb2tlbiA6IG51bGw7XHJcbiAgICAgICAgbmV3VXNlci5kaXZpc2lvbiA9IHVzZXJSZWdpc3RyYXRpb25Gb3JtLmRpdmlzaW9uO1xyXG4gICAgICAgIG5ld1VzZXIuaG9tZUNsdWIgPSB1c2VyUmVnaXN0cmF0aW9uRm9ybS5ob21lQ2x1YjtcclxuICAgICAgICBuZXdVc2VyLmdlbmRlciA9IHVzZXJSZWdpc3RyYXRpb25Gb3JtLmdlbmRlcjtcclxuICAgICAgICBuZXdVc2VyLnN0YXRlID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0uc3RhdGU7XHJcbiAgICAgICAgbmV3VXNlci5wcm9mZXNzaW9uID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0ucHJvZmVzc2lvbjtcclxuICAgICAgICBuZXdVc2VyLmlzQWRtaW5DcmVhdGVkID0gdXNlclJlZ2lzdHJhdGlvbkZvcm0uaXNBZG1pbkNyZWF0ZWQ7XHJcbiAgICAgICAgcmV0dXJuIG5ld1VzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVXNlck1vZGVsKHVzZXI6IFVzZXIsIGZpZWxkc1RvVXBkYXRlOiBhbnkpIHtcclxuICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IGZpZWxkc1RvVXBkYXRlLmZpcnN0TmFtZTtcclxuICAgICAgICB1c2VyLmxhc3ROYW1lID0gZmllbGRzVG9VcGRhdGUubGFzdE5hbWU7XHJcbiAgICAgICAgdXNlci5uYXRpb25hbGl0eSA9IGZpZWxkc1RvVXBkYXRlLm5hdGlvbmFsaXR5O1xyXG4gICAgICAgIHVzZXIuY291bnRyeU9mUmVzaWRlbmNlID0gZmllbGRzVG9VcGRhdGUuY291bnRyeU9mUmVzaWRlbmNlO1xyXG4gICAgICAgIHVzZXIuc3RhdGUgPSBmaWVsZHNUb1VwZGF0ZS5zdGF0ZTtcclxuICAgICAgICB1c2VyLmhhbmRpY2FwSW5kZXggPSBmaWVsZHNUb1VwZGF0ZS5oYW5kaWNhcEluZGV4O1xyXG4gICAgICAgIHVzZXIuaG9tZUNsdWIgPSBmaWVsZHNUb1VwZGF0ZS5ob21lQ2x1YjtcclxuICAgICAgICB1c2VyLmdlbmRlciA9IGZpZWxkc1RvVXBkYXRlLmdlbmRlcjtcclxuICAgICAgICB1c2VyLmVtYWlsID0gZmllbGRzVG9VcGRhdGUuZW1haWw7XHJcbiAgICAgICAgdXNlci5wdWJsaWNQcm9maWxlcyA9IGZpZWxkc1RvVXBkYXRlLnB1YmxpY1Byb2ZpbGVzO1xyXG4gICAgICAgIHVzZXIucHJvZmVzc2lvbiA9IGZpZWxkc1RvVXBkYXRlLnByb2Zlc3Npb247XHJcbiAgICAgICAgdXNlci5ob21lUGFnZSA9IGZpZWxkc1RvVXBkYXRlLmhvbWVQYWdlO1xyXG4gICAgICAgIHVzZXIub3RoZXJMaW5rcyA9IGZpZWxkc1RvVXBkYXRlLm90aGVyTGlua3M7XHJcbiAgICAgICAgdXNlci5zaG9ydFVwZGF0ZSA9IGZpZWxkc1RvVXBkYXRlLnNob3J0VXBkYXRlO1xyXG4gICAgICAgIHVzZXIuaW1hZ2VEYXRhID0gZmllbGRzVG9VcGRhdGUuaW1hZ2VEYXRhO1xyXG4gICAgICAgIHVzZXIuYmlvZ3JhcGh5ID0gZmllbGRzVG9VcGRhdGUuYmlvZ3JhcGh5O1xyXG4gICAgICAgIHVzZXIub3duQ2hhcml0eUxpbmsgPSBmaWVsZHNUb1VwZGF0ZS5vd25DaGFyaXR5TGluaztcclxuICAgICAgICB1c2VyLnN1cHBvcnRDaGFyaXRpZXMgPSBmaWVsZHNUb1VwZGF0ZS5zdXBwb3J0Q2hhcml0aWVzO1xyXG4gICAgICAgIHVzZXIudmlkZW9Nc2dMaW5rID0gZmllbGRzVG9VcGRhdGUudmlkZW9Nc2dMaW5rO1xyXG4gICAgICAgIHVzZXIuc3BvbnNvcnNMaW5rID0gZmllbGRzVG9VcGRhdGUuc3BvbnNvcnNMaW5rO1xyXG4gICAgICAgIHVzZXIuc2hvcExpbmsgPSBmaWVsZHNUb1VwZGF0ZS5zaG9wTGluaztcclxuICAgICAgICB1c2VyLm1lcmNoYW5kaXNlTGluayA9IGZpZWxkc1RvVXBkYXRlLm1lcmNoYW5kaXNlTGluaztcclxuICAgICAgICB1c2VyLm1hbmFnZXJEZXRhaWxzID0gZmllbGRzVG9VcGRhdGUubWFuYWdlckRldGFpbHM7XHJcbiAgICAgICAgdXNlci5wdWJsaWNpc3REZXRhaWxzID0gZmllbGRzVG9VcGRhdGUucHVibGljaXN0RGV0YWlscztcclxuICAgICAgICB1c2VyLmFnZW50RGV0YWlscyA9IGZpZWxkc1RvVXBkYXRlLmFnZW50RGV0YWlscztcclxuICAgICAgICB1c2VyLnBsYXlHb2xmID0gZmllbGRzVG9VcGRhdGUucGxheUdvbGY7XHJcbiAgICAgICAgdXNlci5zaW5nRm9yQ2hhcml0eSA9IGZpZWxkc1RvVXBkYXRlLnNpbmdGb3JDaGFyaXR5XHJcbiAgICB9XHJcbn0iXX0=