'use client';
import { useState } from 'react';

function Chat() {
	const [input, setInput] = useState('');
	const [chatRecord, setChatRecord] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setChatRecord((prevChatRecord) => [
			...prevChatRecord,
			{ type: 'user', message: input },
		]);
		setInput('');
	};

	return (
		<>
			<h1>ChatGPT</h1>
			{chatRecord.map((message, index) => (
				<div key={index}>{message.message}</div>
			))}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Type your message..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</>
	);
}

export default Chat;
