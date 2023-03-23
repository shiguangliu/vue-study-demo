<template>
  <div class="app-container">
     <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入用户名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
            v-model="queryParams.nickname"
            placeholder="请输入用户昵称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
            v-model="queryParams.email"
            placeholder="请输入用户昵称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="openSelectUser"
          v-hasPermi="['system:role:not:bind:user']"
        >添加用户</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-circle-close"
          size="mini"
          :disabled="multiple"
          @click="cancelAuthUserAll"
          v-hasPermi="['system:role:batch:unbind:user']"
        >批量取消授权</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户名称" prop="username" :show-overflow-tooltip="true" />
      <el-table-column label="用户昵称" prop="nickname" :show-overflow-tooltip="true" />
      <el-table-column label="性别" prop="sex">
        <template v-slot="scope">
          <el-tag v-for="item in dict.type.user_sex" v-if="item.value === scope.row.sex" :key="item.value">
            {{item.label}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true" />
      <el-table-column label="手机" prop="phone" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <el-tag v-for="item in dict.type.status_dict" v-if="item.value === scope.row.status" :key="item.value">
            {{item.label}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="绑定时间" align="center" prop="bindTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bindTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="cancelAuthUser(scope.row)"
            v-hasPermi="['system:role:unbind:user']"
          >取消授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <select-user ref="select" :roleId="queryParams.roleId" @ok="handleQuery" />
  </div>
</template>

<script>
import { userList,cancel,batchCancel } from "@/api/system/role";
import selectUser from "./selectUser";

export default {
  name: "AuthUser",
  dicts: ['status_dict','user_sex'],
  components: { selectUser },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中用户组
      userIds: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
        username: undefined,
        nickname: undefined,
        phone: undefined,
        email: undefined
      }
    };
  },
  created() {
    const roleId = this.$route.params && this.$route.params.roleId;
    if (roleId) {
      this.queryParams.roleId = roleId;
      this.getList();
    }
  },
  methods: {
    /** 查询授权用户列表 */
    getList() {
      this.loading = true;
      userList(this.queryParams).then(res => {
          this.userList = res.data.items;
          this.total = res.data.total;
          this.loading = false;
        }
      );
    },
    // 返回按钮
    handleClose() {
      const obj = { path: "/permissionManagement/roleList" };
      this.$tab.closeOpenPage(obj);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** 打开授权用户表弹窗 */
    openSelectUser() {
      this.$refs.select.show();
    },
    /** 取消授权按钮操作 */
    cancelAuthUser(row) {
      const roleId = this.queryParams.roleId;
      this.$modal.confirm('确认要取消该用户"' + row.username + '"角色吗？').then(function() {
        const data = { userId: row.id, roleId: roleId };
        return cancel(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("取消授权成功");
      }).catch(() => {});
    },
    /** 批量取消授权按钮操作 */
    cancelAuthUserAll(row) {
      const roleId = this.queryParams.roleId;
      const userIds = this.userIds
      this.$modal.confirm('是否取消选中用户授权数据项？').then(function() {
        const data = { userIds: userIds, roleId: roleId };
        return batchCancel(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("取消授权成功");
      }).catch(() => {});
    }
  }
};
</script>
