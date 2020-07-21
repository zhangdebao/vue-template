import { setLocalStore, getLocalStore, removeLocalStore, clearLocalStore } from '../../../src/utils/localStore'
describe('localStore', () => {
  const TOKEN = 'token'
  test('getLocalStore', () => {
    expect(getLocalStore(TOKEN)).toBeNull()
  })
  test('setLocalStore', () => {
    setLocalStore(TOKEN, '1234')
    expect(getLocalStore(TOKEN)).toBe('1234')
  })
  test('setLocalStore', () => {
    removeLocalStore(TOKEN)
    expect(getLocalStore(TOKEN)).toBeNull()
  })
  test('setLocalStore', () => {
    setLocalStore(TOKEN, '1234')
    clearLocalStore()
    expect(getLocalStore(TOKEN)).toBeNull()
  })
})
