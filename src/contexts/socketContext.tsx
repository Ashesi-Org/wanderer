'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";
import { UserContext } from "./userContext";

type SocketContextProps = {
    children: React.ReactNode
};

type SocketContextType = {
    socket: Socket | null,
    connected: boolean,
    reconnecting: boolean
};

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const socketOptions = useMemo<Partial<ManagerOptions & SocketOptions>>(() => ({
        autoConnect: false,
        reconnectionAttempts: 3,
        withCredentials: true,
        transports: ["polling"]
    }), []);

    const { user, isUserLoading } = useContext(UserContext);
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);

    const handleConnect = useCallback(() => {
        setConnected(true);
        setReconnecting(false);
    }, []);

    const handleReconnect = useCallback(() => {
        setReconnecting(true);
    }, []);

    const handleReconnectError = useCallback(() => {
        setReconnecting(false);
    }, []);

    const handleReconnectFailed = useCallback(() => {
        setReconnecting(false);
    }, []);

    useEffect(() => {
        if (user && !isUserLoading) {
            const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, socketOptions);
            socketRef.current = newSocket;
            return () => {
                newSocket.close();
            };
        }
    }, [user, isUserLoading, socketOptions]);

    useEffect(() => {
        const socket = socketRef.current;
        if (socket) {
            socket.on("connect", handleConnect);
            socket.on("reconnect", handleReconnect);
            socket.on("reconnect_error", handleReconnectError);
            socket.on("reconnect_failed", handleReconnectFailed);

            return () => {
                socket.off("connect", handleConnect);
                socket.off("reconnect", handleReconnect);
                socket.off("reconnect_error", handleReconnectError);
                socket.off("reconnect_failed", handleReconnectFailed);
            };
        }
    }, [handleConnect, handleReconnect, handleReconnectError, handleReconnectFailed]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, connected, reconnecting }}>
            {children}
        </SocketContext.Provider>
    );
};
