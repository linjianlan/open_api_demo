<template>
	<el-dialog :title="form.caroId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="24" class="mb20">
					<el-form-item label="标题" prop="caroTitle">
						<el-input v-model="form.caroTitle" placeholder="请输入标题" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="图片路径" prop="caroUrl">
						<!-- <upload-img v-model="form.titbIcon"></upload-img> -->
						<ImageUpload v-model:imageUrl="form.caroUrl" borderRadius="0%">
							<template #empty>
								<el-icon>
									<!-- <el-avatar> user </el-avatar> -->
								</el-icon>
								<span>请上传图片</span>
							</template>
						</ImageUpload>
					</el-form-item>
					<!-- <el-form-item label="图片路径" prop="caroUrl">
						<upload-img v-model="form.caroUrl"></upload-img>
					</el-form-item> -->
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="宣传语" prop="caroContent">
						<el-input v-model="form.caroContent" placeholder="请输入宣传语" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="跳转按钮介绍" prop="caroButton">
						<el-input v-model="form.caroButton" placeholder="请输入跳转按钮介绍" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="跳转路径" prop="caroSkip">
						<el-input v-model="form.caroSkip" placeholder="请输入跳转路径" />
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

<script setup lang="ts" name="CarouselDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj } from '/@/api/newsite/carousel';
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);
const ImageUpload = defineAsyncComponent(() => import('/@/components/Upload/Image.vue'));

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
// 定义字典

// 提交表单数据
const form = reactive({
	caroId: '',
	caroTitle: '',
	caroUrl: '',
	caroContent: '',
	caroButton: '',
	caroSkip: '',
});

// 定义校验规则
const dataRules = ref({
	caroTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
	caroUrl: [{ required: true, message: '图片路径不能为空', trigger: 'blur' }],
	caroContent: [{ required: true, message: '宣传语不能为空', trigger: 'blur' }],
	caroButton: [{ required: true, message: '跳转按钮介绍不能为空', trigger: 'blur' }],
	caroSkip: [{ required: true, message: '跳转路径不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.caroId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取carousel信息
	if (id) {
		form.caroId = id;
		getcarouselData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.caroId ? await putObj(form) : await addObj(form);
		useMessage().success(form.caroId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getcarouselData = (id: string) => {
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
