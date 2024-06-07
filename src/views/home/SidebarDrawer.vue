<template>
	<div class="drawer-container" @click="closeDrawerIfClickedOutside">
		<button class="drawer-toggle" @click="toggleDrawer">
			{{ isOpen ? '关闭抽屉' : '打开抽屉' }}
		</button>
		<div class="drawer" :class="{ 'drawer-open': isOpen }">
			<h2>抽屉标题</h2>
			<p>这里是抽屉的内容。</p>
			<button @click="closeDrawer">关闭抽屉</button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const isOpen = ref(false);

		const toggleDrawer = () => {
			isOpen.value = !isOpen.value;
		};

		const closeDrawer = () => {
			isOpen.value = false;
		};

		const closeDrawerIfClickedOutside = (event) => {
			if (!event.target.closest('.drawer-toggle') && isOpen.value) {
				closeDrawer();
			}
		};

		return {
			isOpen,
			toggleDrawer,
			closeDrawer,
			closeDrawerIfClickedOutside,
		};
	},
};
</script>

<style scoped>
.drawer-container {
	position: relative;
	height: 100vh; /* 视口高度 */
	overflow: hidden;
}

.drawer-toggle {
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 1000;
}

.drawer {
	position: fixed;
	top: 0;
	right: -300px; /* 初始位置在屏幕右侧外 */
	width: 300px;
	height: 100%;
	background-color: #f5f5f5;
	transition: right 0.3s ease-in-out; /* 平滑过渡效果 */
	z-index: 999; /* 确保抽屉在内容之上 */
}

.drawer-open {
	right: 0; /* 打开时的位置 */
}
</style>
