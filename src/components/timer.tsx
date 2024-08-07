'use client';

import React, { useState, useEffect } from 'react';
import { AlarmClock } from 'lucide-react';
import classNames from 'classnames';

interface TimerProps {
    maxMinutes: number;
    status: boolean;
    sessionId: string;
    onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ maxMinutes, status, sessionId, onComplete }) => {
    const localStorageKey = `timer-${sessionId}`;

    const initialTime = () => {
        const savedTime = localStorage.getItem(localStorageKey);
        return savedTime ? parseInt(savedTime, 10) : maxMinutes * 60;
    };

    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        localStorage.setItem(localStorageKey, timeLeft.toString());
    }, [timeLeft, localStorageKey]);

    useEffect(() => {
        if (!status) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    if (onComplete) onComplete();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, onComplete]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isTimeRunningOut = timeLeft <= 300; // 300 seconds = 5 minutes

    return (
        <div
            className={classNames('flex items-center gap-2 p-2 rounded-md', {
                'bg-gray-200': !status,
                'bg-green-200': status && !isTimeRunningOut,
                'bg-red-200': isTimeRunningOut,
            })}
        >
            <AlarmClock size={16} />
            <span
                className={classNames('font-mono', { 'text-red-500': isTimeRunningOut })}
                style={{ minWidth: '50px', textAlign: 'center' }}
            >
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default Timer;
