import 'i18next';
import common from '../../../public/locales/fr/common.json';
import header from '../../../public/locales/fr/header.json';
import login from '../../../public/locales/fr/login.json';
import signup from '../../../public/locales/fr/signup.json';
import storyGenerator from '../../../public/locales/fr/story-generator.json';
import requiredAuth from '../../../public/locales/fr/required-auth.json';
import alert from '../../../public/locales/fr/alert.json';
import settings from '../../../public/locales/fr/settings.json';
import fourOhFour from '../../../public/locales/fr/404.json';
import userStories from '../../../public/locales/fr/user-stories.json';
import publicStories from '../../../public/locales/fr/public-stories.json';
import story from '../../../public/locales/fr/story.json';
import home from '../../../public/locales/fr/home.json';
import timer from '../../../public/locales/fr/timer.json';
import storyInputs from '../../../public/locales/fr/story-inputs.json';
import buttons from '../../../public/locales/fr/buttons.json';
import illustrations from '../../../public/locales/fr/illustrations.json';
import StoryNotFound from '../../../public/locales/fr/story-not-found.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof common;
            // Layout
            header: typeof header;

            // Pages
            home: typeof home;
            login: typeof login;
            signup: typeof signup;
            'story-generator': typeof storyGenerator;
            'required-auth': typeof requiredAuth;
            alert: typeof alert;
            settings: typeof settings;
            '404': typeof fourOhFour;
            'user-stories': typeof userStories,
            'public-stories': typeof publicStories,
            'story': typeof story,
            'story-not-found': typeof StoryNotFound,

            // Inputs
            'story-inputs': typeof storyInputs,

            // Buttons
            buttons: typeof buttons;

            // Other
            timer: typeof timer;
            illustrations: typeof illustrations;
        };
    }
}
