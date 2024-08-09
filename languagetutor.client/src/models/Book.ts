import { TranslateBlock } from './TranslateBlock';

export interface Book {
    resource: string;
    code: string;
    name: string;
    chapters: number;
    translate: TranslateBlock;
};