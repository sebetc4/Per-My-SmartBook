import { StoryDuration } from '../types';

export class StoryDurationClass {
    static list: StoryDurationClass[] = [];
    static readonly VERY_SHORT = new StoryDurationClass('veryShort', 2);
    static readonly SHORT = new StoryDurationClass('short', 10);
    static readonly MEDIUM = new StoryDurationClass('medium', 15);
    static readonly LONG = new StoryDurationClass('long', 20);
    static readonly VERY_LONG = new StoryDurationClass('veryLong', 25);
    private constructor(readonly value: StoryDuration, readonly duration: number) {
        StoryDurationClass.list.push(this);
    }
    static getAllInstances() {
        return this.list;
    }
    static isEnd(durationValue: StoryDuration, currentStep: number) {
        return this.list.find((duration) => duration.value === durationValue)?.duration! <= currentStep + 1;
    }
    static getDuration(value: StoryDuration) {
        return StoryDurationClass.getAllInstances().find((item) => item.value === value)?.duration;
    }
}
