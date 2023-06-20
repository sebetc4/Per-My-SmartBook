import axios, { AxiosInstance } from 'axios';

import {
    AddModifyOpenaiKeyReq,
    AddModifyOpenaKeyRes,
    GetUserStoriesServerSideRes,
    GetUserSettingsServerSideRes,
    GetSessionRes,
    LoginWithCredentialsBody,
    SignUpBody,
    UpdateAccountReq,
    UpdateAISettingsReq,
    UpdatePasswordReq,
    GetOneFinishedStoryDataRes,
    PublicStoriesSearchQuery,
    PublicStoriesSearchRes,
} from '../packages/types';
import { CreateOneReviewBody, CreateOneReviewRes, DeleteOneReviewRes, UpdateOneReviewBody, UpdateOneReviewRes } from '~/packages/types/request/review.types';

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

    /**
     * User
     */
    updateAccount(body: UpdateAccountReq) {
        return this.api.put('/user/settings/account', body);
    }
    updateProfile(body: FormData) {
        return this.api.put('/user/settings/profile', body, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    updatePassword(body: UpdatePasswordReq) {
        return this.api.put('/user/settings/password', body);
    }
    updateAISettings(body: UpdateAISettingsReq) {
        return this.api.put('/user/settings/ai', body);
    }
    addModifyOpenaiKey(body: AddModifyOpenaiKeyReq) {
        return this.api.post<AddModifyOpenaKeyRes>('/user/settings/openai-key', body);
    }
    deleteOpenaiKey() {
        return this.api.delete('/user/settings/openai-key');
    }
    toggleColorMode() {
        return this.api.put('/user/settings/color-mode');
    }

    /**
     * Public stories
     */
    getOneStory(storyId: string) {
        return this.api.get<GetOneFinishedStoryDataRes>(`/story/${storyId}`);
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
        return this.api.get(`/story/review/${reviewId}`)
    }
    getStoryReviews(storyId: string, reviewNumber: number, start: number) {
        return this.api.get(`/story/review/reviews?storyId=${storyId}&reviewNumber=${reviewNumber}&start=${start}`);
    }
    createOneReview(body: CreateOneReviewBody) {
        console.log('test')
        return this.api.post<CreateOneReviewRes>(`/story/review`, body);
    }
    updateOneReview(body: UpdateOneReviewBody) {
        return this.api.put<UpdateOneReviewRes>('/story/review', body);
    }
    deleteOneReview(reviewId: string, storyId: string) {
        return this.api.delete<DeleteOneReviewRes>(`/story/review?reviewId=${reviewId}&storyId=${storyId}`);
    }
}

export const api = new ApiService();
