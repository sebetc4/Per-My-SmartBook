import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Children } from 'react';
import { createEmotionCache } from '../apps/front/utils';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='apple-touch-icon'
                        sizes='180x180'
                        href='/apple-touch-icon.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='32x32'
                        href='/favicon-32x32.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='16x16'
                        href='/favicon-16x16.png'
                    />
                    <link
                        rel='manifest'
                        href='/site.webmanifest'
                    />
                    <link
                        rel='mask-icon'
                        href='/safari-pinned-tab.svg'
                        color='#5bbad5'
                    />
                    <meta
                        name='msapplication-TileColor'
                        content='#da532c'
                    />
                    <meta
                        name='theme-color'
                        content='#ffffff'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='anonymous'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Alkatra:wght@400;500;600;700&display=swap'
                        rel='stylesheet'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
                        rel='stylesheet'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Dr+Sugiyama&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    /* eslint-disable */
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) => (props) =>
                (
                    <App
                        emotionCache={cache}
                        {...props}
                    />
                ),
        });
    /* eslint-enable */
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));
    return {
        ...initialProps,
        styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
};

export default MyDocument;
