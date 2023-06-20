import { useEffect, useState } from 'react';

export const useTimeLeftTimer = (time: number) => {
    // State
    const [timeLeft, setTimeLeft] = useState({
        h: 0,
        m: 0,
        s: 0,
        isInitialized: false,
    });

    useEffect(() => {
        const counterInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = time - now;
            if (distance <= 0) {
                clearInterval(counterInterval);
                setTimeLeft({
                    h: 0,
                    m: 0,
                    s: 0,
                    isInitialized: true,
                });
            } else {
                setTimeLeft({
                    h: Math.floor(distance / (1000 * 60 * 60)),
                    m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((distance % (1000 * 60)) / 1000),
                    isInitialized: true,
                });
            }
        }, 1000);

        return () => {
            clearInterval(counterInterval);
        };
    }, [time]);

    return { timeLeft };
};
