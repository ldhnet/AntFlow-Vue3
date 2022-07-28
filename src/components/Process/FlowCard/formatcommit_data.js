import { FlowConditionNodeUtils } from "./flowformid.config.js";
import { NodeUtils } from "../FlowCard/util.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class FormatUtils {
    
    /**
     * 对基础设置,高级设置等设置页内容进行格式化
     * @param params
     */
     static formatSettings(param){
        let treeList = this.depthMapTree(param.processData);
        //let advancedSetting = param.advancedSetting;
        let basicSetting=param.basicSetting; 
        let finalObj={
            bpmnCode : basicSetting.bpmnCode,
            bpmnName : basicSetting.flowName, 
            formCode :basicSetting.formCode,
            deduplicationType :basicSetting.deduplicationType,//2去重,1不去重
            remark :basicSetting.flowRemark,
            nodes:treeList
        }

        console.log("final object最终对象"+JSON.stringify(finalObj)); 
        //console.log("formatSettings-2", JSON.stringify(treeList));
        return finalObj;
    }

     /**
   * 解析Node Tree Data 数据
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
    static depthMapTree (treeData) {
        //console.log('treeData====',JSON.stringify(treeData)); 
        let  arrList=[];
        let  node = createNode(treeData);
        arrList.push(node);
        if(!isEmpty(treeData.childNode))
        {
            this.depthMapChildNode(treeData.childNode,arrList); 
        }
        if(!isEmptyArray(treeData.conditionNodes))
        {
            this.depthMapConditionNodes(treeData.conditionNodes,arrList);
        }  
        // console.log('arrList-length-2',arrList.length);
        //console.log('arrList-2',JSON.stringify(arrList)); 
        return arrList
    }

    /**
   * 递归解析node中的childNode 节点
   * @param { Object } data - 节点数据 
   */
    static depthMapChildNode (data,arrList) { 
        let  node = createNode(data);
        arrList.push(node);  

        if(!isEmpty(data.childNode))
        {
            this.depthMapChildNode(data.childNode,arrList);
        }
        if(!isEmptyArray(data.conditionNodes))
        {
            this.depthMapConditionNodes(data.conditionNodes,arrList);
        }
      
    }
    /**
   * 递归解析node中的conditionNodes 节点
   * @param { Object } data - 节点数据 
   */
    static depthMapConditionNodes (data,arrList) {    
        for(let i in data)
        {
            let  node = createNode(data[i]);    
            arrList.push(node); 
            if(!isEmpty(data[i].childNode))
            { 
                this.depthMapChildNode(data[i].childNode,arrList);
            }
        }
    } 
}   
/**
* 创建节点
* @param { Object } nodeinfo - 节点 
* @returns Array
*/
const createNode = (nodeinfo)=>{
    const transformedType = NodeUtils.getNodeTypeInt(nodeinfo); 
    let node = {
        nodeType: transformedType,
        nodeDisplayName:nodeinfo.content,
        nodeName: nodeinfo.properties?.title,
        nodeId: nodeinfo.nodeId,
        nodeFrom: nodeinfo.prevId,
        prevId: nodeinfo.nodeFrom,
        nodeTo: nodeinfo.nodeTo, 
        nodeProperty: nodeinfo.nodeProperty
    };
    let properties = nodeinfo.properties
    let property = {}
    if (transformedType== 6) {//抄送人节点
        node.nodeProperty = 5
        const copyUser = properties.menbers;
        if(copyUser){
            var emplIds = copyUser.map(a => a.userId);
            property.emplIds = emplIds; 
            node.property = property; 
        }
    }
    else if (transformedType==4) {//审批人节点
        const approvers = properties.approvers;
        if(approvers){
            var emplIds = approvers.map(a => a.userId);
            property.emplIds = emplIds;
            property.signType = properties.counterSign?1:2;
            node.property = property; 
        }
    }else if(transformedType==3){//条件节点
        var conditions = properties.conditions;
        if(!isEmptyArray(conditions)){
            //const condition = conditions[0];
            let conditionsConf= FlowConditionNodeUtils.getConditionConfNode(conditions)
            conditionsConf.conditionParamTypes= conditions.map(c=>(c.formId))
            conditionsConf.sort=properties.priority;  

            conditionsConf.jobLevelVo = null;
       
            conditionsConf.isDefault= properties.isDefault ? 1 : 0;
            property.conditionsConf=conditionsConf;
            node.property=property;
        }else{
            let conditionsConf={};
            conditionsConf.sort=properties.priority;
            conditionsConf.isDefault=1;
            property.conditionsConf=conditionsConf;
            node.property=property;
        }
    }
    return node;
} 