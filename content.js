// Author: itsPenguin199 | 2025
// All rights reserved.
const GOKTURK_MAP = {
    'a': '𐰀', 'e': '𐰀', 'ı': '𐰃', 'i': '𐰃', 
    'o': '𐰆', 'u': '𐰆', 'ö': '𐰇', 'ü': '𐰇',
    'b': { k: '𐰉', i: '𐰋' },
    'd': { k: '𐰑', i: '𐰓' },
    'g': { k: '𐰶', i: '𐰯' },
    'k': { k: '𐰴', i: '𐰚' },
    'l': { k: '𐰞', i: '𐰜' },
    'n': { k: '𐰣', i: '𐰤' },
    'r': { k: '𐰺', i: '𐰼' },
    's': { k: '𐰽', i: '𐰾' },
    't': { k: '𐱃', i: '𐱅' },
    'y': { k: '𐰖', i: '𐰘' },
    'ç': '𐰲', 'm': '𐰢', 'p': '𐰯', 'ş': '𐱁', 'z': '𐰕', 'v': '𐰿', 'h': '𐰴', 'ğ': '𐰶'
};

const VOWELS_KALIN = ['a', 'ı', 'o', 'u'];

const translateWord = (word) => {
    const lower = word.toLowerCase();
    const isKalin = [...lower].some(c => VOWELS_KALIN.includes(c));
    
    return [...lower].map(char => {
        const map = GOKTURK_MAP[char];
        if (!map) return char;
        return typeof map === 'object' ? (isKalin ? map.k : map.i) : map;
    }).join('');
};

const processText = (text) => text.split(' ').map(translateWord).join(' ');

const initTranslation = () => {
    const selectors = [
        'yt-formatted-string', 
        '#video-title', 
        '#content-text', 
        '.yt-core-attributed-string', 
        'h1.ytd-watch-metadata'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        if (el.innerText?.trim() && !el.hasAttribute('data-done')) {
            el.innerText = processText(el.innerText);
            el.setAttribute('data-done', 'true');
            el.classList.add('gokturk-v2');
        }
    });
};

const observer = new MutationObserver(initTranslation);
observer.observe(document.body, { childList: true, subtree: true });

initTranslation();