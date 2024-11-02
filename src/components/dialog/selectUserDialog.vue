<template>
   <!-- 授权用户 -->
   <el-dialog title="选择用户" v-model="visibleDialog" style="width: 800px !important;" append-to-body>
      <el-row  :gutter="10"> 
        <el-col :span="16">
            <p class="tip">人员列表</p>
            <div style="margin-top: 10px;"> 
                  <el-form :model="queryParams" ref="queryRef" :inline="true">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input
                          v-model="queryParams.userName"
                          placeholder="请输入用户名称"
                          clearable
                          style="width: 150px"
                          @keyup.enter="handleQuery"
                        />
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="handleQuery">搜索</el-button> 
                    </el-form-item>
                  </el-form>
                  <el-table ref="refTable" :data="userList" border height="260px">
                    <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
                      <template #default="scope"> 
                        <el-button link type="primary" @click="handleSelectUser(scope.row)" >
                          添加
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="用户名称" prop="userName" :show-overflow-tooltip="true" /> 
                    <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true" /> 
                    <el-table-column label="状态" align="center" prop="status">
                      <template #default="scope">
                          <el-tag> {{ scope.row.status === '0' ? '正常' : '停用' }}</el-tag>
                      </template>
                    </el-table-column> 
                </el-table>          
              </div>
        </el-col>
        <el-col :span="8">
          <p class="tip">已选中列表</p>
          <el-table  ref="selectedTable" :data="checkedUsersList" border height="310px">   
            <el-table-column label="操作" width="60" align="center" class-name="small-padding fixed-width">
              <template #default="scope"> 
                <el-button link type="primary" @click="handleRemove(scope.row)" >移除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="用户名称" prop="userName" :show-overflow-tooltip="true" />  
          </el-table>
        </el-col>
      </el-row>
      <template #footer>
         <div class="dialog-footer">
            <el-button type="primary" @click="saveDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup name="selectUserDialog"> 
import { ref,reactive,watch,computed } from 'vue';
import { ElMessage } from 'element-plus';  
import { getEmployees } from '@/api/index';
let emits = defineEmits(['update:visible','change']) 
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default:()=> []
  }
});  

const userList = ref([]);
const total = ref(0); 
let checkedUsersList = ref([]);

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10, 
  userName: undefined,
  phonenumber: undefined
});
let visibleDialog = computed({
  get() {
    return props.visible
  },
  set() {
    closeDialog()
  }
}); 
 
watch(()=> props.visible,(newVal) => { 
  if(newVal){ 
      checkedUsersList.value = props.data.map(item => {
              return {
                      userId:item.targetId,
                      userName:item.name
              }
          }) 
      } 
}) 
// 查询表数据
function getList() {
   getEmployees(queryParams).then(res => { 
    userList.value = res.data;
    total.value = res.total;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1;
  getList();
} 

/** 选择授权用户操作 */
function handleSelectUser(row) {  
  if (!row || row.userId == "") { 
    ElMessage.error("请选择用户");
    return;
  }   
  if (checkedUsersList.value.some(c=>c.userId == row.userId)) { 
    ElMessage.error("用户已被选中");
    
  }else {
    checkedUsersList.value.push(row); 
  } 
}
/** 移除选中用户操作 */
function handleRemove(row) {   
  if (checkedUsersList.value.some(c=>c.userId == row.userId)) {
    checkedUsersList.value = checkedUsersList.value.filter(item => item.userId !=row.userId); 
  }else { 
    ElMessage.error("用户已被移除");
  } 
}
/**
 * 确认/保存
 */
let saveDialog = ()=> {
  let checkedList = [ 
    ...checkedUsersList.value
  ].map(item=>({
    type: 1,
    targetId: item.userId,
    name: item.userName
  })) 
  emits('change',checkedList) 
}

getList();

/**
 * 关闭弹窗
 */
 const closeDialog = () => {
   checkedUsersList.value = []
   emits('update:visible', false) 
}

</script>
<style lang="css" scoped>
.tip {
    padding: 8px 16px;
    background-color: rgb(197.7, 225.9, 255); 
    border-left: 5px solid #409eff; 
}
</style>