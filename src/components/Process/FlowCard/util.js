import nodeConfig from "./config.js";
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray( data ) ? data.length === 0 : true

export class NodeUtils {
 
  /**
   * 根据自增数生成64进制id
   * @returns 64进制id字符串
   */
  static idGenerator () {
    let qutient = (new Date() - new Date('2022-05-01'))
    qutient += Math.ceil(Math.random() * 1000) // 防止重複
    const chars = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz';
    const charArr = chars.split( "" )
    const radix = chars.length;
    const res = []
    do {
      let mod = qutient % radix;
      qutient = ( qutient - mod ) / radix;
      res.push( charArr[mod] )
    } while ( qutient );
    return res.join( '' )
  }
  /**
   * 判断节点类型
   * @param {Node} node - 节点数据
   * @returns Boolean
   */
  static isConditionNode ( node ) {
    return node && node.type === 'condition'
  }
  static isCopyNode ( node ) {
    return node && node.type === 'copy'
  }
  static isStartNode ( node ) {
    return node && node.type === 'start'
  }
  static isApproverNode ( node ) {
    return node && node.type === 'approver'
  }
  static isGatewayNode ( node ) {
    return node && node.type === 'gateway'
  }
  /**
   * 创建指定节点
   * @param { String } type - 节点类型
   * @param { Object } previousNodeId - 父节点id
   * @returns { Object } 节点数据
   */
  static createNode ( type, previousNodeId ) {
    let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
    res.nodeId = this.idGenerator()
    res.prevId = previousNodeId
    res.nodeFrom = []
    res.nodeTo = []
    return res
  }
    /**
   * 创建Node Tree Data 数据
   * @param { String } type - 节点类型
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
     static createNodeExtend ( type, nodeData) {       
      let prevIds = [];
      if(!isEmptyArray(nodeData.conditionNodes))
      {
          prevIds = nodeData.conditionNodes.map((item)=>{ return item.nodeId });  
      }else
      {
          prevIds.push(nodeData.nodeId);
      }
      let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
      res.nodeId = this.idGenerator()
      res.prevId = nodeData.nodeId
      res.nodeFrom = prevIds
      res.nodeTo = []
      return res
    }
     /**
   * 创建网关下 条件节点
   * @param { String } type - 节点类型
   * @param { Object } treeData - 节点数据
   * @returns Array
   */
    static createConditionNodeExtend ( type, nodeData) {    
      if(type != 'condition')
      {
        console.log('创建 条件出错！');
        return;
      }
      let res = JSON.parse( JSON.stringify( nodeConfig[type] ) )
      res.nodeId = this.idGenerator()
      res.prevId = nodeData.nodeId
      res.nodeFrom = [nodeData.nodeId]
      res.nodeTo = []
      return res
    }
     
  /**
   * 获取指定节点 下的最后一级节点
   * @param { String } nodeData - 指定节点 
   * @returns { Array } 最后一级节点数组
   */
  static getDeptNodeInfo ( nodeData  ) { 
    let getdeptNodesArray=[]
    if(nodeData.type != 'gateway')
    {
      getdeptNodesArray.push(nodeData)
    }
    else
    {
      for(let i in nodeData.conditionNodes)
      {
        this.depthMapNodeTree(nodeData.conditionNodes[i],getdeptNodesArray)
      }
    } 
    return getdeptNodesArray
  } 
  static depthMapNodeTree ( currentNode , resultData ) { 
    if ( currentNode.childNode ) {
      this.depthMapNodeTree( currentNode.childNode, resultData )
    }
    else if ( currentNode.conditionNodes ) {
      for ( let c in currentNode.conditionNodes ) {
        this.depthMapNodeTree( currentNode.conditionNodes[c], resultData )
      }
    } 
    if(isEmpty(currentNode.childNode) && isEmptyArray(currentNode.conditionNodes))
    {
      resultData.push(currentNode);
    }
  }
  
