import { AssistantMessage } from './assistant-message';
import { Message } from 'ai';
import { HumanMessage } from './human-message';

// const isMessage = (message: Message | Metadata): message is Message {
//   return typeof message === 'Message';
// }

function isUserMessage(message: any): message is Message {
    return message.role === 'user';
}

function isAssistantMessage(message: any): message is Message {
    return message.role === 'assistant';
}

export const ChatBubble = ({ message, loading }: { message: any, loading: boolean }) => {
    if (isUserMessage(message)) {
        // human
        return (
            <div className="px-2">
                <HumanMessage message={message} />
            </div>
        );
    } else if (isAssistantMessage(message)) {
        // assistant
        return (
            <div className="px-2">
                <AssistantMessage isLoading={loading} message={message} />
            </div>
        );
    } else {
        // other as-yet unlabelled messages
        return <></>;
    }
};
