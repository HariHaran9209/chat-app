import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	console.log("Conversations before rendering:", conversations); // ✅ Debugging log

	// Ensure conversations is always an array
	if (!Array.isArray(conversations)) {
		console.error("Expected conversations to be an array, but got:", conversations);
		return <p>Error loading conversations</p>;
	}

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading && <span className='loading loading-spinner mx-auto'></span>}
		</div>
	);
};

export default Conversations;
