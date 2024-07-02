<template>
    <div class="main-container">
        <el-table :data="conflist" stripe style="width: 100%">
            <el-table-column prop="bpmnCode" label="流程编号" width="150" />
            <el-table-column prop="bpmnName" label="流程类型" width="150" />
            <el-table-column prop="formCode" label="formCode" width="220" />
            <el-table-column prop="deduplicationType" label="是否去重" width="150">
                <template #default="item">
                    {{ item.row.deduplicationType == 1 ? '否' : '是' }}
                </template>
            </el-table-column>
            <el-table-column prop="effectiveStatus" label="状态" width="150">
                <template #default="item">
                    {{ item.row.effectiveStatus == 1 ? '活跃' : '不活跃' }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template #default="item">
                    <el-button size="small" @click="startTest(item.row)" type="success">发起测试</el-button>
                    <el-button size="small" @click="previewById(item.row)" type="primary">预览</el-button>
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
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { getBpmnConflistPage, processOperation } from '@/api/jdCloudApi';

const router = useRouter();
let conflist = ref([]);

let pagination = reactive({//分页相关模型数据
    page: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    totalCount: 0//总记录数 
});


onMounted(async () => {
    await getAll();
});

//分页查询
const getAll = async () => {
    //发送异步请求
    await getBpmnConflistPage(pagination).then((res) => { 
        if (res.code == 200) {
            conflist.value = res.data.data;
            pagination.page = res.data.pagination.page;
            pagination.pageSize = res.data.pagination.pageSize;
            pagination.totalCount = res.data.pagination.totalCount;
        }
    });
};

//切换页码
const handleCurrentChange = (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.page = currentPage;
    //执行查询
    getAll();
};

const startTest = async (data) => {

    let param = {
        "processKey": data.formCode ?? '',
        "processNumber": data.formCode ?? '',
        "formCode": data.formCode ?? '',
        "operationType": 1,
        "remark": '发起测试流程'
    }; 
    await processOperation(10, param).then((res) => {
        if (res.code == 200) {
            ElMessage.success("发起测试流程成功");
        } else {
            ElMessage.error("发起测试流程失败" + res.errMsg);
        }
    });
};
const previewById = (data) => {
    console.log('data=======previewById==============', data);
    router.push({ path: "/", query: { id: data.id } });
};



const toReturn = () => {
    router.push({ path: "/todo" });
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
}
</style>