import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controls } from './controls';
import useCompilerStore from '@/store/editor-store';
import { useChat } from '@ai-sdk/react';
import { Message } from 'ai';
import { AssistantMessage } from './assistant-message';
import { HumanMessage } from './human-message';
import { useDeepgram } from '@/contexts/deepgram';
import { useAudioStore } from '@/contexts/audio-store';
import { useMessageData } from '@/contexts/message-metadata';
import { useMicrophone } from '@/contexts/microphone';
import { useNowPlaying } from 'react-nowplaying';
import { useQueue } from '@uidotdev/usehooks';
import {
  contextualGreeting,
  generateRandomString,
  utteranceText,
} from '@/lib/helpers';
import { systemContent } from '@/lib/constants';
import { useMicVAD } from '@ricky0123/vad-react';
import { MessageMetadata } from '@/lib/types';
import {
  LiveClient,
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
} from '@deepgram/sdk';
import { NoChatPlaceholder } from './no-chat-placeholder';
import { InitialLoad } from './initial-load';
import { ChatBubble } from './chat-bubble';

export default function ChatInput({
  interviewQuestion,
}: {
  interviewQuestion: string;
}) {
  // AI CHAT
  const { ttsOptions, connection, connectionReady } = useDeepgram();
  const { addAudio } = useAudioStore();
  const { player, stop: stopAudio, play: startAudio } = useNowPlaying();
  const { addMessageData } = useMessageData();
  const {
    microphoneOpen,
    queue: microphoneQueue,
    queueSize: microphoneQueueSize,
    firstBlob,
    removeBlob,
    stream,
  } = useMicrophone();

  /**
   * Queues
   */
  const {
    add: addTranscriptPart,
    queue: transcriptParts,
    clear: clearTranscriptParts,
  } = useQueue<{ is_final: boolean; speech_final: boolean; text: string }>([]);

  /**
   * Refs
   */
  const messageMarker = useRef<null | HTMLDivElement>(null);

  /**
   * State
   */
  const [initialLoad, setInitialLoad] = useState(true);
  const [isProcessing, setProcessing] = useState(false);

  /**
   * Request audio from API
   */
  const requestTtsAudio = useCallback(
    async (message: Message) => {
      const start = Date.now();
      const model = ttsOptions?.model ?? 'aura-asteria-en';

      const res = await fetch(`/api/speak?model=${model}`, {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(message),
      });

      const headers = res.headers;

      const blob = await res.blob();

      startAudio(blob, 'audio/mp3', message.id).then(() => {
        addAudio({
          id: message.id,
          blob,
          latency: Number(headers.get('X-DG-Latency')) ?? Date.now() - start,
          networkLatency: Date.now() - start,
          model,
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ttsOptions?.model]
  );

  const [llmNewLatency, setLlmNewLatency] = useState<{
    start: number;
    response: number;
  }>();

  const onFinish = useCallback(
    (msg: any) => {
      requestTtsAudio(msg);
    },
    [requestTtsAudio]
  );

  const onResponse = useCallback((res: Response) => {
    (async () => {
      setLlmNewLatency({
        start: Number(res.headers.get('x-llm-start')),
        response: Number(res.headers.get('x-llm-response')),
      });
    })();
  }, []);

  const systemMessage: Message = useMemo(
    () => ({
      id: generateRandomString(7),
      role: 'system',
      content: "You are a helpful assistant",
    }),
    []
  );

  const greetingMessage: Message = useMemo(
    () => ({
      id: generateRandomString(7),
      role: 'assistant',
      content: contextualGreeting(),
    }),
    []
  );

  const { code } = useCompilerStore();
  const {
    messages: chatMessages,
    append,
    input,
    handleSubmit,
    isLoading: llmLoading,
    handleInputChange,
  } = useChat({
    id: 'aura',
    api: '/api/openai',
    // initialInput: "Hello",
    initialMessages: [systemMessage, greetingMessage],
    body: {
      currentImplementation: code,
      problem: interviewQuestion,
    },
    onFinish,
    onResponse,
  });

  const [currentUtterance, setCurrentUtterance] = useState<string>();
  const [failsafeTimeout, setFailsafeTimeout] = useState<NodeJS.Timeout>();
  const [failsafeTriggered, setFailsafeTriggered] = useState<boolean>(false);

  const onSpeechEnd = useCallback(() => {
    /**
     * We have the audio data context available in VAD
     * even before we start sending it to deepgram.
     * So ignore any VAD events before we "open" the mic.
     */
    if (!microphoneOpen) return;

    setFailsafeTimeout(
      setTimeout(() => {
        if (currentUtterance) {
          console.log('failsafe fires! pew pew!!');
          setFailsafeTriggered(true);
          append({
            role: 'user',
            content: currentUtterance,
          });
          clearTranscriptParts();
          setCurrentUtterance(undefined);
        }
      }, 1500)
    );

    return () => {
      clearTimeout(failsafeTimeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneOpen, currentUtterance]);

  const onSpeechStart = () => {
    /**
     * We have the audio data context available in VAD
     * even before we start sending it to deepgram.
     * So ignore any VAD events before we "open" the mic.
     */
    if (!microphoneOpen) return;

    /**
     * When we're talking again, we want to wait for a transcript.
     */
    setFailsafeTriggered(false);

    if (!player?.ended) {
      stopAudio();
      console.log('barging in! SHH!');
    }
  };

  useMicVAD({
    startOnLoad: true,
    stream,
    onSpeechStart,
    onSpeechEnd,
    positiveSpeechThreshold: 0.6,
    negativeSpeechThreshold: 0.6 - 0.15,
  });

  useEffect(() => {
    if (llmLoading) return;
    if (!llmNewLatency) return;

    const latestLlmMessage: MessageMetadata = {
      ...chatMessages[chatMessages.length - 1],
      ...llmNewLatency,
      end: Date.now(),
      ttsModel: ttsOptions?.model,
    };

    addMessageData(latestLlmMessage);
  }, [
    chatMessages,
    llmNewLatency,
    setLlmNewLatency,
    llmLoading,
    addMessageData,
    ttsOptions?.model,
  ]);

  /**
   * Contextual functions
   */
  const requestWelcomeAudio = useCallback(async () => {
    requestTtsAudio(greetingMessage);
  }, [greetingMessage, requestTtsAudio]);

  const startConversation = useCallback(() => {
    if (!initialLoad) return;

    setInitialLoad(false);

    // add a stub message data with no latency
    const welcomeMetadata: MessageMetadata = {
      ...greetingMessage,
      ttsModel: ttsOptions?.model,
    };

    addMessageData(welcomeMetadata);

    // get welcome audio
    requestWelcomeAudio();
  }, [
    addMessageData,
    greetingMessage,
    initialLoad,
    requestWelcomeAudio,
    ttsOptions?.model,
  ]);

  useEffect(() => {
    const onTranscript = (data: LiveTranscriptionEvent) => {
      let content = utteranceText(data);

      // i only want an empty transcript part if it is speech_final
      if (content !== '' || data.speech_final) {
        /**
         * use an outbound message queue to build up the unsent utterance
         */
        addTranscriptPart({
          is_final: data.is_final as boolean,
          speech_final: data.speech_final as boolean,
          text: content,
        });
      }
    };

    const onOpen = (connection: LiveClient) => {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
    };

    if (connection) {
      connection.addListener(LiveTranscriptionEvents.Open, onOpen);
    }

    return () => {
      connection?.removeListener(LiveTranscriptionEvents.Open, onOpen);
      connection?.removeListener(
        LiveTranscriptionEvents.Transcript,
        onTranscript
      );
    };
  }, [addTranscriptPart, connection]);

  const getCurrentUtterance = useCallback(() => {
    return transcriptParts.filter(({ is_final, speech_final }, i, arr) => {
      return is_final || speech_final || (!is_final && i === arr.length - 1);
    });
  }, [transcriptParts]);

  const [lastUtterance, setLastUtterance] = useState<number>();
  useEffect(() => {
    const parts = getCurrentUtterance();
    const last = parts[parts.length - 1];
    const content = parts
      .map(({ text }) => text)
      .join(' ')
      .trim();

    /**
     * if the entire utterance is empty, don't go any further
     * for example, many many many empty transcription responses
     */
    if (!content) return;

    /**
     * failsafe was triggered since we last sent a message to TTS
     */
    if (failsafeTriggered) {
      clearTranscriptParts();
      setCurrentUtterance(undefined);
      return;
    }

    /**
     * display the concatenated utterances
     */
    setCurrentUtterance(content);

    /**
     * record the last time we recieved a word
     */
    if (last.text !== '') {
      setLastUtterance(Date.now());
    }

    /**
     * if the last part of the utterance, empty or not, is speech_final, send to the LLM.
     */
    if (last && last.speech_final) {
      clearTimeout(failsafeTimeout);
      append({
        role: 'user',
        content,
      });
      clearTranscriptParts();
      setCurrentUtterance(undefined);
    }
  }, [
    getCurrentUtterance,
    clearTranscriptParts,
    append,
    failsafeTimeout,
    failsafeTriggered,
  ]);

  /**
   * magic microphone audio queue processing
   */
  useEffect(() => {
    const processQueue = async () => {
      if (microphoneQueueSize > 0 && !isProcessing) {
        setProcessing(true);

        if (connectionReady) {
          const nextBlob = firstBlob;

          if (nextBlob && nextBlob?.size > 0) {
            connection?.send(nextBlob);
          }

          removeBlob();
        }

        const waiting = setTimeout(() => {
          clearTimeout(waiting);
          setProcessing(false);
        }, 200);
      }
    };

    processQueue();
  }, [
    connection,
    microphoneQueue,
    removeBlob,
    firstBlob,
    microphoneQueueSize,
    isProcessing,
    connectionReady,
  ]);

  /**
   * keep deepgram connection alive when mic closed
   */
  useEffect(() => {
    let keepAlive: any;
    if (connection && connectionReady && !microphoneOpen) {
      keepAlive = setInterval(() => {
        // should stop spamming dev console when working on frontend in devmode
        if (connection?.getReadyState() !== LiveConnectionState.OPEN) {
          clearInterval(keepAlive);
        } else {
          connection.keepAlive();
        }
      }, 10000);
    } else {
      clearInterval(keepAlive);
    }

    // prevent duplicate timeouts
    return () => {
      clearInterval(keepAlive);
    };
  }, [connection, connectionReady, microphoneOpen]);

  // this works
  useEffect(() => {
    if (messageMarker.current) {
      messageMarker.current.scrollIntoView({
        behavior: 'auto',
      });
    }
  }, [chatMessages]);

  return (
    <div className="flex flex-col w-full h-[calc(100%-95px)] mb-4">

      <div className="flex-2 overflow-y-scroll overflow-x-hidden custom-scrollbar">
        {initialLoad ? (
          <InitialLoad fn={startConversation} connecting={!connection} />
        ) : (
          <>
            {chatMessages.length > 0 &&
              chatMessages.map((message, i) => (
                <div key={i} className='grid grid-cols-1 gap-4 p-3'>
                  <ChatBubble message={message} loading={llmLoading} />
                </div>
              ))}

            {currentUtterance && (
              <div className='grid grid-cols-1 gap-4 p-3'>
                <HumanMessage text={currentUtterance} />
              </div>

            )}



          </>
        )}
      </div>
      {!initialLoad && (
        <Controls
          messages={chatMessages}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input ?? currentUtterance}
        />
      )}
    </div>

  );
}
