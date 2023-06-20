import Head from 'next/head';
import { UserStories } from '../../apps/front/components';
import { customServerSideTranslations } from '../../apps/api/functions';
import { setAuthIsChecked, setInvalidSession, wrapper } from '../../store';
import { api } from '../../services';
import { Path, SessionStatus } from '../../packages/types';
import { setAllUserStories } from '../../store/slices/userStories.slice';
import { setUserSession } from '~/apps/front/utils';

export default function YourStoriesPage() {
    
    return (
        <>
            <Head>
                <title>Vos histoires - My StoryBook</title>
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