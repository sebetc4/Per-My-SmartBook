import Head from 'next/head';
import { wrapper } from '../../store/store';
import { ForgotPassword } from '../../apps/front/components';
import { customServerSideTranslations, requireUnAuthUser } from '../../apps/api/functions';
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
    const { t: commonT } = useTranslation('common');
    const { t: forgotPasswordT } = useTranslation('forgot-password');

    return (
        <>
            <Head>
            <title>{`${forgotPasswordT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={forgotPasswordT('page.description')}
                />            </Head>
            <ForgotPassword />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnAuthUser(store, context, async () => ({
        props: {
            ...( await customServerSideTranslations(context.locale!)),
        },
    }));});
