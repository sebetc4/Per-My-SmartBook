import { describe, it, expect } from 'vitest';
import { roundNearestTenth } from './number.functions';

describe('roundNearestTenth', () => {
    it('Return number rounded to the tenth for 3.75', () => {
        const number = 3.71
        expect(roundNearestTenth(number)).toBe(3.7);
    });
    it('Return number rounded to the tenth for 3.75', () => {
        const number = 3.75
        expect(roundNearestTenth(number)).toBe(3.8);
    });
    it('Return number rounded to the tenth for 4.5', () => {
        const number = 4.50
        expect(roundNearestTenth(number)).toBe(4.5);
    });
    it('Return number rounded to the tenth for 4', () => {
        const number = 4
        expect(roundNearestTenth(number)).toBe(4);

    });
});