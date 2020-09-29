import {Observable, of} from 'rxjs';
import {XUser} from '@/module/XUser';
import {XMenuItem} from '@/module/XMenuItem';

const LoginService = {
  login(): Observable<XUser> {
    const user: XUser = {
      id: 1,
      name: '张三',
      account: '10086',
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600832906858&di=7cd50963c0d55401220e02e719b38058&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201509%2F20%2F20150920002650_GTUPY.gif'
    }
    return of(user)
  },
  getMenuList(userId: number): Observable<XMenuItem[]> {
    const menuList: XMenuItem[] = [
      {
        label: 'Demo Menu',
        path: 'DemoMenu',
        icon: 'el-icon-menu',
        children: [
          {
            label: 'Demo Menu 1',
            path: 'DemoMenu1',
            icon: 'el-icon-menu',
            children: [
              {
                label: 'DemoMenu1-1',
                path: '/DemoMenu1-1',
                icon: 'el-icon-menu'
              }
            ]
          }
        ]
      },
      {
        label: 'DemoTable',
        path: '/DemoTable',
        icon: 'el-icon-menu'
      },
      {
        label: 'DemoEditablePage',
        path: '/DemoEditablePage',
        icon: 'el-icon-menu'
      },
      {
        label: 'Test',
        path: '/Test',
        icon: 'el-icon-menu'
      }
    ]
    return of(menuList)
  }
}
export default LoginService;
