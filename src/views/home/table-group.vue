<template>
	<div class="table-container" :style="{ height: tbaHeight }">
		<table class="fixed-table">
			<thead>
				<tr>
					<th
						v-for="(column, index) in headers"
						:key="index"
						style="color: rgb(0, 115, 255); line-height: 2px; font-size: 10px"
						:style="{ width: column.width }"
					>
						{{ column.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, rowIndex) in rows" :key="rowIndex">
					<td v-for="(cell, cellIndex) in row" :key="cellIndex" style="color: rgb(0, 115, 255); line-height: 4px; font-size: 10px">
						{{ cell }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default {
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
		};
	},
	onMounted() {
		console.log(123);
	},
};
</script>

<style scoped>
.table-container {
	overflow: auto; /* 启用垂直和水平滚动 */
	position: relative;
	border: 1px solid rgb(0, 115, 255);
	border-radius: 5px;
}

.fixed-table {
	width: 100%;
	border-collapse: collapse;
	table-layout: fixed; /* 固定表格布局以确保列宽一致 */
}

.fixed-table th,
.fixed-table td {
	/* border: 1px solid #ddd; */
	border-bottom: 1px solid rgb(0, 115, 255);

	padding: 8px;
	text-align: center; /* 内容居中 */
	white-space: nowrap; /* 防止内容换行破坏布局 */
	overflow: hidden; /* 隐藏超出单元格的内容 */
	text-overflow: ellipsis; /* 当内容超出时显示省略号 */
}

.fixed-table thead th {
	position: sticky;
	top: 0; /* 固定在顶部 */
	z-index: 1; /* 确保表头在内容之上 */
}
</style>
