<template>
  <div class="table-letters">
    <ModalCheckLetter
      :visible="modalCheckLetter.visible"
      :type-letter="modalCheckLetter.typeLetter"
      :code="modalCheckLetter.id"
      @cancel="closeModalCheckLetter"
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: true, y: 400 }"
      :pagination="{ size: 'small', pageSize: 20 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <span>
            <a-tag
              class="w-[70px]"
              :key="record.status"
              :color="
                record.status === StatusLetter.PENDING
                  ? 'geekblue'
                  : record.status === StatusLetter.SUCCESS
                  ? 'green'
                  : 'volcano'
              "
            >
              {{ record.status.toString().toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'personCheck'">
          <span>
            <Avatar
              :name="record.personCheck"
              name-face="LN"
              :color="'#389e0d'"
            />
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <TableColAction
              @edit="
                () =>
                  handleEdit({
                    code: record.code,
                    typeLetter: record.typeLetter,
                  })
              "
              @delete="
                () =>
                  handleDelete({
                    code: record.code,
                    typeLetter: record.typeLetter,
                  })
              "
            />
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import TableColAction from "@/components/TableColAction.vue";
import { StatusLetter, TypeLetter } from "@/models/Letter";
import ModalCheckLetter from "@/modules/admin/components/modal/ModalCheckLetter.vue";
import { ColumnProps } from "ant-design-vue/lib/table";
import { Dayjs } from "dayjs";
import { ref } from "vue";

interface Letter {
  code: string;
  name: string;
  sendDay: Dayjs | string;
  status: StatusLetter;
  typeLetter?: TypeLetter;
}

const columns: ColumnProps<any>[] = [
  {
    title: "Mã đơn",
    dataIndex: "code",
    key: "code",
    width: 70,
  },
  {
    title: "Tên đơn",
    dataIndex: "name",
    key: "name",
    width: 300,
  },
  {
    title: "Ngày gửi",
    dataIndex: "sendDay",
    key: "sendDay",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];

const data = ref<Letter[]>([
  {
    code: "283AT130264",
    name: "Đơn xin nghỉ học có thời hạn (dưới 7 ngày)",
    sendDay: "07-10-2022",
    status: StatusLetter.PENDING,
    typeLetter: TypeLetter.LeaveAbsenceLessLetter,
  },
  {
    code: "283CT0135565",
    name: "Phiếu thanh toán ra trường (cá nhân)",
    sendDay: "02-10-2022",
    status: StatusLetter.SUCCESS,
    typeLetter: TypeLetter.PaymentPersonalLetter,
  },
  {
    code: "283AT1131414",
    name: "Vay vốn ngân hàng",
    sendDay: "07-10-2022",
    status: StatusLetter.REJECT,
    typeLetter: TypeLetter.BankLoanLetter,
  },
]);

interface ModalLetterParameters {
  visible: boolean;
  id: string;
  typeLetter: TypeLetter | null;
}

const modalCheckLetter = ref<ModalLetterParameters>({
  visible: false,
  id: "",
  typeLetter: null,
});

const openModalCheckLetter = (info: ModalLetterParameters) => {
  modalCheckLetter.value = {
    ...info,
    visible: true,
  };
};

const closeModalCheckLetter = () => {
  modalCheckLetter.value.visible = false;
};

const handleEdit = ({
  code,
  typeLetter,
}: {
  code: string;
  typeLetter: TypeLetter;
}) => {
  openModalCheckLetter({
    id: code,
    typeLetter: typeLetter,
    visible: true,
  });
};

const handleDelete = ({
  code,
  typeLetter,
}: {
  code: string;
  typeLetter: TypeLetter;
}) => {};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.table-letters {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);
  min-height: 100%;
  width: 100%;
}
</style>
