import mongoose, { Schema, model, models, ObjectId } from 'mongoose';

import {
    allStoryDurations,
    allStoryImageStyles,
    allStoryThemes,
    allVisibilityValues,
    FinishedPublicStoryPreview,
    FinishedStoryData,
    FinishedStoryInstance,
    FinishedStoryMethods,
    FinishedStorySchema,
    FinishedUserStoryPreview,
    IFinishedStoryModel,
} from '~/packages/types';
import { allLanguages } from '~/packages/types/language.types';

import {
    convertAllChaptersImagesToImageOnClient,
    convertToImageOnClient,
    deleteCoverAndAllChaptersImages,
    mooveAllFinishedStoryImages,
} from '../functions';

import { imageSchema } from './common.models';
import { roundNearestTenth } from '~/packages/functions/number/number.functions';
import { getAllStoryReviewRatingsFromDb, getThreeBestStoryPreviewsFromDb } from '../queries';

const schema = new Schema<FinishedStorySchema, IFinishedStoryModel, FinishedStoryMethods>(
    {
        type: {
            type: String,
            enum: ['common', 'user'],
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        options: {
            theme: {
                type: String,
                required: true,
                enum: allStoryThemes,
            },
            style: {
                type: String,
                required: true,
                enum: allStoryImageStyles,
            },
            duration: {
                type: String,
                required: true,
                enum: allStoryDurations,
            },
            language: {
                type: String,
                required: true,
                enum: allLanguages,
            },
        },
        visibility: {
            type: String,
            enum: allVisibilityValues,
            required: true,
        },
        topic: {
            type: String,
            required: true,
            index: true,
        },
        cover: {
            type: imageSchema,
        },
        summary: {
            type: String,
            required: true,
            index: true,
        },
        allChapters: {
            type: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    text: {
                        type: String,
                        required: true,
                    },
                    allChoices: [
                        {
                            text: {
                                type: String,
                            },
                            numbOfVotes: {
                                type: Number,
                            },
                        },
                    ],
                    selectedChoiceIndex: {
                        type: Number,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    image: {
                        type: imageSchema,
                        default: null,
                    },
                },
            ],
            default: [],
        },
        ratings: {
            textRating: {
                type: Number,
                default: 0,
            },
            imageRating: {
                type: Number,
                default: 0,
            },
        },
        reviews: [
            {
                author: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
                review: {
                    type: mongoose.Types.ObjectId,
                    ref: 'StoryReview',
                },
            },
        ],
        numbOfReviews: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

schema.pre('validate', async function (this: FinishedStoryInstance) {
    if (this.type === 'user' && !this.author) {
        throw new Error('User stories must have an author');
    }
});

schema.pre('save', async function (this: FinishedStoryInstance) {
    if ((this.type === 'user', this.visibility && this.isModified('visibility'))) {
        await mooveAllFinishedStoryImages(this);
    }
});

schema.methods.isAuthor = function (this: FinishedStoryInstance, userId: string | ObjectId) {
    return this.type === 'user' && typeof userId === 'string'
        ? userId === this.author!.toString()
        : userId.toString() === this.author!.toString();
};

schema.methods.hasVoted = function (this: FinishedStoryInstance, userId: string): boolean {
    return this.reviews.some((review) => review.author.toString() === userId);
};

schema.methods.updateStoryRatings = async function (this: FinishedStoryInstance): Promise<void> {
    const allReviewRatings = await getAllStoryReviewRatingsFromDb(this.id);
    const { imageRating, textRating } = allReviewRatings.reduce(
        (acc, { imageRating, textRating }) => ({
            imageRating: acc.imageRating + imageRating,
            textRating: acc.textRating + textRating,
        }),
        { imageRating: 0, textRating: 0 }
    );
    this.ratings.imageRating = roundNearestTenth(imageRating / allReviewRatings.length);
    this.ratings.textRating = roundNearestTenth(textRating / allReviewRatings.length);
    await this.save();
};

schema.methods.getPublicPreview = async function (): Promise<FinishedPublicStoryPreview> {
    const publicPreview: any = {
        ...this._doc,
        id: this.id,
    };
    if (this.type === 'user') {
        publicPreview.author.avatar = this.author!.avatar?.key
            ? await convertToImageOnClient(this.author.avatar)
            : undefined;
    }
    publicPreview.reviews = await getThreeBestStoryPreviewsFromDb(this._id)
    delete publicPreview._id;
    return publicPreview;
};

schema.methods.getUserPreview = async function (): Promise<FinishedUserStoryPreview> {
    const userPreview = {
        ...this._doc,
        id: this.id,
        cover: this.cover && (await convertToImageOnClient(this.cover)),
    };
    delete userPreview._id;
    return userPreview;
};

schema.methods.getData = async function (): Promise<FinishedStoryData> {
    const data = {
        ...this._doc,
        id: this.id,
        cover: this.cover && (await convertToImageOnClient(this.cover)),
        allChapters: await convertAllChaptersImagesToImageOnClient(this.allChapters),
    };
    delete data._id;
    return data;
};

schema.methods.deleteAllImages = async function (this: FinishedStoryInstance) {
    deleteCoverAndAllChaptersImages(this.allChapters, this.cover);
};

export const FinishedStory =
    models.FinishedStory || model<FinishedStorySchema, IFinishedStoryModel>('FinishedStory', schema);
