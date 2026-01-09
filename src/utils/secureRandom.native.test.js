const expoCryptoMock = { getRandomValues: undefined }
jest.doMock('expo-crypto', () => expoCryptoMock, { virtual: true })

describe('secureRandom.native', () => {
  const originalCrypto = globalThis.crypto
  const importSecureRandomNative = () => import('./secureRandom.native')

  afterAll(() => {
    globalThis.crypto = originalCrypto
    jest.restoreAllMocks()
  })

  describe('when expo-crypto is available', () => {
    let secureRandomNative
    let expoGetRandomValues

    beforeAll(async () => {
      jest.resetModules()
      globalThis.crypto = undefined

      expoGetRandomValues = jest.fn((arr) => {
        arr[0] = 7
        return arr
      })

      expoCryptoMock.getRandomValues = expoGetRandomValues
      secureRandomNative = await importSecureRandomNative()
    })

    test('uses expo-crypto getRandomValues', () => {
      const value = secureRandomNative.getSecureRandomInt(10)
      expect(expoGetRandomValues).toHaveBeenCalled()
      expect(value).toBe(7)
    })
  })

  describe('when expo-crypto is unavailable but global crypto exists', () => {
    let secureRandomNative
    let globalGetRandomValues

    beforeAll(async () => {
      jest.resetModules()

      globalGetRandomValues = jest.fn((arr) => {
        arr[0] = 123
        return arr
      })
      globalThis.crypto = { getRandomValues: globalGetRandomValues }

      expoCryptoMock.getRandomValues = undefined
      secureRandomNative = await importSecureRandomNative()
    })

    test('uses global crypto.getRandomValues', () => {
      const value = secureRandomNative.getSecureRandomInt(10)
      expect(globalGetRandomValues).toHaveBeenCalled()
      expect(value).toBe(3)
    })
  })
})
