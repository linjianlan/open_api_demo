<template>
	<div class="drawer-container" @click="toggleDrawer">
		<div class="drawer" :class="{ 'drawer-open': isOpen }">
			<!-- 抽屉内容 -->
			<h2>抽屉标题</h2>
			<p>这里是抽屉的内容。</p>
			<!-- 关闭按钮 -->
			<button @click="closeDrawer">关闭</button>
		</div>
		<div class="drawer-overlay" v-if="isOpen" @click="closeDrawer"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false, // 控制抽屉的打开和关闭状态
		};
	},
	methods: {
		toggleDrawer() {
			this.isOpen = !this.isOpen;
		},
		closeDrawer() {
			this.isOpen = false;
		},
	},
};
</script>

<style scoped>
.drawer-container {
	position: relative;
	height: 100vh; /* 视口高度 */
	overflow: hidden;
}

.drawer {
	position: fixed;
	top: 0;
	right: -300px; /* 初始位置在屏幕右侧外 */
	width: 300px;
	height: 100%;
	background-color: #f5f5f5;
	transition: right 0.3s ease-in-out; /* 平滑过渡效果 */
	z-index: 1000; /* 确保抽屉在内容之上 */
}

.drawer-open {
	right: 0; /* 打开时的位置 */
}

.drawer-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* 遮罩层背景色 */
	z-index: 999; /* 遮罩层在抽屉之下 */
	cursor: pointer;
}
</style>
