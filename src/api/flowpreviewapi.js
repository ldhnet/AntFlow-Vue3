import request from '@/utils/request.js'; 
export const getTestData = () => {
  return request({
    url: '/apiFlowData.json ',
    method: 'get',
  });
};
 