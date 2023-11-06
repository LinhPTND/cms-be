<template>
  <a-modal
    class="modal-check-letter"
    :title="titleLetter"
    width="auto"
    centered
    destroy-on-close
  >
    <template #footer>
      <div class="flex items-center justify-end">
        <Button class="mr-2" :btn-type="'primary'">Duyệt</Button>
        <Button :btn-type="'destructive'">Từ chối</Button>
      </div>
    </template>

    <div class="wrap-letter">
      <BankLoanLetter />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import BankLoanLetter from "@/letters/BankLoanLetter.vue";
import { TypeLetter } from "@/models/Letter";
import { ModalProps } from "ant-design-vue/lib/modal/Modal";
import { computed } from "vue";

export interface ModalCheckLetterProps extends ModalProps {
  typeLetter: TypeLetter | null;
  code: string;
}

const props = defineProps<ModalCheckLetterProps>();

const titleLetter = computed(() => {
  return `Duyệt đơn ${props.code}`;
});
</script>

<style lang="scss">
.modal-check-letter {
  .ant-modal-body {
    max-height: 70vh;
    overflow: auto;
  }
}
</style>
