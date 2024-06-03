<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<el-row v-show="showSearch">
				<el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
					<el-form-item label="创建人" prop="titbCreateBy">
						<el-input placeholder="请输入创建人" v-model="state.queryForm.titbCreateBy" />
					</el-form-item>
					<el-form-item label="标题" prop="titbTitle">
						<el-input placeholder="请输入标题" v-model="state.queryForm.titbTitle" />
					</el-form-item>
					<el-form-item label="标签内容" prop="titbContent">
						<el-input placeholder="请输入标签内容" v-model="state.queryForm.titbContent" />
					</el-form-item>
					<el-form-item label="父级id" prop="titbParentId">
						<el-input placeholder="请输入父级id" v-model="state.queryForm.titbParentId" />
					</el-form-item>
					<el-form-item>
						<el-button icon="search" type="primary" @click="getDataList"> 查询 </el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<div class="mb8" style="width: 100%">
					<el-button icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()" v-auth="'newsite_titleManage_add'">
						新 增
					</el-button>
					<el-button plain :disabled="multiple" icon="Delete" type="primary" v-auth="'newsite_titleManage_del'" @click="handleDelete(selectObjs)">
						删除
					</el-button>
					<right-toolbar
						v-model:showSearch="showSearch"
						:export="'newsite_titleManage_export'"
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
				<el-table-column prop="titbCreateBy" label="创建人" show-overflow-tooltip />
				<el-table-column prop="titbTitle" label="标题" show-overflow-tooltip />
				<el-table-column prop="titbContent" label="标签内容" show-overflow-tooltip />
				<el-table-column prop="titbParentId" label="父级id" show-overflow-tooltip />
				<el-table-column prop="titbUrl" label="跳转路径" show-overflow-tooltip />
				<el-table-column prop="titbIcon" label="图标或图片路径" show-overflow-tooltip>
					<template #default="scope">
						<div class="demo-image" v-if="scope.row.titbIcon != ''">
							<el-image style="width: 100px; height: 100px" :src="'api' + scope.row.titbIcon" fit="contain" />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="titbGrade" label="级别 1 父级 1++子级" show-overflow-tooltip />
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button icon="edit-pen" text type="primary" v-auth="'newsite_titleManage_edit'" @click="formDialogRef.openDialog(scope.row.titbId)"
							>编辑</el-button
						>
						<el-button icon="delete" text type="primary" v-auth="'newsite_titleManage_del'" @click="handleDelete([scope.row.titbId])">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
		</div>

		<!-- 编辑、新增  -->
		<form-dialog ref="formDialogRef" @refresh="getDataList(false)" />
	</div>
</template>

<script setup lang="ts" name="systemTitleManage">
import { BasicTableProps, useTable } from '/@/hooks/table';
import { fetchList, delObjs } from '/@/api/newsite/titleManage';
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
	downBlobFile('/newsite/titleManage/export', Object.assign(state.queryForm, { ids: selectObjs }), 'titleManage.xlsx');
};

// 多选事件
const selectionChangHandle = (objs: { titbId: string }[]) => {
	selectObjs.value = objs.map(({ titbId }) => titbId);
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
