export interface LangDictionary {
    [key: string]: string;
}

export interface DeclinationEntry {
    [key: string]: string;
}

export interface DescriptionEntry {
    orig: string;
    tr: LangDictionary;
}

export interface ExpressionEntry {
    tran: DescriptionEntry;
    orig: string;
    description: DescriptionEntry[];
    deepDescription: DescriptionEntry[];
}
export interface DictionaryEntry {
    tr?: LangDictionary;
    or?: string;
    gender?: string;
    declination?: DeclinationEntry;
    description?: DescriptionEntry[];
    deepDescription?: DescriptionEntry[];
    expression?: ExpressionEntry[];
};
export interface WordDictionary {
    [key: string]: DictionaryEntry;
}
