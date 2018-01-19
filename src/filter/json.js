// vue的过滤器其实就是一个函数, 只不是使用方式比较特殊, 需要在模版中通过管道符(|)调用
import Vue from 'vue';
Vue.filter('json', function(obj) {
    return JSON.stringify(obj);
})

// 导入过滤器函数
export default function(obj) {
    return JSON.stringify(obj);
}