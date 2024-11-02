export default {
    "code": "200",
    "msg": "success",
    "data": {
        "flowId": 1,
        "workFlowDefinition": {
            "name": "合同审批流程设计" //审批名称
        },
        "directorMaxLevel": 3,//审批主管最大层级
        "flowPermission": [],//流程权限
        "nodeConfig": {
            "nodeId": "Gb2", //节点Id
            "nodeName": "发起人66",//节点标题
            "nodeDisplayName": "发起人66",//节点显示
            "nodeType": 1,// 1发起人 2 网关 3条件 4审批 6抄送人
            "nodeFrom": "",  
            "nodeTo": [],
            "priorityLevel": "",// 条件优先级
            "setType": "", 
            "directorLevel": "", //审批终点   第n层主管
            "signType": "",//多人审批时采用的审批方式 1依次审批 2会签
            "noHeaderAction": "",
            "ccFlag": "",//允许发起人自选抄送人
            "conditionList": [],//当审批单同时满足以下条件时进入此流程
            "nodeApproveList": [],//审批人集合
            "childNode": {
                "nodeId": "y270h5", 
                "nodeName": "审核人",
                "error": false,//校验是否通过
                "nodeType": 4, 
                "nodeFrom": "",  
                "nodeTo": [],
                "setType": 2, 
                "directorLevel": 1,
                "signType": 1,
                "noHeaderAction": 2,
                "childNode": {
                    "nodeId": "9u60h5",
                    "nodeName": "网关节点",
                    "nodeType": 2,
                    "nodeFrom": "",  
                    "nodeTo": [],
                    "priorityLevel": 1,
                    "setType": 1,
                    "directorLevel": 1,
                    "signType": 1,
                    "noHeaderAction": 2,
                    "ccFlag": 1,
                    "conditionList": [],
                    "nodeApproveList": [],
                    "childNode": {
                        "nodeId": "5UMcT",
                        "nodeName": "抄送人",
                        "error": false,
                        "nodeType": 5,
                        "nodeFrom": "",  
                        "nodeTo": [],
                        "ccFlag": 1,
                        "childNode": null,
                        "nodeApproveList": []
                    },
                    "conditionNodes": [
                        {
                            "nodeId": "r170h5",
                            "nodeName": "条件1",
                            "error": false,
                            "nodeType": 3,
                            "nodeFrom": "",  
                            "nodeTo": [],
                            "priorityLevel": 1,
                            "setType": 1,
                            "directorLevel": 1,
                            "signType": 1,
                            "noHeaderAction": 2,
                            "ccFlag": 1,
                            "conditionList": [ //当前条件
                                {
                                    "formId": 0,//条件表单的Id
                                    "type": 1,  //1 发起人 2其他
                                    "optType": "",//["", "<", ">", "≤", "=", "≥"][optType]
                                    "zdy1": "", //条件是数值类型 "<", ">", "≤", "=", "≥"判断
                                    "zdy2": "",
                                    "opt1": "",
                                    "opt2": "",
                                    "columnDbname": "",//条件字段名称
                                    "columnType": "",//条件字段类型
                                    "showType": "",//1：数值输入框 2：下拉框 3：Checkbox复选框多选 
                                    "showName": "",//条件展示名
                                    "fixedDownBoxValue": ""//下拉框,多选 的条件json字符串
                                }
                            ],
                            "nodeApproveList": [
                                {
                                    "targetId": 1,//用户id
                                    "type": 1,// 审批人设置 1指定成员 2主管 3指定角色  5发起人自己 
                                    "name": "张三"
                                }
                            ],
                            "childNode": {
                                "nodeId": "ble98k",
                                "nodeName": "审核人",
                                "error": false,
                                "nodeType": 4,
                                "nodeFrom": "",  
                                "nodeTo": [],
                                "priorityLevel": 1,
                                "setType": 1,
                                "directorLevel": 1,
                                "signType": 1,
                                "noHeaderAction": 2,
                                "ccFlag": 1,
                                "conditionList": [],
                                "nodeApproveList": [
                                    {
                                        "targetId": 2,//用户id
                                        "type": 1,// 审批人设置 1指定成员 2主管 3指定角色  5发起人自己 
                                        "name": "李四"
                                    }
                                ],
                                "childNode": {},
                                "conditionNodes": []
                            },
                            "conditionNodes": []
                        },
                        {
                            "nodeId": "qb7abt",
                            "nodeName": "条件2", 
                            "error": false,
                            "nodeType": 3,
                            "nodeFrom": "",  
                            "nodeTo": [], 
                            "priorityLevel": 2,
                            "setType": 1,
                            "directorLevel": 1,
                            "signType": 1,
                            "noHeaderAction": 2,
                            "ccFlag": 1,
                            "conditionList": [],
                            "nodeApproveList": [],
                            "childNode": {},
                            "conditionNodes": []
                        }
                    ]
                },
                "nodeApproveList": [  {
                    "targetId": 12,
                    "type": 2,
                    "name": "第2主管"
                }]
            },
            "conditionNodes": []
        }
    }
}