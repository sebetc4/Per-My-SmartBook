import * as yup from 'yup';

import { allLanguages, allStoryDurations, allStoryThemes, PublicStoriesSearchQuery } from '../types';


const themeSchema = yup
    .mixed<PublicStoriesSearchQuery['theme']>()
    .oneOf([...allStoryThemes, 'all'], 'is-required')
    .required('is-required');

const durationSchema = yup
    .mixed<PublicStoriesSearchQuery['duration']>()
    .oneOf([...allStoryDurations, 'all'], 'is-required')
    .required('is-required');

const language = yup
    .mixed<PublicStoriesSearchQuery['language']>()
    .oneOf([...allLanguages, 'all'], 'is-required')
    .required('is-required');

export const publicStoriesSearchSchema: yup.SchemaOf<PublicStoriesSearchQuery> = yup.object().shape({
    search: yup.string(),
    theme: themeSchema,
    duration: durationSchema,
    language: language,
    page: yup.number().required('is-required'),
});
