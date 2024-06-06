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
exports.MongoDAO = void 0;
const logging_1 = require("../../logging");
const range_filter_1 = require("../filter/range.filter");
const greater_than_or_equal_filter_1 = require("../filter/greater-than-or-equal.filter");
const less_than_or_equal_filter_1 = require("../filter/less-than-or-equal.filter");
class MongoDAO {
    constructor(objectSchema) {
        this.objectSchema = objectSchema;
        this.schemaName = objectSchema.collection.collectionName;
    }
    /*private getTypeName<T>(type: T): string {
        return typeof type;
    }*/
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newObject = new this.objectSchema(object);
                return yield newObject.save();
            }
            catch (error) {
                logging_1.Logger.error(`Could not create ${this.schemaName} with:'${object}'. Error: ${error}`);
                throw error;
            }
        });
    }
    createMany(objects) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.objectSchema.insertMany(objects);
            }
            catch (error) {
                logging_1.Logger.error(`Could not create many ${this.schemaName}. Error: ${error}`);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                const object = this.objectSchema.findByIdAndRemove(id).exec();
                result = object;
            }
            catch (error) {
                const errorMsg = `${this.schemaName} with id='${id}' could not be removed. Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                //result = Promise.reject(new Error(errorMsg));
                throw error;
            }
            return result;
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.objectSchema.findById(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = undefined;
            try {
                result = this.objectSchema.find({}).exec();
            }
            catch (error) {
                const errorMsg = `Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                //result = Promise.reject(new Error(errorMsg));
                throw error;
            }
            return result;
        });
    }
    buildTransformedFilterValue(filterValue) {
        if (filterValue instanceof Array) {
            let isStringArray = true;
            filterValue.forEach(function (item) {
                if (typeof item !== 'string') {
                    isStringArray = false;
                }
            });
            if (isStringArray && filterValue.length > 0) {
                console.log('string[]!');
                return {
                    $in: filterValue
                };
            }
            else {
                throw new Error("Unsupported filter type");
            }
        }
        else if (filterValue instanceof range_filter_1.RangeFilter) {
            return {
                $gte: filterValue.start,
                $lte: filterValue.end
            };
        }
        else if (filterValue instanceof greater_than_or_equal_filter_1.GreaterThanOrEqualFilter) {
            return {
                $gte: filterValue.value
            };
        }
        else if (filterValue instanceof less_than_or_equal_filter_1.LessThanOrEqualFilter) {
            return {
                $lte: filterValue.value
            };
        }
        else {
            return filterValue;
        }
    }
    buildFilterObjectFromFilters(filters) {
        const filterObject = {};
        filters.forEach(filter => {
            filterObject[filter.property] = this.buildTransformedFilterValue(filter.value);
        });
        return filterObject;
    }
    getByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterObject = {};
                filterObject[filter.property] = this.buildTransformedFilterValue(filter.value);
                return yield this.objectSchema.findOne(filterObject).exec();
            }
            catch (error) {
                const errorMsg = `Cannot obtain ${this.schemaName} with filterValue='${filter.value}'. Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                //return Promise.reject(new Error(errorMsg));
                throw error;
            }
        });
    }
    getByFilterArray(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterObject = {};
                filterObject[filter.property] = this.buildTransformedFilterValue(filter.value);
                return yield this.objectSchema.find(filterObject).exec();
            }
            catch (error) {
                const errorMsg = `Cannot obtain ${this.schemaName} with filterValue='${filter.value}'. Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                //return Promise.reject(new Error(errorMsg));
                throw error;
            }
        });
    }
    getByFilters(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = this.buildFilterObjectFromFilters(filters);
                return this.objectSchema.findOne(filter).exec();
            }
            catch (error) {
                const errorMsg = `Cannot obtain ${this.schemaName} with filters='${filters}'. Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                throw error;
            }
        });
    }
    getMultipleByFilters(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = this.buildFilterObjectFromFilters(filters);
                return this.objectSchema.find(filter).exec();
            }
            catch (error) {
                const errorMsg = `Cannot obtain ${this.schemaName} with filters='${filters}'. Error: ${error}`;
                logging_1.Logger.error(errorMsg);
                throw error;
            }
        });
    }
    searchByProperty(property, value, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (limit === undefined) {
                throw new RangeError("Query limit not set");
            }
            const wildcardRegex = new RegExp(`.*${value}.*`);
            const filter = {};
            filter[property] = { $regex: wildcardRegex };
            const query = [{
                    $match: filter
                }, {
                    $limit: limit
                }];
            try {
                const objects = yield this.objectSchema.aggregate(query).exec();
                return objects;
            }
            catch (err) {
                logging_1.Logger.error(err);
                //return Promise.reject(err);
                throw err;
            }
        });
    }
}
exports.MongoDAO = MongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZGFvL21vbmdvL21vbmdvLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7Ozs7Ozs7OztBQUlILDJDQUF1QztBQUN2Qyx5REFBcUQ7QUFDckQseUZBQWtGO0FBQ2xGLG1GQUE0RTtBQUk1RSxNQUFzQixRQUFRO0lBSTFCLFlBQXNCLFlBQW1EO1FBQW5ELGlCQUFZLEdBQVosWUFBWSxDQUF1QztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO0lBQzdELENBQUM7SUFFRDs7T0FFRztJQUVVLE1BQU0sQ0FBQyxNQUFTOztZQUN6QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUViLGdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixJQUFJLENBQUMsVUFBVSxVQUFVLE1BQU0sYUFBYSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLE9BQVk7O1lBQ2hDLElBQUksQ0FBQztnQkFDRCxPQUFPLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBRWIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLElBQUksQ0FBQyxVQUFVLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxLQUFLLENBQUM7WUFDaEIsQ0FBQztR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QWdCLENBQUMsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsS0FBYTs7WUFDeEUsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sSUFBSSxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFFN0MsTUFBTSxLQUFLLEdBQVUsQ0FBQztvQkFDbEIsTUFBTSxFQUFFLE1BQU07aUJBQ2pCLEVBQUU7b0JBQ0MsTUFBTSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQztnQkFDRCxNQUFNLE9BQU8sR0FBUSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyRSxPQUFPLE9BQU8sQ0FBQztZQUNuQixDQUFDO1lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsNkJBQTZCO2dCQUM3QixNQUFNLEdBQUcsQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FHSjtBQWxNRCw0QkFrTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIwIENvZGV2IFRlY2hub2xvZ2llcyAoUHR5KSBMdGQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgREFPIH0gZnJvbSBcIi4uL2Rhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IFJhbmdlRmlsdGVyIH0gZnJvbSBcIi4uL2ZpbHRlci9yYW5nZS5maWx0ZXJcIjtcclxuaW1wb3J0IHsgR3JlYXRlclRoYW5PckVxdWFsRmlsdGVyIH0gZnJvbSBcIi4uL2ZpbHRlci9ncmVhdGVyLXRoYW4tb3ItZXF1YWwuZmlsdGVyXCI7XHJcbmltcG9ydCB7IExlc3NUaGFuT3JFcXVhbEZpbHRlciB9IGZyb20gXCIuLi9maWx0ZXIvbGVzcy10aGFuLW9yLWVxdWFsLmZpbHRlclwiO1xyXG5pbXBvcnQgeyBGaWx0ZXJUeXBlIH0gZnJvbSBcIi4uL2ZpbHRlci9maWx0ZXIudHlwZVwiO1xyXG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tIFwiLi4vZmlsdGVyL2ZpbHRlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vbmdvREFPPFQ+IGltcGxlbWVudHMgREFPPFQ+IHtcclxuXHJcbiAgICAgcHJvdGVjdGVkIHNjaGVtYU5hbWUgOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9iamVjdFNjaGVtYTogbW9uZ29vc2UuTW9kZWw8bW9uZ29vc2UuRG9jdW1lbnQgJiBUPikge1xyXG4gICAgICAgIHRoaXMuc2NoZW1hTmFtZSA9IG9iamVjdFNjaGVtYS5jb2xsZWN0aW9uLmNvbGxlY3Rpb25OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qcHJpdmF0ZSBnZXRUeXBlTmFtZTxUPih0eXBlOiBUKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHR5cGU7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlKG9iamVjdDogVCk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld09iamVjdCA9IG5ldyB0aGlzLm9iamVjdFNjaGVtYShvYmplY3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgbmV3T2JqZWN0LnNhdmUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgY3JlYXRlICR7dGhpcy5zY2hlbWFOYW1lfSB3aXRoOicke29iamVjdH0nLiBFcnJvcjogJHtlcnJvcn1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVNYW55KG9iamVjdHM6IFRbXSk6IFByb21pc2U8VFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMub2JqZWN0U2NoZW1hLmluc2VydE1hbnkob2JqZWN0cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihgQ291bGQgbm90IGNyZWF0ZSBtYW55ICR7dGhpcy5zY2hlbWFOYW1lfS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgdXBkYXRlKG9iamVjdDogVCk6IFByb21pc2U8VD47XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogUHJvbWlzZTxUPiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0OiBQcm9taXNlPFQ+ID0gdGhpcy5vYmplY3RTY2hlbWEuZmluZEJ5SWRBbmRSZW1vdmUoaWQpLmV4ZWMoKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gYCR7dGhpcy5zY2hlbWFOYW1lfSB3aXRoIGlkPScke2lkfScgY291bGQgbm90IGJlIHJlbW92ZWQuIEVycm9yOiAke2Vycm9yfWA7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIC8vcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGVycm9yTXNnKSk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QnlJRChpZDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0U2NoZW1hLmZpbmRCeUlkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8VFtdPiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogUHJvbWlzZTxUW10+ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm9iamVjdFNjaGVtYS5maW5kKHt9KS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNc2cgPSBgRXJyb3I6ICR7ZXJyb3J9YDtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgLy9yZXN1bHQgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cpKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRUcmFuc2Zvcm1lZEZpbHRlclZhbHVlKGZpbHRlclZhbHVlOiBGaWx0ZXJUeXBlKTogYW55IHtcclxuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBsZXQgaXNTdHJpbmdBcnJheSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZpbHRlclZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1N0cmluZ0FycmF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChpc1N0cmluZ0FycmF5ICYmIGZpbHRlclZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdHJpbmdbXSEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGluOiBmaWx0ZXJWYWx1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGZpbHRlciB0eXBlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZpbHRlclZhbHVlIGluc3RhbmNlb2YgUmFuZ2VGaWx0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICRndGU6IGZpbHRlclZhbHVlLnN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgJGx0ZTogZmlsdGVyVmFsdWUuZW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmlsdGVyVmFsdWUgaW5zdGFuY2VvZiBHcmVhdGVyVGhhbk9yRXF1YWxGaWx0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICRndGU6IGZpbHRlclZhbHVlLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmlsdGVyVmFsdWUgaW5zdGFuY2VvZiBMZXNzVGhhbk9yRXF1YWxGaWx0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICRsdGU6IGZpbHRlclZhbHVlLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZEZpbHRlck9iamVjdEZyb21GaWx0ZXJzKGZpbHRlcnM6IEZpbHRlcltdKTogYW55IHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJPYmplY3Q6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0W2ZpbHRlci5wcm9wZXJ0eV0gPSB0aGlzLmJ1aWxkVHJhbnNmb3JtZWRGaWx0ZXJWYWx1ZShmaWx0ZXIudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldEJ5RmlsdGVyKGZpbHRlcjogRmlsdGVyKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyT2JqZWN0OiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgZmlsdGVyT2JqZWN0W2ZpbHRlci5wcm9wZXJ0eV0gPSB0aGlzLmJ1aWxkVHJhbnNmb3JtZWRGaWx0ZXJWYWx1ZShmaWx0ZXIudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5vYmplY3RTY2hlbWEuZmluZE9uZShmaWx0ZXJPYmplY3QpLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvck1zZyA9IGBDYW5ub3Qgb2J0YWluICR7dGhpcy5zY2hlbWFOYW1lfSB3aXRoIGZpbHRlclZhbHVlPScke2ZpbHRlci52YWx1ZX0nLiBFcnJvcjogJHtlcnJvcn1gO1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICAvL3JldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cpKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRCeUZpbHRlckFycmF5KGZpbHRlcjogRmlsdGVyKTogUHJvbWlzZTxUW10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJPYmplY3Q6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBmaWx0ZXJPYmplY3RbZmlsdGVyLnByb3BlcnR5XSA9IHRoaXMuYnVpbGRUcmFuc2Zvcm1lZEZpbHRlclZhbHVlKGZpbHRlci52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLm9iamVjdFNjaGVtYS5maW5kKGZpbHRlck9iamVjdCkuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gYENhbm5vdCBvYnRhaW4gJHt0aGlzLnNjaGVtYU5hbWV9IHdpdGggZmlsdGVyVmFsdWU9JyR7ZmlsdGVyLnZhbHVlfScuIEVycm9yOiAke2Vycm9yfWA7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihlcnJvck1zZykpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhc3luYyBnZXRCeUZpbHRlcnMoZmlsdGVyczogRmlsdGVyW10pOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHRoaXMuYnVpbGRGaWx0ZXJPYmplY3RGcm9tRmlsdGVycyhmaWx0ZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0U2NoZW1hLmZpbmRPbmUoZmlsdGVyKS5leGVjKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNc2cgPSBgQ2Fubm90IG9idGFpbiAke3RoaXMuc2NoZW1hTmFtZX0gd2l0aCBmaWx0ZXJzPScke2ZpbHRlcnN9Jy4gRXJyb3I6ICR7ZXJyb3J9YDtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRNdWx0aXBsZUJ5RmlsdGVycyhmaWx0ZXJzOiBGaWx0ZXJbXSk6IFByb21pc2U8VFtdPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB0aGlzLmJ1aWxkRmlsdGVyT2JqZWN0RnJvbUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFNjaGVtYS5maW5kKGZpbHRlcikuZXhlYygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gYENhbm5vdCBvYnRhaW4gJHt0aGlzLnNjaGVtYU5hbWV9IHdpdGggZmlsdGVycz0nJHtmaWx0ZXJzfScuIEVycm9yOiAke2Vycm9yfWA7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgc2VhcmNoKGlucHV0UXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlcik6IFByb21pc2U8VFtdPjtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VhcmNoQnlQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBsaW1pdDogbnVtYmVyKTogUHJvbWlzZTxUW10+IHtcclxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlF1ZXJ5IGxpbWl0IG5vdCBzZXRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3aWxkY2FyZFJlZ2V4ID0gbmV3IFJlZ0V4cChgLioke3ZhbHVlfS4qYCk7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICBmaWx0ZXJbcHJvcGVydHldID0geyAkcmVnZXg6IHdpbGRjYXJkUmVnZXggfTtcclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnk6IGFueVtdID0gW3tcclxuICAgICAgICAgICAgJG1hdGNoOiBmaWx0ZXJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICRsaW1pdDogbGltaXRcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0czogVFtdID0gYXdhaXQgdGhpcy5vYmplY3RTY2hlbWEuYWdncmVnYXRlKHF1ZXJ5KS5leGVjKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==