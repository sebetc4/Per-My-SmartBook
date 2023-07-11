import { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { InstanceOfWithDates, ImageOnDb, ColorMode, AuthProvider } from '.';

/**
 * Model && Instance
 */
export type UserSchema = {
    authProvider: AuthProvider;
    username: string;
    email: string;
    password?: string;
    avatar: ImageOnDb;
    uiSettings: UiSettings;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    aiSettings: AISettings;
    resetPassword: ResetPassword;
};

type UiSettings = {
    userColor: string;
    colorMode: ColorMode;
};

type ResetPassword = {
    token?: string;
    expireAt?: number;
};

export type UserMethods = {
    getSessionData: () => Promise<UserSession>;
    getSettings: () => UserSettings;
    isValidPassword: (id: UserSchema['password']) => Promise<boolean>;
    isEqualValues: (values: Partial<UserSchema>) => boolean;
    getResetPasswordToken: () => string;
    login: (req: NextApiRequest, res: NextApiResponse) => void;
};

export interface IUserModel extends Model<UserSchema, {}, UserMethods> {}

export type UserInstance = InstanceOfWithDates<UserSchema, UserMethods>;

/**
 * OpenAI Settings
 */
export type AISettings = {
    openai: OpenaiSettings;
};

export type OpenaiSettings = {
    maxTokens: number;
    temperature: number;
    key?: OpenaiEncryptedKey;
};

export type OpenaiEncryptedKey = RequiredPlaceHolderEncryptedKey<EncryptedKey>;

export type EncryptedKey = {
    encryptedKey: string;
    iv: string;
    placeholder?: string;
};

export type RequiredPlaceHolderEncryptedKey<T extends EncryptedKey> = T & { placeholder: string };

/**
 * Front data
 */
export type UserSessionData =
    | Pick<UserSchema, 'authProvider' | 'username'> & {
          id: string;
          avatarUrl: string | null;
          userColor: string;
      };

export type UserSession = UserSessionData & { colorMode: ColorMode };

export type UserSettings = {
    email: UserSchema['email'];
    ai: {
        openai: Omit<OpenaiSettings, 'key'> & { key: string | null };
    };
};
