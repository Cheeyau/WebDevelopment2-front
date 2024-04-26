import { defineStore } from 'pinia'
import axios from '../axios-auth'

export const useLoginStore = defineStore('login', {
  state: () => ({ 
    jwt: null, 
    name: null,
    user_role: null,
    expireAt: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.jwt != null;
    },
    isAdmin: (state) => {
      return state.user_role > 0;
    }
  },
  actions: {
    autoLogin() {
      const jwt = localStorage.getItem('jwt');
      const name = localStorage.getItem('name');
      const user_role = localStorage.getItem('user_role');
      const expireAt = localStorage.getItem('expireAt');
        if (jwt && name && user_role && expireAt) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
          this.jwt = jwt;
          this.name = name;
          this.user_role = user_role;
          this.expireAt = expireAt;
        }
    },
    async logout() {
      localStorage.clear();
      this.$reset();
    },
    getJwt() {
      return this.jwt;
    },
    async login(name, password) {
      return await new Promise((resolve, reject) => {
        axios
          .post("/users/login", {
            name: name,
            password: password,
          })
          .then((results) => {
            this.name = results.data.name;
            this.jwt = results.data.jwt;
            this.user_role = results.data.user_role;
            this.expireAt = results.data.expireAt;

            localStorage.getItem('jwt', results.data.jwt);
            localStorage.getItem('name', results.data.name);
            localStorage.getItem('user_role', results.data.user_role);
            localStorage.getItem('expireAt', results.data.expireAt);
            resolve()

            axios.interceptors.request.use(config => {
              config.headers["Authorization"] = `Bearer ${this.jwt}`;
              return config;
            });
          })
          .catch((error) => reject(error));
      })
    },
    async register(name, email, password) {
      return await new Promise((resolve, reject) => {
        axios
          .post("/users", {
            name: name,
            email_address: email,
            password: password,
          })
          .then((results) => {
            this.login(name, password);
            resolve()
          })
          .catch((error) => reject(error));
      })
    }
  },
})