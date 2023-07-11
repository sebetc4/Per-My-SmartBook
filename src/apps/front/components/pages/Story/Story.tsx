import { Container, useTheme } from '@mui/material';
import { Book, Reviews } from './components';

export const Story = () => {
    // Hooks
    const theme = useTheme();

    return (
        <Container
            maxWidth='xl'
            sx={{
                display: 'flex',
                py: theme.main.padding,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Book />
            <Reviews />
        </Container>
    );
};
