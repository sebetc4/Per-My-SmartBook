// Librairies
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Button, Tooltip, useTheme } from '@mui/material';
// App
import { lightenHexColor } from '~/packages/functions';
import { StoryChapterChoice } from '~/packages/types';
import { CheckMarkSvg } from '../../svg/CheckMarkSvg/CheckMarkSvg';

type ChapterChoiceButtonProps = {
    choice: StoryChapterChoice;

    disabled?: boolean;
    isLoading: boolean;
    isCurrentChapter: boolean;

    isUserVote?: boolean;
    userHasVoted?: boolean;
    userVoteIsSelectedChoice?: boolean;

    choiceIsSelected: boolean;
    isSelectedChoice: boolean;

    withCheckedIcon?: boolean;
    withNotConnectedTooltip?: boolean;
    onClick: () => void;
};

export const ChapterChoiceButton = ({
    choice,

    disabled,
    isLoading,
    isCurrentChapter,

    isUserVote,
    userHasVoted,

    choiceIsSelected,
    isSelectedChoice,

    withCheckedIcon,
    withNotConnectedTooltip,
    onClick,
}: ChapterChoiceButtonProps) => {
    // Hooks
    const theme = useTheme();
    const { t: buttonsT } = useTranslation('buttons');

    const isDisabledWithSelectedStyle = withCheckedIcon
        ? choiceIsSelected
            ? isSelectedChoice
            : isUserVote
        : isSelectedChoice;

    return (
        <Tooltip
            title={buttonsT('ChapterChoiceButton.tooltip.not-connected')}
            disableFocusListener={!withNotConnectedTooltip}
            disableHoverListener={!withNotConnectedTooltip}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                <Button
                    disabled={disabled || isLoading || !isCurrentChapter || userHasVoted}
                    onClick={onClick}
                    sx={{
                        width: '100%',
                        height: '100%',
                        p: 4,
                        color: theme.text.body,
                        cursor: 'pointer',
                        boxShadow: `0px 5px 10px 0px rgba(0, 0, 0, 0.5), ${theme.button.boxShadow}`,
                        backgroundColor: theme.button.backgroundColor,
                        borderRadius: 2,
                        transition: 'all 0.3s ease-in-out',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        '&:hover': {
                            transform: 'translate3D(0,-5px,0)',
                            backgroundColor: lightenHexColor(theme.button.backgroundColor!, 0.8),
                            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                        },
                        '&:disabled': isDisabledWithSelectedStyle
                            ? {
                                  backgroundColor: lightenHexColor(theme.palette.primary.light, 0.6),
                                  boxShadow: `0px 5px 15px 3px  ${theme.palette.primary.main}`,
                                  color: 'black',
                              }
                            : {},
                    }}
                >
                    {choice.text}
                </Button>
                {choice.numbOfVotes !== undefined && (
                    <Box
                        component='span'
                        sx={{
                            width: '40px',
                            height: '40px',
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%',
                            color: 'white',
                            backgroundColor: theme.palette.secondary.main,
                        }}
                    >
                        {choice.numbOfVotes}
                    </Box>
                )}
                {withCheckedIcon && (
                    <Box
                        component='span'
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '0',
                            transform: 'translate(50%, -50%)',
                        }}
                    >
                        <CheckMarkSvg isCkecked={isUserVote!} />
                    </Box>
                )}
            </Box>
        </Tooltip>
    );
};
