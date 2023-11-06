<template>
  <div class="login-layout">
    <div class="w-[400px] h-[400px] hidden xl:block mr-[70px]">
      <img :src="Assets.Images.Logo" alt="" />
    </div>
    <div class="login-layout__content">
      <Suspense>
        <RouterView />
        <template #fallback>
          <div class="loading-container">
            <LoadingGlobal />
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Assets from "@/assets";
import LoadingGlobal from "@/shared/loading/LoadingGlobal.vue";
</script>

<style lang="scss" scoped>
.login-layout {
  background-image: url("../../assets/images/layout-login.png");
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 500px;
    height: 400px;
    background: #fff;
    border: 0.5px solid #c4c4c4;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    padding: 24px;
    position: relative;

    @media screen and (max-width: 768px) {
      width: 90%;
    }

    .loading-container {
      @apply w-full h-full flex justify-center items-center;
      max-height: calc(100% - 30px);
    }
  }
}
</style>
