import { DescriptionEntry } from '../models/WordDictionary';

export const getWordLink = (lang: string, word: string) => {
    let res = "";
    let wrd = encodeURIComponent(word.trim());
    switch (lang) {
        case "nb":
            res = "https://ordbokene.no/nno/bm/" + wrd;
            break;
        case "nn":
            res = "https://ordbokene.no/nno/nn/" + wrd;
            break;
    }
    return res;
};

export const getGenderInfo = (val: string | undefined): string => {
    if (!val) {
        return "";
    }
    return val;
};

export const declinationPart = (key: string): string => {
    switch (key) {
        case "Inf":
            return "Infinitive";
        case "Pres":
            return "Present";
        case "Imp":
            return "Imperative";
        case "Inf-Pass":
            return "Infinitive Passive";
        case "Pres-Pass":
            return "Present Passive";
        case "PerfPart":
            return "Perfect";
        case "Adj-PerfPart-Neuter-Ind-Sing":
            return "Neutral Singular Participle";
        case "Adj-PerfPart-Masc_Fem-Ind-Sing":
            return "Masculine and Feminine";
        case "Adj-PerfPart-Def-Sing":
            return "Definite Singular";
        case "Adj-PerfPart-Plur":
            return "Plural Participle";
        case "Adj-PresPart":
            return "Present Participle";
        case "Sing-Ind":
            return "Indefinite Singular";
        case "Sing-Def":
            return "Definite Singular";
        case "Plur-Ind":
            return "Indefinite Plural";
        case "Plur-Def":
            return "Definite Plural";
    }
    return key ? key : "Any";
};

export const getLangsFromDescriptionEntries = (val: DescriptionEntry[], langFilter: { [key: string]: boolean; } | undefined): string[] => {
    const res = [] as string[];
    const done = {} as { [key: string]: boolean };
    const n = val.length;
    for (let i = 0; i < n; i++) {
        const el = val[i].tr || {};
        Object.keys(el).forEach((key) => {
            if (!done[key]) {
                done[key] = true;
                if (!langFilter || langFilter[key]) {
                    res.push(key);
                } 
            }
        });
    }
    return res;
}

export const convertToLangFilter = (langs: string[]): { [key: string]: boolean } => {
    const res = {} as { [key: string]: boolean };
    langs.forEach((lang: string) => res[lang] = true);
    return res;
};
