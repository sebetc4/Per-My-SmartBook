import Head from 'next/head';
import { customServerSideTranslations, requireUnAuthUser } from '../../apps/api/functions';
import { SignUp } from '../../apps/front/components';
import { wrapper } from '../../store';

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Inscription - My StoryBook</title>
            </Head>
            <SignUp />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnAuthUser(store, context, async () => ({
        props: {
            ...( await customServerSideTranslations(context.locale!, ['signup'])),
        },
    }));
});
