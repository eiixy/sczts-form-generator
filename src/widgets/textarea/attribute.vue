<template>
  <div>
    <el-form-item v-if="attrName == 'rows'" label="行数">
      <el-input type="number" v-model="item.rows"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import vModel from "../../vModel";
export default {
  props:{
    attrName:{
      type: String,
      default: ''
    }
  },
  extends: vModel
};
</script>
