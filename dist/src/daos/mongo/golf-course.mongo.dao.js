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
exports.GolfCourseMongoDAO = void 0;
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const golf_course_model_1 = require("../../models/golf-course.model");
class GolfCourseMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(golf_course_model_1.GolfCourseSchema);
    }
    addGolfCourseTees(teesRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = teesRequest.courseId;
            try {
                yield golf_course_model_1.GolfCourseSchema.findOneAndUpdate({
                    _id: courseId,
                }, {
                    $set: {
                        tees: teesRequest.tees
                    }
                }, {
                    new: true
                }).exec();
                return Promise.resolve(true);
            }
            catch (error) {
                logging_1.Logger.error(`Could not update golf course tees. Error: ${error}`);
                throw error;
            }
        });
    }
    update(golfCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.GolfCourseMongoDAO = GolfCourseMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZi1jb3Vyc2UubW9uZ28uZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Rhb3MvbW9uZ28vZ29sZi1jb3Vyc2UubW9uZ28uZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw4REFBMEQ7QUFHMUQsc0VBQWtFO0FBRWxFLE1BQWEsa0JBQW1CLFNBQVEsb0JBQW9CO0lBRXhEO1FBQ0ksS0FBSyxDQUFDLG9DQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVZLGlCQUFpQixDQUFDLFdBQWdCOztZQUMzQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksQ0FBQztnQkFDRCxNQUFNLG9DQUFnQixDQUFDLGdCQUFnQixDQUNuQztvQkFDSSxHQUFHLEVBQUUsUUFBUTtpQkFDaEIsRUFDRDtvQkFDSSxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3FCQUN6QjtpQkFDSixFQUNEO29CQUNJLEdBQUcsRUFBRSxJQUFJO2lCQUNaLENBQ0osQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sS0FBSyxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFHWSxNQUFNLENBQUMsVUFBc0I7O1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxNQUFNLENBQUMsVUFBa0IsRUFBRSxLQUFhOztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBRUo7QUF0Q0QsZ0RBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBNb25nb0RBTyB9IGZyb20gXCIuLi8uLi9jb3JlL2Rhby9tb25nby9tb25nby5kYW9cIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZSB9IGZyb20gXCIuLi8uLi90eXBlcy9nb2xmLWNvdXJzZVwiO1xyXG5pbXBvcnQgeyBHb2xmQ291cnNlREFPIH0gZnJvbSBcIi4uL2dvbGYtY291cnNlLmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZVNjaGVtYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZ29sZi1jb3Vyc2UubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb2xmQ291cnNlTW9uZ29EQU8gZXh0ZW5kcyBNb25nb0RBTzxHb2xmQ291cnNlPiBpbXBsZW1lbnRzIEdvbGZDb3Vyc2VEQU8ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEdvbGZDb3Vyc2VTY2hlbWEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBhZGRHb2xmQ291cnNlVGVlcyh0ZWVzUmVxdWVzdDogYW55KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgY291cnNlSWQgPSB0ZWVzUmVxdWVzdC5jb3Vyc2VJZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmRPbmVBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiBjb3Vyc2VJZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWVzOiB0ZWVzUmVxdWVzdC50ZWVzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXc6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgdXBkYXRlIGdvbGYgY291cnNlIHRlZXMuIEVycm9yOiAke2Vycm9yfWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUoZ29sZkNvdXJzZTogR29sZkNvdXJzZSk6IFByb21pc2U8R29sZkNvdXJzZT4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlYXJjaChpbnB1dFF1ZXJ5OiBzdHJpbmcsIGxpbWl0OiBudW1iZXIpOiBQcm9taXNlPEdvbGZDb3Vyc2VbXT4ge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==