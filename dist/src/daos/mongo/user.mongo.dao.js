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
exports.UserMongoDAO = void 0;
const user_model_1 = require("../../models/user.model");
const logging_1 = require("../../core/logging");
const mongo_dao_1 = require("../../core/dao/mongo/mongo.dao");
const filter_builder_1 = require("../../core/dao/filter/filter-builder");
class UserMongoDAO extends mongo_dao_1.MongoDAO {
    constructor() {
        super(user_model_1.UserSchema);
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new user_model_1.UserSchema({ _id: id }).remove();
            }
            catch (error) {
                const errorMsg = `Could not delete user '${id}'. Error: ${error}`;
                return Promise.reject(new Error(errorMsg));
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserSchema.findByIdAndUpdate(user._id, {
                    $set: {
                        email: user.email,
                        status: user.status,
                        isConfirmed: user.isConfirmed,
                        emailVerificationCode: user.emailVerificationCode,
                        resetPasswordVerificationCode: user.resetPasswordVerificationCode,
                        division: user.division,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        nationality: user.nationality,
                        countryOfResidence: user.countryOfResidence,
                        state: user.state,
                        handicapIndex: user.handicapIndex,
                        homeClub: user.homeClub,
                        gender: user.gender,
                        publicProfiles: user.publicProfiles,
                        imageData: user.imageData,
                        profession: user.profession,
                        homePage: user.homePage,
                        otherLinks: user.otherLinks,
                        shortUpdate: user.shortUpdate,
                        biography: user.biography,
                        ownCharityLink: user.ownCharityLink,
                        supportCharities: user.supportCharities,
                        videoMsgLink: user.videoMsgLink,
                        sponsorsLink: user.sponsorsLink,
                        shopLink: user.shopLink,
                        merchandiseLink: user.merchandiseLink,
                        managerDetails: user.managerDetails,
                        publicistDetails: user.publicistDetails,
                        agentDetails: user.agentDetails,
                        playGolf: user.playGolf,
                        singForCharity: user.singForCharity,
                    }
                }, {
                    new: true
                }).exec();
            }
            catch (error) {
                logging_1.Logger.error(`Could not update user ${user._id}. Error: ${error}`);
                throw error;
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = new filter_builder_1.FilterBuilder()
                .addFilter("email", email)
                .buildFirst();
            return this.getByFilter(filter);
        });
    }
    changePassword(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserSchema.findById(id).exec();
                user.password = newPassword;
                yield user.save();
            }
            catch (error) {
                const errorMsg = `Could not update the user's password: id='${id}'. Error: ${error}`;
                return Promise.reject(new Error(errorMsg));
            }
        });
    }
    search(inputQuery, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.UserMongoDAO = UserMongoDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb25nby5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGFvcy9tb25nby91c2VyLm1vbmdvLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSx3REFBZ0U7QUFDaEUsZ0RBQTRDO0FBQzVDLDhEQUEwRDtBQUMxRCx5RUFBcUU7QUFFckUsTUFBYSxZQUFhLFNBQVEsb0JBQWM7SUFFNUM7UUFDSSxLQUFLLENBQUMsdUJBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFWSxNQUFNLENBQUMsRUFBVTs7WUFDMUIsSUFBSSxDQUFDO2dCQUNELE9BQU8sTUFBTSxJQUFJLHVCQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNLFFBQVEsR0FBRywwQkFBMEIsRUFBRSxhQUFhLEtBQUssRUFBRSxDQUFDO2dCQUNsRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFDLElBQVU7O1lBQzFCLElBQUksQ0FBQztnQkFDRCxPQUFPLE1BQU0sdUJBQVUsQ0FBQyxpQkFBaUIsQ0FDckMsSUFBSSxDQUFDLEdBQUcsRUFDUjtvQkFDSSxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzt3QkFDN0IscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjt3QkFDakQsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLDZCQUE2Qjt3QkFDakUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7d0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDdkIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO3dCQUM3QixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO3dCQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7d0JBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTt3QkFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ25CLGNBQWMsRUFBRyxJQUFJLENBQUMsY0FBYzt3QkFDcEMsU0FBUyxFQUFHLElBQUksQ0FBQyxTQUFTO3dCQUMxQixVQUFVLEVBQUcsSUFBSSxDQUFDLFVBQVU7d0JBQzVCLFFBQVEsRUFBRyxJQUFJLENBQUMsUUFBUTt3QkFDeEIsVUFBVSxFQUFHLElBQUksQ0FBQyxVQUFVO3dCQUM1QixXQUFXLEVBQUcsSUFBSSxDQUFDLFdBQVc7d0JBQzlCLFNBQVMsRUFBRyxJQUFJLENBQUMsU0FBUzt3QkFDMUIsY0FBYyxFQUFHLElBQUksQ0FBQyxjQUFjO3dCQUNwQyxnQkFBZ0IsRUFBRyxJQUFJLENBQUMsZ0JBQWdCO3dCQUN4QyxZQUFZLEVBQUcsSUFBSSxDQUFDLFlBQVk7d0JBQ2hDLFlBQVksRUFBRyxJQUFJLENBQUMsWUFBWTt3QkFDaEMsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRO3dCQUN4QixlQUFlLEVBQUcsSUFBSSxDQUFDLGVBQWU7d0JBQ3RDLGNBQWMsRUFBRyxJQUFJLENBQUMsY0FBYzt3QkFDcEMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLGdCQUFnQjt3QkFDeEMsWUFBWSxFQUFHLElBQUksQ0FBQyxZQUFZO3dCQUNoQyxRQUFRLEVBQUcsSUFBSSxDQUFDLFFBQVE7d0JBQ3hCLGNBQWMsRUFBRyxJQUFJLENBQUMsY0FBYztxQkFDdkM7aUJBQ0osRUFDRDtvQkFDSSxHQUFHLEVBQUUsSUFBSTtpQkFDWixDQUNKLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixnQkFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEdBQUcsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLEtBQUssQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLEtBQWE7O1lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksOEJBQWEsRUFBRTtpQkFDN0IsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7aUJBQ3pCLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFWSxjQUFjLENBQUMsRUFBVSxFQUFFLFdBQW1COztZQUN2RCxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxJQUFJLEdBQWMsTUFBTSx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE1BQU0sUUFBUSxHQUFHLDZDQUE2QyxFQUFFLGFBQWEsS0FBSyxFQUFFLENBQUM7Z0JBQ3JGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFWSxNQUFNLENBQUMsVUFBa0IsRUFBRSxLQUFhOztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBRUo7QUF2RkQsb0NBdUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckRBTyB9IGZyb20gXCIuLi91c2VyLmRhby5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi90eXBlcy91c2VyXCI7XHJcbmltcG9ydCB7IFVzZXJNb2RlbCwgVXNlclNjaGVtYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9sb2dnaW5nXCI7XHJcbmltcG9ydCB7IE1vbmdvREFPIH0gZnJvbSBcIi4uLy4uL2NvcmUvZGFvL21vbmdvL21vbmdvLmRhb1wiO1xyXG5pbXBvcnQgeyBGaWx0ZXJCdWlsZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvZGFvL2ZpbHRlci9maWx0ZXItYnVpbGRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJNb25nb0RBTyBleHRlbmRzIE1vbmdvREFPPFVzZXI+IGltcGxlbWVudHMgVXNlckRBTyAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFVzZXJTY2hlbWEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBuZXcgVXNlclNjaGVtYSh7IF9pZDogaWQgfSkucmVtb3ZlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNc2cgPSBgQ291bGQgbm90IGRlbGV0ZSB1c2VyICcke2lkfScuIEVycm9yOiAke2Vycm9yfWA7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VyOiBVc2VyKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFVzZXJTY2hlbWEuZmluZEJ5SWRBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgICAgICB1c2VyLl9pZCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHVzZXIuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NvbmZpcm1lZDogdXNlci5pc0NvbmZpcm1lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxWZXJpZmljYXRpb25Db2RlOiB1c2VyLmVtYWlsVmVyaWZpY2F0aW9uQ29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRQYXNzd29yZFZlcmlmaWNhdGlvbkNvZGU6IHVzZXIucmVzZXRQYXNzd29yZFZlcmlmaWNhdGlvbkNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdmlzaW9uOiB1c2VyLmRpdmlzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aW9uYWxpdHk6IHVzZXIubmF0aW9uYWxpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTogdXNlci5jb3VudHJ5T2ZSZXNpZGVuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiB1c2VyLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kaWNhcEluZGV4OiB1c2VyLmhhbmRpY2FwSW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbWVDbHViOiB1c2VyLmhvbWVDbHViLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNQcm9maWxlcyA6IHVzZXIucHVibGljUHJvZmlsZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YSA6IHVzZXIuaW1hZ2VEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9mZXNzaW9uIDogdXNlci5wcm9mZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob21lUGFnZSA6IHVzZXIuaG9tZVBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyTGlua3MgOiB1c2VyLm90aGVyTGlua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VXBkYXRlIDogdXNlci5zaG9ydFVwZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmlvZ3JhcGh5IDogdXNlci5iaW9ncmFwaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bkNoYXJpdHlMaW5rIDogdXNlci5vd25DaGFyaXR5TGluayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydENoYXJpdGllcyA6IHVzZXIuc3VwcG9ydENoYXJpdGllcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Nc2dMaW5rIDogdXNlci52aWRlb01zZ0xpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb25zb3JzTGluayA6IHVzZXIuc3BvbnNvcnNMaW5rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG9wTGluayA6IHVzZXIuc2hvcExpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmNoYW5kaXNlTGluayA6IHVzZXIubWVyY2hhbmRpc2VMaW5rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyRGV0YWlscyA6IHVzZXIubWFuYWdlckRldGFpbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY2lzdERldGFpbHMgOiB1c2VyLnB1YmxpY2lzdERldGFpbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50RGV0YWlscyA6IHVzZXIuYWdlbnREZXRhaWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5R29sZiA6IHVzZXIucGxheUdvbGYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdGb3JDaGFyaXR5IDogdXNlci5zaW5nRm9yQ2hhcml0eSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmV4ZWMoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoYENvdWxkIG5vdCB1cGRhdGUgdXNlciAke3VzZXIuX2lkfS4gRXJyb3I6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0QnlFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlckJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAuYWRkRmlsdGVyKFwiZW1haWxcIiwgZW1haWwpXHJcbiAgICAgICAgICAgIC5idWlsZEZpcnN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnlGaWx0ZXIoZmlsdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2hhbmdlUGFzc3dvcmQoaWQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXI6IFVzZXJNb2RlbCA9IGF3YWl0IFVzZXJTY2hlbWEuZmluZEJ5SWQoaWQpLmV4ZWMoKTtcclxuICAgICAgICAgICAgdXNlci5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xyXG4gICAgICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvck1zZyA9IGBDb3VsZCBub3QgdXBkYXRlIHRoZSB1c2VyJ3MgcGFzc3dvcmQ6IGlkPScke2lkfScuIEVycm9yOiAke2Vycm9yfWA7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhc3luYyBzZWFyY2goaW5wdXRRdWVyeTogc3RyaW5nLCBsaW1pdDogbnVtYmVyKTogUHJvbWlzZTxVc2VyW10+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=