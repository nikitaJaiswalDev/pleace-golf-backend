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
exports.AuthenticationService = void 0;
const logging_1 = require("../core/logging");
const jwt_1 = require("../core/auth/jwt");
class AuthenticationService {
    constructor() {
    }
    /**
     * Login
     * @async
     * @returns Returns an access token for the user.
     */
    authenticateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info(`[AuthenticationService.authenticateUser] called. User: '${userId}'.`);
            return new jwt_1.JWT(userId).createToken();
        });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF5QztBQUN6QywwQ0FBdUM7QUFFdkMsTUFBYSxxQkFBcUI7SUFFOUI7SUFFQSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGdCQUFnQixDQUFDLE1BQWM7O1lBRXhDLGdCQUFNLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxNQUFNLElBQUksQ0FBQyxDQUFDO1lBRW5GLE9BQU8sSUFBSSxTQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsQ0FBQztLQUFBO0NBRUo7QUFsQkQsc0RBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBKV1QgfSBmcm9tIFwiLi4vY29yZS9hdXRoL2p3dFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ2luXHJcbiAgICAgKiBAYXN5bmNcclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgYW4gYWNjZXNzIHRva2VuIGZvciB0aGUgdXNlci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGF1dGhlbnRpY2F0ZVVzZXIodXNlcklkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgICAgICBMb2dnZXIuaW5mbyhgW0F1dGhlbnRpY2F0aW9uU2VydmljZS5hdXRoZW50aWNhdGVVc2VyXSBjYWxsZWQuIFVzZXI6ICcke3VzZXJJZH0nLmApO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEpXVCh1c2VySWQpLmNyZWF0ZVRva2VuKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==