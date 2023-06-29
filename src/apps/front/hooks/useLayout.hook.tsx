import { PropsWithChildren, RefObject, createContext, useContext, useState } from "react";

type LayoutContextType = {
    footerRef: RefObject<HTMLDivElement> | null;
    setFooterRef: (ref: RefObject<HTMLDivElement>) => void;
};

const Context = createContext<LayoutContextType>({} as any);

export function useLayout(): LayoutContextType {
    return useContext(Context);
}

export function LayoutContextProvider({ children }: PropsWithChildren) {
    const [footerRef, setFooterRef] = useState<RefObject<HTMLDivElement> | null>(null);
    return (
        <Context.Provider
            value={{
                footerRef,
                setFooterRef
            }}
        >
            {children}
        </Context.Provider>
    );
}