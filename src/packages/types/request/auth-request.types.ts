import { Session } from "..";

/**
 * Get Session
 */
export type GetSessionRes = {
    session: Session;
};

/**
 * Sign Up
 */
export type SignUpBody = {
    username: string;
    email: string;
    password: string;
};

/**
* Login With Credentials
*/
export type LoginWithCredentialsBody = {
    email: string;
    password: string;
};

export type LoginWithCredentialsRes = {
    session: Session;
};

/**
 * Forgot Password 
 */ 
export type ForgotPasswordBody = {
    email: string;
};