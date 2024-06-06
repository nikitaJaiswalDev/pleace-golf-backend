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
exports.BasicMongoDAO = void 0;
const mongo_dao_1 = require("./mongo.dao");
class BasicMongoDAO extends mongo_dao_1.MongoDAO {
    constructor(objectSchema) {
        super(objectSchema);
    }
    update(object) {
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
exports.BasicMongoDAO = BasicMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbW9uZ28uZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZGFvL21vbmdvL2Jhc2ljLW1vbmdvLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7Ozs7Ozs7OztBQUVILDJDQUF1QztBQUd2QyxNQUFhLGFBQWlCLFNBQVEsb0JBQVc7SUFFN0MsWUFBWSxZQUFtRDtRQUMzRCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVZLE1BQU0sQ0FBQyxNQUFTOztZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFDLFVBQWtCLEVBQUUsS0FBYTs7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtDQUNKO0FBYkQsc0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDIwIENvZGV2IFRlY2hub2xvZ2llcyAoUHR5KSBMdGQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTW9uZ29EQU8gfSBmcm9tIFwiLi9tb25nby5kYW9cIjtcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzaWNNb25nb0RBTzxUPiBleHRlbmRzIE1vbmdvREFPPFQ+IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmplY3RTY2hlbWE6IG1vbmdvb3NlLk1vZGVsPG1vbmdvb3NlLkRvY3VtZW50ICYgVD4pIHtcclxuICAgICAgICBzdXBlcihvYmplY3RTY2hlbWEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGUob2JqZWN0OiBUKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VhcmNoKGlucHV0UXVlcnk6IHN0cmluZywgbGltaXQ6IG51bWJlcik6IFByb21pc2U8VFtdPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxufVxyXG4iXX0=