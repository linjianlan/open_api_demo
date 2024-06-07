<template>
	<div class="demo-collapse">
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item style="margin-top: 3px" v-for="(item, index) in tableGroupList" :key="index" :title="item.lable" :name="item.value">
				<div>
					<table-group style="margin-top: 3px" :rows="item.list"></table-group>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
// const tableGroup = defineAsyncComponent(() => import('./table-group.vue'));
import tableGroup from './table-group.vue';

export default {
	components: {
		tableGroup,
	},
	name: 'FixedTable',
	props: {
		rows: {
			type: Array,
			required: true,
		},
		tbaHeight: {
			type: String,
			required: true,
		},
		tableGroupList: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			headers: [
				{ label: '序号', width: '40px' },
				{ label: '站点', width: '75px' },
				{ label: '当前水位(m)', width: '75px' },
				{ label: '汛限水位(m)', width: '75px' },
				{ label: '正常水位(m)', width: '75px' },

				// ...更多列定义
			],
			activeNames: 0,
		};
	},
	onMounted() {
		console.log(123);
	},
};
</script>

<style scoped>
::v-deep .el-collapse-item__header {
	background-color: rgb(0, 115, 255);
	color: #ffffff;
	border: 1px solid rgb(60, 145, 249);
	border-bottom: 1px solid rgb(60, 145, 249);
	padding: 10px;
	height: 35px;
}
::v-deep .el-collapse-item__content {
	padding-bottom: 0px;
	background-color: rgb(0, 1, 3, 0.9);
}
::v-deep .el-collapse {
	--el-collapse-border-color: rgb(0, 1, 3, 0.9) !important;
	/* --el-collapse-border-radius: 5px !important; */
	padding-bottom: 0px;
	background-color: rgb(0, 1, 3, 0.9);
}
::v-deep .el-collapse-item__wrap {
	background-color: rgb(0, 1, 3, 0.9) !important;
}
</style>
