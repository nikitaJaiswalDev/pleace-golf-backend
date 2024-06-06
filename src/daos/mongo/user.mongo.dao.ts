import { UserDAO } from "../user.dao.interface";
import { User } from "../../types/user";
import { UserModel, UserSchema } from "../../models/user.model";
import { Logger } from "../../core/logging";
import { MongoDAO } from "../../core/dao/mongo/mongo.dao";
import { FilterBuilder } from "../../core/dao/filter/filter-builder";

export class UserMongoDAO extends MongoDAO<User> implements UserDAO  {

    constructor() {
        super(UserSchema);
    }

    public async delete(id: string): Promise<User> {
        try {
            return await new UserSchema({ _id: id }).remove();
        } catch (error) {
            const errorMsg = `Could not delete user '${id}'. Error: ${error}`;
            return Promise.reject(new Error(errorMsg));
        }
    }

    public async update(user: User): Promise<User> {
        try {
            return await UserSchema.findByIdAndUpdate(
                user._id,
                {
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
                        publicProfiles : user.publicProfiles,
                        imageData : user.imageData,
                        profession : user.profession,
                        homePage : user.homePage,
                        otherLinks : user.otherLinks,
                        shortUpdate : user.shortUpdate,
                        biography : user.biography,
                        ownCharityLink : user.ownCharityLink,
                        supportCharities : user.supportCharities,
                        videoMsgLink : user.videoMsgLink,
                        sponsorsLink : user.sponsorsLink,
                        shopLink : user.shopLink,
                        merchandiseLink : user.merchandiseLink,
                        managerDetails : user.managerDetails,
                        publicistDetails : user.publicistDetails,
                        agentDetails : user.agentDetails,
                        playGolf : user.playGolf,
                        singForCharity : user.singForCharity,
                    }
                },
                {
                    new: true
                }
            ).exec();
        } catch (error) {
            Logger.error(`Could not update user ${user._id}. Error: ${error}`);
            throw error;
        }
    }

    public async getByEmail(email: string): Promise<User> {
        const filter = new FilterBuilder()
            .addFilter("email", email)
            .buildFirst();
        return this.getByFilter(filter);
    }

    public async changePassword(id: string, newPassword: string): Promise<void> {
        try {
            const user: UserModel = await UserSchema.findById(id).exec();
            user.password = newPassword;
            await user.save();
        } catch (error) {
            const errorMsg = `Could not update the user's password: id='${id}'. Error: ${error}`;
            return Promise.reject(new Error(errorMsg));
        }
    }
    
    public async search(inputQuery: string, limit: number): Promise<User[]> {
        throw new Error("Not implemented.");
    }

}
