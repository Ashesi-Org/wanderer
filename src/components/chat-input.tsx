import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function ChatInput() {
    const messages = [
        { text: "Hello, how are you?", sender: "user" },
        { text: "I'm fine, thanks!", sender: "bot" },
        { text: "What are you up to?", sender: "user" },
        { text: "Just chilling here!", sender: "bot" },
        { text: "Got any plans for the weekend?", sender: "user" },
        { text: "Not really, just relaxing.", sender: "bot" },
        { text: "I'm thinking of going hiking.", sender: "user" },
        { text: "That sounds fun!", sender: "bot" },
        { text: "Yeah, I love nature.", sender: "user" },
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
