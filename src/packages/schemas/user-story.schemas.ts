import * as yup from 'yup';
import {
    SelectUserStoryOptionsBody,
    SelectUserStoryTopicBody,
    SelectUserStoryStoryChapterChoiceBody,
    SaveFinishedUserStoryBody,
    FinishedStoryTitle,
    allVisibilityValues,
    DeleteUnfinishedUserStoryBody,
    allLanguages,
    allStoryThemes,
    allStoryImageStyles,
    allStoryDurations,
} from '../types';

import { idSchema } from './common.schemas';

const themeSchema = yup
    .mixed<SelectUserStoryOptionsBody['theme']>()
    .oneOf([...allStoryThemes], 'is-required')
    .required('is-required');

const styleSchema = yup
    .mixed<SelectUserStoryOptionsBody['style']>()
    .oneOf([...allStoryImageStyles], 'is-required')
    .required('is-required');

const durationSchema = yup
    .mixed<SelectUserStoryOptionsBody['duration']>()
    .oneOf([...allStoryDurations], 'is-required')
    .required('is-required');

const storyTitle = yup.string().strict(false).trim().min(3, 'too-short').max(40, 'too-long').required('is-required');

const languageSchema = yup.mixed<SelectUserStoryOptionsBody['language']>().oneOf([...allLanguages]).required();

export const resumeUserStorySchema = yup.object().shape({
    storyId: idSchema,
});

export const selectUserStoryOptionsSchema: yup.SchemaOf<SelectUserStoryOptionsBody> = yup.object().shape({
    theme: themeSchema,
    style: styleSchema,
    duration: durationSchema,
    language: languageSchema,
});

export const selectUserStoryTopicSchema: yup.SchemaOf<SelectUserStoryTopicBody> = yup.object().shape({
    selectedTopicIndex: yup.number().min(0).max(3).required(),
    storyId: idSchema,
});

export const selectUserStoryStoryChapterChoiceSchema: yup.SchemaOf<SelectUserStoryStoryChapterChoiceBody> = yup.object().shape({
    selectedChoiceIndex: yup.number().min(0).max(2).required(),
    storyId: idSchema,
});

export const finishedStoryTitleSchema: yup.SchemaOf<FinishedStoryTitle> = yup.object().shape({
    title: storyTitle,
});

export const saveUserFinishedStorySchema: yup.SchemaOf<SaveFinishedUserStoryBody> = yup.object().shape({
    storyId: idSchema,
    visibility: yup.mixed<SaveFinishedUserStoryBody['visibility']>().oneOf([...allVisibilityValues]).required(),
    title: storyTitle,
});

export const deleteUnfinishedStorySchema: yup.SchemaOf<DeleteUnfinishedUserStoryBody> = yup.object().shape({
    storyId: idSchema,
});
