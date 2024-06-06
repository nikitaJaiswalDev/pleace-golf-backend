"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRequestSchema = void 0;
const validator_1 = require("../../../../core/validation/validator");
const { check } = require("express-validator");
exports.UserProfileRequestSchema = [
    (0, validator_1.checkId)('userId'),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3YxL2R0b3MvcmVxdWVzdC91c2VyLXByb2ZpbGUucmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBZ0U7QUFFaEUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWxDLFFBQUEsd0JBQXdCLEdBQUc7SUFDcEMsSUFBQSxtQkFBTyxFQUFDLFFBQVEsQ0FBQztDQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2hlY2tJZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24vdmFsaWRhdG9yXCI7XHJcblxyXG5jb25zdCB7IGNoZWNrIH0gPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7XHJcblxyXG5leHBvcnQgY29uc3QgVXNlclByb2ZpbGVSZXF1ZXN0U2NoZW1hID0gW1xyXG4gICAgY2hlY2tJZCgndXNlcklkJyksXHJcbl07XHJcbiJdfQ==