import Head from 'next/head';
import { customServerSideTranslations } from '~/apps/api/functions';
import { Settings } from '~/apps/front/components';
import { Path, SessionStatus } from '~/packages/types';
import { api } from '~/services';
import { setAuthIsChecked,setInvalidSession,setUserSettings } from '~/store';
import { wrapper } from '~/store/store';
import { setUserSession } from '~/apps/front/utils';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
    
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: settingsT } = useTranslation('settings');

    return (
        <>
            <Head>
            <title>{`${settingsT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={settingsT('page.description')}
                />
            </Head>
            <Settings />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    store.dispatch(setAuthIsChecked());
    const { data } = await api.getUserSettingsServerSide(context.req.headers.cookie);
    const { session, settings } = data;
    if (session?.status === SessionStatus.VALID) {
        setUserSession(store, session.user!)
        store.dispatch(setUserSettings(settings));
        return {
            props: {
                ...(await customServerSideTranslations(context.locale!, ['settings'])),
            },
        };
    }
    if (session) {
        store.dispatch(setInvalidSession());
    }
    return {
        redirect: {
            destination: `/${context.locale}${Path.REQUIRED_AUTH}`,
            permanent: false,
        },
    };
});
