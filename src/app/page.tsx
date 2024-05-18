import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col h-screen   p-4 bg-gray-10 gap-1.5">
      <div className="flex flex-col m-auto p-6  shadow-2xl rounded-lg items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome Page</h1>
        <p className=" text-lg">
          This is the Welcome page of our Next.js application with Tailwind CSS.
        </p>
        <p className=" text-lg">
          This an example of some uses cases of using openai api
        </p>
        <div className="flex flex-row gap-4 ">
          <Link href="/chat" passHref>
            <button className="bg-[#0f172a] hover:bg-[#334155] text-white font-bold mt-2 py-2 px-4 rounded">
              Chat
            </button>
          </Link>
          <Link href="/transcribe" passHref>
            <button className="bg-[#0f172a] hover:bg-[#334155] text-white font-bold mt-2 py-2 px-4 rounded">
              Whisper
            </button>
          </Link>

          <Link href="/image-generation" passHref>
            <button className="bg-[#0f172a] hover:bg-[#334155] text-white font-bold mt-2 py-2 px-4 rounded">
              Dall-e-3
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
