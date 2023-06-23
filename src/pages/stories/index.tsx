import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { customServerSideTranslations} from '../../apps/api/functions';
import { PublicStories } from '../../apps/front/components';
import { allLanguages, allStoryDurations, allStoryThemes, FinishedPublicStoryPreview, Language, StoryDuration, StoryTheme } from '../../packages/types';
import { api } from '../../services';

type PublicStoriesPageProps = {
    stories: FinishedPublicStoryPreview[];
    total: number;
};

export default function PublicStoriesPage({ stories, total }: PublicStoriesPageProps) {
    return (
        <>
            <Head>
                <title>Histoires - My StoryBook</title>
            </Head>
            <PublicStories
                stories={stories}
                total={total}
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
    const {
        p: queryPage,
        t: queryTheme,
        s: querySearch,
        d: queryDuration,
        l: queryLanguage,
    } = query;

    const page = typeof queryPage === 'string' ? +queryPage : 1;
    const search = typeof querySearch === 'string' ? querySearch : '';
    const theme = allStoryThemes.includes(queryTheme as StoryTheme) ? queryTheme : 'all';
    const duration = allStoryDurations.includes(queryDuration as StoryDuration) ? queryDuration : 'all';
    const language = allLanguages.includes(queryLanguage as Language) ? queryLanguage : 'all';

    const { data } = await api.getPublicStories({
        search,
        theme: theme as StoryTheme | 'all',
        duration: duration as StoryDuration | 'all',
        language: language as Language | 'all',
        page,
    });

    return {
        props: {
            stories: data.stories,
            total: data.total,
            ...(await customServerSideTranslations(locale!, ['public-stories', 'story-inputs', 'illustrations', 'date'])),
        },
    };
};
