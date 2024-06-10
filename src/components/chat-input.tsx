import { Mic, Volume2, PauseCircle, Bot, AtSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useState } from "react";
import useCompilerStore from "@/store/compiler-store";
import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

const NoChatPlaceholder = () => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col items-center">
                    <div className="flex justify-center">
                        <Bot className="w-10 h-10 text-center text-slate-600" />
                    </div>
                    <p className=" text-slate-600 text-center mb-4">
                        No messages yet
                    </p>
                    <Button className="flex items-center gap-1">
                        <span>Start conversation </span>

                        <Send size={20} />
                    </Button>
                </div>
            </div>

        </>
    )
}

export default function ChatInput() {
    const messages = [
        { text: "So, let's move on to the technical part of the interview. Have you heard of the FizzBuzz problem?", sender: "bot" },
        { text: "Yes, I'm familiar with it.", sender: "user" },
        { text: "Great. Can you explain how you would approach solving it?", sender: "bot" },
        { text: "Sure. I would iterate through numbers from 1 to 100, check divisibility by 3, 5, or both, and print accordingly.", sender: "user" },
        { text: "Can you write the code for it?", sender: "bot" },
        {
            text: `for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    console.log(output || i);
}`, sender: "user"
        },
        { text: "Your code looks clean. Any optimizations?", sender: "bot" },
        { text: "Storing output in an array could optimize for large iterations. Also, making range configurable.", sender: "user" },
        { text: "Solid points. You've demonstrated good understanding and provided efficient solutions. Well done!", sender: "bot" },
        { text: "Thank you. I appreciate the feedback.", sender: "user" }
    ];

    // TODO: Get code and interview question
    const [prompt, setPrompt] = useState("");
    const { code } = useCompilerStore();
    const [interviewQuestion, setInterviewQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    async function handleAnswer() {

        const response = await fetch("/api/mistral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ interviewQuestion, userCode: code, query: prompt }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (response.status === 202) {
            const fullAnswer = await response.text();
            setAnswer(fullAnswer);
            return;
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const onParse = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === "event") {
                const data = event.data;
                try {
                    const text = JSON.parse(data).text ?? "";
                    setAnswer((prev) => prev + text);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        // https://web.dev/streams/#the-getreader-and-read-methods
        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            parser.feed(chunkValue);
        }

    }
    return (
        <div className="flex flex-col w-full h-[calc(100%-90px)]">
            {/* <NoChatPlaceholder /> */}
            <div className="flex-2 overflow-scroll custom-scrollbar">
                <div className="grid grid-cols-1 gap-4 p-4">
                    {messages.map((message, index) => (
                        <div className="flex items-center gap-2" key={index} >
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`${message.sender === "user" ? "https://avatars.githubusercontent.com/u/79936608?v=4" : "https://img.icons8.com/stickers/48/bot.png"}`} alt="sender-image" />
                                    <AvatarFallback>SH</AvatarFallback>
                                </Avatar>
                            </Button>
                            <div className="flex gap-2">

                                <div className={`rounded-lg flex flex-col ${message.sender === "bot" ? "bg-blue-500 text-white" : "bg-zinc-200"} p-3`}>


                                    <div className="flex justify-between items-center mb-[0.15rem]">
                                        {
                                            message.sender === "bot" ?
                                                <div className="">
                                                    <span className="text-sm font-semibold">Assistant</span>
                                                </div>
                                                :
                                                <span className="text-sm font-semibold">Dev</span>
                                        }
                                        {
                                            message.sender === "bot" &&
                                            <div className="cursor-pointer">
                                                <Volume2 className="text-white font-semibold" size={20} />
                                            </div>
                                        }

                                    </div>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full transition-all duration-300 bg-background border-t backdrop-blur-sm" >
                <div className="flex items-center gap-2">
                    <form onSubmit={handleAnswer} className="dark:border-zinc-700 flex-1 px-3 py-2">
                        <div className="flex items-center gap-2 w-full">
                            <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} startIcon={AtSign} className="flex-1 h-10 max-w-full" placeholder="Talk with AI interviewer 🤖 ..." />
                            <Button type="submit" className="rounded-full w-12 h-12">
                                <Mic size={20} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}
