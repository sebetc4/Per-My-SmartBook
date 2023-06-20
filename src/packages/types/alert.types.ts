export type Alert = { type: Exclude<AlertState['type'], null>; message: string };

export type AlertState = {
    open: boolean;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info' | null;
};

export type AlertContextType = {
    state: AlertState;
    setAlert: ({ type, message }: Alert) => void;
    closeAlert: () => void;
    removeAlert: () => void;
};

export const allAlertMessages = [
    'success.update-data',
    'success.update-password',
    'success.add-openai-key',
    'success.modify-openai-key',

    'error.login.default',

    'error.userStoryBeingGenerated.select-chapter-choice',
    'error.userStoryBeingGenerated.select-story-topic',
    'error.userStoryBeingGenerated.select-story-options',
    'error.userStoryBeingGenerated.init-story',
    'error.userStoryBeingGenerated.restart-story',
    'error.userStoryBeingGenerated.resume-story',
    'error.userStoryBeingGenerated.save-finished-story',

    'error.update-data.default',
    'error.update-password.default',

    'error.add-openai-key',
    'error.modify-openai-key',

    'error.openai-service-unavailable',
] as const;

export type AlertMessage = typeof allAlertMessages[number];
