export const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

export const lightenHexColor = (hex: string, percent: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.round(Math.min(255, r + (255 - r) * percent));
    const newG = Math.round(Math.min(255, g + (255 - g) * percent));
    const newB = Math.round(Math.min(255, b + (255 - b) * percent));
    const newHex =
        '#' +
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');
    return newHex;
};

export const darkenHexColor = (hex: string, percent: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.round(r - r * percent);
    const newG = Math.round(g - g * percent);
    const newB = Math.round(b - b * percent);
    const newHex =
        '#' +
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');

    return newHex;
};

export const  hexToRgba =(hex: string, opacity: number): string => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${opacity}`
}

export const  boxShadowWithHexToRgb =(hex: string, shadowParams: string): string => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
      return `rgb(${r},${g},${b}) ${shadowParams}`
}