<template>
    <div class="fd-nav">
        <div class="fd-nav-left">
            <div class="fd-nav-back" @click="toReturn">
                <i class="anticon anticon-left"></i>
            </div>
            <div class="fd-nav-title">代办列表</div>
        </div>
    </div>
 
        <div class="fd-nav-content">
            <el-tabs type="border-card">
                <el-tab-pane style="max-width: 1280px">
                    <template #label>
                        我的请求
                    </template>
                    <myRequestList ref="myRequestListRef" />
                </el-tab-pane>
                <el-tab-pane style="max-width: 1280px">
                    <template #label>
                        待审批
                        <!-- 待审批 <el-tag type="danger" effect="dark" round>{{ pagination.totalCount }}</el-tag> -->
                    </template>
                    <penddingList ref="penddingListRef" />
                </el-tab-pane>

                <el-tab-pane style="max-width: 1280px">
                    <template #label>
                        已审批 
                    </template>
                    <approvedList ref="approvedListRef" />
                </el-tab-pane>
                <!-- <el-tab-pane label="已完成">
                    <el-timeline style="max-width: 600px">
                        <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type"
                            :size="activity.size" :timestamp="activity.timestamp">
                            {{ activity.content }}
                            <el-card>
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-tab-pane> -->
                <el-tab-pane label="更多">
                    <el-button type="primary" @click="jumpFlowDesign()">流程设计</el-button>
                    <el-button type="primary" @click="jumpFlowConf()">流程配置列表</el-button>
                    <el-button type="primary" @click="jumpFlowCreate()">发起测试</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
 
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import penddingList from "@/components/flowOpt/penddingList.vue";
import approvedList from "@/components/flowOpt/approvedList.vue";
import myRequestList from "@/components/flowOpt/myRequestList.vue";
const router = useRouter();

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

onMounted(async () => {

});

const toReturn = () => {
    router.push({ path: "/" });
};
const jumpFlowConf = () => {
    router.push({ path: "/flowconf" });
};
const jumpFlowCreate = () => {
    router.push({ path: "/demo1" });
}; 
const jumpFlowDesign = () => {
    router.push({ path: "/" });
}; 

</script>
<style scoped> 
</style>