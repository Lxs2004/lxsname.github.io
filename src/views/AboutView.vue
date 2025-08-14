<template>
  <!-- 用户输入框 -->
    <el-input v-model="username" style="width: 240px" placeholder="Please input" /><br>
    <!-- 密码输入框 -->
    <el-input v-model="password" style="width: 240px" type="password" placeholder="Please input password" show-password/><br>

    <el-button type="primary"@click="login">登录</el-button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const message = ref('Hello, Vue 3!');
import axios from 'axios';
import { useUserStore } from '@/stores/user'


const username=ref('')
const password=ref('')

const info=ref({
  username:username,
  password:password
})

function login() {
  if (username == ""){
    alert("用户为空")
    return
  }
  if (password == ""){
    alert("密码为空")
    return
  }
  axios.post('http://localhost:8000/login/',info.value)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err); 
  })
}


onMounted(() => {
  // Your code here
  
});

// 在组件卸载前执行的操作
onUnmounted(() => {
  // Your code here
});
</script>
