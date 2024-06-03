<template>
	<el-dialog :title="form.solId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="24" class="mb20">
					<el-form-item label="标签表id" prop="solTitbid">
						<!-- <el-select v-model="form.solTitbid" placeholder="请选择标签表id">
							<el-option label="请选择">0</el-option>
						</el-select> -->
						<el-cascader :options="state.seleParent" :aria-label="state.seleParent" v-model="form.solTitbid" :props="props" clearable />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<!-- <el-form-item label="展示图" prop="solImg">
						<upload-img v-model="form.solImg"></upload-img>
					</el-form-item> -->
					<el-form-item label="展示图" prop="solImg">
						<!-- <upload-img v-model="form.prodTitle"></upload-img> -->
						<ImageUpload v-model:imageUrl="form.solImg" borderRadius="0%">
							<template #empty>
								<!-- <el-icon>
									<Avatar />
								</el-icon> -->
								<span>请上传图片</span>
							</template>
						</ImageUpload>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标题" prop="solTitle">
						<el-input v-model="form.solTitle" placeholder="请输入标题" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="跳转路径" prop="solSkip">
						<el-input v-model="form.solSkip" placeholder="请输入跳转路径" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标签" prop="solTag">
						<el-input v-model="form.solTag" placeholder="请输入标签" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="内容HTML" prop="solContent">
						<el-input type="textarea" v-model="form.solContent" placeholder="请输入内容HTML" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="观看次数" prop="solLook">
						<el-input-number :min="1" :max="1000" v-model="form.solLook" placeholder="请输入观看次数"></el-input-number>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="下载次数" prop="solDownload">
						<el-input-number :min="1" :max="1000" v-model="form.solDownload" placeholder="请输入下载次数"></el-input-number>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="排序默认值" prop="solIndex">
						<el-input-number :min="1" :max="1000" v-model="form.solIndex" placeholder="请输入排序默认值"></el-input-number>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="方案概述" prop="solSolveHtml">
						<editor v-if="visible" v-model:get-html="form.solSolveHtml" placeholder="请输入方案概述"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="主要配置" prop="solSummaryHtml">
						<editor v-if="visible" v-model:get-html="form.solSummaryHtml" placeholder="请输入主要配置"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="应用配置" prop="solApplytoHtml">
						<editor v-if="visible" v-model:get-html="form.solApplytoHtml" placeholder="请输入应用配置"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="相关视频" prop="solVideoHtml">
						<editor v-if="visible" v-model:get-html="form.solVideoHtml" placeholder="请输入相关视频"></editor>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="visible = false">取消</el-button>
				<el-button type="primary" @click="onSubmit" :disabled="loading">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="SolveDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj, seleTitleByid } from '/@/api/newsite/solve';
import { rule } from '/@/utils/validate';
const ImageUpload = defineAsyncComponent(() => import('/@/components/Upload/Image.vue'));

const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
// 定义字典

// 提交表单数据
const form = reactive({
	solId: '',
	solTitbid: '',
	solImg: '',
	solTitle: '',
	solSkip: '',
	solTag: '',
	solContent: '',
	solLook: 0,
	solDownload: 0,
	solIndex: 0,
	solSolveHtml: '',
	solSummaryHtml: '',
	solApplytoHtml: '',
	solVideoHtml: '',
});

const props = { label: 'titbTitle', value: 'titbId', children: 'children' };

const state = reactive({
	//父级id列表树查询
	seleParent: '',
});
const getParent = () => {
	var data = { titbParentId: 1680089090 };
	seleTitleByid(data)
		.then((res) => {
			state.seleParent = res.data;
		})
		.finally(() => {});
};
getParent();

// 定义校验规则
const dataRules = ref({
	solTitbid: [{ required: true, message: '标签表id不能为空', trigger: 'blur' }],
	solImg: [{ required: true, message: '展示图不能为空', trigger: 'blur' }],
	solTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
	solSkip: [{ required: true, message: '跳转路径不能为空', trigger: 'blur' }],
	solTag: [{ required: true, message: '标签不能为空', trigger: 'blur' }],
	solContent: [{ required: true, message: '内容HTML不能为空', trigger: 'blur' }],
	solLook: [{ required: true, message: '观看次数不能为空', trigger: 'blur' }],
	solDownload: [{ required: true, message: '下载次数不能为空', trigger: 'blur' }],
	solIndex: [{ required: true, message: '排序默认值不能为空', trigger: 'blur' }],
	solSolveHtml: [{ required: true, message: '方案概述不能为空', trigger: 'blur' }],
	solSummaryHtml: [{ required: true, message: '主要配置不能为空', trigger: 'blur' }],
	solApplytoHtml: [{ required: true, message: '应用配置不能为空', trigger: 'blur' }],
	solVideoHtml: [{ required: true, message: '相关视频不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.solId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取solve信息
	if (id) {
		form.solId = id;
		getsolveData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.solTitbid = form.solTitbid[0];
		form.solId ? await putObj(form) : await addObj(form);
		// if (form.solTitbid.length == 1) {
		// 	form.solTitbid = form.solTitbid.toString().replace(/\[|]/g, '');
		// } else {

		// }

		useMessage().success(form.solId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getsolveData = (id: string) => {
	// 获取数据
	loading.value = true;
	getObj(id)
		.then((res: any) => {
			Object.assign(form, res.data);
		})
		.finally(() => {
			loading.value = false;
		});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style>
.el-cascader {
	width: 500px;
}
</style>
