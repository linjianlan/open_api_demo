<template>
	<div class="layout-padding">
		<!-- <div class="layout-padding-auto layout-padding-view">
      <el-row>
        <div class="mb8" style="width: 100%">
          <el-button icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()"
            v-auth="'newsite_rainReport_add'">
            新 增
          </el-button>
          <el-button plain :disabled="multiple" icon="Delete" type="primary"
            v-auth="'newsite_rainReport_del'" @click="handleDelete(selectObjs)">
            删除
          </el-button>
          <right-toolbar v-model:showSearch="showSearch" :export="'newsite_rainReport_export'"
                @exportExcel="exportExcel" class="ml10 mr20" style="float: right;"
            @queryTable="getDataList"></right-toolbar>
        </div>
      </el-row>
      <el-table :data="state.dataList" v-loading="state.loading" border 
        :cell-style="tableStyle.cellStyle" :header-cell-style="tableStyle.headerCellStyle"
				@selection-change="selectionChangHandle"
        @sort-change="sortChangeHandle">
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="#" width="40" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button icon="edit-pen" text type="primary" v-auth="'newsite_rainReport_edit'"
              @click="formDialogRef.openDialog(scope.row.id)">编辑</el-button>
            <el-button icon="delete" text type="primary" v-auth="'newsite_rainReport_del'" @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
    </div> -->

		<!-- 编辑、新增  -->
		<!-- <form-dialog ref="formDialogRef" @refresh="getDataList(false)" /> -->

		<splitpanes>
			<pane size="15">
				<div class="layout-padding-auto layout-padding-view">
					<el-tree-v2
						style="max-width: 600px"
						:data="data"
						:props="props"
						show-checkbox
						:height="800"
						:default-checked-keys="dataList"
						@check="handleCheckChange"
						:default-expanded-keys="dataArr"
					>
						<template #default="{ node }">
							<!-- {{ node.level }} -->
							<span>{{ node.label }}</span>
							<!-- <span class="prefix" :class="{ 'is-leaf': node.isLeaf }" v-if="node.level === 1" style="margin-left: 3px"
								><SvgIcon color="#409eff" name="local-设备区域分布"></SvgIcon
							></span> -->

							<span class="prefix" style="margin-left: 5px; margin-top: 5px" :class="{ 'is-leaf': node.isLeaf }" v-if="node.level === 2"
								><SvgIcon color="#409eff" name="local-设备区域分布"></SvgIcon
							></span>
							<span class="prefix" style="margin-left: 5px; margin-top: 2px" :class="{ 'is-leaf': node.isLeaf }" v-if="node.level === 3"
								><SvgIcon color="red" class="layout-navbars-breadcrumb-iconfont" name="local-水库点"></SvgIcon
							></span>
						</template>
					</el-tree-v2>
				</div>
			</pane>
			<pane class="ml8">
				<div class="layout-padding-auto layout-padding-view" style="overflow: auto !important">
					<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="累计雨量" name="first">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="1月" value="New York" />
											<el-radio-button label="2月" value="Washington" />
											<el-radio-button label="3月" value="Los Angeles" />
											<el-radio-button label="4月" value="Chicago" />
											<el-radio-button label="5月" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											起止时间：
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
								<el-clo :span="24" style="margin-top: 30px">
									<div class="block" style="margin-left: 0px">
										<el-table show-overflow-tooltip="true" :data="tableData" style="width: 100%" :span-method="objectSpanMethod">
											<el-table-column align="center" prop="date" label="区域" min-width="150" />

											<el-table-column align="center" prop="name" label="站点名称" min-width="120" />

											<el-table-column align="center" label="累计雨量" style="text-align: center">
												<el-table-column align="center" prop="state" label="单位:mm" min-width="120" />
											</el-table-column>
										</el-table>
									</div>
								</el-clo>
							</el-row>
						</el-tab-pane>

						<el-tab-pane label="时段雨量" name="second">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="今天" value="New York" />
											<el-radio-button label="前一天" value="Washington" />
											<el-radio-button label="前三天" value="Los Angeles" />
											<el-radio-button label="前五天" value="Chicago" />
											<el-radio-button label="前七天" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
								<el-clo :span="24" style="margin-top: 30px">
									<div class="block" style="margin-left: 0px">
										<el-table :data="dataLists" border style="width: 100%" show-summary>
											<el-table-column
												align="center"
												v-for="header in dataListTitle"
												:key="header.props"
												:width="header.width"
												:prop="header.props"
												:label="header.label"
											>
											</el-table-column>
										</el-table>
									</div>
								</el-clo>
							</el-row>
						</el-tab-pane>

						<el-tab-pane label="日雨量" name="third">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="今天" value="New York" />
											<el-radio-button label="前一天" value="Washington" />
											<el-radio-button label="前三天" value="Los Angeles" />
											<el-radio-button label="前五天" value="Chicago" />
											<el-radio-button label="前七天" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											日期：
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker v-model="value3" type="date" placeholder="请选择日期" :size="size" />
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/日雨量.png" />
						</el-tab-pane>

						<el-tab-pane label="月雨量" name="fourth1">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="1月" value="New York" />
											<el-radio-button label="2月" value="Washington" />
											<el-radio-button label="3月" value="Los Angeles" />
											<el-radio-button label="4月" value="Chicago" />
											<el-radio-button label="5月" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/月雨量.png" />
						</el-tab-pane>

						<el-tab-pane label="年雨量" name="fourth5">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="2024" value="New York" />
											<el-radio-button label="2023" value="Washington" />
											<el-radio-button label="2022" value="Los Angeles" />
											<el-radio-button label="2021" value="Chicago" />
											<el-radio-button label="2020" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											起止时间：
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/年雨量.png" />
						</el-tab-pane>

						<el-tab-pane label="极值雨量" name="fourth2">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="今天" value="New York" />
											<el-radio-button label="前一天" value="Washington" />
											<el-radio-button label="前三天" value="Los Angeles" />
											<el-radio-button label="前五天" value="Chicago" />
											<el-radio-button label="前七天" value="Chicago1" />
											<el-radio-button label="前十五天" value="Chicago2" />

											<el-radio-button label="前三十天" value="Chicago3" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/极值雨量.png" />
						</el-tab-pane>

						<el-tab-pane label="月逐日雨量" name="fourth6">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="1月" value="New York" />
											<el-radio-button label="2月" value="Washington" />
											<el-radio-button label="3月" value="Los Angeles" />
											<el-radio-button label="4月" value="Chicago" />
											<el-radio-button label="5月" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/月逐日降雨.png" />
						</el-tab-pane>

						<el-tab-pane label="年逐日雨量" class="layout-padding-auto" name="fourth3">
							<el-row>
								<el-col :span="24">
									<div class="grid-content ep-bg-purple-dark" style="display: flex; align-items: center; margin-left: 5px">
										时间区域：
										<el-radio-group v-model="radio3" style="margin-left: 3px">
											<el-radio-button label="2024" value="New York" />
											<el-radio-button label="2023" value="Washington" />
											<el-radio-button label="2022" value="Los Angeles" />
											<el-radio-button label="2021" value="Chicago" />
											<el-radio-button label="2020" value="Chicago1" />
										</el-radio-group>
										<div class="block" style="margin-left: 40px">
											<!-- <span class="demonstration">Default</span> -->
											<el-date-picker
												v-model="value1"
												type="daterange"
												range-separator="至"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												:size="size"
											/>
										</div>
										<div class="block" style="margin-left: 40px">
											时段区间选择：
											<el-select v-model="value123" placeholder="请选择时段区间" style="width: 240px">
												<el-option v-for="item in options123" :key="item.value" :label="item.label" :value="item.value" />
											</el-select>
											<el-button type="primary" style="margin-left: 40px">
												<el-icon class="el-icon--right"><Upload /></el-icon> 导出
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
							<img src="../../../assets/img/年逐日单站.png" />
						</el-tab-pane>
					</el-tabs>
				</div>
			</pane>
		</splitpanes>
	</div>
