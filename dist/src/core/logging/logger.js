"use strict";
/**
 * Copyright (c) 2020 Codev Technologies (Pty) Ltd. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const path = require("path");
const fs = require("fs");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const loggerConfig = require("../../../logging.config.json");
const config_1 = require("../../config");
var Logger;
(function (Logger) {
    function createLogsDirectory(filePath) {
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
    }
    function createTransport(transport) {
        if (transport.type === "console") {
            return new winston.transports.Console({
                level: transport.level,
                format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json())
            });
        }
        else {
            createLogsDirectory(transport.filename);
            return new DailyRotateFile({
                name: `file#${transport.level}`,
                filename: transport.filename,
                datePattern: "YYY-MM-DD-HH",
                prepend: true,
                level: transport.level
            });
        }
    }
    const transports = [];
    const winstonConfig = loggerConfig;
    var winstonTransports;
    if (config_1.default.environment === "development") {
        winstonTransports = winstonConfig.development.transports;
    }
    else if (config_1.default.environment === "production") {
        winstonTransports = winstonConfig.production.transports;
    }
    for (const winstonTransport of winstonTransports) {
        transports.push(createTransport(winstonTransport));
    }
    Logger.logger = winston.createLogger({
        transports: transports
    });
    Logger.debug = Logger.logger.debug.bind(Logger.logger);
    Logger.verbose = Logger.logger.verbose.bind(Logger.logger);
    Logger.warn = Logger.logger.warn.bind(Logger.logger);
    Logger.info = Logger.logger.info.bind(Logger.logger);
    Logger.error = Logger.logger.error.bind(Logger.logger);
    Logger.child = Logger.logger.child.bind(Logger.logger);
})(Logger || (exports.Logger = Logger = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvbG9nZ2luZy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFFSCw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLG1DQUFtQztBQUNuQyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUM3RCw2REFBNkQ7QUFDN0QseUNBQWtDO0FBSWxDLElBQWlCLE1BQU0sQ0EwRHRCO0FBMURELFdBQWlCLE1BQU07SUFFbkIsU0FBUyxtQkFBbUIsQ0FBQyxRQUFnQjtRQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVMsZUFBZSxDQUFDLFNBQWlDO1FBQ3RELElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUN4QjthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7YUFBTSxDQUFDO1lBQ0osbUJBQW1CLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sSUFBSSxlQUFlLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxRQUFRLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtnQkFDNUIsV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSzthQUN6QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUMzQixNQUFNLGFBQWEsR0FBd0IsWUFBWSxDQUFDO0lBQ3hELElBQUksaUJBQTJDLENBQUM7SUFFaEQsSUFBSSxnQkFBTSxDQUFDLFdBQVcsS0FBSyxhQUFhLEVBQUUsQ0FBQztRQUN2QyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUM3RCxDQUFDO1NBQ0ksSUFBSSxnQkFBTSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQTtJQUMzRCxDQUFDO0lBRUQsS0FBSyxNQUFNLGdCQUFnQixJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFWSxhQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN2QyxVQUFVLEVBQUUsVUFBVTtLQUN6QixDQUFDLENBQUM7SUFFVSxZQUFLLEdBQUcsT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFBLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLGNBQU8sR0FBRyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQUEsTUFBTSxDQUFDLENBQUM7SUFDdEMsV0FBSSxHQUFHLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBQSxNQUFNLENBQUMsQ0FBQztJQUNoQyxXQUFJLEdBQUcsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFBLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLFlBQUssR0FBRyxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQUEsTUFBTSxDQUFDLENBQUM7SUFFbEMsWUFBSyxHQUFHLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBQSxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDLEVBMURnQixNQUFNLHNCQUFOLE1BQU0sUUEwRHRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBDb2RldiBUZWNobm9sb2dpZXMgKFB0eSkgTHRkLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIHdpbnN0b24gZnJvbSBcIndpbnN0b25cIjtcclxuY29uc3QgRGFpbHlSb3RhdGVGaWxlID0gcmVxdWlyZShcIndpbnN0b24tZGFpbHktcm90YXRlLWZpbGVcIik7XHJcbmltcG9ydCAqIGFzIGxvZ2dlckNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vbG9nZ2luZy5jb25maWcuanNvblwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFdpbnN0b25UcmFuc3BvcnRDb25maWcsIFdpbnN0b25Db25maWcgfSBmcm9tIFwiLi93aW5zdG9uLmNvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgTG9nZ2VyIHtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMb2dzRGlyZWN0b3J5KGZpbGVQYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xyXG5cclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyZWN0b3J5KSkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyZWN0b3J5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydDogV2luc3RvblRyYW5zcG9ydENvbmZpZykge1xyXG4gICAgICAgIGlmICh0cmFuc3BvcnQudHlwZSA9PT0gXCJjb25zb2xlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XHJcbiAgICAgICAgICAgICAgICBsZXZlbDogdHJhbnNwb3J0LmxldmVsLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnRpbWVzdGFtcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmVycm9ycyh7IHN0YWNrOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0Lmpzb24oKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcmVhdGVMb2dzRGlyZWN0b3J5KHRyYW5zcG9ydC5maWxlbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGFpbHlSb3RhdGVGaWxlKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGBmaWxlIyR7dHJhbnNwb3J0LmxldmVsfWAsXHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogdHJhbnNwb3J0LmZpbGVuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGF0ZVBhdHRlcm46IFwiWVlZLU1NLURELUhIXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVwZW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWw6IHRyYW5zcG9ydC5sZXZlbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhbnNwb3J0czogYW55ID0gW107XHJcbiAgICBjb25zdCB3aW5zdG9uQ29uZmlnOiBXaW5zdG9uQ29uZmlnID0gPGFueT4gbG9nZ2VyQ29uZmlnO1xyXG4gICAgdmFyIHdpbnN0b25UcmFuc3BvcnRzOiBXaW5zdG9uVHJhbnNwb3J0Q29uZmlnW107XHJcblxyXG4gICAgaWYgKGNvbmZpZy5lbnZpcm9ubWVudCA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgICAgICAgd2luc3RvblRyYW5zcG9ydHMgPSB3aW5zdG9uQ29uZmlnLmRldmVsb3BtZW50LnRyYW5zcG9ydHM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb25maWcuZW52aXJvbm1lbnQgPT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgICAgICAgd2luc3RvblRyYW5zcG9ydHMgPSB3aW5zdG9uQ29uZmlnLnByb2R1Y3Rpb24udHJhbnNwb3J0c1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgd2luc3RvblRyYW5zcG9ydCBvZiB3aW5zdG9uVHJhbnNwb3J0cykge1xyXG4gICAgICAgIHRyYW5zcG9ydHMucHVzaChjcmVhdGVUcmFuc3BvcnQod2luc3RvblRyYW5zcG9ydCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XHJcbiAgICAgICAgdHJhbnNwb3J0czogdHJhbnNwb3J0c1xyXG4gICAgfSk7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IGRlYnVnID0gbG9nZ2VyLmRlYnVnLmJpbmQobG9nZ2VyKTtcclxuICAgIGV4cG9ydCBjb25zdCB2ZXJib3NlID0gbG9nZ2VyLnZlcmJvc2UuYmluZChsb2dnZXIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IHdhcm4gPSBsb2dnZXIud2Fybi5iaW5kKGxvZ2dlcik7XHJcbiAgICBleHBvcnQgY29uc3QgaW5mbyA9IGxvZ2dlci5pbmZvLmJpbmQobG9nZ2VyKTtcclxuICAgIGV4cG9ydCBjb25zdCBlcnJvciA9IGxvZ2dlci5lcnJvci5iaW5kKGxvZ2dlcik7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IGNoaWxkID0gbG9nZ2VyLmNoaWxkLmJpbmQobG9nZ2VyKTtcclxufVxyXG4iXX0=