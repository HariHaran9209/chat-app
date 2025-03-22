import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();

				console.log("Fetched conversations:", data);

				// Ensure it's always an array
				if (!Array.isArray(data)) {
					throw new Error("Invalid API response: Expected an array but got " + typeof data);
				}

				setConversations(data);
			} catch (error) {
				toast.error(error.message);
				console.error("Error fetching conversations:", error);
				setConversations([]); // Ensure it's always an array
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
