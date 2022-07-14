import nodeConfig from "./config.js"; 
import { FlowConditionNodeUtils } from "./flowformid.config.js";
import { NodeUtils } from "../FlowCard/util.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true 

export class FormatDisplayUtils {
    static depthConverterToTree(parmData)
    {
        if(isEmptyArray(parmData)) return
        let nodeData =[],nodesGroup={},startNode={}
        for(let t of parmData){
           let node_t=this.createNodeDisplay(t)
           nodeData.push(node_t)
           if(nodesGroup.hasOwnProperty(node_t.nodeFrom)){
               nodesGroup[node_t.nodeFrom].push(node_t)
           }else{
               nodesGroup[node_t.nodeFrom]=[node_t]
           }
        }  
        for (let processNode of nodeData) {
            if ("start" == processNode.type) {
                startNode = processNode;
            }
            processNode.conditionNodes=[]
            let currNodeId = processNode.nodeId;
            if (nodesGroup.hasOwnProperty(currNodeId)) {
                let itemNodes = nodesGroup[currNodeId]; 
                for (let itemNode of itemNodes) { 
                    if ("condition" == itemNode.type) {
                        processNode.conditionNodes.push(itemNode);
                    } else {
                        processNode.childNode = itemNode;
                    }
                }
            }
        } 
        //console.log('startNode====',JSON.stringify(startNode)); 
       return startNode
    }
  /**
   * 创建Node Data 数据
   * @param { Object } nodeData - 源节点数据
   * @returns Object
   */
   static createNodeDisplay (nodeData) {       
        let type= NodeUtils.getNodeTypeString(nodeData)
        let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
        res.nodeId = nodeData.nodeId
        res.prevId = nodeData.nodeFrom?nodeData.nodeFrom:'' 
        res.content  = nodeData.nodeDisplayName
        res.nodeFrom = [res.prevId]
        res.nodeTo = nodeData.nodeTo? nodeData.nodeTo:[] 
        res.nodeProperty = nodeData.nodeProperty
        let nodeProperty_Info = nodeData.property
        if(isEmpty(nodeProperty_Info)) return res 
        if(res.type == 'approver')
        { 
            res.properties.counterSign = nodeProperty_Info.signType == 1? true :false
            if(!isEmptyArray(nodeData.property.emplIds))
            {
                res.properties.approvers = nodeData.property.emplIds.map(key=>({userId: key,userName: ''}))             
            }  
            res.properties.assigneeType = NodeUtils.getAssigneeTypeString(res)
 
        }
        if(res.type == 'condition')
        {
            if(nodeProperty_Info.hasOwnProperty('conditionsConf') && !isEmpty(nodeProperty_Info.conditionsConf))
            { 
                res.content = nodeProperty_Info.conditionsConf.isDefault == 1? '其他情况进入此流程' : nodeData.nodeDisplayName
                res.properties.title = nodeData.nodeName
                res.properties.priority = nodeProperty_Info.conditionsConf.sort
                res.properties.isDefault=nodeProperty_Info.conditionsConf.isDefault == 1? true :false
 
                res.properties.conditions = FlowConditionNodeUtils.getConditionParamTypes(nodeProperty_Info.conditionsConf)                  
            }
        } 
        return res           
    }
  
}