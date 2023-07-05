import mongoose, { model, models, ObjectId, Schema } from 'mongoose';
import {
    IStoryReviewModel,
    StoryReviewData,
    StoryReviewInstance,
    StoryReviewMethods,
    StoryReviewSchema,
} from '~/packages/types';
import { reviewRatingsSchema } from './common.models';

const schema = new Schema<StoryReviewSchema, IStoryReviewModel, StoryReviewMethods>(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        story: {
            type: mongoose.Types.ObjectId,
            ref: 'FinishedStory',
            required: true,
        },
        text: {
            type: String,
        },
        title: {
            type: String,
        },
        ratings: reviewRatingsSchema,
        likes: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                value: {
                    type: Number,
                    required: true,
                },
            },
        ],
        reviewRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

schema.methods.isAuthor = function (this: StoryReviewInstance, userId: string | ObjectId) {
    return typeof userId === 'string'
        ? userId === this.author!.toString()
        : userId.toString() === this.author!.toString();
};

schema.methods.getData = function (): StoryReviewData {
    return {
        id: this.id,
        text: this.text,
        title: this.title,
        author: this.author,
        ratings: this.ratings,
        likes: this.likes,
        reviewRating: this.reviewRating,
        createdAt: this.createdAt!.toString(),
        updatedAt: this.updatedAt!.toString(),
    };
};

export const StoryReview = models.StoryReview || model<StoryReviewSchema, IStoryReviewModel>('StoryReview', schema);
