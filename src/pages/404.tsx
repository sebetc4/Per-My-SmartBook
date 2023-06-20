// Librairies
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
// App
import { customServerSideTranslations } from '../apps/api/functions';
import { FourOhFour } from '../apps/front/components';
import { GetStaticPropsWithLocale } from '../packages/types';

export default function FourOhFourPage() {
    // Hooks
    const { t: fourOfFourT } = useTranslation('404');
    return (
        <>
            <Head>
                <title>{`${fourOfFourT('page.title')} - My StoryBook`}</title>
            </Head>
            <FourOhFour />
        </>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsWithLocale) {
    return {
        props: {
            ...(await customServerSideTranslations(locale, ['404'])),
        },
    };
}
