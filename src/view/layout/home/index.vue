<template>
  <div class="main">
    <!-- 头部搜索栏 -->
    <van-nav-bar class="navbar" fixed>
      <div slot="title">
        <van-button round type="primary" class="search_btn" to="/search">
          <span slot="icon" class="font_family icon-sousuo"></span>
          <span>搜索</span>
        </van-button>
      </div>
    </van-nav-bar>
    <!-- 标题导航栏 -->
    <van-tabs v-model="active" class="Tab" swipeable>
      <van-tab v-for="value in channels" :key="value.id" :title="value.name">
        <!-- list列表 -->
        <list-content :channel="value"> </list-content>
        <!-- list列表 -->
      </van-tab>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="bd_line"></div>
      <div slot="nav-right" class="more">
        <span class="font_family icon-lishi" @click="show = true"></span>
      </div>
      <!-- 汉堡按钮 -->
    </van-tabs>
    <!-- 弹出框 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <popupList
        :myChannels="channels"
        :emphs="active"
        @cgActive="activeFn"
        @cgMychas="cgMychas"
        @addMychas="addMychas"
      ></popupList>
    </van-popup>
  </div>
</template>

<script>
import listContent from "@/view/layout/home/compen/contentList";
import { followingsApi } from "@/api";
import popupList from "@/view/layout/home/compen/popuList";
export default {
  name: "homeIndex",
  components: {
    listContent,
    popupList,
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false,
    };
  },
  methods: {
    async geiChannels() {
      try {
        const {
          data: {
            data: { channels },
          },
        } = await followingsApi();
        this.channels = [...this.channels, ...channels];
      } catch (err) {
        this.$toast("请求用户列表失败");
      }
    },
    activeFn(index) {
      console.log(index);
      this.active = index;
      this.show = false;
    },
    addMychas(channel) {
      this.channels.push(channel);
    },
    cgMychas(index) {
      this.channels.splice(index, 1);
    },
  },
  // 在create阶段引入followsApi
  created() {
    this.geiChannels();
  },
};
</script>

<style scoped lang='less'>
.main {
  padding-top: 96px;
  padding-bottom: 103px;
}
/deep/ .van-nav-bar__title {
  max-width: 100% !important;
  .van-button--primary {
    border: 0px;
  }
}

.navbar {
  height: 96px;
  background-color: #3296fa;
  .search_btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    .font_family {
      font-size: 32px;
    }
    .van-button__text {
      font-size: 28px;
    }
  }
}
/deep/.Tab {
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  .bd_line {
    position: fixed;
    right: 67px;
    margin-top: 12px;
    width: 2px;
    height: 58px;
    background-image: url(~@/assets/img/gradient-gray-line.png);
    background-size: contain;
  }
  .more {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 82px;
    width: 66px;
    background-color: white;
    span {
      font-size: 43px;
    }
  }
}
</style>