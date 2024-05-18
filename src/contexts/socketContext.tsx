"use client"
import { createContext, useContext , useState, useEffect} from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";
import { UserContext } from "./userContext";


type SocketContextProps = {
    children: React.ReactNode
}


type SocketContext = {
    socket: Socket | null,

}


export const SocketContext = createContext<SocketContext>({} as SocketContext);


export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const socketOptions: Partial<ManagerOptions & SocketOptions> = {
        autoConnect: false,
        reconnectionAttempts: 3,
        withCredentials: true,
        transports: ["polling"]
    }    


    const {user, isUserLoading} = useContext(UserContext)
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);

    useEffect(() => {
        if (user && !isUserLoading) {
            const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, socketOptions);
            setSocket(newSocket);
        }
    }, [user, isUserLoading]);


    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                setConnected(true);
                setReconnecting(false);
            });
            socket.on("reconnect", () => {
                setReconnecting(true);
            });
            socket.on("reconnect_error", () => {
                setReconnecting(false);
            });
            socket.on("reconnect_failed", () => {
                setReconnecting(false);
            });
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
