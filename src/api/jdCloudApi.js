/*
 * @Date:  2024-05-25 14:06:59
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2024-07-02 15:52:57
 * @FilePath: /zto-flow/src/api/index.js
 */

import http from '@/utils/axios'
let baseUrl = "http://117.72.70.166:7001/"

/**
 * 获取审批数据
 * @param { Number } id 
 * @returns 
 */
export function getApiWorkFlowData(data) {
  return http.get(`${baseUrl}/bpmnConf/detail/${data.id}`)
}
  
/**
 * 设置审批数据
 * @param {*} data 
 * @returns 
 */
export function setApiWorkFlowData(data) {
  return http.post(`${baseUrl}/bpmnConf/edit`, data)
}


/**
 * 获取用户代办数据列表
 * @param {*} param 
 * @returns 
 */
export function getPenddinglistPage(uaserid,pageDto) {
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': "",
    'userid': uaserid
  };
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": {}
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/5`, data, { headers: headers });
}

/**
 * 获取用户已审批数据列表
 * @param {*} param 
 * @returns 
 */
export function getApprovedlistPage(uaserid,pageDto) {
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': "",
    'userid': uaserid
  };
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": {}
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/4`, data, { headers: headers });
}

/**
 * 获取我发起的流程列表
 * @param {*} param 
 * @returns 
 */
export function getMyRequestlistPage(uaserid,pageDto) {
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': "",
    'userid': uaserid
  };
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": {}
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/3`, data, { headers: headers });
}

/**
 * 获取流程配置数据列表
 * @param {*} param 
 * @returns 
 */
export function getBpmnConflistPage(pageDto) {
  let data = {
    "pageDto": pageDto,
    "entity": { "bpmnType": 1, "bpmnName": "myname" }
  }
  return http.post(`${baseUrl}/bpmnConf/listPage`, data);
}

/**
 * 审批,发起审批
 * @param {*} param 
 * @returns 
 */
export function processOperation(uaserid, data) {

  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': "",
    'userid': uaserid
  };
  return http.post(`${baseUrl}/bpmnConf/process/buttonsOperation?formCode=` + data.formCode, data, { headers: headers });
}

/**
 * 获取审批进度数据
 * @param { Number } id 
 * @returns 
 */
export function getBpmVerifyInfoVos(param) {
  return http.get(`${baseUrl}/bpmnConf/getBpmVerifyInfoVos?processNumber=${param.processNumber}`)
}

/**
 * 获取审批数据列表
 * @param {*} param 
 * @returns 
 */
export function getFlowSchemaList(param) {
  let paramUri = "?type=" + param.type;
  paramUri += "&name=" + param.name;
  paramUri += "&description=" + param.description;
  return http.get(`${apiUrl}/books/${param.currentPage}/${param.pageSize}` + paramUri);
}


