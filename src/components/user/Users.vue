<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区 -->
            <div style="margin-top: 15px;">
                <el-row :gutter="20">   <!-- gutter格与格之间的空隙 -->
                    <el-col :span="8">
                        <el-input placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>   <!-- span格子的大小 -->
                    <el-col :span="4">
                        <el-button type="primary">添加用户</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 先将get参数定义到data数据中
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            }
        }
    },
    created() { // 发起首批数据请求;
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get('users', { params: this.queryInfo })
            console.log(res);
            // users请求地址 要携带一些get参数 get参数用params来指定 由api文档可知参数包含3个属性 query、pagenum、pagesize
            // await 得到一个数据对象
            // 从这个数据对象上解构得到一个data属性 命名为 res
        }
    }
}
</script>

<style lang="less" scoped>

</style>
