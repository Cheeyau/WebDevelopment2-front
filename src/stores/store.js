import { defineStore } from 'pinia'
import axios from '../axios-auth'

export const useLoginStore = defineStore('login', {
  state: () => ({ 
    jwt: null, 
    name: null,
    user_role: null,
    expire: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.jwt != null;
    },
    isAdmin: (state) => {
      return state.user_role > 0;
    }
  }, 
  mutations: {
    updateUser (state, payload) {
      state.jwt = payload.jwt,
      state.name = payload.name,
      state.user_role = payload.user_role,
      state.expire = payload.expire
    },
    clearUser () {
      this.$reset()
    }
  },
  actions: {
    autoLogin() {
      const jwt = localStorage.getItem('jwt');
      const name = localStorage.getItem('name');
      const user_role = localStorage.getItem('user_role');
      const expire = localStorage.getItem('expire');
        if (jwt && name && user_role && expire) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
          this.jwt = jwt;
          this.name = name;
          this.user_role = user_role;
          this.expire = expire;
        }
    },
    login(username, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/login", {
            name: username,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            this.name = res.data.name;
            this.jwt = res.data.jwt;
            this.user_role = res.data.user_role;
            this.expire = res.data.expire;
            resolve()
          })
          .catch((error) => reject(error));
      })
    }
  },
})