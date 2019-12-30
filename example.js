/**
 * Example of removing repeated words with pure JavaScript
 * @author Antony Gabriel Pereira
 * Date: 30/12/2019 5:13:10 AM GMT-3
 */

let str = 'Este é é é um exemplo de como remover palavras repetidas repetidas em um um um um texto texto.';
let re = /[^\u00C0-\u1FFF\u2C00-\uD7FF\w]/g; // used to remove special characters


/**
 * If lastOccurrence is null: Return the index of first occurrence of same word
 * If lastOccurrence is not null: Return the index from first occurrence after lastOccurrence, case not exists, returns -1
 *
 * @param {string} text
 * @param {string} word
 * @param {number|null} lastOccurrence
 * @returns {number}
 */
function findWord(text, word, lastOccurrence = null) {
    return text
        .toLowerCase()
        .split('')
        .findIndex((value, index, array) => {
            if (Number.isInteger(lastOccurrence) && index <= lastOccurrence) return false;

            return value === word.split('')[0] &&
                array.slice(index, index + word.length).join('') === word &&
                /[^a-z]/.test(array[index + word.length]);
        });
}

function remove(text) {
    let words = text.split(' ').map(v => v.toLowerCase().replace(re, ''));
    let occurrences = {};

    for (const word of words) {
        let index, newIndex;
        while ((index = findWord(text, word, occurrences[word])) !== -1) {
            occurrences[word] = index;
            if ((newIndex = findWord(text, word, index)) !== -1 && (((index + word.length) - newIndex)) === -1) {
                text = text.split('');
                text.splice((index -= index > 0 ? 1 : 0), word.length + 1);
                text = text.join('');
                occurrences[word] = index;
            }
        }
    }
    return text;
}

str = remove(str);

console.log(str);

// Result:
// Este é um exemplo de como remover palavras repetidas em um texto.
