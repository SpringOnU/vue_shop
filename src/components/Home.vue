<template>
    <el-container class='home-container'>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/heima.png" alt=""/>
          <span>电商后台管理系统</span>
        </div>
        <el-button type='info' @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <!-- 侧边栏菜单 -->
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>导航一</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="1-4-1">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>导航一</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!-- 开始的时候这些组件都没办法用 需要在element.js中导入一下才行 -->
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据挂载
      menulist: []
    }
  },
  // 定义生命周期函数
  created() {
    this.getMenuList()// 获取所有左侧菜单
  },
  methods: {
    logout() {
      window.sessionStorage.clear()// 清空token
      this.$router.push('/login')// 重新到login界面
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between; /* 左右贴边 */
    padding-left: 0;
    align-items: center;  /* 垂直居中 */
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main{
    background-color: #eaedf1;
  }
  .home-container{
    height: 100%;
  }
</style>
