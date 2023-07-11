import { CustomError } from '~/packages/classes';
import { forgotPasswordSchema, loginWithCredentialsSchema, resetPasswordSchema, signUpSchema } from '~/packages/schemas';
import { ForgotPasswordBody, LoginWithCredentialsBody, Path, ResetPasswordBody, Session, SessionStatus, SignUpBody, UserInstance } from '~/packages/types';
import { User } from '../models';
import { catchControllerError, authUserAndSession, validBody, deleteTokenCookie, onSuccess, hashData, sendResetPasswordEmail } from '../functions';
import { findUserByEmail } from '../queries';

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

export const forgotPassword = catchControllerError(async (req, res) => {
    const { email } = await validBody<ForgotPasswordBody>(forgotPasswordSchema, req);
    const user = await findUserByEmail(email);
    if (!user) {
        throw CustomError.WRONG_EMAIL;
    }
    if (user.authProvider !== 'credentials') {
        throw CustomError.WRONG_AUTH_PROVIDER;
    }
    const resetToken = user.getResetPasswordToken();
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${Path.RESET_PASSWORD}?t=${resetToken}`;
    try {
        await sendResetPasswordEmail({ email: user.email, username: user.username, resetUrl });
        onSuccess(200, { message: 'Email sent' }, res);
    } catch (err) {
        user.resetPassword.token = undefined;
        user.resetPassword.expireAt = undefined;
        user.save();
        throw err;
    }
});

export const checkResetPasswordToken = catchControllerError(async (req, res) => {
    const token = req.query.token;
    if (typeof token !== 'string') {
        throw CustomError.INVALID_RESET_PASSWORD_TOKEN;
    }
    const resetPasswordToken = hashData(token);
    const user: UserInstance | undefined | null = await User.findOne({
        'resetPassword.token': resetPasswordToken,
        'resetPassword.expireAt': { $gt: Date.now() },
    });
    if (!user) {
        throw CustomError.INVALID_RESET_PASSWORD_TOKEN;
    }
    onSuccess(200, { isValid: 'Valid token' }, res);
})

export const resetPassword = catchControllerError(async (req, res) => {
    const { newPassword } = await validBody<ResetPasswordBody>(resetPasswordSchema, req);
    const token = req.query.token;
    if (typeof token !== 'string') {
        throw CustomError.INVALID_RESET_PASSWORD_TOKEN;
    }
    const resetPasswordToken = hashData(token);
    const user: UserInstance | null = await User.findOne({
        'resetPassword.token': resetPasswordToken,
        'resetPassword.expireAt': { $gt: Date.now() },
    });
    if (!user) {
        throw CustomError.INVALID_RESET_PASSWORD_TOKEN;
    }
    user.password = newPassword;
    user.resetPassword.token = undefined;
    user.resetPassword.expireAt = undefined;
    await user.save();
    onSuccess(200, { message: 'Password reset success' }, res);
});
