import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from 'ai';
import { TextContent } from './text-content';

export const HumanMessage = ({
    message,
    text,
}: {
    message?: Message;
    text?: string;
}) => {
    return (
        <>
            <div className="flex items-center gap-2 w-full rounded-md min-h-[60px]">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://avatars.githubusercontent.com/u/79936608?v=4"
                            alt="role-image"
                        />
                        <AvatarFallback>SH</AvatarFallback>
                    </Avatar>
                </Button>
                <div className="flex gap-2  rounded-md min-h-[60px]">
                    <div
                        style={{ overflowWrap: 'break-word', width: '100%' }}
                        className="rounded-lg flex flex-col bg-zinc-200 p-3"
                    >
                        <div className="flex justify-between items-center mb-[0.15rem]">
                            <span className="text-sm font-semibold">Simon Boateng</span>
                        </div>
                        <p className="text-sm">
                            <TextContent text={message?.content ?? text ?? ''} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
