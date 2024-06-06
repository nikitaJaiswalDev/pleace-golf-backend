import { Gender } from "../../../../types/gender.enum";
import { checkCountry, checkId } from "../../../../core/validation/validator";
import { PublicProfile } from "../../../../types/public-profile";
import { ContactDetails } from "../../../../types/contact-details";

const { check } = require("express-validator");

/**
 * @swagger
 * definitions:
 *  UpdateUserProfileRequest:
 *      type: object
 *      required:
 *          - firstName
 *          - lastName
 *          - nationality
 *          - countryOfResidence
 *          - handicapIndex
 *          - homeClub
 *          - gender
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          nationality:
 *              type: string
 *          countryOfResidence:
 *              type: string
 *          handicapIndex:
 *              type: number
 *          homeClub:
 *              type: string
 *          gender:
 *              type: string
 *              enum: [MALE, FEMALE]
 */
export class UpdateUserProfileRequest {
    firstName: string;
    lastName: string;
    nationality: string;
    countryOfResidence: string;
    state: string;
    handicapIndex: number;
    homeClub: string;
    gender: Gender;
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
    singForCharity?: string;
    playGolf?: string;
}

export const UpdateUserProfileRequestSchema = [
    checkId('userId'),
    check("firstName").exists({ checkFalsy: true }),
    check("lastName").exists({ checkFalsy: true }),
    checkCountry("nationality"),
    checkCountry("countryOfResidence"),
    check("handicapIndex").exists({ checkFalsy: true }).isNumeric(),
    //check("homeClub").exists({ checkFalsy: true }),
    check("gender").exists({ checkFalsy: true }).isIn(["MALE", "FEMALE"])
];