import router from '@/router'
import store from '@/store'
import {XMenuItem} from '@/module/XMenuItem';
import {Route, RouteConfig} from 'vue-router';
import {DEFAULT_TAG, PERMANENT_TAGS, EXTRA_ROUTERS} from '@/config';

/**
 * 菜单转换为路由，
 * 初版为嵌套路由
 * 第二版为了实现页面缓存修改为二级路由
 * @param menuList 菜单对象数组
 */
export function initRouter(menuList: XMenuItem[]) {
  let arr: RouteConfig[] = toRouter(menuList, [])
  arr = arr.concat(getDefaultRoute());
  arr = arr.concat(EXTRA_ROUTERS);
  arr.push({
          path: '/',
          redirect: DEFAULT_TAG.path
        })
  const layout: RouteConfig[] = [{
    path: '/Layout',
    component: () => import('@/layout/index.vue'),
    children: arr
  }]
  router.addRoutes(layout)
}

/**
 * 递归调用菜单转换路由
 * @param menuList 菜单对象数组
 */
function toRouter(menuList: XMenuItem[], parentMenu: string[]): RouteConfig[] {
  let result: RouteConfig[] = []
  menuList.forEach((item) => {
    const name = item.path.startsWith('/') ? item.path.slice(1) : item.path
    const arr = JSON.parse(JSON.stringify(parentMenu))
    arr.push(item.label)
    const route: RouteConfig = {
      path: item.path,
      name,
      meta: {
        label: item.label,
        fullPath: arr
      }
    }
    if (item.children && item.children.length > 0) {
      // 如果非叶子节点则给定一个router-view作为内容用于展示下一级路由的内容
      result = result.concat(toRouter(item.children, arr))
    } else {
      // 如果是叶子节点根据指定的path加载菜单文件
      route.component = () => import('@/views/' + route.name)
      result.push(route)
    }
  })
  return result
}

/**
 * 将标签栏常驻标签加入路由
 */
function getDefaultRoute(): RouteConfig[] {
  const arr = []
  for (const item of PERMANENT_TAGS) {
    arr.push({
      path: item.path,
      name: item.name,
      meta: {
        label: item.label,
        fullPath: [item.label]
      },
      component: () => import('@/views/' + item.name),
    })
  }
  return arr;
}

/**
 * 根据路由路径关闭路由及标签
 * @param path 路由路径
 */
export function closeTag(path: string) {
  const list = store.state.recentRouters
  const index = list.findIndex((item) => item.path === path)
  list.splice(index, 1)
  store.commit('recentRouters', list)
  if (list.length > 0) {
    if (store.state.curRouter === path) {
      router.push(list[list.length - 1])
    }
  } else {
    router.push(DEFAULT_TAG)
  }
}

/**
 * 动态添加路由并做跳转
 * @param parentPath 要打开的新路由所属的父级路由
 * @param name 要打开的路由的组件名
 * @param label 要打开的路由标签名
 */
export function createRouterAndPush(parentPath: string, name: string, label?: string) {
  let fullPath = [];
  const route = router.resolve(parentPath).route
  const newTabLabel = label ? label : route.meta.label + '-edit'
  const newTabPath = name.startsWith('/') ? name : '/' + name
  const newTabName = newTabPath.replace('/', '-')
  if (route.meta && route.meta.fullPath) {
    fullPath = JSON.parse(JSON.stringify(route.meta.fullPath))
  }
  fullPath.push(newTabLabel)
  const layout: RouteConfig[] = [{
    path: '/Layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: route.path + newTabPath,
        name: route.name + newTabName,
        meta: {
          label: newTabLabel,
          fullPath
        },
        component: () => import('@/views/' + route.name + newTabPath)
      }
    ]
  }]
  const compArr = router.getMatchedComponents(route.path + newTabPath)
  if (compArr.length > 0) {
    router.push(route.path + newTabPath)
  } else {
    router.addRoutes(layout)
    router.push(route.path + newTabPath)
  }
}
