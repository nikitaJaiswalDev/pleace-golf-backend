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
exports.DependencyBootstrapper = void 0;
const logging_1 = require("../logging");
class DependencyBootstrapper {
    constructor(...dependencies) {
        this.dependencies = dependencies;
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info("Starting dependency bootstrap");
            yield this.connect();
            logging_1.Logger.info("Finished dependency bootstrap");
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectDependencies = this.dependencies.map((dependency) => {
                return dependency.connect();
            });
            yield Promise.all(connectDependencies);
            logging_1.Logger.info("All dependencies connected");
        });
    }
}
exports.DependencyBootstrapper = DependencyBootstrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeS1ib290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9kZXBlbmRlbmNpZXMvZGVwZW5kZW5jeS1ib290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7QUFHSCx3Q0FBb0M7QUFFcEMsTUFBYSxzQkFBc0I7SUFHL0IsWUFBbUIsR0FBRyxZQUErQjtRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRVksU0FBUzs7WUFDbEIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUM3QyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixnQkFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVhLE9BQU87O1lBQ2pCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDN0QsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV2QyxnQkFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtDQUNKO0FBckJELHdEQXFCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgQ29kZXYgVGVjaG5vbG9naWVzIChQdHkpIEx0ZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vZGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vbG9nZ2luZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY3lCb290c3RyYXBwZXIge1xyXG4gICAgcHJpdmF0ZSBkZXBlbmRlbmNpZXM6IERlcGVuZGVuY3k8YW55PltdO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5kZXBlbmRlbmNpZXM6IERlcGVuZGVuY3k8YW55PltdKSB7XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGJvb3RzdHJhcCgpIHtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcIlN0YXJ0aW5nIGRlcGVuZGVuY3kgYm9vdHN0cmFwXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdCgpO1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiRmluaXNoZWQgZGVwZW5kZW5jeSBib290c3RyYXBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGNvbm5lY3REZXBlbmRlbmNpZXMgPSB0aGlzLmRlcGVuZGVuY2llcy5tYXAoKGRlcGVuZGVuY3kpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3kuY29ubmVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGNvbm5lY3REZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkFsbCBkZXBlbmRlbmNpZXMgY29ubmVjdGVkXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==