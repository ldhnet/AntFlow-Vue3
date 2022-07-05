import request from '@/utils/request.js'; 

 
 /**
  * 加载审批人去重配置
 */
  export const getFlowOptions = () => {
    return request({
      url: '/bpmnconf/listOutsideConfs',
      method: 'get',
    });
  };