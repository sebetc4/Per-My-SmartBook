import Head from 'next/head';
import { customServerSideTranslations, requireUnAuthUser } from '../../apps/api/functions';
import { wrapper } from '../../store';
import { useTranslation } from 'react-i18next';
import { SignUp } from '~/apps/front/components';

export default function SignUpPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: signupT } = useTranslation('signup');

    return (
        <>
            <Head>
                <title>{`${signupT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={signupT('page.description')}
                />
            </Head>
            <SignUp />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnAuthUser(store, context, async () => ({
        props: {
            ...(await customServerSideTranslations(context.locale!, ['signup'])),
        },
    }));
});