  /**
   * 获取指定节点的父节点（前一个节点）
   * @param { String } prevId - 父节点id
   * @param { Object } processData - 流程图全部数据
   * @returns { Object } 父节点
   */
  static getPreviousNode ( prevId, processData ) {
    if ( processData.nodeId === prevId ) return processData
    if ( processData.childNode ) {
      let r1 = this.getPreviousNode( prevId, processData.childNode )
      if ( r1 ) {
        return r1
      }
    }
    if ( processData.conditionNodes ) {
      for ( let c of processData.conditionNodes ) {
        let r2 = this.getPreviousNode( prevId, c )
        if ( r2 ) {
          return r2
        }
      }
    }
  }
  /**
   * 删除节点
   * @param { Object  } nodeData - 被删除节点的数据
   * @param { Object  } processData - 流程图的所有节点数据
   */
  static deleteNode ( nodeData, processData, checkEmpty = true ) { 
    let prevNode = this.getPreviousNode( nodeData.prevId, processData )
  
    let concatChild = ( prev, delNode ) => {
      prev.nodeTo=delNode.nodeTo //修改原父节点 的 nodeTo 数据  
      concatPrevAndChild(prev, delNode);
    }

    let v1_updateChildNodeForGateway = ( delGatewayNode, processData ) => {
      let prevForGateway =  this.getPreviousNode( delGatewayNode.prevId, processData )
      let allChildNode= this.getDeptNodeInfo(delGatewayNode)    
      prevForGateway.nodeTo = allChildNode[0].nodeTo //修改原父节点 的 nodeTo 数据  
      concatPrevAndChild(prevForGateway,delGatewayNode)
      //console.log('delete=====processData====',JSON.stringify(processData));
    }

    let concatPrevAndChild = ( prev, delNode ) => {
      if(!isEmpty(delNode.childNode))
      {
          prev.childNode = delNode.childNode 
          prev.childNode.prevId=prev.nodeId  //修改原子节点的 nodeFrom 数据
          prev.childNode.nodeFrom = [prev.nodeId]
      }else{
        delete prev.childNode 
      }
    }

    let updateChildNodeFrom = ( prev, delNode ) => {
      prev.nodeTo = prev.nodeTo.filter(m=> { return m != delNode.nodeId })
      for(let i in  delNode.nodeTo)
      {
        let childNodeInfo = this.getPreviousNode( delNode.nodeTo[i], processData )
        if(isEmpty(childNodeInfo)) return
        childNodeInfo.nodeFrom = childNodeInfo.nodeFrom.filter(key=> { return key != delNode.nodeId })
      }      
      //console.log('delete=====processData====',JSON.stringify(processData));
    }

    let updateGatewayChildNode = ( prev, delNode ) =>
    {
      //修改原父节点的 nodeTo 数据
      for(let fid in delNode.nodeFrom)
      { 
        let nodeInfo = this.getPreviousNode( delNode.nodeFrom[fid], processData ) 
        if(isEmpty(nodeInfo)) return 
        nodeInfo.nodeTo = delNode.nodeTo
      }            
      if(!isEmpty(delNode.childNode))
      {
        //修改原子节点的 nodeFrom
        let allConditionNode= this.getDeptNodeInfo(prev) 
        delNode.childNode.prevId = prev.nodeId
        delNode.childNode.nodeFrom = allConditionNode.map(c=> { return c.nodeId})
        prev.childNode = delNode.childNode 
      } 
      else
      {
        delete prev.childNode
      }
    }
    let V2_updateChildNodeFrom = ( prevNode, anotherCon ) => {
      if ( prevNode.childNode ) {
        let endNode = anotherCon
        while ( endNode.childNode ) {
          endNode = endNode.childNode
        }
        endNode.childNode = prevNode.childNode
        endNode.childNode.prevId = endNode.nodeId
        if (endNode.childNode && endNode.childNode.type === 'gateway') {

          let lastChildNodes= this.getDeptNodeInfo(endNode.childNode)    
          endNode.childNode.nodeFrom=lastChildNodes
        }else
        {
          endNode.childNode.nodeFrom = [endNode.nodeId]
        }
      }
      V2_concatChild( prevNode, anotherCon )
    }
    let V2_concatChild = ( deletePrev, delNode ) => {
      if(isEmpty(delNode.childNode)) return
      let prev = this.getPreviousNode( deletePrev.prevId, processData )  
      prev.childNode = delNode.childNode
      prev.childNode.prevId = prev.nodeId

      if (prev.type === 'gateway') {        
        let lastChildNodes= this.getDeptNodeInfo(prev)   

        lastChildNodes = lastChildNodes.map(c=> c.nodeTo = [prev.childNode.nodeId]) //改变原父节点 nodeTo 数据           
        prev.childNode.nodeFrom = lastChildNodes.map(c=> { return c.nodeId})
      }else
      {
        prev.nodeTo=[prev.childNode.nodeId]
        prev.childNode.nodeFrom = [prev.nodeId]
      }
    }

    if ( checkEmpty && prevNode.type === 'gateway' ) {
        if ( this.isConditionNode( nodeData ) ) {
          let cons = prevNode.conditionNodes
          let index = cons.findIndex( c => c.nodeId === nodeData.nodeId )
          if ( cons.length > 2 ) {
            //修改子节点的 nodeFrom 数据
            cons.splice( index, 1 ) 
            updateChildNodeFrom(prevNode, nodeData)   
            console.log('delete=====processData==1111==',JSON.stringify(processData));       
          } else { 
            // //方案一全删节点
            // v1_updateChildNodeForGateway(prevNode,processData) 

            //方案二 保留一支分支
            let anotherCon = cons[+( !index )]
            delete prevNode.conditionNodes
            V2_updateChildNodeFrom(prevNode,anotherCon)

            console.log('delete=====processData==2222==',JSON.stringify(processData));
            return
          }
          // 重新编排优先级
          cons.forEach( ( c, i ) => c.properties.priority = i )
          console.log('delete=====processData==3333==',JSON.stringify(processData));
          return
        }
        else
        { 
           updateGatewayChildNode(prevNode,nodeData) 
           console.log('delete=====processData==4444==',JSON.stringify(processData));
           return
        }
    }
    concatChild( prevNode, nodeData ) 
  }
  /**
   * 添加审计节点（普通节点 approver）
   * @param { Object } data - 目标节点数据，在该数据节点之后添加审计节点
   * @param { Object } isBranchAction - 目标节点数据，是否是条件分支
   * @param { Object } newChildNode - 传入的新的节点 用户操作均为空  删除操作/添加抄送人 会传入该参数 以模拟添加节点
   */
  static addApprovalNode ( data, isBranchAction, newChildNode = undefined ) { 
    let changeChildNode = ( oldNode, newNode ) => {
      if ( !isEmpty(oldNode) ) {
        newNode.childNode = oldNode
        newNode.nodeTo=[oldNode.nodeId] //新节点 nodeTo 赋值

        oldNode.prevId = newNode.nodeId
        oldNode.nodeFrom = [newNode.nodeId]//改变原子节点 nodeFrom 数据 
      }
    } 
    let oldChildNode = data.childNode 
    const oldNodeTo = data.nodeTo 
    newChildNode = newChildNode || this.createNodeExtend( "approver", data )  
    if(data.type == 'gateway' && !isEmptyArray(data.conditionNodes))
    {     
      let lastNodes= this.getDeptNodeInfo(data)
      newChildNode.nodeTo=lastNodes[0].nodeTo //新节点 nodeTo赋值
      newChildNode.nodeFrom = lastNodes.map(c=>{ return c.nodeId }) //新节点 nodeFrom赋值
      
      lastNodes = lastNodes.map(c=> c.nodeTo = [newChildNode.nodeId]) //改变原父节点 nodeTo 数据  
    }
    else
    {
      data.nodeTo=[]
      newChildNode.nodeTo=oldNodeTo     //新节点 nodeTo 赋值
      data.nodeTo.push(newChildNode.nodeId) //改变原父节点 nodeTo 数据 
    }

    data.childNode = newChildNode 
    changeChildNode(oldChildNode,newChildNode)
    //console.log('addApprovalNode====',JSON.stringify(data))
  }
 
