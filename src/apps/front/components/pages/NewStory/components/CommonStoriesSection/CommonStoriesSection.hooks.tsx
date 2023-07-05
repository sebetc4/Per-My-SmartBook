import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    CommonStoryBeingGeneratedPreview,
    CommonStoryIsDeletedRes,
    SocketEvent,
    SocketNamespace,
    UpdateCommonStoryStateRes,
} from '~/packages/types';
import { sockets } from '~/services';

export const useSocketCommonStoriesSection = () => {
    // Hooks
    const { locale } = useRouter();

    //State
    const [commonStoriesPreviews, setCommonStoriesPreviews] = useState<CommonStoryBeingGeneratedPreview[]>([]);

    useEffect(() => {
        const initializeStorySocket = async () => {
            const { allStoriesTopics } = await sockets.emit(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS,
                { language: locale }
            );
            setCommonStoriesPreviews(allStoriesTopics);
            // Add new story
            sockets.on<CommonStoryBeingGeneratedPreview>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.NEW_COMMON_STORY,
                (data) => {
                    setCommonStoriesPreviews((prev) => [...prev, data]);
                }
            );
            // Update story state
            sockets.on<UpdateCommonStoryStateRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.UPDATE_COMMON_STORY_STATE,
                (data) => {
                    setCommonStoriesPreviews((prev) =>
                        prev.map((commonStoryPreview) =>
                            commonStoryPreview.id === data.storyId
                                ? { ...commonStoryPreview, state: data.state }
                                : commonStoryPreview
                        )
                    );
                }
            );
            // Story is deleted
            sockets.on<CommonStoryIsDeletedRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_IS_DELETED,
                (data) => {
                    setCommonStoriesPreviews((prev) =>
                        prev.filter((commonStoryPreview) => commonStoryPreview.id !== data.storyId)
                    );
                }
            );
        };
        initializeStorySocket();
        return () => {
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.NEW_COMMON_STORY);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.UPDATE_COMMON_STORY_STATE);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_IS_DELETED);
        };
    }, [locale]);

    return { commonStoriesPreviews };
};
