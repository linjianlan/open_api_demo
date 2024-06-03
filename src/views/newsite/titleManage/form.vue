<template>
	<el-dialog :title="form.titbId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="12" class="mb20">
					<el-form-item label="标题" prop="titbTitle">
						<el-input type="textarea" v-model="form.titbTitle" placeholder="请输入标题" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="标签内容" prop="titbContent">
						<el-input v-model="form.titbContent" placeholder="请输入标签内容" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="父级id" prop="titbParentId">
						<el-select v-model="form.titbParentId" placeholder="请选择父级id">
							<!-- <el-option  label="请选择">0</el-option> -->
							<el-option v-for="item in state.seleParent" :key="item.titbId" :label="item.titbTitle" :value="item.titbId"> </el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="跳转路径" prop="titbUrl">
						<el-input v-model="form.titbUrl" placeholder="请输入跳转路径" />
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="图标或图片路径" prop="titbIcon">
						<!-- <upload-img v-model="form.titbIcon"></upload-img> -->
						<ImageUpload v-model:imageUrl="form.titbIcon" borderRadius="0%">
							<template #empty>
								<el-icon>
									<Avatar />
								</el-icon>
								<span>请上传图片</span>
							</template>
						</ImageUpload>
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="级别 1 父级" prop="titbGrade">
						<el-input-number :min="1" :max="4" v-model="form.titbGrade" placeholder="请输入级别 1 父级    1++...子级"></el-input-number>
					</el-form-item>
				</el-col>

				<el-col :span="12" class="mb20">
					<el-form-item label="排序优先级" prop="titbIndex">
						<el-input-number :min="1" :max="99" v-model="form.titbIndex" placeholder="排序优先级最大99"></el-input-number>
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

<script setup lang="ts" name="TitleManageDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj, seleIdObj } from '/@/api/newsite/titleManage';
import { rule } from '/@/utils/validate';
import index from './index.vue';
const ImageUpload = defineAsyncComponent(() => import('/@/components/Upload/Image.vue'));
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
// 定义字典

// 提交表单数据
const form = reactive({
	titbId: '',
	titbTitle: '',
	titbContent: '',
	titbParentId: '',
	titbUrl: '',
	titbIcon: '',
	titbGrade: 0,
	titbIndex: 8,
});
const state = reactive({
	//父级id列表查询
	seleParent: '',
});

const getParent = () => {
	seleIdObj()
		.then((res) => {
			state.seleParent = res.data;
		})
		.finally(() => {});
};
getParent();

// 定义校验规则
const dataRules = ref({
	titbTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
	titbContent: [{ required: true, message: '标签内容不能为空', trigger: 'blur' }],
	// titbParentId: [{ required: true, message: '父级id不能为空', trigger: 'blur' }],
	titbUrl: [{ required: true, message: '跳转路径不能为空', trigger: 'blur' }],
	// titbIcon: [{ required: true, message: '图标或图片路径不能为空', trigger: 'blur' }],
	titbGrade: [{ required: true, message: '级别 1 父级    1++...子级不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.titbId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取titleManage信息
	if (id) {
		form.titbId = id;
		gettitleManageData(id);
	}
};

// console.log(seleParent);

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.titbId ? await putObj(form) : await addObj(form);
		useMessage().success(form.titbId ? '修改成功' : '添加成功');
		getParent();
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const gettitleManageData = (id: string) => {
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
