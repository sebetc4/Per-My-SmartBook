import Head from 'next/head';
import { CustomError } from '~/packages/classes';
import { setAuthError, wrapper } from '~/store';
import { QueryError } from '~/packages/types';
import { customServerSideTranslations, requireUnAuthUser } from '~/apps/api/functions';
import { SignIn } from '~/apps/front/components';

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Connexion - My StoryBook</title>
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
            ...( await customServerSideTranslations(context.locale!, ['login'])),
        },
    }));
});
