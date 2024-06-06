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
exports.DataImporter = void 0;
const golf_club_1 = require("../types/golf-club");
const golf_course_1 = require("../types/golf-course");
const excel_file_reader_1 = require("../core/excel/excel-file-reader");
const logging_1 = require("../core/logging");
const crypto = require("crypto");
const _ = require("lodash");
const golf_division_enum_1 = require("../types/golf-division.enum");
const token_generator_1 = require("../core/auth/token-generator");
const config_1 = require("../config");
const moment = require("moment");
const golf_club_model_1 = require("../models/golf-club.model");
const golf_course_model_1 = require("../models/golf-course.model");
const mongodb_1 = require("mongodb");
class DataImporter {
    constructor(golfClubDAO, golfCourseDAO, accessTokenDAO, tournamentDAO, filePath, countryService, filePathNew) {
        this.codeSuffix = 0;
        this.golfClubDAO = golfClubDAO;
        this.golfCourseDAO = golfCourseDAO;
        this.accessTokenDAO = accessTokenDAO;
        this.tournamentDAO = tournamentDAO;
        this.filePath = filePath;
        this.countryService = countryService;
        this.filePathNew = filePathNew;
    }
    // Mongoose casts 24 hex char strings to ObjectIds for you automatically based on your schema.
    // Any 12 character string is a valid ObjectId, because the only defining feature of ObjectIds is that they have 12 bytes.
    hashIdTo12Characters(id) {
        const hash = crypto.createHash('sha256');
        hash.update(id);
        return hash.digest('hex').substring(0, 24);
    }
    mapGolfClub(object) {
        let country = this.countryService.getCountryByName(object.country);
        if (!country) {
            logging_1.Logger.info("Couldnt find country by name for: " + object.country);
            logging_1.Logger.info("Trying with state as country: " + object.state);
            country = this.countryService.getCountryByName(object.state);
            if (!country) {
                logging_1.Logger.info("Couldnt find country by name for: " + object.state);
                logging_1.Logger.debug(object);
                throw new Error("Failed to find country");
            }
            logging_1.Logger.info("Found country by name with state as country: " + object.state);
        }
        const newGolfClub = new golf_club_1.GolfClub();
        newGolfClub._id = this.hashIdTo12Characters(object.club_id);
        newGolfClub.code = object.club_id;
        newGolfClub.name = object.club_name;
        newGolfClub.membership = object.club_membership;
        newGolfClub.numberOfHoles = object.number_of_holes;
        newGolfClub.countryCode = country.getCode();
        newGolfClub.phone = object.phone;
        newGolfClub.email = object.email_address;
        newGolfClub.website = object.website;
        newGolfClub.contactName = object.contact_name;
        return newGolfClub;
    }
    ;
    mapGolfClubNew(object) {
        return object;
    }
    ;
    mapGolfCourse(object) {
        const newGolfCourse = new golf_course_1.GolfCourse();
        newGolfCourse._id = this.hashIdTo12Characters(object.course_id);
        newGolfCourse.code = object.course_id;
        newGolfCourse.clubId = this.hashIdTo12Characters(object.club_id);
        newGolfCourse.name = object.course_name;
        newGolfCourse.numberOfHoles = object.holes;
        newGolfCourse.par = object.par !== "N/D" ? object.par : null;
        newGolfCourse.type = object.course_type;
        return newGolfCourse;
    }
    ;
    generateAccessTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const numCelebrityTokens = 1000;
            const numProfessionalGolferTokens = 1000;
            const CelebrityAccessTokens = yield this.generateAccessTokensForType(numCelebrityTokens, golf_division_enum_1.GolfDivision.Celebrity);
            const professionalGolferAccessTokens = yield this.generateAccessTokensForType(numProfessionalGolferTokens, golf_division_enum_1.GolfDivision.ProfessionalGolfer);
            return _.concat(CelebrityAccessTokens, professionalGolferAccessTokens);
        });
    }
    generateTournament() {
        return {
            name: "Opener",
            regStartDate: moment.utc('2020-05-01').toDate(),
            regEndDate: moment.utc('2020-06-05').toDate(),
            startDate: moment.utc('2020-06-06').toDate(),
            endDate: moment.utc('2020-06-08').toDate(),
            maxPlayers: -1,
            divisions: [golf_division_enum_1.GolfDivision.Celebrity, golf_division_enum_1.GolfDivision.ProfessionalGolfer],
            courses: [
                {
                    course: {
                        _id: "0003eb37db46afa3cd512de8"
                    },
                    numberOfHoles: 18,
                    group: {
                        size: 2,
                        maxGroups: 3
                    }
                },
                {
                    course: {
                        _id: "0006c6e292988af7727802d8"
                    },
                    numberOfHoles: 18,
                    group: {
                        size: 2,
                        maxGroups: 3
                    }
                }
            ]
        };
    }
    generateAccessTokensForType(numberOfTokens, golfDivision) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokens = [];
            for (var i = 0; i < numberOfTokens; i++) {
                let token = yield token_generator_1.TokenGenerator.generateToken(Number(config_1.default.accessTokenLength));
                accessTokens.push({
                    token: token,
                    golfDivision: golfDivision
                });
            }
            return accessTokens;
        });
    }
    getExcelAsJson() {
        logging_1.Logger.info("Starting reading excel");
        logging_1.Logger.info("filePathNew>>>>>", this.filePathNew);
        if (this.filePathNew) {
            this.filePathNew = '/home/mike-pg-staging/pleace-golf-api/assets/msscorecard.xlsx';
        }
        const workbook = excel_file_reader_1.ExcelFileReader.readFile(this.filePathNew);
        logging_1.Logger.info("Starting mapping in json");
        const clubData = excel_file_reader_1.ExcelFileReader.sheetToObjectArray(workbook, "Sheet1", this.mapGolfClubNew.bind(this), null, null);
        logging_1.Logger.info("End reading excel");
        return clubData;
    }
    importData() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.info("Starting data import");
            const workbook = excel_file_reader_1.ExcelFileReader.readFile(this.filePath);
            const sheetNameList = workbook.SheetNames;
            logging_1.Logger.info("Finished reading workbook");
            logging_1.Logger.info(`Sheet names: ${sheetNameList}`);
            // Tournament Data
            const tournamentData = this.generateTournament();
            logging_1.Logger.info("Starting create tournament data");
            try {
                yield this.tournamentDAO.create(tournamentData);
            }
            catch (error) {
                throw new Error(error.message);
            }
            logging_1.Logger.info("Finished create tournament data");
            // Club Data
            logging_1.Logger.info(`Starting map sheet to golf club data`);
            const clubData = excel_file_reader_1.ExcelFileReader.sheetToObjectArray(workbook, "Golf Clubs", this.mapGolfClub.bind(this), null, null);
            logging_1.Logger.info(`Finished map sheet to golf club data, count: ${clubData.length}`);
            logging_1.Logger.info("Starting bulk create golf club data");
            try {
                yield this.golfClubDAO.createMany(clubData);
            }
            catch (error) {
                throw new Error(error.message);
            }
            logging_1.Logger.info("Finished bulk create golf club data");
            // Course Data
            logging_1.Logger.info(`Starting map sheet to golf course data`);
            const courseData = excel_file_reader_1.ExcelFileReader.sheetToObjectArray(workbook, "Golf Courses", this.mapGolfCourse.bind(this), null, null);
            logging_1.Logger.info(`Finished map sheet to golf course data, count: ${courseData.length}`);
            logging_1.Logger.info("Starting bulk create golf course data");
            try {
                yield this.golfCourseDAO.createMany(courseData);
            }
            catch (error) {
                throw new Error(error.message);
            }
            logging_1.Logger.info("Finished bulk create golf course data");
            // Access Token Data
            logging_1.Logger.info(`Starting access token generation`);
            const accessTokenData = yield this.generateAccessTokens();
            logging_1.Logger.info(`Finished access token generation, count: ${accessTokenData.length}`);
            logging_1.Logger.info("Starting bulk create access token data");
            try {
                yield this.accessTokenDAO.createMany(accessTokenData);
            }
            catch (error) {
                throw new Error(error.message);
            }
            logging_1.Logger.info("Finished bulk create access token data");
            logging_1.Logger.info("Finished data import");
        });
    }
    addCourseTees(teesRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.golfCourseDAO.addGolfCourseTees(teesRequest);
        });
    }
    importClubData() {
        return __awaiter(this, void 0, void 0, function* () {
            let oldName = '';
            let oldCountry = '';
            let teeArr = [];
            let updatedCourse = [];
            let notFountCnt = 0;
            let fountCnt = 0;
            let golfclubs = this.getExcelAsJson();
            for (let i = 0; i < (golfclubs === null || golfclubs === void 0 ? void 0 : golfclubs.length); i++) {
                this.codeSuffix++;
                let golfClub = golfclubs[i];
                let holesData = this.getHoles(golfClub);
                const clubName = golfClub.course_name.trim();
                console.log('count::', i);
                if (i == 0) {
                    oldName = clubName;
                    oldCountry = golfClub.state_country;
                }
                if (oldName !== clubName) {
                    let countryCode = this.getCountryCode(oldCountry);
                    if (!countryCode) {
                        countryCode = 'US';
                    }
                    console.log('clubName::', oldName);
                    console.log('countryCode::', countryCode);
                    //console.log('countryCode :',countryCode);
                    let clubIds = [];
                    let clubs = yield this.getClubIds(oldName, countryCode);
                    if ((clubs === null || clubs === void 0 ? void 0 : clubs.length) === 0) {
                        // console.log('not found')
                        this.addGolfClubCourse(oldName, oldCountry, teeArr, holesData.numberOfHoles, countryCode);
                        notFountCnt++;
                    }
                    else {
                        if (teeArr.length > 0) {
                            clubs.forEach(element => {
                                clubIds.push((0, mongodb_1.ObjectId)(element._id));
                                this.updateGolfClub(element._id, oldCountry);
                            });
                            yield golf_course_model_1.GolfCourseSchema.find({
                                clubId: { $in: clubIds }
                            }, { _id: 1, tees: 1 }).exec().then(courses => {
                                var _a;
                                for (let j = 0; j < courses.length; j++) {
                                    let cour = courses[j];
                                    if (((_a = cour.tees) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                                        updatedCourse.push(cour._id);
                                        let course = {
                                            courseId: cour._id,
                                            tees: teeArr
                                        };
                                        this.addCourseTees(course);
                                    }
                                }
                            });
                            fountCnt++;
                        }
                    }
                    //console.log('clubIds',clubIds);
                    oldName = clubName;
                    oldCountry = golfClub.state_country;
                    teeArr = [];
                    // break;
                }
                if (golfClub.Par != 0 && golfClub.tee_name) {
                    teeArr.push({
                        name: golfClub.tee_name.trim().replace(/[^a-zA-Z0-9 ]/g, ""),
                        gender: golfClub.tee_gender.trim(),
                        courseRating: golfClub.rating == '-' || golfClub.rating == '' || !golfClub.rating ? 72.0 : golfClub.rating,
                        slopeRating: golfClub.slope == '-' || golfClub.slope == '' || !golfClub.slope ? 113 : golfClub.slope,
                        par: golfClub.Par,
                        holes: holesData.holes,
                    });
                }
            }
            //console.log('updatedCourse::',updatedCourse);
            console.log('fountCnt::', fountCnt);
            console.log('notFountCnt::', notFountCnt);
        });
    }
    importClubDataOld() {
        return __awaiter(this, void 0, void 0, function* () {
            /*  let oldName = '';
             let oldCountry = '';
             let teeArr = [];
             let updatedCourse = [];
             let notFountCnt = 0;
             let fountCnt = 0;
             for(let i =0; i < golfclubs?.length ; i++) {
                 this.codeSuffix++;
                 let golfClub = golfclubs[i];
                 let holesData = this.getHoles(golfClub);
                 const clubName = golfClub.course_name.trim();
                 //console.log('clubName',clubName);
                 if(i==0){
                     oldName = clubName;
                     oldCountry = golfClub.state_country;
                 }
                 
                 if(oldName !== clubName) {
                     let countryCode = this.getCountryCode(oldCountry);
                     if(!countryCode) {
                         countryCode = 'US';
                     }
                     console.log('clubName::',oldName);
                     console.log('countryCode::',countryCode);
                     //console.log('countryCode :',countryCode);
                     let clubIds = [];
                     let clubs:any = await this.getClubIds(oldName,countryCode);
                 
                     
                     if(clubs?.length === 0) {
                         this.addGolfClubCourse(oldName,oldCountry,teeArr,holesData.numberOfHoles);
                         notFountCnt++;
                     } else {
                         clubs.forEach(element => {
                             clubIds.push(ObjectId(element._id));
                         });
                         await GolfCourseSchema.find({
                             clubId : { $in : clubIds}
                         },{_id:1,tees:1}).exec().then(courses => {
                             for(let j=0;j < courses.length; j++) {
                                 let cour = courses[j];
                                 if(cour.tees?.length === 0) {
                                     updatedCourse.push(cour._id);
                                     let course = {
                                         courseId : cour._id,
                                         tees : teeArr
                                     }
                                     this.addCourseTees(course);
                                 }
                             }
                         });
                         fountCnt++;
                     }
                     //console.log('clubIds',clubIds);
                    
                     
                     oldName = clubName;
                     oldCountry = golfClub.state_country;
                     teeArr = [];
                 }
                 teeArr.push(
                     {
                         name:golfClub.tee_name.trim(),
                         gender:golfClub.tee_gender.trim(),
                         courseRating:golfClub.rating,
                         slopeRating:golfClub.slope,
                         par:golfClub.Par,
                         holes:holesData.holes,
                     }
                     );
             }
             //console.log('updatedCourse::',updatedCourse);
             console.log('fountCnt::',fountCnt);
             console.log('notFountCnt::',notFountCnt);
             */
        });
    }
    getStateCity(oldCountry) {
        var _a, _b, _c;
        let str = oldCountry.split(',');
        let stateCode = '';
        let city = '';
        if (str.length > 2) {
            stateCode = (_a = str[str.length - 2]) === null || _a === void 0 ? void 0 : _a.trim();
            city = (_b = str[str.length - 3]) === null || _b === void 0 ? void 0 : _b.trim();
        }
        if (str.length == 2) {
            city = (_c = str[str.length - 2]) === null || _c === void 0 ? void 0 : _c.trim();
        }
        stateCode = stateCode ? stateCode : '';
        city = city ? city : '';
        return { city: city, state: stateCode };
    }
    addGolfClubCourse(oldName, oldCountry, teeArr, numberOfHoles, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            /* let str = oldCountry.split(',')[1];
            let strArr = str.trim().split('~~'); */
            let stateCity = this.getStateCity(oldCountry);
            console.log('stateCity', stateCity);
            const code = countryCode + '-' + stateCity.state.toUpperCase() + '-000000' + this.codeSuffix;
            const golfClubData = {
                _id: this.hashIdTo12Characters(code),
                code: code,
                name: oldName,
                membership: 'Public',
                numberOfHoles: numberOfHoles,
                countryCode: countryCode,
                phone: 'N/D',
                email: 'N/D',
                website: 'N/D',
                contactName: 'N/D',
                state: stateCity.state.toUpperCase(),
                city: stateCity.city
            };
            let savedClubDb = yield golf_club_model_1.GolfClubSchema.create(golfClubData);
            const clubId = savedClubDb._id;
            const courseCode = code + '-0000001';
            console.log('new ClubId', clubId);
            const courseBody = {
                _id: this.hashIdTo12Characters(courseCode),
                code: courseCode,
                clubId: (0, mongodb_1.ObjectId)(clubId),
                name: oldName,
                numberOfHoles: numberOfHoles,
                par: 72,
                type: 'Parkland',
                tees: teeArr
            };
            yield golf_course_model_1.GolfCourseSchema.create(courseBody);
        });
    }
    updateGolfClub(clubId, old_country) {
        return __awaiter(this, void 0, void 0, function* () {
            let stateCity = this.getStateCity(old_country);
            yield golf_club_model_1.GolfClubSchema.findOneAndUpdate({
                _id: clubId,
            }, {
                $set: {
                    state: stateCity.state,
                    city: stateCity.city
                }
            }, {
                new: true
            }).exec();
        });
    }
    getCountryCode(state_country) {
        let strArr = state_country.split(',');
        let str1 = strArr[strArr.length - 1].trim();
        if (str1 === "USA") {
            return "US";
        }
        if (str1 === "UK") {
            return "GB-ENG";
        }
        let code = this.countryService.getCountryCodeByName(str1);
        return code;
    }
    getCountryCodeOld(state_country) {
        let str = state_country.split(',')[1];
        return str.trim().split('~~')[1];
    }
    getClubIds(clubName, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp("^" + clubName.toLowerCase() + "$", "i");
            let clubInDb = golf_club_model_1.GolfClubSchema.find({
                name: regex, countryCode: countryCode
            }, { _id: 1, code: 1, name: 1 }).exec();
            /* let clubInDb = GolfClubSchema.find({
                name: {$regex: clubName, $options: "i"},countryCode:countryCode
            },{_id:1,code:1,name:1}).exec(); */
            return Promise.resolve(clubInDb);
        });
    }
    getHoles(golfClub) {
        let holes = [];
        let numberOfHoles = 9;
        holes.push({
            hole: 1,
            par: golfClub['#1'] ? golfClub['#1'] : 0
        });
        holes.push({
            hole: 2,
            par: golfClub['#2'] ? golfClub['#2'] : 0
        });
        holes.push({
            hole: 3,
            par: golfClub['#3'] ? golfClub['#3'] : 0
        });
        holes.push({
            hole: 4,
            par: golfClub['#4'] ? golfClub['#4'] : 0
        });
        holes.push({
            hole: 5,
            par: golfClub['#5'] ? golfClub['#5'] : 0
        });
        holes.push({
            hole: 6,
            par: golfClub['#6'] ? golfClub['#6'] : 0
        });
        holes.push({
            hole: 7,
            par: golfClub['#7'] ? golfClub['#7'] : 0
        });
        holes.push({
            hole: 8,
            par: golfClub['#8'] ? golfClub['#8'] : 0
        });
        holes.push({
            hole: 9,
            par: golfClub['#9'] ? golfClub['#9'] : 0
        });
        if (golfClub['#10']) {
            numberOfHoles = 18;
            holes.push({
                hole: 10,
                par: golfClub['#10'] ? golfClub['#10'] : 0
            });
            holes.push({
                hole: 11,
                par: golfClub['#11'] ? golfClub['#11'] : 0
            });
            holes.push({
                hole: 12,
                par: golfClub['#12'] ? golfClub['#12'] : 0
            });
            holes.push({
                hole: 13,
                par: golfClub['#13'] ? golfClub['#13'] : 0
            });
            holes.push({
                hole: 14,
                par: golfClub['#14'] ? golfClub['#14'] : 0
            });
            holes.push({
                hole: 15,
                par: golfClub['#15'] ? golfClub['#15'] : 0
            });
            holes.push({
                hole: 16,
                par: golfClub['#16'] ? golfClub['#16'] : 0
            });
            holes.push({
                hole: 17,
                par: golfClub['#17'] ? golfClub['#17'] : 0
            });
            holes.push({
                hole: 18,
                par: golfClub['#18'] ? golfClub['#18'] : 0
            });
        }
        return { holes: holes, numberOfHoles: numberOfHoles };
    }
}
exports.DataImporter = DataImporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1pbXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2RhdGEtaW1wb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQThDO0FBQzlDLHNEQUFrRDtBQUNsRCx1RUFBa0U7QUFDbEUsNkNBQXlDO0FBR3pDLGlDQUFpQztBQUNqQyw0QkFBNEI7QUFHNUIsb0VBQTJEO0FBQzNELGtFQUE4RDtBQUM5RCxzQ0FBK0I7QUFHL0IsaUNBQWlDO0FBRWpDLCtEQUEyRDtBQUMzRCxtRUFBK0Q7QUFDL0QscUNBQW1DO0FBRW5DLE1BQWEsWUFBWTtJQVVyQixZQUFtQixXQUEwQixFQUFFLGFBQTRCLEVBQUUsY0FBZ0MsRUFBRSxhQUE4QixFQUFFLFFBQWdCLEVBQUUsY0FBOEIsRUFBQyxXQUFtQjtRQURuTixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRVgsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVELDhGQUE4RjtJQUM5RiwwSEFBMEg7SUFDbEgsb0JBQW9CLENBQUMsRUFBVTtRQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFD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LENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDUCxJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ1AsSUFBSSxFQUFDLENBQUM7WUFDTixHQUFHLEVBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNQLElBQUksRUFBQyxDQUFDO1lBQ04sR0FBRyxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDUCxJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ1AsSUFBSSxFQUFDLENBQUM7WUFDTixHQUFHLEVBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNQLElBQUksRUFBQyxDQUFDO1lBQ04sR0FBRyxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDUCxJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7UUFDSCxJQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUMsRUFBRTtnQkFDUCxHQUFHLEVBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUEvaUJELG9DQStpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEQU8gfSBmcm9tIFwiLi4vY29yZS9kYW8vZGFvLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBHb2xmQ2x1YiB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWNsdWJcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZSB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWNvdXJzZVwiO1xyXG5pbXBvcnQgeyBFeGNlbEZpbGVSZWFkZXIgfSBmcm9tIFwiLi4vY29yZS9leGNlbC9leGNlbC1maWxlLXJlYWRlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCAqIGFzIHhsc3ggZnJvbSBcInhsc3hcIjtcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBDb3VudHJ5U2VydmljZSB9IGZyb20gXCIuLi9jb3JlL2NvdW50cnkvY291bnRyeS1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL3R5cGVzL2FjY2Vzcy10b2tlblwiO1xyXG5pbXBvcnQgeyBHb2xmRGl2aXNpb24gfSBmcm9tIFwiLi4vdHlwZXMvZ29sZi1kaXZpc2lvbi5lbnVtXCI7XHJcbmltcG9ydCB7IFRva2VuR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2NvcmUvYXV0aC90b2tlbi1nZW5lcmF0b3JcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG4vL2ltcG9ydCAqIGFzIGdvbGZjbHVicyBmcm9tIFwiLi4vLi4vZ29sZl9jbHViX2pzb24uanNvblwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50IH0gZnJvbSBcIi4uL3R5cGVzL3RvdXJuYW1lbnRcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgR29sZkNvdXJzZURBTyB9IGZyb20gXCIuLi9kYW9zL2dvbGYtY291cnNlLmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgR29sZkNsdWJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzL2dvbGYtY2x1Yi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHb2xmQ291cnNlU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVscy9nb2xmLWNvdXJzZS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUltcG9ydGVyIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdvbGZDbHViREFPOiBEQU88R29sZkNsdWI+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnb2xmQ291cnNlREFPOiBHb2xmQ291cnNlREFPO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY2Nlc3NUb2tlbkRBTzogREFPPEFjY2Vzc1Rva2VuPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG91cm5hbWVudERBTzogREFPPFRvdXJuYW1lbnQ+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBmaWxlUGF0aE5ldzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb3VudHJ5U2VydmljZTogQ291bnRyeVNlcnZpY2U7XHJcbiAgICBjb2RlU3VmZml4ID0gMDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihnb2xmQ2x1YkRBTzogREFPPEdvbGZDbHViPiwgZ29sZkNvdXJzZURBTzogR29sZkNvdXJzZURBTywgYWNjZXNzVG9rZW5EQU86IERBTzxBY2Nlc3NUb2tlbj4sIHRvdXJuYW1lbnREQU86IERBTzxUb3VybmFtZW50PiwgZmlsZVBhdGg6IHN0cmluZywgY291bnRyeVNlcnZpY2U6IENvdW50cnlTZXJ2aWNlLGZpbGVQYXRoTmV3OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmdvbGZDbHViREFPID0gZ29sZkNsdWJEQU87XHJcbiAgICAgICAgdGhpcy5nb2xmQ291cnNlREFPID0gZ29sZkNvdXJzZURBTztcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuREFPID0gYWNjZXNzVG9rZW5EQU87XHJcbiAgICAgICAgdGhpcy50b3VybmFtZW50REFPID0gdG91cm5hbWVudERBTztcclxuICAgICAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgdGhpcy5jb3VudHJ5U2VydmljZSA9IGNvdW50cnlTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuZmlsZVBhdGhOZXcgPSBmaWxlUGF0aE5ldztcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb25nb29zZSBjYXN0cyAyNCBoZXggY2hhciBzdHJpbmdzIHRvIE9iamVjdElkcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgYmFzZWQgb24geW91ciBzY2hlbWEuXHJcbiAgICAvLyBBbnkgMTIgY2hhcmFjdGVyIHN0cmluZyBpcyBhIHZhbGlkIE9iamVjdElkLCBiZWNhdXNlIHRoZSBvbmx5IGRlZmluaW5nIGZlYXR1cmUgb2YgT2JqZWN0SWRzIGlzIHRoYXQgdGhleSBoYXZlIDEyIGJ5dGVzLlxyXG4gICAgcHJpdmF0ZSBoYXNoSWRUbzEyQ2hhcmFjdGVycyhpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpO1xyXG4gICAgICAgIGhhc2gudXBkYXRlKGlkKTtcclxuICAgICAgICByZXR1cm4gaGFzaC5kaWdlc3QoJ2hleCcpLnN1YnN0cmluZygwLCAyNCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtYXBHb2xmQ2x1YihvYmplY3Q6IGFueSk6IEdvbGZDbHViIHtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50cnkgPSB0aGlzLmNvdW50cnlTZXJ2aWNlLmdldENvdW50cnlCeU5hbWUob2JqZWN0LmNvdW50cnkpO1xyXG5cclxuICAgICAgICBpZiAoIWNvdW50cnkpIHsgXHJcbiAgICAgICAgICAgIExvZ2dlci5pbmZvKFwiQ291bGRudCBmaW5kIGNvdW50cnkgYnkgbmFtZSBmb3I6IFwiICsgb2JqZWN0LmNvdW50cnkpO1xyXG4gICAgICAgICAgICBMb2dnZXIuaW5mbyhcIlRyeWluZyB3aXRoIHN0YXRlIGFzIGNvdW50cnk6IFwiICsgb2JqZWN0LnN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIGNvdW50cnkgPSB0aGlzLmNvdW50cnlTZXJ2aWNlLmdldENvdW50cnlCeU5hbWUob2JqZWN0LnN0YXRlKTtcclxuICAgICAgICAgICAgaWYgKCFjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhcIkNvdWxkbnQgZmluZCBjb3VudHJ5IGJ5IG5hbWUgZm9yOiBcIiArIG9iamVjdC5zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcob2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGNvdW50cnlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmluZm8oXCJGb3VuZCBjb3VudHJ5IGJ5IG5hbWUgd2l0aCBzdGF0ZSBhcyBjb3VudHJ5OiBcIiArIG9iamVjdC5zdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG5ld0dvbGZDbHViOiBHb2xmQ2x1YiA9IG5ldyBHb2xmQ2x1YigpO1xyXG4gICAgICAgIG5ld0dvbGZDbHViLl9pZCA9IHRoaXMuaGFzaElkVG8xMkNoYXJhY3RlcnMob2JqZWN0LmNsdWJfaWQpO1xyXG4gICAgICAgIG5ld0dvbGZDbHViLmNvZGUgPSBvYmplY3QuY2x1Yl9pZDtcclxuICAgICAgICBuZXdHb2xmQ2x1Yi5uYW1lID0gb2JqZWN0LmNsdWJfbmFtZTtcclxuICAgICAgICBuZXdHb2xmQ2x1Yi5tZW1iZXJzaGlwID0gb2JqZWN0LmNsdWJfbWVtYmVyc2hpcDtcclxuICAgICAgICBuZXdHb2xmQ2x1Yi5udW1iZXJPZkhvbGVzID0gb2JqZWN0Lm51bWJlcl9vZl9ob2xlcztcclxuICAgICAgICBuZXdHb2xmQ2x1Yi5jb3VudHJ5Q29kZSA9IGNvdW50cnkuZ2V0Q29kZSgpO1xyXG4gICAgICAgIG5ld0dvbGZDbHViLnBob25lID0gb2JqZWN0LnBob25lO1xyXG4gICAgICAgIG5ld0dvbGZDbHViLmVtYWlsID0gb2JqZWN0LmVtYWlsX2FkZHJlc3M7XHJcbiAgICAgICAgbmV3R29sZkNsdWIud2Vic2l0ZSA9IG9iamVjdC53ZWJzaXRlO1xyXG4gICAgICAgIG5ld0dvbGZDbHViLmNvbnRhY3ROYW1lID0gb2JqZWN0LmNvbnRhY3RfbmFtZTtcclxuICAgICAgICByZXR1cm4gbmV3R29sZkNsdWI7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbWFwR29sZkNsdWJOZXcob2JqZWN0OiBhbnkpOiBHb2xmQ2x1YiB7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1hcEdvbGZDb3Vyc2Uob2JqZWN0OiBhbnkpOiBHb2xmQ291cnNlIHtcclxuICAgICAgICBjb25zdCBuZXdHb2xmQ291cnNlOiBHb2xmQ291cnNlID0gbmV3IEdvbGZDb3Vyc2UoKTtcclxuICAgICAgICBuZXdHb2xmQ291cnNlLl9pZCA9IHRoaXMuaGFzaElkVG8xMkNoYXJhY3RlcnMob2JqZWN0LmNvdXJzZV9pZCk7XHJcbiAgICAgICAgbmV3R29sZkNvdXJzZS5jb2RlID0gb2JqZWN0LmNvdXJzZV9pZDtcclxuICAgICAgICBuZXdHb2xmQ291cnNlLmNsdWJJZCA9IHRoaXMuaGFzaElkVG8xMkNoYXJhY3RlcnMob2JqZWN0LmNsdWJfaWQpO1xyXG4gICAgICAgIG5ld0dvbGZDb3Vyc2UubmFtZSA9IG9iamVjdC5jb3Vyc2VfbmFtZTtcclxuICAgICAgICBuZXdHb2xmQ291cnNlLm51bWJlck9mSG9sZXMgPSBvYmplY3QuaG9sZXM7XHJcbiAgICAgICAgbmV3R29sZkNvdXJzZS5wYXIgPSBvYmplY3QucGFyICE9PSBcIk4vRFwiID8gb2JqZWN0LnBhciA6IG51bGw7XHJcbiAgICAgICAgbmV3R29sZkNvdXJzZS50eXBlID0gb2JqZWN0LmNvdXJzZV90eXBlO1xyXG4gICAgICAgIHJldHVybiBuZXdHb2xmQ291cnNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdlbmVyYXRlQWNjZXNzVG9rZW5zKCk6IFByb21pc2U8QWNjZXNzVG9rZW5bXT4ge1xyXG4gICAgICAgIGNvbnN0IG51bUNlbGVicml0eVRva2VucyA9IDEwMDA7XHJcbiAgICAgICAgY29uc3QgbnVtUHJvZmVzc2lvbmFsR29sZmVyVG9rZW5zID0gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgQ2VsZWJyaXR5QWNjZXNzVG9rZW5zID0gYXdhaXQgdGhpcy5nZW5lcmF0ZUFjY2Vzc1Rva2Vuc0ZvclR5cGUobnVtQ2VsZWJyaXR5VG9rZW5zLCBHb2xmRGl2aXNpb24uQ2VsZWJyaXR5KTtcclxuICAgICAgICBjb25zdCBwcm9mZXNzaW9uYWxHb2xmZXJBY2Nlc3NUb2tlbnMgPSBhd2FpdCB0aGlzLmdlbmVyYXRlQWNjZXNzVG9rZW5zRm9yVHlwZShudW1Qcm9mZXNzaW9uYWxHb2xmZXJUb2tlbnMsIEdvbGZEaXZpc2lvbi5Qcm9mZXNzaW9uYWxHb2xmZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gXy5jb25jYXQoQ2VsZWJyaXR5QWNjZXNzVG9rZW5zLCBwcm9mZXNzaW9uYWxHb2xmZXJBY2Nlc3NUb2tlbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVUb3VybmFtZW50KCk6IFRvdXJuYW1lbnQge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBcIk9wZW5lclwiLFxyXG4gICAgICAgICAgICByZWdTdGFydERhdGU6IG1vbWVudC51dGMoJzIwMjAtMDUtMDEnKS50b0RhdGUoKSxcclxuICAgICAgICAgICAgcmVnRW5kRGF0ZTogbW9tZW50LnV0YygnMjAyMC0wNi0wNScpLnRvRGF0ZSgpLFxyXG4gICAgICAgICAgICBzdGFydERhdGU6IG1vbWVudC51dGMoJzIwMjAtMDYtMDYnKS50b0RhdGUoKSxcclxuICAgICAgICAgICAgZW5kRGF0ZTogbW9tZW50LnV0YygnMjAyMC0wNi0wOCcpLnRvRGF0ZSgpLFxyXG4gICAgICAgICAgICBtYXhQbGF5ZXJzOiAtMSxcclxuICAgICAgICAgICAgZGl2aXNpb25zOiBbR29sZkRpdmlzaW9uLkNlbGVicml0eSwgR29sZkRpdmlzaW9uLlByb2Zlc3Npb25hbEdvbGZlcl0sXHJcbiAgICAgICAgICAgIGNvdXJzZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBcIjAwMDNlYjM3ZGI0NmFmYTNjZDUxMmRlOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZkhvbGVzOiAxOCxcclxuICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhHcm91cHM6IDNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IFwiMDAwNmM2ZTI5Mjk4OGFmNzcyNzgwMmQ4XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mSG9sZXM6IDE4LFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEdyb3VwczogM1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0gYXMgVG91cm5hbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdlbmVyYXRlQWNjZXNzVG9rZW5zRm9yVHlwZShudW1iZXJPZlRva2VuczogbnVtYmVyLCBnb2xmRGl2aXNpb246IEdvbGZEaXZpc2lvbik6IFByb21pc2U8QWNjZXNzVG9rZW5bXT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuczogQWNjZXNzVG9rZW5bXSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZUb2tlbnM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdG9rZW4gPSBhd2FpdCBUb2tlbkdlbmVyYXRvci5nZW5lcmF0ZVRva2VuKE51bWJlcihjb25maWcuYWNjZXNzVG9rZW5MZW5ndGgpKTtcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW5zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICAgICAgZ29sZkRpdmlzaW9uOiBnb2xmRGl2aXNpb25cclxuICAgICAgICAgICAgfSBhcyBBY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW5zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEV4Y2VsQXNKc29uKCkge1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiU3RhcnRpbmcgcmVhZGluZyBleGNlbFwiKTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcImZpbGVQYXRoTmV3Pj4+Pj5cIix0aGlzLmZpbGVQYXRoTmV3KTtcclxuICAgICAgICBpZih0aGlzLmZpbGVQYXRoTmV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZVBhdGhOZXcgPSAnL2hvbWUvbWlrZS1wZy1zdGFnaW5nL3BsZWFjZS1nb2xmLWFwaS9hc3NldHMvbXNzY29yZWNhcmQueGxzeCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdvcmtib29rOiB4bHN4LldvcmtCb29rID0gRXhjZWxGaWxlUmVhZGVyLnJlYWRGaWxlKHRoaXMuZmlsZVBhdGhOZXcpO1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiU3RhcnRpbmcgbWFwcGluZyBpbiBqc29uXCIpO1xyXG4gICAgICAgIGNvbnN0IGNsdWJEYXRhID0gRXhjZWxGaWxlUmVhZGVyLnNoZWV0VG9PYmplY3RBcnJheTxHb2xmQ2x1Yj4od29ya2Jvb2ssIFwiU2hlZXQxXCIsdGhpcy5tYXBHb2xmQ2x1Yk5ldy5iaW5kKHRoaXMpLCBudWxsLCBudWxsKTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkVuZCByZWFkaW5nIGV4Y2VsXCIpO1xyXG4gICAgICAgIHJldHVybiBjbHViRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbXBvcnREYXRhKCkge1xyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiU3RhcnRpbmcgZGF0YSBpbXBvcnRcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHdvcmtib29rOiB4bHN4LldvcmtCb29rID0gRXhjZWxGaWxlUmVhZGVyLnJlYWRGaWxlKHRoaXMuZmlsZVBhdGgpO1xyXG4gICAgICAgIGNvbnN0IHNoZWV0TmFtZUxpc3QgPSB3b3JrYm9vay5TaGVldE5hbWVzO1xyXG5cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkZpbmlzaGVkIHJlYWRpbmcgd29ya2Jvb2tcIik7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYFNoZWV0IG5hbWVzOiAke3NoZWV0TmFtZUxpc3R9YCk7XHJcblxyXG4gICAgICAgIC8vIFRvdXJuYW1lbnQgRGF0YVxyXG4gICAgICAgIGNvbnN0IHRvdXJuYW1lbnREYXRhID0gdGhpcy5nZW5lcmF0ZVRvdXJuYW1lbnQoKTtcclxuXHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJTdGFydGluZyBjcmVhdGUgdG91cm5hbWVudCBkYXRhXCIpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudG91cm5hbWVudERBTy5jcmVhdGUodG91cm5hbWVudERhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJGaW5pc2hlZCBjcmVhdGUgdG91cm5hbWVudCBkYXRhXCIpO1xyXG5cclxuICAgICAgICAvLyBDbHViIERhdGFcclxuICAgICAgICBMb2dnZXIuaW5mbyhgU3RhcnRpbmcgbWFwIHNoZWV0IHRvIGdvbGYgY2x1YiBkYXRhYCk7XHJcbiAgICAgICAgY29uc3QgY2x1YkRhdGEgPSBFeGNlbEZpbGVSZWFkZXIuc2hlZXRUb09iamVjdEFycmF5PEdvbGZDbHViPih3b3JrYm9vaywgXCJHb2xmIENsdWJzXCIsIHRoaXMubWFwR29sZkNsdWIuYmluZCh0aGlzKSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYEZpbmlzaGVkIG1hcCBzaGVldCB0byBnb2xmIGNsdWIgZGF0YSwgY291bnQ6ICR7Y2x1YkRhdGEubGVuZ3RofWApO1xyXG5cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIlN0YXJ0aW5nIGJ1bGsgY3JlYXRlIGdvbGYgY2x1YiBkYXRhXCIpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ29sZkNsdWJEQU8uY3JlYXRlTWFueShjbHViRGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkZpbmlzaGVkIGJ1bGsgY3JlYXRlIGdvbGYgY2x1YiBkYXRhXCIpO1xyXG5cclxuICAgICAgICAvLyBDb3Vyc2UgRGF0YVxyXG4gICAgICAgIExvZ2dlci5pbmZvKGBTdGFydGluZyBtYXAgc2hlZXQgdG8gZ29sZiBjb3Vyc2UgZGF0YWApO1xyXG4gICAgICAgIGNvbnN0IGNvdXJzZURhdGEgPSBFeGNlbEZpbGVSZWFkZXIuc2hlZXRUb09iamVjdEFycmF5PEdvbGZDb3Vyc2U+KHdvcmtib29rLCBcIkdvbGYgQ291cnNlc1wiLCB0aGlzLm1hcEdvbGZDb3Vyc2UuYmluZCh0aGlzKSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oYEZpbmlzaGVkIG1hcCBzaGVldCB0byBnb2xmIGNvdXJzZSBkYXRhLCBjb3VudDogJHtjb3Vyc2VEYXRhLmxlbmd0aH1gKTtcclxuXHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJTdGFydGluZyBidWxrIGNyZWF0ZSBnb2xmIGNvdXJzZSBkYXRhXCIpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ29sZkNvdXJzZURBTy5jcmVhdGVNYW55KGNvdXJzZURhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmluZm8oXCJGaW5pc2hlZCBidWxrIGNyZWF0ZSBnb2xmIGNvdXJzZSBkYXRhXCIpO1xyXG5cclxuICAgICAgICAvLyBBY2Nlc3MgVG9rZW4gRGF0YVxyXG4gICAgICAgIExvZ2dlci5pbmZvKGBTdGFydGluZyBhY2Nlc3MgdG9rZW4gZ2VuZXJhdGlvbmApO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuRGF0YSA9IGF3YWl0IHRoaXMuZ2VuZXJhdGVBY2Nlc3NUb2tlbnMoKTtcclxuICAgICAgICBMb2dnZXIuaW5mbyhgRmluaXNoZWQgYWNjZXNzIHRva2VuIGdlbmVyYXRpb24sIGNvdW50OiAke2FjY2Vzc1Rva2VuRGF0YS5sZW5ndGh9YCk7XHJcblxyXG4gICAgICAgIExvZ2dlci5pbmZvKFwiU3RhcnRpbmcgYnVsayBjcmVhdGUgYWNjZXNzIHRva2VuIGRhdGFcIik7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hY2Nlc3NUb2tlbkRBTy5jcmVhdGVNYW55KGFjY2Vzc1Rva2VuRGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkZpbmlzaGVkIGJ1bGsgY3JlYXRlIGFjY2VzcyB0b2tlbiBkYXRhXCIpO1xyXG5cclxuICAgICAgICBMb2dnZXIuaW5mbyhcIkZpbmlzaGVkIGRhdGEgaW1wb3J0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFkZENvdXJzZVRlZXModGVlc1JlcXVlc3Q6IGFueSkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ29sZkNvdXJzZURBTy5hZGRHb2xmQ291cnNlVGVlcyh0ZWVzUmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFzeW5jIGltcG9ydENsdWJEYXRhKCkge1xyXG4gICAgICAgICBsZXQgb2xkTmFtZSA9ICcnO1xyXG4gICAgICAgICBsZXQgb2xkQ291bnRyeSA9ICcnO1xyXG4gICAgICAgICBsZXQgdGVlQXJyID0gW107XHJcbiAgICAgICAgIGxldCB1cGRhdGVkQ291cnNlID0gW107XHJcbiAgICAgICAgIGxldCBub3RGb3VudENudCA9IDA7XHJcbiAgICAgICAgIGxldCBmb3VudENudCA9IDA7XHJcbiAgICAgICAgIGxldCBnb2xmY2x1YnM6YW55ID0gdGhpcy5nZXRFeGNlbEFzSnNvbigpO1xyXG4gICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBnb2xmY2x1YnM/Lmxlbmd0aCA7IGkrKykge1xyXG4gICAgICAgICAgICAgdGhpcy5jb2RlU3VmZml4Kys7XHJcbiAgICAgICAgICAgICBsZXQgZ29sZkNsdWIgPSBnb2xmY2x1YnNbaV07XHJcbiAgICAgICAgICAgICBsZXQgaG9sZXNEYXRhID0gdGhpcy5nZXRIb2xlcyhnb2xmQ2x1Yik7XHJcbiAgICAgICAgICAgICBjb25zdCBjbHViTmFtZSA9IGdvbGZDbHViLmNvdXJzZV9uYW1lLnRyaW0oKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VudDo6JyxpKTsgXHJcbiAgICAgICAgICAgICBpZihpPT0wKXtcclxuICAgICAgICAgICAgICAgICBvbGROYW1lID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgICAgICAgb2xkQ291bnRyeSA9IGdvbGZDbHViLnN0YXRlX2NvdW50cnk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmKG9sZE5hbWUgIT09IGNsdWJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgbGV0IGNvdW50cnlDb2RlID0gdGhpcy5nZXRDb3VudHJ5Q29kZShvbGRDb3VudHJ5KTtcclxuICAgICAgICAgICAgICAgICBpZighY291bnRyeUNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgY291bnRyeUNvZGUgPSAnVVMnO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2x1Yk5hbWU6Oicsb2xkTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvdW50cnlDb2RlOjonLGNvdW50cnlDb2RlKTtcclxuICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb3VudHJ5Q29kZSA6Jyxjb3VudHJ5Q29kZSk7XHJcbiAgICAgICAgICAgICAgICAgbGV0IGNsdWJJZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICBsZXQgY2x1YnM6YW55ID0gYXdhaXQgdGhpcy5nZXRDbHViSWRzKG9sZE5hbWUsY291bnRyeUNvZGUpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgaWYoY2x1YnM/Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdub3QgZm91bmQnKVxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEdvbGZDbHViQ291cnNlKG9sZE5hbWUsb2xkQ291bnRyeSx0ZWVBcnIsaG9sZXNEYXRhLm51bWJlck9mSG9sZXMsY291bnRyeUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICBub3RGb3VudENudCsrO1xyXG4gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGlmKHRlZUFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViSWRzLnB1c2goT2JqZWN0SWQoZWxlbWVudC5faWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR29sZkNsdWIoZWxlbWVudC5faWQsb2xkQ291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YklkIDogeyAkaW4gOiBjbHViSWRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtfaWQ6MSx0ZWVzOjF9KS5leGVjKCkudGhlbihjb3Vyc2VzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2ogPCBjb3Vyc2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdXIgPSBjb3Vyc2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvdXIudGVlcz8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRDb3Vyc2UucHVzaChjb3VyLl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3Vyc2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJZCA6IGNvdXIuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVlcyA6IHRlZUFyclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ291cnNlVGVlcyhjb3Vyc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VudENudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY2x1YklkcycsY2x1Yklkcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBvbGROYW1lID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgICAgICAgb2xkQ291bnRyeSA9IGdvbGZDbHViLnN0YXRlX2NvdW50cnk7XHJcbiAgICAgICAgICAgICAgICAgdGVlQXJyID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBicmVhaztcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZ29sZkNsdWIuUGFyICE9IDAgJiYgZ29sZkNsdWIudGVlX25hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRlZUFyci5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpnb2xmQ2x1Yi50ZWVfbmFtZS50cmltKCkucmVwbGFjZSgvW15hLXpBLVowLTkgXS9nLCBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOmdvbGZDbHViLnRlZV9nZW5kZXIudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Vyc2VSYXRpbmc6Z29sZkNsdWIucmF0aW5nID09ICctJyB8fCBnb2xmQ2x1Yi5yYXRpbmcgPT0gJycgfHwgIWdvbGZDbHViLnJhdGluZyA/IDcyLjAgOiBnb2xmQ2x1Yi5yYXRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3BlUmF0aW5nOmdvbGZDbHViLnNsb3BlID09ICctJyB8fCBnb2xmQ2x1Yi5zbG9wZSA9PSAnJyB8fCAhZ29sZkNsdWIuc2xvcGUgPyAxMTMgOiBnb2xmQ2x1Yi5zbG9wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyOmdvbGZDbHViLlBhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZXM6aG9sZXNEYXRhLmhvbGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy9jb25zb2xlLmxvZygndXBkYXRlZENvdXJzZTo6Jyx1cGRhdGVkQ291cnNlKTtcclxuICAgICAgICAgY29uc29sZS5sb2coJ2ZvdW50Q250OjonLGZvdW50Q250KTtcclxuICAgICAgICAgY29uc29sZS5sb2coJ25vdEZvdW50Q250OjonLG5vdEZvdW50Q250KTtcclxuICAgICB9XHJcblxyXG4gICAgYXN5bmMgaW1wb3J0Q2x1YkRhdGFPbGQoKSB7XHJcbiAgICAgICAvKiAgbGV0IG9sZE5hbWUgPSAnJztcclxuICAgICAgICBsZXQgb2xkQ291bnRyeSA9ICcnO1xyXG4gICAgICAgIGxldCB0ZWVBcnIgPSBbXTtcclxuICAgICAgICBsZXQgdXBkYXRlZENvdXJzZSA9IFtdO1xyXG4gICAgICAgIGxldCBub3RGb3VudENudCA9IDA7XHJcbiAgICAgICAgbGV0IGZvdW50Q250ID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCBnb2xmY2x1YnM/Lmxlbmd0aCA7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvZGVTdWZmaXgrKztcclxuICAgICAgICAgICAgbGV0IGdvbGZDbHViID0gZ29sZmNsdWJzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaG9sZXNEYXRhID0gdGhpcy5nZXRIb2xlcyhnb2xmQ2x1Yik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsdWJOYW1lID0gZ29sZkNsdWIuY291cnNlX25hbWUudHJpbSgpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjbHViTmFtZScsY2x1Yk5hbWUpOyBcclxuICAgICAgICAgICAgaWYoaT09MCl7XHJcbiAgICAgICAgICAgICAgICBvbGROYW1lID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgICAgICBvbGRDb3VudHJ5ID0gZ29sZkNsdWIuc3RhdGVfY291bnRyeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYob2xkTmFtZSAhPT0gY2x1Yk5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5Q29kZSA9IHRoaXMuZ2V0Q291bnRyeUNvZGUob2xkQ291bnRyeSk7XHJcbiAgICAgICAgICAgICAgICBpZighY291bnRyeUNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZSA9ICdVUyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2x1Yk5hbWU6Oicsb2xkTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY291bnRyeUNvZGU6OicsY291bnRyeUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY291bnRyeUNvZGUgOicsY291bnRyeUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsdWJJZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBjbHViczphbnkgPSBhd2FpdCB0aGlzLmdldENsdWJJZHMob2xkTmFtZSxjb3VudHJ5Q29kZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihjbHVicz8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRHb2xmQ2x1YkNvdXJzZShvbGROYW1lLG9sZENvdW50cnksdGVlQXJyLGhvbGVzRGF0YS5udW1iZXJPZkhvbGVzKTtcclxuICAgICAgICAgICAgICAgICAgICBub3RGb3VudENudCsrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbHVicy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViSWRzLnB1c2goT2JqZWN0SWQoZWxlbWVudC5faWQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmZpbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHViSWQgOiB7ICRpbiA6IGNsdWJJZHN9XHJcbiAgICAgICAgICAgICAgICAgICAgfSx7X2lkOjEsdGVlczoxfSkuZXhlYygpLnRoZW4oY291cnNlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wO2ogPCBjb3Vyc2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291ciA9IGNvdXJzZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VyLnRlZXM/Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRDb3Vyc2UucHVzaChjb3VyLl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdXJzZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cnNlSWQgOiBjb3VyLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVlcyA6IHRlZUFyclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENvdXJzZVRlZXMoY291cnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW50Q250Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjbHViSWRzJyxjbHViSWRzKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG9sZE5hbWUgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgICAgIG9sZENvdW50cnkgPSBnb2xmQ2x1Yi5zdGF0ZV9jb3VudHJ5O1xyXG4gICAgICAgICAgICAgICAgdGVlQXJyID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVlQXJyLnB1c2goXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpnb2xmQ2x1Yi50ZWVfbmFtZS50cmltKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOmdvbGZDbHViLnRlZV9nZW5kZXIudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZVJhdGluZzpnb2xmQ2x1Yi5yYXRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvcGVSYXRpbmc6Z29sZkNsdWIuc2xvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyOmdvbGZDbHViLlBhcixcclxuICAgICAgICAgICAgICAgICAgICBob2xlczpob2xlc0RhdGEuaG9sZXMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCd1cGRhdGVkQ291cnNlOjonLHVwZGF0ZWRDb3Vyc2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3VudENudDo6Jyxmb3VudENudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vdEZvdW50Q250OjonLG5vdEZvdW50Q250KTtcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0YXRlQ2l0eShvbGRDb3VudHJ5KSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IG9sZENvdW50cnkuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgc3RhdGVDb2RlID0gJyc7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAnJztcclxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICBzdGF0ZUNvZGUgPSBzdHJbc3RyLmxlbmd0aCAtIDJdPy50cmltKCk7XHJcbiAgICAgICAgICAgIGNpdHkgPSBzdHJbc3RyLmxlbmd0aCAtIDNdPy50cmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0ci5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICBjaXR5ID0gc3RyW3N0ci5sZW5ndGggLSAyXT8udHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZUNvZGUgPSBzdGF0ZUNvZGUgPyBzdGF0ZUNvZGUgOiAnJztcclxuICAgICAgICBjaXR5ID0gY2l0eSA/IGNpdHkgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHtjaXR5OmNpdHksc3RhdGU6c3RhdGVDb2RlfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXN5bmMgYWRkR29sZkNsdWJDb3Vyc2Uob2xkTmFtZSxvbGRDb3VudHJ5LHRlZUFycixudW1iZXJPZkhvbGVzLGNvdW50cnlDb2RlKSB7XHJcbiAgICAgICAgLyogbGV0IHN0ciA9IG9sZENvdW50cnkuc3BsaXQoJywnKVsxXTtcclxuICAgICAgICBsZXQgc3RyQXJyID0gc3RyLnRyaW0oKS5zcGxpdCgnfn4nKTsgKi9cclxuICAgICAgICBsZXQgc3RhdGVDaXR5ID0gdGhpcy5nZXRTdGF0ZUNpdHkob2xkQ291bnRyeSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXRlQ2l0eScsc3RhdGVDaXR5KTtcclxuICAgICAgICBjb25zdCBjb2RlID0gY291bnRyeUNvZGUgKyctJytzdGF0ZUNpdHkuc3RhdGUudG9VcHBlckNhc2UoKSsnLTAwMDAwMCcrdGhpcy5jb2RlU3VmZml4O1xyXG4gICAgICAgIGNvbnN0IGdvbGZDbHViRGF0YSA9IHtcclxuICAgICAgICAgICAgX2lkIDogdGhpcy5oYXNoSWRUbzEyQ2hhcmFjdGVycyhjb2RlKSxcclxuICAgICAgICAgICAgY29kZSA6IGNvZGUsXHJcbiAgICAgICAgICAgIG5hbWUgOiBvbGROYW1lLFxyXG4gICAgICAgICAgICBtZW1iZXJzaGlwIDogJ1B1YmxpYycsXHJcbiAgICAgICAgICAgIG51bWJlck9mSG9sZXMgOiBudW1iZXJPZkhvbGVzLFxyXG4gICAgICAgICAgICBjb3VudHJ5Q29kZSA6IGNvdW50cnlDb2RlLFxyXG4gICAgICAgICAgICBwaG9uZSA6ICdOL0QnLFxyXG4gICAgICAgICAgICBlbWFpbDogJ04vRCcsXHJcbiAgICAgICAgICAgIHdlYnNpdGUgOiAnTi9EJyxcclxuICAgICAgICAgICAgY29udGFjdE5hbWUgOiAnTi9EJyxcclxuICAgICAgICAgICAgc3RhdGUgOiBzdGF0ZUNpdHkuc3RhdGUudG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgICAgY2l0eSA6IHN0YXRlQ2l0eS5jaXR5XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzYXZlZENsdWJEYiA9IGF3YWl0IEdvbGZDbHViU2NoZW1hLmNyZWF0ZShnb2xmQ2x1YkRhdGEpO1xyXG4gICAgICAgIGNvbnN0IGNsdWJJZCA9IHNhdmVkQ2x1YkRiLl9pZDtcclxuICAgICAgICBjb25zdCBjb3Vyc2VDb2RlID0gY29kZSsnLTAwMDAwMDEnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXcgQ2x1YklkJyxjbHViSWQpO1xyXG4gICAgICAgIGNvbnN0IGNvdXJzZUJvZHkgPSB7XHJcbiAgICAgICAgICAgIF9pZCA6IHRoaXMuaGFzaElkVG8xMkNoYXJhY3RlcnMoY291cnNlQ29kZSksXHJcbiAgICAgICAgICAgIGNvZGUgOiBjb3Vyc2VDb2RlLFxyXG4gICAgICAgICAgICBjbHViSWQgOiBPYmplY3RJZChjbHViSWQpLFxyXG4gICAgICAgICAgICBuYW1lIDogb2xkTmFtZSxcclxuICAgICAgICAgICAgbnVtYmVyT2ZIb2xlcyA6IG51bWJlck9mSG9sZXMsXHJcbiAgICAgICAgICAgIHBhciA6IDcyLFxyXG4gICAgICAgICAgICB0eXBlIDogJ1BhcmtsYW5kJyxcclxuICAgICAgICAgICAgdGVlcyA6IHRlZUFyclxyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCBHb2xmQ291cnNlU2NoZW1hLmNyZWF0ZShjb3Vyc2VCb2R5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgdXBkYXRlR29sZkNsdWIoY2x1YklkLG9sZF9jb3VudHJ5KSB7XHJcbiAgICAgICAgbGV0IHN0YXRlQ2l0eSA9IHRoaXMuZ2V0U3RhdGVDaXR5KG9sZF9jb3VudHJ5KTtcclxuICAgICAgICBhd2FpdCBHb2xmQ2x1YlNjaGVtYS5maW5kT25lQW5kVXBkYXRlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IGNsdWJJZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZUNpdHkuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0eSA6IHN0YXRlQ2l0eS5jaXR5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5ldzogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKS5leGVjKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291bnRyeUNvZGUoc3RhdGVfY291bnRyeSkge1xyXG4gICAgICAgIGxldCBzdHJBcnIgPSBzdGF0ZV9jb3VudHJ5LnNwbGl0KCcsJyk7XHJcbiAgICAgICAgbGV0IHN0cjEgPSBzdHJBcnJbc3RyQXJyLmxlbmd0aCAtIDFdLnRyaW0oKTtcclxuICAgICAgICBpZihzdHIxID09PSBcIlVTQVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlVTXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0cjEgPT09IFwiVUtcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJHQi1FTkdcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29kZSA9IHRoaXMuY291bnRyeVNlcnZpY2UuZ2V0Q291bnRyeUNvZGVCeU5hbWUoc3RyMSk7XHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291bnRyeUNvZGVPbGQoc3RhdGVfY291bnRyeSkge1xyXG4gICAgICAgIGxldCBzdHIgPSBzdGF0ZV9jb3VudHJ5LnNwbGl0KCcsJylbMV07XHJcbiAgICAgICAgcmV0dXJuIHN0ci50cmltKCkuc3BsaXQoJ35+JylbMV07XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0Q2x1YklkcyhjbHViTmFtZSxjb3VudHJ5Q29kZSkge1xyXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5cIiArIGNsdWJOYW1lLnRvTG93ZXJDYXNlKCkgKyBcIiRcIiwgXCJpXCIpXHJcbiAgICAgICAgbGV0IGNsdWJJbkRiID0gR29sZkNsdWJTY2hlbWEuZmluZCh7XHJcbiAgICAgICAgICAgIG5hbWU6IHJlZ2V4LGNvdW50cnlDb2RlOmNvdW50cnlDb2RlXHJcbiAgICAgICAgfSx7X2lkOjEsY29kZToxLG5hbWU6MX0pLmV4ZWMoKTtcclxuICAgICAgICAvKiBsZXQgY2x1YkluRGIgPSBHb2xmQ2x1YlNjaGVtYS5maW5kKHtcclxuICAgICAgICAgICAgbmFtZTogeyRyZWdleDogY2x1Yk5hbWUsICRvcHRpb25zOiBcImlcIn0sY291bnRyeUNvZGU6Y291bnRyeUNvZGVcclxuICAgICAgICB9LHtfaWQ6MSxjb2RlOjEsbmFtZToxfSkuZXhlYygpOyAqL1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2x1YkluRGIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SG9sZXMoZ29sZkNsdWIpIHtcclxuICAgICAgICBsZXQgaG9sZXMgPSBbXTtcclxuICAgICAgICBsZXQgbnVtYmVyT2ZIb2xlcyA9IDk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6MSxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMSddID8gZ29sZkNsdWJbJyMxJ10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6MixcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMiddID8gZ29sZkNsdWJbJyMyJ10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6MyxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMyddID8gZ29sZkNsdWJbJyMzJ10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6NCxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjNCddID8gZ29sZkNsdWJbJyM0J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6NSxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjNSddID8gZ29sZkNsdWJbJyM1J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6NixcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjNiddID8gZ29sZkNsdWJbJyM2J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6NyxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjNyddID8gZ29sZkNsdWJbJyM3J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6OCxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjOCddID8gZ29sZkNsdWJbJyM4J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGhvbGU6OSxcclxuICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjOSddID8gZ29sZkNsdWJbJyM5J10gOiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoZ29sZkNsdWJbJyMxMCddKSB7XHJcbiAgICAgICAgICAgIG51bWJlck9mSG9sZXMgPSAxODtcclxuICAgICAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBob2xlOjEwLFxyXG4gICAgICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMTAnXSA/IGdvbGZDbHViWycjMTAnXSA6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGhvbGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG9sZToxMSxcclxuICAgICAgICAgICAgICAgIHBhcjpnb2xmQ2x1YlsnIzExJ10gPyBnb2xmQ2x1YlsnIzExJ10gOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBob2xlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGhvbGU6MTIsXHJcbiAgICAgICAgICAgICAgICBwYXI6Z29sZkNsdWJbJyMxMiddID8gZ29sZkNsdWJbJyMxMiddIDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBob2xlOjEzLFxyXG4gICAgICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMTMnXSA/IGdvbGZDbHViWycjMTMnXSA6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGhvbGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG9sZToxNCxcclxuICAgICAgICAgICAgICAgIHBhcjpnb2xmQ2x1YlsnIzE0J10gPyBnb2xmQ2x1YlsnIzE0J10gOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBob2xlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGhvbGU6MTUsXHJcbiAgICAgICAgICAgICAgICBwYXI6Z29sZkNsdWJbJyMxNSddID8gZ29sZkNsdWJbJyMxNSddIDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaG9sZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBob2xlOjE2LFxyXG4gICAgICAgICAgICAgICAgcGFyOmdvbGZDbHViWycjMTYnXSA/IGdvbGZDbHViWycjMTYnXSA6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGhvbGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG9sZToxNyxcclxuICAgICAgICAgICAgICAgIHBhcjpnb2xmQ2x1YlsnIzE3J10gPyBnb2xmQ2x1YlsnIzE3J10gOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBob2xlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGhvbGU6MTgsXHJcbiAgICAgICAgICAgICAgICBwYXI6Z29sZkNsdWJbJyMxOCddID8gZ29sZkNsdWJbJyMxOCddIDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtob2xlczpob2xlcyxudW1iZXJPZkhvbGVzOm51bWJlck9mSG9sZXN9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==