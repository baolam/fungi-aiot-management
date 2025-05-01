import { io } from "socket.io-client";
import { createContext } from "react";
import { SOCKET_SERVER } from "./constant";

export const socket = io(SOCKET_SERVER);
export const SocketContext = createContext(null);
