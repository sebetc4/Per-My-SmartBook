import Head from 'next/head';
import { customServerSideTranslations} from '../../../apps/api/functions';
import { CommonStoryGenerator } from '../../../apps/front/components';
import { GetStaticPropsWithLocale } from '../../../packages/types';

export default function NewStoryPage() {
    return (
        <>
            <Head>
                <title>Nouvelle histoire - My StoryBook </title>
            </Head>
            <CommonStoryGenerator />
        </>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsWithLocale) {
    return {
        props: {
            ...(await customServerSideTranslations(locale, ['story-generator', 'story-inputs'])),
        },
    };
}