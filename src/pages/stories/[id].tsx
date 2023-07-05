import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { customServerSideTranslations } from '~/apps/api/functions';
import { Story } from '~/apps/front/components';
import { useAppSelector } from '~/apps/front/hooks';
import { setUserSession } from '~/apps/front/utils';
import { isValidId } from '~/packages/functions';
import { Path, StoryReviewData } from '~/packages/types';
import { api } from '~/services';
import { setStoryDataAndReviews, wrapper } from '~/store';

export default function StoryPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');

    // Store
    const { storyData } = useAppSelector((state) => state.story);

    return (
        <>
            <Head>
                <title>{`${storyData?.title} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={storyData?.topic}
                />
            </Head>
            <Story />
        </>
    );
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const storyId = context.params?.id;
    if (typeof storyId === 'string' && isValidId(storyId)) {
        try {
            let userReview: StoryReviewData | null = null;
            const storyRes = await api.getOneStoryAndReviews(storyId);
            const { data } = await api.getSessionServerSide(context.req.headers.cookie);
            const userId = data.session?.user?.id;
            userId && setUserSession(store, data!.session!.user!);
            if (userId && storyRes.data.story.reviews.some((review) => review.author === userId)) {
                const review = storyRes.data.story.reviews.find((review) => review.author === userId);
                if (review) {
                    const reviewRes = await api.getOneStoryReview(review.review);
                    userReview = reviewRes.data.review;
                }
            }
            store.dispatch(
                setStoryDataAndReviews({ storyData: storyRes.data.story, userReview, reviews: storyRes.data.reviews })
            );
            return {
                props: {
                    ...(await customServerSideTranslations(context.locale!, ['story', 'date'])),
                },
            };
        } catch (err) {
            return {
                redirect: {
                    destination: `/${context.locale}${Path.STORY_NOT_FOUND}`,
                    permanent: false,
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: `/${context.locale}${Path.STORY_NOT_FOUND}`,
                permanent: false,
            },
        };
    }
});
