<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link :to="{ name: 'shopcart' }">购物车</router-link>&gt;
                <router-link to="">提交订单</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li class="active">
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

                    <!-- 大表单 -->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <form id="orderForm" name="orderForm" @submit.prevent="submit">
                            <div class="form-box address-info">
                                <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input v-model="formData.accept_name" name="accept_name" id="accept_name" type="text" class="input" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <v-distpicker @selected="formData.area = $event"></v-distpicker>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input v-model="formData.address" name="address" id="address" type="text" class="input" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input v-model="formData.mobile" name="mobile" id="mobile" type="text" class="input" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input v-model="formData.email" name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                </dl>
                                <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input v-model="formData.post_code" name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                </dl>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!-- 我们后台只有一个支付方式, 在线支付 -->
                                <li>
                                    <label>
                                        <!-- 单选框需要设置一个label属性, 当用户选中时, v-model关联的字段值就会更别为label指定的值 -->
                                        <el-radio v-model="formData.payment_id" label="6">在线支付</el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <!-- 当你的多个单选按钮v-model绑定同一个字段时, 那么你只能选取其中一个 -->
                                <li>
                                    <label>
                                        <el-radio v-model="formData.express_id" label="1">顺丰</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="formData.express_id" label="2">圆通</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio v-model="formData.express_id" label="3">韵达</el-radio>
                                    </label>
                                </li>
                            </ul>

                            <!-- 商品列表 -->
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <router-link :to="{ name: 'goodsDetail', params: { id: item.id } }">
                                                <img class="img" :src="item.img_url">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="{ name: 'goodsDetail', params: { id: item.id } }">
                                                {{ item.title }}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price }}
                                            </span>
                                        </td>
                                        <td align="center">{{ item.buycount }}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price * item.buycount }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="formData.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{ goodsTotal }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{ goodsSum }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ expressMoment }}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ sum }}</label>
                                    </p>
                                    <p class="btn-box">
                                        <button class="btn button" @click="$router.push({ name: 'shopcart' })">返回购物车</button>
                                        <button id="btnSubmit" class="btn submit" name="btnSubmit" type="submit">确认提交</button>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker';

export default {

    components: {
        VDistpicker,
    },
    
    data() {
        return {
            // 快递价格表, key为快递ID, val为快递价格
            expressPrice: {
                1: 20,
                2: 15,
                3: 10
            },
            ids: null,
            goodsList: [],
            formData: {
                // 设置一下支付方式与快递的默认值
                payment_id: '6',
                express_id: '1'
            }
        }
    },

    computed: {
        // 商品总数
        goodsTotal() {
            return this.goodsList.reduce( (sum, v) => sum + v.buycount, 0);
        },

        // 商品总价
        goodsSum() {
            return this.goodsList.reduce( (sum, v) => sum + v.buycount * v.sell_price, 0);
        },

        // 快递费 => 用用户选择的快递id从价格表里面查
        expressMoment() {
            return this.expressPrice[this.formData.express_id];
        },

        // 总价
        sum() {
            return this.goodsSum + this.expressMoment;
        }
    },

    methods: {
        // 获取购物车商品列表数据
        getGoodsList() {
            this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {

                // 手动补充一个控制开关的字段, 然后修正buycount字段
                res.data.message.forEach(goods => {
                    goods.buycount = this.$store.state.shopping[goods.id]
                });

                this.goodsList = res.data.message;
            })
        },

        // 提交订单, 后端接口需要几个额外的特殊数据, 这些需要需要我们计算并手动加上去, 他不是用户表单填写的字段
        // goodsAmount: 商品总价
        // expressMoment: 快递费
        // goodsids: 商品ids
        // cargoodsobj: 一个对象, key为商品ID, val为商品购买数量
        submit() {
            this.formData.goodsAmount = this.goodsSum;
            this.formData.expressMoment = this.expressMoment;
            this.formData.goodsids = this.ids;
            // ids字符串先通过split方法劈成数组, 然后调用reduce方法遍历得到每一个id, 
            // 以这个id为key给一个新对象不断添加属性值, 最后就构成了一个{ id: val, id: val }这样的对象
            this.formData.cargoodsobj = this.ids.split(',').reduce( (obj, id) => { obj[id] = 5; return obj; }, {} );

            // 提交成功后跳转到支付页面, 需要把该订单的id传过去
            this.$http.post(this.$api.orderSubmit, this.formData).then(res => {
                if(res.data.status == 0) {
                    this.$router.push({ name: 'orderPay', params: { id: res.data.message.orderid } })
                }
            });
        }
    },

    created() {
        this.ids = this.$route.params.ids;
        this.getGoodsList();
    }
};
</script>

<style>

</style>