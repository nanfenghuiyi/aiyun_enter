// 导入需要的组件(按需引入elementUI)
import {
  Drawer,
  RadioGroup,
  Loading,
  CollapseItem,
  Radio,
  Collapse,
  backtop,
  Icon,
  Image,
  Rate,
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
    Vue.use(Drawer)
      .use(RadioGroup)
      .use(Loading)
      .use(CollapseItem)
      .use(Radio)
      .use(Collapse)
      .use(backtop)
      .use(Icon)
      .use(Image)
      .use(Rate)
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