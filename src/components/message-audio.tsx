import { Message } from 'ai/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAudioStore } from '@/contexts/audio-store';
import { useNowPlaying } from 'react-nowplaying';
import { Loader2, Volume2 } from 'lucide-react';

const MessageAudio = ({
    message: { id },
    className = '',
    ...rest
}: {
    message: Message;
    className?: string;
}) => {
    const { audioStore } = useAudioStore();
    const { player, uid, resume: resumeAudio, play: playAudio } = useNowPlaying();
    const [playing, setPlaying] = useState(false);

    const found = useMemo(() => {
        return audioStore.find((item) => item.id === id);
    }, [audioStore, id]);

    useEffect(() => {
        setPlaying(uid === id);
    }, [uid, id]);

    const pause = useCallback(() => {
        if (!player) return;

        player.pause();
        setPlaying(false);
    }, [player]);

    const play = useCallback(() => {
        if (!player || !found) return;

        if (uid === found.id) {
            resumeAudio();
        } else if (found) {
            playAudio(found.blob, 'audio/mp3', id);
        }

        setPlaying(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, found, id]);

    /**
     * Spinner if still waiting for a response
     */
    if (!found) {
        return <Loader2 className=" h-4 w-4 animate-spin" />;
    }

    /**
     * Pause button
     *
     * audio === this message
     * AND
     * playing === true
     */
    if (playing) {
        return (
            <a href="#" onClick={() => pause!()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 fill-white hover:fill-[#dde8f0] ${className}`}
                    {...rest}
                >
                    <path
                        fillRule="evenodd"
                        d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
        );
    }

    /**
     * Play button
     *
     * audio !== this message
     * OR
     * paused === true
     */
    if (!playing) {
        return (
            <a href="#" onClick={() => play()}>
                <Volume2 size={20} />
            </a>
        );
    }

    return <></>;
};

export { MessageAudio };
