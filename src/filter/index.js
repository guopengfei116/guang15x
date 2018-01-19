import date from './date'
import json from './json'

// vue的插件机制, 就是对象提供一个install方法, 像那些vuex, vue-router库都是如此
// 将来通过Vue.use(插件)安装插件的时候, 其实就是调用插件的install方法而已
export default {

    // 写vue插件, 就是在install方法里面对象vue的原型进行扩展, 或者注册一些新组件, 过滤器等等
    install(vue) {
        vue.filter('date', date);
        vue.filter('json', json);
    }
}
