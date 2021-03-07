<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <tree-table :data="catelist" :columns="columns"></tree-table>
            <!-- 分页 -->
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 3
            },
            // 商品分类的数据列表，默认为空
            catelist: []
        }
    },
    create() {
        this.getCateList();
    },
    methods: {
        async getCateList() {
            const { data: res } = await this.$http.get('categories',  {
                params: this.queryInfo
            })
            console.log(res.data)
            if (res.meta.status !== 200) {
                return this.$message.error('获取信息失败')
            }
            console.log(res.data)
            // 把数据列表赋值给cateList
            this.cateList = res.data.result
        }
    }
}
</script>

<style lang="less" scoped>

</style>
