import sharp from 'sharp';
import { ImageOnDb, Visibility, OpenaiSettings } from '../../../packages/types';
import { getUrlFromS3, sendOpenAiImageRequest, uploadFileToS3 } from '../configs';
import { getPlaiceholder } from 'plaiceholder';

/**
 *
 */
export const getPlaiceholderImageFromUrlAndUploadToS3 = async (
    imageUrl: string,
    fileKey: string,
    visibility: Visibility
) => {
    if (!imageUrl) {
        return;
    }
    const res = await fetch(imageUrl);
    const fileBlob = await res.blob();
    const arrayBuffer = await fileBlob.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const convertedBuffer = await convertToWebp(fileBuffer);
    const [plaiceholder] = await Promise.all([
        getBase64(fileBuffer),
        uploadFileToS3(convertedBuffer, fileKey, visibility, 'image/webp'),
    ]);
    return plaiceholder;
};

export const convertToWebp = async (buffer: Buffer) => {
    return sharp(buffer).webp({ lossless: true }).toBuffer();
};

const getBase64 = async (fileBuffer: Buffer) => {
    const { base64 } = await getPlaiceholder(fileBuffer);
    return base64;
};

export const convertToImageOnClient = async (image: ImageOnDb) => {
    return {
        url: await getUrlFromS3(image),
        plaiceholder: image.plaiceholder,
    };
};

export const generateImage = async (prompt: string, userSettings: OpenaiSettings | false): Promise<string> => {
    const res = await sendOpenAiImageRequest(prompt, userSettings);
    return res?.data.data[0].url!;
};
