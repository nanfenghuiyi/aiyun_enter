// 后台用户登录
const login = '/Web/Auth/login'
// { phone, pwd, captcha, token }

// 登出接口
const logout ='/Web/Auth/logout'
// { user_id }

// 图形验证码
const captcha ='/Common/captcha'

// 获取省
const getProvinces = "/Common/getProvinces"

// 获取市
const getCities = "/Common/getCities"

// 转录记录
const records ='/Web/Card/records'

// 转录记录详情
const detail = '/Web/Card/detail'

// 确认已经整理完一张名片
const confirmComplete = '/Web/Card/confirmComplete'

// 保存线路数据
const saveLine = '/Web/Card/saveLine'

// 获取任务
const getJob = '/Web/Card/getJob'

// 当前地址
let baseUrl = ''

if (window.location.host == 'static.a56999.com') {
  baseUrl = 'https://card-trans.a56999.com'
} else {
  baseUrl = 'http://sit.card-trans.a56999.com'
}

export default {
  login,
  logout,
  records,
  captcha,
  baseUrl,
  getProvinces,
  getCities,
  detail,
  confirmComplete,
  saveLine,
  getJob,
}