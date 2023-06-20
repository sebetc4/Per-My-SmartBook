export const toRoman = (num: number): string => {
    const romanEquivalence: { [key: string]: number } = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result = '';
    for (let roman in romanEquivalence) {
        while (num >= romanEquivalence[roman]) {
            result += roman;
            num -= romanEquivalence[roman];
        }
    }
    return result;
};

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
