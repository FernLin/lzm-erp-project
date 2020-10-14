<template>
  <div class="register-container">
    <img src="../assets/lzm-logo.png" />
    <div class="title">欢迎注册林棕梦</div>
    <van-field
      v-model="phone"
      clearable
      type="tel"
      maxlength="11"
      placeholder="请输入手机号"
    />
    <van-field
      v-model="password"
      :type="closed ? 'password' : 'text'"
      placeholder="请设置密码"
    >
      <template #button>
        <van-icon
          v-if="closed"
          @click="showPassword(false)"
          name="closed-eye"
        />
        <van-icon v-else @click="showPassword(true)" name="eye-o" />
      </template>
    </van-field>
    <van-field
      v-model="verifyCode"
      clearable
      type="number"
      placeholder="请输入验证码"
    >
      <template #button>
        <span class="verify-code" @click="getVerifyCode">获取验证码</span>
      </template>
    </van-field>
    <div class="agreement-content">
      <img
        src="../assets/lzm-select.png"
        v-if="checked"
        @click="changeSelect(false)"
      />
      <img
        src="../assets/lzm-unselect.png"
        v-else
        @click="changeSelect(true)"
      />
      <span class="agreement-file">
        我已阅读并同意
        <a href="https://www.baidu.com" target="_blank">
          “用户协议”
        </a>
        和
        <a href="https://www.baidu.com" target="_blank">
          “隐私政策”
        </a>
      </span>
    </div>
    <van-button
      style="margin-top: 20px;"
      type="primary"
      round
      block
      @click="register"
      >注册</van-button
    >
  </div>
</template>

<script>
import { getVerificationCode, register } from "../api/Register.js";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      phone: "",
      password: "",
      verifyCode: "",
      closed: true,
      checked: false
    };
  },
  methods: {
    changeSelect(data) {
      this.checked = data;
    },
    showPassword(data) {
      this.closed = data;
    },
    async getVerifyCode() {
      let params = {
        phone: this.phone,
        type: "REGISTER"
      };
      let res = await getVerificationCode(params);
      console.log(res);
    },
    async register() {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        this.$Notify({ type: "danger", message: "请输入正确的手机号码" });
        return;
      }
      if (!this.password) {
        this.$Notify({
          type: "danger",
          message: "请设置密码"
        });
        return;
      }
      if (!this.verifyCode) {
        this.$Notify({
          type: "danger",
          message: "请输入验证码"
        });
        return;
      }
      if (!this.checked) {
        this.$Notify({
          type: "danger",
          message: "请阅读并同意“用户协议”和“隐私政策”"
        });
        return;
      }
      let params = {
        invitationParam: "string", // 邀请参数
        password: this.password, // 密码
        phone: this.phone, // 手机号
        username: "string", // 用户名
        verificationCode: this.verifyCode // 验证码
      };
      let res = await register(params);
      if (res) {
        this.$router.push("/success");
      }
    }
  }
};
</script>
<style scoped lang="less">
.register-container {
  padding: 20px 10px;
  width: calc(100% - 20px);
  height: calc(100vh - 40px);
  .title {
    font-size: 28px;
    margin: 10px 0 20px;
  }
  .verify-code {
    color: #55aa66;
    font-size: 14px;
    padding-bottom: 1px;
  }
  .agreement-content {
    display: flex;
    align-items: center;
    padding: 0 16px;
    img {
      width: 18px;
    }
  }
  .agreement-file {
    font-size: 12px;
    color: #c9c9c9;
    a {
      color: blue;
    }
  }
  /deep/ .van-field__body {
    border-bottom: 1px solid #c9c9c9;
    font-size: 16px;
    padding: 0 0 3px 2px;
  }
  /deep/ .van-cell::after {
    border: unset;
  }
}
</style>
