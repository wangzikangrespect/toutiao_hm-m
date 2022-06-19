<template>
  <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          class="searchBar"
          center
          v-for="value in Resultslist"
          :key="value.art_id"
          :title="value.aut_name"
        />
      </van-list>
  </div>
</template>

<script>
import { getSearchResultSApi } from "@/api";
export default {
  name: "searchResultIndex",
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      //搜索结果列表
      Resultslist: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
    };
  },
  methods: {
    async onLoad() {
      //当onload被触发的时候请求axios将获得的数据发送给结果列表
      try {
        const {
          data: {
            data: { results },
          },
        } = await getSearchResultSApi({
          page: this.page,
          per_page: 10,
          q: this.searchText,
        });
        if (results[0]) {
          this.Resultslist.push(...results);
        }
        //将page的数字加1
        this.page++;
        //关闭loading状态
        this.loading = false;
        //同时检查当返回数据小于10时finished为true
        if (results.length < 10) {
          this.finished = true;
        }
      } catch (err) {
        this.$toast("获取搜索结果失败");
      }
    },
  },
};
</script>
<style scoped lang="less"></style>;
