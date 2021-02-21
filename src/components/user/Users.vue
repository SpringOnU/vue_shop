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

                <!-- 用户列表区 -->
                <el-table :data="userlist" border stripe>   <!-- stripe隔行变色 -->
                    <!-- :data="userlist"绑定数据源 -->
                    <el-table-column type="index" label="#"></el-table-column>    <!-- 索引列 -->
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="mobile" label="电话"></el-table-column>
                    <el-table-column prop="role_name" label="角色"></el-table-column>
                    <el-table-column label="状态">
                        <!-- 指定了作用域插槽就可以不要prop了 因为会覆盖 -->
                        <template slot-scope="scope">
                            <!-- {{scope.row.mg_state}} scope.row拿到这一行数据 -->
                            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
                                <!-- change监听switch开关的改变 -->
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template >
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                <!-- enterable	鼠标是否可进入到 tooltip 中	Boolean	—	true -->
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 用户分页 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                     <!-- size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。
                          current-change 页码值切换
                          page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，
                          :current-page 当前是第几页=>可以通过queryInfo里面的pagenum拿到
                          :page-sizes 写了几 这页里面就会显示几条
                          :page-size 当前这一页显示了几条 => 可以通过queryIfo里面的pagesize拿到
                          layout 指定页面上展示什么布局结构
                          :total 一共有多少数据 绑定即可-->
                </el-pagination>
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
                pagenum: 1, /* 当前的页数 */
                pagesize: 2 /* 当前每页显示几条 */
            },
            userlist: [],
            total: 0
        }
    },
    created() { // 发起首批数据请求;
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get('users', { params: this.queryInfo })
            // users请求地址 要携带一些get参数 get参数用params来指定 由api文档可知参数包含3个属性 query、pagenum、pagesize
            // await 得到一个数据对象
            // 从这个数据对象上解构得到一个data属性 命名为 res
            if (res.meta.status !== 200) {
                return this.$message.error('获取用户列表失败')
            }
            this.userlist = res.data.users
            this.total = res.data.total
            console.log(res);
        },
        // 监听pageSize改变的事件
        handleSizeChange(newSize) {
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getUserList(); /* 重新发起请求 获取数据 */
        },
        // 监听叶马志改变
        handleCurrentChange(newPage) {
            console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getUserList();
        },
        async userStateChange(userInfo) {
            console.log(userInfo);
            const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if (res.meta.status !== 200) {
                userInfo.mg_state = !userInfo.mg_state  // 失败了就把原来状态返回去
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        }
    }
}
</script>

<style lang="less" scoped>

</style>
