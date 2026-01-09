import { DIGITS, LOWER_CASE, SPECIAL_CHARS, UPPER_CASE } from './constants'
import { getSecureRandomInt, secureShuffle } from './utils/secureRandom'

/**
 * @param {number} length
 * @param {boolean} includeSpecialChars
 * @returns {string}
 */
export const generatePassword = (length, rulesConfig = {}) => {
  const {
    includeSpecialChars = true,
    lowerCase = true,
    upperCase = true,
    numbers = true
  } = rulesConfig

  let characters = ''
  let password = ''

  if (lowerCase) {
    characters += LOWER_CASE
    password += LOWER_CASE[getSecureRandomInt(LOWER_CASE.length)]
  }

  if (upperCase) {
    characters += UPPER_CASE
    password += UPPER_CASE[getSecureRandomInt(UPPER_CASE.length)]
  }

  if (numbers) {
    characters += DIGITS
    password += DIGITS[getSecureRandomInt(DIGITS.length)]
  }

  if (includeSpecialChars) {
    characters += SPECIAL_CHARS
    password += SPECIAL_CHARS[getSecureRandomInt(SPECIAL_CHARS.length)]
  }

  if (!characters.length) {
    throw new Error('No character sets selected for password generation')
  }

  for (let i = password.length; i < length; i++) {
    const randomIndex = getSecureRandomInt(characters.length)
    password += characters[randomIndex]
  }

  return secureShuffle(password.split('')).join('')
}
