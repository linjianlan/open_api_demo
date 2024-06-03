<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<el-row v-show="showSearch">
				<el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
					<el-form-item label="标题" prop="caroTitle">
						<el-input placeholder="请输入标题" v-model="state.queryForm.caroTitle" />
					</el-form-item>
					<el-form-item label="图片路径" prop="caroUrl">
						<el-input placeholder="请输入图片路径" v-model="state.queryForm.caroUrl" />
					</el-form-item>
					<el-form-item label="宣传语" prop="caroContent">
						<el-input placeholder="请输入宣传语" v-model="state.queryForm.caroContent" />
					</el-form-item>
					<el-form-item label="跳转按钮介绍" prop="caroButton">
						<el-input placeholder="请输入跳转按钮介绍" v-model="state.queryForm.caroButton" />
					</el-form-item>
					<el-form-item label="跳转路径" prop="caroSkip">
						<el-input placeholder="请输入跳转路径" v-model="state.queryForm.caroSkip" />
					</el-form-item>
					<el-form-item>
						<el-button icon="search" type="primary" @click="getDataList"> 查询 </el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<div class="mb8" style="width: 100%">
					<el-button icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()" v-auth="'newsite_carousel_add'">
						新 增
					</el-button>
					<el-button plain :disabled="multiple" icon="Delete" type="primary" v-auth="'newsite_carousel_del'" @click="handleDelete(selectObjs)">
						删除
					</el-button>
					<right-toolbar
						v-model:showSearch="showSearch"
						:export="'newsite_carousel_export'"
						@exportExcel="exportExcel"
						class="ml10 mr20"
						style="float: right"
						@queryTable="getDataList"
					></right-toolbar>
				</div>
			</el-row>
			<el-table
				:data="state.dataList"
				v-loading="state.loading"
				border
				:cell-style="tableStyle.cellStyle"
				:header-cell-style="tableStyle.headerCellStyle"
				@selection-change="selectionChangHandle"
				@sort-change="sortChangeHandle"
			>
				<el-table-column type="selection" width="40" align="center" />
				<el-table-column type="index" label="#" width="40" />
				<el-table-column prop="caroTitle" label="标题" show-overflow-tooltip />
				<el-table-column prop="caroUrl" label="图片路径" show-overflow-tooltip>
					<template #default="scope">
						<div class="demo-image__preview" style="z-index: 99999" v-if="scope.row.caroUrl != ''">
							<el-image
								style="width: 100px; height: 100px"
								:src="'api' + scope.row.caroUrl"
								:preview-src-list="['api' + scope.row.caroUrl]"
								:zoom-rate="0"
								:max-scale="7"
								:min-scale="0.2"
								hide-on-click-modal="true"
								:initial-index="4"
								fit="contain"
							/>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="caroContent" label="宣传语" show-overflow-tooltip />
				<el-table-column prop="caroButton" label="跳转按钮介绍" show-overflow-tooltip />
				<el-table-column prop="caroSkip" label="跳转路径" show-overflow-tooltip />
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button icon="edit-pen" text type="primary" v-auth="'newsite_carousel_edit'" @click="formDialogRef.openDialog(scope.row.caroId)"
							>编辑</el-button
						>
						<el-button icon="delete" text type="primary" v-auth="'newsite_carousel_del'" @click="handleDelete([scope.row.caroId])">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
		</div>

		<!-- 编辑、新增  -->
		<form-dialog ref="formDialogRef" @refresh="getDataList(false)" />
	</div>
</template>

<script setup lang="ts" name="systemCarousel">
import { BasicTableProps, useTable } from '/@/hooks/table';
import { fetchList, delObjs } from '/@/api/newsite/carousel';
import { useMessage, useMessageBox } from '/@/hooks/message';
import { useDict } from '/@/hooks/dict';

// 引入组件
const FormDialog = defineAsyncComponent(() => import('./form.vue'));
// 定义查询字典

// 定义变量内容
const formDialogRef = ref();
// 搜索变量
const queryRef = ref();
const showSearch = ref(true);
// 多选变量
const selectObjs = ref([]) as any;
const multiple = ref(true);

const state: BasicTableProps = reactive<BasicTableProps>({
	queryForm: {},
	pageList: fetchList,
});

//  table hook
const { getDataList, currentChangeHandle, sizeChangeHandle, sortChangeHandle, downBlobFile, tableStyle } = useTable(state);

// 清空搜索条件
const resetQuery = () => {
	// 清空搜索条件
	queryRef.value?.resetFields();
	// 清空多选
	selectObjs.value = [];
	getDataList();
};

// 导出excel
const exportExcel = () => {
	downBlobFile('/newsite/carousel/export', Object.assign(state.queryForm, { ids: selectObjs }), 'carousel.xlsx');
};

// 多选事件
const selectionChangHandle = (objs: { caroId: string }[]) => {
	selectObjs.value = objs.map(({ caroId }) => caroId);
	multiple.value = !objs.length;
};

// 删除操作
const handleDelete = async (ids: string[]) => {
	try {
		await useMessageBox().confirm('此操作将永久删除');
	} catch {
		return;
	}

	try {
		await delObjs(ids);
		getDataList();
		useMessage().success('删除成功');
	} catch (err: any) {
		useMessage().error(err.msg);
	}
};
</script>

<style scoped>
.demo-image__error .image-slot {
	font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
	font-size: 30px;
}
.demo-image__error .el-image {
	z-index: 99999;
	width: 100%;
	height: 200px;
}
</style>
