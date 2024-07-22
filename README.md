<p align="center" style="margin-bottom: 0 !important">
	<img alt="logo" src="https://gitee.com/ldhnet/ant-flow/raw/master/public/images/logo.png"  width = "80px"; height= "80px";>
</p>
<h1 align="center" style="margin: 10px 10px; font-weight: bold;margin-top: 0 !important">AntFlow-Vue3</h1>
<h4 style="border-top: solid #ACC0D8 1px;"></h4>
<h4 align="center">AntFlow是基于Vue3 的前端工作流配置新模式 </h4>
<h4 align="center" style="margin: 0px 0px 30px 10px; ">后端自主研发基于SpringBoot + Activiti 开发的轻量级工作流框架</h4>


### workflow彷钉钉审批流程设置-vue3版本

-  在线预览  [预览入口](http://117.72.70.166/ant-flow/dist/)
-  📢📢预览功能以及API介绍来啦(持续完善中...)[wiki](https://gitee.com/ldhnet/AntFlow-Vue3/wikis)
-  📢📢📢后端功能即将开源,加关注加群及时了解最新动态
-  开源地址vue3版本Gitee [https://gitee.com/ldhnet/AntFlow-Vue3](https://gitee.com/ldhnet/AntFlow-Vue3)[Gitee仓库](https://gitee.com/ldhnet/AntFlow-Vue3) gitee点个星吧！
-  开源地址vue2版本GitHub [https://github.com/ldhnet/AntFlow-Vue2](https://github.com/ldhnet/AntFlow-Vue2)[GitHub仓库] (https://github.com/ldhnet/AntFlow-Vue2)点个星吧！
 - QQ技术交流群（972107977） 期待您的加入
 - 有疑问可以Issues留言，我们会认真对待
  [issues地址](https://gitee.com/ldhnet/AntFlow-Vue3/issues)


#### 项目预览
   
![1.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/1.png)
![2.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/2.png)
![3.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/3.png)

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
![1.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/1.png)
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
![4.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/4.png)
```javascript
<div class="add-node-btn">
    <el-popover placement="right-start" v-model="visible">
          <div class="add-node-popover-body">
              <a class="add-node-popover-item approver" @click="addType(4)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>审批人</p>
              </a>
              <a class="add-node-popover-item notifier" @click="addType(5)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>抄送人</p>
              </a>
              <a class="add-node-popover-item condition" @click="addType(2)">
                  <div class="item-wrapper">
                      <span class="iconfont"></span>
                  </div>
                  <p>条件分支</p>
              </a>
          </div>
          ...
```
5.错误校验
![YL5Vmj.png](https://gitee.com/ldhnet/AntFlow-Vue3/raw/master/public/images/3.png)
```javascript
let {type,error,nodeName,conditionNodes} = childNode
if (type == 4 || type == 5) {
    if (error) {
        this.tipList.push({ name: nodeName, type: ["","审核人","抄送人"][type] })
    }
    this.reErr(childNode)
} else if (type == 3) {
    this.reErr(childNode)
} else if (type == 2) {
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

> git clone https://gitee.com/ldhnet/AntFlow-Vue3.git 点个赞吧！

#### 项目运行 node14.20.1 以上版本
> 1.环境依赖  `npm i`

> 2.本地运行 `npm run dev` 

> 3.打包运行 `npm run build` 



## 热烈推荐
大家在使用本项目时，推荐结合贺波老师的书[《深入Activiti流程引擎：核心原理与高阶实战》](https://item.jd.com/13928958.html)，这本书对系统学习和深入掌握Activiti/Flowable的用法非常有帮助。

![输入图片说明](https://foruda.gitee.com/images/1699658576150803044/9bdfb7f1_2042292.png "")

