import { useState, useEffect } from 'react'
import './Timer.css'

interface TimerProps {
    countdownDate: Date;
}

export function Timer({ countdownDate }: TimerProps) {
    const [timeUntil, setTimeUntil] = useState(0);
    
    useEffect(() => {
        const updateTime = () => {
            setTimeUntil(Math.max(0, countdownDate.getTime() - Date.now()));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [countdownDate]);

    const hours = Math.floor(timeUntil / 3600000);
    const minutes = Math.floor((timeUntil % 3600000) / 60000);
    const seconds = Math.floor((timeUntil % 60000) / 1000);

    const renderDigits = (digits: number) =>
        digits.toString().padStart(2, '0').split('').map((digit, i) => (
            <span className="digit" key={i}>{digit}</span>
    ));

    return (
        <>
            <div className="digits">
                {renderDigits(hours)}
                <span className="colon">:</span>
                {renderDigits(minutes)}
                <span className="colon">:</span>
                {renderDigits(seconds)}
            </div>
        </>
    );
}