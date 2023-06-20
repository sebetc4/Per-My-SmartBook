import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    CommonStoryChapterDataRes,
    CommonStoryChapterImageRes,
    CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes,
    FirstCommonStoryChapterRes,
    SocketEvent,
    SocketNamespace,
} from '~/packages/types';
import { sockets } from '~/services';
import {
    getCommonStoryBeingGeneratedData,
    setCommonStoryChapterData,
    setCommonUserStoryChapterImageRes,
    setFirstCommonStoryChapter,
    setCommonStoryChapterChoiceAndAllNumbOfVotes,
    setCommonStoryIsStopped,
    setCommonStoryIsFinished,
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
            await dispatch(getCommonStoryBeingGeneratedData(router.query.id as string));
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
            sockets.on(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_IS_STOPPED,
                () => {
                    dispatch(setCommonStoryIsStopped());
                }
            );
            sockets.on(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.COMMON_STORY_IS_STOPPED,
                () => {
                    dispatch(setCommonStoryIsFinished());
                }
            );
            setIsInitialized(true);
        };
        initializeStorySocket();
        return () => {};
    }, [dispatch, router.query.id]);

    return { isInitialized };
};