</template>

<script setup lang="ts" name="systemRainReport">
import { BasicTableProps, useTable } from '/@/hooks/table';
import { fetchList, delObjs } from '/@/api/newsite/rainReport';
import { useMessage, useMessageBox } from '/@/hooks/message';
import { useDict } from '/@/hooks/dict';
import type { TabsPaneContext } from 'element-plus';
const activeName = ref('first');
const radio3 = ref('New York');
const value1 = ref('');
const value3 = ref('');
const value123 = ref('');

interface SpanMethodProps {
	row: User;
	column: TableColumnCtx<User>;
	rowIndex: number;
	columnIndex: number;
}

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
	console.log(row, column);
	if (columnIndex === 0) {
		if (rowIndex % 3 === 0) {
			return {
				rowspan: 3,
				colspan: 1,
			};
		} else {
			return {
				rowspan: 0,
				colspan: 0,
			};
		}
	}
};

const dataListTitle = [
	{ label: '时间', props: 'date', width: 120 },
	{ label: '洪山水库', props: 'honshan', width: 90 },
	{ label: '六一水库', props: 'liuyi', width: 90 },
	{ label: '上朴水库', props: 'shangpu', width: 90 },
	{ label: '云登水库', props: 'yundeng', width: 90 },
	{ label: '河口水库', props: 'heko', width: 90 },
	{ label: '川口水库', props: 'chaunko', width: 90 },
	{ label: '上三水库', props: 'shangshan', width: 90 },
];

