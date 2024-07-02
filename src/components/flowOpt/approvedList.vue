<template>
    <el-form ref="queryFormRef" label-position="top">
        <el-form-item label="审批人ID（测试）" prop="userId">
            <el-input v-model="queryForm.userId" placeholder="请输入审批人ID" style="width: 150px;margin-right: 10px;" />
            <el-button type="primary" @click="querySubmit()">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="main-container">
        <el-table :data="papprovelist" stripe style="width: 100%">
            <el-table-column prop="createTime" label="申请日期" width="120">
                <template #default="item">
                    {{ parseTime(item.row.createTime, '{y}-{m}-{d}') }}
                </template>
            </el-table-column>
            <el-table-column prop="processKey" label="processKey" width="150" />
            <el-table-column prop="processCode" label="processCode" width="150" />
            <el-table-column prop="processNumber" label="processNumber" width="150" />
            <el-table-column prop="processTypeName" label="流程类型" width="150" />
            <el-table-column prop="processDigest" label="流程名称" width="150" />
            <el-table-column prop="taskState" label="流程状态" width="120">
                <template #default="item">
                    <el-check-tag :checked="true" type="primary">
                        {{ item.row.taskState }}
                    </el-check-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150">
                <template #default="item">
                    <el-button #default="item" @click="previewById(item.row)" size="small" type="primary">预览</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination class="pagiantion" @current-change="handleCurrentChange" :current-page="pagination.page"
            :page-size="pagination.pageSize" layout="total, prev, pager, next" :total="pagination.totalCount">
        </el-pagination>
    </div>

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
        </div>
        <template #footer>
            <el-button @click="closeDialog">取 消</el-button>
        </template>
    </el-dialog>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { getApprovedlistPage, getBpmVerifyInfoVos } from '@/api/jdCloudApi';
import { statusColor } from '@/utils/const'
let pagination = reactive({//分页相关模型数据
    page: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    totalCount: 0//总记录数 
});
let activities = ref(null);
let papprovelist = ref([]);
let uaserid = ref('0');
let queryForm = ref({
    userId: 10
});
let visibleDialog = ref(false);

onMounted(async () => {
    await getApprovedList();
});

const getApprovedList = async () => {
    uaserid.value = queryForm.value.userId;
    let resData = await getApprovedlistPage(uaserid.value, pagination);
    if (resData.code == 200) {
        papprovelist.value = resData.data;
        pagination.page = resData.pagination.page;
        pagination.pageSize = resData.pagination.pageSize;
        pagination.totalCount = resData.pagination.totalCount;
    } else {
        ElMessage.error("数据加载失败" + resData.errMsg);
    }
};
const getPreviewData = async (processNumber) => {
    let param = {
        "processNumber": processNumber,
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
};
const querySubmit = async () => {
    await getApprovedList();
};
//切换页码
const handleCurrentChange = async (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.page = currentPage;
    //执行查询
    await getApprovedList();
};
const previewById = async (data) => {
    visibleDialog.value = true;
    await getPreviewData(data.processNumber);
};
const closeDialog = () => {
    visibleDialog.value = false;
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
    border-top: 3px solid #46A6FE;
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