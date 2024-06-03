<template>
	<el-dialog :title="form.pcId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="24">
				<el-col :span="24" class="mb20">
					<!-- <el-form-item label="标题id" prop="pcTitbParentId">
						<el-select v-model="form.pcTitbParentId" placeholder="请选择标题id">
							<el-option label="请选择">0</el-option>
						</el-select> -->

					<!-- </el-form-item> -->
					<el-form-item label="标签表id" prop="pcTitbParentId">
						<!-- <el-select v-model="form.solTitbid" placeholder="请选择标签表id">
							<el-option label="请选择">0</el-option>
						</el-select> -->
						<el-cascader :options="state.seleParent" :aria-label="state.seleParent" v-model="form.pcTitbParentId" :props="props" clearable />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="案例标题" prop="pcTitle">
						<el-input type="textarea" v-model="form.pcTitle" placeholder="请输入案例标题" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="展示图片" prop="pcImg">
						<!-- <upload-img v-model="form.pcImg"></upload-img> -->
						<ImageUpload v-model:imageUrl="form.pcImg" borderRadius="0%">
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
					<el-form-item label="内容简介" prop="pcContent">
						<el-input type="textarea" v-model="form.pcContent" placeholder="请输入内容简介" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="详细html" prop="pcDeilHtml">
						<editor v-if="visible" v-model:get-html="form.pcDeilHtml" placeholder="请输入详细html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标签" prop="pcTag">
						<el-input v-model="form.pcTag" placeholder="请输入标签" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="阅读次数" prop="pcLook">
						<el-input-number :min="1" :max="1000" v-model="form.pcLook" placeholder="请输入阅读次数"></el-input-number>
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

<script setup lang="ts" name="ProjectCasesDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj } from '/@/api/newsite/projectCases';
import { rule } from '/@/utils/validate';
import { seleTitleByid } from '/@/api/newsite/product';
const ImageUpload = defineAsyncComponent(() => import('/@/components/Upload/Image.vue'));

const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false);
const loading = ref(false);
// 定义字典

// 提交表单数据
const form = reactive({
	pcId: '',
	pcTitbParentId: '',
	pcTitle: '',
	pcImg: '',
	pcContent: '',
	pcDeilHtml: '',
	pcTag: '',
	pcLook: 0,
});

const props = { label: 'titbTitle', value: 'titbId', children: 'children' };

const state = reactive({
	//父级id列表树查询
	seleParent: '',
});
const getParent = () => {
	var data = { titbParentId: 2107908098 };
	seleTitleByid(data)
		.then((res) => {
			state.seleParent = res.data;
		})
		.finally(() => {});
};
getParent();
// 定义校验规则
const dataRules = ref({
	pcTitbParentId: [{ required: true, message: '标题id不能为空', trigger: 'blur' }],
	pcTitle: [{ required: true, message: '案例标题不能为空', trigger: 'blur' }],
	pcImg: [{ required: true, message: '展示图片不能为空', trigger: 'blur' }],
	pcContent: [{ required: true, message: '内容简介不能为空', trigger: 'blur' }],
	pcDeilHtml: [{ required: true, message: '详细html不能为空', trigger: 'blur' }],
	pcTag: [{ required: true, message: '标签不能为空', trigger: 'blur' }],
	pcLook: [{ required: true, message: '阅读次数不能为空', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.pcId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取projectCases信息
	if (id) {
		form.pcId = id;
		getprojectCasesData(id);
	}
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.pcTitbParentId = form.pcTitbParentId[0];

		form.pcId ? await putObj(form) : await addObj(form);
		useMessage().success(form.pcId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getprojectCasesData = (id: string) => {
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
