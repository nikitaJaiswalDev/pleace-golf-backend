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
exports.DataTransformer = void 0;
const excel_file_reader_1 = require("../core/excel/excel-file-reader");
const logging_1 = require("../core/logging");
const _ = require("lodash");
const filter_builder_1 = require("../core/dao/filter/filter-builder");
const gender_enum_1 = require("../types/gender.enum");
const path = require("path");
class DataTransformer {
    constructor(golfClubDAO, golfCourseDAO, accessTokenDAO, tournamentDAO, filePath, countryService) {
        this.golfClubDAO = golfClubDAO;
        this.golfCourseDAO = golfCourseDAO;
        this.accessTokenDAO = accessTokenDAO;
        this.tournamentDAO = tournamentDAO;
        this.filePath = filePath;
        this.countryService = countryService;
    }
    mapGolfTees(objects) {
        let tees = [];
        for (let object of objects) {
            tees.push(this.mapGolfTee(object));
        }
        return tees;
    }
    mapGolfTee(object) {
        return {
            "name": object["Tee Name"],
            "gender": object["Tee Gender"],
            "courseRating": object["CR"],
            "slopeRating": object["Slope"],
            "par": object["Par"],
            "holes": this.mapGolfTeeHoles(object)
        };
    }
    mapGolfTeeHoles(object) {
        let keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
        let holes = [];
        for (let key of keys) {
            if (object[key]) {
                holes.push({
                    "hole": Number(key),
                    "par": object[key]
                });
            }
        }
        return holes;
    }
    mapGolfCourse(object) {
        if (object["Tee Gender"] && object["Tee Gender"] === "Male") {
            object["Tee Gender"] = gender_enum_1.Gender.Male;
        }
        if (object["Tee Gender"] && object["Tee Gender"] === "Female") {
            object["Tee Gender"] = gender_enum_1.Gender.Female;
        }
        if (object["Course Name"] == null) {
            return null;
        }
        return object;
    }
    ;
    transformData() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info("Starting data transform");
            const workbook = excel_file_reader_1.ExcelFileReader.readFile(this.filePath);
            const sheetNameList = workbook.SheetNames;
            logging_1.Logger.info("Finished reading workbook");
            logging_1.Logger.info(`Sheet names: ${sheetNameList}`);
            // Course Tee Data
            logging_1.Logger.info(`Starting map sheet to golf course tee data`);
            const courseTeeData = excel_file_reader_1.ExcelFileReader.sheetToObjectArray(workbook, sheetNameList[0], this.mapGolfCourse.bind(this), null, null);
            var courseTeeDataGroupedByCourseCode = _.groupBy(courseTeeData, function (courseData) {
                return courseData["Course ID"];
            });
            let courseTees = [];
            let courses = [];
            for (let courseCode of _.keys(courseTeeDataGroupedByCourseCode)) {
                let formattedCourseCode = courseCode.trim();
                // Look up course
                const filters = new filter_builder_1.FilterBuilder()
                    .addFilter("code", formattedCourseCode)
                    .buildAll();
                const golfCourse = yield this.golfCourseDAO.getByFilters(filters);
                if (golfCourse) {
                    let result = {
                        courseId: golfCourse._id,
                        tees: this.mapGolfTees(courseTeeDataGroupedByCourseCode[courseCode])
                    };
                    courseTees.push(result);
                    courses.push({
                        course: golfCourse._id,
                        numberOfHoles: 18,
                        group: {
                            size: 2,
                            maxGroups: 3
                        }
                    });
                }
                else {
                    logging_1.Logger.info("Couldnt find golf course by id/code: " + formattedCourseCode);
                }
            }
            logging_1.Logger.info(`Finished map sheet to golf course tee data, count: ${courseTees.length}`);
            let courseTeesObject = {
                courses: courseTees
            };
            logging_1.Logger.info(courseTeesObject);
            logging_1.Logger.info({
                courses: courses
            });
            const courseTeesJson = JSON.stringify(courseTeesObject, null, 2);
            const courseTeesDataFilePath = path.resolve(__dirname, "courseTees.json");
            /*
            fs.writeFile(courseTeesDataFilePath, courseTeesJson, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log(`Continents saved at: ${courseTeesDataFilePath}`);
            }); */
            logging_1.Logger.info("Finished data transform");
        });
    }
}
exports.DataTransformer = DataTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10cmFuc2Zvcm1lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2RhdGEtdHJhbnNmb3JtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsdUVBQWtFO0FBQ2xFLDZDQUF5QztBQUl6Qyw0QkFBNEI7QUFTNUIsc0VBQWtFO0FBQ2xFLHNEQUE4QztBQUU5Qyw2QkFBNkI7QUFFN0IsTUFBYSxlQUFlO0lBU3hCLFlBQW1CLFdBQTBCLEVBQUUsYUFBNEIsRUFBRSxjQUFnQyxFQUFFLGFBQThCLEVBQUUsUUFBZ0IsRUFBRSxjQUE4QjtRQUMzTCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sV0FBVyxDQUFDLE9BQVk7UUFDNUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxNQUFXO1FBQzFCLE9BQU87WUFDSCxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUM5QixjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QixhQUFhLEVBQUUsTUFBTSxDQUFD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QUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMxRTs7Ozs7O2tCQU1NO1lBRU4sZ0JBQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7Q0FDSjtBQTdJRCwwQ0E2SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEQU8gfSBmcm9tIFwiLi4vY29yZS9kYW8vZGFvLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YiB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWNsdWJcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZSB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWNvdXJzZVwiO1xyXG5pbXBvcnQgeyBFeGNlbEZpbGVSZWFkZXIgfSBmcm9tIFwiLi4vY29yZS9leGNlbC9leGNlbC1maWxlLXJlYWRlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCAqIGFzIHhsc3ggZnJvbSBcInhsc3hcIjtcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBDb3VudHJ5U2VydmljZSB9IGZyb20gXCIuLi9jb3JlL2NvdW50cnkvY291bnRyeS1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL3R5cGVzL2FjY2Vzcy10b2tlblwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IFRva2VuR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvcmUvYXV0aC90b2tlbi1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSBcIi4uL3R5cGVzL3RvdXJuYW1lbnRcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZURBTyB9IGZyb20gXCIuLi9kYW9zL2dvbGYtY291cnNlLmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgRmlsdGVyQnVpbGRlciB9IGZyb20gXCIuLi9jb3JlL2Rhby9maWx0ZXIvZmlsdGVyLWJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgR2VuZGVyIH0gZnJvbSBcIi4uL3R5cGVzL2dlbmRlci5lbnVtXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVRyYW5zZm9ybWVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdvbGZDbHViREFPOiBEQU88R29sZkNsdWI+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnb2xmQ291cnNlREFPOiBHb2xmQ291cnNlREFPO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY2Nlc3NUb2tlbkRBTzogREFPPEFjY2Vzc1Rva2VuPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG91cm5hbWVudERBTzogREFPPFRvdXJuYW1lbnQ+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb3VudHJ5U2VydmljZTogQ291bnRyeVNlcnZpY2U7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihnb2xmQ2x1YkRBTzogREFPPEdvbGZDbHViPiwgZ29sZkNvdXJzZURBTzogR29sZkNvdXJzZURBTywgYWNjZXNzVG9rZW5EQU86IERBTzxBY2Nlc3NUb2tlbj4sIHRvdXJuYW1lbnREQU86IERBTzxUb3VybmFtZW50PiwgZmlsZVBhdGg6IHN0cmluZywgY291bnRyeVNlcnZpY2U6IENvdW50cnlTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5nb2xmQ2x1YkRBTyA9IGdvbGZDbHViREFPO1xyXG4gICAgICAgIHRoaXMuZ29sZkNvdXJzZURBTyA9IGdvbGZDb3Vyc2VEQU87XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkRBTyA9IGFjY2Vzc1Rva2VuREFPO1xyXG4gICAgICAgIHRoaXMudG91cm5hbWVudERBTyA9IHRvdXJuYW1lbnREQU87XHJcbiAgICAgICAgdGhpcy5maWxlUGF0aCA9IGZpbGVQYXRoO1xyXG4gICAgICAgIHRoaXMuY291bnRyeVNlcnZpY2UgPSBjb3VudHJ5U2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hcEdvbGZUZWVzKG9iamVjdHM6IGFueSkge1xyXG4gICAgICAgIGxldCB0ZWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIG9iamVjdHMpIHtcclxuICAgICAgICAgICAgdGVlcy5wdXNoKHRoaXMubWFwR29sZlRlZShvYmplY3QpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hcEdvbGZUZWUob2JqZWN0OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogb2JqZWN0W1wiVGVlIE5hbWVcIl0sXHJcbiAgICAgICAgICAgIFwiZ2VuZGVyXCI6IG9iamVjdFtcIlRlZSBHZW5kZXJcIl0sXHJcbiAgICAgICAgICAgIFwiY291cnNlUmF0aW5nXCI6IG9iamVjdFtcIkNSXCJdLFxyXG4gICAgICAgICAgICBcInNsb3BlUmF0aW5nXCI6IG9iamVjdFtcIlNsb3BlXCJdLFxyXG4gICAgICAgICAgICBcInBhclwiOiBvYmplY3RbXCJQYXJcIl0sXHJcbiAgICAgICAgICAgIFwiaG9sZXNcIjogdGhpcy5tYXBHb2xmVGVlSG9sZXMob2JqZWN0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hcEdvbGZUZWVIb2xlcyhvYmplY3Q6IGFueSkge1xyXG4gICAgICAgIGxldCBrZXlzID0gW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCIsIFwiMTBcIiwgXCIxMVwiLCBcIjEyXCIsIFwiMTNcIiwgXCIxNFwiLCBcIjE1XCIsIFwiMTZcIiwgXCIxN1wiLCBcIjE4XCJdO1xyXG4gICAgICAgIGxldCBob2xlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0W2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGhvbGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaG9sZVwiOiBOdW1iZXIoa2V5KSxcclxuICAgICAgICAgICAgICAgICAgICBcInBhclwiOiBvYmplY3Rba2V5XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBob2xlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hcEdvbGZDb3Vyc2Uob2JqZWN0OiBhbnkpOiBhbnkge1xyXG5cclxuICAgICAgICBpZiAob2JqZWN0W1wiVGVlIEdlbmRlclwiXSAmJiBvYmplY3RbXCJUZWUgR2VuZGVyXCJdID09PSBcIk1hbGVcIikge1xyXG4gICAgICAgICAgICBvYmplY3RbXCJUZWUgR2VuZGVyXCJdID0gR2VuZGVyLk1hbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmplY3RbXCJUZWUgR2VuZGVyXCJdICYmIG9iamVjdFtcIlRlZSBHZW5kZXJcIl0gPT09IFwiRmVtYWxlXCIpIHtcclxuICAgICAgICAgICAgb2JqZWN0W1wiVGVlIEdlbmRlclwiXSA9IEdlbmRlci5GZW1hbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqZWN0W1wiQ291cnNlIE5hbWVcIl0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIGFzeW5jIHRyYW5zZm9ybURhdGEoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJTdGFydGluZyBkYXRhIHRyYW5zZm9ybVwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd29ya2Jvb2s6IHhsc3guV29ya0Jvb2sgPSBFeGNlbEZpbGVSZWFkZXIucmVhZEZpbGUodGhpcy5maWxlUGF0aCk7XHJcbiAgICAgICAgY29uc3Qgc2hlZXROYW1lTGlzdCA9IHdvcmtib29rLlNoZWV0TmFtZXM7XHJcblxyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiRmluaXNoZWQgcmVhZGluZyB3b3JrYm9va1wiKTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhgU2hlZXQgbmFtZXM6ICR7c2hlZXROYW1lTGlzdH1gKTtcclxuXHJcbiAgICAgICAgLy8gQ291cnNlIFRlZSBEYXRhXHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYFN0YXJ0aW5nIG1hcCBzaGVldCB0byBnb2xmIGNvdXJzZSB0ZWUgZGF0YWApO1xyXG4gICAgICAgIGNvbnN0IGNvdXJzZVRlZURhdGEgPSBFeGNlbEZpbGVSZWFkZXIuc2hlZXRUb09iamVjdEFycmF5PGFueT4od29ya2Jvb2ssIHNoZWV0TmFtZUxpc3RbMF0sIHRoaXMubWFwR29sZkNvdXJzZS5iaW5kKHRoaXMpLCBudWxsLCBudWxsKTtcclxuXHJcbiAgICAgICAgdmFyIGNvdXJzZVRlZURhdGFHcm91cGVkQnlDb3Vyc2VDb2RlID0gXy5ncm91cEJ5KGNvdXJzZVRlZURhdGEsIGZ1bmN0aW9uIChjb3Vyc2VEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3Vyc2VEYXRhW1wiQ291cnNlIElEXCJdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgY291cnNlVGVlcyA9IFtdO1xyXG4gICAgICAgIGxldCBjb3Vyc2VzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNvdXJzZUNvZGUgb2YgXy5rZXlzKGNvdXJzZVRlZURhdGFHcm91cGVkQnlDb3Vyc2VDb2RlKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm1hdHRlZENvdXJzZUNvZGUgPSBjb3Vyc2VDb2RlLnRyaW0oKTtcclxuICAgICAgICAgICAgLy8gTG9vayB1cCBjb3Vyc2VcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVycyA9IG5ldyBGaWx0ZXJCdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWx0ZXIoXCJjb2RlXCIsIGZvcm1hdHRlZENvdXJzZUNvZGUpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGRBbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdvbGZDb3Vyc2UgPSBhd2FpdCB0aGlzLmdvbGZDb3Vyc2VEQU8uZ2V0QnlGaWx0ZXJzKGZpbHRlcnMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdvbGZDb3Vyc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSWQ6IGdvbGZDb3Vyc2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlZXM6IHRoaXMubWFwR29sZlRlZXMoY291cnNlVGVlRGF0YUdyb3VwZWRCeUNvdXJzZUNvZGVbY291cnNlQ29kZV0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY291cnNlVGVlcy5wdXNoKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY291cnNlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGdvbGZDb3Vyc2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mSG9sZXM6IDE4LFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEdyb3VwczogM1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhcIkNvdWxkbnQgZmluZCBnb2xmIGNvdXJzZSBieSBpZC9jb2RlOiBcIiArIGZvcm1hdHRlZENvdXJzZUNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIExvZ2dlci5pbmZvKGBGaW5pc2hlZCBtYXAgc2hlZXQgdG8gZ29sZiBjb3Vyc2UgdGVlIGRhdGEsIGNvdW50OiAke2NvdXJzZVRlZXMubGVuZ3RofWApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb3Vyc2VUZWVzT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBjb3Vyc2VzOiBjb3Vyc2VUZWVzXHJcbiAgICAgICAgfTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhjb3Vyc2VUZWVzT2JqZWN0KTtcclxuICAgICAgICBMb2dnZXIuaW5mbyh7XHJcbiAgICAgICAgICAgIGNvdXJzZXM6IGNvdXJzZXNcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjb3Vyc2VUZWVzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGNvdXJzZVRlZXNPYmplY3QsIG51bGwsIDIpO1xyXG4gICAgICAgIGNvbnN0IGNvdXJzZVRlZXNEYXRhRmlsZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImNvdXJzZVRlZXMuanNvblwiKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZzLndyaXRlRmlsZShjb3Vyc2VUZWVzRGF0YUZpbGVQYXRoLCBjb3Vyc2VUZWVzSnNvbiwgJ3V0ZjgnLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb250aW5lbnRzIHNhdmVkIGF0OiAke2NvdXJzZVRlZXNEYXRhRmlsZVBhdGh9YCk7XHJcbiAgICAgICAgfSk7ICovXHJcblxyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiRmluaXNoZWQgZGF0YSB0cmFuc2Zvcm1cIik7XHJcbiAgICB9XHJcbn1cclxuIl19