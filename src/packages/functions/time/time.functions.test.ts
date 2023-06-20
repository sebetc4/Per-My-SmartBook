import { describe, it, expect } from 'vitest';
import { getNextDayOrTodayAtHour } from './time.functions';

describe('getNextDayOrTodayAtHour', () => {
    it('Return the correct date for next 4:00 AM', () => {
        const hour = 4;
        const now = new Date();
        const expected =
            now.getHours() < hour
                ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
                : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour);
        const result = getNextDayOrTodayAtHour(hour);
        expect(result.getTime()).toBe(expected.getTime());
    });
    it('Return the correct date for next 17:00 AM', () => {
        const hour = 17;
        const now = new Date();
        const expected =
            now.getHours() < hour
                ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
                : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour);
        const result = getNextDayOrTodayAtHour(hour);
        expect(result.getTime()).toBe(expected.getTime());
    });
    it('Return the correct date for next 21:00 AM', () => {
        const hour = 21;
        const now = new Date();
        const expected =
            now.getHours() < hour
                ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour)
                : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour);
        const result = getNextDayOrTodayAtHour(hour);
        expect(result.getTime()).toBe(expected.getTime());
    });
});
