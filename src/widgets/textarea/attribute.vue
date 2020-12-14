<template>
  <div>
    <el-form-item label="行数">
      <el-input type="number" v-model="item.rows"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import vModel from "../../vModel";
export default {
  extends: vModel
};
</script>
