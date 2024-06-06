"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWriter = void 0;
const error_type_enum_1 = require("./error-type.enum");
const errors_to_http_codes_1 = require("./errors-to-http-codes");
const error_builder_1 = require("./error-builder");
const logging_1 = require("../logging");
class ErrorWriter {
    static writeErrorTypeResponse(errorType, errorMessage, res) {
        logging_1.Logger.info("writeErrorTypeResponse");
        let httpResponseCode = (0, errors_to_http_codes_1.getHTTPResponseCode)(errorType);
        let error = error_builder_1.ErrorBuilder.generate(errorType, errorMessage);
        let errorResponse = this.generateErrorResponse(errorType, error);
        res.status(httpResponseCode).json(errorResponse);
    }
    static writeErrorResponse(error, res) {
        logging_1.Logger.error(error);
        logging_1.Logger.info("writeErrorResponse");
        let errorType = this.getErrorType(error);
        logging_1.Logger.info("errorType1:" + errorType);
        let httpResponseCode = (0, errors_to_http_codes_1.getHTTPResponseCode)(errorType);
        let errorResponse = this.generateErrorResponse(errorType, error);
        res.status(httpResponseCode).json(errorResponse);
    }
    static getErrorType(error) {
        var errorType;
        var errorName = error.constructor.name;
        logging_1.Logger.info("errorName:" + errorName);
        logging_1.Logger.info(error.message);
        logging_1.Logger.info(error.stack);
        if (errorName === "Error") {
            errorType = error_type_enum_1.ErrorType.Generic;
        }
        else {
            errorType = errorName.replace('Error', '');
        }
        logging_1.Logger.info("errorType2:" + errorType);
        if (!error_type_enum_1.ErrorType[errorType]) {
            errorType = error_type_enum_1.ErrorType.Generic;
        }
        return error_type_enum_1.ErrorType[errorType];
    }
    static generateErrorResponse(errorType, err) {
        return {
            errorType: errorType,
            errorMessage: err.message,
        };
    }
}
exports.ErrorWriter = ErrorWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itd3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2Vycm9yLXdyaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUdILHVEQUE4QztBQUM5QyxpRUFBNkQ7QUFDN0QsbURBQStDO0FBQy9DLHdDQUFvQztBQUVwQyxNQUFhLFdBQVc7SUFFcEIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFNBQW9CLEVBQUUsWUFBb0IsRUFBRSxHQUFhO1FBQ25GLGdCQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFBLDBDQUFtQixFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxHQUFHLDRCQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFZLEVBQUUsR0FBYTtRQUNqRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixnQkFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksZ0JBQWdCLEdBQUcsSUFBQSwwQ0FBbUIsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBWTtRQUNwQyxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDdkMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixnQkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDeEIsU0FBUyxHQUFHLDJCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2xDLENBQUM7YUFDSSxDQUFDO1lBQ0YsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxnQkFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLDJCQUFTLENBQUMsU0FBbUMsQ0FBQyxFQUFFLENBQUM7WUFDbEQsU0FBUyxHQUFHLDJCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxPQUFPLDJCQUFTLENBQUMsU0FBbUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxNQUFNLENBQUMscUJBQXFCLENBQUMsU0FBb0IsRUFBRSxHQUFVO1FBQ2pFLE9BQU87WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDNUIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQS9DRCxrQ0ErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIwIENvZGV2IFRlY2hub2xvZ2llcyAoUHR5KSBMdGQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBFcnJvclR5cGUgfSBmcm9tIFwiLi9lcnJvci10eXBlLmVudW1cIjtcclxuaW1wb3J0IHsgZ2V0SFRUUFJlc3BvbnNlQ29kZSB9IGZyb20gXCIuL2Vycm9ycy10by1odHRwLWNvZGVzXCI7XHJcbmltcG9ydCB7IEVycm9yQnVpbGRlciB9IGZyb20gXCIuL2Vycm9yLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dpbmdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvcldyaXRlciB7XHJcblxyXG4gICAgc3RhdGljIHdyaXRlRXJyb3JUeXBlUmVzcG9uc2UoZXJyb3JUeXBlOiBFcnJvclR5cGUsIGVycm9yTWVzc2FnZTogc3RyaW5nLCByZXM6IFJlc3BvbnNlKTogYW55IHtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcIndyaXRlRXJyb3JUeXBlUmVzcG9uc2VcIik7XHJcbiAgICAgICAgbGV0IGh0dHBSZXNwb25zZUNvZGUgPSBnZXRIVFRQUmVzcG9uc2VDb2RlKGVycm9yVHlwZSk7XHJcbiAgICAgICAgbGV0IGVycm9yID0gRXJyb3JCdWlsZGVyLmdlbmVyYXRlKGVycm9yVHlwZSwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICBsZXQgZXJyb3JSZXNwb25zZSA9IHRoaXMuZ2VuZXJhdGVFcnJvclJlc3BvbnNlKGVycm9yVHlwZSwgZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoaHR0cFJlc3BvbnNlQ29kZSkuanNvbihlcnJvclJlc3BvbnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB3cml0ZUVycm9yUmVzcG9uc2UoZXJyb3I6IEVycm9yLCByZXM6IFJlc3BvbnNlKTogYW55IHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwid3JpdGVFcnJvclJlc3BvbnNlXCIpO1xyXG4gICAgICAgIGxldCBlcnJvclR5cGUgPSB0aGlzLmdldEVycm9yVHlwZShlcnJvcik7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJlcnJvclR5cGUxOlwiICsgZXJyb3JUeXBlKTtcclxuICAgICAgICBsZXQgaHR0cFJlc3BvbnNlQ29kZSA9IGdldEhUVFBSZXNwb25zZUNvZGUoZXJyb3JUeXBlKTtcclxuICAgICAgICBsZXQgZXJyb3JSZXNwb25zZSA9IHRoaXMuZ2VuZXJhdGVFcnJvclJlc3BvbnNlKGVycm9yVHlwZSwgZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoaHR0cFJlc3BvbnNlQ29kZSkuanNvbihlcnJvclJlc3BvbnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldEVycm9yVHlwZShlcnJvcjogRXJyb3IpOiBFcnJvclR5cGUge1xyXG4gICAgICAgIHZhciBlcnJvclR5cGU6IHN0cmluZztcclxuICAgICAgICB2YXIgZXJyb3JOYW1lID0gZXJyb3IuY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcImVycm9yTmFtZTpcIiArIGVycm9yTmFtZSk7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgIGlmIChlcnJvck5hbWUgPT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICBlcnJvclR5cGUgPSBFcnJvclR5cGUuR2VuZXJpYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yVHlwZSA9IGVycm9yTmFtZS5yZXBsYWNlKCdFcnJvcicsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJlcnJvclR5cGUyOlwiICsgZXJyb3JUeXBlKTtcclxuXHJcbiAgICAgICAgaWYgKCFFcnJvclR5cGVbZXJyb3JUeXBlIGFzIGtleW9mIHR5cGVvZiBFcnJvclR5cGVdKSB7XHJcbiAgICAgICAgICAgIGVycm9yVHlwZSA9IEVycm9yVHlwZS5HZW5lcmljO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEVycm9yVHlwZVtlcnJvclR5cGUgYXMga2V5b2YgdHlwZW9mIEVycm9yVHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVFcnJvclJlc3BvbnNlKGVycm9yVHlwZTogRXJyb3JUeXBlLCBlcnI6IEVycm9yKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlcnJvclR5cGU6IGVycm9yVHlwZSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==