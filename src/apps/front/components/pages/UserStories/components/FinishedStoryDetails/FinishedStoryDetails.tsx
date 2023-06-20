import { forwardRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Box, Dialog, Grid, Slide, Tooltip, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

import { FinishedUserStoryPreview } from '../../../../../../../packages/types';
import { getRandomHourglassImage, isPublicStory, placeholderValue } from '../../../../../utils';

type FinishedStoryDetailsProps = {
    open: boolean;
    story: FinishedUserStoryPreview;
    handleClose: () => void;
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Slide
            direction='left'
            ref={ref}
            {...props}
        />
    );
});

export const FinishedStoryDetails = ({ open, story, handleClose }: FinishedStoryDetailsProps) => {
    // Hooks
    const { t } = useTranslation('user-stories');

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
            transitionDuration={600}
            PaperProps={{ sx: { position: 'fixed', width: {xxs: '100%', md:'50%'}, right: 0 } }}
        >
            <Grid
                container
                sx={{ p: 6 }}
            >
                <Grid
                    item
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                    xxs={9}
                >
                    <Typography
                        component='h2'
                        variant='h2'
                    >
                        {story.title}
                    </Typography>
                    <Box
                        sx={{
                            position: 'relative',
                            aspectRatio: '1 / 1',
                            width: '100%',
                            maxWidth: '512px',
                            borderRadius: 8,
                        }}
                    >
                        <Image
                            src={story.cover?.url || getRandomHourglassImage()}
                            placeholder={placeholderValue(!!story.cover)}
                            blurDataURL={story.cover?.plaiceholder}
                            alt={"Illustration de l'histoire"}
                            quality={100}
                            style={{ borderRadius: 8 }}
                            fill
                        />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip title={t(`FinishedStoryDetails.options.visibility.tooltip.${story.visibility}`)}>
                            {isPublicStory(story) ? <PublicIcon /> : <PublicOffIcon />}
                        </Tooltip>
                    </Box>
                    <Typography textAlign='center'>{story.summary}</Typography>
                </Grid>
                <Grid xxs={3}></Grid>
            </Grid>
        </Dialog>
    );
};
