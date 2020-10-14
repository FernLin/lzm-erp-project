<template>
  <div class="register-container">
    <van-icon
      style="font-size: 70px;"
      name="checked"
      color="#07c160"
    />
    <div class="text">注册成功</div>
    <van-button
      style="margin-top: 20px;"
      type="primary"
      round
      block
      @click="download"
    >下载APP</van-button>
  </div>
</template>

<script>
export default {
  name: "Success",
  components: {},
  data() {
    return {
      phone: "",
      password: "",
      verifyCode: "",
      checked: false
    };
  },
  methods: {
    download() {
      console.log("下载APP");
    },
  },
};
</script>
<style scoped lang="less">
.register-container {
  padding: 70px 10px 0;
  width: calc(100% - 20px);
  height: calc(100vh - 40px);
  .text {
    font-size: 20px;
    margin: 10px 0 30px;
  }
}
</style>
