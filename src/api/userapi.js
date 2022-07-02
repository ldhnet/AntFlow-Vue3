import request from '@/utils/request.js'; 
/**
* 获取人员接口
 */ 

export const getUserList = () => {
    return request({
      url: '/user/queryUserByNameFuzzy',
      method: 'get',
    });
  };