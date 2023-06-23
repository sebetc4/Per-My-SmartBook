import { FinishedStoryData, StoryReviewData } from "../story"

/**
 * Get one finished story data and Reviews
 */
export type GetOneFinishedStoryDataAndReviewsRes = {
    story: FinishedStoryData
    reviews: StoryReviewData[]
}