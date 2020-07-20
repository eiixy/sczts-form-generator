<template>
  <div>
    <el-form label-width="70px" size="small">
      <!-- 固定属性栏 -->
      <el-form-item v-if="'width' in attrs" label="分栏宽度">
        <el-slider v-model="attrs.width" :step="2" :min="0" :max="24"></el-slider>
      </el-form-item>
      <el-form-item v-if="'label' in attrs" label="标题宽度">
        <el-input v-model="attrs.label"></el-input>
      </el-form-item>

      <div v-if="showTable && 'table' in attrs">
        <el-form-item label="列表展示">
          <el-switch v-model="attrs.table.show"></el-switch>
        </el-form-item>
        <el-form-item v-if="attrs.table.show && 'search' in attrs.table" label="可搜索">
          <el-switch v-model="attrs.table.search"></el-switch>
        </el-form-item>
        <el-form-item v-if="attrs.table.show && 'filter' in attrs.table" label="可筛选">
          <el-switch v-model="attrs.table.filter"></el-switch>
        </el-form-item>
        <el-form-item v-if="attrs.table.show && 'sort' in attrs.table" label="可排序">
          <el-switch v-model="attrs.table.sort"></el-switch>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    showTable: {
      type: Boolean,
      default: false
    },
    value: Object
  },
  computed:{
    attrs(){
      return this.value
    }
  },
  created(){
    if(!this.showTable){
      this.attrs.table = {}
    }
  }
};
</script>

<style>
</style>
