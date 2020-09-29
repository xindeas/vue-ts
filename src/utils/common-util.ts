import router, {resetRouter} from '@/router';
import store from '@/store'

export function logout() {
  // vuerouter ts版太坑了没有任何清空路由的手段只能刷新页面实现，这样一来用户体验就下降了，后续如果维护这个功能再回头修改
  // resetRouter()
  // store.commit('resetState')
  window.location.reload()
  router.replace('/Login')
  sessionStorage.removeItem('user')
}
