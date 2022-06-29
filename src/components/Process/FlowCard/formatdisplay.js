import nodeConfig from "./configdisplay.js";
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
        res.nodeFrom = [res.prevId]
        res.nodeTo = nodeData.nodeTo? nodeData.nodeTo:[]
        if(!isEmpty(nodeData.nodeName))
        {
            res.content = nodeData.nodeName
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