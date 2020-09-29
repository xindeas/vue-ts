import {XRouterTabsItem} from '@/module/XRouterTabsItem';
import {RouteConfig} from 'vue-router';

/**************************基础配置****************************/
export const SYS_NAME: string = 'My System';


/**************************路由配置****************************/
/**
 * 登录后进入的第一个界面，即主页
 */
export const DEFAULT_TAG: XRouterTabsItem = {
  label: 'Home',
  path: '/Home',
  name: 'Home',
  closable: false
}
/**
 * 扩展路由，不通过菜单打开的路由
 */
export const EXTRA_ROUTERS: RouteConfig[] = [
  {
    path: '/Profile',
    name: 'Profile',
    meta: {
      label: '个人主页'
    },
    component: () => import('@/views/Profile/index.vue')
  }
];


/**************************标签配置****************************/
/**
 * 标签栏常驻标签，可不可关闭由各个标签自行设定
 */
export const PERMANENT_TAGS = new Array<XRouterTabsItem>(DEFAULT_TAG)
/**
 * 标签栏保留最大标签数，超过这个数继续打开新的标签，最早打开的可关闭标签将会被删除并且清除缓存
 * 这个数包含常驻标签PERMANENT_TAGS
 */
export const MAX_TABS_NUM: number = 5;
