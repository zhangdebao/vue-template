import Request from '../../../src/utils/request'
import { HOST } from '../../../src/utils/config'
describe('Request', () => {
  test('Request 拦截器', () => {
    try {
      const options = Request.defaults
      const interceptors = Request.interceptors
      expect(options.timeout).toBe(5000)
      expect(options.baseURL).toBe(HOST)
      expect(interceptors).toHaveProperty('request')
      expect(interceptors).toHaveProperty('response')
    } catch (error) {
      expect(error).toMatch('error')
    }
  })
  test('Request 请求', async () => {
    const url = '/course/cms/type?page=1&size=10'
    try {
      await Request.get(url).then((res: any) => {
        const { code, detail } = res
        expect(code).toBe(200)
        expect(detail).toHaveProperty('count')
        expect(detail).toHaveProperty('list')
      })
    } catch (error) {
      expect(error).toMatch('error')
    }
  })
})
