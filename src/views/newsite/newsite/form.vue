<template>
    <el-dialog :title="form.id ? '编辑' : '新增'" v-model="visible"
      :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" formDialogRef label-width="90px" v-loading="loading">
       <el-row :gutter="24">
    <el-col :span="12" class="mb20">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="昵称" prop="nicename">
        <el-input v-model="form.nicename" placeholder="请输入昵称"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="创建人" prop="createBy">
        <el-input v-model="form.createBy" placeholder="请输入创建人"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="创建时间" prop="createTime">
      <el-date-picker type="date" placeholder="请选择创建时间" v-model="form.createTime" :value-format="dateStr"></el-date-picker>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="更新人" prop="updateBy">
        <el-input v-model="form.updateBy" placeholder="请输入更新人"/>
      </el-form-item>
      </el-col>

    <el-col :span="12" class="mb20">
      <el-form-item label="修改时间" prop="updateTime">
      <el-date-picker type="date" placeholder="请选择修改时间" v-model="form.updateTime" :value-format="dateStr"></el-date-picker>
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

<script setup lang="ts" name="newsiteDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/newsite/newsite'
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
		id:'',
	  username: '',
	  nicename: '',
	  createBy: '',
	  createTime: '',
	  updateBy: '',
	  updateTime: '',
});

// 定义校验规则
const dataRules = ref({
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        nicename: [{required: true, message: '昵称不能为空', trigger: 'blur'}],
        createBy: [{required: true, message: '创建人不能为空', trigger: 'blur'}],
        createTime: [{required: true, message: '创建时间不能为空', trigger: 'blur'}],
        updateBy: [{required: true, message: '更新人不能为空', trigger: 'blur'}],
        updateTime: [{required: true, message: '修改时间不能为空', trigger: 'blur'}],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取newsite信息
  if (id) {
    form.id = id
    getnewsiteData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
    loading.value = true;
		form.id ? await putObj(form) : await addObj(form);
		useMessage().success(form.id ? '修改成功' : '添加成功');
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
    loading.value = false;
  }
};


// 初始化表单数据
const getnewsiteData = (id: string) => {
  // 获取数据
  loading.value = true
  getObj(id).then((res: any) => {
    Object.assign(form, res.data)
  }).finally(() => {
    loading.value = false
  })
};

// 暴露变量
defineExpose({
  openDialog
});
</script>