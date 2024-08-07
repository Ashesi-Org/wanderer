import React, { useCallback, useEffect } from 'react';
import { Message } from 'ai/react';
import { useMicrophone } from '@/contexts/microphone';
import { useNowPlaying } from 'react-nowplaying';
import { useSubmit } from '@/lib/hooks/use-submit';
import { Input } from './ui/input';
import { Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Audio } from 'react-loader-spinner'

export const AudioIcon = () => {
    return (
        <Audio
            height="20"
            width="20"
            color="white"
            ariaLabel="three-dots-loading"
        />
    )
}

export const Controls = ({
    input,
    handleSubmit,
    handleInputChange,
    messages,
}: {
    input: string;
    handleSubmit: any;
    handleInputChange: any;
    messages: Message[];
}) => {
    const { startMicrophone, stopMicrophone, microphoneOpen } = useMicrophone();
    const { formRef, onKeyDown } = useSubmit();

    // useEffect(() => {
    //     startMicrophone();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const microphoneToggle = useCallback(
        async (e: Event) => {
            e.preventDefault();

            if (microphoneOpen) {
                stopMicrophone();
            } else {
                startMicrophone();
            }
        },
        [microphoneOpen, startMicrophone, stopMicrophone]
    );

    const { stop: stopAudio } = useNowPlaying();

    const submitter = useCallback(
        (e: any) => {
            handleSubmit(e);
            stopAudio();
            e.target.value = '';
            handleInputChange(e);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [stopAudio, handleSubmit]
    );

    return (
        <>
            {messages.length !== 0 && (
                <div className="sticky border-t transition-all duration-300 bg-background backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <div className="dark:border-zinc-700 flex-1 px-3 py-2">
                            <form
                                onSubmit={submitter}
                                ref={formRef}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    // startIcon={AtSign}
                                    className="flex-1 h-10 w-full chatinput"
                                    placeholder={`Press "/" for commands`}
                                />
                                {input.length === 0 ? (
                                    <Button
                                        onClick={(e: any) => microphoneToggle(e)}
                                        className={`rounded-full w-12 h-12`}
                                    >
                                        {microphoneOpen ? (
                                            <AudioIcon />
                                        ) : (
                                            <Mic size={20} />
                                        )}
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
            )}
        </>
    );
};
