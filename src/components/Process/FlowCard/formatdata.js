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

        console.log("formatSettings-2", JSON.stringify(treeList));
        return finalObj;
    }

     /**
   * 解析Node Tree Data 数据
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
    static depthMapTree (treeData) {
        console.log('treeData====',JSON.stringify(treeData)); 
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
        // console.log('arrList-2',JSON.stringify(arrList)); 
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
    let  node = {
        nodeType:nodeinfo.type,
        tempName:nodeinfo.content,
        nodeId:nodeinfo.nodeId,
        prevId:nodeinfo.prevId,
        nodeFrom:nodeinfo.nodeFrom,
        nodeTo:nodeinfo.nodeTo,
    }; 
    return node;
}
    
// const isConditionNode =  ( node )=> {
//     return node && node.nodeType === 'condition'
//   }