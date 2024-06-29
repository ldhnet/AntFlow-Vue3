//import {  NodeUtils } from '@/utils/nodeUtils'

export class NodeUtils {
    /**
     * 根据自增数生成64进制id
     * @returns 64进制id字符串
     */
    static idGenerator() {
      let qutient = new Date() - new Date("2024-05-01");
      qutient += Math.ceil(Math.random() * 1000); // 防止重複
      const chars = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz";
      const charArr = chars.split("");
      const radix = chars.length;
      const res = [];
      do {
        let mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        res.push(charArr[mod]);
      } while (qutient);
      return res.join("").toUpperCase();
    }
    
}

/**
 * 添模拟数据
 */
export function getMockData() {
    let startNode = "";//NodeUtils.createNode("start", ""); 
    return startNode;
  }
  