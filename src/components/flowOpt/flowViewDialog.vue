<template>
    <div>
        <el-dialog title="流程预览" v-model="visibleDialog" :width="600" append-to-body>
            <div style="text-align:center;">
                <div class="box-scale">
                    <flowReviewWarp v-if="nodeConfig" v-model:nodeConfig="nodeConfig" />
                    <div class="end-node">
                        <div class="end-node-circle"></div>
                        <div class="end-node-text">流程结束</div>
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button @click="closeDialog">取 消</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import flowReviewWarp from "@/components/flowOpt/flowReviewWarp.vue";
import { getFlowPreview } from '@/api/jdCloudApi';
import { FormatUtils } from '@/utils/formatFlowPreview'

let props = defineProps({
    visible: {
        type: Boolean,
        default: false
    } 
});
let nodeConfig = ref(null);
let emits = defineEmits(['update:visible', 'change']);

let visibleDialog = computed({
    get() {
        return props.visible
    },
    set(val) {
        closeDialog()
    }
});
onMounted(async () => {
    await getFlowPreviewList();
});

const getFlowPreviewList = async (data) => {
    let param = {
        "formCode": 'DSFZH_WMA',
        "accountType": 1
    }
    let resData = await getFlowPreview(param);
    let formatData = FormatUtils.formatSettings(resData.data);
    nodeConfig.value = formatData;
}
const closeDialog = () => {
    emits('update:visible', false)
}
</script>
<style scoped>
.end-node-circle {
    width: 10px;
    height: 10px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc
}
</style>