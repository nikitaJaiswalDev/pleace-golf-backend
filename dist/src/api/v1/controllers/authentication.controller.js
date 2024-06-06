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
exports.AuthenticationController = void 0;
const express_1 = require("express");
const passport = require("passport");
const error_type_enum_1 = require("../../../core/errors/error-type.enum");
const error_writer_1 = require("../../../core/errors/error-writer");
const mapper_1 = require("../mapper");
const account_status_enum_1 = require("../../../types/account-status.enum");
const error_message_enum_1 = require("../../../types/error-message.enum");
const logging_1 = require("../../../core/logging");
const golf_division_enum_1 = require("../../../types/golf-division.enum");
class AuthenticationController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.post("/login", (req, res, next) => { this.login(req, res, next); });
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /auth/login:
     *  post:
     *      description: Attempts to log user in
     *      tags:
     *          - Auth
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: login
     *            type: LoginUserRequest
     *            in: body
     *            schema:
     *               $ref: '#/definitions/LoginUserRequest'
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  $ref: '#/definitions/LoginUserResponse'
     *          400:
     *              description: Missing or invalid parameter
     *          401:
     *              description: Invalid credentials
     *          500:
     *              description: Server error
     */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info("logging via : " + req.hostname);
            passport.authenticate("local", { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    error_writer_1.ErrorWriter.writeErrorTypeResponse(error_type_enum_1.ErrorType.Authentication, info.message, res);
                }
                else if (req.hostname === 'pleace-awaken.me' && user.division !== golf_division_enum_1.GolfDivision.Celebrity && user.division !== golf_division_enum_1.GolfDivision.TourPlayer) {
                    error_writer_1.ErrorWriter.writeErrorTypeResponse(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.CannotLoginInApp, res);
                }
                else if (user.status === account_status_enum_1.AccountStatus.Disabled) {
                    error_writer_1.ErrorWriter.writeErrorTypeResponse(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.AccountDisabled, res);
                }
                else if (!user.isConfirmed) {
                    error_writer_1.ErrorWriter.writeErrorTypeResponse(error_type_enum_1.ErrorType.Authentication, error_message_enum_1.ErrorMessage.AccountNotConfirmed, res);
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        // Return JWT
                        this.authService.authenticateUser(user._id).then((jwt) => {
                            res.status(200).send({
                                user: mapper_1.Mapper.mapUserToUserProfile(user),
                                token: jwt,
                            });
                        });
                    });
                }
            })(req, res, next);
        });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcGkvdjEvY29udHJvbGxlcnMvYXV0aGVudGljYXRpb24uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBa0U7QUFDbEUscUNBQXFDO0FBS3JDLDBFQUFpRTtBQUNqRSxvRUFBZ0U7QUFFaEUsc0NBQW1DO0FBQ25DLDRFQUFtRTtBQUNuRSwwRUFBaUU7QUFDakUsbURBQStDO0FBQy9DLDBFQUFpRTtBQUdqRSxNQUFhLHdCQUF3QjtJQUtqQyxZQUFZLFdBQWtDLEVBQUUsV0FBd0I7UUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3JCLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDVSxLQUFLLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjs7WUFDOUQsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBVSxFQUFFLElBQVcsRUFBRSxJQUFvQixFQUFFLEVBQUU7Z0JBQ2pHLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLDBCQUFXLENBQUMsc0JBQXNCLENBQUMsMkJBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDcEYsQ0FBQztxQkFBTSxJQUFHLEdBQUcsQ0FBQyxRQUFRLEtBQUssa0JBQWtCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxpQ0FBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLGlDQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3JJLDBCQUFXLENBQUMsc0JBQXNCLENBQUMsMkJBQVMsQ0FBQyxjQUFjLEVBQUUsaUNBQVksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckcsQ0FBQztxQkFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssbUNBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUMsMEJBQVcsQ0FBQyxzQkFBc0IsQ0FBQywyQkFBUyxDQUFDLGNBQWMsRUFBRSxpQ0FBWSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDcEcsQ0FBQztxQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN6QiwwQkFBVyxDQUFDLHNCQUFzQixDQUFDLDJCQUFTLENBQUMsY0FBYyxFQUFFLGlDQUFZLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3hHLENBQUM7cUJBQ0ksQ0FBQztvQkFDRixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNwQixJQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUFDLENBQUM7d0JBRTlCLGFBQWE7d0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7NEJBQzdELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNqQixJQUFJLEVBQUUsZUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQ0FDdkMsS0FBSyxFQUFFLEdBQUc7NkJBQ1EsQ0FBQyxDQUFDO3dCQUM1QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQUE7Q0FDSjtBQS9FRCw0REErRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uLCBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcclxuaW1wb3J0IHsgSVZlcmlmeU9wdGlvbnMgfSBmcm9tIFwicGFzc3BvcnQtbG9jYWxcIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTG9naW5Vc2VyUmVzcG9uc2UgfSBmcm9tIFwiLi4vZHRvcy9yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBJVXNlciB9IGZyb20gXCIuLi8uLi8uLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEVycm9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2Vycm9ycy9lcnJvci10eXBlLmVudW1cIjtcclxuaW1wb3J0IHsgRXJyb3JXcml0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lcnJvcnMvZXJyb3Itd3JpdGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNYXBwZXIgfSBmcm9tIFwiLi4vbWFwcGVyXCI7XHJcbmltcG9ydCB7IEFjY291bnRTdGF0dXMgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXMvYWNjb3VudC1zdGF0dXMuZW51bVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXMvZXJyb3ItbWVzc2FnZS5lbnVtXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgR29sZkRpdmlzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVzL2dvbGYtZGl2aXNpb24uZW51bVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB1c2VyU2VydmljZTogVXNlclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGF1dGhTZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UgPSBhdXRoU2VydmljZTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gUm91dGVyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIucG9zdChcIi9sb2dpblwiLFxyXG4gICAgICAgICAgICAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHsgdGhpcy5sb2dpbihyZXEsIHJlcywgbmV4dCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSb3V0ZXIoKTogUm91dGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2F1dGgvbG9naW46XHJcbiAgICAgKiAgcG9zdDpcclxuICAgICAqICAgICAgZGVzY3JpcHRpb246IEF0dGVtcHRzIHRvIGxvZyB1c2VyIGluXHJcbiAgICAgKiAgICAgIHRhZ3M6XHJcbiAgICAgKiAgICAgICAgICAtIEF1dGhcclxuICAgICAqICAgICAgcHJvZHVjZXM6XHJcbiAgICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICAqICAgICAgICAgIC0gbmFtZTogbG9naW5cclxuICAgICAqICAgICAgICAgICAgdHlwZTogTG9naW5Vc2VyUmVxdWVzdFxyXG4gICAgICogICAgICAgICAgICBpbjogYm9keVxyXG4gICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0xvZ2luVXNlclJlcXVlc3QnXHJcbiAgICAgKiAgICAgIHJlc3BvbnNlczpcclxuICAgICAqICAgICAgICAgIDIwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICAqICAgICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0xvZ2luVXNlclJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBNaXNzaW5nIG9yIGludmFsaWQgcGFyYW1ldGVyXHJcbiAgICAgKiAgICAgICAgICA0MDE6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IEludmFsaWQgY3JlZGVudGlhbHNcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBsb2dpbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwibG9nZ2luZyB2aWEgOiBcIityZXEuaG9zdG5hbWUpO1xyXG4gICAgICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcImxvY2FsXCIsIHsgc2Vzc2lvbjogZmFsc2UgfSwgKGVycjogRXJyb3IsIHVzZXI6IElVc2VyLCBpbmZvOiBJVmVyaWZ5T3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7IHJldHVybiBuZXh0KGVycik7IH1cclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBFcnJvcldyaXRlci53cml0ZUVycm9yVHlwZVJlc3BvbnNlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgaW5mby5tZXNzYWdlLCByZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocmVxLmhvc3RuYW1lID09PSAncGxlYWNlLWF3YWtlbi5tZScgJiYgdXNlci5kaXZpc2lvbiAhPT0gR29sZkRpdmlzaW9uLkNlbGVicml0eSAmJiB1c2VyLmRpdmlzaW9uICE9PSBHb2xmRGl2aXNpb24uVG91clBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgRXJyb3JXcml0ZXIud3JpdGVFcnJvclR5cGVSZXNwb25zZShFcnJvclR5cGUuQXV0aGVudGljYXRpb24sIEVycm9yTWVzc2FnZS5DYW5ub3RMb2dpbkluQXBwLCByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVzZXIuc3RhdHVzID09PSBBY2NvdW50U3RhdHVzLkRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBFcnJvcldyaXRlci53cml0ZUVycm9yVHlwZVJlc3BvbnNlKEVycm9yVHlwZS5BdXRoZW50aWNhdGlvbiwgRXJyb3JNZXNzYWdlLkFjY291bnREaXNhYmxlZCwgcmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghdXNlci5pc0NvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgRXJyb3JXcml0ZXIud3JpdGVFcnJvclR5cGVSZXNwb25zZShFcnJvclR5cGUuQXV0aGVudGljYXRpb24sIEVycm9yTWVzc2FnZS5BY2NvdW50Tm90Q29uZmlybWVkLCByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVxLmxvZ2luKHVzZXIsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7IHJldHVybiBuZXh0KGVycik7IH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBKV1RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZVVzZXIodXNlci5faWQpLnRoZW4oKGp3dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IE1hcHBlci5tYXBVc2VyVG9Vc2VyUHJvZmlsZSh1c2VyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBqd3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgTG9naW5Vc2VyUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkocmVxLCByZXMsIG5leHQpO1xyXG4gICAgfVxyXG59Il19