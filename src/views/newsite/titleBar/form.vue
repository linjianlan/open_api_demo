<template>
	<el-dialog :title="form.tId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="12" class="mb20">
					<el-form-item label="标题" prop="tTitle">
						<el-input v-model="form.tTitle" placeholder="请输入标题" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="标签内容" prop="tContent">
						<el-input type="textarea" v-model="form.tContent" placeholder="请输入标签内容" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="父级id" prop="tParentId">
						<el-select v-model="form.tParentId" placeholder="请选择父级id">
							<el-option v-for="item in tParentId" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="跳转路径" prop="tUrl">
						<el-input v-model="form.tUrl" placeholder="请输入跳转路径" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="图标或图片路径" prop="tIcon">
						<el-input v-model="form.tIcon" placeholder="请输入图标或图片路径" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="级别 1 父级    1++...子级" prop="tGrade">
						<el-input-number :min="1" :max="1000" v-model="form.tGrade" placeholder="请输入级别 1 父级    1++...子级"></el-input-number>
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

<script setup lang="ts" name="TitleBarDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj } from '/@/api/newsite/titleBar';
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
const tParentId = ['1', '2', '3'];
// 定义字典

// 提交表单数据
const form = reactive({
	tId: '',
	tTitle: '',
	tContent: '',
	tParentId: '',
	tUrl: '',
	tIcon: '',
	tGrade: 0,
});

// 定义校验规则
const dataRules = ref({
	tTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
	tContent: [{ required: true, message: '标签内容不能为空', trigger: 'blur' }],
	tParentId: [
		{ required: true, message: '父级id不能为空', trigger: 'blur' },
		{ validator: rule.number, trigger: 'blur' },
	],
	tUrl: [{ required: true, message: '跳转路径不能为空', trigger: 'blur' }],
	tIcon: [{ required: true, message: '图标或图片路径不能为空', trigger: 'blur' }],
	tGrade: [
		{ required: true, message: '级别 1 父级    1++...子级不能为空', trigger: 'blur' },
		{ validator: rule.number, trigger: 'blur' },
	],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.tId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取titleBar信息
	if (id) {
		form.tId = id;
		gettitleBarData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.tId ? await putObj(form) : await addObj(form);
		useMessage().success(form.tId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const gettitleBarData = (id: string) => {
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
