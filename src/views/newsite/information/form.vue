<template>
	<el-dialog :title="form.infoId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="24" class="mb20">
					<el-form-item label="标签表id" prop="infotagId">
						<el-select v-model="form.infotagId" placeholder="请选择标签表id">
							<el-option v-for="item in state.seleParent" :key="item.infotagId" :label="item.infotagTitle" :value="item.infotagId"> </el-option>
							<!-- <el-option label="请选择">0</el-option> -->
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标题" prop="infoTitle">
						<el-input v-model="form.infoTitle" placeholder="请输入标题" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标签" prop="infoTag">
						<el-input v-model="form.infoTag" placeholder="请输入标签" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="展示图" prop="infoImg">
						<ImageUpload v-model:imageUrl="form.infoImg" borderRadius="0%">
							<template #empty>
								<el-icon>
									<Avatar />
								</el-icon>
								<span>请上传图片</span>
							</template>
						</ImageUpload>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="内容" prop="infoContentHtml">
						<editor v-if="visible" v-model:get-html="form.infoContentHtml" placeholder="请输入内容"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="阅读量" prop="infoLook">
						<el-input-number :min="1" :max="1000" v-model="form.infoLook" placeholder="请输入阅读量"></el-input-number>
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

<script setup lang="ts" name="InformationDialog">
const ImageUpload = defineAsyncComponent(() => import('/@/components/Upload/Image.vue'));

import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj, selectinfoVoAll } from '/@/api/newsite/information';
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);

const state = reactive({
	//父级id列表查询
	seleParent: '',
});

const getParent = () => {
	selectinfoVoAll()
		.then((res) => {
			state.seleParent = res.data;
		})
		.finally(() => {});
};
getParent();

// 定义字典

// 提交表单数据
const form = reactive({
	infoId: '',
	infotagId: '',
	infoTitle: '',
	infoTag: '',
	infoImg: '',
	infoContentHtml: '',
	infoLook: 0,
});

// 定义校验规则
const dataRules = ref({
	infotagId: [{ required: true, message: '标签表id不能为空', trigger: 'blur' }],
	infoTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
	infoTag: [{ required: true, message: '标签不能为空', trigger: 'blur' }],
	infoImg: [{ required: true, message: '展示图不能为空', trigger: 'blur' }],
	infoContentHtml: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
	infoLook: [{ required: true, message: '阅读量不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.infoId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取information信息
	if (id) {
		form.infoId = id;
		getinformationData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.infoId ? await putObj(form) : await addObj(form);
		useMessage().success(form.infoId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getinformationData = (id: string) => {
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
