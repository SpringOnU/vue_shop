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
            <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" :show-index="true" index-text="#" border :show-row-hover="false">
                <!-- selection-type复选框 expand-type展开行 show-index索引 show-row-hover高亮-->

                <!-- 是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
                    <i class="el-icon-error" v-else style="color: red"></i>
                </template>

                <!-- 排序 -->
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag type="warning" size="mini" v-else>三级</el-tag>
                </template>

                <!-- 操作 -->
                <template slot="opt"> slot-scope="scope"
                    <el-button type="primary" icon="el-icon-edit"  size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete"  size="mini"> 删除</el-button>
                </template>
            </tree-table>
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
            catelist: [],
            // 总数据条数
            total: 0,
            // 为table指定列的定义
            columns: [{
                label: '分类名称',
                prop: 'cat_name'
            },
            {
                label: '是否有效',
                type: 'template', /* 将当前列定义为模板列 */
                template: 'isok' /* 表示当前这一列使用模板名称 */
            },
            {
                label: '排序',
                type: 'template', /* 将当前列定义为模板列 */
                template: 'order' /* 表示当前这一列使用模板名称 */
            },
            {
                label: '操作',
                type: 'template', /* 将当前列定义为模板列 */
                template: 'opt' /* 表示当前这一列使用模板名称 */
            }]
        }
    },
    created() {
        this.getCateList();
    },
    methods: {
        async getCateList() {
            const { data: res } = await this.$http.get('categories',  {
                params: this.queryInfo
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取信息失败')
            }
            // console.log(res.data)
            // 把数据列表赋值给cateList
            this.catelist = res.data.result
            this.total = res.data.total
        }
    }
}
</script>

<style lang="less" scoped>

</style>
