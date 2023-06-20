import { UserSession } from "~/packages/types";
import { setColorMode, setUserIsAuth, setUserSessionData } from "~/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

export const setUserSession = (store: ToolkitStore, session: UserSession) => {
    store.dispatch(setUserIsAuth());
    const { colorMode, ...userSessionDara } = session;
    store.dispatch(setUserSessionData(userSessionDara));
    store.dispatch(setColorMode(colorMode));
};
