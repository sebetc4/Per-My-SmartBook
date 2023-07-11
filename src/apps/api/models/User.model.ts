import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { CustomError } from '../../../packages/classes';
import {
    ColorMode,
    IUserModel,
    UserInstance,
    UserMethods,
    UserSchema,
    UserSession,
    UserSettings,
    allVisibilityValues,
} from '../../../packages/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateRandomBytes, hashData, setTokenCookie } from '../functions';
import { getUrlFromS3 } from '../configs';
import { maxTokensOpenai, minTokensOpenai, minuteResetPasswordTime } from '~/packages/constants';
import { minutesToMilliseconds, stringToColor } from '~/packages/functions';

const schema = new Schema<UserSchema, IUserModel, UserMethods>(
    {
        authProvider: {
            type: String,
            required: true,
            enum: ['credentials', 'google'],
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailVerification: {
            status: {
                type: Boolean,
                default: false,
            },
            token: {
                type: String,
            },
            expireAt: {
                type: Number,
            },
        },
        password: {
            type: String,
        },
        avatar: {
            key: {
                type: String,
                default: null,
            },
            visibility: {
                type: String,
                enum: allVisibilityValues,
                default: 'public',
            },
        },
        uiSettings: {
            userColor: {
                type: String,
            },
            colorMode: {
                type: String,
                default: ColorMode.LIGHT,
            },
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        },
        aiSettings: {
            openai: {
                maxTokens: {
                    type: Number,
                    default: 3000,
                    min: minTokensOpenai,
                    max: maxTokensOpenai,
                },
                temperature: {
                    type: Number,
                    default: 0.9,
                    min: 0,
                    max: 1,
                },
                key: {
                    encryptedKey: {
                        type: String,
                    },
                    iv: {
                        type: String,
                    },
                    placeholder: {
                        type: String,
                    },
                },
            },
        },
        resetPassword: {
            token: {
                type: String,
            },
            expireAt: {
                type: Number,
            },
        },
    },
    {
        timestamps: true,
    }
);

schema.pre('validate', async function () {
    if (!this.email || this.isModified('email')) {
        const user = await User.findOne({ email: this.email });
        if (user) {
            throw CustomError.EMAIL_ALREADY_EXISTS;
        }
    }
});

schema.pre('save', async function () {
    if (this.isNew) {
        this.uiSettings.userColor = stringToColor(this.username);
    }
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

schema.methods.login = function (req: NextApiRequest, res: NextApiResponse) {
    setTokenCookie(this._id, req, res);
};

schema.methods.getSessionData = async function (this: UserInstance): Promise<UserSession> {
    return {
        id: this.id,
        authProvider: this.authProvider,
        username: this.username,
        avatarUrl: this.avatar.key ? await getUrlFromS3(this.avatar) : null,
        userColor: this.uiSettings.userColor,
        colorMode: this.uiSettings.colorMode,
    };
};

schema.methods.getSettings = function (this: UserInstance): UserSettings {
    return {
        email: this.email,
        ai: {
            openai: {
                ...this.aiSettings.openai,
                key: this.aiSettings.openai.key?.placeholder || null,
            },
        },
    };
};

schema.methods.isValidPassword = async function (this: UserInstance, password: UserSchema['password']) {
    return await bcrypt.compare(password!, this.password!);
};

schema.methods.isEqualValues = function (this: UserInstance, values: Partial<UserSchema>) {
    for (let key in values) {
        if (values[key as keyof UserSchema] === this[key as keyof UserInstance]) {
            return false;
        }
    }
    return true;
};

schema.methods.getResetPasswordToken = function(this: UserInstance) {
    const resetToken = generateRandomBytes(32)
    this.resetPassword.token= hashData(resetToken);
    this.resetPassword.expireAt = Date.now() + minutesToMilliseconds(minuteResetPasswordTime)
    this.save({validateBeforeSave: false})
    return resetToken
}

schema.methods.getEmailVerificationToken = function(this: UserInstance) {
    const token = generateRandomBytes(32)
    this.emailVerification.token= hashData(token);
    this.resetPassword.expireAt = Date.now() + minutesToMilliseconds(minuteResetPasswordTime)
    this.save({validateBeforeSave: false})
    return token
}

export const User = models.User || model<UserSchema>('User', schema);
