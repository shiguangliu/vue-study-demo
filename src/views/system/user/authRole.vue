<template>
  <div class="app-container">
    <h4 class="form-header h4">基本信息</h4>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="登录账号" prop="username">
            <el-input  v-model="form.username" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <h4 class="form-header h4">角色信息</h4>
    <el-table v-loading="loading" :row-key="getRowKey" @row-click="clickRow" ref="table" @selection-change="handleSelectionChange" :data="roles">
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
      <el-table-column label="角色编号" align="center" prop="id" />
      <el-table-column label="角色名称" align="center" prop="name" />
      <el-table-column label="权限字符" align="center" prop="roleCode" />
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" /> -->

    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-120px;margin-top:30px;">
        <el-button type="primary" v-hasPermi="['system:user:bind:role']" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userBindRole,getUser } from "@/api/system/user";
import { roleAll } from "@/api/system/role";

export default {
  name: "AuthRole",
  data() {
    return {
       // 遮罩层
      loading: true,
      // 分页信息
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 选中角色编号
      roleIds:[],
      // 角色信息
      roles: [],
      // 用户信息
      form: {}
    };
  },
  created() {
    const userId = this.$route.params && this.$route.params.userId;
    if (userId) {
      this.loading = true;
      const getUserData = {
        userId: userId
      }
      getUser(getUserData).then((res) => {
        this.form = res.data
        roleAll().then((roleList) => {
          this.roles = roleList.data
          this.total = this.roles.length;
          this.$nextTick(() => {
          this.roles.forEach((row) => {
            // 判断row是否在res.data.roles中
            if (res.data.roleIds.includes(row.id)) {
              this.$refs.table.toggleRowSelection(row);
            }
          });
        });
        this.loading = false;
        })
      })
    }
  },
  methods: {
    /** 单击选中行数据 */
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.roleIds = selection.map((item) => item.id);
    },
    // 保存选中的数据编号
    getRowKey(row) {
      return row.roleId;
    },
    /** 提交按钮 */
    submitForm() {
      // const userId = this.form.userId;
      // const roleIds = this.roleIds.join(",");
      const data = {
        userId : this.form.id,
        roleIds: this.roleIds
      }
      userBindRole(data).then((res) => {
        this.$modal.msgSuccess("授权成功");
        this.close();
      });
    },
    /** 关闭按钮 */
    close() {
      const obj = { path: "/userManagement/userList" };
      this.$tab.closeOpenPage(obj);
    },
  },
};
</script>
