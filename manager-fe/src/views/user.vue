<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="queryForm">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table
        :data="userList"
        height="460px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
      />
    </div>
    <el-dialog title="用户新增" v-model="showModal" @close="handleReset('addUserForm')">
      <el-form
        :model="userForm"
        label-width="90px"
        :rules="userFormRules"
        ref="addUserForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" :disabled="action === 'edit'" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" :disabled="action === 'edit'" placeholder="请输入用户邮箱">
            <template #append>@163.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state" placeholder="请选择状态">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            style="width: 100%"
            multiple
            placeholder="请选择系统角色"
          >
            <el-option
              :value="item._id"
              :label="item.roleName"
              v-for="item in roleList"
              :key="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            style="width: 40%"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from "vue";
import { formateDate } from '../utils'
export default {
  name: "user",
  setup() {
    // 获取ctx上下文对象
    const ctx = getCurrentInstance();
    const globalMethod =
      getCurrentInstance().appContext.config.globalProperties;

    const user = reactive({ state: 1 });
    let total = ref(0);
    let userList = ref([]);
    // 定义动态表格格式
    const columns = reactive([
      {
        label: "用户角色",
        prop: "userId",
      },
      {
        label: "用户名称",
        prop: "userName",
      },
      {
        label: "用户邮箱",
        prop: "userEmail",
        width: 160,
      },
      {
        label: "用户角色",
        prop: "role",
        formatter(row, column, value) {
          return {
            0: "管理员",
            1: "普通用户",
          }[value];
        },
      },
      {
        label: "用户状态",
        prop: "state",
        formatter(row, column, value) {
          return {
            1: "在职",
            2: "离职",
            3: "试用期",
          }[value];
        },
      },
      {
        label: "注册时间",
        prop: "createTime",
        width: 180,
        formatter(row, column, value) {
          return formateDate(new Date(value))
        }
      },
      {
        label: "最后登录时间",
        prop: "lastLoginTime",
        width: 180,
        formatter(row, column, value) {
          return formateDate(new Date(value))
        }
      },
    ]);
    // 初始化分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    // 初始化接口调用
    onMounted(() => {
      getUserList();
      getRoleList();
      getDeptlist();
    });
    // 获取用户列表
    const getUserList = async () => {
      const params = { ...user, ...pager };
      try {
        const { list, page } = await globalMethod.$api.getUserList(params);
        userList.value = list;
        total.value = page.total;
      } catch (error) {
        console.log(error);
      }
    };
    // 查询用户列表
    const handleQuery = () => {
      getUserList();
    };
    // 重置查询表单
    const handleReset = (form) => {
      ctx.refs[form].resetFields();
    };
    // 分页切换
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      getUserList();
    };
    // 单个删除
    const handleDelete = async (row) => {
      try {
        console.log(row);
        const res = await globalMethod.$api.userDel({
          userIds: [row.userId],
        });
        if (res.matchedCount > 0) {
          globalMethod.$message.success("删除成功");
          getUserList();
        } else {
          globalMethod.$message.error("删除失败");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // 选中用户列表
    const checkUserIds = ref([]);
    // 批量删除
    const handlePatchDel = async () => {
      if (!checkUserIds.value.length) {
        globalMethod.$message.error("请选择要删除的用户");
        return;
      }
      try {
        const res = await globalMethod.$api.userDel({
          userIds: checkUserIds.value,
        });
        if (res.matchedCount > 0) {
          globalMethod.$message.success("删除成功");
          getUserList();
        } else {
          globalMethod.$message.error("删除失败");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // 勾选用户
    const handleSelectionChange = (val) => {
      let arr = [];
      val.map((item) => {
        arr.push(item.userId);
      });
      checkUserIds.value = arr;
    };
    /**
     * 新增用户相关
     */
    const userForm = reactive({ state: 1 });
    const showModal = ref(false);
    const handleCreate = () => {
      showModal.value = true
      action.value = "add"
    };
    const userFormRules = reactive({
      userName: [
        { required: true, message: "请输入用户名称", trigger: "blur" },
      ],
      userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      mobile: [
        {
          pattern: /1[2-9]\d{9}/,
          message: "请输入正确的手机格式",
          trigger: "blur",
        },
      ],
      deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
    });

    const deptList = ref([]);
    const getDeptlist = async () => {
      try {
        const res = await globalMethod.$api.getDeptList();
        deptList.value = res;
      } catch (error) {
        console.log(error);
      }
    };

    const roleList = ref([]);
    const getRoleList = async () => {
      try {
        const res = await globalMethod.$api.getRoleList();
        roleList.value = res;
      } catch (error) {
        console.log(error);
      }
    };

    const handleClose = () => {
      showModal.value = false;
      handleReset("addUserForm");
    };

    let action = ref("add")
    const handleSubmit = () => {
      ctx.refs.addUserForm.validate(async (valid) => {
        if (valid) {
          let params = toRaw(userForm)
          try {
            // toRaw 将响应式对象转成普通对象
            params.userEmail += "@163.com"
            params.action = action.value
            const res = await globalMethod.$api.createUser(params)
            if (res) {
              globalMethod.$message.success(action.value === 'edit' ? '用户更新成功' : "用户创建成功");
              handleClose()
              getUserList()
            }
          } catch (error) {
            console.log(error)
            params.userEmail = params.userEmail.replace('@163.com', '')
          }
        }
      })
    }
    const handleEdit = (row) => {
      action.value = "edit"
      showModal.value = true
      ctx.ctx.$nextTick(() => {
        Object.assign(userForm, row)
      })
    }
    return {
      user,
      userForm,
      userList,
      columns,
      pager,
      total,
      showModal,
      userFormRules,
      roleList,
      deptList,
      action,
      handleEdit,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDelete,
      handlePatchDel,
      handleSelectionChange,
      handleCreate,
      handleSubmit,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped></style>
