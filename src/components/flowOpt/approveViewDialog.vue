<template>
    <div>
        <el-dialog title="流程预览" v-model="visibleDialog" :width="600" append-to-body>
            <div>
                <div style="margin-bottom: 25px;display: flex; justify-content: center;align-items: Center;">
                    <p style="margin-left: 10px;"><span class="dotPrimary"></span> 通过</p>
                    <p style="margin-left: 10px;"><span class="dotDanger"></span> 拒绝</p>
                    <p style="margin-left: 10px;"><span class="dotSuccess"></span> 当前节点</p>
                    <p style="margin-left: 10px;"><span class="dotInfo"></span> 未处理</p>
                    <p style="margin-left: 10px;"><span class="dotInfo"></span> 结束</p>
                </div>
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in data" :key="index" :type="activity.type"
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
            </div>
            <template #footer>
                <el-button @click="closeDialog">取 消</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { computed } from 'vue'
let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        default: () => []
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
    background-color: #fe4646;
    border-radius: 50%;
    display: inline-block;
}

.dotSuccess {
    height: 15px;
    width: 15px;
    background-color: #0b8235;
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