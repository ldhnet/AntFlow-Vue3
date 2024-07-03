<!--
 * @Date: 2022-09-21 14:41:53
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-05-24 15:20:24
 * @FilePath: /zto-flow/src/components/flowOpt/flowReviewWarp.vue
-->
<template>
    <div class="node-wrap">
        <div class="node-wrap-box" :class="(nodeConfig.nodeType == 1 ? 'start-node ' : '')">
            <div class="title" :style="`background: rgb(${bgColors[nodeConfig.nodeType]});`">
                <span>{{ nodeConfig.nodeName }}</span>
            </div>
            <div class="content" @click="setPerson">
                <div class="text">
                    {{ nodeConfig.nodeDisplayName ?? '未获取到' }}
                </div>
            </div>
        </div>
        <div class="pixel-line"></div>
    </div>
    <flowReviewWarp v-if="nodeConfig.childNode" v-model:nodeConfig="nodeConfig.childNode" />
</template>
<script setup>
import { onMounted } from "vue";
import { bgColors } from '@/utils/const'

let props = defineProps({
    nodeConfig: {
        type: Object,
        default: () => ({}),
    }
});
onMounted(() => {
    //console.log("old===props=nodeConfig==========", JSON.stringify(props.nodeConfig));
});

</script>
<style>
.pixel-line {
    height: 30px;
    background-color: black;
    transform: scaleX(0.001);
}
</style>