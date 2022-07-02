import nodeConfig from "./configdisplay.js";
import formidConfig from "@/config/flowformid.config.js";
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
        let type= this.getNodeType(nodeData)
        let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
        res.nodeId = nodeData.nodeId
        res.prevId = nodeData.nodeFrom?nodeData.nodeFrom:'' 
        res.content  = nodeData.nodeDisplayName
        res.nodeFrom = [res.prevId]
        res.nodeTo = nodeData.nodeTo? nodeData.nodeTo:[] 

        let nodeProperty=nodeData.property
        if(isEmpty(nodeProperty)) return res

        if(!isEmptyArray(nodeData.property.emplIds))
        {
            res.properties.approvers = nodeData.property.emplIds.map(key=>({userId: key,userName: ''}))             
        }  
        if(res.type == 'condition')
        {
            if(nodeProperty.hasOwnProperty('conditionsConf') && !isEmpty(nodeProperty.conditionsConf))
            { 
                res.content = nodeProperty.conditionsConf.isDefault == 1? '其他情况进入此流程' : nodeData.nodeDisplayName
                res.properties.title = nodeData.nodeName
                res.properties.priority = nodeProperty.conditionsConf.sort
                res.properties.isDefault=nodeProperty.conditionsConf.isDefault == 1? true :false
                
                let paramTypes= nodeProperty.conditionsConf.conditionParamTypes
                if(!isEmptyArray(paramTypes))
                { 
                    for(let i_type in paramTypes)
                    {  
                        switch(paramTypes[i_type]){
                            case formidConfig.formIdOrganizationType:
                              res.properties.conditions.push({formId:paramTypes[i_type],conditionValue:nodeProperty.conditionsConf.organizationIds })  
                              break
                            case formidConfig.formIdeducationType: 
                              res.properties.conditions.push({formId:paramTypes[i_type],conditionValue:nodeProperty.conditionsConf.educationType[0] })  
                              break
                            case formidConfig.formIdAccountType: 
                              res.properties.conditions.push({formId:paramTypes[i_type],conditionValue:nodeProperty.conditionsConf.accountType[0] })  
                              break
                            default:
                              console.log("FormatDisplayUtils.createNodeDisplay 未匹配到formId对应的值",JSON.stringify(i_type))
                        }  
                    }
                }
            }
        } 
        return res           
    }
    /**
   * 获取节点类型 
   * @param { Object } node - 节点数据
   * @returns String
   */
    static getNodeType ( node ) {  
        switch(node.nodeType) {
            case 1:
                return 'start' 
            case 2:
                return 'gateway'
            case 3:
                return 'condition'
            case 4:
                return 'approver' 
            default:
                return node.type
       }         
    }
}