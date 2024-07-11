import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Input } from 'element-ui'
import { Message } from 'element-ui'
import { Container, Header, Aside, Main } from 'element-ui'
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { Card } from 'element-ui'
import { Row, Col } from 'element-ui'
import { Table, TableColumn } from 'element-ui'
import { InputNumber } from 'element-ui'
import { Statistic } from 'element-ui'
import { Select, Option } from 'element-ui'
import { Popover } from 'element-ui'
import { MessageBox } from 'element-ui'
import { Dialog } from 'element-ui'
import { Loading } from 'element-ui'
import { Backtop } from 'element-ui'
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.use(Backtop)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)
Vue.use(Statistic)
Vue.use(Select)
Vue.use(Option)
Vue.use(Popover)