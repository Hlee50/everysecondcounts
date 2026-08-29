import { useEffect } from 'react'
import './Timer.css'

interface TimerProps {
    timeUntil: number;
    setTimeUntil: React.Dispatch<React.SetStateAction<number>>;
    targetDate: Date | null;
}


export function Timer({ timeUntil, setTimeUntil, targetDate}: TimerProps) {
    useEffect(() => {
        if (!targetDate) return;
        const updateTime = () => {
            setTimeUntil(Math.max(0, targetDate.getTime() - Date.now()));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [setTimeUntil, targetDate]);

    const hours = Math.floor(timeUntil / 3600000);
    const minutes = Math.floor((timeUntil % 3600000) / 60000);
    const seconds = Math.floor((timeUntil % 60000) / 1000);

    const renderDigits = (digits: number) =>
        digits.toString().padStart(2, "0").split("").map((digit, i) => (
            <span className='digit' key={i}>{digit}</span>
    ));

    return (
        <>
            <div className='digits'>
                {renderDigits(hours)}
                <span className="colon">:</span>
                {renderDigits(minutes)}
                <span className="colon">:</span>
                {renderDigits(seconds)}
            </div>
        </>
    );
}