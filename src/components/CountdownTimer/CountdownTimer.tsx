import React, { FC, useEffect, useState } from 'react';
import classes from './CountdownTimer.module.css';

interface ICountdownTimerProps {
    eventDate: Date;
}

interface ICalculateDataResult {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ZERO_TIME = '00 00:00:00';

const CountdownTimer: FC<ICountdownTimerProps> = ({eventDate}) => {

    const [countdownString, setCountdownString] = useState('');
    const eventMilliseconds = eventDate.valueOf();

    let interval: any;

    useEffect(() => {
        interval = setInterval(() => {
            const timeString = getCountdownString();

            setCountdownString(timeString);  
        }, 1000);

        return () => {
            clearInterval(interval as number);
        };
    }, [])

    useEffect(() => {
        //console.log(countdownString);

        if (countdownString === ZERO_TIME)
            clearInterval(interval as number);

    }, [countdownString])

    /**
     * Возвращает результат расчета временного промежутка между текущей датой
     * и датой события в виде строки с указанием количества дней, часов, минут
     * и секунд
     */
    const getCountdownString = (): string => {
        
        const current = Date.now().valueOf();

        const difference = eventMilliseconds - current;

        if (difference <= 0)
            return ZERO_TIME;
            
        const result = calculateRestOfTime(difference);

        return getTimeFormatString({...result});
    }

    /**
     * Рассчитывает количество полученных миллисекунд в днях, часах, минутих и секундах
     */
    const calculateRestOfTime = (milliseconds: number): ICalculateDataResult => {
        let count: number;

        const days = Math.floor(milliseconds / 86400000);

        count = milliseconds - days * 86400000;

        const hours = Math.floor(count / 1000 / 60 / 60 % 24);

        count = count - hours * 1000 * 3600;

        const minutes = Math.floor(count / 1000 / 60 % 60);

        count = count - minutes * 60 * 1000;

        const seconds = Math.floor(count / 1000 % 60);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     * Возвращает итоговую строку со значением остатка дней, часов, минут и секунд
     */
    const getTimeFormatString = ({days, hours, minutes, seconds}: ICalculateDataResult): string => {
        return `${timeFormat(days)} ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}`;
    }

    /**
     * Возвращает полученное число в виде строки с добавленным ведущим нулем
     * @param time время или дата
     */
    const timeFormat = (time: number): string => time < 10 ? `0${time}` : time.toString();

    return (
        <div>
           <p>{countdownString}</p>
        </div>
    ); 
}

export default CountdownTimer;