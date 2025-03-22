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

				console.log("Fetched conversations:", data); // ✅ Debugging log

				// Ensure `data` is an array before setting state
				if (!Array.isArray(data)) {
					throw new Error("Invalid API response: Expected an array but got " + typeof data);
				}

				setConversations(data);
			} catch (error) {
				toast.error(error.message);
				console.error("Error fetching conversations:", error);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
