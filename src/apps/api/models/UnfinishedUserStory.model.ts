import mongoose, { Schema, model, models, ObjectId } from 'mongoose';

import {
    convertToImageOnClient,
    deleteCoverAndAllChaptersImages,
    convertAllChaptersImagesToImageOnClient,
} from '../functions';

import {
    allStoryDurations,
    allStoryImageStyles,
    allStoryThemes,
    IUnfinishedUserStoryModel,
    UnfinishedUserStoryInstance,
    UnfinishedUserStoryMethods,
    UnfinishedUserStoryPreview,
    UnfinishedUserStorySchema,
    UserStoryBeingGeneratedData,
} from '../../../packages/types';
import { imageSchema } from './common.models';
import { allLanguages } from '../../../packages/types/language.types';

const schema = new Schema<UnfinishedUserStorySchema, IUnfinishedUserStoryModel, UnfinishedUserStoryMethods>(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        state: {
            type: String,
            enum: ['selectOptions', 'selectTopic', 'generating', 'finished'],
            default: 'selectOptions',
        },
        options: {
            theme: {
                type: String,
                enum: allStoryThemes,
                required: true,
            },
            style: {
                type: String,
                enum: allStoryImageStyles,
                required: true,
            },
            duration: {
                type: String,
                enum: allStoryDurations,
                required: true,
            },
            language: {
                type: String,
                enum: allLanguages,
                required: true,
            },
        },
        currentStep: {
            type: Number,
            default: 0,
        },
        cover: {
            type: imageSchema,
        },
        topic: {
            type: String,
        },
        allTopics: {
            type: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    imageUrl: {
                        type: String,
                        default: null,
                    },
                },
            ],
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
                    summary: {
                        type: String,
                    },
                    allChoices: [
                        {
                            text: {
                                type: String,
                            },
                        },
                    ],
                    selectedChoiceIndex: {
                        type: Number,
                        required: false,
                        default: null,
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
    },
    {
        timestamps: true,
    }
);

schema.methods.isAuthor = function (this: UnfinishedUserStoryInstance, userId: string | ObjectId) {
    return typeof userId === 'string'
        ? userId === this.author.toString()
        : userId.toString() === this.author.toString();
};

schema.methods.getPreview = async function (this: UnfinishedUserStoryInstance): Promise<UnfinishedUserStoryPreview> {
    return {
        id: this.id,
        topic: this.topic,
        cover: this.cover && (await convertToImageOnClient(this.cover)),
    };
};

schema.methods.getData = async function (this: UnfinishedUserStoryInstance): Promise<UserStoryBeingGeneratedData> {
    return {
        id: this.id,
        state: this.state,
        currentStep: this.currentStep,
        allTopics: [],
        allChapters: await convertAllChaptersImagesToImageOnClient(this.allChapters),
    };
};

schema.methods.deleteAllImages = async function (this: UnfinishedUserStoryInstance) {
    deleteCoverAndAllChaptersImages(this.allChapters, this.cover);
};

export const UnfinishedStory =
    models.UnfinishedUserStory ||
    model<UnfinishedUserStorySchema, IUnfinishedUserStoryModel>('UnfinishedUserStory', schema);
