"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
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
exports.Dependency = void 0;
class Dependency {
    constructor(host) {
        this.host = host;
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                throw new Error(`${this.getName()} is not connected.`);
            }
            return this.client;
        });
    }
}
exports.Dependency = Dependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2RlcGVuZGVuY2llcy9kZXBlbmRlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7R0FFRzs7Ozs7Ozs7Ozs7O0FBRUgsTUFBc0IsVUFBVTtJQUc1QixZQUE2QixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUN6QyxDQUFDO0lBT1ksU0FBUzs7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztLQUFBO0NBQ0o7QUFqQkQsZ0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGVwZW5kZW5jeTxUPiB7XHJcbiAgICBwcm90ZWN0ZWQgY2xpZW50OiBUO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaG9zdDogc3RyaW5nKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRpc2Nvbm5lY3RlZCgpOiB2b2lkO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbm5lY3RlZCgpOiB2b2lkO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldE5hbWUoKTogc3RyaW5nO1xyXG4gICAgcHVibGljIGFic3RyYWN0IGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTxUPjtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q2xpZW50KCk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jbGllbnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuZ2V0TmFtZSgpfSBpcyBub3QgY29ubmVjdGVkLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQ7XHJcbiAgICB9XHJcbn1cclxuIl19