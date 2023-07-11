import Head from 'next/head';

import { Path, SessionStatus } from '~/packages/types';
import { api } from '../../services';
import { setInvalidSession, wrapper } from '../../store';
import { useTranslation } from 'react-i18next';
import { customServerSideTranslations } from '~/apps/api/functions';
import { ResetPassword } from '~/apps/front/components';

type ResetPasswordPageProps = {
    tokenIsValid: boolean;
};

export default function ResetPasswordPage({ tokenIsValid }: ResetPasswordPageProps) {
    const { t: commonT } = useTranslation('common');
    const { t: forgotPasswordT } = useTranslation('reset-password');

    return (
        <>
            <Head>
                <title>{`${forgotPasswordT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={forgotPasswordT('page.description')}
                />
            </Head>
            <ResetPassword tokenIsValid={tokenIsValid} />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const token = context.query.t;
    const { data } = await api.getSessionServerSide(context.req.headers.cookie);
    const { session } = data;
    if (session?.status === SessionStatus.VALID) {
        return {
            redirect: {
                destination: Path.HOME,
                permanent: false,
            },
        };
    }
    session && store.dispatch(setInvalidSession());
    if (typeof token !== 'string') {
        return {
            props: {
                ...(await customServerSideTranslations(context.locale!, ['reset-password'])),
                tokenIsValid: false,
            },
        };
    }
    try {
        await api.checkResetPasswordToken(token);
        return {
            props: {
                ...(await customServerSideTranslations(context.locale!, ['reset-password'])),
                tokenIsValid: true,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            props: {
                ...(await customServerSideTranslations(context.locale!, ['reset-password'])),
                tokenIsValid: false,
            },
        };
    }
});
