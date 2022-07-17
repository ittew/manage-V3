<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">创建</el-button>
      </div>
      <el-table
        :data="menuList"
        row-key="_id"
        height="460px"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button @click="handleAdd(2, scope.row)">新增</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="用户新增" v-model="showAddModal" @close="handleReset('addMenuForm')">
      <el-form
        :model="menuForm"
        label-width="90px"
        :rules="menuFormRules"
        ref="addMenuForm"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader 
            v-model="menuForm.parentId" 
            :options="menuList" 
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }" 
            clearable
          />
          <span>不选, 则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" maxlength="8" />
        </el-form-item>
        <template v-if="menuForm.menuType === 1">
          <el-form-item label="菜单图标" prop="icon" >
            <el-input v-model="menuForm.icon" placeholder="请输入菜单图标" />
          </el-form-item>
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
          </el-form-item>
          <el-form-item label="组件地址" prop="component">
            <el-input v-model="menuForm.component" placeholder="请输入组件地址" />
          </el-form-item>
        </template>
        <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType === 2">
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
            <el-radio-group v-model="menuForm.menuState">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
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
import { formateDate } from '../utils'
export default {
  name: "user",
  data () {
    return {
      menuForm: {
        menuType: 1,
        menuState: 1
      },
      menuFormRules: {
        menuName: [{
          required: true,
          message: '请输入菜单名称',
          trigger: ['blur']
        }, {
          min: 2,
          max: 8,
          message: '菜单名称长度在2~8之间',
          trigger: ['blur']
        }]
      },
      showAddModal: false,
      queryForm: { menuState: 1 },
      menuList: [],
      columns: [{
        label: '菜单名称',
        prop: 'menuName',
        width: 180
      },{
        label: '图标',
        prop: 'icon'
      },{
        label: '菜单类型',
        prop: 'menuType',
        formatter(row, column, value) {
          return {
            1: '菜单',
            2: '按钮'
          }[value]
        }
      },{
        label: '权限标识',
        prop: 'menuCode'
      },{
        label: '路由地址',
        prop: 'path'
      },{
        label: '组件地址',
        prop: 'component'
      },{
        label: '菜单状态',
        prop: 'menuState',
        formatter(row, column, value) {
          return {
            1: '正常',
            2: '停用'
          }[value]
        }
      }],
      action: ''
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      try {
        this.menuList = await this.$api.getMenuList(this.queryForm)
      } catch (error) {
        console.log(error)
      }
    },
    handleReset (form) {
      this.$refs[form].resetFields()
    },
    handleAdd (type, row) {
      this.showAddModal = true
      this.action = 'add'
      if (type === 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(item => item)
        this.menuForm.menuType = +row.menuType
      }
    },
    handleEdit () {
      this.action = 'edit'
    },
    handleDelete () {

    },
    handleClose () {
      this.showAddModal = false
      this.handleReset('addMenuForm')
    },
    handleSubmit () {
      this.$refs.addMenuForm.validate(async valid => {
        if (valid) {
          let { action, menuForm } = this
          let params = {...menuForm, action}
          try {
            let res = await this.$api.menuOperate(params)
            this.$message.success('操作成功')
            this.handleClose()
            this.getMenuList()
          } catch (error) {
            console.log(error, 'addMenu')
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped></style>
