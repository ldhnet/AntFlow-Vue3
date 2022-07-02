import formidConfig from "@/config/flowformid.config.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class FormatUtils {
    
    /**
     * 对基础设置,高级设置等设置页内容进行格式化
     * @param params
     */
     static formatSettings(param,treeList){
        let advancedSetting = param.advancedSetting;
        let basicSetting=param.basicSetting;
        let deduplicationType=basicSetting.deduplicationType;//2去重,1不去重
        let bpmnName=basicSetting.flowName;
        let formCode="DSFZH_WMA";//测试先写死,后面需要添加字段
        let remark=basicSetting.flowRemark;
        let finalObj={
            bpmnName,formCode,deduplicationType,remark,nodes:treeList
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
        console.log('arrList-2',JSON.stringify(arrList)); 
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
    let transformedType;
    switch (nodeinfo.type) {
        case "start":
            transformedType = 1
            break;
        case "gateway":
            transformedType = 2
            break
        case "condition":
            transformedType = 3
            break
        case "approver":
            transformedType = 4
            break
    }
    let node = {
        nodeType: transformedType,
        nodeDisplayName:nodeinfo.content,
        nodeName: nodeinfo.properties?.title,
        nodeId: nodeinfo.nodeId,
        nodeFrom: nodeinfo.prevId,
        prevId: nodeinfo.nodeFrom,
        nodeTo: nodeinfo.nodeTo,
    };
    let properties = nodeinfo.properties
    let property = {}
    if (transformedType==4) {//审批人节点
        const approvers = properties.approvers;
        if(approvers){
            var emplIds = approvers.map(a => a.userId);
            property.emplIds = emplIds;
            property.signType = properties.counterSign?1:2;
            node.property = property;
            node.nodeProperty=5;
        }
    }else if(transformedType==3){//条件节点
        var conditions = properties.conditions;
        if(!isEmptyArray(conditions)){

            //const condition = conditions[0];
            let conditionsConf={};
            conditionsConf.conditionParamTypes= conditions.map(c=>(c.formId))
            conditionsConf.sort=properties.priority; 

            conditionsConf.organizationIds = [];
            conditionsConf.educationType= [];
            conditionsConf.jobLevelVo = null;
            conditionsConf.accountType = [];

            for(let i in conditions)
            { 
                switch(conditions[i].formId){
                    case formidConfig.formIdOrganizationType:
                        conditionsConf.organizationIds = conditions[i].conditionValue
                      break
                    case formidConfig.formIdeducationType: 
                        conditionsConf.educationType.push(conditions[i].conditionValue)
                      break
                    case formidConfig.formIdAccountType: 
                        conditionsConf.accountType.push(conditions[i].conditionValue) 
                      break
                    default:
                       console.log("FormatUtils.createNode 未匹配到formId对应的值",JSON.stringify(conditions[i]))
                }   
            }  
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