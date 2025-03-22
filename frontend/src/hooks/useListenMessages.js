import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useGetMessages from "./useGetMessages";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useGetMessages();
	const { selectedConversation } = useConversation();

	useEffect(() => {
		if (!socket) return;

		// Listen for incoming messages from the server
		socket.on("receiveMessage", (message) => {
			if (message.senderId === selectedConversation?._id) {
				// ✅ Append the new message to the state
				setMessages((prev) => [...prev, message]);
			}
		});

		return () => socket.off("receiveMessage"); // Cleanup listener on unmount
	}, [socket, selectedConversation, setMessages]);
};

export default useListenMessages;
