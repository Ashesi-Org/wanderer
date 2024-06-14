import React from 'react';
import { Mic, Volume2, Bot, AtSign, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useCompilerStore from '@/store/editor-store';
import { useChat } from '@ai-sdk/react';

const NoChatPlaceholder = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <Bot className="w-10 h-10 text-center text-slate-600" />
        </div>
        <p className="text-slate-600 text-center mb-4">No messages yet</p>
        <Button className="flex items-center gap-1">
          <span>Start conversation</span>
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

export default function ChatInput({ interviewQuestion }) {
  const { code } = useCompilerStore();
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    error,
    stop,
  } = useChat({
    api: '/api/openai',
    body: {
      currentImplementation: code,
      problem: interviewQuestion,
    },
  });

  return (
    <div className="flex flex-col w-full h-[calc(100%-90px)]">
      <div className="flex-2 overflow-scroll custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 p-4">
          {messages.map((message) => (
            <div className="flex items-center gap-2" key={message.id}>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`${
                      message.role === 'user'
                        ? 'https://avatars.githubusercontent.com/u/79936608?v=4'
                        : 'https://img.icons8.com/stickers/48/bot.png'
                    }`}
                    alt="role-image"
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </Button>
              <div className="flex gap-2">
                <div
                  className={`rounded-lg flex flex-col ${
                    message.role === 'assistant'
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-200'
                  } p-3`}
                >
                  <div className="flex justify-between items-center mb-[0.15rem]">
                    {message.role === 'assistant' ? (
                      <div>
                        <span className="text-sm font-semibold">Assistant</span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold">
                        Simon Boateng
                      </span>
                    )}
                    {message.role === 'assistant' && (
                      <div className="cursor-pointer">
                        <Volume2
                          className="text-white font-semibold"
                          size={20}
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky border-t transition-all duration-300 bg-background backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="dark:border-zinc-700 flex-1 px-3 py-2">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 ">
              <Input
                value={input}
                onChange={handleInputChange}
                startIcon={AtSign}
                className="flex-1 h-10 w-full"
                placeholder="Talk with AI interviewer 🤖 ..."
              />
              {input.length === 0 ? (
                <Button type="submit" className="rounded-full w-12 h-12">
                  <Mic size={20} />
                </Button>
              ) : (
                <Button type="submit" className="rounded-full w-12 h-12">
                  <Send size={20} />
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
