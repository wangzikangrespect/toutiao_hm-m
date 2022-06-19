<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell title="历史记录" class="searchBar" center>
        <div slot="default">
          <span>清除全部</span>
        </div>
      </van-cell>
      <van-cell
        v-for="(item,index) in searchHistoryList"
        :key="index"
        :title="item"
        class="searchBar"
        center
      >
        <div slot="default">
          <van-icon name="close" />
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "searchHistoryIndex",
  props: {
    searchHistoryList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      //渲染数据
      list: [],
      //触底刷新是否启动
      loading: false,
      //数据是否加载完成
      finished: false,
    };
  },
  methods: {
    // 加载数据时
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
</style>>
