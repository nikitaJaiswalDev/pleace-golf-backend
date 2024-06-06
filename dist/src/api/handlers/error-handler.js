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
exports.wrapAsyncWithErrorHandling = exports.handleErrors = void 0;
const logging_1 = require("../../core/logging");
const error_writer_1 = require("../../core/errors/error-writer");
function handleErrors(err, req, res, next) {
    logging_1.Logger.error(err);
    if (res.headersSent) {
        return next(err);
    }
    error_writer_1.ErrorWriter.writeErrorResponse(err, res);
}
exports.handleErrors = handleErrors;
function wrapAsyncWithErrorHandling(callback, callbackObject) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield callback.apply(callbackObject, [req, res, next]);
            }
            catch (err) {
                logging_1.Logger.error(err);
                next(err);
            }
        });
    };
}
exports.wrapAsyncWithErrorHandling = wrapAsyncWithErrorHandling;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvaGFuZGxlcnMvZXJyb3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxnREFBNEM7QUFDNUMsaUVBQTZEO0FBRTdELFNBQWdCLFlBQVksQ0FBQyxHQUFRLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFTO0lBQ3pFLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwwQkFBVyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBUkQsb0NBUUM7QUFFRCxTQUFnQiwwQkFBMEIsQ0FBQyxRQUFrQixFQUFFLGNBQXNCO0lBQ2pGLE9BQU8sVUFBZSxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQVM7O1lBQy9DLElBQUksQ0FBQztnQkFDRCxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNYLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQztLQUFBLENBQUM7QUFDTixDQUFDO0FBVEQsZ0VBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgRXJyb3JXcml0ZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9lcnJvcnMvZXJyb3Itd3JpdGVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3JzKGVycjogYW55LCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IGFueSkge1xyXG4gICAgTG9nZ2VyLmVycm9yKGVycik7XHJcblxyXG4gICAgaWYgKHJlcy5oZWFkZXJzU2VudCkge1xyXG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgRXJyb3JXcml0ZXIud3JpdGVFcnJvclJlc3BvbnNlKGVyciwgcmVzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBBc3luY1dpdGhFcnJvckhhbmRsaW5nKGNhbGxiYWNrOiBGdW5jdGlvbiwgY2FsbGJhY2tPYmplY3Q6IG9iamVjdCkge1xyXG4gICAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogYW55KXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBjYWxsYmFjay5hcHBseShjYWxsYmFja09iamVjdCwgW3JlcSwgcmVzLCBuZXh0XSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4iXX0=