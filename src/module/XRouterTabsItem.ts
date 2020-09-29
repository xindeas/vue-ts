export class XRouterTabsItem {
  /**
   * 中文名，展示在标签上的名称
   */
  public label: string
  /**
   * 路由路径
   */
  public path: string
  /**
   * 英文名，对应页面component的name，也对应路由的name
   */
  public name: string
  /**
   * 标签是否可关闭，true可关闭false不可关闭
   */
  public closable?: boolean

  constructor() {
    this.label = ''
    this.path = ''
    this.name = ''
    this.closable = true
  }
}
