// https://github.com/meech-ward/s3-get-put-and-delete
// https://www.youtube.com/watch?v=eQAIojcArRY

import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommandInput,
    CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ImageOnDb, Visibility } from '../../../packages/types';

const publicBucketName = process.env.AWS_PUBLIC_BUCKET_NAME!;
const privateBucketName = process.env.AWS_PRIVATE_BUCKET_NAME!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.AWS_REGION!;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const bucketName = (visibility: Visibility) => (visibility === 'public' ? publicBucketName : privateBucketName);

export const uploadFileToS3 = async (
    fileBuffer: PutObjectCommandInput['Body'],
    fileKey: string,
    visibility: Visibility,
    mimetype?: string
) => {
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName(visibility),
            Body: fileBuffer,
            Key: fileKey,
            ContentType: mimetype,
        })
    );
};

type CopyFileFromS3Props = {
    visibility: Visibility;
    source: ImageOnDb;
    key: string;
};

export const mooveFileFromS3 = async ({ visibility, source, key }: CopyFileFromS3Props) => {
    await s3Client.send(
        new CopyObjectCommand({
            CopySource: `${bucketName(source!.visibility)}/${source!.key}`,
            Bucket: bucketName(visibility),
            Key: key,
        })
    );
    await deleteFileFromS3(source);
};

export const deleteFileFromS3 = async ({ key, visibility }: ImageOnDb) =>
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketName(visibility),
            Key: key,
        })
    );

const getSignedUrlFromS3 = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: privateBucketName,
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
};

const getUnsignedUrlFromS3 = (key: string) => `https://${publicBucketName}.s3.${region}.amazonaws.com/${key}`;

export const getUrlFromS3 = async ({ key, visibility }: ImageOnDb) =>
    visibility === 'public' ? getUnsignedUrlFromS3(key) : getSignedUrlFromS3(key);
