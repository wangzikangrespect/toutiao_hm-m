<template>
  <div class="main">
    <!-- 头部搜索栏 -->
    <van-nav-bar class="navbar" fixed>
      <div slot="title">
        <van-button round type="primary" class="search_btn">
          <span slot="icon" class="font_family icon-sousuo"></span>
          <span>搜索</span>
        </van-button>
      </div>
    </van-nav-bar>
    <!-- 标题导航栏 -->
    <van-tabs v-model="active" class="Tab" swipeable>
      <van-tab v-for="value in channels" :key="value.id" :title="value.name">
        <!-- list列表 -->
        <list-content :channel="value"></list-content>
        <!-- list列表 -->
      </van-tab>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="bd_line"></div>
      <div slot="nav-right" class="more">
        <span class="font_family icon-lishi"></span>
      </div>
      <!-- 汉堡按钮 -->
    </van-tabs>
  </div>
</template>

<script>
import listContent from "@/view/layout/home/compen/content.vue";
import { followingsApi } from "@/api";
export default {
  components: {
    listContent,
  },
  data() {
    return {
      active: 0,
      channels: [],
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
        // console.log(channels);
        this.channels = [...this.channels, ...channels];
      } catch (err) {
        this.$toast("请求用户列表失败");
      }
    },
  },
  // 在create阶段引入followsApi
  created() {
    this.geiChannels();
  },
};
</script>

<style scope lang='less'>
.main {
  padding-top: 179px;
  padding-bottom: 98px;
}
.navbar {
  height: 96px;
  background-color: #3296fa;
  .van-nav-bar__title {
    max-width: unset;
  }
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
.Tab {
  .van-tabs__wrap {
    position: fixed !important;
    top: 96px;
    z-index: 1;
  }

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
    span {
      font-size: 43px;
    }
  }
}
</style>