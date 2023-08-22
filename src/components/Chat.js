'use client';
import { useState } from 'react';

import axios from 'axios';

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
		sendMessage(input);
		setInput('');
	};

	const sendMessage = (message) => {
		const url = 'https://api.openai.com/v1/chat/completions ';
		const headers = {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
		};
		const data = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: message }],
		};

		setIsLoading(true);

		axios.post(url, data, { headers: headers }).then((response) => {
					console.log(response);
					setChatRecord((prevChatRecord) => [...prevChatRecord, {
							type: 'bot',
							message: response.data.choices[0].message.content,
						},
					]);
					setIsLoading(false);
				}).catch((error) => {
				setIsLoading(false);
				console.log(error);
			});
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
