<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="rolelist" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop':'',  'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                            <!-- 渲染一级权限 :span="5"占行五列-->
                            <el-col :span="5">
                                <el-tag>{{item1.authName}}</el-tag><i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!--  通过for循环嵌套循环二级权限 -->
                                <el-row :class="[i2 === 0 ? '':'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeUserById()">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"  @click="showEditDialog(scope.row.id)">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <!-- 分配角色 -->
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="修改用户" width="50%"  :visible.sync="editDialogVisible">
                <el-form ref="editFormRef" :model="editForm"  label-width="70px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="editForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="editForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editRolesInfo">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 所有角色列表数据
            rolelist: [],
            editForm: {},
            editDialogVisible: false
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        async getRolesList() {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败');
            }
            this.rolelist = res.data;
        },

        async showEditDialog(id) {
            // console.log(id);
            const { data: res } = await this.$http.get('roles/' + id);
            if (res.meta.status !== 200) {
                return this.$message.error('获取用户失败');
            }
            this.editForm = res.data;
            this.editDialogVisible = true;
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        editRolesInfo() {
            // 预验证
            this.$refs.editFormRef.validate(async valid => {
                // console.log(valid);
                if (!valid) return // 返回结束
                // 发起请求
                const { data: res } = await this.$http.put('roles/' + this.editForm.id, {
                     roleName: this.editForm.roleName,
                     roleDesc: this.editForm.roleDesc
                })

                if (res.meta.status !== 200) {
                    return this.$message.error('更新用户信息失败');
                }

                // 关闭对话框
                this.editDialogVisible = false;
                // 刷新数据列表
                this.getRolesList();
                // 提示修改成功
                this.$message.success('更新用户信息成功');
            });
        },

        // 根据id删除对应的权限
        async removeUserById() {
            // 弹框提示用户是否要删除
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err) // 捕获取消操作

            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除');
            }
            this.$message.info('确认了删除');
        }
    }
}
</script>

<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }
</style>
