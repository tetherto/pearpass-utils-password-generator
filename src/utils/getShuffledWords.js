import { PASSPHRASE_WORD_LIST } from '../constants'
import { secureShuffle } from './secureRandom'

/**
 * @returns {Array<string>}
 */
export const getShuffledWords = () => secureShuffle([...PASSPHRASE_WORD_LIST])
