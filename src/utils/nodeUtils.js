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
     * 创建条件对象
     * @returns object
     */
    static createConditionNode(name,childNode,isDefault) {
      let conditionNode ={
        "nodeId": this.idGenerator(),
        "nodeName": name||"条件1", 
        "nodeDisplayName": name||"条件1", 
        "nodeType": 3,
        "nodeFrom": "",  
        "nodeTo": [],
        "priorityLevel": 1,
        "conditionList": [],
        "nodeApproveList": [],
        "error": true, 
        "childNode": childNode,
        "isDefault": isDefault||0
      }
      return conditionNode;
    }
} 

/**
 * 添模拟数据
 */
export function getMockData() {
    let startNode = "";//NodeUtils.createNode("start", ""); 
    return startNode;
}
  