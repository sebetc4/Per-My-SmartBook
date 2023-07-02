import Head from 'next/head';
import { GetStaticProps } from 'next';
import { customServerSideTranslations } from '../apps/api/functions';
import { Home } from '../apps/front/components';
import { useTranslation } from 'react-i18next';

export default function HomePage() {

    const { t: commonT } = useTranslation('common');
    const { t: homeT } = useTranslation('home');
    return (
        <>
            <Head>
                <title>{`${homeT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={homeT('page.description')}
                />
            </Head>
            <Home />
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
