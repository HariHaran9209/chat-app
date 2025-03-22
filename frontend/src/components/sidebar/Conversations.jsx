import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	// Ensure conversations is always an array
	const safeConversations = Array.isArray(conversations) ? conversations : [];

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{safeConversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === safeConversations.length - 1}
				/>
			))}

			{loading && <span className='loading loading-spinner mx-auto'></span>}
		</div>
	);
};

export default Conversations;
