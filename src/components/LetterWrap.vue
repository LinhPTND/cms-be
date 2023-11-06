<template>
  <div class="letter-wrap">
    <div class="content">
      <div class="chxh">
        <a-row justify="space-between">
          <a-col>
            <div class="chxh-pdt">
              <div class="mb-1">TRƯỜNG CÔNG NGHỆ GIAO THÔNG VÂN TẢI</div>
              <div class="font-semibold">PHÒNG ĐÀO TẠO</div>
            </div>
          </a-col>
          <a-col>
            <div class="chxh-vn">
              <div class="uppercase mb-2 font-semibold">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </div>
              <div class="dl-td">
                <div class="wrap">
                  <span>Độc lập</span>
                  <span>Tự do</span>
                  <span>Hạnh phúc</span>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="time-writter">
        <span>Hà Nội ,</span>ngày <span>{{ dayNow }}</span> tháng
        <span>{{ monthNow }}</span> năm
        <span>{{ yearNow }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";

const dayNow = computed(() => {
  return dayjs().get("date");
});

const monthNow = computed(() => {
  return dayjs().get("month");
});

const yearNow = computed(() => {
  return dayjs().get("year");
});
</script>

<style lang="scss" scoped>
.letter-wrap {
  // border: 1px solid #dcdcdc;
  padding: 50px 24px 70px 24px;
  letter-spacing: 0.6px;
  .content {
    background: white;
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid #cccc;
    @media screen and (max-width: 1200px) {
      width: 100%;
    }

    .chxh-pdt {
      margin-bottom: 24px;
    }
    .chxh {
      font-size: 16px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 24px;
      .dl-td {
        font-weight: 700;
        .wrap {
          border-bottom: 1px solid #232323;
          display: inline-block;
          padding-bottom: 1px;
        }
        span {
          text-transform: none;
          &:not(:last-child) {
            &::after {
              content: "";
              height: 1px;
              width: 10px;
              display: inline-block;
              background-color: black;
              margin: 0 8px;
              align-items: center;
              transform: translateY(-3px);
            }
          }
        }
      }
    }

    .time-writter {
      display: flex;
      justify-content: flex-end;
      font-style: italic;
      font-size: 16px;
      margin-bottom: 50px;
      flex-wrap: wrap;

      span {
        padding: 0 8px;
      }
    }
  }
}
</style>

<style lang="less">
.letter-wrap {
  .label {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }

  .ant-input-number {
    width: 84px !important;
  }

  .ant-input,
  .ant-input-number-input,
  .ant-picker {
    height: 28px !important;
    font-size: 13px !important;
    line-height: 20px !important;
  }

  textarea {
    &.ant-input {
      height: unset !important;
    }
  }
}
</style>
