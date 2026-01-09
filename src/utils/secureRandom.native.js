import * as Crypto from 'expo-crypto'

/**
 * Resolve a secure RNG for React Native.
 * Prefers Expo Crypto; falls back to a crypto polyfill if present.
 */
const getCrypto = () => {
  if (Crypto?.getRandomValues) return Crypto
  if (globalThis?.crypto?.getRandomValues) return globalThis.crypto
  throw new Error('Secure random generator unavailable')
}

const crypto = getCrypto()

/**
 * Get a random integer from 0 up to max-1 using crypto.getRandomValues.
 *
 * @param {number} max
 * @returns {number}
 */
export const getSecureRandomInt = (max) => {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error('max must be a positive integer')
  }

  const range = 0x100000000 // 2^32
  // avoids modulo bias, all values 0..max-1 are equally likely
  const limit = range - (range % max)
  const buffer = new Uint32Array(1)

  let value = 0
  do {
    crypto.getRandomValues(buffer)
    value = buffer[0]
  } while (value >= limit)

  return value % max
}

/**
 * Fisher-Yates shuffle using a cryptographically secure RNG.
 *
 * @template T
 * @param {Array<T>} items
 * @returns {Array<T>} new shuffled array
 */
export const secureShuffle = (items) => {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = getSecureRandomInt(i + 1)
    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }

  return result
}
