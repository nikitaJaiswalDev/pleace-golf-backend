"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const uuid_1 = require("uuid");
const helmet = require("helmet");
const cors = require("cors");
const config_1 = require("./config");
const passport_1 = require("./api/auth/passport");
const error_handler_1 = require("./api/handlers/error-handler");
const logMiddleware = require("./core/express/log.middleware");
class App {
    constructor(routersMap, userService, agendaDependency) {
        this.routersMap = routersMap;
        this.userService = userService;
        this.agendaDependency = agendaDependency;
        this.app = express();
        this._initBeforeRoutesMiddleware();
        this._initRoutes();
        this._initAfterRoutesMiddleware();
    }
    getApp() {
        return this.app;
    }
    _initBeforeRoutesMiddleware() {
        this.app.use(bodyParser.json({ limit: "3mb" }));
        this.app.use(bodyParser.urlencoded({ extended: false, limit: "3mb" }));
        this.app.use(helmet());
        this.app.use(passport.initialize());
        this.app.use(this._addRequestId);
        this.app.use(logMiddleware.initialize({ obfuscate: config_1.default.environment === "production" }));
        //if (config.environment === "development") {
        //var whitelist = ['http://example1.com', 'http://example2.com']
        var corsOptions = {
            origin: [
                `${config_1.default.app.scheme}://${config_1.default.app.baseAddress}`, `${config_1.default.api.scheme}://${config_1.default.api.baseAddress}`,
                `https://pleacegolf.world`,
                `https://pleace-awaken.me`,
                `https://pleace-awaken.live`,
                `https://pleace.help`,
                `https://pleace-awaken.world`
            ],
        };
        this.app.use(cors(corsOptions));
        //this.app.options('*', cors());
        //}
        passport_1.PassportAuth.configAuth(passport, this.userService);
    }
    _initAfterRoutesMiddleware() {
        this.app.use(error_handler_1.handleErrors);
    }
    _addRequestId(req, res, next) {
        if (!req.body.requestId) {
            const requestId = (0, uuid_1.v4)();
            req.body = Object.assign(Object.assign({}, req.body), { requestId: requestId });
        }
        next();
    }
    _initRoutes() {
        for (const version in this.routersMap) {
            this.app.use("/api/" + version, this.routersMap[version].getRouter());
        }
        this.agendaDependency.addAgendash(this.app);
    }
}
exports.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBbUM7QUFDbkMsMENBQTBDO0FBQzFDLHFDQUFxQztBQUVyQywrQkFBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUU3QixxQ0FBOEI7QUFDOUIsa0RBQW1EO0FBQ25ELGdFQUE0RDtBQUc1RCwrREFBK0Q7QUFHL0QsTUFBYSxHQUFHO0lBTVosWUFBbUIsVUFBc0MsRUFBRSxXQUF3QixFQUFFLGdCQUFrQztRQUNuSCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVNLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVPLDJCQUEyQjtRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQU0sQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNGLDZDQUE2QztRQUV6QyxnRUFBZ0U7UUFDaEUsSUFBSSxXQUFXLEdBQUc7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sZ0JBQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sZ0JBQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUN0RywwQkFBMEI7Z0JBQzFCLDBCQUEwQjtnQkFDMUIsNEJBQTRCO2dCQUM1QixxQkFBcUI7Z0JBQ3JCLDZCQUE2QjthQUNoQztTQUNKLENBQUE7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoQyxnQ0FBZ0M7UUFDcEMsR0FBRztRQUVILHVCQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLDBCQUEwQjtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWM7UUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBQSxTQUFJLEdBQUUsQ0FBQztZQUN6QixHQUFHLENBQUMsSUFBSSxtQ0FBUSxHQUFHLENBQUMsSUFBSSxLQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUUsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRU8sV0FBVztRQUNmLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0o7QUFsRUQsa0JBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIEFwcGxpY2F0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcblxyXG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcclxuaW1wb3J0ICogYXMgY29ycyBmcm9tIFwiY29yc1wiO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7IFBhc3Nwb3J0QXV0aCB9IGZyb20gXCIuL2FwaS9hdXRoL3Bhc3Nwb3J0XCI7XHJcbmltcG9ydCB7IGhhbmRsZUVycm9ycyB9IGZyb20gXCIuL2FwaS9oYW5kbGVycy9lcnJvci1oYW5kbGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBsb2dNaWRkbGV3YXJlIGZyb20gXCIuL2NvcmUvZXhwcmVzcy9sb2cubWlkZGxld2FyZVwiO1xyXG5pbXBvcnQgeyBBZ2VuZGFEZXBlbmRlbmN5IH0gZnJvbSBcIi4vY29yZS9kZXBlbmRlbmNpZXMvYWdlbmRhL2FnZW5kYS5kZXBlbmRlbmN5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwOiBBcHBsaWNhdGlvbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyc01hcDogeyBbdmVyc2lvbjogc3RyaW5nXTogYW55IH07XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWdlbmRhRGVwZW5kZW5jeTogQWdlbmRhRGVwZW5kZW5jeTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm91dGVyc01hcDogeyBbdmVyc2lvbjogc3RyaW5nXTogYW55IH0sIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgYWdlbmRhRGVwZW5kZW5jeTogQWdlbmRhRGVwZW5kZW5jeSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyc01hcCA9IHJvdXRlcnNNYXA7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuYWdlbmRhRGVwZW5kZW5jeSA9IGFnZW5kYURlcGVuZGVuY3k7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEJlZm9yZVJvdXRlc01pZGRsZXdhcmUoKTtcclxuICAgICAgICB0aGlzLl9pbml0Um91dGVzKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEFmdGVyUm91dGVzTWlkZGxld2FyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHAoKTogQXBwbGljYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0QmVmb3JlUm91dGVzTWlkZGxld2FyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6IFwiM21iXCIgfSkpO1xyXG4gICAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UsIGxpbWl0OiBcIjNtYlwiIH0pKTtcclxuICAgICAgICB0aGlzLmFwcC51c2UoaGVsbWV0KCkpO1xyXG4gICAgICAgIHRoaXMuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xyXG4gICAgICAgIHRoaXMuYXBwLnVzZSh0aGlzLl9hZGRSZXF1ZXN0SWQpO1xyXG4gICAgICAgIHRoaXMuYXBwLnVzZShsb2dNaWRkbGV3YXJlLmluaXRpYWxpemUoeyBvYmZ1c2NhdGU6IGNvbmZpZy5lbnZpcm9ubWVudCA9PT0gXCJwcm9kdWN0aW9uXCIgfSkpO1xyXG5cclxuICAgICAgICAvL2lmIChjb25maWcuZW52aXJvbm1lbnQgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG5cclxuICAgICAgICAgICAgLy92YXIgd2hpdGVsaXN0ID0gWydodHRwOi8vZXhhbXBsZTEuY29tJywgJ2h0dHA6Ly9leGFtcGxlMi5jb20nXVxyXG4gICAgICAgICAgICB2YXIgY29yc09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW46IFtcclxuICAgICAgICAgICAgICAgICAgICBgJHtjb25maWcuYXBwLnNjaGVtZX06Ly8ke2NvbmZpZy5hcHAuYmFzZUFkZHJlc3N9YCwgYCR7Y29uZmlnLmFwaS5zY2hlbWV9Oi8vJHtjb25maWcuYXBpLmJhc2VBZGRyZXNzfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYGh0dHBzOi8vcGxlYWNlZ29sZi53b3JsZGAsXHJcbiAgICAgICAgICAgICAgICAgICAgYGh0dHBzOi8vcGxlYWNlLWF3YWtlbi5tZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYGh0dHBzOi8vcGxlYWNlLWF3YWtlbi5saXZlYCxcclxuICAgICAgICAgICAgICAgICAgICBgaHR0cHM6Ly9wbGVhY2UuaGVscGAsXHJcbiAgICAgICAgICAgICAgICAgICAgYGh0dHBzOi8vcGxlYWNlLWF3YWtlbi53b3JsZGBcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hcHAudXNlKGNvcnMoY29yc09wdGlvbnMpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFwcC5vcHRpb25zKCcqJywgY29ycygpKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgUGFzc3BvcnRBdXRoLmNvbmZpZ0F1dGgocGFzc3BvcnQsIHRoaXMudXNlclNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRBZnRlclJvdXRlc01pZGRsZXdhcmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHAudXNlKGhhbmRsZUVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkUmVxdWVzdElkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXJlcS5ib2R5LnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB1dWlkKCk7XHJcbiAgICAgICAgICAgIHJlcS5ib2R5ID0geyAuLi5yZXEuYm9keSwgcmVxdWVzdElkOiByZXF1ZXN0SWQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRSb3V0ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJzaW9uIGluIHRoaXMucm91dGVyc01hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcC51c2UoXCIvYXBpL1wiICsgdmVyc2lvbiwgdGhpcy5yb3V0ZXJzTWFwW3ZlcnNpb25dLmdldFJvdXRlcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZ2VuZGFEZXBlbmRlbmN5LmFkZEFnZW5kYXNoKHRoaXMuYXBwKTtcclxuICAgIH1cclxufVxyXG4iXX0=