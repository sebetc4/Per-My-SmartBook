import { Namespace, Socket } from 'socket.io';
import { enableLogUserStoriesSocketManager } from '../../../../packages/constants';
import { logIf } from '../../../../packages/functions';
import { SocketEvent, UnfinishedUserStoryInstance } from '../../../../packages/types';
import { CustomError } from '../../../../packages/classes';
import { emitToOtherSocketsInRoom } from '../../functions';

type Story = {
    id: string;
    isBeingGenerated: boolean;
    instance: UnfinishedUserStoryInstance;
};

export type UserStoriesManagerRemoveStoryParams = {
    socket: Socket;
    disconnectOtherSockets: boolean;
    io: Namespace;
    storyId: string;
};

class UserStoriesSocketManager {
    private allStories: Story[] = [];

    /**
     * Utils
     */
    private getStory(storyId: string) {
        return this.allStories.find((story) => story.id === storyId);
    }

    /**
     * Stories
     */
    getStoryInstance(storyId: string, userId: string, checkIfBeingGenerated: boolean) {
        const story = this.getStory(storyId);
        if (!story) {
            throw CustomError.BAD_REQUEST;
        }
        if (!story.instance.isAuthor(userId)) {
            throw CustomError.UNAUTHORIZED;
        }
        if (checkIfBeingGenerated && story.isBeingGenerated) {
            throw CustomError.STORY_IS_ALREADY_BEING_GENERATED;
        }
        return story.instance;
    }

    addStory(story: UnfinishedUserStoryInstance, isBeingGenerated: boolean, socket: Socket) {
        const newStory = {
            id: story.id,
            isBeingGenerated,
            instance: story,
        };
        this.allStories.push(newStory);
        this.joinRoom(story.id, socket);
        logIf(enableLogUserStoriesSocketManager, { storyIsAdded: this.allStories });
    }

    resumeUserStory(story: UnfinishedUserStoryInstance, socket: Socket) {
        const storyAlreadyInManager = this.getStory(story.id);
        !storyAlreadyInManager ? this.addStory(story, false, socket) : this.joinRoom(story.id, socket);
    }

    updateStory(updatedStory: UnfinishedUserStoryInstance, isBeingGenerated: boolean) {
        this.allStories = this.allStories.map((story) => {
            if (story.id === updatedStory.id) {
                return {
                    ...story,
                    isBeingGenerated,
                    instance: updatedStory,
                };
            }
            return story;
        });
        logIf(enableLogUserStoriesSocketManager, { storyIsUpdated: this.allStories });
    }

    async removeStory({ socket, disconnectOtherSockets, io, storyId }: UserStoriesManagerRemoveStoryParams) {
        const index = this.allStories.findIndex((story) => story.id !== storyId);
        this.allStories.splice(index, 1);
        if (disconnectOtherSockets) {
            emitToOtherSocketsInRoom(SocketEvent.USER_STORY_IS_DELETED, socket, storyId);
            const allSockets = await io.in(storyId).fetchSockets();
            allSockets.forEach((socket) => socket.leave(storyId));
        }
        logIf(enableLogUserStoriesSocketManager, { storyIsRemoved: this.allStories });
    }

    /**
     * Rooms
     */
    joinRoom(storyId: string, socket: Socket) {
        socket.join(storyId);
        logIf(enableLogUserStoriesSocketManager, `User has joined the user-stories room: ${storyId}`);
    }

    async leaveRoom(storyId: string, io: Namespace, socket: Socket) {
        socket.leave(storyId);
        const otherSocketsInRoom = await io.in(storyId).fetchSockets();
        if (otherSocketsInRoom.length === 0) {
            const removeStoryParams: UserStoriesManagerRemoveStoryParams = {
                socket,
                disconnectOtherSockets: false,
                io,
                storyId,
            };
            await this.removeStory(removeStoryParams);
        }
        logIf(enableLogUserStoriesSocketManager, `User has leaved the user-stories room: ${storyId}`);
    }
}

export const userStoriesSocketManager = new UserStoriesSocketManager();
