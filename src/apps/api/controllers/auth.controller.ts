import { CustomError } from '../../../packages/classes';
import { loginWithCredentialsSchema, signUpSchema } from '../../../packages/schemas';
import { LoginWithCredentialsBody, Session, SessionStatus, SignUpBody, UserInstance } from '../../../packages/types';
import { User } from '../models';
import { catchControllerError, authUserAndSession, validBody, deleteTokenCookie, onSuccess } from '../functions';

export const signUp = catchControllerError(async (req, res) => {
    const { email, username, password } = await validBody<SignUpBody>(signUpSchema, req);
    await User.create({ email, username, password, authProvider: 'credentials' });
    onSuccess(201, { message: 'User registred successfully' }, res);
});

export const loginWithCredentials = catchControllerError(async (req, res) => {
    const { email, password } = await validBody<LoginWithCredentialsBody>(loginWithCredentialsSchema, req);
    const user: UserInstance | null = await User.findOne({ email });
    if (!user) {
        throw CustomError.WRONG_EMAIL;
    }
    if (!(await user.isValidPassword(password))) {
        throw CustomError.WRONG_PASSWORD;
    }
    user.login(req, res);
    const session: Session = {
        status: SessionStatus.VALID,
        user: await user.getSessionData(),
    };
    onSuccess(200, { session }, res);
});

export const getSession = catchControllerError(async (req, res) => {
    const { session } = await authUserAndSession(req, res);
    onSuccess(200, { session }, res);
});

export const logout = catchControllerError(async (req, res) => {
    deleteTokenCookie(req, res);
    onSuccess(200, { message: 'Logout successful' }, res);
});
