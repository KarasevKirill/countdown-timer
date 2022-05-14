import React, { FC, useEffect, useState } from 'react';
import classes from './CountdownTimer.module.css';

type CountdownTimerProps = {
    eventDate: Date;
    eventTitle: string;
}

type CalculateDataResult = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer: FC<CountdownTimerProps> = ({eventDate, eventTitle}) => {

    const [countdownData, setCountdownData] = useState<CalculateDataResult>({
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0
    });

    const [isFirst, setIsFirst] = useState(true);

    const eventMilliseconds = eventDate.valueOf();

    let interval: any;

    useEffect(() => {
        setCountdownData(getCountdownData());

        interval = setInterval(() => {
            setCountdownData(getCountdownData());  
        }, 1000);

        return () => {
            clearInterval(interval as number);
        };
    }, [])

    useEffect(() => {

        if (!isFirst) {
            if (countdownData.days === 0 && countdownData.hours === 0 
                && countdownData.minutes === 0 && countdownData.seconds === 0)
                clearInterval(interval as number);
        }

        setIsFirst(false);
    }, [countdownData])

    /**
     * Возвращает результат расчета временного промежутка между текущей датой
     * и датой события с указанием количества дней, часов, минут и секунд
     */
    const getCountdownData = (): CalculateDataResult => {
        
        const current = Date.now().valueOf();

        const difference = eventMilliseconds - current;

        if (difference <= 0)
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
            
        return calculateRestOfTime(difference);
    }

    /**
     * Рассчитывает количество полученных миллисекунд в днях, часах, минутах и секундах
     */
    const calculateRestOfTime = (milliseconds: number): CalculateDataResult => {
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
     * Возвращает полученное число в виде строки с добавленным ведущим нулем
     * @param time время или дата
     */
    const timeFormat = (time: number): string => time < 10 ? `0${time}` : time.toString();

    return (
        <div className={classes.container}>
            <p>{timeFormat(countdownData.days)} дн. {timeFormat(countdownData.hours)}:{timeFormat(countdownData.minutes)}:{timeFormat(countdownData.seconds)}</p>
        </div>
    ); 
}

export default CountdownTimer;