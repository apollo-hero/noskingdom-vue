import Vue from "vue";
import Vuex from "vuex";
import main from "./main";
import sideMenu from "./side-menu";
import simpleMenu from "./simple-menu";
import topMenu from "./top-menu";
import PersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const secure = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    PersistedState({
      key:'state',
      paths:[
        'main.authToken',
        'main.user'
      ],
      storage: {
        getItem:(key)=> secure.get(key),
        setItem: (key, value) => secure.set(key, value),
        removeItem:(key)=>secure.remove(key),
      }
    })
  ],
  modules: {
    main: main,
    sideMenu: sideMenu,
    simpleMenu: simpleMenu,
    topMenu: topMenu
  }
});
