// Librairies
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// MUI
import { CustomError } from '~/packages/classes';
import { removeUserStoryBeingGeneratedError } from '~/store';
// App
import { Path } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { ConfirmModal } from '~/apps/front/components/modal/ConfirmModal/ConfirmModal';

type RedirectToSettingsModalsState = {
    noOpenaiKey: boolean;
    invalidOpenaiKey: boolean;
    noCreditOpenai: boolean;
};

const initialRedirectToSettingsModalsState: RedirectToSettingsModalsState = {
    noOpenaiKey: false,
    invalidOpenaiKey: false,
    noCreditOpenai: false,
};

export const OpenaiErrorModals = () => {
    // Hooks
    const { t } = useTranslation('story-generator');
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Store
    const { error } = useAppSelector((state) => state.userStoryBeingGenerated);

    // State

    const [redirectToSettingsModalsState, setRedirectToSettingsModalsState] = useState<RedirectToSettingsModalsState>(
        initialRedirectToSettingsModalsState
    );

    // Handle OpenAI Error
    useEffect(() => {
        switch (error) {
            case CustomError.OPENAI_UNAUTHORIZED.message:
                setRedirectToSettingsModalsState({
                    noOpenaiKey: false,
                    invalidOpenaiKey: true,
                    noCreditOpenai: false,
                });
                break;
            case CustomError.OPENAI_NO_CREDIT.message:
                setRedirectToSettingsModalsState({
                    noOpenaiKey: false,
                    invalidOpenaiKey: false,
                    noCreditOpenai: true,
                });
                break;
            case CustomError.OPENAI_NO_KEY.message:
                setRedirectToSettingsModalsState({
                    noOpenaiKey: true,
                    invalidOpenaiKey: false,
                    noCreditOpenai: false,
                });
                break;
            default:
                setRedirectToSettingsModalsState({
                    noOpenaiKey: false,
                    invalidOpenaiKey: false,
                    noCreditOpenai: false,
                });
        }
    }, [error, setRedirectToSettingsModalsState]);

    const handleConfirmRedirectToSettings = () => {
        router.push({ pathname: Path.SETTINGS, query: { tab: 'ai' } });
    };

    const handleCloseModal = () => {
        dispatch(removeUserStoryBeingGeneratedError());
    };

    return (
        <>
            <ConfirmModal
                open={redirectToSettingsModalsState.invalidOpenaiKey}
                title={t('ConfirmRedirectToSettingsModal.title.openai-key-not-valid')}
                text={t('ConfirmRedirectToSettingsModal.text.openai-key-not-valid')}
                confirmButtonText={t('ConfirmRedirectToSettingsModal.button.confirm')}
                cancelButtonText={t('ConfirmRedirectToSettingsModal.button.cancel')}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmRedirectToSettings}
                isLoading={false}
            />
            <ConfirmModal
                open={redirectToSettingsModalsState.noCreditOpenai}
                title={t('ConfirmRedirectToSettingsModal.title.openai-no-credit')}
                text={t('ConfirmRedirectToSettingsModal.text.openai-no-credit')}
                confirmButtonText={t('ConfirmRedirectToSettingsModal.button.confirm')}
                cancelButtonText={t('ConfirmRedirectToSettingsModal.button.cancel')}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmRedirectToSettings}
                isLoading={false}
            />
            <ConfirmModal
                open={redirectToSettingsModalsState.noOpenaiKey}
                title={t('ConfirmRedirectToSettingsModal.title.openai-no-key')}
                text={t('ConfirmRedirectToSettingsModal.text.openai-no-key')}
                confirmButtonText={t('ConfirmRedirectToSettingsModal.button.confirm')}
                cancelButtonText={t('ConfirmRedirectToSettingsModal.button.cancel')}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmRedirectToSettings}
                isLoading={false}
            />
        </>
    );
};
