import { StaticImageData } from 'next/image';
import { Language, Sentence, StoryTheme } from '../types';
import TravelIcon from '../../../public/images/icons/travel-icon.png';
import FunnyIcon from '../../../public/images/icons/funny-icon.png';
import LoveIcon from '../../../public/images/icons/love-icon.png';
import HistoryIcon from '../../../public/images/icons/history-icon.png';
import HorrorIcon from '../../../public/images/icons/horror-icon.png';
import DreamIcon from '../../../public/images/icons/dream-icon.png';
import BordedomIcon from '../../../public/images/icons/bordedom-icon.png';
import FantasticIcon from '../../../public/images/icons/fantastic-icon.png';
import TechnologieIcon from '../../../public/images/icons/technology-icon.png';
import EcologieIcon from '../../../public/images/icons/ecology-icon.png';

export class StoryThemeClass {
    static list: StoryThemeClass[] = [];
    static readonly TRAVEL = new StoryThemeClass(
        'travel',
        {
            en: 'the topic of travel, discovery, and adventure.',
            fr: "le thème du voyage, de la découvert et de l'aventure.",
        },
        TravelIcon
    );
    static readonly FUNNY = new StoryThemeClass(
        'funny',
        {
            en: 'the topic of the joy of life, happy and funny things, jokes, and mischief."',
            fr: 'le thème de la joie de vie, de choses heureuses et marrantes, des blagues et des bêtises.',
        },
        FunnyIcon
    );
    static readonly LOVE = new StoryThemeClass(
        'love',
        {
            en: 'the topic of love, romance, and passion.',
            fr: "le thème de l'amour, la romance et la passion.",
        },
        LoveIcon
    );
    static readonly HISTORY = new StoryThemeClass(
        'history',
        {
            en: 'the topic of historicals events.',
            fr: 'le thème des événements historiques.',
        },
        HistoryIcon
    );
    static readonly HORROR = new StoryThemeClass(
        'horror',
        {
            en: 'the topic of horror, terrifying things, and fear.',
            fr: "le thème de l'horreur, des choses terrifiantes, de la peur.",
        },
        HorrorIcon
    );
    static readonly DREAM = new StoryThemeClass(
        'dream',
        {
            en: 'the topic of dreams and imagination.',
            fr: "le thème des rêves et de l'imagination.",
        },
        DreamIcon
    );
    static readonly BOREDOM = new StoryThemeClass(
        'bordedom',
        {
            en: 'the topic of boredom and routine.',
            fr: "le thème de l'ennnui et de la routine.",
        },
        BordedomIcon
    );
    static readonly FANTASTIC = new StoryThemeClass(
        'fantastic',
        {
            en: 'the topic of the fantastic.',
            fr: 'le thème du fantastique.',
        },
        FantasticIcon 
    );
    static readonly TECHNOLOGY = new StoryThemeClass(
        'technology',
        {
            en: 'the topic of technology, artificial intelligence, and blockchain.',
            fr: 'le thème de la technologie, des intelligences artificielles, de la blockchain.',
        },
        TechnologieIcon
    );
    static readonly ECOLOGY = new StoryThemeClass(
        'ecology',
        {
            en: 'the topic of ecology and nature',
            fr: "le thème de l'écologie et la natue",
        },
        EcologieIcon
    );
    private constructor(readonly value: StoryTheme, readonly allSentences: Sentence, readonly icon: StaticImageData) {
        StoryThemeClass.list.push(this);
    }
    static getAllInstances() {
        return this.list;
    }
    static getAllValues() {
        return this.list.map((theme) => theme.value as StoryTheme);
    }
    static getRandomValue() {
        const allValues = this.getAllValues();
        return allValues[Math.floor(Math.random() * allValues.length)];
    }
    static getSentence(value: StoryTheme, language: Language) {
        return this.getAllInstances().find((theme) => theme.value === value)?.allSentences[language];
    }
    static getIcon(value: StoryTheme) {
        return this.getAllInstances().find((theme) => theme.value === value)?.icon;
    }
}
