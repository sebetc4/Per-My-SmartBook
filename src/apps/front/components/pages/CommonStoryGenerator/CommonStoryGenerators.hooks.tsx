import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    CommonStoryChapterDataRes,
    CommonStoryChapterImageRes,
    CommonStoryIsFinishedOrStoppedRes,
    CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes,
    FirstCommonStoryChapterRes,
    NewCommonStoryChatMessageRes,
    Path,
    SocketEvent,
    SocketNamespace,
} from '~/packages/types';
import { sockets } from '~/services';
import {
    setCommonStoryChapterData,
    setCommonUserStoryChapterImageRes,
    setFirstCommonStoryChapter,
    setCommonStoryChapterChoiceAndAllNumbOfVotes,
    setCommonStoryIsStopped,
    setCommonStoryIsFinished,
    addNewChatMessage,
    setCommonStoryBeingGeneratedData,
    resetCommonStoryBeingGeneratedState,
} from '~/store';
import { useAppDispatch } from '~/apps/front/hooks';

export const useSocketCommonSroryGenerators = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    //State
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeStorySocket = async () => {
            // Fetch story data
            try {
                const storyData = await sockets.emit(
                    SocketNamespace.COMMON_STORIES,
                    SocketEvent.GET_COMMON_STORY_BEING_GENERATED_DATA,
                    { storyId: router.query.id as string }
                );
                dispatch(setCommonStoryBeingGeneratedData(storyData))
            } catch (err) {
                router.push(Path.STORY_NOT_FOUND)
            }
            // Story First Chapter
            sockets.on<FirstCommonStoryChapterRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.FIRST_COMMON_STORY_CHAPTER,
                (data) => {
                    dispatch(setFirstCommonStoryChapter(data));
                }
            );
            // Story Next Chapter
            sockets.on<CommonStoryChapterDataRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_CHAPTER_DATA,
                (data) => {
                    dispatch(setCommonStoryChapterData(data));
                }
            );
            sockets.on<CommonStoryChapterImageRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_CHAPTER_IMAGE,
                (data) => {
                    dispatch(setCommonUserStoryChapterImageRes(data));
                }
            );
            sockets.on<CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_CHAPTER_CHOICE_AND_ALL_NUMB_OF_VOTES,
                (data) => {
                    dispatch(setCommonStoryChapterChoiceAndAllNumbOfVotes(data));
                }
            );
            sockets.on<CommonStoryIsFinishedOrStoppedRes>(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_IS_STOPPED, (data) => {
                dispatch(setCommonStoryIsStopped(data));
            });
            sockets.on<CommonStoryIsFinishedOrStoppedRes>(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_IS_FINISHED, (data) => {
                dispatch(setCommonStoryIsFinished(data));
            });
            sockets.on<NewCommonStoryChatMessageRes>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.NEW_COMMON_STORY_CHAT_MESSAGE,
                (data) => {
                    dispatch(addNewChatMessage(data));
                }
            );
            setIsInitialized(true);
        };
        initializeStorySocket();
        return () => {
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.FIRST_COMMON_STORY_CHAPTER);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_CHAPTER_DATA);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_CHAPTER_IMAGE);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_CHAPTER_CHOICE_AND_ALL_NUMB_OF_VOTES);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_IS_STOPPED);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.COMMON_STORY_IS_FINISHED);
            sockets.off(SocketNamespace.COMMON_STORIES, SocketEvent.NEW_COMMON_STORY_CHAT_MESSAGE);
            dispatch(resetCommonStoryBeingGeneratedState())
        };
    }, [dispatch, router]);

    return { isInitialized };
};
