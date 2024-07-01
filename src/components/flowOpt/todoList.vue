<template>
    <div class="fd-nav">
        <div class="fd-nav-left">
            <div class="fd-nav-back" @click="toReturn">
                <i class="anticon anticon-left"></i>
            </div>
            <div class="fd-nav-title">代办列表</div>
        </div>
    </div>

    <div class="app-container">
        <el-form ref="queryFormRef"  label-position="top"> 
                    <el-form-item label="审批人ID（测试）" prop="userId">
                        <el-input v-model="queryForm.userId" placeholder="请输入审批人ID" style="width: 150px;margin-right: 10px;" />
                        <el-button type="primary" @click="querySubmit()">查询代办</el-button> 
                    </el-form-item> 
        </el-form>
        <div class="box">
            <el-tabs type="border-card">
                <el-tab-pane style="max-width: 1080px">
                    <template #label>
                        待审批 <el-tag type="danger" effect="dark" round>{{ pagination.total }}</el-tag>
                    </template>
                    <el-table :data="penddinglist" stripe style="width: 100%">
                   
                        <el-table-column prop="createTime" label="申请日期" width="150" >
                            <template #default="item">
                                {{parseTime(item.row.createTime,'{y}-{m}-{d}')}}
                            </template>
                        </el-table-column>
                        
                        <el-table-column prop="processCode" label="流程编号" width="150" />
                        <el-table-column prop="processTypeName" label="流程类型" width="150" />
                        <el-table-column prop="processDigest" label="流程名称" width="150" />
                    
                        <el-table-column prop="taskState" label="流程状态" width="150">
                            <template #default="item">
                                <el-check-tag :checked="true" type="primary" @change="previewById(item.row)">
                                    {{ item.row.taskState }}
                                </el-check-tag>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="200">
                            <template #default="item">
                                <el-button #default="item" @click="approveById(item.row)" size="small"
                                    class="btn-close" type="primary">审批</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页组件-->
                    <el-pagination class="pagiantion" @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                        layout="total, prev, pager, next" :total="pagination.total">
                    </el-pagination>
                </el-tab-pane>

                <el-tab-pane style="max-width: 700px">
                    <template #label>
                        已审批 <el-tag type="success" round>12</el-tag>
                    </template>
                    <el-table :data="approvedlist" stripe style="width: 100%">
                        <el-table-column prop="info" label="待办事项" width="200">
                            <template #default="item">{{ item.row.info }}</template>
                        </el-table-column>
                        <el-table-column prop="date" label="日期" width="150" />
                        <el-table-column prop="id" label="进度" width="150">

                            <el-popover placement="right" width="200" trigger="click">
                                <template #reference>
                                    <el-check-tag :checked="true" type="primary">
                                        王五审批
                                    </el-check-tag>
                                </template>
                                <el-table :data="approvedlist" style="width: 100%">
                                    <el-table-column prop="date" label="Date" width="180" />
                                    <el-table-column prop="info" label="info" width="180" />
                                </el-table>
                            </el-popover>
                        </el-table-column>
                        <el-table-column label="状态" width="200">
                            <el-button #default="item" size="small" type="info">已结束</el-button>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="已完成">

                    <el-timeline style="max-width: 600px">
                        <el-timeline-item timestamp="发起人2018/4/12" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">

                        </el-timeline-item>
                    </el-timeline>
                </el-tab-pane>

                <el-tab-pane label="已归档">
                    <el-timeline style="max-width: 300px">
                        <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type"
                            :size="activity.size" :timestamp="activity.timestamp">
                            {{ activity.content }}
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>

                    </el-timeline>
                </el-tab-pane>
                <el-tab-pane label="发起审批">
                    <el-table :data="approvedlist" stripe style="width: 100%">
                        <el-table-column prop="info" label="待办事项" width="200">
                            <template #default="item">{{ item.row.info }}</template>
                        </el-table-column>
                        <el-table-column prop="date" label="日期" width="150" /> 
                        <el-table-column label="状态" width="200">
                            <el-button #default="item" size="small" type="primary">发起审批</el-button>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="更多">
                    <el-button type="primary" @click="jumpFlowConf()">流程配置列表</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute,useRouter } from 'vue-router';
import { getProcesslistPage } from '@/api/jdCloudApi';
import { tansParams } from "@/utils/hsharpUtils";
const route = useRoute();
const router = useRouter();
let penddinglist = ref([]);

let approvedlist = ref([
    {
        id: 1,
        date: '2024-06-22',
        info: '6666'
    },
    {
        id: 2,
        date: '2024-06-22',
        info: '7777'
    }
]);
const activities = [
    {
        content: '发起人',
        type: 'primary',
        timestamp: '2024-06-26',
        size: 'large',
    },
    {
        content: '张三审批',
        type: 'primary',
        timestamp: '2024-06-26',
        size: 'large',
    },
    {
        content: '李四审批',
        timestamp: '2024-06-26',
        size: 'large',
    }, {
        content: '流程结束',
        timestamp: '2024-06-26',
    }
];
let pagination = reactive({//分页相关模型数据
    currentPage: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    total: 0//总记录数 
});
    
let queryForm = ref({ 
    userId:11
});

onMounted(async () => {  
    await getTodoList();
});

const getTodoList =async (data) => {
    let uaserid = queryForm.value.userId;
    let resData = await getProcesslistPage(uaserid);
    if (resData.code == 200) { 
            penddinglist.value = resData.data;
            pagination.currentPage =  resData.pagination.startIndex;
            pagination.pageSize =  resData.pagination.pageSize;
            pagination.total =  resData.pagination.totalCount;
      }
};

const querySubmit =async (data) => {
    await getTodoList();
};

const previewById = (data) => {
    console.log('data==data===========', JSON.stringify(data));
    console.log('data==tansParams===========', tansParams(data));
    
    // 
};
const approveById = (data) => {
    console.log('data==data===========', JSON.stringify(data));
    console.log('data==tansParams===========', tansParams(data));

    router.push({ path: "/approve",query:data });
};
const handleCurrentChange = () => {

};
const toReturn = () => {
    router.push({ path: "/" });
};
const jumpFlowConf = () => {
    router.push({ path: "/flowconf" });
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