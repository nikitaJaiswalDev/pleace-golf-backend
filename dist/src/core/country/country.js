"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
class Country {
    //name: string;
    //nationality: string;
    //continent: string;
    //hasSubdivision: boolean; // Wether the country has children countries (countries that have a subdivision code that contains this countries alpha2 code
    //code?: CountryCode;
    //alternateNames?: string[];
    constructor(name, nationality, continent, hasSubdivision, code, alternateNames, isState) {
        this.name = name;
        this.nationality = nationality;
        this.continent = continent;
        this.hasSubdivision = hasSubdivision;
        this.code = code;
        this.alternateNames = alternateNames;
        this.isState = isState;
    }
    /**
    * Get Code
    * @returns {string} Returns a string with the alpha2 or subdivision code.
    */
    getCode() {
        return this.code.alpha2 ? this.code.alpha2 : this.code.subdivision;
    }
}
exports.Country = Country;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvdW50cnkvY291bnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUlILE1BQWEsT0FBTztJQUNoQixlQUFlO0lBQ2Ysc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUNwQix3SkFBd0o7SUFDeEoscUJBQXFCO0lBQ3JCLDRCQUE0QjtJQUc1QixZQUFtQixJQUFZLEVBQVMsV0FBbUIsRUFBUyxTQUFpQixFQUFTLGNBQXVCLEVBQzFHLElBQWtCLEVBQVMsY0FBeUIsRUFBUSxPQUFnQjtRQURwRSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFDMUcsU0FBSSxHQUFKLElBQUksQ0FBYztRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFXO1FBQVEsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUV2RixDQUFDO0lBRUQ7OztNQUdFO0lBQ0YsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN2RSxDQUFDO0NBQ0o7QUFyQkQsMEJBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSBcIi4vY291bnRyeS1jb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ291bnRyeSB7XHJcbiAgICAvL25hbWU6IHN0cmluZztcclxuICAgIC8vbmF0aW9uYWxpdHk6IHN0cmluZztcclxuICAgIC8vY29udGluZW50OiBzdHJpbmc7XHJcbiAgICAvL2hhc1N1YmRpdmlzaW9uOiBib29sZWFuOyAvLyBXZXRoZXIgdGhlIGNvdW50cnkgaGFzIGNoaWxkcmVuIGNvdW50cmllcyAoY291bnRyaWVzIHRoYXQgaGF2ZSBhIHN1YmRpdmlzaW9uIGNvZGUgdGhhdCBjb250YWlucyB0aGlzIGNvdW50cmllcyBhbHBoYTIgY29kZVxyXG4gICAgLy9jb2RlPzogQ291bnRyeUNvZGU7XHJcbiAgICAvL2FsdGVybmF0ZU5hbWVzPzogc3RyaW5nW107XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBuYXRpb25hbGl0eTogc3RyaW5nLCBwdWJsaWMgY29udGluZW50OiBzdHJpbmcsIHB1YmxpYyBoYXNTdWJkaXZpc2lvbjogYm9vbGVhbiwgXHJcbiAgICAgICAgcHVibGljIGNvZGU/OiBDb3VudHJ5Q29kZSwgcHVibGljIGFsdGVybmF0ZU5hbWVzPzogc3RyaW5nW10scHVibGljIGlzU3RhdGU/OmJvb2xlYW4pIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBDb2RlXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgYWxwaGEyIG9yIHN1YmRpdmlzaW9uIGNvZGUuXHJcbiAgICAqL1xyXG4gICAgZ2V0Q29kZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvZGUuYWxwaGEyID8gdGhpcy5jb2RlLmFscGhhMiA6IHRoaXMuY29kZS5zdWJkaXZpc2lvbjtcclxuICAgIH1cclxufVxyXG4iXX0=