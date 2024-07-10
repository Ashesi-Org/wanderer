import { Message } from 'ai/react';
import { useMessageData } from '@/contexts/message-metadata';
import { useAudioStore } from '@/contexts/audio-store';
import { voiceMap } from '@/contexts/deepgram';
import moment from 'moment';

const MessageHeader = ({
    message,
    className = '',
}: {
    message: Message;
    className?: string;
}) => {
    const { audioStore } = useAudioStore();
    const { messageData } = useMessageData();

    const foundAudio = audioStore.findLast((item) => item.id === message.id);
    const foundData = messageData.findLast((item) => item.id === message.id);

    if (message.role === 'assistant') {
        return (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-white">
                    {foundAudio?.model
                        ? voiceMap(foundAudio?.model).name
                        : foundData?.ttsModel
                            ? voiceMap(foundData?.ttsModel).name
                            : 'Deepgram AI'}
                </span>
                <span className="text-xs font-normal text-gray-400">
                    {moment().calendar()}
                </span>
            </div>
        );
    }
};

export { MessageHeader };