  /**
   * 添加网关节点
   * @param { Object } data - 网关节点的父级节点
   * @return { Object } emptyNode - 空节点数据
   */
   static addGatewayNode ( data ) {
    let gatewayNode = this.createNodeExtend( 'gateway', data )
    this.addApprovalNode( data, true, gatewayNode )
    return gatewayNode
  }
  static addCopyNode ( data, isBranchAction ) {
    // 复用addApprovalNode  因为抄送人和审批人基本一致
    this.addApprovalNode( data, isBranchAction, this.createNode( 'copy', data.nodeId ) )
  }
  /**
   * 添加条件节点 condition 通过点击添加条件进入该操作
   * @param { Object } data - 目标节点所在分支数据，在该分支最后添加条件节点
   */
  static appendConditionNode ( data ) {
    const conditions = data.conditionNodes
    let node = this.createConditionNodeExtend( 'condition', data )
    let defaultNodeIndex = conditions.findIndex( node => node.properties.isDefault )
    node.properties.priority = conditions.length
    if ( defaultNodeIndex > -1 ) {
      conditions.splice( -1, 0, node ) // 插在倒数第二个
      //更新优先级
      node.properties.priority = conditions.length - 2
      conditions[conditions.length - 1].properties.priority = conditions.length - 1
    } else {
      conditions.push( node )
    }
    data.nodeTo.push(node.nodeId) //添加父节点 nodeTo 数据
    let lastNodes= this.getDeptNodeInfo(data)  
    if(!isEmptyArray(lastNodes[0].nodeTo))
    {  
      if(!isEmpty(data.childNode))
      { 
        data.childNode.nodeFrom = lastNodes.map(c=>{return c.nodeId})
      }  
      node.nodeTo = lastNodes[0].nodeTo  //新添加节点的 nodeTo 赋值
    }
    this.setDefaultCondition( node, data )
    console.log('Condition==最终data=====',JSON.stringify(data))
  }
  /**
   * 添加条件分支 branch 
   * @param { Object } data - 目标节点所在节点数据，在该节点最后添加分支节点
   */
  static appendBranch ( data, isBottomBtnOfBranch ) {
    // isBottomBtnOfBranch 用户点击的是分支树下面的按钮
    let gatewayNode = this.addGatewayNode( data, true )
    const oldNodeTo = gatewayNode.nodeTo 
    let conditionNodes = [
      this.createNodeExtend( "condition", gatewayNode ),//修改createNode 为 createNade
      this.createNodeExtend( "condition", gatewayNode )
    ].map( ( c, i ) => {
      c.properties.title += i + 1;
      c.properties.priority = i;
      return c
    } )
    gatewayNode.nodeTo=[]
    gatewayNode.conditionNodes = conditionNodes.map( c => { 
      gatewayNode.nodeTo.push(c.nodeId)
      c.nodeTo = oldNodeTo;//改变原子节点 nodeTo 数据 //data.nodeTo
      return c
    } )
    if(!isEmpty(gatewayNode.childNode))
    {
      let nodeToIds=conditionNodes.map(c=>{return c.nodeId});
      gatewayNode.childNode.prevId = gatewayNode.nodeId;
      gatewayNode.childNode.nodeFrom = nodeToIds;
    }
    console.log('最终===data=====',JSON.stringify(data));
  }
  /**
   * 重设节点优先级（条件节点）
   * @param {Node} cnode - 当前节点
   * @param {Number} oldPriority - 替换前的优先级（在数组中的顺序）
   * @param {Node} processData - 整个流程图节点数据
   */
  static resortPrioByCNode ( cnode, oldPriority, processData ) {
    // 当前节点为默认节点 取消修改优先级
    if ( cnode.properties.isDefault ) {
      cnode.properties.priority = oldPriority
      return
    }
    let prevNode = this.getPreviousNode( cnode.prevId, processData )
    let newPriority = cnode.properties.priority
    // 替换节点为默认节点 取消修改优先级
    if ( prevNode.conditionNodes[newPriority].properties.isDefault ) {
      cnode.properties.priority = oldPriority
      return
    }
    let delNode = prevNode.conditionNodes.splice( newPriority, 1, cnode )[0]
    delNode.properties.priority = oldPriority
    prevNode.conditionNodes[oldPriority] = delNode
  }

