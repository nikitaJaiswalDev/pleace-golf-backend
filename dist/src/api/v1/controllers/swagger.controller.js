"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerController = void 0;
const express_1 = require("express");
const config_1 = require("../../../config");
class SwaggerController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: "API",
                    description: "API definition",
                },
                host: config_1.default.api.baseAddress,
                basePath: "/api",
                securityDefinitions: {
                    "bearer": {
                        "type": "apiKey",
                        "in": "header",
                        "name": "Authorization"
                    }
                },
                security: [
                    {
                        "bearer": []
                    }
                ]
            },
            apis: ["./src/api/v1/controllers/*.ts", "./src/api/v1/dtos/**/*.ts"]
        };
        const swaggerJSDoc = require("swagger-jsdoc");
        const swaggerUi = require("swagger-ui-express");
        const swaggerSpec = swaggerJSDoc(options);
        this.router.get("/json", function (req, res) {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerSpec);
        });
        this.router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}
exports.SwaggerController = SwaggerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS92MS9jb250cm9sbGVycy9zd2FnZ2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlDO0FBQ2pDLDRDQUFxQztBQUVyQyxNQUFhLGlCQUFpQjtJQUcxQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxJQUFJO1FBQ1IsTUFBTSxPQUFPLEdBQUc7WUFDWixpQkFBaUIsRUFBRTtnQkFDZixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLEtBQUs7b0JBQ1osV0FBVyxFQUFFLGdCQUFnQjtpQkFDaEM7Z0JBQ0QsSUFBSSxFQUFFLGdCQUFNLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQzVCLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixtQkFBbUIsRUFBRTtvQkFDakIsUUFBUSxFQUFFO3dCQUNOLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxNQUFNLEVBQUUsZUFBZTtxQkFDMUI7aUJBQ0o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOO3dCQUNJLFFBQVEsRUFBRSxFQUFTO3FCQUN0QjtpQkFDSjthQUNKO1lBQ0QsSUFBSSxFQUFFLENBQUMsK0JBQStCLEVBQUUsMkJBQTJCLENBQUM7U0FDdkUsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDdkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQWhERCw4Q0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3dhZ2dlckNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSBSb3V0ZXIoKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVyKCk6IFJvdXRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzd2FnZ2VyRGVmaW5pdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFQSVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFQSSBkZWZpbml0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaG9zdDogY29uZmlnLmFwaS5iYXNlQWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIGJhc2VQYXRoOiBcIi9hcGlcIixcclxuICAgICAgICAgICAgICAgIHNlY3VyaXR5RGVmaW5pdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJlYXJlclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFwaUtleVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluXCI6IFwiaGVhZGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkF1dGhvcml6YXRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiZWFyZXJcIjogW10gYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhcGlzOiBbXCIuL3NyYy9hcGkvdjEvY29udHJvbGxlcnMvKi50c1wiLCBcIi4vc3JjL2FwaS92MS9kdG9zLyoqLyoudHNcIl1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzd2FnZ2VySlNEb2MgPSByZXF1aXJlKFwic3dhZ2dlci1qc2RvY1wiKTtcclxuICAgICAgICBjb25zdCBzd2FnZ2VyVWkgPSByZXF1aXJlKFwic3dhZ2dlci11aS1leHByZXNzXCIpO1xyXG4gICAgICAgIGNvbnN0IHN3YWdnZXJTcGVjID0gc3dhZ2dlckpTRG9jKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoXCIvanNvblwiLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcclxuICAgICAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHN3YWdnZXJTcGVjKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIudXNlKFwiL1wiLCBzd2FnZ2VyVWkuc2VydmUsIHN3YWdnZXJVaS5zZXR1cChzd2FnZ2VyU3BlYykpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==