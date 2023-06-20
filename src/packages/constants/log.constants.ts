import { isDevEnv } from '.';

const prodValue = false

const prodValueOr = (value: boolean): boolean => (!isDevEnv ? prodValue : value);

// Sockets Managers
export const enableLogUserStoriesSocketManager = prodValueOr(true);
export const enableLogCommonStoriesSocketManager = prodValueOr(true);

// Story Generation
export const enableLogTextPrompt = prodValueOr(true);
export const enableLogGeneratedData = prodValueOr(false);

// OpenAI
export const enableLogOpenaiDateRequest = prodValueOr(true);

// Services
export const enableLogSocketService = prodValueOr(true);
