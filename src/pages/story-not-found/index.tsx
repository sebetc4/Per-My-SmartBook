// Librairies
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { customServerSideTranslations } from '~/apps/api/functions';
import { StoryNotFound } from '~/apps/front/components';
import { GetStaticPropsWithLocale } from '~/packages/types';
// App


export default function StoryNotFoundPage() {
    // Hooks
    const { t: fourOfFourT } = useTranslation('404');
    return (
        <>
            <Head>
                <title>{`${fourOfFourT('page.title')} - My StoryBook`}</title>
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
