<template>
  <div class="tabscroll">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <!-- 内容列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 内容 -->
        <articleItem v-for="(value,index) in list" :key="index" :content="value"></articleItem>
        <!-- <van-cell
          v-for="(value, index) in list"
          :key="index"
          :title="value.title"
        /> -->
        <!-- 内容 -->
      </van-list>
      <!-- 内容列表 -->
    </van-pull-refresh>
  </div>
</template>

<script>
import { articlesApi } from "@/api";
import articleItem from "@/component/articalItem.vue";
export default {
  components:{
    articleItem
  },
  props: {
    channel: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
      loading: false, //表示自动触底加载，只有在false时，才会启动触底加载的功能。在触发加载时，loading会自动变为true。因此在加载结束之后需将其变为false.
      finished: false, //用于表示数据是否加载完毕，若加载完毕则不会加载。true表示加载完毕
      refreshing: false,
      error: false,
      timestamp: null,
    };
  },
  methods: {
    async onLoad() {
      // 1.调入axios请求articlesApi
      try {
        // 2.请求得到的数据，写入list中，并将其渲染出
        const {
          data: { data },
        } = await articlesApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        console.log("这是文章列表数据", data);
        // 2.2将获取到的数据合并到list中
        this.list.push(...data.results);
        // 2.3将列表中的数据渲染到页面

        // 3.将loading的值变为false
        this.loading = false;
        // 4.将timestamp的值变为接收到的时间戳
        this.timestamp = data.pre_timestamp;
        // 5.判断，如果接收到的数据不超过10条则将finished变成true
        if (data.results < 10) {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        //一、引入axios请求articlesApi
        const {
          data: { data },
        } = await articlesApi({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        //二、再将得到的数据渲染到list页面最前方
        this.list.unshift(...data.results);
        //三、将refreshing功能关闭
        this.refreshing = false;
      } catch (err) {
        this.$toast("数据获取失败，稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabscroll {
  height: 80vh;
  overflow-y: auto;
}
</style>>
