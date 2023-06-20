import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import * as reducers from './slices';

const combinedReducer = combineReducers(reducers);

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
            auth: {
                ...action.payload.auth,
                isChecked: action.payload.auth.isChecked || state?.auth.isChecked,
                sessionStatus: action.payload.auth.sessionStatus || state?.auth.sessionStatus,
                isAuth: action.payload.auth.isAuth || state?.auth.isAuth,
            },
            user: {
                ...action.payload.user,
                session: action.payload.user.session || state?.user.session,
            },
            app: {
                ...state?.app,
            }
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer, devTools: true });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type AppState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore, { debug: false });
