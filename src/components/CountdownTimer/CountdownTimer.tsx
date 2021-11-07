import React, { FC } from 'react';
import classes from './CountdownTimer.module.css';

interface ICountdownTimerProps {
    eventDate: Date;
    styles?: React.CSSProperties;
}

const CountdownTimer: FC<ICountdownTimerProps> = ({eventDate, styles}) => {

    return (
        <div>
            
        </div>
    ); 
}

export default CountdownTimer;