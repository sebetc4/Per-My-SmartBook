import { StoryImageStyle } from "../types";

export class StoryImageStyleClass {
    static list: StoryImageStyleClass[] = [];
    static readonly REALISTIC = new StoryImageStyleClass('realistic', 'Hyperrealistic');
    static readonly DRAWING = new StoryImageStyleClass('drawing', 'Drawing');
    static readonly COMIC_STYLE = new StoryImageStyleClass('comicStyle', 'Animated, Comic-style art');
    static readonly DIGITAL_ART = new StoryImageStyleClass('digitalArt', 'Digital art');
    static readonly PAINTING = new StoryImageStyleClass('painting', 'Painting');
    private constructor(readonly value: StoryImageStyle, readonly sentence: string) {
        StoryImageStyleClass.list.push(this);
    }
    static getAllValues() {
        return this.list.map((style) => style.value);
    }
    static getRandomValue() {
        const allValues = this.getAllValues();
        return allValues[Math.floor(Math.random() * allValues.length)];
    }
    static getAllInstances() {
        return this.list;
    }
    static getSentence(value: StoryImageStyle) {
        return this.getAllInstances().find((style) => style.value === value)?.sentence
    }
}
