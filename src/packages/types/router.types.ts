import { GetStaticProps } from "next";

export enum Path {
    HOME = '/',
    NEW_STORY = '/new-story',
    PUBLIC_STORIES = '/stories',
    STORY = '/stories',
    USER_STORY_GENERATOR = '/story-generator/user',
    COMMON_STORY_GENERATOR = '/story-generator/common',
    USER_STORIES = '/user-stories',
    SETTINGS = '/settings',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
    REQUIRED_AUTH = '/required-authentication',
    STORY_NOT_FOUND = '/story-not-found',
    FORGOT_PASSWORD = '/password/forgot',
    RESET_PASSWORD = '/password/reset',
    CONTACT = '/contact',
}

export enum PathParams {
    INVALID_TOKEN = 'invalid-token',
    EMAIL_ALREADY_EXISTS = 'email-already-exists',
    RESET_PASSWORD_SUCCESS = 'reset-password-succes'
}

export interface GetStaticPropsWithLocale extends GetStaticProps {
    locale: string;
}