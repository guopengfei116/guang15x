// 导入相关第三方包
import Vue from 'vue'
import Router from 'vue-router'

// 导入路由守卫
import beforeEach from './beforeEach.js';

// 导入被路由控制的组件
// 备注: 这里的@符合就是src目录, 如果导入的是js vue json文件, 可以省略后缀名
import Login from '@/components/login/Login'

// 启动路由插件
Vue.use(Router)

// 创建路由实例, 并添加路由守卫
let router = new Router({
  routes: [
    // 登陆
    { name: 'login', path: '/login', component: Login }
  ]
});
router.beforeEach(beforeEach)

export default router
