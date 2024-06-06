"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
class EmailService {
    constructor(from, replyTo) {
        this.from = from;
        this.replyTo = replyTo;
    }
    // 'Some One <someone@example.org>'
    formatEmailAsNameAndAddress(emailAddress) {
        if (emailAddress.name) {
            return `${emailAddress.name} <${emailAddress.email}>`;
        }
        else {
            return emailAddress.email;
        }
    }
    validateEmailAddress(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }
        return (false);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2VtYWlsL2VtYWlsLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFLSCxNQUFzQixZQUFZO0lBRTlCLFlBQXNCLElBQWtCLEVBQVksT0FBcUI7UUFBbkQsU0FBSSxHQUFKLElBQUksQ0FBYztRQUFZLFlBQU8sR0FBUCxPQUFPLENBQWM7SUFDekUsQ0FBQztJQUVELG1DQUFtQztJQUNuQywyQkFBMkIsQ0FBQyxZQUEwQjtRQUNsRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUM7UUFDMUQsQ0FBQzthQUNJLENBQUM7WUFDRixPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3RCLElBQUksK0NBQStDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMvRCxDQUFDO1lBQ0csT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbEIsQ0FBQztDQUlKO0FBekJELG9DQXlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBJRW1haWxUZW1wbGF0ZSB9IGZyb20gXCIuL2VtYWlsLXRlbXBsYXRlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBFbWFpbEFkZHJlc3MgfSBmcm9tIFwiLi9lbWFpbC1hZGRyZXNzXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1haWxTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZnJvbTogRW1haWxBZGRyZXNzLCBwcm90ZWN0ZWQgcmVwbHlUbzogRW1haWxBZGRyZXNzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gJ1NvbWUgT25lIDxzb21lb25lQGV4YW1wbGUub3JnPidcclxuICAgIGZvcm1hdEVtYWlsQXNOYW1lQW5kQWRkcmVzcyhlbWFpbEFkZHJlc3M6IEVtYWlsQWRkcmVzcykge1xyXG4gICAgICAgIGlmIChlbWFpbEFkZHJlc3MubmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7ZW1haWxBZGRyZXNzLm5hbWV9IDwke2VtYWlsQWRkcmVzcy5lbWFpbH0+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbWFpbEFkZHJlc3MuZW1haWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlRW1haWxBZGRyZXNzKGVtYWlsKSB7XHJcbiAgICAgICAgaWYgKC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC8udGVzdChlbWFpbCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3Qgc2VuZE1haWwoZW1haWxUZW1wbGF0ZTogSUVtYWlsVGVtcGxhdGUsam9iPzpTdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLy9hYnN0cmFjdCBhc3luYyBzZW5kUGxhaW5UZXh0TWFpbChlbWFpbFRlbXBsYXRlOiBJRW1haWxUZW1wbGF0ZSk6IFByb21pc2U8dm9pZD47XHJcbn0iXX0=