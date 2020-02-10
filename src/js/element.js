// 导入需要的组件(按需引入elementUI)
import {
  Loading,
  Icon,
  Image,
  Tabs,
  TabPane,
  InfiniteScroll,
  Table,
  tableColumn,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox
} from 'element-ui';

const element = {
  install: function (Vue) {
    Vue.use(Loading)
      .use(Icon)
      .use(Image)
      .use(Tabs)
      .use(TabPane)
      .use(InfiniteScroll)
      .use(Table)
      .use(tableColumn)
      .use(Pagination)
      .use(Dropdown)
      .use(DropdownMenu)
      .use(DropdownItem)
    
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
  }
}
export default element