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
exports.GolfClubService = void 0;
const logging_1 = require("../core/logging");
const error_builder_1 = require("../core/errors/error-builder");
const error_type_enum_1 = require("../core/errors/error-type.enum");
const filter_builder_1 = require("../core/dao/filter/filter-builder");
class GolfClubService {
    constructor(golfClubDAO) {
        this.golfClubDAO = golfClubDAO;
    }
    /**
     * Get Golf Clubs
     * @async
     * @param {string} countryCode Alpha 2 country code or subdivision code
     * @returns {Promise<GolfClub[]>} List of golf clubs.
     */
    getGolfClubs(countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("countryCode", countryCode)
                    .buildAll();
                const golfClubs = yield this.golfClubDAO.getMultipleByFilters(filters);
                //const golfClubs = await this.golfClubDAO.searchByProperty("countryCode", countryCode, 10);
                return Promise.resolve(golfClubs);
            }
            catch (error) {
                logging_1.Logger.error(error);
                return Promise.reject(error_builder_1.ErrorBuilder.generate(error_type_enum_1.ErrorType.Generic, error));
            }
        });
    }
}
exports.GolfClubService = GolfClubService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZi1jbHViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZ29sZi1jbHViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXlDO0FBQ3pDLGdFQUE0RDtBQUM1RCxvRUFBMkQ7QUFJM0Qsc0VBQWtFO0FBRWxFLE1BQWEsZUFBZTtJQUl4QixZQUFtQixXQUEwQjtRQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxZQUFZLENBQUMsV0FBbUI7O1lBQ3pDLElBQUksQ0FBQztnQkFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFhLEVBQUU7cUJBQzlCLFNBQVMsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO3FCQUNyQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RSw0RkFBNEY7Z0JBQzVGLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLDJCQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0UsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNKO0FBNUJELDBDQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgRXJyb3JCdWlsZGVyIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgRXJyb3JUeXBlIH0gZnJvbSBcIi4uL2NvcmUvZXJyb3JzL2Vycm9yLXR5cGUuZW51bVwiO1xyXG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi4vdHlwZXMvZXJyb3ItbWVzc2FnZS5lbnVtXCI7XHJcbmltcG9ydCB7IERBTyB9IGZyb20gXCIuLi9jb3JlL2Rhby9kYW8uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViIH0gZnJvbSBcIi4uL3R5cGVzL2dvbGYtY2x1YlwiO1xyXG5pbXBvcnQgeyBGaWx0ZXJCdWlsZGVyIH0gZnJvbSBcIi4uL2NvcmUvZGFvL2ZpbHRlci9maWx0ZXItYnVpbGRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvbGZDbHViU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnb2xmQ2x1YkRBTzogREFPPEdvbGZDbHViPjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZ29sZkNsdWJEQU86IERBTzxHb2xmQ2x1Yj4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nb2xmQ2x1YkRBTyA9IGdvbGZDbHViREFPO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEdvbGYgQ2x1YnNcclxuICAgICAqIEBhc3luY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvdW50cnlDb2RlIEFscGhhIDIgY291bnRyeSBjb2RlIG9yIHN1YmRpdmlzaW9uIGNvZGVcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEdvbGZDbHViW10+fSBMaXN0IG9mIGdvbGYgY2x1YnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRHb2xmQ2x1YnMoY291bnRyeUNvZGU6IHN0cmluZyk6IFByb21pc2U8R29sZkNsdWJbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVyQnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmlsdGVyKFwiY291bnRyeUNvZGVcIiwgY291bnRyeUNvZGUpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuICAgICAgICAgICAgY29uc3QgZ29sZkNsdWJzID0gYXdhaXQgdGhpcy5nb2xmQ2x1YkRBTy5nZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgLy9jb25zdCBnb2xmQ2x1YnMgPSBhd2FpdCB0aGlzLmdvbGZDbHViREFPLnNlYXJjaEJ5UHJvcGVydHkoXCJjb3VudHJ5Q29kZVwiLCBjb3VudHJ5Q29kZSwgMTApO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdvbGZDbHVicyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yQnVpbGRlci5nZW5lcmF0ZShFcnJvclR5cGUuR2VuZXJpYywgZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19