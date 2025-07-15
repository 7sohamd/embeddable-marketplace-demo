"use client"
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react"

interface Props {
    children?: ReactNode;
    chainId: string;
}

const Providers: FC<Props> = (props) => {
    const { children, chainId } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)
    const connectedChainId = useAndromedaStore(state => state.chainId)

    const [autoconnect, setAutoconnect] = useState<string | null>(null);

    useLayoutEffect(() => {
        initiateKeplr();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAutoconnect(localStorage.getItem(KEPLR_AUTOCONNECT_KEY));
        }
    }, []);

    useLayoutEffect(() => {
        if (typeof autoconnect !== "undefined" && autoconnect === keplr?.mode) {
            if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
                if (!isConnected || (isConnected && connectedChainId !== chainId)) {
                    connectAndromedaClient(chainId);
                }
            }
        }
    }, [keplr, isConnected, isLoading, chainId, autoconnect]);

    return (
        <>
            {children}
        </>
    )
}

export default Providers