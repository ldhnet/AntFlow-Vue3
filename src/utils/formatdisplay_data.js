// import { FormatDisplayUtils } from '@/utils/formatdisplay_data'
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
                node.priorityLevel = node.property.sort;
                node.isDefault = node.property.isDefault;
                Object.assign(node, { conditionList: [] });
                node.conditionList  =  node.property.conditionList ? node.property.conditionList : [];  
                delete node.property;
            }

            if (node.nodeType == 4 || node.nodeType == 5) {
                let empList = [];       
                if (node.property && !isEmptyArray(node.property.emplList)) {
                    for (let emp of node.property.emplList) {
                        let approveObj = {
                            type: 1,
                            targetId: parseInt(emp.id),
                            name: emp.name
                        };
                        empList.push(approveObj);
                    }

                    Object.assign(node, { signType: node.property.signType });
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