<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">支付中心</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{ order.order_no }}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{ order.accept_name }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{ order.area }}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{ order.mobile }}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{ order.order_amount }}元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{ order.message }}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    二维码图片
                                    <canvas width="300" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import '@/lib/qr/jqueryqr';

    export default {
        data() {
            return {
                id: null,
                order: {}
            }
        },

        methods: {
            // 获取订单数据
            getOrder() {
                this.$http.get(this.$api.order + this.id).then(res => {
                    this.order = res.data.message[0]; // 注意, 后端返回的是数组
                });
            },

            // 不断检测订单的状态, 如果为2那么代表用户支付了, 我就跳转到支付成功页面
            checkStatus() {
                let timer = setInterval(() => {
                    this.$http.get(this.$api.order + this.id).then(res => {
                        if(res.data.message[0].status == 2) {
                            clearInterval(timer);
                            this.$router.push({ name: 'orderComplete' });
                        }
                    });
                }, 1000);
            }
        },

        created() {
            this.id = this.$route.params.id;
            this.getOrder();
            this.checkStatus();
        },

        // 使用jquery插件, 需要保证dom渲染到视图中, 所以使用这个生命周期函数
        mounted() {
            $('#container').erweima({
                // 这个地址是本机地址, 手机打不开, 要想用手机扫一扫打开这个网页, 
                // 需要保证手机与电脑在同一局域网内, 或者你提供一个公网IP
                text: `http:127.0.0.1:8080/pay/${this.id}/${this.order.order_amount}`,
                label: '支付'
            });
        }
    }
</script>

<style>

</style>