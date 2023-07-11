import { UserInstance, UserSchema } from "~/packages/types";
import { User } from "../models";
import { CustomError } from "~/packages/classes";

export const findUserByEmail = async (email: UserSchema['email']) => {
    const user: UserInstance | null = await User.findOne({ email });
    if (!user) {
        throw CustomError.WRONG_EMAIL;
    }
    return user;
};