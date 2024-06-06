"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const account_status_enum_1 = require("../types/account-status.enum");
const gender_enum_1 = require("../types/gender.enum");
const golf_division_enum_1 = require("../types/golf-division.enum");
const tournament_entry_model_1 = require("./tournament-entry.model");
const tournament_leaderboard_model_1 = require("./tournament-leaderboard.model");
const tournament_result_model_1 = require("./tournament-result.model");
const tournament_scorecard_model_1 = require("./tournament-scorecard.model");
/*export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
};*/
//export interface UserModel extends User, Document { }
const userSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: account_status_enum_1.AccountStatus,
        required: true,
        default: account_status_enum_1.AccountStatus.Active
    },
    isConfirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    emailVerificationCode: {
        type: String
    },
    resetPasswordVerificationCode: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    countryOfResidence: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    handicapIndex: {
        type: Number,
        required: true
    },
    homeClub: {
        type: String
    },
    gender: {
        type: gender_enum_1.Gender
    },
    division: {
        type: golf_division_enum_1.GolfDivision,
        required: true,
        default: golf_division_enum_1.GolfDivision.Champ
    },
    pgaMemberNumber: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    amateurTokens: [
        {
            type: String
        }
    ],
    publicProfiles: [
        {
            platform: {
                type: String
            },
            link: {
                type: String
            }
        }
    ],
    imageData: {
        type: String
    },
    profession: {
        type: String
    },
    homePage: {
        type: String
    },
    otherLinks: {
        type: String
    },
    shortUpdate: {
        type: String
    },
    biography: {
        type: String
    },
    ownCharityLink: {
        type: String
    },
    supportCharities: {
        type: String
    },
    videoMsgLink: {
        type: String
    },
    sponsorsLink: {
        type: String
    },
    shopLink: {
        type: String
    },
    merchandiseLink: {
        type: String
    },
    managerDetails: {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        }
    },
    publicistDetails: {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        }
    },
    agentDetails: {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        }
    },
    playGolf: {
        type: String
    },
    singForCharity: {
        type: String
    },
    isAdminCreated: {
        type: Boolean,
        default: false
    },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.pre("remove", function (next) {
    tournament_entry_model_1.TournamentEntrySchema.remove({ userId: this._id }).exec();
    tournament_leaderboard_model_1.TournamentLeaderboardSchema.remove({ user: this._id }).exec();
    tournament_result_model_1.TournamentResultSchema.remove({ user: this._id }).exec();
    tournament_scorecard_model_1.TournamentScorecardSchema.remove({ userId: this._id }).exec();
    next();
});
/*
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};*/
exports.UserSchema = mongoose.model("User", userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvdXNlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUM7QUFDakMscUNBQXFDO0FBRXJDLHNFQUE2RDtBQUM3RCxzREFBOEM7QUFDOUMsb0VBQTJEO0FBQzNELHFFQUFpRTtBQUNqRSxpRkFBNkU7QUFDN0UsdUVBQW1FO0FBQ25FLDZFQUF5RTtBQU96RTs7O0lBR0k7QUFFSix1REFBdUQ7QUFHdkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25DLHNDQUFzQztJQUN0QyxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsbUNBQWE7UUFDbkIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsbUNBQWEsQ0FBQyxNQUFNO0tBQ2hDO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QscUJBQXFCLEVBQUU7UUFDbkIsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELDZCQUE2QixFQUFFO1FBQzNCLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFF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QUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUQsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUdIOzs7SUFHSTtBQUVTLFFBQUEsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQVksTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcclxuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vdHlwZXMvdXNlclwiO1xyXG5pbXBvcnQgeyBBY2NvdW50U3RhdHVzIH0gZnJvbSBcIi4uL3R5cGVzL2FjY291bnQtc3RhdHVzLmVudW1cIjtcclxuaW1wb3J0IHsgR2VuZGVyIH0gZnJvbSBcIi4uL3R5cGVzL2dlbmRlci5lbnVtXCI7XHJcbmltcG9ydCB7IEdvbGZEaXZpc2lvbiB9IGZyb20gXCIuLi90eXBlcy9nb2xmLWRpdmlzaW9uLmVudW1cIjtcclxuaW1wb3J0IHsgVG91cm5hbWVudEVudHJ5U2NoZW1hIH0gZnJvbSBcIi4vdG91cm5hbWVudC1lbnRyeS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50TGVhZGVyYm9hcmRTY2hlbWEgfSBmcm9tIFwiLi90b3VybmFtZW50LWxlYWRlcmJvYXJkLm1vZGVsXCI7XHJcbmltcG9ydCB7IFRvdXJuYW1lbnRSZXN1bHRTY2hlbWEgfSBmcm9tIFwiLi90b3VybmFtZW50LXJlc3VsdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUb3VybmFtZW50U2NvcmVjYXJkU2NoZW1hIH0gZnJvbSBcIi4vdG91cm5hbWVudC1zY29yZWNhcmQubW9kZWxcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2NvcmUvbG9nZ2luZ1wiO1xyXG5pbXBvcnQgeyBCaW5hcnkgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5pbXBvcnQgeyBDb250YWN0RGV0YWlscyB9IGZyb20gXCIuLi90eXBlcy9jb250YWN0LWRldGFpbHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFVzZXJNb2RlbCA9IG1vbmdvb3NlLkRvY3VtZW50ICYgVXNlcjtcclxuXHJcbi8qZXhwb3J0IHR5cGUgVXNlckRvY3VtZW50ID0gbW9uZ29vc2UuRG9jdW1lbnQgJiB7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxufTsqL1xyXG5cclxuLy9leHBvcnQgaW50ZXJmYWNlIFVzZXJNb2RlbCBleHRlbmRzIFVzZXIsIERvY3VtZW50IHsgfVxyXG5cclxuXHJcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIC8vX2lkOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICBlbWFpbDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHN0YXR1czoge1xyXG4gICAgICAgIHR5cGU6IEFjY291bnRTdGF0dXMsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogQWNjb3VudFN0YXR1cy5BY3RpdmVcclxuICAgIH0sXHJcbiAgICBpc0NvbmZpcm1lZDoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBlbWFpbFZlcmlmaWNhdGlvbkNvZGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICByZXNldFBhc3N3b3JkVmVyaWZpY2F0aW9uQ29kZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIGZpcnN0TmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGxhc3ROYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgbmF0aW9uYWxpdHk6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBzdGF0ZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgIH0sXHJcbiAgICBoYW5kaWNhcEluZGV4OiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgaG9tZUNsdWI6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBnZW5kZXI6IHtcclxuICAgICAgICB0eXBlOiBHZW5kZXJcclxuICAgIH0sXHJcbiAgICBkaXZpc2lvbjoge1xyXG4gICAgICAgIHR5cGU6IEdvbGZEaXZpc2lvbixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBHb2xmRGl2aXNpb24uQ2hhbXBcclxuICAgIH0sXHJcbiAgICBwZ2FNZW1iZXJOdW1iZXI6IHtcclxuICAgICAgICB0eXBlIDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgaXNBZG1pbjoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBhbWF0ZXVyVG9rZW5zIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIHB1YmxpY1Byb2ZpbGVzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGxhdGZvcm0gOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOlN0cmluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rIDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTpTdHJpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBpbWFnZURhdGEgOiB7XHJcbiAgICAgICAgdHlwZSA6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIHByb2Zlc3Npb24gOiB7XHJcbiAgICAgICAgdHlwZSA6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIGhvbWVQYWdlIDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBvdGhlckxpbmtzIDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBzaG9ydFVwZGF0ZSA6IHtcclxuICAgICAgICB0eXBlIDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgYmlvZ3JhcGh5IDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBvd25DaGFyaXR5TGluayA6IHtcclxuICAgICAgICB0eXBlIDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgc3VwcG9ydENoYXJpdGllcyA6IHtcclxuICAgICAgICB0eXBlIDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgdmlkZW9Nc2dMaW5rIDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBzcG9uc29yc0xpbmsgOiB7XHJcbiAgICAgICAgdHlwZSA6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIHNob3BMaW5rIDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBtZXJjaGFuZGlzZUxpbmsgOiB7XHJcbiAgICAgICAgdHlwZSA6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIG1hbmFnZXJEZXRhaWxzIDoge1xyXG4gICAgICAgIG5hbWUgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6U3RyaW5nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZSA6IHtcclxuICAgICAgICAgICAgdHlwZTpTdHJpbmdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtYWlsIDoge1xyXG4gICAgICAgICAgICB0eXBlOlN0cmluZ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwdWJsaWNpc3REZXRhaWxzIDoge1xyXG4gICAgICAgIG5hbWUgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6U3RyaW5nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZSA6IHtcclxuICAgICAgICAgICAgdHlwZTpTdHJpbmdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtYWlsIDoge1xyXG4gICAgICAgICAgICB0eXBlOlN0cmluZ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZ2VudERldGFpbHMgOiB7XHJcbiAgICAgICAgbmFtZSA6IHtcclxuICAgICAgICAgICAgdHlwZTpTdHJpbmdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lIDoge1xyXG4gICAgICAgICAgICB0eXBlOlN0cmluZ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1haWwgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6U3RyaW5nXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXlHb2xmIDoge1xyXG4gICAgICAgIHR5cGUgOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBzaW5nRm9yQ2hhcml0eSA6IHtcclxuICAgICAgICB0eXBlIDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgaXNBZG1pbkNyZWF0ZWQ6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICB9LFxyXG59LCB7IHRpbWVzdGFtcHM6IHsgY3JlYXRlZEF0OiBcImNyZWF0ZWRBdFwiLCB1cGRhdGVkQXQ6IFwidXBkYXRlZEF0XCIgfSB9KTtcclxuXHJcblxyXG51c2VyU2NoZW1hLnByZShcInNhdmVcIiwgZnVuY3Rpb24gc2F2ZShuZXh0KSB7XHJcbiAgICBjb25zdCB1c2VyID0gdGhpcyBhcyBVc2VyTW9kZWw7XHJcbiAgICBpZiAoIXVzZXIuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpKSB7IHJldHVybiBuZXh0KCk7IH1cclxuICAgIGJjcnlwdC5nZW5TYWx0KDEwLCAoZXJyOiBhbnksIHNhbHQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIG5leHQoZXJyKTsgfVxyXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChlcnI6IGFueSwgaGFzaDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIG5leHQoZXJyKTsgfVxyXG4gICAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcclxuICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbnVzZXJTY2hlbWEucHJlKFwicmVtb3ZlXCIsIGZ1bmN0aW9uKG5leHQpIHtcclxuICAgIFRvdXJuYW1lbnRFbnRyeVNjaGVtYS5yZW1vdmUoeyB1c2VySWQ6IHRoaXMuX2lkIH0pLmV4ZWMoKTtcclxuICAgIFRvdXJuYW1lbnRMZWFkZXJib2FyZFNjaGVtYS5yZW1vdmUoeyB1c2VyOiB0aGlzLl9pZCB9KS5leGVjKCk7XHJcbiAgICBUb3VybmFtZW50UmVzdWx0U2NoZW1hLnJlbW92ZSh7IHVzZXI6IHRoaXMuX2lkIH0pLmV4ZWMoKTtcclxuICAgIFRvdXJuYW1lbnRTY29yZWNhcmRTY2hlbWEucmVtb3ZlKHsgdXNlcklkOiB0aGlzLl9pZCB9KS5leGVjKCk7XHJcbiAgICBuZXh0KCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbnVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAocGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcclxufTsqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJTY2hlbWEgPSBtb25nb29zZS5tb2RlbDxVc2VyTW9kZWw+KFwiVXNlclwiLCB1c2VyU2NoZW1hKTtcclxuIl19