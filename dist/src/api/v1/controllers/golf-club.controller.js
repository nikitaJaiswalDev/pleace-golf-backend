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
exports.GolfClubController = void 0;
const express_1 = require("express");
const error_handler_1 = require("../../handlers/error-handler");
const mapper_1 = require("../mapper");
const golf_club_request_1 = require("../dtos/request/golf-club.request");
const validator_1 = require("../../../core/validation/validator");
class GolfClubController {
    constructor(golfClubService) {
        this.golfClubService = golfClubService;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.get("/", golf_club_request_1.GolfClubRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.getGolfClubs, this));
    }
    getRouter() {
        return this.router;
    }
    /**
     * @swagger
     * /golf-club/:
     *  get:
     *      description: Get golf clubs
     *      tags:
     *          - Golf Club
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: countryCode
     *            type: string
     *            required: true
     *            in: query
     *      responses:
     *          200:
     *              description: OK
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/GolfClubResponse'
     *          404:
     *              description: Resource not found
     *          500:
     *              description: Server error
     */
    getGolfClubs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryCode = req.query.countryCode.toString();
            const golfClubs = yield this.golfClubService.getGolfClubs(countryCode);
            res.status(200).send(mapper_1.Mapper.mapGolfClubs(golfClubs));
        });
    }
}
exports.GolfClubController = GolfClubController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZi1jbHViLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2NvbnRyb2xsZXJzL2dvbGYtY2x1Yi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFpQztBQUVqQyxnRUFBMEU7QUFDMUUsc0NBQW1DO0FBRW5DLHlFQUEwRTtBQUMxRSxrRUFBOEQ7QUFHOUQsTUFBYSxrQkFBa0I7SUFJM0IsWUFBWSxlQUFnQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx5Q0FBcUIsRUFBRSxvQkFBUSxFQUFFLElBQUEsMENBQTBCLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNVLFlBQVksQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCOztZQUNyRSxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXZFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUF1QixDQUFDLENBQUM7UUFDL0UsQ0FBQztLQUFBO0NBQ0o7QUFsREQsZ0RBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvZ2dpbmdcIjtcclxuaW1wb3J0IHsgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvZXJyb3ItaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBNYXBwZXIgfSBmcm9tIFwiLi4vbWFwcGVyXCI7XHJcbmltcG9ydCB7IEdvbGZDbHViU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9nb2xmLWNsdWIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YlJlcXVlc3RTY2hlbWEgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L2dvbGYtY2x1Yi5yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgR29sZkNsdWJSZXNwb25zZSB9IGZyb20gXCIuLi9kdG9zL3Jlc3BvbnNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR29sZkNsdWJDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ29sZkNsdWJTZXJ2aWNlOiBHb2xmQ2x1YlNlcnZpY2U7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdvbGZDbHViU2VydmljZTogR29sZkNsdWJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5nb2xmQ2x1YlNlcnZpY2UgPSBnb2xmQ2x1YlNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5pbml0Um91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Um91dGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gUm91dGVyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL1wiLCBHb2xmQ2x1YlJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmdldEdvbGZDbHVicywgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSb3V0ZXIoKTogUm91dGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAc3dhZ2dlclxyXG4gICAgICogL2dvbGYtY2x1Yi86XHJcbiAgICAgKiAgZ2V0OlxyXG4gICAgICogICAgICBkZXNjcmlwdGlvbjogR2V0IGdvbGYgY2x1YnNcclxuICAgICAqICAgICAgdGFnczpcclxuICAgICAqICAgICAgICAgIC0gR29sZiBDbHViXHJcbiAgICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAgKiAgICAgIHBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgICAgICAtIG5hbWU6IGNvdW50cnlDb2RlXHJcbiAgICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICogICAgICAgICAgICBpbjogcXVlcnlcclxuICAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgICogICAgICAgICAgMjAwOlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgICogICAgICAgICAgICAgIHNjaGVtYTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICAgICAqICAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAkcmVmOiAnIy9kZWZpbml0aW9ucy9Hb2xmQ2x1YlJlc3BvbnNlJ1xyXG4gICAgICogICAgICAgICAgNDA0OlxyXG4gICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBSZXNvdXJjZSBub3QgZm91bmRcclxuICAgICAqICAgICAgICAgIDUwMDpcclxuICAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRHb2xmQ2x1YnMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBjb3VudHJ5Q29kZSA9IHJlcS5xdWVyeS5jb3VudHJ5Q29kZS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IGdvbGZDbHVicyA9IGF3YWl0IHRoaXMuZ29sZkNsdWJTZXJ2aWNlLmdldEdvbGZDbHVicyhjb3VudHJ5Q29kZSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKE1hcHBlci5tYXBHb2xmQ2x1YnMoZ29sZkNsdWJzKSBhcyBHb2xmQ2x1YlJlc3BvbnNlW10pO1xyXG4gICAgfVxyXG59Il19