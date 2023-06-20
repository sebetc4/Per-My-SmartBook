import Head from 'next/head';
import { wrapper } from '../../store/store';
import { ForgotPassword } from '../../apps/front/components';
import { customServerSideTranslations, requireUnAuthUser } from '../../apps/api/functions';

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Réinitialisation du mot de passe - My StoryBook</title>
            </Head>
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
