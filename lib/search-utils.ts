/**
 * Phonetic mapping for Banglish to Bengali.
 * This is a simplified version of phonetic transliteration.
 */

const banglaToPhoneticMap: { [key: string]: string[] } = {
    'অ': ['o', 'a'],
    'আ': ['a'],
    'ই': ['i', 'e'],
    'ঈ': ['i', 'e'],
    'উ': ['u', 'oo'],
    'ঊ': ['u', 'oo'],
    'ঋ': ['ri'],
    'এ': ['e', 'ae'],
    'ঐ': ['oi'],
    'ও': ['o'],
    'ঔ': ['ou'],
    'ক': ['k'],
    'খ': ['kh'],
    'গ': ['g'],
    'ঘ': ['gh'],
    'ঙ': ['ng'],
    'চ': ['ch'],
    'ছ': ['ch', 'chh'],
    'জ': ['j', 'z'],
    'ঝ': ['jh'],
    'ঞ': ['n'],
    'ট': ['t'],
    'ঠ': ['th'],
    'ড': ['d'],
    'ঢ': ['dh'],
    'ণ': ['n'],
    'ত': ['t'],
    'থ': ['th'],
    'দ': ['d'],
    'ধ': ['dh'],
    'ন': ['n'],
    'প': ['p'],
    'ফ': ['f', 'ph'],
    'ব': ['b', 'v'],
    'ভ': ['bh', 'v'],
    'ম': ['m'],
    'য': ['j', 'z'],
    'র': ['r'],
    'ল': ['l'],
    'শ': ['sh', 's'],
    'ষ': ['sh', 's'],
    'স': ['s', 'sh'],
    'হ': ['h'],
    'ড়': ['r'],
    'ঢ়': ['rh'],
    'য়': ['y'],
    'ৎ': ['t'],
    'ং': ['ng'],
    'ঃ': ['h'],
    'ঁ': ['n'],
    'া': ['a'],
    'ি': ['i', 'e'],
    'ী': ['i', 'e'],
    'ু': ['u', 'oo'],
    'ূ': ['u', 'oo'],
    'ৃ': ['ri'],
    'ে': ['e', 'ae'],
    'ৈ': ['oi'],
    'ো': ['o'],
    'ৌ': ['ou'],
    '্': [''], // Hasant
    '্র': ['r'], // r phal
    '্য': ['y'], // y phal
    '্লা': ['la'],
    '্প': ['p'],
    '্ন': ['n'],
    'ম্প': ['mp'],
    'স্ত': ['st'],
    'ষ্ঠ': ['shth'],
    'ষ্ট': ['sht'],
    'ঙ্ক': ['nk'],
    'ঙ্গ': ['ng'],
    'জ্জ': ['jj'],
    'ত্ত': ['tt'],
    'দ্দ': ['dd'],
    'দ্ধ': ['ddh'],
    'ন্ন': ['nn'],
    'বব': ['bb'],
    'ম্ম': ['mm'],
    'ল্ল': ['ll'],
    'স্ব': ['sw', 's'],
    'স্ম': ['sm', 's'],
    'হ্ম': ['m'],
};

/**
 * Normalizes a string by converting to lowercase English phonetics.
 * If ignoreVowels is true, it removes vowels to allow fuzzy matching.
 */
export function getPhoneticVariations(text: string, ignoreVowels: boolean = false): string {
    if (!text) return "";

    let phonetic = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const mapping = banglaToPhoneticMap[char];
        if (mapping) {
            const p = mapping[0];
            if (ignoreVowels && ['a', 'e', 'i', 'o', 'u'].includes(p)) continue;
            phonetic += p;
        } else if (/[a-zA-Z0-9]/.test(char)) {
            const c = char.toLowerCase();
            if (ignoreVowels && ['a', 'e', 'i', 'o', 'u'].includes(c)) continue;
            phonetic += c;
        }
    }
    return phonetic;
}

/**
 * Checks if a search term matches a target string, supporting Banglish phonetic search.
 */
export function matchesSearch(target: string, searchTerm: string): boolean {
    if (!searchTerm) return true;
    if (!target) return false;

    const normalizedTarget = target.toLowerCase();
    const normalizedSearch = searchTerm.toLowerCase();

    // 1. Direct match (including partial)
    if (normalizedTarget.includes(normalizedSearch)) return true;

    // 2. Phonetic match for Bengali text
    if (/[\u0980-\u09FF]/.test(target)) {
        const targetPhonetic = getPhoneticVariations(target);

        // Exact phonetic match
        if (targetPhonetic.includes(normalizedSearch)) return true;

        // Fuzzy phonetic match (ignoring vowels)
        // This allows "prostab" to match "prstab" (প্রস্তাব)
        const targetFuzzy = getPhoneticVariations(target, true);
        const searchFuzzy = getPhoneticVariations(searchTerm, true);

        if (searchFuzzy && targetFuzzy.includes(searchFuzzy)) return true;
    }

    return false;
}
