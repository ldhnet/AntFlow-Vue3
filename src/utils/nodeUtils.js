//import {  NodeUtils } from '@/utils/nodeUtils'

export class NodeUtils {
    /**
     * 根据自增数生成64进制id
     * @returns 64进制id字符串
     */
    static idGenerator() {
      let qutient = new Date() - new Date("2024-05-01");
      qutient += Math.ceil(Math.random() * 1000); // 防止重複
      const chars = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
      const charArr = chars.split("");
      const radix = chars.length;
      const res = [];
      do {
        let mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        res.push(charArr[mod]);
      } while (qutient);
      return res.join("").toUpperCase();
    }
    /**
     * 创建审批人对象
     */
    static createApproveNode() {
      let approveNode = {
        "nodeId": this.idGenerator(),
        "nodeName": "审核人", 
        "nodeDisplayName": "审核人", 
        "nodeType": 4,
        "nodeFrom": "",  
        "nodeTo": [],
        "setType": 1,  
        "directorLevel": 1,
        "signType": 1,
        "noHeaderAction": 1, 
        "childNode":{},
        "error": true,
        "property":{
          "afterSignUpWay":1
        },
        "buttons":{
            "startPage": [1],
            "approvalPage": [3,4],
            "viewPage": [0],
        },
        "nodeApproveList": []
      }
      return approveNode;
    }
    /**
     * 创建抄送人对象
     * @returns object
     */
    static createCopyNode() {
      let copyNode = {
        "nodeId": this.idGenerator(),
        "nodeName": "抄送人",
        "nodeDisplayName": "抄送人", 
        "nodeType": 5,
        "nodeFrom": "",  
        "nodeTo": [],
        "setType": 1, 
        "error": true,
        "ccFlag": 1,
        "childNode": {},
        "property":{},
        "buttons":{
            "startPage": [],
            "approvalPage": [],
            "viewPage": [],
        },
        "nodeApproveList": []
      }
      return copyNode;
    }
    /**
    * 创建网关对象
    * @returns object
    */
    static createGatewayNode() {
      let gatewayNode = {
        "nodeId": this.idGenerator(),
        "nodeName": "网关",
        "nodeType": 2,
        "nodeFrom": "",  
        "nodeTo": [],
        "childNode": null, 
        "error": true,
        "property":null,
        "conditionNodes": []
      }
      return gatewayNode;
    }
   /**
   * 创建网关对象
   * @returns object
   */
  static createGatewayNode(child) {
    let gatewayNode = {
      nodeId: this.idGenerator(),
      nodeName: "网关",
      nodeType: 2,
      nodeFrom: "",
      nodeTo: [],
      childNode: null,
      error: true,
      property: null,
      conditionNodes: [
        this.createConditionNode("条件1", child, 0),
        this.createConditionNode("条件2", null, 1),
      ],
    };
    return gatewayNode;
  }
  /**
   * 创建条件对象
   * @returns object
   */
  static createConditionNode(name, childNode, isDefault) {
    let conditionNode = {
      nodeId: this.idGenerator(),
      nodeName: name || "条件1",
      nodeDisplayName: name || "条件1",
      nodeType: 3,
      nodeFrom: "",
      nodeTo: [],
      priorityLevel: 1,
      conditionList: [],
      nodeApproveList: [],
      error: true,
      childNode: childNode,
      isDefault: isDefault || 0,
    };
    return conditionNode;
  }
   /**
   * 初始化流程数据
   * @returns object
   */
   static createStartNode() {
    let startObj = {
      "data":{}
    };
    let startNode = {
      bpmnCode: null,
      bpmnName: "",
      bpmnType: null,
      formCode: "",
      appId: null,
      deduplicationType: 1,
      effectiveStatus: 0,
      isLowCodeFlow: 1,
      remark: "",
      isDel: 0,
      nodes: [
        {
          confId: 35,
          nodeId: "Gb2",
          nodeType: 1,
          nodeProperty: 1,
          nodePropertyName: null,
          nodeFrom: "",
          nodeFroms: null,
          prevId: [],
          batchStatus: 0,
          approvalStandard: 2,
          nodeName: "发起人",
          nodeDisplayName: "发起人",
          annotation: null,
          isDeduplication: 0,
          isSignUp: 0,
          orderedNodeType: null,
          remark: "",
          isDel: 0,
          nodeTo: [],
          property: null,
          params: null,
          buttons: {
            startPage: [],
            approvalPage: [2],
            viewPage: null,
          },
          templateVos: null,
          approveRemindVo: null, 
          conditionNodes: [],
        },
      ],
    };
    startObj.data = startNode;
    return startObj;
  }
} 

/**
 * 添模拟数据
 */
export function getMockData() {
    let startNode = "";//NodeUtils.createNode("start", ""); 
    return startNode;
}
  