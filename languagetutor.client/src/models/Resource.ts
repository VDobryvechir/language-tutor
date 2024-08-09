import { TranslateBlock } from './TranslateBlock';

export interface ResourceOptions {
    showOrderNo?: boolean;
}

export interface Resource {
    code: string;
    name: string;
    translate: TranslateBlock; 
    options: ResourceOptions;
    langs: string[];
    activeLangs: string[]; 
};



























