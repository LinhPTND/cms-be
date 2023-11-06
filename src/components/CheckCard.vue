<template>
  <div
    :class="[
      { select_type_code: !status, select_type_code_active: status },
      'justify-between flex bg-[#F8F8FF] cursor',
    ]"
    @click="$emit('changeStatus')"
  >
    <div class="flex justify-center items-center mt-2 mb-2 ml-2 cursor">
      <img :src="image" style="height: 50px" />
      <a-typography-text class="text-base cursor">{{
        title
      }}</a-typography-text>
    </div>

    <div class="square cursor">
      <div class="triangle-bottomleft cursor">
        <check-outlined class="check-outlined" style="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps<{ title: string; status: boolean; image: string }>();
</script>

<style scoped lang="scss">
.select_type_code {
  border: 1px solid #e5eaee;
  border-radius: 7px;
  width: 45%;

  .square {
    height: 40px;
    width: 40px;
    background: #7f7f7f;
    border-top-right-radius: 7px;
    .check-outlined {
      margin-left: 22px;
      margin-top: 10px;
      font-size: 14px;
      color: #bfbfbf;
    }
  }
}
.select_type_code:hover {
  border: 1px solid #f8f8ff;
  box-shadow: 0px 0px 3px #dddee1;

  .square {
    background: #ee4d2d;
    .check-outlined {
      color: #fff;
    }
  }
}

.select_type_code_active {
  width: 45%;
  border: 1px solid #f8f8ff;
  box-shadow: 0px 0px 3px #dddee1;
  border-radius: 7px;
  .square {
    height: 40px;
    width: 40px;
    background: #ee4d2d;
    border-top-right-radius: 7px;
    .check-outlined {
      margin-left: 22px;
      margin-top: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
}

.cursor {
  cursor: pointer;
}
.triangle-bottomleft {
  width: 0;
  height: 0;
  border-bottom: 40px solid #f8f8ff;
  border-right: 40px solid transparent;
}
</style>
