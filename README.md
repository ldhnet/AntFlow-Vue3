<p align="center" style="margin-bottom: 0 !important">
	<img alt="logo" src="https://gitee.com/ldhnet/ant-flow/raw/master/public/images/logo.png"  width = "80px"; height= "80px";>
</p>
<h1 align="center" style="margin: 10px 10px; font-weight: bold;margin-top: 0 !important">AntFlow-Vue3</h1>
<h4 style="border-top: solid #ACC0D8 1px;"></h4>
<h4 align="center">AntFlow是基于Vue3 的前端工作流配置新模式 </h4>
<h4 align="center" style="margin: 0px 0px 30px 10px; ">后端自主研发基于SpringBoot + Activiti 开发的轻量级工作流框架</h4>


### workflow彷钉钉审批流程设置-vue3版本

- [![star](https://gitee.com/ldhnet/AntFlow-Vue3/badge/star.svg?theme=dark)](https://gitee.com/ldhnet/AntFlow-Vue3/stargazers)  [![fork](https://gitee.com/ldhnet/AntFlow-Vue3/badge/fork.svg?theme=dark)](https://gitee.com/ldhnet/AntFlow-Vue3/members)

-  在线预览  [预览入口](http://117.72.70.166/ant-flow/dist/)
-  使用若依(RuoYi-Vue3)，集成审批流  [预览入口](http://117.72.70.166/admin/)
-  📢📢预览功能以及API介绍文档来啦(持续完善中...)[wiki](https://gitee.com/ldhnet/AntFlow-Vue3/wikis)
-  📢📢📢后端功能即将开源,加关注加群及时了解最新动态
-  🆓 **不管是前端还是即将开源的后端,都不会有收费功能,可放心使用** 
-  开源地址vue3版本 [Gitee仓库](https://gitee.com/ldhnet/AntFlow-Vue3)  点个星吧！
-  开源地址vue2版本 [GitHub仓库](https://github.com/ldhnet/AntFlow-Vue2) 点个星吧！
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

#### 功能一览

| 功能                           | 功能解释&场景示例                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 完成情况 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 审批人前去重                   | 不同节点都需要同一个审批人审批时,审批人只在最前面节点出现(可能刚接触流程业务的人不理解为什么要去重,如果审批流每个节点都是固定人员,当然不需<br />,实际情况是复杂的办公流程很多节点都不是指定的人,而是根据规则带出来的.比如一个报销流程需要直属领导和部门负责人审批,有的员工的直属领导就是<br />部门负责人(比如你是研发组长))                                                                                                                                                                                                                                                                                                                                                         | ✅       |
| 审批人后去重                   | 不同节点都需要同一个审批人审批时,审批人只在最后面节点出现.前去重还是后去重是根据实际业务决定的.比如在一个财务流程中需要资金经理和财务总监<br />都审核。财务总监可能也是资金经理（资金经理有多个），这时候流程对他后去重比较合理，流程先让其它资金经理把关，没问题了再到他那里（                                                                                                                                                                                                                                                                                                                                                                                                     | ✅       |
| 审批人不去重                   | 审批人前去重后去重都是针对流程整体而言的，针对流程的某个节点，有需要不去重的场景（即去重逻辑对它失效）。比如某个大额打款流程需要出纳在<br />特定的机器上操作（可以实现对流程特定节点控制）。如果他在打款节点被去重掉了，则将导致打款行为无法进行（流程设计时是对打款这个节点进行控制）                                                                                                                                                                                                                                                                                                                                                                                            | ✅       |
| 会签                           | 流程某个节点需要多人审批时（通常是一类角色，会有多个人），需要所有人都审核通过流程才能继续进行。比如一个项目立项流程需有个审批节点是副总<br />经理审批，可能公司有多个副总经理，需要他们都同意流程才继续                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ✅       |
| 顺序会签                       | 上面的会签是不分顺序的，强调需要审批节点上的人都需要同意方可继续。顺序会签则是流程到了这个审批节点，需要按预先设计好的顺序依次审批通过<br />还以上面项目立项流程为例。假如多个副总经理有一个是起决定作用，其它人都是象征性同意。则可以将流程设计为他最先执行，然后再到到其它人审批<br />具体需要不需要顺序，要结合具体的业务设计。总体上而言，不需要依次审批的效率会高一些（这里批审批的流转效率，技术上没有区别）                                                                                                                                                                                                                                                                | ✅       |
| 或签                           | 流程某个节点是多人审批节点，但是只需要一个人审批通过流程就可以继续向下执行。比如一个财务报销流程，到了出纳审批的环节公司可能有多个出纳，<br />但是只需要任意一个出纳审核票据无误就可以继续向下进行                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ✅       |
| 打回修改                       | AntFlow的特色功能（市面上一些竞品也有这项功能），流程发起后，由于表单字段填写错误，这时候让发起人重新填写显然效率非常低，也容易让人暴躁,<br />AntFlow支持将流程打回到发起人重新修改后再提交，然后流程继续                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ✅       |
| 流程同意、拒绝                 | 审批流的基本功能                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ✅       |
| 流程加批                       | 流程加批用在一些组织角色不明确的流程中，比如一个开发人员发起了一个数据库变更流程，需要他对应的产品同意，公司中一般可能没有开发对应的产品<br />是谁这样的划分，这时候流程可以设计为允许加批，开发在发起流程时选择自己的产品进行审批。                                                                                                                                                                                                                                                                                                                                                                                                                                              | ✅       |
| 流程作废                       | 在流程还没有审批完成时,流程发起人对流程执行作废操作,终结掉当前流程                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ✅       |
| 变更当前处理人                 | 变更流程当前正在执行节点。使用场景：正常离职需要办理离职交接手续，其中有一步是交接手上正在处理的流程给别人，但是有些<br />特殊关系户，他在离职的时候只需要找个招呼就行了。这个时候需要他审核的流程就会卡住进行不下去，这时候可以向领导请求他手里的流程可以交接给谁<br />然后把处理人变更为指定的人。变更处理人直接更改引擎中当前节点的处理人，是危险操作，可能会查看审批路径人审批人看起来不对                                                                                                                                                                                                                                                                                    | ✅       |
| 变更未来节点处理人             | 有些流程由于开发时存在逻辑bug或者运营人员在配置时候配置错了，导致不应该出现在当前审批流中的人出现了。比如加班餐20元报销流程不一般不需要<br />老板亲自审批，但是走到老板那里了。一大早上老板的OA系统出现一堆加班餐报销流程，想想老板会是什么心情💀。这时候如果流程还没到老板那里，可以变<br />更一下流程处理人。注意，变更未来节点处理人是一补救措施。和变更当前处理人的区别第一点当然是节点状态不同。第二点就是变更处当前处理人一般针<br />单个具体流程实例（通俗讲就是有流程编号的一个流程），变更未来处理人一般为整个流程级别的。比如所有的已发起的加班餐报销流程                                                                                                               | ✅       |
| 流程委托                       | 处理人将自己需要处理的流程转交给别人代处理的过程称作流程委托。比如为了感谢你对公司辛勤付出，领导给你放一个月假让你到三亚旅游一圈，此间你<br />不想处理任何与工作相关的事务（那是不可能的），这时候可以发起一个流程委托申请流程，被委托人和相关负责人都审批通过后流程就自动委托给指定的<br />人处理了（流程委托也是危险操作，不能轻易开放。比如一个百万级别的采购流程公司副总擅自委托给一个不知明喽啰审批显然是不合适的😄）                                                                                                                                                                                                                                                        | ✅       |
| 流程限时制委托                 | 流程处理人将自己需要处理的流程在指定时间段内委托给指定人代处理的过程叫作限时委托。有些委托是永久性的，比如老板会将一些非必要自己审批的流程<br />委托给自己的秘书（老板委托自己的流程也要发起流程申请？are you kidding me?其实要看怎么设计的，如果老板会严格遵守公司规范没问题，如果不是则<br />就需要特殊考虑，比如给管理员增加一个手动修改流程委托人权限，这也可以防止程序出现意外情况有补救措施。比如别人流程委托申请的流程走完了，结果<br />逻辑没生效。你让别人再重新发起一个流程？这个时候自己手动私下处理掉得了🙄。回到正题，实际工作中很多流程委托都不是永久性的，比如上面的你到三<br />亚旅旅游的案例。你只需要在这段时间内将流程委托出去，你回来了还得继续当牛做马干活🤐 | ✅       |
| 定时流程                       | 工作中有很些场景流程并不会是由用户手动发起的，有的是系统以指定用户的名义发起的。比如员工试用期转正申请。如果让员工自己来关注会比较累，让hr<br />来提醒hr也会比较累。这时候可以制定一些定时流程，在员工试用期到的时候自动以他的名义发起一个试用期转正申请流程（流程节点上要把他设置为审批人<br />不然他自己都不知道，一脸蒙蔽🥴）                                                                                                                                                                                                                                                                                                                                                  | ✅       |
| 流程灰度                       | 在日常开发中，有些比较规范的团队会有灰度发版操作。同样，在重度依赖审批流的公司中，审批流出错可能会导致严重的问题，轻则批评责备，重则相应<br />开发负责人员卷铺盖走人。为了将新上线的流程可能的bug导致的风险降到最低。可以对流程进行灰度试点。灰度的策略有很多，比如指定人员使用，指定<br />角色使用，指定部门使用等。线上运营一段时间没有问题时再放开给整个公司使用。（看到这里你是不是感觉可能会非常困难，其实使用起来非常简单。这也<br />是AntFlow的追求，让流程尽量简单，流程开发完成以后运营能做的事尽量不让开发来做。后面会出教程详细介绍                                                                                                                                    | ✅       |
| 流程遇到指定人结束             | 这是流程设计时的一种功能，非运行时的。比如一个按公司部门组织层层审批的流程，有时候不知道需要向上审批多少层结束，但是可以在有某个人出现的时候<br />终止。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ✅       |
| 超时自动审批                   | 目前尚不支持，开发起来没有太大技术难度。但是作者一直坚持流程同意应当是审批人的真实意愿，可以结合oa系统站内信提醒，IM工具发消息提配，线下电<br />话沟通等方式让他同意掉。而不仅仅是为了时效性通过技术手段让流程自动通过。（AntFlow有很多中国式办公的功能，比如某个人不在了导致流程无法进行<br />这时候可以变更处理人来处理。总之有很多方法）。当然如果大家觉得这个功能很必要，出可以开发                                                                                                                                                                                                                                                                                           | ❌       |
| 流程抄送                       | 审批流的基本功能，将流程抄送给指定的人方便他查阅、归档管理。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ✅       |
| 流程自定义条件                 | 流程设计的时候往往会根据不同的条件决定执行不同的流程分支。条件也多种多样，和公司业务有密切关系。也是AntFlow中为数不多需要自己开发定制的功能<br />当然开发起来也非常简单。只需要实现一个接口构造一个返回true或者false的函数即可。剩下的交给引擎来完成。                                                                                                                                                                                                                                                                                                                                                                                                                            | ✅       |
| 流程执行运作                   | 流程在审批某个特定节点\审批完成时执行一个运作。比如一个用户发起一个腾讯云账号申请流程。有的公司是流程完成之后负责这个流程的人手动给员工开通<br />账号，对于大型企业每天有成千上百的人需要申请各自云平台账号，这样显然是低效的，可以更进一步，流程完成以后会发起回调事件，在回调事件里写上特定<br />的和云平台对接开通账号的逻辑即可。流程执行运作也是危险行为，需要注意设计逻辑的完整性                                                                                                                                                                                                                                                                                           | ✅       |
| 流程完结后自动发起<br />新流程 | 比如在一些公司有着复杂的离职流程，一般公为几个有先后顺序的流程，最后一个流程走完了才算离职完成。这里可以通过流程运作来完成，单独拎出来说是因<br />为作者觉得这个功能非常基础。也是为了帮助大家拓宽思路。结果流程引擎的现有某项或者某几项能力来完成一项功能                                                                                                                                                                                                                                                                                                                                                                                                                        | ✅       |
| 外部流程接入                   | 外部流程接入是指公司内以OA系统为核心，将流程引擎做为基础组件提供给公司其它业务系统来使用。比如果Devops系统，CRM系统，WMS系统等。这些外部<br />系统接入了之后便可以使用OA流程引擎的基础功能，一方面便于流程集中管理，另一方面减少研发资源的浪费。很多团队比如Devops团队做流程引擎自然没有做<br />OA系统的人专业。他们随便在网上找个组件使用一面方存可能存在能力不足问题，另一方面可能存在各种bug需要处理，他们可能处理不了。这些专业的事情应该交<br />给一个专业的团队来做（这块功能作者在做企业级开发的时候做过，但是效果不是很满意，这块功能正在重新规划中）                                                                                                                     | 🕘       |






## 热烈推荐
大家在使用本项目时，推荐结合贺波老师的书[《深入Activiti流程引擎：核心原理与高阶实战》](https://item.jd.com/13928958.html)，这本书对系统学习和深入掌握Activiti/Flowable的用法非常有帮助。

![输入图片说明](https://foruda.gitee.com/images/1699658576150803044/9bdfb7f1_2042292.png "")

