import * as types from "./mutation-types";
import axios from "axios";

const state = () => {
  return {
    darkMode: true,
    authToken: null,
    user: null
  };
};

// getters
const getters = {
  darkMode: state => state.darkMode,
  authToken: state => state.authToken,
  user: state => state.user
};

// actions
const actions = {
  setDarkMode({ commit }, darkMode) {
    commit(types.SET_DARK_MODE, { darkMode });
  },
  login({commit}, credentials) {
    return axios.post('/api/login', credentials)
        .then(response => {
            if(response.data.status == "success"){
              commit(types.SET_AUTH_TOKEN, true);
              commit(types.SET_USER, response.data.user);
            }
            
            return response;
        });
  },
  logout(context) {
      return axios.get('/api/logout')
          .then(() => {
              context.commit(types.SET_AUTH_TOKEN, null);
              context.commit(types.SET_USER, null);
          });
  },
  changeEmail({commit}, email) {
    return axios.post('/api/changeEmail', email)
        .then((res)=>{
          if(res.data.status == "success"){
            commit(types.SET_USER, res.data.user);
          }
          return res;
        })
  },
  changePassword({commit}, data) {
    return axios.post('/api/changePassword', data)
        .then((res)=>{
          if(res.data.status == "success"){
            commit(types.SET_USER, res.data.user);
          }
          return res;
        })
  }
};

// mutations
const mutations = {
  [types.SET_DARK_MODE](state, { darkMode }) {
    state.darkMode = darkMode;
  },
  [types.SET_AUTH_TOKEN](state, token) {
    state.authToken = token;
  },
  [types.SET_USER](state, user) {
      state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
