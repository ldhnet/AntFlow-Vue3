import request from '@/utils/request.js'; 
/**
* 获取人员接口
 */ 

export const getUserList = (data) => {
    return request({
      url: 'http://localhost:7001/user/queryUserByNameFuzzy?userName='+data,
      method: 'get',
    });
  };