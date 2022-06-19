<template>
  <div>
    <!-- 标题栏 -->
    <van-nav-bar title="黑马头条" class="title" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <!-- 用户名 -->
      <van-field
        autosize
        center
        v-model="user.mobile"
        placeholder="用户名"
        name="mobile"
        :rules="userFormRules.mobile"
        maxlength="11"
        type="number"
      >
        <i slot="left-icon" class="font_family icon-shouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        autosize
        v-model="user.code"
        center
        clearable
        placeholder="请输入短信验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="font_family icon-yanzhengma"></i>
        <!-- 验证码发送按钮，计时 -->
        <template #button>
          <span class="bd"></span>
          <van-count-down
            :time="60 * 1000"
            format="ss s"
            v-if="show"
            @finish="show = false"
          />
          <van-button
            round
            size="small"
            type="primary"
            native-type="button"
            @click="onSendms"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="submit_btn">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, sendSmsApi } from "@/api/";
export default {
  name: "loginIndex",
  data() {
    return {
      show: false,
      token: "",
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          {
            required: true, //验证手机号码是否为空
            message: "请输入手机号码",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}/, // 验证格式是否满足13位数字
            message: "请输入正确格式的号码",
          },
        ],
        code: [
          {
            required: true, // 验证码是否为空
            message: "验证码不能为空",
          },
          //   {
          //     pattern: /^\d{6}&/, // 验证是否为6位数字
          //     message: "请输入正确6位数验证码",
          //   },
        ],
      },
    };
  },
  methods: {
    // 表单提交事件
    async onSubmit() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      const user = this.user;

      // 点击时，传入数据
      // 进行正则验证
      try {
        const {
          data: { data },
        } = await loginApi(user);
        this.$toast.success("登录成功");
        console.log("登录成功", data);
        this.token = data;
      } catch (err) {
        if (err.response.status === 400) {
          return this.$toast.fail(`${err.response.data.message}`);
        }
      }
      this.$store.commit("storageFn", this.token);
      this.$router.push({ path: "/" });
    },
    onSendms() {
      //1.效验手机号
      try {
        this.$refs.loginFrom.validate("mobile");
      } catch (err) {
        return console.log(err);
      }
      //2.发送验证码，显示计时器
      this.show = true;
      //3.请求发送通过
      //1.封装axios接口sendSmsApi
      try {
        const res = sendSmsApi(this.user.mobile);
        console.log("请求成功", res);
      } catch (err) {
        this.show = false;
        if (err.status === 404) {
          return this.$toast("手机号码不正确");
        } else if (err.status === 429) {
          return this.$toast("接口访问次数受限，请稍后重试");
        } else {
          return this.$toast("请求失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.submit_btn {
  height: 176px;
  margin: 32px;
}
.van-cell.van-field {
  height: 92px;
  font-size: 52px;
  border-bottom: 2px solid #eeeeee;
  .van-field__button {
    position: relative;

    .bd {
      position: absolute;
      right: 204px;
      display: inline-block;
      height: 60px;
      border-right: 2px solid #eeeeee;
    }
    button {
      padding: 26px 38px;
      background-color: #ededed;
      color: #666666;
      border: 0;
    }
  }

  i {
    font-size: 40px;
  }
}
.submit_btn {
  button {
    margin-top: 54px;
    height: 88px;
    border-radius: 5px;
    background-color: #6db4fb;
    color: white;
  }
}
.van-toast {
  width: auto !important;
  height: auto !important;
}
</style>