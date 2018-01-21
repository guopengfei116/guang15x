<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link to="">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <!-- 这里全选按钮的状态是由其他按钮计算得出的, 不能用v-model -->
                                        <!-- 全选按钮的点击变化, 我们可以通过change事件得到, 并且可以拿到新的布尔值 -->
                                        <el-switch :value="allSeletedState" @change="allChange" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="item.selected" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{ item.title }}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{ item.sell_price }}
                                    </th>
                                    <th width="104" align="center">
                                        <!-- 数字计数器 -->
                                        <!-- 绑定事件的时候, 如果需要自己传参, 又要拿到默认的参数, 默认参数用$event表示 -->
                                        <el-input-number @change="change(item.id, $event)" size="mini" :min="1" v-model="item.buycount"></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>￥{{ item.sell_price * item.buycount }}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button @click="del(item.id)" size="mini">删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{ total }}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{ sum }}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.push({ name: 'goodsList' })">继续购物</button>
                            <button class="submit" @click="pay">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ids: null,
                goodsList: []
            }
        },

        computed: {
            // 总数 => 遍历商品列表, 如果商品的selected字段为true, 那么累加它的buycount购买数量
            total() {
                return this.goodsList.reduce( (total, v) => total + (v.selected? v.buycount: 0), 0 );
            },

            // 总价 => 遍历商品列表, 如果商品的selected字段为true, 那么累加它的buycount购买数量 * sell_price单价
            sum() {
                return this.goodsList.reduce( (total, v) => total + (v.selected? v.buycount * v.sell_price: 0), 0 );
            },

            // 全选按钮状态
            allSeletedState() {
                return this.goodsList.every(v => v.selected);
            }
        },

        methods: {
            // 获取购物车商品列表数据
            getGoodsList() {
                this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {

                    // 手动补充一个控制开关的字段, 然后修正buycount字段
                    res.data.message.forEach(goods => {
                        goods.selected = true;
                        goods.buycount = this.$store.state.shopping[goods.id]
                    });

                    this.goodsList = res.data.message;
                })
            },

            // 删除商品
            // 1 从goodsList里面删除
            // 2 调用$store.commit从全局状态里删除
            del(id) {
                this.goodsList = this.goodsList.filter(v => v.id != id); // 找出不删除的商品重新赋值
                this.$store.commit('delShopping', id);
            },

            // 修改商品数量
            // 1 从goodsList里面修改
            // 2 调用$store.commit从全局状态里修改
            change(id, count) {
                this.goodsList.forEach(v => {
                    if(v.id == id) {
                        v.buycount = count;
                    }
                });
                // es6简化写法
                this.$store.commit('modifyShopping', { id, count });
            },

            // 全选按钮点击函数 => 遍历商品列表, 修改每个商品为新的状态
            allChange(boolean) {
                this.goodsList.forEach(v => v.selected = boolean);
            },

            // 立即结算按钮, 跳转到填写用户信息页面, 这个页面需要被勾选的商品ids
            pay() {
                // 先通过filter方法取出勾选的商品列表, 然后再通过map方法把商品列表映射为id列表, 最后通过join拼接成id字符串
                let ids = this.goodsList.filter(v => v.selected).map(v => v.id).join(',');
                this.$router.push({ name: 'orderCommit', params: { ids: ids } });
            }
        },

        // 初始化完毕后 => 获取购物车ids, 然后调用接口
        created() {
            this.ids = this.$store.getters.shoppingIds;
            this.getGoodsList();
        }
    }
</script>

<style>

</style>