import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000", "https://chat-app-voao.onrender.com"]
		methods: ["GET", "POST"],
	},
	transports: ["websocket", "polling"],
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	// Send list of online users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// ✅ Listen for messages and broadcast them
	socket.on("sendMessage", (message) => {
		const receiverSocketId = userSocketMap[message.receiverId];
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("receiveMessage", message);
		} else {
			io.emit("receiveMessage", message); // Broadcast to all if receiver is offline
		}
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});


export { app, io, server };