const dataLists = [
	{
		date: '2016-05-03',
		honshan: '45',
		liuyi: '41',
		shangpu: '38',
		yundeng: '42',
		heko: '49',
		chaunko: '24',
		shangshan: '51',
	},
	{
		date: '2016-05-04',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-05',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-06',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-07',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-08',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-09',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
	{
		date: '2016-05-10',
		honshan: '46',
		liuyi: '47',
		shangpu: '32',
		yundeng: '56. ',
		heko: '16',
		chaunko: '44',
		shangshan: '41',
	},
];

const tableData = [
	{
		date: '江口区',
		name: '洪山水库',
		state: '43',
		city: '46',
		address: '49',
		zip: '43',
	},
	{
		date: '江口区',
		name: '六一水库',
		state: '47',
		city: '38',
		address: '35',
		zip: '45',
	},
	{
		date: '江口区',
		name: '上朴水库',
		state: '42',
		city: '35',
		address: '44',
		zip: '45',
	},
	{
		date: '江上区',
		name: '云登水库',
		state: '48',
		city: '35',
		address: '44',
		zip: '45',
	},
	{
		date: '2016-05-01',
		name: '河口水库',
		state: '43',
		city: '39',
		address: '42',
		zip: '45',
	},
	{
		date: '2016-05-01',
		name: '川口水库',
		state: '46',
		city: '39',
		address: '42',
		zip: '45',
	},
];

const tableDatas = [
	{
		id: '001244',
		date: '江口区',
		name: '洪山水库',
		state: '43',
		city: '46',
		address: '49',
		zip: '43',
	},
	{
		id: '00355',
		date: '江口区',
		name: '六一水库',
		state: '47',
		city: '38',
		address: '35',
		zip: '45',
	},
	{
		id: '044244',

		date: '江上区',
		name: '云登水库',
		state: '42',
		city: '35',
		address: '44',
		zip: '45',
	},

	{
		id: '00664',

		date: '江上区',
		name: '河口水库',
		state: '43',
		city: '39',
		address: '42',
		zip: '45',
	},
];

const options123 = [
	{
		value: 'Option1',
		label: '一小时',
	},
	{
		value: 'Option2',
		label: '两小时',
	},
	{
		value: 'Option3',
		label: '三小时',
	},
	{
		value: 'Option4',
		label: '四小时',
	},
	{
		value: 'Option5',
		label: '五小时',
	},
];

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};

const handleCheckChange = (
	data: TreeNodeData,
	info: { checkedKeys: TreeKey[]; checkedNodes: TreeData; halfCheckedKeys: TreeKey[]; halfCheckedNodes: TreeData }
) => {
	console.log('Changed nodes:', data);
	console.log('Checked nodes:', info);
	// console.log('Indeterminate nodes:', e);
};

//可复选树状
interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}

const getKey = (prefix: string, id: number) => {
	return `${prefix}-${id}`;
};

const createData = (maxDeep: number, maxChildren: number, minNodesNumber: number, deep = 1, key = 'node'): Tree[] => {
	let id = 0;
	return Array.from({ length: minNodesNumber })
		.fill(deep)
		.map(() => {
			const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
			const nodeKey = getKey(key, ++id);
			return {
				id: nodeKey,
				label: nodeKey,
				children: childrenNumber ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey) : undefined,
			};
		});
};

const props = {
	value: 'id',
	label: 'label',
	children: 'children',
};
// createData(3, 30, 40);
//展开的数据
const dataArr = [0, 1, 2];

const colors = '#409eff';

//默认选中的数据
const dataList = [0, 1, 1.1, 1.2, 1.3, 2, 2.1, 2.2];
const data = [
	{
		id: 0,
		label: '全部',
		children: [
			{
				id: 1,
				label: '江口',
				children: [
					{ id: 1.1, label: '洪山水库', children: [] },
					{ id: 1.2, label: '六一水库', children: [] },
					{ id: 1.3, label: '上朴水库', children: [] },
				],
			},
			{
				id: 2,
				label: '江上',
				children: [
					{ id: 2.1, label: '云登水库', children: [] },
					{ id: 2.2, label: '河口水库', children: [] },
					{ id: 2.3, label: '川口水库', children: [] },
					{ id: 2.4, label: '上三水库', children: [] },
				],
			},
		],
	},
];
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
	downBlobFile('/newsite/rainReport/export', Object.assign(state.queryForm, { ids: selectObjs }), 'rainReport.xlsx');
};

// 多选事件
const selectionChangHandle = (objs: { id: string }[]) => {
	selectObjs.value = objs.map(({ id }) => id);
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
