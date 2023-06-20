// Librairies
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// App
import { isValidId } from '~/packages/functions';
import {
    SocketEvent,
    SocketNamespace,
    UserStoryChapterDataRes,
    UserStoryChapterImageRes,
    UserStoryStoryChapterChoiceIsSelectedRes,
    UserStoryTopicsDataRes,
    UserStoryTopicsImagesRes,
} from '~/packages/types';
import { sockets } from '~/services';
import {
    resetUserStoryBeingGeneratedState,
    resumeUserStory,
    setUserStoryChapterDataRes,
    setUserStoryChapterIsGenerated,
    setUserStoryIsDeleted,
    setUserStoryTopicsData,
    setUserStoryTopicsImages,
    setUserUserStoryChapterImageRes,
    setUserUserStoryStoryChapterChoiceIsSelectedRes,
} from '~/store';
import { useAppDispatch } from '~/apps/front/hooks';

export const useUserStoryGeneratorSocket = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    // State
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeStorySocket = async () => {
            // Resume story
            const storyId = router.query.id;
            typeof storyId === 'string' && isValidId(storyId) && (await dispatch(resumeUserStory(storyId)));
            // Story Topics
            sockets.on<UserStoryTopicsDataRes>(
                SocketNamespace.USER_STORIES,
                SocketEvent.USER_STORY_TOPICS_DATA,
                (data) => {
                    dispatch(setUserStoryTopicsData(data));
                }
            );
            sockets.on<UserStoryTopicsImagesRes>(
                SocketNamespace.USER_STORIES,
                SocketEvent.USER_STORY_TOPICS_IMAGES,
                (data) => {
                    dispatch(setUserStoryTopicsImages(data));
                }
            );
            // Story Chapter
            sockets.on<UserStoryStoryChapterChoiceIsSelectedRes>(
                SocketNamespace.USER_STORIES,
                SocketEvent.USER_STORY_CHAPTER_CHOICE_IS_SELECTED,
                (data) => {
                    dispatch(setUserUserStoryStoryChapterChoiceIsSelectedRes(data));
                }
            );
            sockets.on<UserStoryChapterDataRes>(
                SocketNamespace.USER_STORIES,
                SocketEvent.USER_STORY_CHAPTER_DATA,
                (data) => {
                    dispatch(setUserStoryChapterDataRes(data));
                }
            );
            sockets.on<UserStoryChapterImageRes>(
                SocketNamespace.USER_STORIES,
                SocketEvent.USER_STORY_CHAPTER_IMAGE,
                (data) => {
                    dispatch(setUserUserStoryChapterImageRes(data));
                }
            );
            sockets.on(SocketNamespace.USER_STORIES, SocketEvent.USER_STORY_CHAPTER_IS_GENERATED, () => {
                dispatch(setUserStoryChapterIsGenerated());
            });
            // Story Is Deleted
            sockets.on(SocketNamespace.USER_STORIES, SocketEvent.USER_STORY_IS_DELETED, () => {
                dispatch(setUserStoryIsDeleted());
            });
            setIsInitialized(true);
        };
        initializeStorySocket();
        return () => {
            sockets.emit(SocketNamespace.USER_STORIES, SocketEvent.LEAVE_USER_STORY_ROOM);
            dispatch(resetUserStoryBeingGeneratedState());
        };
    }, [dispatch, router.query.id]);

    return { isInitialized };
};
