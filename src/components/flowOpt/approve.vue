<template>
    <div class="fd-nav">
        <div class="fd-nav-left">
            <div class="fd-nav-back" @click="toReturn">
                <i class="anticon anticon-left"></i>
            </div>
            <div class="fd-nav-title">审批</div>
        </div>
    </div>
    <div class="main-container">
        <div class="box">
            <div style="min-width: 600px;float: left;margin-right: 30px;">
                <el-form label-width="auto" :disabled="true" style="max-width: 600px;">

                    <el-form-item label="业务表单字段1" prop="name">
                        <el-input v-model="form.name" placeholder="请输入流程编号" :style="{ width: '100%' }" />
                    </el-form-item>

                    <el-form-item label="业务表单字段2" prop="name">
                        <el-input v-model="form.name" placeholder="请输入审批名称" :style="{ width: '100%' }" />
                    </el-form-item>


                    <el-form-item label="业务表单字段3" prop="remark">
                        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" :maxlength="100"
                            show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="min-width: 350px;margin-right: 30px;float: left;" v-if="activities">
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type"
                        :size="activity.size">
                        <el-collapse>
                            <el-collapse-item :title="activity.taskName">
                                <el-card>
                                    <p>审批结果: {{ activity.remark }}</p>
                                    <p v-if="activity.verifyStatus == 2">审批备注: {{ activity.verifyStatusName }}</p>
                                    <p v-if="activity.verifyStatus == 1 || activity.verifyStatus == 2">操作时间: {{
                                        activity.verifyDate }}</p>
                                </el-card>
                            </el-collapse-item>
                        </el-collapse>
                    </el-timeline-item>
                </el-timeline>
                <el-form ref="approveFormRef" :model="approveForm" :rules="rules" label-position="top">
                    <el-form-item label="审批备注" prop="remark">
                        <el-input v-model="approveForm.remark" type="textarea" placeholder="请输入审批备注" :maxlength="100"
                            show-word-limit :autosize="{ minRows: 3, maxRows: 3 }"
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right;">
                        <el-button type="primary" @click="approveSubmit(approveFormRef, 3)">同意</el-button>
                        <el-button type="danger" @click="approveSubmit(approveFormRef, 4)">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { getBpmVerifyInfoVos, processOperation } from '@/api/jdCloudApi';
import { useRoute, useRouter } from 'vue-router';
import { statusColor } from '@/utils/const'
import { showLoading, closeLoading } from '@/utils/loading'
const route = useRoute();
const router = useRouter();

const form = reactive({
    name: '测试',
    remark: '测试'
});

let approveForm = ref({
    remark: ''
});


const approveFormRef = ref(null);

let activities = ref(null);

onMounted(async () => {
    await getPreviewData();
});

const getPreviewData = async () => {
    showLoading();
    let param = {
        "processNumber": "DSFZH_WMA_9",
    }
    if (route?.query?.processNumber) {
        param.processNumber = route?.query?.processNumber;
    }

    let resData = await getBpmVerifyInfoVos(param);
    if (resData.code == 200) {
        activities.value = resData.data.map(c => {
            return {
                ...c,
                type: statusColor[c.verifyStatus],
                size: c.verifyStatus == 99 ? 'large' : 'normal',
                remark: c.verifyStatus == 0 ? '流程结束' : c.verifyStatusName
            }
        });
    }
    closeLoading();
};

let rules = {
    remark: [{
        required: true,
        message: '请输入审批备注',
        trigger: 'blur'
    }]
};
const approveSubmit = (param, type) => {
    if (!param) return;
    param.validate(async (valid, fields) => {
        if (valid) {
            let uaserid = route?.query?.userId;
            let data = {
                "taskId": route?.query?.taskId,
                "processKey": route?.query?.processKey,
                "processNumber": route?.query?.processNumber,
                "formCode": route?.query?.processCode ?? '',
                "approvalComment": approveForm.value.remark ?? '',
                "operationType": type
            };

            let resData = await processOperation(uaserid, data);

            if (resData.code == 200) {
                ElMessage.success("审批成功");
            } else {
                ElMessage.error("审批失败:" + resData.errMsg);
            }
        }
    })
}
const toReturn = () => {
    router.push({ path: "/todo" });
};


</script>
<style scoped>
.el-timeline-item {
    padding-bottom: 0px !important;
}

.change {
    padding: 3px 8px;
    background: #339933;
    color: #fff;
    border-radius: 5px;
}
</style>