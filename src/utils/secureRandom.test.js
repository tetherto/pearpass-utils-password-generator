describe('secureRandom', () => {
  const originalCrypto = globalThis.crypto
  let secureRandom
  let getRandomValuesMock

  beforeAll(async () => {
    globalThis.crypto = { getRandomValues: jest.fn() }
    getRandomValuesMock = globalThis.crypto.getRandomValues
    secureRandom = await import('./secureRandom')
  })

  beforeEach(() => {
    getRandomValuesMock.mockReset()
  })

  afterAll(() => {
    globalThis.crypto = originalCrypto
    jest.restoreAllMocks()
  })

  test('getSecureRandomInt throws when max is not a positive integer', async () => {
    expect(() => secureRandom.getSecureRandomInt(0)).toThrow()
    expect(() => secureRandom.getSecureRandomInt(-1)).toThrow()
    expect(() => secureRandom.getSecureRandomInt(1.5)).toThrow()
    expect(() => secureRandom.getSecureRandomInt(NaN)).toThrow()
  })

  test('getSecureRandomInt returns a value in [0, max)', async () => {
    getRandomValuesMock.mockImplementation((arr) => {
      arr[0] = 1234567890
      return arr
    })

    const max = 26
    const value = secureRandom.getSecureRandomInt(max)

    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThan(max)
  })

  test('getSecureRandomInt uses rejection sampling (rejects values >= limit)', async () => {
    const max = 10
    const range = 0x100000000
    const limit = range - (range % max)

    let calls = 0
    getRandomValuesMock.mockImplementation((arr) => {
      calls += 1
      // 1st draw: force rejection (>= limit)
      // 2nd draw: accepted
      arr[0] = calls === 1 ? limit : 7
      return arr
    })

    const value = secureRandom.getSecureRandomInt(max)

    expect(calls).toBe(2)
    expect(value).toBe(7)
  })

  test('secureShuffle returns a new array with the same items', async () => {
    getRandomValuesMock.mockImplementation((arr) => {
      arr[0] = 1
      return arr
    })

    const input = ['a', 'b', 'c', 'd']
    const output = secureRandom.secureShuffle(input)

    expect(output).not.toBe(input)
    expect(output.slice().sort()).toEqual(input.slice().sort())
  })
})
