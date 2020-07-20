import { setLocalStore, getLocalStore, removeLocalStore } from '../utils/localStore'
const leftMenu = 'LEFT_MENUS'
const activeIndex = 'ACTIVE_INDEX'
const defaultState = () => {
  return {
    menus: getLocalStore(leftMenu),
    activeIndex: getLocalStore(activeIndex)
  }
}
const mutations = {
  RESET_MENUS: (state: any) => {
    Object.assign(state, defaultState)
    removeLocalStore(leftMenu)
  },
  UPDATE_MENUS: (state: any, menus: Array<object>) => {
    const menus1 = Object.assign([], menus)
    state.menus = menus1
    setLocalStore(leftMenu, menus)
  },
  UPDATE_ACTIVE_INDEX: (state: any, index: number) => {
    state.activeIndex = index
    setLocalStore(activeIndex, index)
  }
}

const actions = {
  resetMenus ({ commit }: { commit: Function }) {
    commit('RESET_MENUS')
  },
  updateMenus ({ commit }: { commit: Function }, menus: Array<object>): void {
    commit('UPDATE_MENUS', menus)
  },
  updateActiveIndex ({ commit }: { commit: Function }, index: number) {
    commit('UPDATE_ACTIVE_INDEX', index)
  }
}

const getters = {
  getLeftMenus: (state: any) => state.menus,
  getActiveIndex: (state: any) => state.activeIndex
}

export default {
  namespaced: true,
  state: defaultState,
  mutations,
  actions,
  getters
}
