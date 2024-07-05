<template>
    <div class="fd-nav-content">
        <div class="app-container">
            <div class="box">
                <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto"
                    style="max-width: 600px;margin: auto;">
                    <el-form-item label="选择分组" prop="flowGroup">
                        <el-select v-model="form.flowGroup" placeholder="请选择选择分组" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in flowOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="流程编号" prop="formCode">
                        <el-input v-model="form.formCode" placeholder="请输入流程编号" :style="{ width: '100%' }" />
                    </el-form-item>

                    <el-form-item label="审批名称" prop="bpmnName">
                        <el-input v-model="form.bpmnName" placeholder="请输入审批名称" :style="{ width: '100%' }" />
                    </el-form-item>

                    <el-form-item label="审批人去重" prop="deduplicationType">
                        <el-select v-model="form.deduplicationType" placeholder="请选择去重类型" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in autoRepeatOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否活跃" prop="effectiveStatus">
                        <el-switch v-model="form.effectiveStatus" />
                    </el-form-item>
                    <el-form-item label="审批说明" prop="remark">
                        <el-input v-model="form.remark" type="textarea" placeholder="请输入审批说明" :maxlength="100"
                            show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button type="primary" @click="nextSubmit(ruleFormRef)">下一步》》》</el-button>

                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { NodeUtils } from '@/utils/nodeUtils'
const { proxy } = getCurrentInstance()
const emit = defineEmits(['nextChange'])
let props = defineProps({
    basicData: {
        type: Object,
        default: () => (null),
    }
});

const generatorID = "PROJECT_" + NodeUtils.idGenerator();
const ruleFormRef = ref(null);
let autoRepeatOptions = [{
    "label": "不启用自动去重",
    "value": 1
}, {
    "label": "启用自动去重",
    "value": 2
}];
let flowOptions = [{
    "label": "总公司流程",
    "value": 1
}, {
    "label": "分公司流程",
    "value": 2
}];


const form = reactive({
    bpmnName: '合同审批',
    bpmnCode: generatorID,
    bpmnType: null,
    flowGroup: 1,
    formCode: generatorID,
    remark: '',
    effectiveStatus: true,
    deduplicationType: 2
})

onMounted(async () => { 
    if (props.basicData) {
        form.bpmnName = props.basicData.bpmnName;
        form.bpmnCode = generatorID;
        form.bpmnType = props.basicData.bpmnType;
        form.formCode = generatorID;
        form.remark = props.basicData.remark;
        form.effectiveStatus = props.basicData.effectiveStatus;
        form.deduplicationType = props.basicData.deduplicationType;
    } 
});

let rules = {
    formCode: [{
        required: true,
        message: '请输入流程编号',
        trigger: 'blur'
    }],
    bpmnName: [{
        required: true,
        message: '请输入审批名称',
        trigger: 'blur'
    }],
    flowGroup: [{
        required: true,
        message: '请选择选择分组',
        trigger: 'change'
    }],
};
const nextSubmit = (ruleFormRef) => {
    if (!ruleFormRef) return
    ruleFormRef.validate((valid, fields) => {
        if (valid) {
            emit('nextChange', { label: "流程设计", key: "processDesign" })
        }
    })
}
// 给父级页面提供得获取本页数据得方法
const getData = () => {
    return new Promise((resolve, reject) => {
        proxy.$refs['ruleFormRef'].validate((valid, fields) => {
            if (!valid) {
                emit('nextChange', { label: "基础设置", key: "basicSetting" })
                return;
            } 
            form.effectiveStatus = form.effectiveStatus?1:0;
            resolve({ formData: form })  // TODO 提交表单
        })
    })
};
defineExpose({
    getData
})
</script>
<style scoped>
.app-container {
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 30px;
    background: #fff;
    margin: 5px 10px 5px 5px;
}

.app-container .box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 3px solid #46A6FE;
    padding: 20px;
    margin-bottom: 20px;
    width: 100%;
    min-height: 500px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.form-container {
    width: 100%;
    height: 100%;
    background: white !important;
    padding: 5px 10px 5px 5px;
    text-align: center;
}
</style>