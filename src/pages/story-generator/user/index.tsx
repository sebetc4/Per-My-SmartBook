import Head from 'next/head';
import { customServerSideTranslations, requireAuthUser } from '../../../apps/api/functions';
import { UserStoryGenerator } from '../../../apps/front/components';
import { wrapper } from '../../../store';
import { useTranslation } from 'react-i18next';

export default function UserStoryGeneratorPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: storyGeneratorT } = useTranslation('story-generator');

    return (
        <>
            <Head>
                <title>{`${storyGeneratorT('page.user-story.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={storyGeneratorT('page.user-story.description')}
                />
            </Head>
            <UserStoryGenerator />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, async () => ({
        props: {
            ...(await customServerSideTranslations(context.locale!, ['story-generator', 'story-inputs', 'buttons'])),
        },
    }));
});
