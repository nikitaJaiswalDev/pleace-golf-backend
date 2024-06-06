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
exports.CountryController = void 0;
const express_1 = require("express");
const error_handler_1 = require("../../handlers/error-handler");
const mapper_1 = require("../mapper");
class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.get("/", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getCountries, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /country/:
     *  get:
     *      description: Gets all countries
     *      tags:
     *          - Country
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/CountryResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getCountries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const countries = this.countryService.getCountries().sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            const countries = this.countryService.getCountries();
            res.status(200).send(mapper_1.Mapper.mapCountries(countries));
        });
    }
}
exports.CountryController = CountryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy9jb3VudHJ5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBRWpDLGdFQUEwRTtBQUUxRSxzQ0FBbUM7QUFHbkMsTUFBYSxpQkFBaUI7SUFJMUIsWUFBWSxjQUE4QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFBLDBDQUEwQixFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ1UsWUFBWSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7O1lBQ3JFLDJIQUEySDtZQUMzSCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFzQixDQUFDLENBQUM7UUFDOUUsQ0FBQztLQUFBO0NBQ0o7QUE1Q0QsOENBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvZXJyb3ItaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDb3VudHJ5U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2NvdW50cnkvY291bnRyeS1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1hcHBlciB9IGZyb20gXCIuLi9tYXBwZXJcIjtcclxuaW1wb3J0IHsgQ291bnRyeVJlc3BvbnNlIH0gZnJvbSBcIi4uL2R0b3MvcmVzcG9uc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb3VudHJ5Q29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvdW50cnlTZXJ2aWNlOiBDb3VudHJ5U2VydmljZTtcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY291bnRyeVNlcnZpY2U6IENvdW50cnlTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudHJ5U2VydmljZSA9IGNvdW50cnlTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvdXRlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IFJvdXRlcigpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi9cIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5nZXRDb3VudHJpZXMsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVyKCk6IFJvdXRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHN3YWdnZXJcclxuICAgICAqIC9jb3VudHJ5LzpcclxuICAgICAqICBnZXQ6XHJcbiAgICAgKiAgICAgIGRlc2NyaXB0aW9uOiBHZXRzIGFsbCBjb3VudHJpZXNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gQ291bnRyeVxyXG4gICAgICogICAgICBwcm9kdWNlczpcclxuICAgICAqICAgICAgICAgIC0gYXBwbGljYXRpb24vanNvblxyXG4gICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IE9LXHJcbiAgICAgKiAgICAgICAgICAgICAgc2NoZW1hOlxyXG4gICAgICogICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gICAgICogICAgICAgICAgICAgICAgICBpdGVtczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0NvdW50cnlSZXNwb25zZSdcclxuICAgICAqICAgICAgICAgIDQwNDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogUmVzb3VyY2Ugbm90IGZvdW5kXHJcbiAgICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q291bnRyaWVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy9jb25zdCBjb3VudHJpZXMgPSB0aGlzLmNvdW50cnlTZXJ2aWNlLmdldENvdW50cmllcygpLnNvcnQoKGEsYikgPT4gYS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBiLm5hbWUudG9Mb3dlckNhc2UoKSA/IDEgOiAtMSk7XHJcbiAgICAgICAgY29uc3QgY291bnRyaWVzID0gdGhpcy5jb3VudHJ5U2VydmljZS5nZXRDb3VudHJpZXMoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChNYXBwZXIubWFwQ291bnRyaWVzKGNvdW50cmllcykgYXMgQ291bnRyeVJlc3BvbnNlW10pO1xyXG4gICAgfVxyXG59Il19