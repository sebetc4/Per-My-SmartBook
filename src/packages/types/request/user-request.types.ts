import { File } from "formidable";
import { ResWithSession, UserSettings } from "..";

/**
 * Get User Settings With Sessions
 */ 
export type GetUserSettingsServerSideRes = ResWithSession<{
    settings: UserSettings;
}>;

// Update Account
export type UpdateAccountBody = {
    username: string;
    email: string;
};

// Update Profile
export type UpdateProfileBody = {
    avatarFile?: File | null;
};

// Update Password
export type UpdatePasswordBody = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

// Update AI Settings
export type UpdateAISettingsBody = {
    maxTokens: number;
    temperature: number;
};

// Add OpenAI key
export type AddModifyOpenaiKeyBody = {
    key: string;
};

export type AddModifyOpenaKeyRes = {
    key: string;
};

// Update user color
export type UpdateUserColorBody = {
    color: string;
};