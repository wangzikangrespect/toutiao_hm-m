<template>
  <div>
    <!-- 未登录显示 -->
    <div class="banner login" v-if="!user">
      <van-image
        class="img"
        round
        :src="require('@/assets/img/mobile.png')"
        @click="toLoginFn"
      />
      <span>登录/注册</span>
    </div>
    <!-- 已登录显示 -->
    <div class="banner user-info" v-else>
      <!-- 上部分 -->
      <div class="data-base">
        <!-- 左边信息 -->
        <div class="info">
          <van-image class="userImg" round :src="userData.photo" />
          <span>{{ userData.name }}</span>
        </div>
        <!-- 右边编辑按钮 -->
        <div class="edit-info">
          <van-button
            round
            type="info"
            :to="{
              name: 'editUserInfo',
            }"
            >编辑资料</van-button
          >
        </div>
      </div>
      <!-- 下部分 -->
      <div class="data-status">
        <div class="box">
          <div>
            <p>{{ userData.art_count }}</p>
            <span>头条</span>
          </div>
          <div>
            <p>{{ userData.follow_count }}</p>
            <span>关注</span>
          </div>
        </div>
        <div class="box">
          <div>
            <p>{{ userData.fans_count }}</p>
            <span>粉丝</span>
          </div>
          <div>
            <p>{{ userData.like_count }}</p>
            <span>获赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户操作 -->
    <van-grid :column-num="2" class="operation">
      <van-grid-item>
        <span
          slot="icon"
          class="font_family icon-shoucang"
          style="color: #ed6263"
        ></span>
        <p slot="text">收藏</p>
      </van-grid-item>
      <van-grid-item>
        <span
          slot="icon"
          class="font_family icon-lishi"
          style="color: #ff9d1d"
        ></span>
        <p slot="text">历史</p>
      </van-grid-item>
    </van-grid>

    <!-- 通知 -->
    <van-cell-group class="mes_notifi">
      <!-- 消息通知 -->
      <!-- <van-cell title="消息通知" > -->
      <van-cell title="消息通知" is-link center />
      <!-- 小智同学 -->
      <van-cell title="小智同学" is-link center />
    </van-cell-group>
    <!-- 退出 -->
    <van-cell-group v-if="user" center>
      <van-cell
        title="退出登录"
        center
        class="out"
        @click="logoutFn"
        clickable
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { myInfoApi } from "@/api";
export default {
  name: "userIndex",
  data() {
    return {
      userData: "",
    };
  },
  methods: {
    toLoginFn() {
      this.$router.push({
        path: "/login",
        name: "login",
      });
    },
    // 点击退出时触发的事件
    logoutFn() {
      // 首先有弹框出来，询问是否退出
      //  1.选择取消则终止事件
      //  2.选择确定则删除本地存储token
      this.$dialog
        .confirm({
          message: "是否确认退出",
        })
        .then(() => {
          this.$store.commit("storageFn", null);
        })
        .catch(() => {
          return;
        });
    },
    async getUserInfo() {
      try {
        const {
          data: { data },
        } = await myInfoApi();
        this.userData = data;
      } catch (err) {
        this.$toast("获取用户信息失败");
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    //首先搭建axiosApi请求，myInfoApi
    //在页面渲染的时候进行判断
    //  1.如果token为空则停止请求
    //  2.如果token不为空时则开始请求数据
    if (this.user) {
      this.getUserInfo();
    }
  },
};
</script>

<style scoped lang='less'>
.banner {
  height: 366px;
  background: url("@/assets/img/banner.png");
  background-size: cove;
}
.banner.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    width: 132px;
    height: 132px;
  }
  span {
    font-size: 28px;
  }
}
.user-info {
  width: 100%;
  padding: 81px 0;
  .data-base {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: center;
      .userImg {
        width: 132px;
        height: 132px;
      }
      span {
        padding-left: 22px;
        font-size: 30px;
        color: white;
      }
    }
    .edit-info button {
      width: 165px;
      height: 45px;
      font-size: 20px;
      background-color: #fff;
      color: #747474;
    }
  }
  .data-status {
    display: flex;
    justify-content: space-between;

    .box {
      display: flex;
      padding: 30px;
      justify-content: space-around;
      flex: 1;
      div {
        text-align: center;
        p {
          font-size: 36px;
        }
        span {
          font-size: 23px;
        }
      }
    }
  }
}
.operation {
  height: 141px;
  span {
    font-size: 40px;
  }
  p {
    font-size: 28px;
  }
}
.mes_notifi {
  margin: 20px 0;
}
.out {
  text-align: center;
  color: #d82626;
}
.van-cell {
  height: 109px;
  padding: 0 20px;
}
</style>