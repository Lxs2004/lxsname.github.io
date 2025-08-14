<template>

    <el-input v-model="name" style="width: 240px" placeholder="Please input" />
    <el-button type="primary"@click="chaxun">查询</el-button>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="yuangid" label="yuangid" width="180" />
    <el-table-column prop="kaoqitype" label="kaoqitype" width="180" />
    <el-table-column prop="beizhu" label="beizhu" />
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

</template>



<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
const message = ref('Hello, Vue 3!');
// 定义列表
const tableData=ref([])
const pageSize4=ref(10)
const currentPage4=ref(1)
const total=ref(0)
const name=ref('')
const yuangid=ref('')

function chaxun() {
    axios.get('http://localhost:8000/kaochaxun/',{
        params:{
            yuangid:yuangid.value
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
    axios.get('http://localhost:8000/kaochaxun/',{
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
});

// 在组件卸载前执行的操作
onUnmounted(() => {
    // Your code here
});
</script>