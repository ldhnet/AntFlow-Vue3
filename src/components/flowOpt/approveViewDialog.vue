<template>
    <div  v-if="activityList">
        <el-dialog title="流程进度" v-model="visibleDialog" :width="480" append-to-body>
            <div>
                <div style="margin-bottom: 25px;display: flex; justify-content: center;align-items: Center;">
                    <p style="margin-left: 10px;"><span class="dotPrimary"></span> 通过</p>
                    <p style="margin-left: 10px;"><span class="dotDanger"></span> 拒绝</p>
                    <p style="margin-left: 10px;"><span class="dotSuccess"></span> 当前节点</p>
                    <p style="margin-left: 10px;"><span class="dotInfo"></span> 未处理</p>
                    <p style="margin-left: 10px;"><span class="dotInfo"></span> 结束</p>
                </div>
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activityList" :key="index" :type="activity.type"
                        :size="activity.size">
                        <el-collapse>
                            <el-collapse-item :title="activity.taskName">
                                <el-card>
                                    <p v-if="activity.verifyUserName">审批人: {{ activity.verifyUserName }}</p>
                                    <p v-if="activity.verifyStatusName">审批结果: {{ activity.verifyStatusName }}</p>
                                    <p v-if="activity.verifyDesc">审批备注: {{ activity.verifyDesc }}</p>
                                    <p v-if="activity.verifyDate">操作时间: {{ activity.verifyDate }}</p>
                                </el-card>
                            </el-collapse-item>
                        </el-collapse>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <template #footer>
                <el-button @click="closeDialog">取 消</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { statusColor } from '@/utils/const';
import { showLoading, closeLoading } from '@/utils/loading';
import { getBpmVerifyInfoVos } from '@/api/jdCloudApi';
let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    processNumber: {
        type: String,
        default: ""
    }
});
let emits = defineEmits(['update:visible', 'change']);

let visibleDialog = computed({
    get() {
        return props.visible
    },
    set(val) {
        closeDialog()
    }
});
let activityList = ref(null);

onMounted(async () => {
    showLoading();
    await getPreviewData();
    closeLoading(); 
})
const getPreviewData = async () => {
    let param = {
        "processNumber": props.processNumber,
    }
    let resData = await getBpmVerifyInfoVos(param);
    if (resData.code == 200) {
        activityList.value = resData.data.map(c => {
            return {
                ...c,
                type: statusColor[c.verifyStatus],
                size: c.verifyStatus == 99 ? 'large' : 'normal',
                remark: c.verifyStatus == 0 ? '流程结束' : c.verifyDesc
            }
        })
    };
};
const closeDialog = () => {
    emits('update:visible', false)
}
</script>
<style scoped>
.el-timeline-item {
    padding-bottom: 0px !important;
}

.dotPrimary {
    height: 15px;
    width: 15px;
    background-color: #46A6FE;
    border-radius: 50%;
    display: inline-block;
}

.dotDanger {
    height: 15px;
    width: 15px;
    background-color: #f56c6c;
    border-radius: 50%;
    display: inline-block;
}

.dotSuccess {
    height: 15px;
    width: 15px;
    background-color: #67c23a;
    border-radius: 50%;
    display: inline-block;
}

.dotInfo {
    height: 15px;
    width: 15px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
</style>