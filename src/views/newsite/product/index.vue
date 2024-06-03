<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<el-row v-show="showSearch">
				<el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
					<el-form-item label="发布时间" prop="prodCreateTime">
						<el-input placeholder="请输入发布时间" v-model="state.queryForm.prodCreateTime" />
					</el-form-item>
					<el-form-item label="标签表id" prop="titbParentId">
						<el-input placeholder="请输入标签表id" v-model="state.queryForm.titbParentId" />
					</el-form-item>
					<el-form-item label="产品标题" prop="prodImg">
						<el-input placeholder="请输入产品标题" v-model="state.queryForm.prodImg" />
					</el-form-item>
					<el-form-item label="内容" prop="prodContent">
						<el-input placeholder="请输入内容" v-model="state.queryForm.prodContent" />
					</el-form-item>
					<el-form-item label="标签介绍" prop="prodTag">
						<el-input placeholder="请输入标签介绍" v-model="state.queryForm.prodTag" />
					</el-form-item>
					<el-form-item>
						<el-button icon="search" type="primary" @click="getDataList"> 查询 </el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<div class="mb8" style="width: 100%">
					<el-button icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()" v-auth="'newsite_product_add'">
						新 增
					</el-button>
					<el-button plain :disabled="multiple" icon="Delete" type="primary" v-auth="'newsite_product_del'" @click="handleDelete(selectObjs)">
						删除
					</el-button>
					<right-toolbar
						v-model:showSearch="showSearch"
						:export="'newsite_product_export'"
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
				<el-table-column prop="prodCreateTime" label="发布时间" show-overflow-tooltip />
				<el-table-column prop="titbParentId" label="标签表id" show-overflow-tooltip />
				<el-table-column prop="prodTitle" label="产品标题" show-overflow-tooltip />
				<el-table-column prop="prodImg" label="产品图片" show-overflow-tooltip>
					<template #default="scope">
						<div class="demo-image" v-if="scope.row.prodImg != ''">
							<el-image style="width: 100px; height: 100px" :src="'api' + scope.row.prodImg" fit="contain" />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="prodLook" label="观看次数" show-overflow-tooltip />
				<el-table-column prop="prodDownload" label="下载次数" show-overflow-tooltip />
				<el-table-column prop="prodContent" label="内容" show-overflow-tooltip />
				<el-table-column prop="prodTag" label="标签介绍" show-overflow-tooltip />
				<el-table-column prop="prodSummaryHtml" label="产品概述html" show-overflow-tooltip />
				<el-table-column prop="prodSpecsHtml" label="规格概述html" show-overflow-tooltip />
				<el-table-column prop="prodResourceHtml" label="资料下载html" show-overflow-tooltip />
				<el-table-column prop="prodVideosHtml" label="相关视频html" show-overflow-tooltip />
				<el-table-column prop="prodBuyHtml" label="购买通道html" show-overflow-tooltip />
				<el-table-column prop="prodSkip" label="跳转路径" show-overflow-tooltip />
				<el-table-column prop="prodIndex" label="排序" show-overflow-tooltip />
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button icon="edit-pen" text type="primary" v-auth="'newsite_product_edit'" @click="formDialogRef.openDialog(scope.row.prodId)"
							>编辑</el-button
						>
						<el-button icon="delete" text type="primary" v-auth="'newsite_product_del'" @click="handleDelete([scope.row.prodId])">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
		</div>

		<!-- 编辑、新增  -->
		<form-dialog ref="formDialogRef" @refresh="getDataList(false)" />
	</div>
</template>

<script setup lang="ts" name="systemProduct">
import { BasicTableProps, useTable } from '/@/hooks/table';
import { fetchList, delObjs } from '/@/api/newsite/product';
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

const states = reactive({
	//父级id列表树查询
	seleParent: '',
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
	downBlobFile('/newsite/product/export', Object.assign(state.queryForm, { ids: selectObjs }), 'product.xlsx');
};

// 多选事件
const selectionChangHandle = (objs: { prodId: string }[]) => {
	selectObjs.value = objs.map(({ prodId }) => prodId);
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
