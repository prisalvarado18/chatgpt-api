'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Animation from './Animation';

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
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		};
		const data = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: message }],
		};

		setIsLoading(true);

		axios
			.post(url, data, { headers: headers })
			.then((response) => {
				console.log(response);
				setChatRecord((prevChatRecord) => [
					...prevChatRecord,
					{
						type: 'bot',
						message: response.data.choices[0].message.content,
					},
				]);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error);
			});
	};

  //Simulando una respuesta del bot al inicio
  useEffect(() => {
    setChatRecord((prevChatRecord) => [
      ...prevChatRecord,
      {
        type: 'bot',
        message: 'Hi, what can I do for you?',
      },
    ]);
  }, []);


	return (
		<div className="container mx-auto max-w-[700px]">
			<div className="flex flex-col h-screen bg-gray-900">
				<h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
					ChatGPT
				</h1>
				<div className="flex-grow p-6">
					<div className="flex flex-col space-y-4">
						{chatRecord.map((message, index) => (
							<div
								key={index}
								className={`flex ${
									message.type === 'user'
										? 'justify-end'
										: 'justify-start'
								}`}
							>
								<div
									className={`${
										message.type === 'user'
											? 'bg-purple-500'
											: 'bg-gray-800'
									} rounded-lg p-4 text-white max-w-sm`}
								>
									{message.message}
								</div>
							</div>
						))}
            {
              isLoading &&
              <div key={chatRecord.length} className='flex justify-start'>
                <div className='bg-gray-800 rounded-lg p-4 text-white max-w-sm'>
                  <Animation />
                </div>
              </div>
            }
					</div>
				</div>
				<form onSubmit={handleSubmit} className="flex-none p-6">
					<div className="flex rounded-lg border border-gray-700 bg-gray-800">
						<input
							type="text"
							placeholder="Type your message..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
						/>
						<button
							type="submit"
							className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
						>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Chat;
