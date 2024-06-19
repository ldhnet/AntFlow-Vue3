// import { FormatDisplayUtils } from '@/utils/formatdisplay_data'
import { approveList } from '@/utils/const'
const isEmptyArray = data => Array.isArray(data) ? data.length === 0 : true

export class FormatDisplayUtils {
    /**
     * 格式化显示数据
     * @param {Array} parmData 
     * @returns Object
     */
    static getToTree(parmData) {           
        let node = this.createNodeDisplay(parmData); 
        let formatList = this.formatDisplayStructNodeList(parmData.nodes);    
        node.nodeConfig = this.depthConverterToTree(formatList);//parmData.nodes
        return node
    }

    /**
     * 创建Node Data 数据
     * @param { Object } nodeData - 源节点数据
     * @returns Object
     */
    static createNodeDisplay(nodeData) {
        let displayObj = {
            tableId: 1,
            workFlowDef: {
                name: nodeData.bpmnName,
            },
            directorMaxLevel: 3,
            flowPermission: [],
            nodeConfig: {},
        }
        return displayObj
    }
    /**
     * List 转成tree结构
     * @param {Array} parmData 
     * @returns 
     */
    static depthConverterToTree(parmData) {
        if (isEmptyArray(parmData)) return
        let nodesGroup = {}, startNode = {}
        for (let t of parmData) {
            if (nodesGroup.hasOwnProperty(t.nodeFrom)) {
                nodesGroup[t.nodeFrom].push(t)
            } else {
                nodesGroup[t.nodeFrom] = [t]
            }
        }
        for (let node of parmData) {
            if (1 == node.nodeType) {
                startNode = node;
            }
            Object.assign(node, { conditionNodes: [] });
            let currNodeId = node.nodeId;
            if (nodesGroup.hasOwnProperty(currNodeId)) {
                let itemNodes = nodesGroup[currNodeId];
                for (let itemNode of itemNodes) {
                    if (3 == itemNode.nodeType) {
                        node.conditionNodes.push(itemNode);
                    } else {
                        node.childNode = itemNode;
                    }
                }
            }
        }
        return startNode
    }

    static formatDisplayStructNodeList(nodeList) {
        if (isEmptyArray(nodeList)) return nodeList;
        for (let node of nodeList) {    
            if (node.nodeType == 3) {
                node.priorityLevel = node.property.conditionsConf.sort;
                node.isDefault = node.property.conditionsConf.isDefault;

                let conditionObj = {
                    columnId: node.property.conditionsConf.conditionParamTypes[0],
                    type: 2, //1 发起人 2其他 
                    showType: "3", //3多选 其他
                    showName: node.nodeDisplayName,
                    optType: "", //["", "<", ">", "≤", "=", "≥"][optType]
                    zdy1: node.property.conditionsConf.accountType.toString(), //左侧自定义内容
                    zdy2: "", //右侧自定义内容
                    opt1: "", //左侧符号 < ≤
                    opt2: "", //右侧符号 < ≤
                    columnDbname: "accountType", //条件字段名称
                    columnType: "String", //条件字段类型
                    fixedDownBoxValue: "{\"1\":{\"key\":\"1\",\"value\":\"腾讯云\",\"column\":\"\",\"type\":\"1\"},\"2\":{\"key\":\"2\",\"value\":\"百度云\",\"column\":\"\",\"type\":\"1\"},\"3\":{\"key\":\"3\",\"value\":\"阿里云\",\"column\":\"\",\"type\":\"1\"}}"
                }

                Object.assign(node, { conditionList: [] });
                node.conditionList.push(conditionObj);
                delete node.property;
            }

            if (node.nodeType == 4 || node.nodeType == 5) {
                let empList = [];
         
                if (node.property && !isEmptyArray(node.property.emplIds)) {
                    for (let emplId of node.property.emplIds) {
                        let approveObj = {
                            type: 5,
                            targetId: emplId,
                            name: approveList[emplId]
                        };
                        empList.push(approveObj);
                    }
                }
                node.setType = node.nodeProperty == 5 ? 1 : node.nodeProperty; 
                Object.assign(node, { nodeApproveList: [] });
                node.nodeApproveList = empList;
                delete node.property;
            }
        }
        return nodeList;
    }
}