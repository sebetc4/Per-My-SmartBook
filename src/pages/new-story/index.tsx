import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import { customServerSideTranslations } from '~/apps/api/functions';
import { NewStory } from '~/apps/front/components';

export default function HomePage() {
    const { t: commonT } = useTranslation('common');
    const { t: newStoryT } = useTranslation('new-story');

    return (
        <>
            <Head>
                <title>{`${newStoryT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={newStoryT('page.description')}
                />
            </Head>
            <NewStory />
        </>
    );
}

interface GetStaticPropsWithLocale extends GetStaticProps {
    locale: string;
}

export async function getStaticProps({ locale }: GetStaticPropsWithLocale) {
    return {
        props: {
            ...(await customServerSideTranslations(locale, ['new-story', 'date', 'story-inputs', 'buttons'])),
        },
    };
}
