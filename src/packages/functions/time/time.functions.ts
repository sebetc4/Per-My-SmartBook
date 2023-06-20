export const waitStartTime = async (startAt: number) => {
    const waitTime = startAt - Date.now();
    if (waitTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
};

export const getNextDayOrTodayAtHour = (hour: number): Date => {
    const now = new Date(); 
    if (now.getHours() < hour) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour); 
    } else {
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); 
        return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), hour);    }
};
