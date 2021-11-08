import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './CountdownTimer.module.css';

interface ICountdownTimerProps {
    eventDate: Date;
}

const CountdownTimer: FC<ICountdownTimerProps> = ({eventDate}) => {

    const [countdownString, setCountdownString] = useState('');

    const eventSeconds = eventDate.valueOf();

    useEffect(() => {

        const interval = setInterval(() => {
            const timeString = calculateTime();

            setCountdownString(timeString);  
        }, 1000);

        console.log(countdownString);
        
        if (countdownString === '00 00:00:00')
            clearInterval(interval);

        return () => clearInterval(interval);
    }, [countdownString]);

    const calculateTime = (): string => {
        let count: number;

        const current = Date.now().valueOf();

        const difference = eventSeconds - current;

        if (difference <= 0)
            return '00 00:00:00';
            
        const days = Math.floor(difference / 86400000);

        count = difference - days * 86400000;

        const hours = Math.floor(count / 1000 / 60 / 60 % 24);

        count = count - hours * 1000 * 3600;

        const minutes = Math.floor(count / 1000 / 60 % 60);

        count = count - minutes * 60 * 1000;

        const seconds = Math.floor(count / 1000 % 60);

        return `${timeFormat(days)} ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}`;
    }

    const timeFormat = (timeInput: number): string => {
        if (timeInput < 10) return `0${timeInput}`;

        return timeInput.toString();
    }

    return (
        <div>
            
        </div>
    ); 
}

export default CountdownTimer;