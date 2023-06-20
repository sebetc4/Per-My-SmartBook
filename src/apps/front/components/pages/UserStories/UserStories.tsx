// MUI
import { Container, useTheme } from '@mui/material';
// App
import { FinishedStorySection, UnfinishedStorySection } from './components';
import { useAppSelector } from '~/apps/front/hooks';
import { LoadingContainer } from '../..';

export const UserStories = () => {
    // Hooks
    const theme = useTheme();

    // Store
    const { unfinishedStoriesPreviews, finishedUserStoryPreviews, firstContentLoaded } = useAppSelector(
        (state) => state.userStories
    );

    return firstContentLoaded ? (
        <Container
            maxWidth='xl'
            sx={{
                pt: theme.main.padding,
                pb: theme.main.padding,
            }}
        >
            <UnfinishedStorySection allUnfinishedStoriesPreviews={unfinishedStoriesPreviews} />
            <FinishedStorySection finishedUserStoryPreviews={finishedUserStoryPreviews} />
        </Container>
    ) : (
        <LoadingContainer />
    );
};
