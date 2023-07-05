import Head from 'next/head';
import { UserStories } from '../../apps/front/components';
import { customServerSideTranslations } from '../../apps/api/functions';
import { setAuthIsChecked, setInvalidSession, wrapper } from '../../store';
import { api } from '../../services';
import { Path, SessionStatus } from '../../packages/types';
import { setAllUserStories } from '../../store/slices/userStories.slice';
import { setUserSession } from '~/apps/front/utils';
import { useTranslation } from 'react-i18next';

export default function YourStoriesPage() {
    // Hooks
    const { t: commonT } = useTranslation('common');
    const { t: userStoriesT } = useTranslation('user-stories');
    return (
        <>
            <Head>
                <title>{`${userStoriesT('page.title')} - ${commonT('app-name')}`}</title>
                <meta
                    name='description'
                    content={userStoriesT('page.description')}
                />
            </Head>
            <UserStories />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({locale, req}) => {
    store.dispatch(setAuthIsChecked());
    const { data } = await api.getAllUserStoriesServerSide(req.headers.cookie);
    const { session, ...allStories } = data;
    if (session?.status === SessionStatus.VALID) {
        setUserSession(store, session.user!)
        store.dispatch(setAllUserStories(allStories));
        return {
            props: {
                ...(await customServerSideTranslations(locale!, ['user-stories', 'illustrations'])),
            },
        };
    }
    if (session) {
        store.dispatch(setInvalidSession());
    }
    return {
        redirect: {
            destination: `/${locale}${Path.REQUIRED_AUTH}`,
            permanent: false,
        },
    };
});