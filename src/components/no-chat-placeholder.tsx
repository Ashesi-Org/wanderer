import { Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatRequestOptions } from 'ai';
import { FormEvent } from 'react';

export const NoChatPlaceholder = ({
    input,
    handleSubmit,
    handleInputChange,
}: {
    input: string;
    handleSubmit: (
        e: FormEvent<HTMLFormElement>,
        chatRequestOptions?: ChatRequestOptions | undefined
    ) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center w-full h-full"
        >
            <input
                value={input}
                onChange={handleInputChange}
                className="w-full hidden h-10 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Start conversation"
            />
            <div className="flex flex-col items-center">
                <div className="flex justify-center">
                    <Bot className="w-10 h-10 text-center text-slate-600" />
                </div>
                <p className="text-slate-600 text-center mb-4">No messages yet</p>
                <Button type="submit" className="flex items-center gap-1">
                    <span>Start conversation</span>
                    <Send size={20} />
                </Button>
            </div>
        </form>
    );
};
