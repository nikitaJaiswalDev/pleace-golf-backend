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
exports.TokenGenerator = void 0;
const crypto = require("crypto");
class TokenGenerator {
    /**
    * Token generator
    * NOTE: used for email confirmation, password reset and access tokens.
    * @async
    * @param {number} length The length of the token to generate
    * @returns {Promise<string>} Returns promise of token
    */
    static generateToken(length) {
        return __awaiter(this, void 0, void 0, function* () {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = new Array(length);
            return new Promise((resolve, reject) => {
                crypto.randomBytes(length, (err, bytes) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let cursor = 0;
                        for (var i = 0; i < length; i++) {
                            cursor += bytes[i];
                            result[i] = chars[cursor % chars.length];
                        }
                        resolve(result.join(''));
                    }
                });
            });
        });
    }
}
exports.TokenGenerator = TokenGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC90b2tlbi1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFHSCxpQ0FBaUM7QUFFakMsTUFBYSxjQUFjO0lBRXZCOzs7Ozs7TUFNRTtJQUNLLE1BQU0sQ0FBTyxhQUFhLENBQUMsTUFBYzs7WUFDNUMsTUFBTSxLQUFLLEdBQUcsZ0VBQWdFLENBQUM7WUFDL0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3RDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixDQUFDO3lCQUFNLENBQUM7d0JBRUosSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dCQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM3QyxDQUFDO3dCQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBOUJELHdDQThCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XHJcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9rZW5HZW5lcmF0b3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBUb2tlbiBnZW5lcmF0b3JcclxuICAgICogTk9URTogdXNlZCBmb3IgZW1haWwgY29uZmlybWF0aW9uLCBwYXNzd29yZCByZXNldCBhbmQgYWNjZXNzIHRva2Vucy5cclxuICAgICogQGFzeW5jXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgdG9rZW4gdG8gZ2VuZXJhdGVcclxuICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gUmV0dXJucyBwcm9taXNlIG9mIHRva2VuXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZW5lcmF0ZVRva2VuKGxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNyeXB0by5yYW5kb21CeXRlcyhsZW5ndGgsIChlcnIsIGJ5dGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3Vyc29yID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciArPSBieXRlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gY2hhcnNbY3Vyc29yICUgY2hhcnMubGVuZ3RoXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=