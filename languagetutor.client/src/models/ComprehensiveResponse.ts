import { TranslationResponse } from './TranslationResponse';
import { WordDictionary } from './WordDictionary';
export interface ComprehensiveResponse {
    lines: TranslationResponse[];
    words: WordDictionary;
}
