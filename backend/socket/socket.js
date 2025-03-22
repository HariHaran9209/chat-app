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
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// ✅ Listen for messages and send them to all users
	socket.on("sendMessage", (message) => {
		io.emit("receiveMessage", message); // Broadcast message to all clients
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});


export { app, io, server };
