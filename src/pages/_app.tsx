// Librairies
import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
// MUI
import { CacheProvider, EmotionCache } from '@emotion/react';
// App
import { Layout } from '~/apps/front/components';
import { createEmotionCache } from '~/apps/front/utils';
import { checkAuth, wrapper } from '~/store';
import { sockets } from '~/services';
import { CustomThemeProvider } from '~/apps/front/hooks';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const App = ({ Component, emotionCache = clientSideEmotionCache, ...rest }: MyAppProps) => {
    // Hooks
    const { store, props } = wrapper.useWrappedStore(rest);

    // State
    const [initializedApp, setInitializedApp] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            const state = store.getState();
            await sockets.mainConnect();
            !state.auth.isChecked && (await store.dispatch(checkAuth()));
            setInitializedApp(true);
        };
        initializeApp();
    }, [store]);

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    rel='icon'
                    href='/favicon.ico'
                />
            </Head>
            <CacheProvider value={emotionCache}>
                <CustomThemeProvider>
                    <Layout initializedApp={initializedApp}>
                        <Component {...props.pageProps} />
                    </Layout>
                </CustomThemeProvider>
            </CacheProvider>
        </Provider>
    );
};

export default appWithTranslation(App);
