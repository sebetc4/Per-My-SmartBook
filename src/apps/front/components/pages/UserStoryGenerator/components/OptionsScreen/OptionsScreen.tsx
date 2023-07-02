// Librairies
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { RingLoader } from 'react-spinners';
// Mui
import { Box, Button, Container, Fade, Grid, Typography, useTheme } from '@mui/material';
// App
import { selectUserStoryOptionsSchema } from '~/packages/schemas';
import { selectUserStoryOptions } from '~/store';
import { StoryThemeClass } from '~/packages/classes';
import {
    allLanguages,
    allStoryDurationErrors,
    allStoryDurations,
    allStoryImageStyleErrors,
    allStoryImageStyles,
    allStoryThemeErrors,
    allStoryThemes,
    Language,
    SelectUserStoryOptionsBody,
    StoryDurationError,
    StoryImageStyleError,
    StoryTheme,
    StoryThemeError,
} from '~/packages/types';
import { useAppDispatch, useAppMediaQuery, useAppSelector } from '~/apps/front/hooks';
// Images
import Logo from '@/../public/images/logo/logo.png';
import { CustomSelectInput } from '~/apps/front/components/inputs/CustomSelectInput/CustomSelectInput';
import { StartStoryButton } from '../StartStoryButton/StartStoryButton';
import { LoadingButton } from '@mui/lab';

export const OptionsScreen = () => {
    // Hooks
    const { locale } = useRouter();
    const { t: storyGeneratorT } = useTranslation('story-generator');
    const { t: storyInputsT } = useTranslation('story-inputs');
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    // State
    const [activeImage, setActiveImage] = useState<StoryTheme | 'logo'>('logo');

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SelectUserStoryOptionsBody>({
        resolver: yupResolver(selectUserStoryOptionsSchema),
        defaultValues: {
            language: allLanguages.includes(locale as Language) ? (locale as Language) : undefined,
        },
        mode: 'onChange',
    });

    const onSubmit = (options: SelectUserStoryOptionsBody) => {
        dispatch(selectUserStoryOptions(options));
    };

    const allThemeItems = useMemo(
        () =>
            allStoryThemes.map((value) => ({
                value,
                label: storyInputsT(`theme.item.${value}`),
            })),
        [storyInputsT]
    );

    const allStyleItems = useMemo(
        () =>
            allStoryImageStyles.map((value) => ({
                value,
                label: storyInputsT(`style.item.${value}`),
            })),
        [storyInputsT]
    );

    const allDurationsItems = useMemo(
        () =>
            allStoryDurations.map((value) => ({
                value,
                label: storyInputsT(`duration.item.${value}`),
            })),
        [storyInputsT]
    );

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '300px',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)',
                    filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.3))',
                }}
            >
                <Fade
                    in={activeImage === 'logo'}
                    timeout={800}
                    appear={false}
                >
                    <Image
                        src={Logo}
                        alt='Logo My StoryBook'
                        placeholder='blur'
                        fill
                        priority
                    />
                </Fade>
                {allStoryThemes.map((theme) => (
                    <Fade
                        in={activeImage === theme}
                        timeout={800}
                        key={`image-${theme}`}
                    >
                        <Image
                            src={StoryThemeClass.getIcon(theme)!}
                            alt={`Icon ${theme}`}
                            placeholder='blur'
                            fill
                        />
                    </Fade>
                ))}
            </Box>
            <Typography
                component='h1'
                variant='h2'
                textAlign='center'
                color={theme.text.title}
                sx={{
                    mt: 4,
                }}
            >
                {storyGeneratorT('OptionsScreen.title.h1')}
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth={{ xxs: 'xs', md: '100%' }}
                sx={{
                    mt: 4,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid
                    container
                    columnSpacing={{ xxs: 0, md: 12 }}
                    rowSpacing={{ xxs: 4, md: 0 }}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Grid
                        item
                        xxs={12}
                        md={4}
                    >
                        <CustomSelectInput
                            label={storyInputsT('theme.label')}
                            items={allThemeItems}
                            register={register('theme')}
                            errorMessage={
                                allStoryThemeErrors.includes(errors.theme?.message as StoryThemeError)
                                    ? storyInputsT(`theme.error.${errors.theme!.message as StoryThemeError}`)
                                    : null
                            }
                            onChange={(e) => {
                                setActiveImage((e.target.value as SelectUserStoryOptionsBody['theme']) || 'logo');
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xxs={12}
                        md={4}
                    >
                        <CustomSelectInput
                            label={storyInputsT('style.label')}
                            items={allStyleItems}
                            register={register('style')}
                            errorMessage={
                                allStoryImageStyleErrors.includes(errors.style?.message as StoryImageStyleError)
                                    ? storyInputsT(`style.error.${errors.style!.message as StoryImageStyleError}`)
                                    : null
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        xxs={12}
                        md={4}
                    >
                        <CustomSelectInput
                            label={storyInputsT('duration.label')}
                            items={allDurationsItems}
                            register={register('duration')}
                            errorMessage={
                                allStoryDurationErrors.includes(errors.duration?.message as StoryDurationError)
                                    ? storyInputsT(`duration.error.${errors.duration!.message as StoryDurationError}`)
                                    : null
                            }
                        />
                    </Grid>
                </Grid>

                {isLoading ? (
                    <Box sx={{ mt: {xxs: 4, sm: 8}, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <RingLoader
                            size={150}
                            color={theme.palette.secondary.dark}
                        />
                        <Typography
                            color={theme.palette.secondary.dark}
                            textAlign='center'
                            sx={{
                                fontSize: '1.5rem',
                            }}
                        >
                            {storyGeneratorT('OptionsScreen.text.loading')}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {mediaQuery.upSm ? (
                            <Box sx={{ mt: 8 }}>
                                <StartStoryButton />
                            </Box>
                        ) : (
                            <Button
                                fullWidth
                                variant='contained'
                                size='large'
                                type='submit'
                                sx={{ mt: 4 }}
                            >
                                {storyGeneratorT('OptionsScreen.button.start')}
                            </Button>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};
