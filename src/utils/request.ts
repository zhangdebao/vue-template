import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { HOST } from './config'
import { getToken } from './auth'
import store from '../store/index'

const service = axios.create({
  baseURL: HOST,
  timeout: 5000
})

service.interceptors.request.use(config => {
  config.headers.authorization = ''
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, err => {
  return Promise.reject(err)
})

service.interceptors.response.use(response => {
  const { data, status } = response

  // if the custom code is not 20000, it is judged as an error.
  if (status !== 200 && status !== 201) {
    Message({
      message: data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })

    // 301: Illegal token; 302: Other clients logged in; 303: Token expired;
    if (data.code === 301 || data.data === 302 || data.data === 303) {
      // to re-login
      MessageBox.confirm('您已注销，您可以取消停留在此页，或重新登录，确认注销', {
        confirmButtonText: '登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(data.message || 'Error'))
  } else {
    return data
  }
},
error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)
export default service
