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
exports.PassportAuth = void 0;
const passport = require("passport");
const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const config_1 = require("../../config");
const error_message_enum_1 = require("../../types/error-message.enum");
const logging_1 = require("../../core/logging");
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
var PassportAuth;
(function (PassportAuth) {
    passport.serializeUser((jwtPayload, done) => {
        logging_1.Logger.info("serializeUser");
        //done(undefined, user._id);
        done(undefined, jwtPayload);
    });
    passport.deserializeUser((jwtPayload, done) => {
        logging_1.Logger.info("deserializeUser");
        done(undefined, jwtPayload);
    });
    /**
     * Login Required middleware.
     */
    PassportAuth.isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
    };
    function configAuth(passport, userService) {
        /**
         * Authenticate with Email and Password.
         */
        passport.use(new LocalStrategy({ usernameField: "email", session: false }, function (email, password, done) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserByEmail(email);
                if (!user) {
                    return done(undefined, false, { message: error_message_enum_1.ErrorMessage.InvalidCredentials });
                }
                const isPasswordCorrect = yield bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    //return Promise.reject(ErrorBuilder.generate(ErrorType.Authentication, this.errors.InvalidCredentials));
                    return done(undefined, false, { message: error_message_enum_1.ErrorMessage.InvalidCredentials });
                }
                return done(undefined, user);
            });
        }));
        /**
        * Authenticate with JWT
        *
        */
        var opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = config_1.default.jwtSecret;
        opts.issuer = config_1.default.jwtIssuer;
        opts.audience = config_1.default.jwtAudience;
        opts.algorithm = ["HS512"];
        passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
            return done(null, jwtPayload);
            /*User.findOne({ id: jwtPayload.sub }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });*/
        }));
    }
    PassportAuth.configAuth = configAuth;
    /**
     * Authorization Required middleware.
 
    export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
        const provider = req.path.split("/").slice(-1)[0];

        const user = req.user as UserDocument;
        if (_.find(user.tokens, { kind: provider })) {
            next();
        } else {
            res.redirect(`/auth/${provider}`);
        }
    };*/
})(PassportAuth || (exports.PassportAuth = PassportAuth = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL2F1dGgvcGFzc3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUNoRCw0Q0FBNEM7QUFDNUMsaUNBQWlDO0FBR2pDLHlDQUFrQztBQUdsQyx1RUFBOEQ7QUFDOUQsZ0RBQTRDO0FBRTVDLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDN0MsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUN6QyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0FBRTFDLElBQWlCLFlBQVksQ0FtRjVCO0FBbkZELFdBQWlCLFlBQVk7SUFFekIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN4QyxnQkFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3Qiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDMUMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBS0g7O09BRUc7SUFDVSw0QkFBZSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDL0UsSUFBSSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztZQUN4QixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixTQUFnQixVQUFVLENBQUMsUUFBd0IsRUFBRSxXQUF3QjtRQUN6RTs7V0FFRztRQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFlLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSTs7Z0JBQzNHLE1BQU0sSUFBSSxHQUFVLE1BQU0sV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUNBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBQ2hGLENBQUM7Z0JBQ0QsTUFBTSxpQkFBaUIsR0FBWSxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFakYsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3JCLHlHQUF5RztvQkFDekcsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxpQ0FBWSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztTQUFBLENBQUMsQ0FBQyxDQUFDO1FBRUo7OztVQUdFO1FBQ0YsSUFBSSxJQUFJLEdBQVMsRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNCLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsVUFBVSxFQUFFLElBQUk7WUFDekQsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlCOzs7Ozs7Ozs7aUJBU0s7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQTFDZSx1QkFBVSxhQTBDekIsQ0FBQTtJQUdEOzs7Ozs7Ozs7Ozs7UUFZSTtBQUNSLENBQUMsRUFuRmdCLFlBQVksNEJBQVosWUFBWSxRQW1GNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnRMb2NhbCBmcm9tIFwicGFzc3BvcnQtbG9jYWxcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnRKV1QgZnJvbSBcInBhc3Nwb3J0LWp3dFwiO1xyXG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUGFzc3BvcnRTdGF0aWMgfSBmcm9tIFwicGFzc3BvcnRcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vdHlwZXMvZXJyb3ItbWVzc2FnZS5lbnVtXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuXHJcbmNvbnN0IExvY2FsU3RyYXRlZ3kgPSBwYXNzcG9ydExvY2FsLlN0cmF0ZWd5O1xyXG5jb25zdCBKV1RTdHJhdGVneSA9IHBhc3Nwb3J0SldULlN0cmF0ZWd5O1xyXG5jb25zdCBFeHRyYWN0Snd0ID0gcGFzc3BvcnRKV1QuRXh0cmFjdEp3dDtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgUGFzc3BvcnRBdXRoIHtcclxuXHJcbiAgICBwYXNzcG9ydC5zZXJpYWxpemVVc2VyKChqd3RQYXlsb2FkLCBkb25lKSA9PiB7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJzZXJpYWxpemVVc2VyXCIpO1xyXG4gICAgICAgIC8vZG9uZSh1bmRlZmluZWQsIHVzZXIuX2lkKTtcclxuICAgICAgICBkb25lKHVuZGVmaW5lZCwgand0UGF5bG9hZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoKGp3dFBheWxvYWQsIGRvbmUpID0+IHtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcImRlc2VyaWFsaXplVXNlclwiKTtcclxuICAgICAgICBkb25lKHVuZGVmaW5lZCwgand0UGF5bG9hZCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ2luIFJlcXVpcmVkIG1pZGRsZXdhcmUuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY29uZmlnQXV0aChwYXNzcG9ydDogUGFzc3BvcnRTdGF0aWMsIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEF1dGhlbnRpY2F0ZSB3aXRoIEVtYWlsIGFuZCBQYXNzd29yZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwYXNzcG9ydC51c2UobmV3IExvY2FsU3RyYXRlZ3koeyB1c2VybmFtZUZpZWxkOiBcImVtYWlsXCIsIHNlc3Npb246IGZhbHNlIH0sIGFzeW5jIGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCwgZG9uZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IElVc2VyID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0VXNlckJ5RW1haWwoZW1haWwpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKHVuZGVmaW5lZCwgZmFsc2UsIHsgbWVzc2FnZTogRXJyb3JNZXNzYWdlLkludmFsaWRDcmVkZW50aWFscyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpc1Bhc3N3b3JkQ29ycmVjdDogYm9vbGVhbiA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNQYXNzd29yZENvcnJlY3QpIHtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuQXV0aGVudGljYXRpb24sIHRoaXMuZXJyb3JzLkludmFsaWRDcmVkZW50aWFscykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUodW5kZWZpbmVkLCBmYWxzZSwgeyBtZXNzYWdlOiBFcnJvck1lc3NhZ2UuSW52YWxpZENyZWRlbnRpYWxzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkb25lKHVuZGVmaW5lZCwgdXNlcik7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEF1dGhlbnRpY2F0ZSB3aXRoIEpXVFxyXG4gICAgICAgICogXHJcbiAgICAgICAgKi9cclxuICAgICAgICB2YXIgb3B0cyA6IGFueSA9IHt9XHJcbiAgICAgICAgb3B0cy5qd3RGcm9tUmVxdWVzdCA9IEV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXJBc0JlYXJlclRva2VuKCk7XHJcbiAgICAgICAgb3B0cy5zZWNyZXRPcktleSA9IGNvbmZpZy5qd3RTZWNyZXQ7XHJcbiAgICAgICAgb3B0cy5pc3N1ZXIgPSBjb25maWcuand0SXNzdWVyO1xyXG4gICAgICAgIG9wdHMuYXVkaWVuY2UgPSBjb25maWcuand0QXVkaWVuY2U7XHJcbiAgICAgICAgb3B0cy5hbGdvcml0aG0gPSBbXCJIUzUxMlwiXTtcclxuXHJcbiAgICAgICAgcGFzc3BvcnQudXNlKG5ldyBKV1RTdHJhdGVneShvcHRzLCBmdW5jdGlvbiAoand0UGF5bG9hZCwgZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBqd3RQYXlsb2FkKTtcclxuICAgICAgICAgICAgLypVc2VyLmZpbmRPbmUoeyBpZDogand0UGF5bG9hZC5zdWIgfSwgZnVuY3Rpb24gKGVyciwgdXNlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVyciwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRob3JpemF0aW9uIFJlcXVpcmVkIG1pZGRsZXdhcmUuXHJcbiBcclxuICAgIGV4cG9ydCBjb25zdCBpc0F1dGhvcml6ZWQgPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcS5wYXRoLnNwbGl0KFwiL1wiKS5zbGljZSgtMSlbMF07XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSByZXEudXNlciBhcyBVc2VyRG9jdW1lbnQ7XHJcbiAgICAgICAgaWYgKF8uZmluZCh1c2VyLnRva2VucywgeyBraW5kOiBwcm92aWRlciB9KSkge1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzLnJlZGlyZWN0KGAvYXV0aC8ke3Byb3ZpZGVyfWApO1xyXG4gICAgICAgIH1cclxuICAgIH07Ki9cclxufSJdfQ==