import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function ChatInput() {
    const messages = [
        { text: "So, let's move on to the technical part of the interview. Have you heard of the FizzBuzz problem?", sender: "bot" },
        { text: "Yes, I'm familiar with it.", sender: "user" },
        { text: "Great. Can you explain how you would approach solving it?", sender: "bot" },
        { text: "Sure. I would iterate through numbers from 1 to 100, check divisibility by 3, 5, or both, and print accordingly.", sender: "user" },
        { text: "Can you write the code for it?", sender: "bot" },
        { text: "Here's my JavaScript implementation:", sender: "user" },
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



    return (
        <div className="flex flex-col w-full h-[calc(100%-45px)]">
            <div className="flex-1 overflow-scroll custom-scrollbar">
                <div className="grid grid-cols-1 gap-4 p-4">
                    {messages.map((message, index) => (
                        <div key={index} className={` ${message.sender === "bot" ? "justify-end" : ""}`}>
                            <div className={`flex items-end gap-2 ${message.sender === "bot" ? "justify-end" : ""}`}>
                                <div className={`rounded-lg ${message.sender === "bot" ? "bg-blue-500 text-white" : "bg-zinc-200"} p-2`}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full transition-all duration-300 bg-background border-t backdrop-blur-sm" >
                <div className="flex items-center gap-2">
                    <form className="dark:border-zinc-700 flex-1 px-3 py-2">
                        <div className="flex items-center gap-2 w-full">
                            <Input className="flex-1 h-10 max-w-full" placeholder="Talk with AI interviewer 🤖 ..." />
                            <Button className="rounded-full w-12 h-12">
                                <Mic size={20} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}
