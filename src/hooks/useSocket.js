import { useContext } from "react";
import { SocketContext } from "../config/socket";

export function useSocket() {
  return useContext(SocketContext);
}
