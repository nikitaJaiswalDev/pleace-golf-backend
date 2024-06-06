"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
class JWT {
    constructor(userId) {
        this.userId = userId;
    }
    createToken() {
        const expiresIn = '7d';
        const payload = {
            sub: this.userId,
            // https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim
            // Numeric date (in seconds)
            iat: Date.now() / 1000,
            iss: config_1.default.jwtIssuer,
            aud: config_1.default.jwtAudience
        };
        return jwt.sign(payload, config_1.default.jwtSecret, { expiresIn: expiresIn, algorithm: 'HS512' });
    }
}
exports.JWT = JWT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC9qd3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFFSCxvQ0FBb0M7QUFDcEMseUNBQWtDO0FBRWxDLE1BQWEsR0FBRztJQUNaLFlBQTZCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQzNDLENBQUM7SUFFTSxXQUFXO1FBQ2QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2hCLHdFQUF3RTtZQUN4RSw0QkFBNEI7WUFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO1lBQ3RCLEdBQUcsRUFBRSxnQkFBTSxDQUFDLFNBQVM7WUFDckIsR0FBRyxFQUFFLGdCQUFNLENBQUMsV0FBVztTQUMxQixDQUFDO1FBRUYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztDQUNKO0FBakJELGtCQWlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgKiBhcyBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgSldUIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdXNlcklkOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlVG9rZW4oKTogc3RyaW5ne1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZXNJbiA9ICc3ZCc7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgc3ViOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvanNvbndlYnRva2VuI3Rva2VuLWV4cGlyYXRpb24tZXhwLWNsYWltXHJcbiAgICAgICAgICAgIC8vIE51bWVyaWMgZGF0ZSAoaW4gc2Vjb25kcylcclxuICAgICAgICAgICAgaWF0OiBEYXRlLm5vdygpIC8gMTAwMCxcclxuICAgICAgICAgICAgaXNzOiBjb25maWcuand0SXNzdWVyLFxyXG4gICAgICAgICAgICBhdWQ6IGNvbmZpZy5qd3RBdWRpZW5jZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBjb25maWcuand0U2VjcmV0LCB7IGV4cGlyZXNJbjogZXhwaXJlc0luLCBhbGdvcml0aG06ICdIUzUxMicgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19