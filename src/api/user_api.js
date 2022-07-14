import request from '@/utils/request.js'; 
/**
* 获取人员接口
 */ 

export const getUserList = (data) => {
    return request({
      url: '/user/queryUserByNameFuzzy?userName='+data,
      method: 'get',
    });
  };

export const getDeptList=(data)=>{
    return request({
        url:"/basal/queryCompanyByNameFuzzy",
        method:'get'
    });
};