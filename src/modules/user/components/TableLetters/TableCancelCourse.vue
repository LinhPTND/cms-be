<template>
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
    :disabled="disabled"
    >Thêm hàng</a-button
  >
  <a-table
    :columns="columns"
    :data-source="dataSource"
    bordered
    :scroll="{ x: 700, y: 240 }"
    :pagination="false"
  >
    <template #bodyCell="{ column, text, record, index }">
      <template v-if="column.key === 'stt'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="['name', 'semester', 'class'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-if="['startDate', 'endDate'].includes(column.dataIndex)">
        <div>
          <a-date-picker
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text ? dayjs(text).format("DD/MM/YYYY") : text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span class="flex gap-2 text-xs" v-if="editableData[record.key]">
            <a-typography-link
              @click="save(record.key)"
              :disabled="
                !!Object.keys(editableData[record.key]).filter(
                  (key) => editableData[record.key][key] === ''
                ).length || disabled
              "
            >
              Save
            </a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a-typography-link :disabled="disabled">Cancel</a-typography-link>
            </a-popconfirm>
          </span>
          <span class="flex" v-else>
            <a-typography-link
              class="mr-2"
              @click="edit(record.key)"
              :disabled="disabled"
              >Edit</a-typography-link
            >
            <a-popconfirm
              title="Sure to Delete?"
              @confirm="onDelete(record.key)"
            >
              <a-typography-link :disabled="disabled">Delete</a-typography-link>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ColumnProps } from "ant-design-vue/lib/table";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { computed, onBeforeMount, reactive, ref, UnwrapRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    value: Array<{
      class: string;
      createdAt?: string;
      endDate: string;
      name: string;
      semester: string;
      startDate: string;
      updatedAt?: string;
      _id?: string;
    }>;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:value", value: any): void;
}>();

const columns = computed<ColumnProps[]>(() => {
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 70,
    },
    {
      title: "Tên học phần cần hủy",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Khóa",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Lớp đã đăng ký",
      dataIndex: "class",
      key: "class",
      width: 100,
    },
    {
      title: "Thời gian môn học",
      children: [
        {
          title: "Bắt đầu",
          dataIndex: "startDate",
          key: "startDate",
        },
        {
          title: "Kết thúc",
          dataIndex: "endDate",
          key: "endDate",
        },
      ],
    },
    {
      title: "Hành động",
      dataIndex: "operation",
    },
  ];
});

interface DataItem {
  key: string;
  class: string;
  endDate: string | undefined;
  startDate: string | undefined;
  name: string;
  semester: string;
}

const defaultDataSource = () => [
  {
    key: "1",
    name: "",
    semester: "",
    class: "",
    startDate: undefined,
    endDate: undefined,
  },
];

const dataSource = ref<DataItem[]>(defaultDataSource());
const editableData: UnwrapRef<Record<string, any>> = reactive({});

const dataValueEmit = computed(() => {
  const data = dataSource.value.filter((item) => item.name);
  if (data?.length) {
    const dataEmit = data.map((item) => ({
      ...item,
      startDate: dayjs(item.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(item.endDate).format("YYYY-MM-DD"),
    }));
    return dataEmit;
  } else return data;
});

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};
const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
};
const cancel = (key: string) => {
  if (dataSource.value.length === 1 && !props.value) {
    editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.key)[0]
    );
  } else delete editableData[key];
};
const handleAdd = () => {
  const newValue = {
    key: (dataSource.value.length + 1).toString(),
    name: "",
    semester: "",
    class: "",
    startDate: undefined,
    endDate: undefined,
  };
  dataSource.value.push(newValue);
  edit(newValue.key);
};

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  if (!dataSource.value.length) {
    dataSource.value.push({
      key: "1",
      name: "",
      semester: "",
      class: "",
      startDate: undefined,
      endDate: undefined,
    });
    editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.key)[0]
    );
  }
};

onBeforeMount(() => {
  if (props.value) {
    const valueAdd = props.value.map((item, index) => ({
      ...item,
      startDate: item.startDate
        ? dayjs(item.startDate, "YYYY-MM-DD")
        : item.startDate,
      endDate: item.endDate ? dayjs(item.endDate, "YYYY-MM-DD") : item.endDate,
      key: index.toString(),
    }));
    dataSource.value = valueAdd.length
      ? (valueAdd as any)
      : defaultDataSource();
  } else {
    edit("1");
  }
});

watch(
  () => dataValueEmit,
  () => {
    emit("update:value", dataValueEmit.value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.editable-add-btn {
  padding: 4px 8px;
  font-size: 13px;
  height: 30px;
}
</style>
