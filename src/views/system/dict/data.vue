<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="字典名称" prop="dictId">
        <el-select v-model="queryParams.dictId">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.dictName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="itemName">
        <el-input
          v-model="queryParams.itemName"
          placeholder="请输入字典标签"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="数据状态" clearable>
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
          v-hasPermi="['system:dict:data:add']"
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
          v-hasPermi="['system:dict:data:upd']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDeleteBatch"
          v-hasPermi="['system:dict:data:batch:del']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:dict:export']"
        >导出</el-button>
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

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字典编码" align="center" prop="id" />
      <el-table-column label="字典类型" align="center" prop="dictType" />
      <el-table-column label="字典键值" align="center" prop="itemValue" />
      <el-table-column label="字典标签" align="center" prop="itemName">
        <template slot-scope="scope">
          <span v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">{{scope.row.itemName}}</span>
          <el-tag v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">{{scope.row.itemName}}</el-tag>
        </template>
      </el-table-column>
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
      <el-table-column label="备注" align="center" prop="remarks" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dict:data:upd']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dict:data:del']"
          >删除</el-button>
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典类型">
          <el-input v-model="form.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据键值" prop="itemValue">
          <el-input v-model="form.itemValue" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="数据标签" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入数据标签" />
        </el-form-item>
        <!-- <el-form-item label="样式属性" prop="cssClass">
          <el-input v-model="form.cssClass" placeholder="请输入样式属性" />
        </el-form-item> -->
        <!-- <el-form-item label="显示排序" prop="dictSort">
          <el-input-number v-model="form.dictSort" controls-position="right" :min="0" />
        </el-form-item> -->
        <!-- <el-form-item label="回显样式" prop="listClass">
          <el-select v-model="form.listClass">
            <el-option
              v-for="item in listClassOptions"
              :key="item.value"
              :label="item.label + '(' + item.value + ')'"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.status_dict"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDictItems,infoDictItems,updDictItems, delDictItems, delBatchDictItems, addDictItems, updDictItemsStatus } from "@/api/system/dict/data";
import { allDict } from "@/api/system/dict/type";
// import { allDictType } from "@/api/system/logic";

export default {
  name: "Data",
  dicts: ['status_dict'],
  data() {
    return {
      statusList: [],
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
      // 字典表格数据
      dataList: [],
      // 默认字典类型
      defaultDictId: "",
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 数据标签回显样式
      listClassOptions: [
        {
          value: "default",
          label: "默认"
        },
        {
          value: "primary",
          label: "主要"
        },
        {
          value: "success",
          label: "成功"
        },
        {
          value: "info",
          label: "信息"
        },
        {
          value: "warning",
          label: "警告"
        },
        {
          value: "danger",
          label: "危险"
        }
      ],
      // 类型数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemName: undefined,
        dictId: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        itemName: [
          { required: true, message: "数据标签不能为空", trigger: "blur" }
        ],
        itemValue: [
          { required: true, message: "数据键值不能为空", trigger: "blur" }
        ]
        // dictSort: [
        //   { required: true, message: "数据顺序不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  created() {
    const dictId = this.$route.params && this.$route.params.dictId;
    this.queryParams.dictId = Number(dictId);
    this.defaultDictId = Number(dictId);
    this.getList();
    this.getAllDict();
  },
  methods: {
    getAllDict(){
      const data = {}
      allDict(data).then(res => {
        this.typeOptions = res.data.items
      });
    },
    /** 查询字典类型详细 */
    // getType(dictId) {
    //   getType(dictId).then(response => {
    //     this.queryParams.dictType = response.data.dictType;
    //     this.defaultDictType = response.data.dictType;
    //     // this.getList();
    //   });
    // },
    /** 查询字典类型列表 */
    // getTypeList() {
    //   getDictOptionselect().then(response => {
    //     this.typeOptions = response.data;
    //   });
    // },
    /** 查询字典数据列表 */
    getList() {
      this.loading = true;
      listDictItems(this.queryParams).then(res => {
        this.dataList = res.data.items;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        dictId: undefined,
        itemName: undefined,
        itemValue: undefined,
        // cssClass: undefined,
        // listClass: 'default',
        // dictSort: 0,
        status: 1,
        remarks: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.defaultDictId = this.queryParams.dictId;
      this.getList();
    },
    /** 返回按钮操作 */
    handleClose() {
      const obj = { path: "/dictManagement/dictList" };
      this.$tab.closeOpenPage(obj);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.dictId = this.defaultDictId;
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典数据";
      this.typeOptions.forEach(item => {
        if (item.id == this.queryParams.dictId) {
          this.form.dictType = item.dictType
        }
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const data = {
        id: row.id || this.ids[0]
      }
      infoDictItems(data).then(res => {
        this.form = res.data;
        this.open = true;
        this.title = "修改字典数据";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 判断this.form.itemValue是否为数字
          if (isNaN(this.form.itemValue)) {
            this.$modal.msgWarning("数据键值必须为数字");
            return;
          }
          if (this.form.id != undefined) {
            updDictItems(this.form).then(response => {
              // this.$store.dispatch('dict/removeDict', this.queryParams.dictType);
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.dictId = this.defaultDictId;
            addDictItems(this.form).then(response => {
              // this.$store.dispatch('dict/removeDict', this.queryParams.dictType);
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === 1 ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '"字典编号为"' + row.id + '"的数据吗？').then(function() {
        const params = {
          id: row.id,
          status: row.status
        }
        return updDictItemsStatus(params);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === 2 ? 1 : 2;
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const data = {
        id: row.id
      }
      this.$modal.confirm('是否确认删除字典编码为"' + row.id + '"的数据项？').then(function() {
        return delDictItems(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
        // this.$store.dispatch('dict/removeDict', this.queryParams.dictType);
      }).catch(() => {});
    },
    handleDeleteBatch(row) {
      const data = {
        ids: this.ids
      }
      this.$modal.confirm('是否确认删除字典编码为"' + this.ids + '"的数据项？').then(function() {
        return delBatchDictItems(data);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
        // this.$store.dispatch('dict/removeDict', this.queryParams.dictType);
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/dict/data/export', {
        ...this.queryParams
      }, `data_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
