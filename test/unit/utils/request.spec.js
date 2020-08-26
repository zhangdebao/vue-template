// test('should fetch users', async () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp)
//   const url = '/course/cms/type?page=1&size=10'
//   await axios.get(url).then((res) => {
//     console.log('res', res)
//   })
//   return Promise.resolve(true)
// })
// import Request from '../../../src/utils/request'
import { HOST } from '../../../src/utils/config'
import service from '../../../src/utils/request'
import axios from 'axios'
jest.mock('axios')
describe('Request', () => {
//   test('Request 拦截器', () => {
//     try {
//       const options = Request.defaults
//       const interceptors = Request.interceptors
//       expect(options.timeout).toBe(5000)
//       expect(options.baseURL).toBe(HOST)
//       expect(interceptors).toHaveProperty('request')
//       expect(interceptors).toHaveProperty('response')
//     } catch (error) {
//       expect(error).toMatch('error')
//     }
//   })
  // test('Request 请求', async () => {
  //   // const mock = Jest.mock('Request')
  //   const url = '/course/cms/type?page=1&size=10'
  //   try {
  //     await Request.get(url).then((res) => {
  //       const { config: { headers }, data } = res
  //       const { code, detail } = data
  //       expect(code).toBe(200)
  //       expect(detail).toHaveProperty('count')
  //       expect(detail).toHaveProperty('list')
  //     })
  //   } catch (error) {
  //     expect(error).toMatch('error')
  //   }
  // })
  test('异步Jest mock数据', async () => { 
    axios.get.mockResolvedValue({
      code: 200,
      detail: {
        count: 100,
        list: []
      }
    })
    const url = `${HOST}/course/cms/type?page=1&size=10`
    try {
      await axios.get(url).then((res) => {
        console.log('res', res)
        // const { config: { headers }, data } = res
        const { code, detail } = res
        expect(code).toBe(200)
        expect(detail).toHaveProperty('count')
        expect(detail).toHaveProperty('list')
      })
    } catch (error) {
      expect(error).toMatch('error')
    }
    return Promise.resolve(true)
  })
})
