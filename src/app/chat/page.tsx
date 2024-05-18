"use client"; // This is a client component 👈🏽

import React, { useRef, useEffect, useState } from "react";
import ExamplesComponent from "../components/ExamplesComponent";
import axios from "axios"; // Import axios

const Chat: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const [isInitialState, setIsInitialState] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  async function sendMessage(
    message: string,
    conversationHistory: { role: string; content: string }[]
  ) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", // or 'gpt-3.5-turbo' if you prefer
          messages: [
            ...conversationHistory,
            { role: "user", content: message },
          ],
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response from the API
      const reply = response.data.choices[0].message.content;
      return reply;
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Automatically focus the input when the component mounts
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleExampleClick = (input: string) => {
    setInputValue(input);
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    setIsInitialState(false);
    if (inputRef.current) {
      const userMessage = inputRef.current.value;
      setInputValue(""); // Clear the input field

      // Add the user's message and a loading message from the bot
      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", content: userMessage },
        { role: "assistant", content: "Loading..." },
      ]);

      try {
        const reply = await sendMessage(userMessage, [
          ...conversationHistory,
          { role: "user", content: userMessage },
        ]);

        // Update the conversation history with the assistant's reply
        setConversationHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1] = {
            role: "assistant",
            content: reply,
          };
          return updatedHistory;
        });
      } catch (error) {
        // Handle error by updating the last message to an error message
        setConversationHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1] = {
            role: "assistant",
            content: "Error fetching response.",
          };
          return updatedHistory;
        });
      }
    }
  };

  const examples1 = [
    "Explain quantum computing in simple terms",
    "Got any creative ideas for a 10-year old's birthday?",
    "How do I make an HTTP request in JavaScript?",
  ];

  const examples2 = [
    "What is the theory of relativity?",
    "Provide examples of common SQL commands",
    "Discuss the benefits of renewable energy",
  ];

  const examples3 = [
    "What's the difference between machine learning and artificial intelligence?",
    "How do stars form in the universe?",
    "What are some effective strategies for managing stress?",
  ];

  return (
    <div className="flex w-full h-screen  flex-col justify-between items-center">
      <div className="flex flex-col m-auto shadow-2xl items-center rounded-xl">
        {isInitialState && (
          <>
            <div className="flex flex-row text-lg m-auto gap-2 p-4">
              <div className="flex flex-col items-center">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                </svg>
              </div>
              <div className="text-lg font-bold">ChatGPT</div>
              <div>
                <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                  <span>Plus</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-6 p-4">
              <ExamplesComponent
                handleExampleClick={handleExampleClick}
                examples={examples1}
              />
              <ExamplesComponent
                handleExampleClick={handleExampleClick}
                examples={examples2}
              />
              <ExamplesComponent
                handleExampleClick={handleExampleClick}
                examples={examples3}
              />
            </div>
          </>
        )}
      </div>

      {!isInitialState && (
        <div className="flex w-full h-screen flex-col p-4 overflow-auto">
          <div className="flex flex-row text-lg mx-auto gap-2 p-4">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
              </svg>
            </div>
            <div className="text-lg font-bold">ChatGPT</div>
            <div>
              <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                <span>Plus</span>
              </div>
            </div>
          </div>
          {conversationHistory.map((message, index) => (
            <div
              key={index}
              className={`relative flex w-full px-4 py-2 my-1 items-start text-base rounded-lg font-regular gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role !== "user" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              )}
              <span className="max-w-xs px-4 py-2 text-gray-900 rounded-lg bg-white shadow flex-1">
                {message.content}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 w-full mb-6 px-6">
        <form onSubmit={handleSendMessage}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              id="Message"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Message"
              required
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="text-[black] absolute end-2.5 bottom-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
