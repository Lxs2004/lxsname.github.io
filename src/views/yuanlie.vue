<template>

    <!-- 输入框 -->
     <el-select v-model="value" placeholder="Select" style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.bumenname"
        :value="item.id"
      />
    </el-select>
      <el-button type="primary"@click="chaxun">查询</el-button>
      <el-button type="primary"@click="tianjia">添加</el-button>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="yuanname" label="姓名" width="180" />
    <el-table-column prop="bumenid" label="部门" width="180" />
    <el-table-column prop="bianhao" label="编号" />
    <el-table-column prop="gongzi" label="薪资" />
    <el-table-column prop="zaitype" label="状态" />
    <el-table-column prop="zaitype" label="状态" >
        <template #default="scope">
      <p v-if="caches='$index'" style="color: darkgray;">离职</p>
      <!-- <p v-if="caches='index'">在职</p> -->
    </template>
    </el-table-column>
     <el-table-column prop="coazhuo" label="操作" > 
        <template #default="scope">
      <el-button type="primary"@click="bianji(scope.row)">编辑</el-button>
      <el-button type="primary"@click="lizhi(scope.row.id)">离职</el-button>
      <el-button type="primary"@click=kaoqin(scope.row)>考勤</el-button>
    </template>
     </el-table-column>
  </el-table>


  <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 编辑弹窗 -->
     <el-dialog
    v-model="dialogVisible"
    title="编辑"
    width="500"
    :before-close="handleClose"
  >
     <el-input v-model="yuanname" style="width: 240px" placeholder="Please input" />
     <el-input v-model="bumenid" style="width: 240px" placeholder="Please input" />
     <el-input v-model="bianhao" style="width: 240px" placeholder="Please input" />
      <el-input v-model="gongzi" style="width: 240px" placeholder="Please input" />
       <el-input v-model="zaitype" style="width: 240px" placeholder="Please input" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

<!-- 考勤 -->
  <el-dialog
    v-model="dialogVisible2"
    title="考勤"
    width="500"
    :before-close="handleClose"
  >
     <el-input v-model="yuangid" style="width: 240px" placeholder="Please input" />
     <el-input v-model="kaoqitype" style="width: 240px" placeholder="Please input" />
     <el-input v-model="beizhu" style="width: 240px" placeholder="Please input" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="submitt">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import Yuangong from './yuangong.vue';
const message = ref('Hello, Vue 3!');
// 考勤
const dialogVisible2=ref(false)

const yuangid=ref('')
const kaoqitype=ref('')
const beizhu=ref('')

// 编辑
const dialogVisible=ref(false)


// 定义查询
const value=ref('')

const options=ref([])
// 定义列表
const tableData=ref([])
const pageSize4=ref(10)
const currentPage4=ref(1)
const total=ref(0)

//添加
function tianjia() {
    router.push('yuangong')
}

// 定义编辑变量
const yuanname=ref('')
const gongzi=ref('')
const zaitype=ref('')
const bumenid=ref('')
const bianhao=ref('')

// 考勤
function kaoqin(data) {
    dialogVisible2.value=true
    console.log(data)
    yuangid.value=data.yuangid
    kaoqitype.value=data.kaoqitype
    beizhu.value=data.beizhu

}

const info4=ref({
    yuangid:yuangid.value,
    kaoqitype:kaoqitype.value,
    beizhu:beizhu.value
})

// 考勤函数
function submitt() {
    axios.post('http://localhost:8000/kaochaxun/',info4.value)
    .then(res => {
        console.log(res)
        router.push('kaoqinll')
    })
    .catch(err => {
        console.error(err); 
    })
}


// 离职
function lizhi(id) {
    const con =confirm
    if (con){
        axios.delete('http://localhost:8000/delete/'+id)
        .then(res => {
            console.log(res)
            lizhi.delete
            alert("离职成功")
            getlie()
        })
        .catch(err => {
            console.error(err); 
        })
    }
    
}


//编辑函数
 function bianji(data) {
    dialogVisible.value=true
    console.log(data)
    yuanname.value=data.yuanname
    gongzi.value=data.gongzi
    zaitype.value=data.zaitype
 }

 const info=ref({
    yuanname:yuanname.value,
    bumenid:bumenid.value,
    bianhao:bianhao.value,
    gongzi:gongzi.value,
    zaitype:zaitype.value
 })

//  修改函数
function submit() {
    axios.put('http://localhost:8000/delete/4/',info.value)
    .then(res => {
        console.log(res)
        tableData.value=res.data.data
        getlie()
    })
    .catch(err => {
        console.error(err); 
    })
}

// 查询函数

function fenlei() {
    axios.get('http://localhost:8000/getbmtable/')
    .then(res => {
        console.log(res)
        options.value=res.data.data
    })
    .catch(err => {
        console.error(err); 
    })
}

// 查询函数
function chaxun() {
    axios.get('http://localhost:8000/chaxun/',{
        params:{
            id:value.value
        }
    })
    .then(res => {
        console.log(res)
        tableData.value=res.data.data
    })
    .catch(err => {
        console.error(err); 
    })
}

// 分页函数
function handleSizeChange(size) {
    pageSize4.value=size
    getlie()
}

function handleCurrentChange(page) {
    currentPage4.value=page
    getlie()
}

// 列表
function getlie() {
    axios.get('http://localhost:8000/chaxun/',{
        params:{
            pang:currentPage4.value,
            page_size:pageSize4.value
        }
    })
    .then(res => {
        console.log(res)
        tableData.value=res.data.data
        total.value=res.data.total
    })
    .catch(err => {
        console.error(err); 
    })
}

onMounted(() => {
    // Your code here
    getlie()
    fenlei()
});

// 在组件卸载前执行的操作
onUnmounted(() => {
    // Your code here
});
</script>