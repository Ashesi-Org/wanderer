import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Message } from 'ai';
import { MessageAudio } from './message-audio';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AssistantMessage = ({
    message,
    isLoading,
}: {
    message: Message;
    isLoading: boolean;
}) => {
    return (
        <>
            <div className="flex items-center gap-2 w-full rounded-md min-h-[60px]">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://img.icons8.com/stickers/48/bot.png"
                            alt="role-image"
                        />
                        <AvatarFallback>SH</AvatarFallback>
                    </Avatar>
                </Button>

                <div
                    style={{ overflowWrap: 'break-word', width: '100%' }}
                    className="flex gap-2 rounded-md min-h-[60px]"
                >
                    <div
                        style={{ overflowWrap: 'break-word', width: '100%' }}
                        className="rounded-lg flex flex-col bg-blue-500 text-white p-3 w-full"
                    >
                        <div className="flex justify-between items-center mb-[0.15rem]">
                            <span className="text-sm font-semibold">Assistant</span>
                            <div className="cursor-pointer">
                                <MessageAudio message={message} />
                            </div>
                        </div>

                        <p className="text-sm">
                            {/* <TextContent text={message.content} /> */}
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </Markdown>

                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
