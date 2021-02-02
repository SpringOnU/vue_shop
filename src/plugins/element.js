import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
/* Message导入弹框提示 */

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message /* 全局挂载 */
