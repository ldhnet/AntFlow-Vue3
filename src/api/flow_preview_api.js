import request from '@/utils/request.js'; 

 
 /**
  * 审批流程反向渲染
 */
export const getApprovalFlowData = (flowId) => {
  return request({
    url: '/api/Demo/Get/' + flowId,
    method: 'get',
  });
};
 
export const getBpmnconfDetail = (id) => {
  return request({
    url: '/bpmnConf/detail/' +id,
    method: 'get',
  });
};

/**
* 保存审批流程
 */ 
export const postApprovalFlowData = (data) => {
  return request({
    url: '/ApprovalFlow/save/',
    method: 'post',
    data
  });
};
 

