<template>
     <el-input v-model="name" style="width: 240px" placeholder="Please input" /><br>
      
        <el-select v-model="value" placeholder="Select" style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.bumenname"
        :value="item.id"
      />
    </el-select><br>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" /><br>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
const message = ref('Hello, Vue 3!');

const options=ref([])
const value=ref('')
const name=ref('')


// 添加函数
function add() {
    axios.post('http://localhost:8000/addyuan/',info.value)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}

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
onMounted(() => {
    // Your code here
    fenlei()
});

// 在组件卸载前执行的操作
onUnmounted(() => {
    // Your code here
});
</script>