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
                <el-col>
                <span>选择商品分类：</span>
                <!-- 选择商品分类的级联选择框 -->
                <el-cascader expand-trigger="hover" :options="catelist" :props="cateProps" v-model="selectedCateKeys" @change="handleChange">
                </el-cascader>
                </el-col>
            </el-row>

            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="many">

                    <!-- 添加动态参数 -->
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>

                    <!-- 动态参数表格 -->
                    <el-table :data="manyTableData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"></el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template>
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="静态属性" name="only">
                    <!-- 添加静态属性 -->
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>

                    <!-- 静态参数表格 -->
                    <el-table :data="onlyTableData" border stripe>
                        <!-- 展开行 -->
                        <el-table-column type="expand"></el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template>
                                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- 添加动态参数、静态属性的对话框 -->
        <!-- 动态参数、静态属性的对话框是同一个 -->
        <!-- title="titleText()" 这里的title不能写死了 用计算属性变成动态的 -->
        <el-dialog :title="'添加' + titleText()" :visible.sync="addDialogVisible" width="50%">

            <!-- 添加分类的表单 -->
            <!-- <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">

                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
            </el-form> -->

            <span>
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 30/4
export default {
    data() {
        return {
            // 商品分类列表
            catelist: [],
            // 级联选择框的配置对象
            cateProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            // 级联选择器双向绑定到的数组
            selectedCateKeys: [],
            // 被激活的页签的名称 默认的
            activeName: 'many',
            // 动态参数
            manyTableData: [],
            // 静态属性
            onlyTableData: [],
            // 控制添加对话框的显示与隐藏
            addDialogVisible: false
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
            if (res.meta.status !== 200) {
                return this.$message.error('获取列表数据失败');
            }
            this.catelist = res.data;
            // console.log(this.catelist);
        },

        // 级联选择框变化会触发这个数组
        // 选中必须是三级分类
        handleChange() {
            this.getParamsData();
        },

        // Tab页签点击事件的处理函数
        handleTabClick() {
            console.log(this.activeName);
            this.getParamsData();
        },

        // 获取参数的列表数据
        // 是为了解决切换动态参数和静态属性时重新调用获取整个数据列表
        // 在handleTabClick()=>tab页切换的时候、handleChange()=>级联选择框切换的时候 都会重新调用获取的
        async getParamsData() {
            // 证明选中的不是三级分类
            if (this.selectedCateKeys.length !== 3) {
                this.selectedCateKeys = []
                return
            }

            // console.log(this.selectedCateKeys);

            // 根据所选分类的id和当前所处的面板获取获取对应的参数
            const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activeName } });
            if (res.meta.status !== 200) {
                return this.$message.error('获取参数列表失败');
            }
            console.log(res.data);

            // 现在是不知道res.data到底是哪个部分 是静态呢还是动态 就需要我们加以判断 从而挂载到那个表格当中
            if (this.activeName === 'many') {
                this.manyTableData = res.data;
            } else {
                this.onlyTableData = res.data;
            }
        }
    },
    computed: { // 计算属性

        // 如果按钮需要被禁用 返回true 否则false
        isBtnDisabled() {
            if (this.selectedCateKeys.length !== 3) {
                return true
            }
            return false
        },

        // 当前选中的三级分类的id
        cateId() {
            if (this.selectedCateKeys.length === 3) {
                return this.selectedCateKeys[2]
            }
            return null // 没有这个地址
        },

        // 动态计算标题文本
        titleText() {
            if (this.activeName === 'many') {
                return '动态参数'
            }
            return '静态属性'
        }
    }
}
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
</style>
