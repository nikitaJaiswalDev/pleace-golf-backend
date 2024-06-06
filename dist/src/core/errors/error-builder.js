"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBuilder = void 0;
const error_type_enum_1 = require("./error-type.enum");
const errors_1 = require("./errors");
const logging_1 = require("../logging");
class ErrorBuilder {
    static generate(error, message) {
        logging_1.Logger.info("generate");
        if (typeof error === "function") {
            const errorFn = error;
            errorFn(message);
        }
        else {
            const errorType = error;
            switch (errorType) {
                case error_type_enum_1.ErrorType.ReferenceNotFound:
                    return new errors_1.ReferenceNotFoundError(message);
                case error_type_enum_1.ErrorType.Range:
                    return new RangeError(message);
                case error_type_enum_1.ErrorType.Internal:
                    return new errors_1.InternalError(message);
                case error_type_enum_1.ErrorType.EmptyOrNull:
                    return new errors_1.EmptyOrNullError(message);
                case error_type_enum_1.ErrorType.Exists:
                    return new errors_1.ExistsError(message);
                case error_type_enum_1.ErrorType.Authentication:
                    return new errors_1.AuthenticationError(message);
                case error_type_enum_1.ErrorType.DoesNotExist:
                    return new errors_1.DoesNotExistError(message);
                case error_type_enum_1.ErrorType.InvalidCode:
                    return new errors_1.InvalidCodeError(message);
                case error_type_enum_1.ErrorType.Generic:
                    return new Error(message);
                default:
                    return new Error(message);
            }
        }
    }
    static generateGeneric(message, innerErrorMessage) {
        return new Error(`${message} InnerErrorMessage: ${innerErrorMessage}`);
    }
}
exports.ErrorBuilder = ErrorBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2Vycm9ycy9lcnJvci1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBRUgsdURBQThDO0FBQzlDLHFDQUEwSjtBQUMxSix3Q0FBb0M7QUFFcEMsTUFBYSxZQUFZO0lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBMkIsRUFBRSxPQUFnQjtRQUN6RCxnQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sT0FBTyxHQUFHLEtBQWlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFBTSxTQUFTLEdBQUcsS0FBa0IsQ0FBQztZQUNyQyxRQUFRLFNBQVMsRUFBRSxDQUFDO2dCQUNoQixLQUFLLDJCQUFTLENBQUMsaUJBQWlCO29CQUM1QixPQUFPLElBQUksK0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLEtBQUssMkJBQVMsQ0FBQyxLQUFLO29CQUNoQixPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLDJCQUFTLENBQUMsUUFBUTtvQkFDbkIsT0FBTyxJQUFJLHNCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssMkJBQVMsQ0FBQyxXQUFXO29CQUN0QixPQUFPLElBQUkseUJBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssMkJBQVMsQ0FBQyxNQUFNO29CQUNqQixPQUFPLElBQUksb0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsS0FBSywyQkFBUyxDQUFDLGNBQWM7b0JBQ3pCLE9BQU8sSUFBSSw0QkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsS0FBSywyQkFBUyxDQUFDLFlBQVk7b0JBQ3ZCLE9BQU8sSUFBSSwwQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsS0FBSywyQkFBUyxDQUFDLFdBQVc7b0JBQ3RCLE9BQU8sSUFBSSx5QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekMsS0FBSywyQkFBUyxDQUFDLE9BQU87b0JBQ2xCLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlCO29CQUNJLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFlLEVBQUUsaUJBQTBCO1FBQzlELE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxPQUFPLHVCQUF1QixpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztDQUNKO0FBcENELG9DQW9DQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBFcnJvclR5cGUgfSBmcm9tIFwiLi9lcnJvci10eXBlLmVudW1cIjtcclxuaW1wb3J0IHsgSW50ZXJuYWxFcnJvciwgRW1wdHlPck51bGxFcnJvciwgRXhpc3RzRXJyb3IsIEF1dGhlbnRpY2F0aW9uRXJyb3IsIERvZXNOb3RFeGlzdEVycm9yLCBSZWZlcmVuY2VOb3RGb3VuZEVycm9yLCBJbnZhbGlkQ29kZUVycm9yIH0gZnJvbSBcIi4vZXJyb3JzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9sb2dnaW5nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JCdWlsZGVyIHtcclxuICAgIHN0YXRpYyBnZW5lcmF0ZShlcnJvcjogRXJyb3JUeXBlIHwgRnVuY3Rpb24sIG1lc3NhZ2U/OiBzdHJpbmcpOiBFcnJvciB7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJnZW5lcmF0ZVwiKTtcclxuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JGbiA9IGVycm9yIGFzIEZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBlcnJvckZuKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yVHlwZSA9IGVycm9yIGFzIEVycm9yVHlwZTtcclxuICAgICAgICAgICAgc3dpdGNoIChlcnJvclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRXJyb3JUeXBlLlJlZmVyZW5jZU5vdEZvdW5kOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlTm90Rm91bmRFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRXJyb3JUeXBlLlJhbmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2VFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRXJyb3JUeXBlLkludGVybmFsOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRXJyb3JUeXBlLkVtcHR5T3JOdWxsOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRW1wdHlPck51bGxFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgRXJyb3JUeXBlLkV4aXN0czpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV4aXN0c0Vycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFcnJvclR5cGUuQXV0aGVudGljYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFcnJvclR5cGUuRG9lc05vdEV4aXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9lc05vdEV4aXN0RXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVycm9yVHlwZS5JbnZhbGlkQ29kZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludmFsaWRDb2RlRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVycm9yVHlwZS5HZW5lcmljOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdlbmVyYXRlR2VuZXJpYyhtZXNzYWdlOiBzdHJpbmcsIGlubmVyRXJyb3JNZXNzYWdlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgJHttZXNzYWdlfSBJbm5lckVycm9yTWVzc2FnZTogJHtpbm5lckVycm9yTWVzc2FnZX1gKTtcclxuICAgIH1cclxufVxyXG4iXX0=