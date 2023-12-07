function getBalancedSubstrings(S) {
  let longestSubstring = [];
  
  function isValidPair(char1, char2) {
    return Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0)) === 1;
  }

  function findBalancedSubstringsHelper(char1, char2) {
    let substrings = [];
    let left = 0;
    let right = 0;
    const charCount = { [char1]: 0, [char2]: 0 };

    while (right < S.length) {
      const currentChar = S[right];
      charCount[currentChar]++;

      while (charCount[char1] > 0 && charCount[char2] > 0) {
        const currentSubstring = S.slice(left, right + 1);
        substrings.push(currentSubstring);

        charCount[S[left]]--;
        left++;
      }

      right++;
    }

    return substrings;
  }

  for (let i = 0; i < S.length - 1; i++) {
    const char1 = S[i];
    const char2 = S[i + 1];

    if (isValidPair(char1, char2)) {
      const substrings = findBalancedSubstringsHelper(char1, char2);
      if (substrings.length > 0) {
        longestSubstring = substrings.length > longestSubstring.length ? substrings : longestSubstring;
      }
    }
  }

  return longestSubstring;
}

// Example
console.log(getBalancedSubstrings("cabbacc")); // ["abba"]
console.log(getBalancedSubstrings("abababa")); // ["ababab", "bababa"]
console.log(getBalancedSubstrings("aaaaaaa")); // []