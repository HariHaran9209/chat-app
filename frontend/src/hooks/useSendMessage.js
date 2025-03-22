import { useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useGetMessages from "./useGetMessages";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const { setMessages } = useGetMessages();

	const sendMessage = async (messageText) => {
		if (!socket || !selectedConversation) return;

		setLoading(true);

		const newMessage = {
			_id: Date.now().toString(), // Temporary unique ID
			text: messageText,
			senderId: "You",
			createdAt: new Date().toISOString(),
		};

		// ✅ Update UI instantly before server confirmation
		setMessages((prev) => [...prev, newMessage]);

		// Emit message to server
		socket.emit("sendMessage", {
			...newMessage,
			senderId: "yourAuthUserId", // Replace with actual sender ID
			receiverId: selectedConversation._id,
		});

		setLoading(false);
	};

	return { sendMessage, loading };
};

export default useSendMessage;
