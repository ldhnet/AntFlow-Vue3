<template>
        <el-form ref="queryFormRef" label-position="top">
            <el-form-item label="审批人ID（测试）" prop="userId">
                <el-input v-model="queryForm.userId" placeholder="请输入审批人ID" style="width: 150px;margin-right: 10px;" />
                <el-button type="primary" @click="querySubmit()">查询</el-button>
            </el-form-item>
        </el-form>
    <div class="main-container">
        <el-table :data="penddinglist" stripe style="width: 100%">
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
                    <el-button #default="item" @click="approveById(item.row)" size="small"  type="primary">审批</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination class="pagiantion" @current-change="handleCurrentChange" :current-page="pagination.page"
            :page-size="pagination.pageSize" layout="total, prev, pager, next" :total="pagination.totalCount">
        </el-pagination>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getPenddinglistPage } from '@/api/jdCloudApi';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();

let pagination = reactive({//分页相关模型数据
    page: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    totalCount: 0//总记录数 
});
let penddinglist = ref([]);
let uaserid = ref('0');
let queryForm = ref({
    userId: 11
});

onMounted(async () => {
    await getTodoList();
});

const getTodoList = async () => {
    uaserid.value = queryForm.value.userId;
    let resData = await getPenddinglistPage(uaserid.value, pagination);
    if (resData.code == 200) {
        penddinglist.value = resData.data;
        pagination.page = resData.pagination.page;
        pagination.pageSize = resData.pagination.pageSize;
        pagination.totalCount = resData.pagination.totalCount;
    }else{
        ElMessage.error("数据加载失败" + resData.errMsg);
    }
};
const querySubmit = async () => {
    await getTodoList();
};
//切换页码
const handleCurrentChange =async (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.page = currentPage;
    //执行查询
    await getTodoList();
};
const approveById = (data) => {
    Object.assign(data, { "userId": uaserid.value });
    router.push({ path: "/approve", query: data });
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
</style>