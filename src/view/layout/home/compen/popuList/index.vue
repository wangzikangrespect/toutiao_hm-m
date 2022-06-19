<template>
  <div class="popuBody">
    <!-- 我的频道，标题 -->
    <van-cell center class="My-Chans-title">
      <div slot="title">
        <span>我的频道</span>
      </div>
      <div slot="default">
        <van-button
          round
          type="danger"
          plain
          class="edit-btn"
          @click="staShow = !staShow"
          >{{ staShow ? "完成" : "编辑" }}</van-button
        >
      </div>
    </van-cell>
    <!-- 我的频道内容表框 -->
    <van-grid class="grid-list">
      <van-grid-item
        class="grid-item"
        :class="{ highLight: emphs === index }"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="editMyChaFn(index, channel.id)"
      >
        <div slot="text" class="text-box">
          <van-icon name="close" class="del-channel" v-if="staShow" />
          <span>{{ channel.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 我的频道内容表框 -->

    <!-- 剩余列表 -->
    <van-cell center class="surplus-title">
      <div slot="title">
        <span>频道推荐</span>
      </div>
    </van-cell>
    <!-- 剩余列表内容 -->
    <van-grid class="grid-list">
      <!-- 列表 -->
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in recomChannels"
        :key="index"
        @click="addchannls(value)"
      >
        <div slot="text" class="text-box">
          <span class="grid-add">+</span><span>{{ value.name }}</span>
        </div>
      </van-grid-item>
      <!-- 列表 -->
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsApi, delChannelApi, addChannelApi } from "@/api";
export default {
  name:'popuListIndex',
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    emphs: {
      type: Number,
    },
  },
  data() {
    return {
      staShow: false,
      allChannels: [],
    };
  },
  methods: {
    async getallFn() {
      try {
        const {
          data: {
            data: { channels },
          },
        } = await getAllChannelsApi();
        this.allChannels.push(...channels);
      } catch (err) {
        this.$toast("获取全部列表失败,请稍后重试");
      }
    },
    async editMyChaFn(index, id) {
      if (!this.staShow) {
        this.$emit("cgActive", index);
      } else {
        try {
          await delChannelApi(id);
          this.$emit("cgMychas", index); //需要修改。
        } catch (err) {
          this.$toast("删除失败");
        }
      }
    },
    async addchannls(channel) {
      if (this.staShow) {
        try {
          await addChannelApi({
            id: channel.id,
            seq: this.myChannels.length,
          });
          this.$emit("addMychas", channel);
        } catch (err) {
          this.$toast("添加失败");
        }
      } else {
        return;
      }
    },
  },
  computed: {
    recomChannels() {
      return this.allChannels.filter((value) => {
        return !this.myChannels.find((channel) => {
          return value.id === channel.id;
        });
      });
    },
  },
  created() {
    this.getallFn();
  },
};
</script>

<style scoped lang="less">
.van-cell::after {
  border: unset;
}
.popuBody {
  padding: 109px 0;
  .My-Chans-title,
  .surplus-title {
    margin-bottom: 48px;
    padding: 0 22px;
    border: unset;
    .edit-btn {
      height: 49px;
    }
  }
  .grid-list {
    padding: 0 0 0 22px;
    .van-hairline--top::after {
      border: unset;
    }
    .grid-item {
      padding: 0 22px 29px 0;
      font-size: 28px;
      &.highLight {
        color: red;
      }
      .van-grid-item__content {
        height: 86px;
        padding: unset;
        border: 1px solid #000;
        background-color: #f4f5f6;
        border: unset;
        border-radius: 15px;
        position: relative;

        .text-box {
          display: flex;
          justify-content: center;
          align-items: center;
          .del-channel {
            position: absolute;
            top: -14px;
            right: -14px;
            z-index: 2;
          }
          .grid-add {
            font-size: 60px;
          }
        }
      }
    }
  }
  .surplus-title {
    margin: 50px 0;
  }
}
</style>