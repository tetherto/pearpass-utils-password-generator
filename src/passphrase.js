import { SPECIAL_CHARS } from './constants'
import { getShuffledWords } from './utils/getShuffledWords'
import { getSecureRandomInt } from './utils/secureRandom'

/**
 * @param {boolean} capitalLetters
 * @param {boolean} symbols
 * @param {boolean} numbers
 * @param {number} wordsCount
 * @returns {Array<string>}
 */
export const generatePassphrase = (
  capitalLetters,
  symbols,
  numbers,
  wordsCount
) => {
  const selectedWords = getShuffledWords().slice(0, wordsCount)

  const passphrase = selectedWords.map((word) => {
    if (capitalLetters) {
      word = word.charAt(0).toUpperCase() + word.slice(1)
    }

    if (numbers) {
      word += getSecureRandomInt(10)
    }

    if (symbols) {
      word += SPECIAL_CHARS.charAt(getSecureRandomInt(SPECIAL_CHARS.length))
    }

    return word
  })

  return passphrase
}
