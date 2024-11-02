/*
 * @Date: 2023-03-29 15:25:37
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-03-29 15:52:38
 * @FilePath: /flow-designer/src/utils/const.js
 */

export let bgColors = ["", '87, 106, 149', '', '', '255, 148, 62', '50, 150, 250']
export let placeholderList = ["发起人", "审核人", "抄送人"];

export let nodeTypeList = ["未知", "发起人", "网关", "条件", "审核人", "抄送人"];

export let setTypes = [
  { value: 1, label: '指定成员' },
  { value: 2, label: '主管' },
  { value: 3, label: '指定角色' },
  //{ value: 4, label: '指定部门' },
  { value: 5, label: '发起人自己' },

]

export let optTypes = [
  { value: '1', label: '小于' },
  { value: '2', label: '大于' },
  { value: '3', label: '小于等于' },
  { value: '4', label: '等于' },
  { value: '5', label: '大于等于' },
  { value: '6', label: '介于两个数之间' },
]

export let opt1s = [
  { value: '<', label: '<' },
  { value: '≤', label: '≤' },
]


export let approveList = {
  1: '张三',
  2: '李四',
  3: '王五',
  4: '菜六',
  5: '牛七',
  6: '马八',
  7: '李九',
  8: '周十',
  9: '肖十一',
  10: '令狐冲',
  11: '风清扬',
  12: '刘正风',
  13: '岳不群',
  14: '宁中则',
  15: '桃谷六仙',
  16: '不介和尚',
  17: '丁一师太',
  18: '依林师妹',
  19: '邱灵珊',
  20: '任盈盈'
}; 

export let statusColor = {
  0: 'info', 
  1: 'primary',//提交
  2: 'primary',//同意
  3: 'danger',//拒绝
  4: 'danger',//撤回
  5: 'danger',//作废
  6: 'danger',//终止
  7: 'primary',//
  8: 'danger',//打回修改
  9: 'primary',//加批
  99: 'success',//处理中
  100: 'info' 
}; ; 