import pass from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { CustomError } from '../../../packages/classes';
import { UserInstance } from '../../../packages/types';
import { User } from '../models';

const clientID = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const callbackURL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;

export const passport = pass.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        async (accessToken, refreshToken, profile, cb) => {
            const { name: username, email, picture: avatarUrl } = profile._json;
            let user: UserInstance | undefined | null = await User.findOne({ email });
            if (!user) {
                user = await User.create({ username, email, authProvider: 'google' });
            } else if (user?.authProvider !== 'google') {
                return cb(CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message)
            }
            return cb(null, user!);
        }
    )
);
