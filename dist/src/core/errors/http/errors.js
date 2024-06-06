"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.PreconditionFailedError = exports.NotFoundError = exports.InternalServerError = exports.ForbiddenError = exports.ConflictError = exports.BadRequestError = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.errorCode = errorCode;
    }
}
exports.BaseError = BaseError;
/**
 * Indicates that an action cannot be completed because of a bad request error.
 * The property field will contain the missing/invalid field and in the error message
 * there will be more information about it.
 */
class BadRequestError extends BaseError {
    constructor(errorCode, message, field) {
        super(errorCode, message);
        this.field = field;
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Indicates that an action cannot be completed because of a conflict
 * with some business rule.
 *
 */
class ConflictError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.ConflictError = ConflictError;
/**
 * Indicates that an action cannot be completed because the user is not allowed.
 *
 */
class ForbiddenError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Indicates that an action cannot be completed because of internal server error
 *
 */
class InternalServerError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Indicates that an action cannot be completed because of Not found error.
 *
 */
class NotFoundError extends BaseError {
    constructor(errorCode, message, identifier) {
        super(errorCode, message);
        this.identifier = identifier;
    }
}
exports.NotFoundError = NotFoundError;
class PreconditionFailedError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.PreconditionFailedError = PreconditionFailedError;
class UnauthorizedError extends BaseError {
    constructor(errorCode, message) {
        super(errorCode, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2h0dHAvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBRUgsTUFBYSxTQUFVLFNBQVEsS0FBSztJQUVoQyxZQUFZLFNBQWlCLEVBQUUsT0FBZTtRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFORCw4QkFNQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUUxQyxZQUFZLFNBQWlCLEVBQUUsT0FBZSxFQUFFLEtBQWM7UUFDMUQsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFORCwwQ0FNQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFhLGFBQWMsU0FBUSxTQUFTO0lBQ3hDLFlBQVksU0FBaUIsRUFBRSxPQUFlO1FBQzFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBSkQsc0NBSUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFhLGNBQWUsU0FBUSxTQUFTO0lBQ3pDLFlBQVksU0FBaUIsRUFBRSxPQUFlO1FBQzFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBSkQsd0NBSUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFhLG1CQUFvQixTQUFRLFNBQVM7SUFDOUMsWUFBWSxTQUFpQixFQUFFLE9BQWU7UUFDMUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFKRCxrREFJQztBQUVEOzs7R0FHRztBQUNILE1BQWEsYUFBYyxTQUFRLFNBQVM7SUFHeEMsWUFBWSxTQUFpQixFQUFFLE9BQWUsRUFBRSxVQUFrQjtRQUM5RCxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7Q0FDSjtBQVBELHNDQU9DO0FBR0QsTUFBYSx1QkFBd0IsU0FBUSxTQUFTO0lBQ2xELFlBQVksU0FBaUIsRUFBRSxPQUFlO1FBQzFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBSkQsMERBSUM7QUFHRCxNQUFhLGlCQUFrQixTQUFRLFNBQVM7SUFDNUMsWUFBWSxTQUFpQixFQUFFLE9BQWU7UUFDMUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFKRCw4Q0FJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgcHVibGljIGVycm9yQ29kZTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZXJyb3JDb2RlID0gZXJyb3JDb2RlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5kaWNhdGVzIHRoYXQgYW4gYWN0aW9uIGNhbm5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSBvZiBhIGJhZCByZXF1ZXN0IGVycm9yLlxyXG4gKiBUaGUgcHJvcGVydHkgZmllbGQgd2lsbCBjb250YWluIHRoZSBtaXNzaW5nL2ludmFsaWQgZmllbGQgYW5kIGluIHRoZSBlcnJvciBtZXNzYWdlXHJcbiAqIHRoZXJlIHdpbGwgYmUgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBpdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYWRSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xyXG4gICAgZmllbGQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIGZpZWxkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoZXJyb3JDb2RlLCBtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmZpZWxkID0gZmllbGQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCBhbiBhY3Rpb24gY2Fubm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIG9mIGEgY29uZmxpY3RcclxuICogd2l0aCBzb21lIGJ1c2luZXNzIHJ1bGUuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmxpY3RFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvckNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoZXJyb3JDb2RlLCBtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluZGljYXRlcyB0aGF0IGFuIGFjdGlvbiBjYW5ub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIHVzZXIgaXMgbm90IGFsbG93ZWQuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9yYmlkZGVuRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGVycm9yQ29kZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCBhbiBhY3Rpb24gY2Fubm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIG9mIGludGVybmFsIHNlcnZlciBlcnJvclxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEludGVybmFsU2VydmVyRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGVycm9yQ29kZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbmRpY2F0ZXMgdGhhdCBhbiBhY3Rpb24gY2Fubm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIG9mIE5vdCBmb3VuZCBlcnJvci5cclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHtcclxuICAgIGlkZW50aWZpZXI6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvckNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBpZGVudGlmaWVyOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihlcnJvckNvZGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJlY29uZGl0aW9uRmFpbGVkRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGVycm9yQ29kZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVW5hdXRob3JpemVkRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGVycm9yQ29kZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuIl19