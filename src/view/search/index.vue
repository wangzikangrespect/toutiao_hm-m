<template>
  <div>
    <form action="/">
      <!-- 搜索框 -->
      <van-search
        class="search-border"
        show-action
        v-model="searchText"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.push({ path: '/' })"
        @search="searchResultFn"
        @input="showresult = false"
      />
      <!-- 搜索框 -->
      <!-- 结果 -->
      <searchResult v-if="showresult" :searchText="searchText"></searchResult>
      <!-- 结果 -->
      <!-- 建议 -->
      <searchSuggestion
        v-else-if="searchText"
        :searchText="searchText"
        @search="searchResultFn"
      ></searchSuggestion>
      <!-- 建议 -->
      <!-- 搜索历史 -->
      <searchHistory
        v-else
        :searchHistoryList="searchHistoryList"
      ></searchHistory>
      <!-- 搜索历史 -->
    </form>
  </div>
</template>

<script>
import searchHistory from "../search/search-history";
import searchResult from "../search/search-result";
import searchSuggestion from "../search/search-suggestion";
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "searchIndex",
  components: {
    searchHistory,
    searchResult,
    searchSuggestion,
  },
  data() {
    return {
      showresult: false,
      searchText: "",
      searchHistoryList: [],
    };
  },
  methods: {
    searchResultFn(text) {
      //函数触发使结果组件显现
      //并使searchText的值变为点击的值，然后将值发送到searchResult中
      this.showresult = true;
      this.searchText = text;
      //每次搜索，都会把搜索结果和searchHistoryList中元素做比对。
      const index = this.searchHistoryList.findIndex((value) => {
        return value === text;
      });
      // 如果没有就将该元素插入到第一个位子，如果有则删除末尾然后再将元素插入第一个位子。
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1);
      }
      this.searchHistoryList.unshift(text);
    },
  },
  watch: {
    searchHistoryList(newval) {
      setItem("SEARCH_HISTORY", newval);
    },
  },
  created() {
    this.searchHistoryList = getItem("SEARCH_HISTORY");
  },
};
</script>

<style lang="less" scoped>
.search-border {
  height: 96px;
  .van-search__content {
    width: 589px;
    height: 56px;
  }
  .van-search__action {
    font-size: 28px;
    color: white;
  }
}
</style>