<template>
     <div class="fd-nav-content">
        <div class="form-container">
          <v-form-designer ref="formDesign"></v-form-designer>
        </div>
        <!-- <button @click="submitForm">ok</button> -->
     </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const formDesign = ref(null) 
  const getData = () => {
    let exportData= formDesign.value.getFormJson();
    //console.log('exportData=========',JSON.stringify(exportData)) 
    return new Promise((resolve, reject) => {
      resolve({ formData: exportData })
    })
  }
  defineExpose({
    getData
  })
  </script>
  
  <style lang="css" scoped>
  body {
    margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
  } 
  </style>
  