// 导入需要的组件(按需引入elementUI)
import {
  Popup,
  DatetimePicker,
  ImagePreview,
  Toast,
  Picker
} from 'vant';

const element = {
  install: function (Vue) {
    Vue.use(Popup)
      .use(DatetimePicker)
      .use(ImagePreview)
      .use(Toast)
      .use(Picker)
  }
}
export default element