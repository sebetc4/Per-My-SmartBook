import Head from 'next/head';
import { customServerSideTranslations } from '~/apps/api/functions';
import { Story } from '~/apps/front/components';
import { isValidId } from '~/packages/functions';
import { Path, StoryReviewData } from '~/packages/types';
import { api } from '~/services';
import { setStoryDataAndUserPreview, wrapper } from '~/store';

export default function StoryPage() {
    return (
        <>
            <Head>
                <title>{`Histoire - My-StoryBook`}</title>
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
            const storyRes = await api.getOneStory(storyId);
            const { data } = await api.getSessionServerSide(context.req.headers.cookie);
            const userId = data.session?.user?.id;
            if (userId && storyRes.data.story.reviews.some((review) => review.author === userId)) {
                const review = storyRes.data.story.reviews.find((review) => review.author === userId);
                if (review) {
                    const reviewRes = await api.getOneStoryReview(review.review);
                    userReview = reviewRes.data.review;
                }
            }
            store.dispatch(setStoryDataAndUserPreview({ storyData: storyRes.data.story, userReview }));
            return {
                props: {
                    ...(await customServerSideTranslations(context.locale!, ['story'])),
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
