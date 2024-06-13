### workflow钉钉审批流程设置-vue3版本

workflow钉钉审批流程设置，基于vue开发 

[预览入口](http://117.72.70.166/zto-flow/dist/)

-  [开源地址vue3版本Gitee https://gitee.com/ldhnet/zto-flow][Gitee仓库](https://gitee.com/ldhnet/zto-flow) gitee点个星吧！
-  [开源地址vue2版本GitHub https://github.com/ldhnet/AntFlow][GitHub仓库](https://github.com/ldhnet/AntFlow) 点个星吧！
 
   
![YL5F1S.png](https://s1.ax1x.com/2020/05/22/YL5F1S.png)
![YL5Z0s.png](https://s1.ax1x.com/2020/05/22/YL5Z0s.png)
![YL5Vmj.png](https://s1.ax1x.com/2020/05/22/YL5Vmj.png)

-------------------
 

#### 项目介绍
- UI钉钉风格
- 技术点
1. 组件自调用+递归处理，按树状结局处理审批流程问题
- 主要功能点
2. 界面缩放 
```javascript
<div class="zoom">
	<div :class="'zoom-out'+ (nowVal==50?' disabled':'')" @click="zoomSize(1)"></div>
    <span>{{nowVal}}%</span>
    <div :class="'zoom-in'+ (nowVal==300?' disabled':'')" @click="zoomSize(2)"></div>
</div>
```
3. 节点设置（包括审批人、发起人、抄送人、条件设置）
![YL5Z0s.png](https://s1.ax1x.com/2020/05/22/YL5Z0s.png)
```javascript
<el-drawer title="审批人设置" :visible.sync="approverDrawer" class="set_promoter" :show-close="false" :size="550" :before-close="saveApprover"> 
    <div class="demo-drawer__content">
        <div class="drawer_content">
            <div class="approver_content">
                <el-radio-group v-model="approverConfig.settype" class="clear" @change="changeType">
                    <el-radio v-for="({value, label}) in setTypes" :key="value" :label="value">{{label}}</el-radio>
                </el-radio-group>
                ...
```
5. 节点新增
![YL5Vmj.png](https://s1.ax1x.com/2020/05/22/YL5Vmj.png)
```javascript
<div class="add-node-btn">
    <el-popover placement="right-start" v-model="visible">
          <div class="add-node-popover-body">
              <a class="add-node-popover-item approver" @click="addType(1)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>审批人</p>
              </a>
              <a class="add-node-popover-item notifier" @click="addType(2)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>抄送人</p>
              </a>
              <a class="add-node-popover-item condition" @click="addType(4)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>条件分支</p>
              </a>
          </div>
          ...
```
5.错误校验
![YL5Vmj.png](https://s1.ax1x.com/2020/05/22/YL5Vmj.png)
```javascript
let {type,error,nodeName,conditionNodes} = childNode
if (type == 1 || type == 2) {
    if (error) {
        this.tipList.push({ name: nodeName, type: ["","审核人","抄送人"][type] })
    }
    this.reErr(childNode)
} else if (type == 3) {
    this.reErr(childNode)
} else if (type == 4) {
    this.reErr(childNode)
    for (var i = 0; i < conditionNodes.length; i++) {
        if (conditionNodes[i].error) {
            this.tipList.push({ name: conditionNodes[i].nodeName, type: "条件" })
        }
        this.reErr(conditionNodes[i])
    }
}
```
6.模糊搜索匹配人员、职位、角色
```javascript
<input type="text" placeholder="搜索成员" v-model="searchVal" @input="getDebounceData($event,activeName)">
<input type="text" placeholder="搜索角色" v-model="searchVal" @input="getDebounceData($event,2)">
<input type="text" placeholder="请选择具体人员/角色/部门" v-if="conditionConfig.nodeUserList.length == 0" @click="addConditionRole">
```
#### 项目安装

> git clone https://gitee.com/ldhnet/zto-flow.git 点个赞吧！

#### 项目运行 node14.20.1
> 1.环境依赖  `npm i`

> 2.本地运行 `npm run dev` 

> 3.打包运行 `npm run build` 
