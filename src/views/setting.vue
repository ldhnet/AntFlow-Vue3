<template>
  <div>
    <div class="fd-nav">
      <div class="fd-nav-left">
        <div class="fd-nav-back" @click="toReturn">
          <i class="anticon anticon-left"></i>
        </div>
        <div class="fd-nav-title">{{ title }}</div>
      </div>
      <div class="fd-nav-right">
        <button type="button" class="ant-btn button-publish" @click="saveSet">
          <span>发 布</span>
        </button>
      </div>
    </div>
    <div class="fd-nav-content">
      <section class="dingflow-design">
        <div class="zoom">
          <div class="zoom-out" :class="nowVal == 50 && 'disabled'" @click="zoomSize(1)"></div>
          <span>{{ nowVal }}%</span>
          <div class="zoom-in" :class="nowVal == 300 && 'disabled'" @click="zoomSize(2)"></div>
        </div>
        <div class="box-scale" :style="`transform: scale(${nowVal / 100});`">
          <nodeWrap v-model:nodeConfig="nodeConfig" />
          <div class="end-node">
            <div class="end-node-circle"></div>
            <div class="end-node-text">流程结束</div>
          </div>
        </div>
      </section>
    </div>
    <errorDialog v-model:visible="tipVisible" :list="tipList" />
    <promoterDrawer />
    <approverDrawer :directorMaxLevel="directorLevel" />
    <copyerDrawer />
    <conditionDrawer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getWorkFlowData, setWorkFlowData, getMockWorkFlowData } from '@/api/index';
import { getApiWorkFlowData, setApiWorkFlowData } from '@/api/jdCloudApi';
import { useStore } from '@/stores/index'
import errorDialog from "@/components/dialog/errorDialog.vue";
import promoterDrawer from "@/components/drawer/promoterDrawer.vue";
import approverDrawer from "@/components/drawer/approverDrawer.vue";
import copyerDrawer from "@/components/drawer/copyerDrawer.vue";
import conditionDrawer from "@/components/drawer/conditionDrawer.vue";
import { FormatUtils } from '@/utils/formatcommit_data'
import { FormatDisplayUtils } from '@/utils/formatdisplay_data'
let { setTableId, setIsTried } = useStore()

let tipList = ref([]);
let tipVisible = ref(false);
let nowVal = ref(100);
let processConfig = ref({});
let nodeConfig = ref({});
let title = ref('');
let directorLevel = ref(0);
let tableId = ref(0);
onMounted(async () => {
  let route = useRoute()
  //let { data } = await getWorkFlowData({ workFlowDefId: route.query.workFlowDefId }); 
  let mockjson = {};
  if (route.query.id) {
    mockjson = await getApiWorkFlowData({ id: route.query.id });
  } else {
    mockjson = await getMockWorkFlowData({ id: 0 });
  }
  let data = FormatDisplayUtils.getToTree(mockjson.data);
  console.log("old===api return Data======", JSON.stringify(data));
  processConfig.value = data;

  directorLevel.value = data.directorMaxLevel;
  title.value = data.bpmnName;
  nodeConfig.value = data.nodeConfig;
  tableId.value = data.tableId;
  setTableId(tableId);
});
const toReturn = () => {
  //window.location.href = ""
};
const reErr = ({ childNode }) => {
  if (childNode) {
    let { nodeType, error, nodeName, conditionNodes } = childNode;
    if (nodeType == 1) {
      reErr(childNode);
    }
    else if (nodeType == 2) {
      reErr(childNode);
      for (var i = 0; i < conditionNodes.length; i++) {
        if (conditionNodes[i].error) {
          tipList.value.push({ name: conditionNodes[i].nodeName, nodeType: "条件" });
        }
        reErr(conditionNodes[i]);
      }
    }
    else if (nodeType == 3) {
      reErr(childNode);
    }
    else if (nodeType == 4 || nodeType == 5) {
      if (error) {
        tipList.value.push({
          name: nodeName,
          nodeType: nodeTypeList[nodeType],
        });
      }
      reErr(childNode);
    }
  } else {
    childNode = null;
  }
};
const saveSet = async () => {
  setIsTried(true);
  tipList.value = [];
  reErr(nodeConfig.value);
  if (tipList.value.length != 0) {
    tipVisible.value = true;
    return;
  }
  // eslint-disable-next-line no-console 
  // console.log("old===processConfig==", JSON.stringify(processConfig.value));
  ElMessage.success("设置成功,F12控制台查看数据");

  let submitData = JSON.parse(JSON.stringify(processConfig.value));
  var resultData = FormatUtils.formatSettings(submitData);
  console.log("new===post api Data=======", JSON.stringify(resultData));

  //   let res = await setApiWorkFlowData(resultData);
  //  if (res.code == 200) { 
  //     console.log("提交到API返回成功"); 
  //   }else {
  //     console.log("提交到API返回失败=",JSON.stringify(res));
  //   } 

  // let res = await setWorkFlowData(processConfig.value);
  // if (res.code == 200) {
  //   ElMessage.success("设置成功")
  //   setTimeout(function () {
  //     window.location.href = "";
  //   }, 200);
  // }

};
const zoomSize = (type) => {
  if (type == 1) {
    if (nowVal.value == 50) {
      return;
    }
    nowVal.value -= 10;
  } else {
    if (nowVal.value == 300) {
      return;
    }
    nowVal.value += 10;
  }
};
</script>
<style scoped>
.error-modal-list {
  width: 455px;
}
</style>