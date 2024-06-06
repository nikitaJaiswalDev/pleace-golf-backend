"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCondition = void 0;
class ErrorCondition {
    constructor(instance, condition, internalError, externalError, errorType) {
        this.errorCondition = () => { return false; };
        this.instance = instance;
        this.internalError = internalError;
        this.errorCondition = condition;
        this.externalError = externalError;
        this.errorType = errorType;
    }
    IsTrue() { return this.errorCondition(this.instance); }
    InternalError() { return this.internalError; }
    ExternalError() { return this.externalError; }
    ErrorType() { return this.errorType; }
}
exports.ErrorCondition = ErrorCondition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItY29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2Vycm9yLWNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUlILE1BQWEsY0FBYztJQU92QixZQUFZLFFBQVcsRUFBRSxTQUE0QixFQUFFLGFBQXFCLEVBQUUsYUFBa0IsRUFBRSxTQUErQjtRQUZ6SCxtQkFBYyxHQUFzQixHQUFHLEVBQUUsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUdoRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELGFBQWEsS0FBSyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzlDLGFBQWEsS0FBSyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzlDLFNBQVMsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ3pDO0FBbkJELHdDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBFcnJvclR5cGUgfSBmcm9tIFwiLi9lcnJvci10eXBlLmVudW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckNvbmRpdGlvbjxUPiB7XHJcbiAgICBwcml2YXRlIGluc3RhbmNlOiBUO1xyXG4gICAgcHJpdmF0ZSBpbnRlcm5hbEVycm9yOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGV4dGVybmFsRXJyb3I6IHN0cmluZztcclxuICAgIHByaXZhdGUgZXJyb3JUeXBlOiBFcnJvclR5cGUgfCBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgZXJyb3JDb25kaXRpb246IChpOiBUKSA9PiBib29sZWFuID0gKCkgPT4geyByZXR1cm4gZmFsc2U7IH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5zdGFuY2U6IFQsIGNvbmRpdGlvbjogKGk6IFQpID0+IGJvb2xlYW4sIGludGVybmFsRXJyb3I6IHN0cmluZywgZXh0ZXJuYWxFcnJvcjogYW55LCBlcnJvclR5cGU6IEVycm9yVHlwZSB8IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuaW50ZXJuYWxFcnJvciA9IGludGVybmFsRXJyb3I7XHJcbiAgICAgICAgdGhpcy5lcnJvckNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICB0aGlzLmV4dGVybmFsRXJyb3IgPSBleHRlcm5hbEVycm9yO1xyXG4gICAgICAgIHRoaXMuZXJyb3JUeXBlID0gZXJyb3JUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIElzVHJ1ZSgpIHsgcmV0dXJuIHRoaXMuZXJyb3JDb25kaXRpb24odGhpcy5pbnN0YW5jZSk7IH1cclxuICAgIEludGVybmFsRXJyb3IoKSB7IHJldHVybiB0aGlzLmludGVybmFsRXJyb3I7IH1cclxuICAgIEV4dGVybmFsRXJyb3IoKSB7IHJldHVybiB0aGlzLmV4dGVybmFsRXJyb3I7IH1cclxuICAgIEVycm9yVHlwZSgpIHsgcmV0dXJuIHRoaXMuZXJyb3JUeXBlOyB9XHJcbn1cclxuIl19