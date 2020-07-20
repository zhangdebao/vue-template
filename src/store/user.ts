import { login, getInfo } from '../api/user'
import { getToken, setToken, removeToken } from '../utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state: any) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_NAME: (state: any, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: any, avatar: string) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }: { commit: Function }, userInfo: { username: string; password: string }) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo ({ commit, state }: { commit: Function; state: any }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }: { commit: Function }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

const getters = {
  token: (state: any) => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
