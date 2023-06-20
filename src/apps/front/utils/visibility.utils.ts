import { FinishedUserStoryPreview } from '../../../packages/types';

export const isPublicStory = (story: FinishedUserStoryPreview) => story.visibility === 'public';
