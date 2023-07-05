// Librairies
import { Socket } from 'socket.io';
// Api
import { CustomError } from '~/packages/classes';
import { enableLogCommonStoriesSocketManager } from '~/packages/constants';
import { logIf } from '~/packages/functions';
import { convertToImageOnClient } from '../../functions';
// Types
import {
    StoryOptions,
    CommonStoryBeingGenerated,
    CommonStoryBeingGeneratedPreview,
    CommonStoryBeingGeneratedData,
    ImageOnDb,
    Language,
    UserInstance,
    ChatMessage,
} from '~/packages/types';

export type CommonStoriesManagerAddNewStoryParams = {
    id: string;
    options: StoryOptions;
    topic: string;
    cover?: ImageOnDb;
    startAt: number;
};

class CommonStoriesSocketManager {
    private allStories: CommonStoryBeingGenerated[] = [];
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

    async getOneStoryPreview(storyId: string): Promise<CommonStoryBeingGeneratedPreview> {
        const story = this.getStory(storyId);
        return {
            id: story.id,
            state: story.state,
            topic: story.topic,
            cover: story.cover && (await convertToImageOnClient(story.cover)),
            theme: story.options.theme,
            startAt: story.startAt,
        };
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

    async getStoryData(
        storyId: string
    ): Promise<{ storyData: CommonStoryBeingGeneratedData; allChatMessages: ChatMessage[] }> {
        const story = this.getStory(storyId);
        if (!story) {
            throw CustomError.NOT_FOUND;
        }
        const allChaptersPromise = story.allChapters.map(async ({ voters, image, ...restChapter }) => ({
            ...restChapter,
            image: image && (await convertToImageOnClient(image)),
        }));
        const storyData: CommonStoryBeingGeneratedData = {
            id: story.id,
            state: story.state,
            cover: story.cover && (await convertToImageOnClient(story.cover)),
            topic: story.topic,
            currentStep: story.currentStep,
            allChapters: await Promise.all(allChaptersPromise),
            startAt: story.startAt,
            deletedAt: story.deletedAt,
        };
        return {
            storyData,
            allChatMessages: story.allChatMessages,
        };
    }

    updateStory(updateStoryData: Partial<CommonStoryBeingGenerated> & { id: string }) {
        const index = this.allStories.findIndex((story) => story.id === updateStoryData.id);
        if (index !== -1) {
            const updatedStory = { ...this.allStories[index], ...updateStoryData };
            logIf(enableLogCommonStoriesSocketManager, { storyIsUpdated: updatedStory });
            this.allStories[index] = updatedStory;
        }
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
    addNewMessage(message: string, user: UserInstance, storyId: string) {
        const story = this.getStory(storyId);
        if (!story) {
            throw CustomError.NOT_FOUND;
        }
        const newMessage: ChatMessage = {
            userId: user.id,
            username: user.username,
            userColor: user.uiSettings.userColor,
            message,
            date: Date.now(),
        };
        story.allChatMessages.push(newMessage);
        return newMessage;
    }
    /**
     * Socket
     */
    joinRoom(storyId: string, socket: Socket) {
        socket.join(storyId);
        logIf(enableLogCommonStoriesSocketManager, `User has joined the common-stories room: ${storyId}`);
    }
}

export const commonStoriesSocketManager = new CommonStoriesSocketManager();
