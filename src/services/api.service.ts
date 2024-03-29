import axios, { AxiosInstance } from 'axios';

import {
    AddModifyOpenaiKeyBody,
    AddModifyOpenaKeyRes,
    GetUserStoriesServerSideRes,
    GetUserSettingsServerSideRes,
    GetSessionRes,
    LoginWithCredentialsBody,
    SignUpBody,
    UpdateAccountBody,
    UpdateAISettingsBody,
    UpdatePasswordBody,
    PublicStoriesSearchQuery,
    PublicStoriesSearchRes,
    GetOneFinishedStoryDataAndReviewsRes,
    UpdateUserColorBody,
    CreateOneReviewBody,
    CreateOneReviewRes,
    DeleteOneReviewRes,
    LikeOrDislikeOneReviewBody,
    LikeOrDislikeOneReviewRes,
    UpdateOneReviewBody,
    UpdateOneReviewRes,
    ResetPasswordBody,
    ForgotPasswordBody,
} from '~/packages/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

class ApiService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });
    }

    /**
     * Auth
     */
    signUp(body: SignUpBody) {
        return this.api.post('/auth/credentials/signup', body);
    }
    loginWithCredentials(body: LoginWithCredentialsBody) {
        return this.api.post('/auth/credentials/login', body);
    }
    getSession() {
        return this.api.get<GetSessionRes>('/auth/session');
    }
    getSessionServerSide(cookie: string | undefined) {
        return this.api.get<GetSessionRes>('/auth/session', {
            headers: { cookie },
        });
    }
    getUserSettingsServerSide(cookie: string | undefined) {
        return this.api.get<GetUserSettingsServerSideRes>('/user/settings', {
            headers: { cookie },
        });
    }
    logout() {
        return this.api.get('/auth/logout');
    }
    forgotPassword(data: ForgotPasswordBody) {
        return this.api.post('/auth/password/forgot', data);
    }
    checkResetPasswordToken(token: string) {
        return this.api.get(`/auth/password/reset/${token}`);
    }
    resetPassword(data: ResetPasswordBody, token: string) {
        return this.api.post(`/auth/password/reset/${token}`, data);
    }

    /**
     * User
     */
    updateAccount(body: UpdateAccountBody) {
        return this.api.put('/user/settings/account', body);
    }
    updateProfile(body: FormData) {
        return this.api.put('/user/settings/profile', body, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    updatePassword(body: UpdatePasswordBody) {
        return this.api.put('/user/settings/password', body);
    }
    updateAISettings(body: UpdateAISettingsBody) {
        return this.api.put('/user/settings/ai', body);
    }
    addModifyOpenaiKey(body: AddModifyOpenaiKeyBody) {
        return this.api.post<AddModifyOpenaKeyRes>('/user/settings/openai-key', body);
    }
    deleteOpenaiKey() {
        return this.api.delete('/user/settings/openai-key');
    }
    toggleColorMode() {
        return this.api.put('/user/settings/color-mode');
    }
    updateUserColor(body: UpdateUserColorBody) {
        return this.api.put('/user/settings/user-color', body);
    }

    /**
     * Public stories
     */
    getOneStoryAndReviews(storyId: string) {
        return this.api.get<GetOneFinishedStoryDataAndReviewsRes>(`/story/${storyId}`);
    }

    getPublicStories({ search, theme, duration, language, page }: PublicStoriesSearchQuery) {
        return this.api.get<PublicStoriesSearchRes>(
            `/story/public?search=${search}&theme=${theme}&duration=${duration}&language=${language}&page=${page}`
        );
    }

    /**
     * User stories
     */
    getAllUserStoriesServerSide(cookie: string | undefined) {
        return this.api.get<GetUserStoriesServerSideRes>('/story/user', {
            headers: { cookie },
        });
    }
    deleteUnfinishedStory(id: string) {
        return this.api.delete(`/story/user/unfinished/${id}`);
    }

    /**
     * Review
     */
    getOneStoryReview(reviewId: string) {
        return this.api.get(`/story/review/${reviewId}`);
    }
    getStoryReviews(storyId: string, reviewNumber: number, start: number) {
        return this.api.get(`/story/review/reviews?storyId=${storyId}&reviewNumber=${reviewNumber}&start=${start}`);
    }
    createOneReview(body: CreateOneReviewBody) {
        return this.api.post<CreateOneReviewRes>(`/story/review`, body);
    }
    updateOneReview(body: UpdateOneReviewBody) {
        return this.api.put<UpdateOneReviewRes>('/story/review', body);
    }
    deleteOneReview(reviewId: string, storyId: string) {
        return this.api.delete<DeleteOneReviewRes>(`/story/review?reviewId=${reviewId}&storyId=${storyId}`);
    }
    likeOrDislikeOneReview(body: LikeOrDislikeOneReviewBody) {
        return this.api.post<LikeOrDislikeOneReviewRes>(`/story/review/like-dislike`, body);
    }
}

export const api = new ApiService();
