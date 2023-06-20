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
}

export interface GetStaticPropsWithLocale extends GetStaticProps {
    locale: string;
}