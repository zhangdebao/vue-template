import { getToken, setToken, removeToken } from '../../../src/utils/auth'
describe('js-cookie 相关测试', () => {
  test('getToken', () => {
    expect(getToken()).toBe('')
  })
  test('setToken', () => {
    setToken('123')
    expect(getToken()).toBe('123')
  })
  test('removeToken', () => {
    setToken('123')
    removeToken()
    expect(getToken()).toBe('')
  })
})
