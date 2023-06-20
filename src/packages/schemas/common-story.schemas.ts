import * as yup from 'yup';
import { allLanguages, GetAllCommonStoriesBeingGeneratedPreviewsBody, GetCommonStoriesBeingGeneratedDataBody, SelectCommonStoryStoryChapterChoiceBody, SendCommonStoryChatMessageBody } from '../types';
import { idSchema } from './common.schemas';

export const getAllUnfinishedCommonStoriesPreviewsSchema: yup.SchemaOf<GetAllCommonStoriesBeingGeneratedPreviewsBody> = yup.object().shape({
    language: yup.mixed<GetAllCommonStoriesBeingGeneratedPreviewsBody['language']>().oneOf([...allLanguages]).required(),
});

export const getCommonStoriesBeingGeneratedDataSchema: yup.SchemaOf<GetCommonStoriesBeingGeneratedDataBody> = yup.object().shape({
    storyId: idSchema,
});

export const selectCommonStoryStoryChapterChoiceSchema: yup.SchemaOf<SelectCommonStoryStoryChapterChoiceBody> = yup.object().shape({
    selectedChoiceIndex: yup.number().min(0).max(2).required(),
    storyId: idSchema,
});

export const sendChatMessageCommonStorySchema: yup.SchemaOf<SendCommonStoryChatMessageBody> = yup.object().shape({
    message: yup.string().strict(false).trim().min(1, 'too-short').max(500, 'too-long').required('is-required'),
    storyId: idSchema,
});