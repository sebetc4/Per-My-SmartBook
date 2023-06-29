import { CustomError } from '../../../packages/classes';
import {
    addModifyOpenaiKeySchema,
    updateAccountSchema,
    updateAISettingsSchema,
    updatePasswordSchema,
    updateProfileSchema,
    updateUserColorSchema,
} from '../../../packages/schemas';
import {
    AddModifyOpenaiKeyBody,
    ColorMode,
    UpdateAccountBody,
    UpdateAISettingsBody,
    UpdatePasswordBody,
    UpdateProfileBody,
    UpdateUserColorBody,
    Visibility,
} from '../../../packages/types';
import { deleteFileFromS3, uploadFileToS3 } from '../configs';
import {
    authUser,
    catchControllerError,
    validBody,
    onSuccess,
    validParseFormidableData,
    authUserAndSession,
    generateRandomBytes,
    encryptKey,
} from '../functions';
import { createReadStream } from 'fs';

export const getUserSettingsAndSession = catchControllerError(async (req, res) => {
    const { session, user } = await authUserAndSession(req, res);
    const settings = user?.getSettings();
    onSuccess(200, { session, settings }, res);
});

export const updateAccount = catchControllerError(async (req, res) => {
    const { email, username } = await validBody<UpdateAccountBody>(updateAccountSchema, req);
    const user = await authUser(req);
    if (user.isEqualValues({ email, username })) {
        throw CustomError.BAD_REQUEST;
    }
    user.email = email;
    user.username = username;
    await user.save();
    const session = await user.getSessionData();
    onSuccess(200, { session }, res);
});

export const updateProfile = catchControllerError(async (req, res) => {
    const { avatarFile } = await validParseFormidableData<UpdateProfileBody>(updateProfileSchema, req);
    const user = await authUser(req);
    if (avatarFile) {
        const readStream = createReadStream(avatarFile.filepath);
        const fileName = `avatar/${generateRandomBytes()}`;
        await uploadFileToS3(readStream, fileName, Visibility.PUBLIC, avatarFile.mimetype!);
        user.avatar.key && (await deleteFileFromS3(user.avatar));
        user.avatar.key = fileName;
    }
    await user.save();
    const session = await user.getSessionData();
    onSuccess(200, { session }, res);
});

export const updatePassword = catchControllerError(async (req, res) => {
    const { currentPassword, newPassword } = await validBody<UpdatePasswordBody>(updatePasswordSchema, req);
    const user = await authUser(req);
    if (user.authProvider !== 'credentials') {
        throw CustomError.BAD_REQUEST;
    }
    if (!(await user.isValidPassword(currentPassword))) {
        throw CustomError.WRONG_PASSWORD;
    }
    user.password = newPassword;
    await user.save();
    onSuccess(200, { message: 'Password is changed' }, res);
});

export const updateAISettings = catchControllerError(async (req, res) => {
    const { maxTokens, temperature } = await validBody<UpdateAISettingsBody>(updateAISettingsSchema, req);
    const user = await authUser(req);
    user.aiSettings.openai.maxTokens = maxTokens;
    user.aiSettings.openai.temperature = temperature;
    await user.save();
    onSuccess(200, { message: 'AI settings are updated' }, res);
});

export const addModifyOpenaiKey = catchControllerError(async (req, res) => {
    const { key } = await validBody<AddModifyOpenaiKeyBody>(addModifyOpenaiKeySchema, req);
    const user = await authUser(req);
    const { encryptedKey, iv } = encryptKey(key);
    const placeholder = `sk-...${key.substring(key.length - 6)}`;
    user.aiSettings.openai.key = {
        iv,
        encryptedKey,
        placeholder,
    };
    user.save();
    onSuccess(201, { key: placeholder }, res);
});

export const deleteOpenaiKey = catchControllerError(async (req, res) => {
    const user = await authUser(req);
    user.aiSettings.openai.key = undefined;
    await user.save();
    onSuccess(200, { message: 'OpenAI key is deleted' }, res);
});

export const toggleColorMode = catchControllerError(async (req, res) => {
    const user = await authUser(req);
    user.uiSettings.colorMode =
        user.uiSettings.colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT;
    await user.save();
    onSuccess(200, { message: 'Color mode is changed' }, res);
});

export const updateUserColor = catchControllerError(async (req, res) => {
    const { color } = await validBody<UpdateUserColorBody>(updateUserColorSchema, req);
    const user = await authUser(req);
    user.uiSettings.userColor = color
    await user.save();
    onSuccess(200, { message: 'User color is changed' }, res);
});
