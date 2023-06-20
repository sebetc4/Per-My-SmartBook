import Head from 'next/head';
import { wrapper } from '../../store/store';
import { RequiredAuth } from '../../apps/front/components';
import { useTranslation } from 'next-i18next';
import { customServerSideTranslations, requireUnAuthUser } from '../../apps/api/functions';

export default function RequiredAuthPage() {

    // Hooks
    const { t } = useTranslation('required-auth');

    return (
        <>
            <Head>
                <title>{`${t('page.title')} - My StoryBook`}</title>
            </Head>
            <RequiredAuth />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnAuthUser(store, context, async () => ({
        props: {
            ...( await customServerSideTranslations(context.locale!, ['required-auth'])),
        },
    }));
});
