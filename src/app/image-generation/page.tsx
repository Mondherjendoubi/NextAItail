"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import axios from "axios";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const generateImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    const data = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, // Replace with your actual API key
          },
        }
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setImageUrl(response.data.data[0].url);
      } else {
        setError("No image URL found in the response.");
      }
    } catch (err) {
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen  items-center p-4">
      <div className="flex flex-col shadow-2xl m-auto p-4 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">DALL-E Image Generator</h1>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          className="p-2 border rounded mb-4 w-full max-w-md"
        />
        <button
          onClick={generateImage}
          disabled={loading}
          className="p-2 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {imageUrl && (
          <div className="my-5 mx-auto">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-64 h-64 object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
