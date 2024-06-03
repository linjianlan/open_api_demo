<template>
	<el-dialog :title="form.pubId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="24" class="mb20">
					<el-form-item label="数据" prop="pubData">
						<el-input v-model="form.pubData" placeholder="请输入数据" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="图标" prop="pubIcon">
						<upload-img v-model="form.pubIcon"></upload-img>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="描述" prop="pubContent">
						<el-input v-model="form.pubContent" placeholder="请输入描述" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="详细" prop="pubDetailed">
						<el-input v-model="form.pubDetailed" placeholder="请输入详细" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="排序" prop="pubIndex">
						<el-input-number :min="1" :max="1000" v-model="form.pubIndex" placeholder="请输入排序"></el-input-number>
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

<script setup lang="ts" name="PublicizeDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj } from '/@/api/newsite/publicize';
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
// 定义字典

// 提交表单数据
const form = reactive({
	pubId: '',
	pubData: '',
	pubIcon: '',
	pubContent: '',
	pubDetailed: '',
	pubIndex: 0,
});

// 定义校验规则
const dataRules = ref({
	pubData: [{ required: true, message: '数据不能为空', trigger: 'blur' }],
	// pubIcon: [{required: true, message: '图标不能为空', trigger: 'blur'}],
	pubContent: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
	// pubDetailed: [{ required: true, message: '详细不能为空', trigger: 'blur' }],
	pubIndex: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.pubId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取publicize信息
	if (id) {
		form.pubId = id;
		getpublicizeData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.pubId ? await putObj(form) : await addObj(form);
		useMessage().success(form.pubId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getpublicizeData = (id: string) => {
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
