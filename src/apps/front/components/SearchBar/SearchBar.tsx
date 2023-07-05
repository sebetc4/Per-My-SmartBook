// Librairies
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
// MUI
import SearchIcon from '@mui/icons-material/Search';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    IconButton,
    Input,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// App
import { publicStoriesSearchSchema } from '../../../../packages/schemas';
import { useAppMediaQuery } from '../../hooks';
import { CustomSelectInput } from '..'
// Types
import {
    allLanguages,
    allStoryDurationErrors,
    allStoryDurations,
    allStoryLanguageErrors,
    allStoryThemeErrors,
    allStoryThemes,
    UnionItemsWithAll,
    Language,
    Path,
    PublicStoriesSearchQuery,
    StoryDuration,
    StoryDurationError,
    StoryLanguageError,
    StoryTheme,
    StoryThemeError,
    FormItems,
} from '../../../../packages/types';

type SearchBarProps = {};

export const SearchBar = ({}: SearchBarProps) => {
    // Hooks
    const { t: publicStoriesT } = useTranslation('public-stories');
    const { t: storyInputsT } = useTranslation('story-inputs');
    const router = useRouter();
    const themeUI = useTheme();

    // Form
    const {
        p: queryPage,
        t: queryTheme,
        s: querySearch,
        d: queryDuration,
        l: queryLanguage,
    } = router.query;
    const page = typeof queryPage === 'string' ? +queryPage : 1;
    const search = typeof querySearch === 'string' ? querySearch : '';
    const theme =
        typeof queryTheme === 'string' && allStoryThemes.includes(queryTheme as StoryTheme) ? queryTheme : 'all';
    const duration =
        typeof queryDuration === 'string' && allStoryDurations.includes(queryDuration as StoryDuration)
            ? queryDuration
            : 'all';
    const language =
        typeof queryLanguage === 'string' && allLanguages.includes(queryLanguage as Language) ? queryLanguage : 'all';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PublicStoriesSearchQuery>({
        resolver: yupResolver(publicStoriesSearchSchema),
        defaultValues: {
            search,
            theme: theme as UnionItemsWithAll<StoryTheme>,
            duration: duration as UnionItemsWithAll<StoryDuration>,
            language: language as UnionItemsWithAll<Language>,
            page,
        },
        mode: 'onTouched',
    });

    // Constants
    const themeItems = useMemo(
        () =>
            allStoryThemes.map((value) => ({
                value,
                label: storyInputsT(`theme.item.${value as StoryTheme}`),
            })),
        [storyInputsT]
    );

    const allThemeItems = useMemo(
        () => [{ value: 'all', label: storyInputsT('theme.item.all') }, ...themeItems],
        [storyInputsT, themeItems]
    );

    const durationItems = useMemo(
        () =>
            allStoryDurations.map((value) => ({
                value,
                label: storyInputsT(`duration.item.${value}`),
            })),
        [storyInputsT]
    );

    const allDurationItems = useMemo(
        () => [{ value: 'all', label: storyInputsT('duration.item.all') }, ...durationItems],
        [storyInputsT, durationItems]
    );

    const languageItems = useMemo(
        () =>
            allLanguages.map((value) => ({
                value,
                label: storyInputsT(`language.item.${value}`),
            })),
        [storyInputsT]
    );

    const allLanguagesItems = useMemo(
        () => [{ value: 'all', label: storyInputsT('language.item.all') }, ...languageItems],
        [storyInputsT, languageItems]
    );

    // Handlers
    const onSubmit = ({ search, theme, duration, language }: PublicStoriesSearchQuery) => {
        const query = `${Path.PUBLIC_STORIES}?s=${search?.trim() || ''}&t=${theme}&d=${duration}&l=${language}&p=1`;
        router.push(query);
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            {/* Search Bar */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Input
                    placeholder={publicStoriesT('input.search.placeholder')}
                    aria-label={publicStoriesT('input.search.label')}
                    {...register('search')}
                    sx={{
                        width: '100%',
                        maxWidth: { xxs: '100%', md: '350px' },
                    }}
                />
                <IconButton
                    type='submit'
                    size='large'
                    color='primary'
                >
                    <SearchIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            </Box>

            {/* Search bar options desktop*/}
            <Box sx={{ display: { xxs: 'none', md: 'block' } }}>
                <SerchBarOptions
                    register={register}
                    errors={errors}
                    theme={theme as StoryTheme}
                    allThemeItems={allThemeItems}
                    duration={duration as StoryDuration}
                    allDurationItems={allDurationItems}
                    language={language as Language}
                    allLanguagesItems={allLanguagesItems}
                />
            </Box>

            {/* Search bar options mobile*/}
            <Accordion sx={{ display: { xxs: 'block', md: 'none' }, backgroundColor: themeUI.button.backgroundColor }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{publicStoriesT('SearchBar.summary.options')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SerchBarOptions
                        register={register}
                        errors={errors}
                        theme={theme as StoryTheme}
                        allThemeItems={allThemeItems}
                        duration={duration as StoryDuration}
                        allDurationItems={allDurationItems}
                        language={language as Language}
                        allLanguagesItems={allLanguagesItems}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

type SerchBarOptionsProps = {
    register: UseFormRegister<PublicStoriesSearchQuery>;
    errors: FieldErrors<PublicStoriesSearchQuery>;
    theme: UnionItemsWithAll<StoryTheme>;
    allThemeItems: FormItems[];
    duration: UnionItemsWithAll<StoryDuration>;
    allDurationItems: FormItems[];
    language: UnionItemsWithAll<Language>;
    allLanguagesItems: FormItems[];
};

const SerchBarOptions = ({
    register,
    errors,
    theme,
    allThemeItems,
    duration,
    allDurationItems,
    language,
    allLanguagesItems,
}: SerchBarOptionsProps) => {
    // Hook}s
    const { t: storyInputsT } = useTranslation('story-inputs');
    const { mediaQuery } = useAppMediaQuery();

    return (
        <Stack
            direction={{ xxs: 'column', md: 'row' }}
            divider={
                <Divider
                    orientation={mediaQuery.upMd ? 'vertical' : 'horizontal'}
                    flexItem
                />
            }
            spacing={4}
        >
            <CustomSelectInput
                label={storyInputsT('theme.label')}
                items={allThemeItems}
                register={register('theme')}
                variant='standard'
                width='200px'
                errorMessage={
                    allStoryThemeErrors.includes(errors.theme?.message as StoryThemeError)
                        ? storyInputsT(`theme.error.${errors.theme!.message as StoryThemeError}`)
                        : null
                }
                defaultValue={theme as StoryTheme}
            />
            <CustomSelectInput
                label={storyInputsT('duration.label')}
                items={allDurationItems}
                register={register('duration')}
                variant='standard'
                width='200px'
                errorMessage={
                    allStoryDurationErrors.includes(errors.duration?.message as StoryDurationError)
                        ? storyInputsT(`duration.error.${errors.duration!.message as StoryDurationError}`)
                        : null
                }
                defaultValue={duration as StoryDuration}
            />
            <CustomSelectInput
                label={storyInputsT('language.label')}
                items={allLanguagesItems}
                register={register('language')}
                variant='standard'
                width='200px'
                errorMessage={
                    allStoryLanguageErrors.includes(errors.language?.message as StoryLanguageError)
                        ? storyInputsT(`language.error.${errors.language!.message as StoryLanguageError}`)
                        : null
                }
                defaultValue={language as Language}
            />
        </Stack>
    );
};
