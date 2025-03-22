import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [messages, setMessages] = useState([]); // New state for messages
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const newSocket = io("https://chat-app-voao.onrender.com", {
				transports: ["websocket", "polling"], // Ensures Render compatibility
				query: {
					userId: authUser._id,
				},
			});

			setSocket(newSocket);

			// ✅ Listen for online users
			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// ✅ Listen for new messages
			newSocket.on("receiveMessage", (message) => {
				setMessages((prev) => [...prev, message]); // Update instantly
			});

			// Cleanup on unmount
			return () => newSocket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers, messages, setMessages }}>{children}</SocketContext.Provider>;
};
