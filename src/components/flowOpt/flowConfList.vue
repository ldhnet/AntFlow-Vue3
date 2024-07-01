<template>
    <div class="fd-nav">
        <div class="fd-nav-left">
            <div class="fd-nav-back" @click="toReturn">
                <i class="anticon anticon-left"></i>
            </div>
            <div class="fd-nav-title">流程配置列表</div>
        </div>
    </div>

    <div class="app-container">
        <div class="box">
            <el-table :data="conflist" stripe style="width: 100%"> 
                <el-table-column prop="bpmnCode" label="流程编号" width="150" />
                <el-table-column prop="bpmnName" label="流程类型" width="150" />
                <el-table-column prop="formCode" label="formCode" width="200" />
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
                        <el-button #default="item" size="small" @click="previewById(item.row)" class="btn-close"
                            type="primary">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件-->
            <el-pagination class="pagiantion" @current-change="handleCurrentChange"
                :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                layout="total, prev, pager, next" :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getBpmnConflistPage } from '@/api/jdCloudApi';

const router = useRouter();
let conflist = ref([]);

let pagination = reactive({//分页相关模型数据
    currentPage: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    total: 0//总记录数 
});


onMounted(async () => {
    await getAll(); 
});

//分页查询
const getAll =async () => {
    //发送异步请求
    await getBpmnConflistPage().then((res) => {
        if (res.code == 200) {
            conflist.value = res.data.data;
            pagination.currentPage = res.data.pagination.startIndex;
            pagination.pageSize = res.data.pagination.pageSize;
            pagination.total = res.data.pagination.totalCount;
        }
    });
};

//切换页码
const handleCurrentChange = (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.currentPage = currentPage;
    //执行查询
    getAll();
};


const previewById = (data) => {
    console.log('data=======previewById==============',data);
    router.push({ path: "/",query:{id:data.id}});
};

const toReturn = () => {
    router.push({ path: "/todo" });
};


</script>
<style scoped>
.app-container {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
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
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    min-height: 550px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.app-container .box .pagiantion {
    text-align: right;
    padding: 15px;
}

.main-container {
    margin-top: 70px;
}
</style>