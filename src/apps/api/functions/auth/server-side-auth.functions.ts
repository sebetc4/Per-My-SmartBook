import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { GetServerSidePropsContext } from "next";
import { setUserSession } from "~/apps/front/utils";
import { Path, SessionStatus } from "~/packages/types";
import { api } from "~/services";
import { setAuthIsChecked, setInvalidSession } from "~/store";


export const requireAuthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => Promise<{ props: any }>
) => {
    store.dispatch(setAuthIsChecked());
    const { data } = await api.getSessionServerSide(context.req.headers.cookie);
    const { session } = data;
    if (session?.status === SessionStatus.VALID) {
        setUserSession(store, session.user!);
        return cb();
    }
    if (session) {
        store.dispatch(setInvalidSession());
    }
    return {
        redirect: {
            destination: `/${context.locale}${Path.REQUIRED_AUTH}`,
            permanent: false,
        },
    };
};

export const requireUnAuthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => Promise<{ props: any }>
) => {
    store.dispatch(setAuthIsChecked());
    const { data } = await api.getSessionServerSide(context.req.headers.cookie);
    const { session } = data;
    if (session?.status === SessionStatus.VALID) {
        setUserSession(store, session.user!);
        return {
            redirect: {
                destination: `/${context.locale}${Path.HOME}`,
                permanent: false,
            },
        };
    }
    session && store.dispatch(setInvalidSession());
    return await cb();
};