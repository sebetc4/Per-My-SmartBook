// Librairie
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
// App
import { customServerSideTranslations} from '~/apps/api/functions';
import { CommonStoryGenerator } from '~/apps/front/components';
import { GetStaticPropsWithLocale } from '~/packages/types';

export default function CommonStoryGeneratorPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: storyGeneratorT } = useTranslation('story-generator');

    return (
        <>
            <Head>
                <title>{`${storyGeneratorT('page.common-story.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={storyGeneratorT('page.common-story.description')}
                />
            </Head>
            <CommonStoryGenerator />
        </>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsWithLocale) {
    return {
        props: {
            ...(await customServerSideTranslations(locale, ['story-generator', 'date', 'buttons'])),
        },
    };
}