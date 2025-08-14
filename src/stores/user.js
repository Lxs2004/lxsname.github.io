import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state() {
    return {
      token: ''  // ✅ 只存这个
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    logout() {
      this.token = ''
    }
  },
  persist: {
    paths: ['token']  // ✅ 只缓存 token
  }
})