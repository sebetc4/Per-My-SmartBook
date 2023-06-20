import { Configuration, OpenAIApi } from 'openai';
import { EncryptedKey, OpenaiSettings } from '../../../packages/types';
import { CustomError } from '../../../packages/classes';
import { handleOpenaiError } from '../functions';
import { decryptKey } from '../functions/crypto.functions';
import { logIf } from '../../../packages/functions';
import { enableLogOpenaiDateRequest, useFreeUserAccess } from '../../../packages/constants';

/* Create OpenAI API */
const createOpenaiApiWithEncryptedKey = (encryptedKey?: EncryptedKey) => {
    if (!encryptedKey?.encryptedKey) {
        throw CustomError.OPENAI_NO_KEY;
    }
    const configuration = new Configuration({ apiKey: decryptKey(encryptedKey) });
    return new OpenAIApi(configuration);
};

const createOpenaiApiWithCommonKey = () => {
    return new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY! }));
};

const createOpenaiApi = (userOpenaiSettings: OpenaiSettings | false) => {
    return userOpenaiSettings && !useFreeUserAccess
        ? createOpenaiApiWithEncryptedKey(userOpenaiSettings.key)
        : createOpenaiApiWithCommonKey();
};

/**
 * Send a text request to OpenAI API
 */
const defaultSettings: OpenaiSettings = {
    maxTokens: 3500,
    temperature: 1,
};
export const sendOpenAiTextRequest = async (prompt: string, userOpenaiSettings: OpenaiSettings | false) => {
    const { maxTokens, temperature } = userOpenaiSettings || defaultSettings;

    const requestTextOptions = {
        model: 'text-davinci-003',
        max_tokens: maxTokens,
        temperature,
    };

    const openaiApi = createOpenaiApi(userOpenaiSettings);

    try {
        logIf(enableLogOpenaiDateRequest, `Send openai request at ${new Date().toString()}`);
        const response = await openaiApi.createCompletion({ ...requestTextOptions, prompt });
        logIf(enableLogOpenaiDateRequest, `Get openai response at ${new Date().toString()}`);
        return response;
    } catch (err) {
        handleOpenaiError(err);
    }
};

/**
 * Send a image request to OpenAI API
 */
export const sendOpenAiImageRequest = async (prompt: string, userOpenaiSettings: OpenaiSettings | false) => {
    const openaiApi = createOpenaiApi(userOpenaiSettings);

    try {
        const response = await openaiApi.createImage({ prompt, n: 1, size: '512x512' });
        return response;
    } catch (err) {
        handleOpenaiError(err);
    }
};
