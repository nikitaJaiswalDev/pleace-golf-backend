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
exports.DataController = void 0;
const express_1 = require("express");
const error_handler_1 = require("../../handlers/error-handler");
const config_1 = require("../../../config");
const validator_1 = require("../../../core/validation/validator");
const data_import_and_transform_request_1 = require("../dtos/request/data-import-and-transform.request");
class DataController {
    constructor(dataImporter, dataTransformer) {
        this.dataImporter = dataImporter;
        this.dataTransformer = dataTransformer;
        this.initRoutes();
    }
    initRoutes() {
        this.router = (0, express_1.Router)();
        this.router.get("/transform", data_import_and_transform_request_1.DataImportAndTransformRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.transformData, this));
        this.router.get("/import", data_import_and_transform_request_1.DataImportAndTransformRequestSchema, validator_1.validate, (0, error_handler_1.wrapAsyncWithErrorHandling)(this.importData, this));
        this.router.get("/import-club-data", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.importClubData, this));
        this.router.post("/course/tee", (0, error_handler_1.wrapAsyncWithErrorHandling)(this.addCourseTees, this));
    }
    getRouter() {
        return this.router;
    }
    /**
    * @swagger
    * /data/transform:
    *  get:
    *      description: Transform data
    *      tags:
    *          - Data
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: key
    *            type: string
    *            required: true
    *            in: query
    *      responses:
    *          200:
    *              description: OK
    *          404:
    *              description: Resource not found
    *          500:
    *              description: Server error
    */
    transformData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = req.query.key.toString();
            if (config_1.default.dataImportKey === key) {
                yield this.dataTransformer.transformData();
                res.status(200).send();
            }
            else {
                res.status(401).send();
            }
        });
    }
    /**
    * @swagger
    * /data/import:
    *  get:
    *      description: Import data
    *      tags:
    *          - Data
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: key
    *            type: string
    *            required: true
    *            in: query
    *      responses:
    *          200:
    *              description: OK
    *          404:
    *              description: Resource not found
    *          500:
    *              description: Server error
    */
    importData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = req.query.key.toString();
            if (config_1.default.dataImportKey === key) {
                yield this.dataImporter.importData();
                res.status(200).send();
            }
            else {
                res.status(401).send();
            }
        });
    }
    /**
    * @swagger
    * /data/course/tee:
    *  post:
    *      description: Add course tees.
    *      tags:
    *          - Data
    *      produces:
    *          - application/json
    *      parameters:
    *          - name: key
    *            type: string
    *            required: true
    *            in: query
    *          - name: add course teees
    *            type: AddCourseTeeRequest
    *            in: body
    *            schema:
    *               $ref: '#/definitions/AddCourseTeeRequest'
    *      responses:
    *          200:
    *              description: OK
    *          400:
    *              description: Missing or invalid parameter.
    *          500:
    *              description: Server error
    */
    addCourseTees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const addCourseTeeRequest = req.body;
            const key = req.query.key.toString();
            if (config_1.default.dataImportKey === key) {
                for (let courseTeeRequest of addCourseTeeRequest.courses) {
                    yield this.dataImporter.addCourseTees(courseTeeRequest);
                }
                res.status(200).send();
            }
            else {
                res.status(401).send();
            }
        });
    }
    /**
    * @swagger
    * /data/import-club-data:
    *  get:
    *      description: Import data
    *      tags:
    *          - Data
    *      produces:
    *          - application/json
    *      responses:
    *          200:
    *              description: OK
    *          404:
    *              description: Resource not found
    *          500:
    *              description: Server error
    */
    importClubData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const key = req.query.key.toString();
            yield this.dataImporter.importClubData();
            res.status(200).send();
        });
    }
}
exports.DataController = DataController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy9kYXRhLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBRWpDLGdFQUEwRTtBQUUxRSw0Q0FBcUM7QUFDckMsa0VBQThEO0FBRzlELHlHQUF3RztBQUV4RyxNQUFhLGNBQWM7SUFLdkIsWUFBWSxZQUEwQixFQUFFLGVBQWdDO1FBQ3BFLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLHVFQUFtQyxFQUFFLG9CQUFRLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLHVFQUFtQyxFQUFFLG9CQUFRLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBQSwwQ0FBMEIsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUEsMENBQTBCLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BcUJFO0lBQ1csYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7O1lBQ3RFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXJDLElBQUksZ0JBQU0sQ0FBQyxhQUFhLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDO2lCQUNJLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXFCRTtJQUNXLFVBQVUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCOztZQUNuRSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVyQyxJQUFJLGdCQUFNLENBQUMsYUFBYSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUMvQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztpQkFDSSxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTBCRTtJQUNXLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCOztZQUN0RSxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUEyQixDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXJDLElBQUksZ0JBQU0sQ0FBQyxhQUFhLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQy9CLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDdkQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO2dCQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztpQkFDSSxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUdEOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JFO0lBQ1ksY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7O1lBQ3hFLHVDQUF1QztZQUN2QyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQixDQUFDO0tBQUE7Q0FFSjtBQWpLRCx3Q0FpS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyB9IGZyb20gXCIuLi8uLi9oYW5kbGVycy9lcnJvci1oYW5kbGVyXCI7XHJcbmltcG9ydCB7IERhdGFJbXBvcnRlciB9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2RhdGEtaW1wb3J0ZXJcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24vdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7IEFkZENvdXJzZVRlZVJlcXVlc3QgfSBmcm9tIFwiLi4vZHRvcy9yZXF1ZXN0L2FkZC1jb3Vyc2UtdGVlLnJlcXVlc3RcIjtcclxuaW1wb3J0IHsgRGF0YVRyYW5zZm9ybWVyIH0gZnJvbSBcIi4uLy4uLy4uL2RhdGEvZGF0YS10cmFuc2Zvcm1lclwiO1xyXG5pbXBvcnQgeyBEYXRhSW1wb3J0QW5kVHJhbnNmb3JtUmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuLi9kdG9zL3JlcXVlc3QvZGF0YS1pbXBvcnQtYW5kLXRyYW5zZm9ybS5yZXF1ZXN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkYXRhSW1wb3J0ZXI6IERhdGFJbXBvcnRlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGF0YVRyYW5zZm9ybWVyOiBEYXRhVHJhbnNmb3JtZXI7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGFJbXBvcnRlcjogRGF0YUltcG9ydGVyLCBkYXRhVHJhbnNmb3JtZXI6IERhdGFUcmFuc2Zvcm1lcikge1xyXG4gICAgICAgIHRoaXMuZGF0YUltcG9ydGVyID0gZGF0YUltcG9ydGVyO1xyXG4gICAgICAgIHRoaXMuZGF0YVRyYW5zZm9ybWVyID0gZGF0YVRyYW5zZm9ybWVyO1xyXG4gICAgICAgIHRoaXMuaW5pdFJvdXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFJvdXRlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IFJvdXRlcigpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmdldChcIi90cmFuc2Zvcm1cIiwgRGF0YUltcG9ydEFuZFRyYW5zZm9ybVJlcXVlc3RTY2hlbWEsIHZhbGlkYXRlLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLnRyYW5zZm9ybURhdGEsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvaW1wb3J0XCIsIERhdGFJbXBvcnRBbmRUcmFuc2Zvcm1SZXF1ZXN0U2NoZW1hLCB2YWxpZGF0ZSwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5pbXBvcnREYXRhLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KFwiL2ltcG9ydC1jbHViLWRhdGFcIiwgd3JhcEFzeW5jV2l0aEVycm9ySGFuZGxpbmcodGhpcy5pbXBvcnRDbHViRGF0YSwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLnBvc3QoXCIvY291cnNlL3RlZVwiLCB3cmFwQXN5bmNXaXRoRXJyb3JIYW5kbGluZyh0aGlzLmFkZENvdXJzZVRlZXMsIHRoaXMpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldFJvdXRlcigpOiBSb3V0ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL2RhdGEvdHJhbnNmb3JtOlxyXG4gICAgKiAgZ2V0OlxyXG4gICAgKiAgICAgIGRlc2NyaXB0aW9uOiBUcmFuc2Zvcm0gZGF0YVxyXG4gICAgKiAgICAgIHRhZ3M6XHJcbiAgICAqICAgICAgICAgIC0gRGF0YVxyXG4gICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgKiAgICAgICAgICAtIG5hbWU6IGtleVxyXG4gICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAqICAgICAgICAgICAgaW46IHF1ZXJ5XHJcbiAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICogICAgICAgICAgNDA0OlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHRyYW5zZm9ybURhdGEocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBrZXkgPSByZXEucXVlcnkua2V5LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuZGF0YUltcG9ydEtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGF0YVRyYW5zZm9ybWVyLnRyYW5zZm9ybURhdGEoKTtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL2RhdGEvaW1wb3J0OlxyXG4gICAgKiAgZ2V0OlxyXG4gICAgKiAgICAgIGRlc2NyaXB0aW9uOiBJbXBvcnQgZGF0YVxyXG4gICAgKiAgICAgIHRhZ3M6XHJcbiAgICAqICAgICAgICAgIC0gRGF0YVxyXG4gICAgKiAgICAgIHByb2R1Y2VzOlxyXG4gICAgKiAgICAgICAgICAtIGFwcGxpY2F0aW9uL2pzb25cclxuICAgICogICAgICBwYXJhbWV0ZXJzOlxyXG4gICAgKiAgICAgICAgICAtIG5hbWU6IGtleVxyXG4gICAgKiAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgKiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAqICAgICAgICAgICAgaW46IHF1ZXJ5XHJcbiAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICogICAgICAgICAgNDA0OlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGltcG9ydERhdGEocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBrZXkgPSByZXEucXVlcnkua2V5LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuZGF0YUltcG9ydEtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGF0YUltcG9ydGVyLmltcG9ydERhdGEoKTtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL2RhdGEvY291cnNlL3RlZTpcclxuICAgICogIHBvc3Q6XHJcbiAgICAqICAgICAgZGVzY3JpcHRpb246IEFkZCBjb3Vyc2UgdGVlcy5cclxuICAgICogICAgICB0YWdzOlxyXG4gICAgKiAgICAgICAgICAtIERhdGFcclxuICAgICogICAgICBwcm9kdWNlczpcclxuICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAqICAgICAgcGFyYW1ldGVyczpcclxuICAgICogICAgICAgICAgLSBuYW1lOiBrZXlcclxuICAgICogICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICAgICogICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgKiAgICAgICAgICAgIGluOiBxdWVyeVxyXG4gICAgKiAgICAgICAgICAtIG5hbWU6IGFkZCBjb3Vyc2UgdGVlZXNcclxuICAgICogICAgICAgICAgICB0eXBlOiBBZGRDb3Vyc2VUZWVSZXF1ZXN0XHJcbiAgICAqICAgICAgICAgICAgaW46IGJvZHlcclxuICAgICogICAgICAgICAgICBzY2hlbWE6XHJcbiAgICAqICAgICAgICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvQWRkQ291cnNlVGVlUmVxdWVzdCdcclxuICAgICogICAgICByZXNwb25zZXM6XHJcbiAgICAqICAgICAgICAgIDIwMDpcclxuICAgICogICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBPS1xyXG4gICAgKiAgICAgICAgICA0MDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogTWlzc2luZyBvciBpbnZhbGlkIHBhcmFtZXRlci5cclxuICAgICogICAgICAgICAgNTAwOlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFNlcnZlciBlcnJvclxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBhZGRDb3Vyc2VUZWVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgYWRkQ291cnNlVGVlUmVxdWVzdCA9IHJlcS5ib2R5IGFzIEFkZENvdXJzZVRlZVJlcXVlc3Q7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcmVxLnF1ZXJ5LmtleS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlnLmRhdGFJbXBvcnRLZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb3Vyc2VUZWVSZXF1ZXN0IG9mIGFkZENvdXJzZVRlZVJlcXVlc3QuY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kYXRhSW1wb3J0ZXIuYWRkQ291cnNlVGVlcyhjb3Vyc2VUZWVSZXF1ZXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICogQHN3YWdnZXJcclxuICAgICogL2RhdGEvaW1wb3J0LWNsdWItZGF0YTpcclxuICAgICogIGdldDpcclxuICAgICogICAgICBkZXNjcmlwdGlvbjogSW1wb3J0IGRhdGFcclxuICAgICogICAgICB0YWdzOlxyXG4gICAgKiAgICAgICAgICAtIERhdGFcclxuICAgICogICAgICBwcm9kdWNlczpcclxuICAgICogICAgICAgICAgLSBhcHBsaWNhdGlvbi9qc29uXHJcbiAgICAqICAgICAgcmVzcG9uc2VzOlxyXG4gICAgKiAgICAgICAgICAyMDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogT0tcclxuICAgICogICAgICAgICAgNDA0OlxyXG4gICAgKiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFJlc291cmNlIG5vdCBmb3VuZFxyXG4gICAgKiAgICAgICAgICA1MDA6XHJcbiAgICAqICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU2VydmVyIGVycm9yXHJcbiAgICAqL1xyXG4gICAgIHB1YmxpYyBhc3luYyBpbXBvcnRDbHViRGF0YShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIC8vY29uc3Qga2V5ID0gcmVxLnF1ZXJ5LmtleS50b1N0cmluZygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YUltcG9ydGVyLmltcG9ydENsdWJEYXRhKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iXX0=