<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form label-width="0px" class="login_form" :model="form">    <!-- 数据绑定 -->
                <el-form-item>  <!-- 用户名 -->
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
                <el-form-item> <!-- 密码 -->
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns"> <!-- 按钮 -->
                    <el-button type="primary">登录</el-button>
                    <el-button type="info">重置</el-button>
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
      }
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
