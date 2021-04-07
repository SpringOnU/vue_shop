<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
                <!-- gutter是指栅格间间隔，offset是指栅格左侧的间隔格数 -->
                <!-- 在PC端，设置的这个gutter值为该单元格左右的padding之和 -->
                <el-col :span="8">
                    <div>
                        <el-input placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加商品</el-button>
                </el-col>
            </el-row>

            <!-- 表格区 -->
            <el-table  :data="goodslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="90px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | dataFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 查询参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            goodslist: [],
            total: []
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        // 根据分页获取对应的商品列表
        async getGoodsList() {
            const { data: res } = await this.$http.get('goods', {
                 params: this.queryInfo
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取商品列表失败')
            }
            this.goodslist = res.data.goods
            this.total = res.data.total
        }
    }
}
</script>

<style lang="less" scoped>
    /* scoped防止组件间的样式冲突 */
</style>
