<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">    <!-- 数据绑定  千万还要注意顺序-->
            <!-- ref="loginFormRef" 可以对所有内容框进行引用 拿到el-from的实例对象 可以直接调用“resetFields”=>对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                 :model 双向数据绑定-->
                <el-form-item prop="username">  <!-- 用户名 -->
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
                <el-form-item prop="password"> <!-- 密码 -->
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns"> <!-- 按钮 -->
                    <el-button type="primary">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                    <!-- @click=" " 绑定单击重置事件 -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'zx',
        password: '1234'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    // 点击重置按钮 重置登录表单
    resetLoginForm () {
      // console.log(this) 可以引用访问$refs
      this.$refs.loginFormRef.resetFields()
      // 调用resetFields函数代码
    }
  }
}
</script>

<style lang="less" scoped>
// scoped 只在当前组件内生效
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd; // 向外扩散10px
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {   // 盒子内置样式
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
