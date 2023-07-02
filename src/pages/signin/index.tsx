import Head from 'next/head';
import { CustomError } from '~/packages/classes';
import { setAuthError, wrapper } from '~/store';
import { QueryError } from '~/packages/types';
import { customServerSideTranslations, requireUnAuthUser } from '~/apps/api/functions';
import { SignIn } from '~/apps/front/components';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: signinT } = useTranslation('signin');

    return (
        <>
            <Head>
                <title>{`${signinT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={signinT('page.description')}
                />
            </Head>
            <SignIn />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    switch (context.query.error) {
        case QueryError.EMAIL_ALREADY_EXISTS:
            store.dispatch(setAuthError(CustomError.EMAIL_ALREADY_EXISTS.message));
            break;
    }
    return requireUnAuthUser(store, context, async () => ({
        props: {
            ...(await customServerSideTranslations(context.locale!, ['signin'])),
        },
    }));
});
