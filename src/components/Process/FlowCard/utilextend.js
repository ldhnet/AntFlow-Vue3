import NodeUtils from "./util.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class UtilExtend {
     /**
   * 创建Node Tree Data 数据
   * @param { String } type - 节点类型
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
    static createNodeExtend ( type, nodeData) {
        let prevIds = [];
        let childIds=[];
        if(!isEmptyArray(nodeData.conditionNodes))
        {
            prevIds = nodeData.conditionNodes.map((item)=>{ return item.nodeId });  
        }else
        {
            prevIds.push(nodeData.nodeId);
        }
        if(!isEmpty(nodeData.childNode))
        {
            childIds.push(nodeData.childNode.nodeId);
        }
        let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
        res.nodeId = NodeUtils.idGenerator()
        res.prevId = nodeData.nodeId
        res.nodeFrom = prevIds
        res.nodeTo = childIds
        return res
    }
    /**
     * 递归解析gateway node中的childNode conditionNodes节点
     * @param { Object } data - 节点数据 
     */
    static depthMapGatewayNode (data,arrList) { 
        console.log('depthMapGatewayNode',JSON.stringify(data))
        let  conditionNodes = data.conditionNodes; 
        if(isEmpty(data.childNode) && isEmptyArray(conditionNodes))
        { 
            arrList.push(data);
        }else if(isEmptyArray(conditionNodes))
        {
            this.depthMapGatewayNode(data.childNode,arrList)
        }else
        {
            for(let i in conditionNodes)
            {
                let  node = conditionNodes[i];
                this.depthMapGatewayNode(node,arrList)
            }
        }
    }
}  
  