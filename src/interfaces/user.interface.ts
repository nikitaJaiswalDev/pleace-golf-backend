import { AccountStatus } from "../types/account-status.enum";
import { ContactDetails } from "../types/contact-details";
import { Gender } from "../types/gender.enum";
import { GolfDivision } from "../types/golf-division.enum";
import { PublicProfile } from "../types/public-profile";

export interface IUser {
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
    isAdmin: boolean;
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
    isAdminCreated ? : boolean
}
