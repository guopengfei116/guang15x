<template>
    <div class="magnifier" id="magnifier1">
		<div class="magnifier-container">
			<div class="images-cover"></div>
			<!--当前图片显示容器-->
			<div class="move-view"></div>
			<!--跟随鼠标移动的盒子-->
		</div>
		<div class="magnifier-assembly">
			<div class="magnifier-btn">
				<span class="magnifier-btn-left">&lt;</span>
				<span class="magnifier-btn-right">&gt;</span>
			</div>
			<!--按钮组-->
			<div class="magnifier-line">
				<ul class="clearfix animation03">
					<li>
						<div class="small-img">
							<img src="http://127.0.0.1:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" />
						</div>
					</li>
					<li>
						<div class="small-img">
							<img src="http://127.0.0.1:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" />
						</div>
					</li>
					<li>
						<div class="small-img">
							<img src="http://127.0.0.1:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" />
						</div>
					</li>
					<li>
						<div class="small-img">
							<img src="http://127.0.0.1:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" />
						</div>
					</li>
					<li>
						<div class="small-img">
							<img src="http://127.0.0.1:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" />
						</div>
					</li>
				</ul>
			</div>
			<!--缩略图-->
		</div>
		<div class="magnifier-view"></div>
		<!--经过放大的图片显示容器-->
	</div>
</template>

<script>
    // 导入放大镜插件的样式与js
    import $ from 'jquery';
    import '@/lib/imgzoom/css/magnifier.css';
    import '@/lib/imgzoom/js/magnifier.js';

    export default {
        mounted() {
            var magnifierConfig = {
                magnifier : "#magnifier1",//最外层的大容器
                width : 500,//承载容器宽
                height : 500,//承载容器高
                moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                zoom : 5//缩放比例
            };
            var _magnifier = $().imgzoon(magnifierConfig);
        }
    }
</script>

<style scoped>

</style>