import Vue from 'vue';
import VueRouter, {Route, RouteConfig} from 'vue-router';
import store from '@/store';
import {initRouter} from '@/utils/router-util';
import {XRouterTabsItem} from '@/module/XRouterTabsItem';
import LoginService from '@/service/login.service.ts';
import NProgress from 'nprogress'
import {DEFAULT_TAG, MAX_TABS_NUM} from '@/config';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      label: '登录'
    },
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    redirect: DEFAULT_TAG.path
  },
  {
    path: '/Layout',
    component: () => import('@/layout/index.vue'),
    children: []
  },
  {
    path: '/Error',
    name: 'Error',
    component: () => import('@/components/Error.vue')
  },
  // {
  //   path: '*',
  //   redirect: '/Error'
  // }
];

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = sessionStorage.getItem('user')
  const storeUser = store.state.user
  if (storeUser.id === 0 && user) {
    store.commit('user', JSON.parse(user))
  }
  // 刷新页面或初次进入，重新获取菜单权限
  if (storeUser && store.state.menuList.length <= 0) {
    LoginService.getMenuList(storeUser.id).subscribe((list) => {
      initRouter(list)
      store.commit('menuList', list)
      next(to)
    })
    return
  }
  // 已登录或是将前往登录页面，直接放行，否则直接返回登录页面
  if (user || to.path === '/Login') {
    if (to.path !== '/Login') {
      getBreadCrumb(to)
      addToRecent(to)
    }
    store.commit('curRouter', to.path)
    next()
  } else {
    next({path: '/Login'})
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})

/**
 * 获取菜单路径制作页面面包屑导航条
 * @param to 当前路由
 */
function getBreadCrumb(to: Route) {
  let breadcrumbs: any[] = []
  if (to.meta && to.meta.fullPath) {
    breadcrumbs = to.meta.fullPath
  } else if (to.meta && to.meta.label) {
    breadcrumbs = [to.meta.label]
  }
  store.commit('breadcrumbs', breadcrumbs)
}

/**
 * 将当前路由加入tab标签栏
 * @param to 当前路由
 */
function addToRecent(to: Route) {
  const recentRouters = store.state.recentRouters
  const route = new XRouterTabsItem()
  route.label = to.meta && to.meta.label ? to.meta.label : to.name
  route.path = to.path
  route.name = to.name || (to.path.startsWith('/') ? to.path.slice(1) : to.path)
  const index = recentRouters.findIndex((item) => item.path === route.path)
  if (index < 0) {
    // 如果超过最大标签数，删除掉标签继续新增
    if (recentRouters.length >= MAX_TABS_NUM) {
      const removeIndex = recentRouters.findIndex((item) => item.closable)
      if (removeIndex > 0) {
        recentRouters.splice(removeIndex, 1)
      }
    }
    recentRouters.push(route)
  }
  store.commit('recentRouters', recentRouters)
}


export function resetRouter() {
  router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
  // router.matcher = newRouter.matcher // reset router
}

export default router;
