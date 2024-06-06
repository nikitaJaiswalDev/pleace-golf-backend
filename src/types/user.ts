import { IUser } from "../interfaces/user.interface";
import { AccountStatus } from "./account-status.enum";
import { ContactDetails } from "./contact-details";
import { Gender } from "./gender.enum";
import { GolfDivision } from "./golf-division.enum";
import { PublicProfile } from "./public-profile";

export class User implements IUser {
    _id: string;
    email: string;
    password: string;
    status: AccountStatus;
    isConfirmed: boolean;
    emailVerificationCode?: string;
    resetPasswordVerificationCode?: string;
    firstName: string;
    lastName: string;
    nationality: string;
    countryOfResidence: string;
    state?: string;
    handicapIndex: number;
    homeClub?: string;
    gender?: Gender;
    division: GolfDivision;
    accessToken? :string;
    pgaMemberNumber? :string;
    isAdmin :boolean;
    amateurTokens? : string[];
    publicProfiles? : PublicProfile[];
    imageData? : string;
    profession?: string;
    homePage?: string;
    otherLinks?: string;
    shortUpdate? : string;
    biography ? : string;
    ownCharityLink ? : string;
    supportCharities ? : string;
    videoMsgLink ? : string;
    sponsorsLink ? : string;
    shopLink ? : string;
    merchandiseLink ? : string;
    managerDetails ? : ContactDetails;
    publicistDetails ? : ContactDetails;
    agentDetails ? : ContactDetails;
    playGolf ? : string;
    singForCharity ? : string;
    public static fromId(id: string): User {
        return {
            _id: id
        } as User;
    };
    isAdminCreated ? : boolean;
}