  /**
   * 提升条件节点优先级——排序在前
   * @param { Object } data - 目标节点数据
   * @param { Object  } processData - 流程图的所有节点数据
   */
  static increasePriority ( data, processData ) {
    if ( data.properties.isDefault ) {  // 默认节点不能修改优先级
      return
    }
    // 分支节点数据 包含该分支所有的条件节点
    let prevNode = this.getPreviousNode( data.prevId, processData )
    let branchData = prevNode.conditionNodes
    let index = branchData.findIndex( c => c === data )
    if ( index ) {
      // 和前一个数组项交换位置 Array.prototype.splice会返回包含被删除的项的集合（数组）
      branchData[index - 1].properties.priority = index
      branchData[index].properties.priority = index - 1
      branchData[index - 1] = branchData.splice( index, 1, branchData[index - 1] )[0]
    }
  }
  /**
   * 降低条件节点优先级——排序在后
   * @param { Object } data - 目标节点数据
   * @param { Object  } processData - 流程图的所有节点数据
   */
  static decreasePriority ( data, processData ) {
    // 分支节点数据 包含该分支所有的条件节点
    let prevNode = this.getPreviousNode( data.prevId, processData )
    let branchData = prevNode.conditionNodes
    let index = branchData.findIndex( c => c.nodeId === data.nodeId )
    if ( index < branchData.length - 1 ) {
      let lastNode = branchData[index + 1]
      if ( lastNode.properties.isDefault ) {  // 默认节点不能修改优先级
        return
      }
      // 和后一个数组项交换位置 Array.prototype.splice会返回包含被删除的项的集合（数组）
      lastNode.properties.priority = index
      branchData[index].properties.priority = index + 1
      branchData[index + 1] = branchData.splice( index, 1, branchData[index + 1] )[0]
    }
  }
  /**
 * 当有其他条件节点设置条件后 检查并设置最后一个节点为默认节点
 * @param {Node} cnode  - 当前节点
 * @param {Node} processData - 整个流程图节点数据或父级节点数据
 */
  static setDefaultCondition ( cnode, processData ) {
    const DEFAULT_TEXT = '其他情况进入此流程'
    const conditions = this.getPreviousNode( cnode.prevId, processData ).conditionNodes
    const hasCondition = node => node.properties && ( node.properties.initiator || !isEmptyArray( node.properties.conditions ) )
    const clearDefault = node => {
      node.properties.isDefault = false
      node.content === DEFAULT_TEXT && ( node.content = '请设置条件' )
    }
    const setDefault = node => {
      node.properties.isDefault = true
      node.content = DEFAULT_TEXT
    }
    let count = 0
    conditions.slice( 0, -1 ).forEach( node => {
      hasCondition( node ) && count++
      clearDefault( node )
    } )
    const lastNode = conditions[conditions.length - 1]
    count > 0 && !hasCondition( lastNode ) ? setDefault( lastNode ) : clearDefault( lastNode )
  }
  /**
   * 校验单个节点必填项完整性
   * @param {Node} node - 节点数据
   */
  static checkNode ( node, parent ) {
    // 抄送人应该可以默认自选
    let valid = true
    const props = node.properties
    this.isStartNode( node )
      && !props.initiator
      && ( valid = false )

    this.isConditionNode( node )
      && !props.isDefault
      && !props.initiator
      && isEmptyArray( props.conditions )
      && ( valid = false )

    const customSettings = ['myself', 'optional', 'director']
    this.isApproverNode( node )
      && !customSettings.includes( props.assigneeType )
      && isEmptyArray( props.approvers )
      && ( valid = false )
    return valid
  }
  /**
   * 判断所有节点是否信息完整
   * @param {Node} processData - 整个流程图数据
   * @returns {Boolean}
   */
  static checkAllNode ( processData ) {
    let valid = true
    const loop = ( node, callback, parent ) => {
      !this.checkNode( node, parent ) && callback()
      if ( node.childNode ) loop( node.childNode, callback, parent )
      if ( !isEmptyArray( node.conditionNodes ) ) {
        node.conditionNodes.forEach( n => loop( n, callback, node ) )
      }
    }
    loop( processData, () => valid = false )
    return valid
  }
}

/**
 * 添模拟数据
 */
export function getMockData () {
  let startNode = NodeUtils.createNode( "start",'' );
  //startNode.childNode = NodeUtils.createNode( "approver", startNode.nodeId )
  return startNode;
}

