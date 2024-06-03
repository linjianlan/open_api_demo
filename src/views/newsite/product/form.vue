<template>
	<el-dialog :title="form.prodId ? '编辑' : '新增'" v-model="visible" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
			<el-row :gutter="32">
				<el-col :span="32" class="mb20">
					<el-form-item label="标签表id" prop="titbParentId">
						<!-- <el-select v-model="form.titbParentId" placeholder="请选择标签表id">
							<el-option label="请选择">0</el-option>
						</el-select> -->
						<el-cascader :options="state.seleParent" :aria-label="state.seleParent" v-model="form.titbParentId" :props="props" clearable />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="产品图片" prop="prodImg">
						<!-- <upload-img v-model="form.prodTitle"></upload-img> -->
						<ImageUpload v-model:imageUrl="form.prodImg" borderRadius="0%">
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
					<el-form-item label="产品标题" prop="prodTitle">
						<el-input v-model="form.prodTitle" placeholder="请输入产品标题" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="观看次数" prop="prodLook">
						<el-input v-model="form.prodLook" placeholder="请输入观看次数" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="下载次数" prop="prodDownload">
						<el-input v-model="form.prodDownload" placeholder="请输入下载次数" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="内容" prop="prodContent">
						<editor v-if="visible" v-model:get-html="form.prodContent" placeholder="请输入内容"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="标签介绍" prop="prodTag">
						<el-input v-model="form.prodTag" placeholder="请输入标签介绍" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="产品概述html" prop="prodSummaryHtml">
						<editor v-if="visible" v-model:get-html="form.prodSummaryHtml" placeholder="请输入产品概述html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="规格概述html" prop="prodSpecsHtml">
						<editor v-if="visible" v-model:get-html="form.prodSpecsHtml" placeholder="请输入规格概述html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="资料下载html" prop="prodResourceHtml">
						<editor v-if="visible" v-model:get-html="form.prodResourceHtml" placeholder="请输入资料下载html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="相关视频html" prop="prodVideosHtml">
						<editor v-if="visible" v-model:get-html="form.prodVideosHtml" placeholder="请输入相关视频html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="购买通道html" prop="prodBuyHtml">
						<editor v-if="visible" v-model:get-html="form.prodBuyHtml" placeholder="请输入购买通道html"></editor>
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="跳转路径" prop="prodSkip">
						<el-input v-model="form.prodSkip" placeholder="请输入跳转路径" />
					</el-form-item>
				</el-col>

				<el-col :span="24" class="mb20">
					<el-form-item label="排序" prop="prodIndex">
						<el-input-number :min="1" :max="1000" v-model="form.prodIndex" placeholder="请输入排序"></el-input-number>
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

<script setup lang="ts" name="ProductDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from '/@/hooks/message';
import { getObj, addObj, putObj, seleTitleByid } from '/@/api/newsite/product';
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
	prodId: '',
	titbParentId: '',
	prodTitle: '',
	prodImg: '',
	prodLook: '',
	prodDownload: '',
	prodContent: '',
	prodTag: '',
	prodSummaryHtml: '',
	prodSpecsHtml: '',
	prodResourceHtml: '',
	prodVideosHtml: '',
	prodBuyHtml: '',
	prodSkip: '',
	prodIndex: 0,
});
//  emitPath: false
const props = { label: 'titbTitle', value: 'titbId', children: 'children' };

// 定义校验规则
const dataRules = ref({
	titbParentId: [{ required: true, message: '标签表id不能为空', trigger: 'blur' }],
	prodTitle: [{ required: true, message: '产品图片不能为空', trigger: 'blur' }],
	prodImg: [{ required: true, message: '产品标题不能为空', trigger: 'blur' }],
	prodLook: [{ required: true, message: '观看次数不能为空', trigger: 'blur' }],
	prodDownload: [{ required: true, message: '下载次数不能为空', trigger: 'blur' }],
	prodContent: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
	prodTag: [{ required: true, message: '标签介绍不能为空', trigger: 'blur' }],
	prodSummaryHtml: [{ required: true, message: '产品概述html不能为空', trigger: 'blur' }],
	prodSpecsHtml: [{ required: true, message: '规格概述html不能为空', trigger: 'blur' }],
	// prodResourceHtml: [{required: true, message: '资料下载html不能为空', trigger: 'blur'}],
	prodVideosHtml: [{ required: true, message: '相关视频html不能为空', trigger: 'blur' }],
	prodBuyHtml: [{ required: true, message: '购买通道html不能为空', trigger: 'blur' }],
	prodSkip: [{ required: true, message: '跳转路径不能为空', trigger: 'blur' }],
	prodIndex: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
});

const state = reactive({
	//父级id列表树查询
	seleParent: '',
});
const getParent = () => {
	var data = { titbParentId: -1612378111 };
	seleTitleByid(data)
		.then((res) => {
			state.seleParent = res.data;
		})
		.finally(() => {});
};
getParent();
// 打开弹窗
const openDialog = (id: string) => {
	visible.value = true;
	form.prodId = '';

	// 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

	// 获取product信息
	if (id) {
		form.prodId = id;
		getproductData(id);
	}
};

const handleChange = (value: object) => {
	console.log(value);
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
		loading.value = true;
		form.titbParentId = form.titbParentId[0];
		form.prodId ? await putObj(form) : await addObj(form);
		useMessage().success(form.prodId ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
		loading.value = false;
	}
};

// 初始化表单数据
const getproductData = (id: string) => {
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
