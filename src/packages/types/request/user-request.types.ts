import { File } from "formidable";
import { ResWithSession, UserSettings } from "..";

/**
 * Get User Settings With Sessions
 */ 
export type GetUserSettingsServerSideRes = ResWithSession<{
    settings: UserSettings;
}>;

// Update Account
export type UpdateAccountReq = {
    username: string;
    email: string;
};

// Update Profile
export type UpdateProfileReq = {
    avatarFile?: File | null;
};

// Update Password
export type UpdatePasswordReq = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

// Update AI Settings
export type UpdateAISettingsReq = {
    maxTokens: number;
    temperature: number;
};

// Add OpenAI key
export type AddModifyOpenaiKeyReq = {
    key: string;
};

export type AddModifyOpenaKeyRes = {
    key: string;
};