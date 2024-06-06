"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["Validation"] = "Validation";
    ErrorType["ReferenceNotFound"] = "ReferenceNotFound";
    ErrorType["Range"] = "Range";
    ErrorType["Internal"] = "Internal";
    ErrorType["EmptyOrNull"] = "EmptyOrNull";
    ErrorType["Authentication"] = "Authentication";
    ErrorType["Exists"] = "Exists";
    ErrorType["DoesNotExist"] = "DoesNotExist";
    ErrorType["InvalidCode"] = "InvalidCode";
    ErrorType["Generic"] = "Generic";
    ErrorType["InviteDoesNotExist"] = "InviteDoesNotExist";
    ErrorType["InviteeAlreadyExist"] = "InviteeAlreadyExist";
    ErrorType["CannotLoginInApp"] = "CannotLoginInApp";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItdHlwZS5lbnVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvZXJyb3JzL2Vycm9yLXR5cGUuZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILElBQVksU0FjWDtBQWRELFdBQVksU0FBUztJQUNqQixzQ0FBeUIsQ0FBQTtJQUN6QixvREFBdUMsQ0FBQTtJQUN2Qyw0QkFBZSxDQUFBO0lBQ2Ysa0NBQXFCLENBQUE7SUFDckIsd0NBQTJCLENBQUE7SUFDM0IsOENBQWlDLENBQUE7SUFDakMsOEJBQWlCLENBQUE7SUFDakIsMENBQTZCLENBQUE7SUFDN0Isd0NBQTJCLENBQUE7SUFDM0IsZ0NBQW1CLENBQUE7SUFDbkIsc0RBQXlDLENBQUE7SUFDekMsd0RBQTJDLENBQUE7SUFDM0Msa0RBQXFDLENBQUE7QUFDekMsQ0FBQyxFQWRXLFNBQVMseUJBQVQsU0FBUyxRQWNwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5leHBvcnQgZW51bSBFcnJvclR5cGUge1xyXG4gICAgVmFsaWRhdGlvbiA9IFwiVmFsaWRhdGlvblwiLFxyXG4gICAgUmVmZXJlbmNlTm90Rm91bmQgPSBcIlJlZmVyZW5jZU5vdEZvdW5kXCIsXHJcbiAgICBSYW5nZSA9IFwiUmFuZ2VcIixcclxuICAgIEludGVybmFsID0gXCJJbnRlcm5hbFwiLFxyXG4gICAgRW1wdHlPck51bGwgPSBcIkVtcHR5T3JOdWxsXCIsXHJcbiAgICBBdXRoZW50aWNhdGlvbiA9IFwiQXV0aGVudGljYXRpb25cIixcclxuICAgIEV4aXN0cyA9IFwiRXhpc3RzXCIsXHJcbiAgICBEb2VzTm90RXhpc3QgPSBcIkRvZXNOb3RFeGlzdFwiLFxyXG4gICAgSW52YWxpZENvZGUgPSBcIkludmFsaWRDb2RlXCIsXHJcbiAgICBHZW5lcmljID0gXCJHZW5lcmljXCIsXHJcbiAgICBJbnZpdGVEb2VzTm90RXhpc3QgPSBcIkludml0ZURvZXNOb3RFeGlzdFwiLFxyXG4gICAgSW52aXRlZUFscmVhZHlFeGlzdCA9IFwiSW52aXRlZUFscmVhZHlFeGlzdFwiLFxyXG4gICAgQ2Fubm90TG9naW5JbkFwcCA9IFwiQ2Fubm90TG9naW5JbkFwcFwiXHJcbn1cclxuIl19