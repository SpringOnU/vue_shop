<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 头部警告区域 -->
            <el-alert title="注意：只允许为第三季分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>

            <!-- 选择商品分类区域 -->
            <el-row class="cat_opt">
                <span>选择商品分类</span>
                <!-- 选择商品的级联选择框 -->
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 商品分类列表
            cataList: []
        }
    },
    created() {
        this.getCateList();
    },
    methods: {
        // 获取所有的商品分类列表
        async getCateList() {
            const { data: res } = await this.$http.get('categories')
            console.log(res);
            // 11
            if (res.meta.status !== 200) {
                return this.$message.error('获取列表数据失败');
            }
            this.cataList = res;
        }
    }
}
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
</style>
