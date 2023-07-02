// Librairies
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { customServerSideTranslations } from '~/apps/api/functions';
import { StoryNotFound } from '~/apps/front/components';
import { GetStaticPropsWithLocale } from '~/packages/types';
// App


export default function StoryNotFoundPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: storyNotFoundT } = useTranslation('story-not-found');
    return (
        <>
            <Head>
                <title>{`${storyNotFoundT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={storyNotFoundT('page.description')}
                />
            </Head>
            <StoryNotFound />
        </>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsWithLocale) {
    return {
        props: {
            ...(await customServerSideTranslations(locale, ['story-not-found'])),
        },
    };
}
