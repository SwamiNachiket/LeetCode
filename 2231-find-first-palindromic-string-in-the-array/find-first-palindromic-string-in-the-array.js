/**
 * @param {string[]} words
 * @return {string}
 */
 function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}
var firstPalindrome = function(words) {
      for (const word of words) {
    if (isPalindrome(word)) {
      return word;
    }
  }

  return '';
};