<template>
  <!-- 授权用户 -->
  <el-dialog title="选择用户" :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table @row-click="clickRow" ref="table" :data="userList" @selection-change="handleSelectionChange" height="260px">
        <el-table-column type="selection" width="55"></el-table-column>
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
          <template slot-scope="scope">
            <el-tag v-for="item in dict.type.status_dict" v-if="item.value === scope.row.status" :key="item.value">
              {{item.label}}
            </el-tag>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelectUser" v-hasPermi="['system:role:bind:user']">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { unbindUserList,bind } from "@/api/system/role";
export default {
  dicts: ['status_dict','user_sex'],
  props: {
    // 角色编号
    roleId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      // 选中数组值
      userIds: [],
      // 总条数
      total: 0,
      // 未授权用户数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
        userName: undefined,
        phone: undefined
      }
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.queryParams.roleId = this.roleId;
      this.getList();
      this.visible = true;
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.id);
    },
    // 查询表数据
    getList() {
      unbindUserList(this.queryParams).then(res => {
        this.userList = res.data.items;
        this.total = res.data.total;
      });
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
    /** 选择授权用户操作 */
    handleSelectUser() {
      const roleId = this.queryParams.roleId;
      const userIds = this.userIds;
      if (userIds == "") {
        this.$modal.msgError("请选择要分配的用户");
        return;
      }
      const params = {
        roleId: roleId,
        userIds: userIds
      };
      bind(params).then(res => {
        this.$modal.msgSuccess(res.message);
        if (res.code === 200) {
          this.visible = false;
          this.$emit("ok");
        }
      });
    }
  }
};
</script>
