<template>
    <div class="main-container">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="createFrom" style="max-width: 1280px">
                <template #label>
                    账号申请
                </template>
                <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto"
                    style="max-width: 600px;margin: auto;">
                    <el-form-item label="审批流配置" prop="formCode">
                        <el-select v-model="form.formCode" placeholder="请选审批流配置" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in formCodeOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请账户类型" prop="accountType">
                        <el-select v-model="form.accountType" placeholder="请选择账户类型" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in accountTypeOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请人" prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入审批名称" :style="{ width: '100%' }" />
                    </el-form-item>
                    <el-form-item label="申请人ID" prop="userId">
                        <el-input v-model="form.userId" placeholder="请输入申请人ID" :style="{ width: '100%' }" />
                    </el-form-item>
                    <el-form-item label="审批说明" prop="remark">
                        <el-input v-model="form.remark" type="textarea" placeholder="请输入审批说明" :maxlength="100"
                            show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button type="primary" @click="saveSubmit(ruleFormRef)">提交</el-button>

                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane name="flowFromReview" label="流程预览">
                <div style="text-align:center;">
                    <div class="box-scale">
                        <flowReviewWarp v-if="nodeConfig" v-model:nodeConfig="nodeConfig" />
                        <div class="end-node">
                            <div class="end-node-circle"></div>
                            <div class="end-node-text">流程结束</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus';
import flowReviewWarp from "@/components/flowOpt/flowReviewWarp.vue";
import { getFlowPreview,processOperation } from '@/api/jdCloudApi';
import { FormatUtils } from '@/utils/formatFlowPreview'
import { showLoading, closeLoading } from '@/utils/loading'
const { proxy } = getCurrentInstance()
const ruleFormRef = ref(null);
const activeName = ref("createFrom");
let nodeConfig = ref(null);
let accountTypeOptions = [{
    "label": "腾讯云",
    "value": 1
}, {
    "label": "百度云",
    "value": 2
}, {
    "label": "阿里云",
    "value": 3
}];
let formCodeOptions = [{
    "label": "第三方账号申请",
    "value": "DSFZH_WMA"
}, {
    "label": "合同审批",
    "value": "DSFZH_WMA_1"
}];
const form = reactive({
    userName: '测试人员',
    userId:1,
    formCode: "",
    accountType: 1,
    remark: ''
})

let rules = {
    formCode: [{
        required: true,
        message: '请选择审批流配置',
        trigger: 'blur'
    }],
    userName: [{
        required: true,
        message: '请输入申请人名称',
        trigger: 'blur'
    }],
    accountType: [{
        required: true,
        message: '请选择账户类型',
        trigger: 'change'
    }],
};

onMounted(async () => {

});

const handleClick = (tab, event) => {
    if (tab.props.name != 'flowFromReview') {
        return;
    }
    proxy.$refs['ruleFormRef'].validate((valid) => { 
        if (!valid) {
            activeName.value = "createFrom";
            ElMessage.error('请先填写表单');
        } else {
            showLoading();
            getFlowPreviewList();
            closeLoading();
        }
    })
}
const getFlowPreviewList = async () => {
    let param = {
        "formCode": form.formCode,
        "accountType": form.accountType
    }
    console.log('param====================',JSON.stringify(param));
    let resData = await getFlowPreview(param);
    let formatData = FormatUtils.formatSettings(resData.data);
    nodeConfig.value = formatData;
}

const saveSubmit = (ruleFormRef) => {
    if (!ruleFormRef) return
    ruleFormRef.validate((valid, fields) => {
        if (valid) {
            startTest();  //emit('nextChange', { label: "流程设计", key: "processDesign" })
        }
    })
}
 
const startTest = async () => { 
    let param = {
        "processKey": form.formCode ?? '',
        "processNumber": form.formCode ?? '',
        "formCode": form.formCode ?? '',
        "operationType": form.accountType,
        "remark": form.formCode + '发起测试流程accountType' + form.accountType
    }; 
    console.log('data=======startTest===param==========', JSON.stringify(param));
    showLoading();
    await processOperation(form.userId, param).then((res) => {
        if (res.code == 200) {
            ElMessage.success("发起测试流程成功");
        } else {
            ElMessage.error("发起测试流程失败" + res.errMsg);
        }
    });
    closeLoading();
};

</script>
<style scoped>
.main-container {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    min-height: 550px;
    min-width: 980px;
    border-top: 3px solid #46A6FE;
}

.end-node-circle {
    width: 10px;
    height: 10px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc
}
</style>