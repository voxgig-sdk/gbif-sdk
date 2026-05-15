
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GbifSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GbifSDK.test()
    equal(null !== testsdk, true)
  })

})
