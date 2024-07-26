<template>
    <div class="main-container">
        <div class="filter-container">
            <el-form ref="queryFormRef">
                <el-form-item prop="userId">
                    <el-input v-model="queryForm.userId" placeholder="请输入审批人ID" style="width: 200px;" />
                    <el-input v-model="queryForm.flowName" placeholder="请输入流程名称" style="width: 200px;" />
                    <el-button type="primary" @click="querySubmit()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="box">
            <el-table :data="penddinglist" border stripe style="width: 100%">
                <el-table-column prop="createTime" label="申请日期" width="120">
                    <template #default="item">
                        {{ parseTime(item.row.createTime, '{y}-{m}-{d}') }}
                    </template>
                </el-table-column>
                <el-table-column prop="processKey" label="processKey" width="200" />
                <el-table-column prop="processCode" label="processCode" width="200" />
                <el-table-column prop="processNumber" label="processNumber" width="200" />
                <el-table-column prop="processTypeName" label="流程类型" width="130" />
                <el-table-column prop="processDigest" label="流程名称" width="130" />

                <el-table-column prop="taskState" label="流程状态" width="120">
                    <template #default="item">
                        <el-tag>
                            {{ item.row.taskState }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template #default="item">
                        <el-button #default="item" @click="approveById(item.row)" size="small"
                            type="primary">审批</el-button>
                        <el-button #default="item" @click="previewById(item.row)" size="small"
                            type="success">查看进度</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件-->
            <el-pagination class="pagiantion" @current-change="handleCurrentChange" :current-page="pagination.page"
                :page-size="pagination.pageSize" layout="total, prev, pager, next" :total="pagination.totalCount">
            </el-pagination>
        </div>
        
    </div>
    <approveViewDialog v-if="visibleDialog" v-model:visible="visibleDialog" :processNumber="processNumber"
        @change="closeApproveViewDialog" />
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { getPenddinglistPage, getBpmVerifyInfoVos } from '@/api/jdCloudApi';
import approveViewDialog from '@/components/flowOpt/approveViewDialog.vue'
import { showLoading, closeLoading } from '@/utils/loading'
const router = useRouter();
const route = useRoute();
let uid = route.query.userId ?? 1;
let pagination = reactive({//分页相关模型数据
    page: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    totalCount: 0//总记录数 
});
let penddinglist = ref([]);
let uaserid = ref('0');
let queryForm = ref({
    userId: uid,
    flowName: ''
});
let visibleDialog = ref(false);
let processNumber = ref('');
onMounted(async () => {
    showLoading();
    await getTodoList();
    closeLoading();
});

const getTodoList = async () => {
    uaserid.value = queryForm.value.userId;
    let resData = await getPenddinglistPage(uaserid.value, pagination);
    if (resData.code == 200) {
        penddinglist.value = resData.data;
        pagination.page = resData.pagination.page;
        pagination.pageSize = resData.pagination.pageSize;
        pagination.totalCount = resData.pagination.totalCount;
    } else {
        ElMessage.error("数据加载失败" + resData.errMsg);
    }
};
const querySubmit = async () => {
    await getTodoList();
};
//切换页码
const handleCurrentChange = async (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.page = currentPage;
    //执行查询
    await getTodoList();
};
const approveById = (data) => {
    Object.assign(data, { "userId": uaserid.value });
    router.push({ path: "/approve", query: data });
};

const previewById = async (data) => {
    showLoading();
    processNumber.value = data.processNumber;
    visibleDialog.value = true;
    closeLoading();

};
const closeApproveViewDialog = () => {
    visibleDialog.value = false;
};

</script>
<style scoped> 
</style>