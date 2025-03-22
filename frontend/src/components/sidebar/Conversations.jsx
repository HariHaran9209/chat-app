import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	console.log("Conversations before rendering:", conversations);
    	console.log("Is conversations an array?", Array.isArray(conversations));

	// Ensure conversations is always an array

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === safeConversations.length - 1}
				/>
			))}

			{loading && <span className='loading loading-spinner mx-auto'></span>}
		</div>
	);
};

export default Conversations;
