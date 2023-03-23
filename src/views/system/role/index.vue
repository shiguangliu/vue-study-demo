<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleCode">
        <el-input
          v-model="queryParams.roleCode"
          placeholder="请输入权限字符"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in dict.type.status_dict"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleBatchDelete"
          v-hasPermi="['system:role:batch:del']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="权限编号" prop="id" width="120" />
      <el-table-column label="权限名称" prop="name" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="权限字符" prop="roleCode" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
        <template slot-scope="scope" v-if="scope.row.id !== 1">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:del']"
          >删除</el-button>
          <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:role:edit']">
            <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleDataScope" icon="el-icon-circle-check"
                v-hasPermi="['system:role:bound:all']">数据权限</el-dropdown-item>
              <el-dropdown-item command="handleAuthUser" icon="el-icon-user"
                v-hasPermi="['system:role:allot:user']">分配用户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <!-- <el-form-item prop="roleCode">
          <span slot="label">
            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
            权限字符
          </span>
          <el-input v-model="form.roleCode" placeholder="请输入权限字符" />
        </el-form-item> -->
        <el-form-item prop="roleCode">
          <span slot="label">
            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
            权限字符
          </span>
          <el-select
            v-model="form.roleCode"
            placeholder="请选择权限字符"
            clearable
            :disabled = "this.form.id !== undefined"
            style="width: 240px"
          >
            <el-option
              v-for="dict in this.roleCodeList"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.status_dict"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="form.roleCode" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据权限">
          <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event)">展开/折叠</el-checkbox>
          <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event)">全选/全不选</el-checkbox>
          <el-checkbox v-model="deptCheckStrictly" @change="handleCheckedTreeConnect($event)">父子联动</el-checkbox>
          <el-tree
            class="tree-border"
            :data="deptOptions"
            show-checkbox
            default-expand-all
            ref="dept"
            node-key="id"
            :check-strictly="!deptCheckStrictly"
            empty-text="加载中，请稍候"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope" v-hasPermi="['system:role:bind:menu']">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list,getInfo,updRole,updStatus,batchDelRole,authList,resourceList, delRole, addRole, roleBindResource } from "@/api/system/role";

export default {
  name: "Role",
  dicts: ['status_dict'],
  data() {
    return {
      // 角色权限字符
      roleCodeList: [
        { value: "USER", label: "用户" },
        { value: "TEST", label: "测试" }
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptCheckStrictly: true,
      deptNodeAll: false,
      // 菜单列表
      menuOptions: [],
      // 权限树列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        roleCode: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then(res => {
        this.roleList = res.data.items;
        this.total = res.data.total;
        this.loading = false;
      })
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === 1 ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.name + '"角色吗？').then(function() {
        const params = {
          id: row.id,
          status: row.status
        }
        return  updStatus(params);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === 2 ? 1 : 2;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        name: undefined,
        roleCode: undefined,
        status: 1
      };
      this.resetForm("form");
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleDataScope":
          this.handleDataScope(row);
          break;
        case "handleAuthUser":
          this.handleAuthUser(row);
          break;
        default:
          break;
      }
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value) {
      let treeList = this.deptOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
        }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value) {
      this.$refs.dept.setCheckedNodes(value ? this.deptOptions: []);
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value) {
      this.deptCheckStrictly = !!value
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const params = {
        id : row.id || this.ids[0]
      }
      getInfo(params).then(res => {
        this.form = res.data;
        this.open = true;
        this.title = "修改角色";
      });
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.reset();
      this.form.id = row.id;
      authList().then(res => {
        this.deptOptions = res.data.items
      });
      const params = {
        id: row.id
      }
      getInfo(params).then(res => {
        this.form = res.data;
        this.openDataScope = true;
        // 获取当前角色已分配的权限
        const data = {
          roleId: row.id
        }
        resourceList(data).then(response => {
          let checkedKeys = response.data.resourceIds
          this.$nextTick(() => {
            this.$refs.dept.setCheckedKeys(checkedKeys);
          });
        })
        this.title = "分配数据权限";
      });
    },
    /** 分配用户操作 */
    handleAuthUser: function(row) {
      const roleId = row.id;
      this.$router.push("/system/role-auth/user/" + roleId);
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updRole(this.form).then(res => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRole(this.form).then(res => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      const data = {
        roleId: this.form.id,
        ids: this.$refs.dept.getCheckedKeys().concat(this.$refs.dept.getHalfCheckedKeys())
      }
      console.log(this.$refs.dept.getCheckedKeys().concat(this.$refs.dept.getHalfCheckedKeys()))
      roleBindResource(data).then(res => {
        this.$modal.msgSuccess("修改成功");
        this.openDataScope = false;
        this.getList();
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const data = {
        id: row.id
      };
      this.$modal.confirm('是否确认删除角色编号为"' + row.id + '"的数据项？').then(function() {
        return delRole(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 批量删除操作
    handleBatchDelete(){
      const data = {
        roleIds: this.ids
      };
      this.$modal.confirm('是否确认删除角色编号为"' + this.ids + '"的数据项？').then(function() {
        return batchDelRole(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
  }
};
</script>
