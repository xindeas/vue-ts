import Vue from 'vue';
import Vuex from 'vuex';
import {XMenuItem} from '@/module/XMenuItem';
import {PERMANENT_TAGS} from '@/config';
import {XUser} from '@/module/XUser';

Vue.use(Vuex);

function initState() {
  return {
    // 左侧菜单收缩展开状态
    isCollapse: false,
    // 最近打开的路由，展示在标签栏上
    recentRouters: PERMANENT_TAGS,
    // 用户信息
    user: new XUser(),
    // 当前路由
    curRouter: '',
    // 当前页面菜单路径
    breadcrumbs: new Array<string>(),
    // 当前用户拥有权限的菜单
    menuList: new Array<XMenuItem>()
  }
}

export default new Vuex.Store({
  state: initState(),
  mutations: {
    resetState(state) {
      Object.assign(state, initState())
    },
    isCollapse(state, val) {
      state.isCollapse = val
    },
    recentRouters(state, val) {
      state.recentRouters = val
    },
    user(state, val) {
      state.user = val
    },
    curRouter(state, val) {
      state.curRouter = val
    },
    breadcrumbs(state, val) {
      state.breadcrumbs = val
    },
    menuList(state, val) {
      state.menuList = val
    }
  },
  actions: {},
  modules: {},
});
