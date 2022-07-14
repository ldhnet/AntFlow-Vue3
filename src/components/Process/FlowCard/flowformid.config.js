
const isEmpty = data => data === null || data === undefined || data === ''
const isEmptyArray = data => Array.isArray(data) ? data.length === 0 : true
/**
 * @description 流程条件formId 对应值配置
 * @author Ant 574427343@qq.com
 */

const ConditionTypeConfig = {
  // 选择分公司
  formIdOrganizationType: 3,
  //账号类型
  formIdAccountType: 4,
  //学历
  formIdeducationType: 5,
};
export class FlowConditionNodeUtils {
  /**
  * 获取条件节点 审批类型 映射 
  * @param { object } conditionNode - 子节点
  * @returns String
  */
  static getConditionParamTypes(conditionNode) {
    let conditions = []
    let paramTypes = conditionNode.conditionParamTypes
    if (conditionNode.hasOwnProperty('conditionParamTypes') && !isEmptyArray(paramTypes)) {
      for (let i_type in paramTypes) {
        switch (paramTypes[i_type]) {
          case ConditionTypeConfig.formIdOrganizationType:
            conditions.push({ formId: paramTypes[i_type], conditionValue: conditionNode.organizationIds })
            break
          case ConditionTypeConfig.formIdeducationType:
            conditions.push({ formId: paramTypes[i_type], conditionValue: conditionNode.educationType[0] })
            break
          case ConditionTypeConfig.formIdAccountType:
            conditions.push({ formId: paramTypes[i_type], conditionValue: conditionNode.accountType[0] })
            break
          default:
            console.log("FlowConditionNodeUtils.getConditionParamTypes 未匹配到formId对应的值", JSON.stringify(i_type))
        }
      }
    }
    return conditions;
  }

  /**
  *  获取条件节点 审批类型 映射   
  * @param { Array } conditions - 数组
  * @returns String
  */
  static getConditionConfNode(conditions) { 
    let conditionNode = {
      organizationIds: [],
      educationType: [],
      accountType: [],
    }
    if (!isEmptyArray(conditions)) {
      for (let i in conditions) {
        switch (Number(conditions[i].formId)) {
          case ConditionTypeConfig.formIdOrganizationType:
            conditionNode.organizationIds = conditions[i].conditionValue
            break
          case ConditionTypeConfig.formIdeducationType:
            conditionNode.educationType.push(conditions[i].conditionValue)
            break
          case ConditionTypeConfig.formIdAccountType:
            conditionNode.accountType.push(conditions[i].conditionValue)
            break
          default:
            console.log("FlowConditionNodeUtils.getConditionConfNode 未匹配到formId对应的值", JSON.stringify(conditions[i]))
        }
      }
    }
    return conditionNode;
  }
}