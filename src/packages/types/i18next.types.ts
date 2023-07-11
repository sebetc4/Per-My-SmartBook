import 'i18next';
import common from '../../../public/locales/fr/common.json';
import header from '../../../public/locales/fr/header.json';
import signin from '../../../public/locales/fr/signin.json';
import signup from '../../../public/locales/fr/signup.json';
import storyGenerator from '../../../public/locales/fr/story-generator.json';
import requiredAuth from '../../../public/locales/fr/required-auth.json';
import alert from '../../../public/locales/fr/alert.json';
import settings from '../../../public/locales/fr/settings.json';
import fourOhFour from '../../../public/locales/fr/404.json';
import userStories from '../../../public/locales/fr/user-stories.json';
import publicStories from '../../../public/locales/fr/public-stories.json';
import story from '../../../public/locales/fr/story.json';
import newStory from '../../../public/locales/fr/new-story.json';
import date from '../../../public/locales/fr/date.json';
import storyInputs from '../../../public/locales/fr/story-inputs.json';
import buttons from '../../../public/locales/fr/buttons.json';
import illustrations from '../../../public/locales/fr/illustrations.json';
import storyNotFound from '../../../public/locales/fr/story-not-found.json';
import forgotPassword from '../../../public/locales/fr/forgot-password.json';
import home from '../../../public/locales/fr/home.json';
import resetPassword from '../../../public/locales/fr/reset-password.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof common;
            // Layout
            header: typeof header;

            // Pages
            home: typeof home;
            'new-story': typeof newStory;
            signin: typeof signin;
            signup: typeof signup;
            'story-generator': typeof storyGenerator;
            'required-auth': typeof requiredAuth;
            alert: typeof alert;
            settings: typeof settings;
            '404': typeof fourOhFour;
            'user-stories': typeof userStories,
            'public-stories': typeof publicStories,
            'story': typeof story,
            'story-not-found': typeof storyNotFound,
            'forgot-password': typeof forgotPassword,
            'reset-password': typeof resetPassword,

            // Inputs
            'story-inputs': typeof storyInputs,

            // Buttons
            buttons: typeof buttons;

            // Other
            date: typeof date;
            illustrations: typeof illustrations;
        };
    }
}
