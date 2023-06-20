// Librairies
import { Socket } from 'socket.io';
// Api
import { CustomError } from '../../../../packages/classes';
import { enableLogCommonStoriesSocketManager } from '../../../../packages/constants';
import { logIf } from '../../../../packages/functions';
import { convertToImageOnClient } from '../../functions';
// Types
import {
    StoryOptions,
    CommonStoryBeingGenerated,
    CommonStoryBeingGeneratedPreview,
    CommonStoryBeingGeneratedData,
    ImageOnDb,
    Language,
} from '../../../../packages/types';

export type CommonStoriesManagerAddNewStoryParams = {
    id: string;
    options: StoryOptions;
    topic: string;
    cover?: ImageOnDb;
    startAt: number;
};

type CommonStoriesChatMessage = {
    userName: string;
    userColor: string;
    message: string;
    date: number;
};

class CommonStoriesSocketManager {
    private allStories: CommonStoryBeingGenerated[] = [];
    private allChatMessages: CommonStoriesChatMessage[] = [];

    /**
     * Stories
     */
    getStory(storyId: string) {
        return this.allStories.find((story) => story.id === storyId)!;
    }

    getStoryAndCloseVotes(storyId: string) {
        const index = this.allStories.findIndex((story) => story.id === storyId);
        const story = this.allStories[index];
        story.votesAreOpen = false;
        return story;
    }

    addNewStory({ id, options, topic, cover, startAt }: CommonStoriesManagerAddNewStoryParams) {
        const newStory: CommonStoryBeingGenerated = {
            id,
            votesAreOpen: false,
            state: 'waiting',
            options,
            currentStep: 0,
            cover,
            topic,
            allChapters: [],
            allChatMessages: [],
            startAt,
        };
        this.allStories.push(newStory);
        logIf(enableLogCommonStoriesSocketManager, { storyIsAdded: this.allStories });
        return newStory.id;
    }

    async getAllPreviews(language: Language): Promise<CommonStoryBeingGeneratedPreview[]> {
        const allStories = this.allStories.filter((story) => story.options.language === language);
        const allStoriesPromises = allStories.map(async (story) => ({
            id: story.id,
            state: story.state,
            topic: story.topic,
            cover: story.cover && (await convertToImageOnClient(story.cover)),
            theme: story.options.theme,
            startAt: story.startAt,
        }));
        return Promise.all(allStoriesPromises);
    }

    async getStoryData(storyId: string): Promise<CommonStoryBeingGeneratedData> {
        const story = this.getStory(storyId);
        if (!story) {
            throw CustomError.NOT_FOUND;
        }
        const allChaptersPromise = story.allChapters.map(async ({ voters, image, ...restChapter }) => ({
            ...restChapter,
            image: image && (await convertToImageOnClient(image)),
        }));

        return {
            id: story.id,
            state: story.state,
            cover: story.cover && (await convertToImageOnClient(story.cover)),
            topic: story.topic,
            currentStep: story.currentStep,
            allChapters: await Promise.all(allChaptersPromise),
            startAt: story.startAt,
        };
    }

    updateStory(updateStoryData: Partial<CommonStoryBeingGenerated> & { id: string }) {
        this.allStories.map((story) => (story.id === updateStoryData.id ? { ...story, ...updateStoryData } : story));
    }

    addOneStoryChapterChoiceVote(storyId: string, userId: string, selectedChoiceIndex: number) {
        const story = this.getStory(storyId);
        if (!story) {
            throw CustomError.INVALID_ID;
        }
        if (story.allChapters.at(-1)?.voters!.includes(userId)) {
            throw CustomError.USER_HAS_ALREADY_VOTED;
        }
        story.allChapters.at(-1)!.allChoices![selectedChoiceIndex].numbOfVotes!++;
        story.allChapters.at(-1)!.voters!.push(userId);
        this.updateStory(story);
        logIf(enableLogCommonStoriesSocketManager, { userHasVoted: `choice: ${selectedChoiceIndex}` });
    }

    deleteStory(storyId: string) {
        this.allStories = this.allStories.filter((story) => story.id !== storyId);
        logIf(enableLogCommonStoriesSocketManager, { storyIsDeleted: this.allStories });
    }

    /**
     * Messages
     */

    /**
     * Socket
     */
    joinRoom(storyId: string, socket: Socket) {
        socket.join(storyId);
        logIf(enableLogCommonStoriesSocketManager, `User has joined the common-stories room: ${storyId}`);
    }
}

export const commonStoriesSocketManager = new CommonStoriesSocketManager();
