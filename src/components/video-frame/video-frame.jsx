'use client';
import { Maximize2, Minimize2, ChevronLeft, X, Disc } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import socketIOClient from 'socket.io-client';

const VideoAudioRecorder = ({sessionId, userId}) => {
  const socket = React.useMemo(
    () => socketIOClient('172.166.224.130:4000'),
    []
  );

  socket.on('connect', () => {
    socket.emit('session_started', { sessionId, userId }, (response) => {
      console.log(response);
    });
    console.log('connected');
  });

  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);
  const draggableRef = useRef(null);

  useEffect(() => {
    if (recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recording]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecording((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          setAudioChunks(chunks);
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], 'recorded_audio.wav');
          sendAudioToServer(audioFile);
        };
        mediaRecorder.start();
      })
      .catch((error) => console.error('Error accessing microphone:', error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const sendAudioToServer = async (audioFile) => {
    try {
      if (!socket) {
        console.error('Socket reference is not available');
        return;
      }

      if (!audioFile) {
        console.error('Audio file is not available');
        return;
      }

      socket.emit('audio', audioFile, sessionId, async (response) => {
        console.log('Response from server:', response);
        if (response?.success) {
          console.log(response.message, audioFile);
        } else {
          console.log('Failed to send audio file to server:', audioFile);
        }
      });
    } catch (error) {
      if (error.type === 'network') {
        console.error('Network error sending audio:', error);
        //TODO: Implement retry logic here
      } else {
        console.error('Unexpected error sending audio:', error);
      }
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoStream(stream); // Save the video stream
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
    const intervalId = setInterval(sendFrame, 10000);

    return () => {
      clearInterval(intervalId);
      // if (socket) {
      //   socket.disconnect();
      // }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [isMinimized, isHidden, isMaximized, videoStream]);

  const sendFrame = () => {
    if (!videoRef.current) {
      console.error('Video reference is not available');
      return;
    }

    if (!socket) {
      console.error('Socket reference is not available');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) {
      console.error('Canvas or context is not available');
      return;
    }

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frameData = canvas.toDataURL('image/jpeg').split(',')[1];

    if (!frameData) {
      console.error('Frame data is not available');
      return;
    }

    socket.emit('frame', { sessionId, userId, frameData });
  };

  const handleHide = () => {
    setIsHidden(true);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    setIsMaximized(true);
  };

  const handleShow = () => {
    setIsHidden(false);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  if (isHidden) {
    return (
      <button
        onClick={handleShow}
        className="z-10 fixed top-8 right-0 p-0 bg-blue-300 text-white rounded-r-full rounded-l-md"
      >
        <a title="Show">
          <ChevronLeft strokeWidth={5} size={25} />
        </a>
      </button>
    );
  }

  return (
    <Draggable nodeRef={draggableRef}>
      <div
        ref={draggableRef}
        className={`z-10 fixed bottom-4 right-4 bg-white border shadow-lg ${
          isMinimized ? 'h-12 w-40' : 'h-auto w-auto'
        } ${isMaximized ? 'h-auto w-auto' : ''} rounded-lg`}
      >
        <div className="flex justify-between items-center p-2 bg-gray-800 text-blue rounded-t-lg">
          <span className="flex items-center rounded-full opacity-75">
            <Disc
              className="animate-pulse"
              strokeWidth={3}
              color="red"
              size={15}
            />
          </span>
          <span className="font-semibold text-white w-5"></span>
          <div className="flex space-x-2 gap-2">
            <button
              onClick={() =>
            {console.log('session_ended', { sessionId, userId })  
                socket.emit(
                  'session_ended',
                  { sessionId, userId },
                  (response) => console.log(response)
                )}
              }
            >
              end session
            </button>
            {!isMinimized && !isMaximized && (
              <button onClick={handleMinimize}>
                <Minimize2 size={15} />
              </button>
            )}
            {isMinimized && (
              <button onClick={handleMaximize}>
                <Maximize2 size={15} />
              </button>
            )}
            {isMaximized && (
              <button onClick={handleMinimize}>
                <Minimize2 size={15} />
              </button>
            )}
            <button onClick={handleHide}>
              <X size={15} />
            </button>
          </div>
        </div>
        {!isMinimized && (
          <div className="p-2">
            <video ref={videoRef} autoPlay className="rounded-lg" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default VideoAudioRecorder;
