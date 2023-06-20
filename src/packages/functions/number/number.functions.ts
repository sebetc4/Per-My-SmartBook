export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const roundNearestTenth = (number: number): number => {
    return Math.round((number) * 10) / 10;
};
